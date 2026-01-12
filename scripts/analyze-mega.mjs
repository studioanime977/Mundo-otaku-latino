
import { readdir, readFile, stat } from 'fs/promises';
import { join, resolve } from 'path';

const ANIME_DIR = resolve('public/anime');

async function getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = join(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return files.flat();
}

async function analyzeFile(filePath) {
    const content = await readFile(filePath, 'utf8');
    const filename = filePath.split('\\').pop().split('/').pop();
    const lowerName = filename.toLowerCase();

    const report = {
        file: filePath,
        type: 'unknown',
        missingLat: [],
        missingSub: [],
        status: 'ok' // or 'warning'
    };

    // 1. WATCH PAGE (TV Series) - temporada-*.html
    if (lowerName.startsWith('temporada-') && lowerName.endsWith('.html')) {
        report.type = 'watch-series';
        const episodesMatch = content.match(/const\s+episodes\s*=\s*(\[[\s\S]*?\]);/);
        if (episodesMatch) {
            try {
                // Unsafe eval-like parsing, but sufficient for this static content
                // We need to valid JSON, but the file has JS keys without quotes.
                // Let's use a smarter regex to extract items.
                const epBlock = episodesMatch[1];
                // Match objects { ... }
                const itemRe = /{([^{}]+)}/g;
                let m;
                while ((m = itemRe.exec(epBlock)) !== null) {
                    const props = m[1];
                    // Extract num, mega, megaSub
                    const numMatch = props.match(/num:\s*(\d+)/);
                    const megaMatch = props.match(/mega:\s*['"]([^'"]*)['"]/);
                    const megaSubMatch = props.match(/megaSub:\s*['"]([^'"]*)['"]/);

                    const num = numMatch ? parseInt(numMatch[1]) : '?';
                    const mega = megaMatch ? megaMatch[1] : '';
                    const megaSub = megaSubMatch ? megaSubMatch[1] : '';

                    if (!mega || !mega.includes('mega.nz')) report.missingLat.push(`Ep ${num}`);
                    if (!megaSub || !megaSub.includes('mega.nz')) report.missingSub.push(`Ep ${num}`);
                }
            } catch (e) {
                report.error = 'Failed to parse episodes array';
            }
        } else {
            // Maybe it's a legacy page without js array?
        }
    }

    // 2. WATCH PAGE (Movie) - pelicula-*.html
    else if (lowerName.startsWith('pelicula-') && lowerName.endsWith('.html')) {
        report.type = 'watch-movie';
        // Look for data-server="MEGA"
        // <a href="#" class="server-card" data-server="MEGA" data-url-lat="..." data-url-sub="..."
        const megaCardMatch = content.match(/data-server="MEGA"[\s\S]*?>/);
        if (megaCardMatch) {
            const tag = megaCardMatch[0];
            const latMatch = tag.match(/data-url-lat="([^"]*)"/);
            const subMatch = tag.match(/data-url-sub="([^"]*)"/);

            const lat = latMatch ? latMatch[1] : '';
            const sub = subMatch ? subMatch[1] : '';

            if (!lat || !lat.includes('mega.nz')) report.missingLat.push('Movie');
            if (!sub || !sub.includes('mega.nz')) report.missingSub.push('Movie');
        } else {
            report.missingLat.push('Whole Mega Card Missing');
            report.missingSub.push('Whole Mega Card Missing');
        }
    }

    // 3. DOWNLOAD PAGE (TV Series) - descargar-s*.html
    else if (lowerName.startsWith('descargar-s') && lowerName.endsWith('.html')) {
        report.type = 'download-series';
        // Logic: Find sections, then find Mega cards
        // It's hard to robustly parse HTML with regex for nesting.
        // Heuristic:
        // Find "Episodio X - MEGA" and check if the NEXT <a> tag contains mega.nz
        // This is tricky because Latino and Sub share "Episodio X - MEGA" titles usually?
        // Actually in the example:
        // Latino section: <h4>Episodio 1 - MEGA</h4> ... link
        // Sub section: <h4>Episodio 1 - MEGA</h4> ... link

        // Let's count occurrences. If we have 24 episodes, we expect 48 "MEGA" cards if both languages are present.
        // Better: split content by "Subtitulado" section if possible.

        // Simple check: Find all regex matches for <h4>Episodio (\d+) - MEGA</h4>
        // and extract the link following it.

        const chunks = content.split(/<section[^>]*data-lang="sub"/i);
        const latChunk = chunks[0];
        const subChunk = chunks[1] || '';

        function checkChunk(chunk, list) {
            const re = /<h4>\s*Episodio\s+(\d+)\s*-\s*MEGA\s*<\/h4>[\s\S]*?<a[^>]+href="([^"]+)"/gi;
            let m;
            const found = new Set();
            while ((m = re.exec(chunk)) !== null) {
                const num = m[1];
                const link = m[2];
                if (link && link.includes('mega.nz')) {
                    found.add(parseInt(num));
                } else if (link && link.includes('exe.io') && chunk.substr(m.index, 200).includes('mega.nz')) {
                    // exe.io links usually contain the destination in url param, but my regex for href captured it.
                    // if the link itself contains mega.nz (as param), it's good.
                    found.add(parseInt(num));
                }
            }
            return found; // Set of episodes with valid links
        }

        // We need to know TOTAL episodes to report missing ones.
        // Pattern: <h1>Descargas – Title Temporada X</h1> usually doesn't say count.
        // But we can assume max found episode is the count? Or usually 12/24.
        // Let's just list which ones ARE found and if there are gaps?
        // Actually "Check what is missing" implies we know what SHOULD be there.
        // I'll scan for ANY "Episodio X" header to get the universe of episodes.

        const allEps = new Set();
        let mEp;
        const epRe = /Episodio\s+(\d+)/g;
        while ((mEp = epRe.exec(content)) !== null) {
            allEps.add(parseInt(mEp[1]));
        }
        const maxEp = Math.max(...Array.from(allEps), 0);

        const foundLat = checkChunk(latChunk);
        const foundSub = checkChunk(subChunk);

        for (let i = 1; i <= maxEp; i++) {
            if (!foundLat.has(i)) report.missingLat.push(`Ep ${i}`);
            if (subChunk && !foundSub.has(i)) report.missingSub.push(`Ep ${i}`);
        }
        if (!subChunk && maxEp > 0) {
            // If no sub section found but episodes exist, maybe entire sub section is missing
            report.missingSub.push('Entire Section');
        }
    }

    // 4. DOWNLOAD PAGE (Movie) - descargar-pelicula*.html
    else if (lowerName.startsWith('descargar-pelicula') && lowerName.endsWith('.html')) {
        report.type = 'download-movie';
        const latMega = /class="section active"[^>]*data-lang="lat"[\s\S]*?MEGA[\s\S]*?href="([^"]*)"/.exec(content);
        const subMega = /class="section"[^>]*data-lang="sub"[\s\S]*?MEGA[\s\S]*?href="([^"]*)"/.exec(content);

        const hasLat = latMega && latMega[1].includes('mega.nz');
        const hasSub = subMega && subMega[1].includes('mega.nz');

        if (!hasLat) report.missingLat.push('Movie');
        if (!hasSub) report.missingSub.push('Movie');
    }

    if (report.missingLat.length > 0 || report.missingSub.length > 0) {
        report.status = 'warning';
    }
    return report;
}

async function main() {
    const allFiles = await getFiles(ANIME_DIR);
    const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

    console.log('Analyzing ' + htmlFiles.length + ' files...\n');

    let issuesCount = 0;

    // Group by Anime Folder
    const byFolder = {};

    for (const file of htmlFiles) {
        const report = await analyzeFile(file);
        if (report.status === 'warning') {
            const parts = file.split('\\'); // Windows path
            const folder = parts[parts.length - 2];
            if (!byFolder[folder]) byFolder[folder] = [];
            byFolder[folder].push(report);
            issuesCount++;
        }
    }

    if (issuesCount === 0) {
        console.log('✅ All analyzed files have Mega links for both Latino and Sub!');
    } else {
        for (const [folder, reports] of Object.entries(byFolder)) {
            console.log(`\n📁 Anime: ${folder.toUpperCase()}`);
            for (const r of reports) {
                const fname = r.file.split('\\').pop();
                console.log(`  📄 File: ${fname} (${r.type})`);
                if (r.missingLat.length) console.log(`     🔴 Faltan Latino: ${r.missingLat.join(', ')}`);
                if (r.missingSub.length) console.log(`     🔵 Faltan Sub: ${r.missingSub.join(', ')}`);
            }
        }
    }
}

main().catch(console.error);
