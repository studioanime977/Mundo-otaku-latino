import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://mundootakulatino.vercel.app';
const ROOT_DIR = process.cwd();

const CATALOGO_JS_PATH = path.join(ROOT_DIR, 'assets', 'js', 'catalogo.js');
const SITEMAP_PATH = path.join(ROOT_DIR, 'sitemap.xml');
const INDEX_HTML_PATH = path.join(ROOT_DIR, 'index.html');

function isoDate() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeToAbsoluteUrl(locOrPath) {
  if (!locOrPath) return null;
  const trimmed = String(locOrPath).trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const withoutLeadingDots = trimmed.replace(/^\.{1,2}\//, '');
  const withLeadingSlash = withoutLeadingDots.startsWith('/') ? withoutLeadingDots : `/${withoutLeadingDots}`;
  return `${SITE_URL}${withLeadingSlash}`;
}

function extractLocsFromSitemap(xml) {
  const locs = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const loc = m[1]?.trim();
    if (loc) locs.push(loc);
  }
  return locs;
}

// Function to extract full anime data for Schema
function extractAnimeData(jsText) {
  const animes = [];
  // Regex to capture title, title2, and href
  // Matches: { place: '...', title: 'TITLE', title2: 'SUBTITLE', ... href: '...' }
  const re = /{\s*place:\s*'[^']*',\s*title:\s*'([^']*)',\s*title2:\s*'([^']*)'.*?href:\s*'([^']*)'/gs;

  let m;
  while ((m = re.exec(jsText)) !== null) {
    const title1 = m[1]?.trim() || '';
    const title2 = m[2]?.trim() || '';
    const href = m[3]?.trim();

    if (title1 && href) {
      // Construct full title
      const fullTitle = title2 ? `${title1} ${title2}` : title1;
      animes.push({
        name: fullTitle,
        url: normalizeToAbsoluteUrl(href)
      });
    }
  }
  return animes;
}

function extractCatalogHrefs(jsText) {
  const hrefs = [];
  const re = /href\s*:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(jsText)) !== null) {
    const href = m[1]?.trim();
    if (href) hrefs.push(href);
  }
  return hrefs;
}

function makeUrlEntry(loc, { changefreq = 'weekly', priority = '0.7', lastmod = isoDate() } = {}) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

async function updateIndexHtmlSchema(animes) {
  try {
    let html = await readFile(INDEX_HTML_PATH, 'utf8');

    // Define the new Schema object
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "name": "Mundo Otaku Latino",
          "url": SITE_URL,
          "inLanguage": "es",
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${SITE_URL}/public/html/catalogo.html?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        },
        {
          "@type": "ItemList",
          "itemListElement": animes.map((anime, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": anime.url,
            "name": anime.name
          }))
        }
      ]
    };

    const scriptTag = `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;

    // Regex to find existing LD+JSON script
    const scriptRegex = /<script\s+type="application\/ld\+json">.*?<\/script>/s;

    if (scriptRegex.test(html)) {
      html = html.replace(scriptRegex, scriptTag);
      console.log('Schema injected into index.html');
    } else {
      // If not found, insert before </head>
      html = html.replace('</head>', `${scriptTag}\n</head>`);
      console.log('Schema appended to head in index.html');
    }

    await writeFile(INDEX_HTML_PATH, html, 'utf8');
  } catch (err) {
    console.error('Error updating index.html schema:', err);
  }
}

// Function to update individual anime HTML files
async function updateAnimePages(animeData) {
  for (const anime of animeData) {
    if (!anime.href) continue;

    // Resolve relative path from catalogo.js location to the actual file
    // catalogo.js is in assets/js/, so href '../anime/...' resolves correctly relative to it
    // But we are running from root, so we need to construct the absolute path carefully.
    // anime.href is like '../anime/demon-slayer/demon-slayer.html'

    // We need to resolve this relative to 'assets/js'
    const absolutePath = path.resolve(ROOT_DIR, 'assets', 'js', anime.href);

    try {
      let html = await readFile(absolutePath, 'utf8').catch(() => null);
      if (!html) {
        // Try resolving relative to public/html if standard path fails, or just warn
        console.warn(`Could not read file for ${anime.name}: ${absolutePath}`);
        continue;
      }

      const isMovie = anime.place.toLowerCase().includes('película');
      const keywords = `ver ${anime.name}, descargar ${anime.name}, ${anime.name} latino, ${anime.name} sub español, ${anime.name} hd, ver anime online`;

      const newTitle = `Ver ${anime.name} Online y Descargar (HD Latino) | Mundo Otaku Latino`;
      const newDescription = `Ver ${anime.name} online en español latino y subtitulado. Descargar temporadas completas en HD 1080p gratis. ${anime.description}`;

      // Update basic meta tags using regex
      html = html.replace(/<title>.*?<\/title>/, `<title>${newTitle}</title>`);
      html = html.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${newDescription}">`);

      // Update/Add Keywords if missing
      if (!/<meta name="keywords"/.test(html)) {
        html = html.replace('<head>', `<head>\n  <meta name="keywords" content="${keywords}">`);
      } else {
        html = html.replace(/<meta name="keywords" content=".*?">/, `<meta name="keywords" content="${keywords}">`);
      }

      // Update OG Tags
      const ogReplacements = {
        'og:title': newTitle,
        'og:description': newDescription,
        'og:image': normalizeToAbsoluteUrl(anime.image), // Ensure image is absolute
        'og:url': anime.url
      };

      for (const [property, content] of Object.entries(ogReplacements)) {
        const regex = new RegExp(`<meta property="${property}" content=".*?">`);
        if (regex.test(html)) {
          html = html.replace(regex, `<meta property="${property}" content="${content}">`);
        } else {
          // Inject if missing (basic injection before </head>)
          html = html.replace('</head>', `  <meta property="${property}" content="${content}">\n</head>`);
        }
      }

      // Update JSON-LD Schema
      const schemaType = isMovie ? 'Movie' : 'TVSeries';
      const schema = {
        "@context": "https://schema.org",
        "@type": schemaType,
        "name": anime.name,
        "description": newDescription,
        "image": normalizeToAbsoluteUrl(anime.image),
        "url": anime.url,
        "inLanguage": "es",
        "publisher": {
          "@type": "Organization",
          "name": "Mundo Otaku Latino",
          "url": SITE_URL
        },
        "potentialAction": {
          "@type": "WatchAction",
          "target": anime.url
        }
      };

      const scriptTag = `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
      const scriptRegex = /<script\s+type="application\/ld\+json">.*?<\/script>/s;

      if (scriptRegex.test(html)) {
        html = html.replace(scriptRegex, scriptTag);
      } else {
        html = html.replace('</head>', `${scriptTag}\n</head>`);
      }

      await writeFile(absolutePath, html, 'utf8');
      console.log(`Optimized SEO for: ${anime.name}`);

    } catch (err) {
      console.error(`Error processing ${anime.name}:`, err);
    }
  }
}

async function main() {
  const [catalogJs, existingSitemapXml] = await Promise.all([
    readFile(CATALOGO_JS_PATH, 'utf8'),
    readFile(SITEMAP_PATH, 'utf8').catch(() => ''),
  ]);

  // Extract Data for Schema and Optimization
  // Note: We need href and image too, so let's update extractAnimeData to capture properly
  const animeData = extractAnimeDataFull(catalogJs); // New helper function

  console.log(`Found ${animeData.length} animes for Schema and Optimization.`);

  if (animeData.length > 0) {
    await updateIndexHtmlSchema(animeData);
    await updateAnimePages(animeData);
  }

  // Extract Data for Sitemap (Legacy/Basic URL list)
  const existingLocs = extractLocsFromSitemap(existingSitemapXml);
  const catalogHrefs = extractCatalogHrefs(catalogJs);
  // ... rest of sitemap logic ...
  const basePages = [
    normalizeToAbsoluteUrl('/'),
    normalizeToAbsoluteUrl('/public/html/catalogo.html'),
    normalizeToAbsoluteUrl('/public/html/ver-anime-espanol-latino.html'),
  ].filter(Boolean);

  const catalogLocs = catalogHrefs
    .map(normalizeToAbsoluteUrl)
    .filter(Boolean);

  const allLocs = new Set();
  for (const loc of basePages) allLocs.add(loc);
  for (const loc of existingLocs) allLocs.add(loc);
  for (const loc of catalogLocs) allLocs.add(loc);

  const orderedLocs = [
    ...basePages,
    ...existingLocs.filter((l) => !basePages.includes(l)),
    ...catalogLocs.filter((l) => !basePages.includes(l) && !existingLocs.includes(l)),
  ].filter((loc, idx, arr) => arr.indexOf(loc) === idx);

  const today = isoDate();

  const entries = orderedLocs.map((loc) => {
    if (loc === `${SITE_URL}/`) {
      return makeUrlEntry(loc, { changefreq: 'daily', priority: '1.0', lastmod: today });
    }
    if (loc === `${SITE_URL}/public/html/catalogo.html`) {
      return makeUrlEntry(loc, { changefreq: 'daily', priority: '0.9', lastmod: today });
    }

    const isMovie = /\/movie\.html$/i.test(loc);
    return makeUrlEntry(loc, {
      changefreq: isMovie ? 'monthly' : 'weekly',
      priority: isMovie ? '0.7' : '0.8',
      lastmod: today,
    });
  });

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '',
    ...entries,
    '',
    '</urlset>',
    '',
  ].join('\n');

  await writeFile(SITEMAP_PATH, xml, 'utf8');
  process.stdout.write(`Sitemap generado: ${SITEMAP_PATH}\nURLs: ${orderedLocs.length}\n`);
}

// Improved Data Extractor
function extractAnimeDataFull(jsText) {
  const animes = [];
  // Revised regex to capture all needed fields
  const re = /{\s*place:\s*'([^']*)',\s*title:\s*'([^']*)',\s*title2:\s*'([^']*)',\s*description:\s*'([^']*)',\s*image:\s*'([^']*)',\s*href:\s*'([^']*)'/gs;

  let m;
  while ((m = re.exec(jsText)) !== null) {
    animes.push({
      place: m[1]?.trim(),
      name: m[3] ? `${m[2].trim()} ${m[3].trim()}` : m[2].trim(),
      description: m[4]?.trim(),
      image: m[5]?.trim(),
      href: m[6]?.trim(),
      url: normalizeToAbsoluteUrl(m[6]?.trim())
    });
  }
  return animes;
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
