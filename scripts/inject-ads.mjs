
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, resolve, relative, sep } from 'path';

const ANIME_DIR = resolve('public/anime');
const ASSETS_JS_PATH = resolve('assets/js/ads.js');

async function getFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files = await Promise.all(dirents.map((dirent) => {
        const res = join(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    }));
    return files.flat();
}

async function main() {
    console.log('🚀 Starting bulk injection of ads.js ...');
    const files = await getFiles(ANIME_DIR);
    const htmlFiles = files.filter(f => f.endsWith('.html'));

    let modifiedCount = 0;

    for (const file of htmlFiles) {
        let content = await readFile(file, 'utf8');

        // Check if ads.js is already present
        if (content.includes('ads.js')) {
            continue;
        }

        // Calculate relative path to assets/js/ads.js
        // We are at 'file', we want to get to 'ASSETS_JS_PATH'
        // process.cwd() is usually root. 
        // Let's use path.relative from the file's directory to the assets dir.

        // Example:
        // File: /root/public/anime/dragon-ball/super.html
        // Target: /root/assets/js/ads.js

        // We need to find the dir of the file first
        const fileDir = file.substring(0, file.lastIndexOf(sep));
        let relativePath = relative(fileDir, ASSETS_JS_PATH);

        // Ensure posix delimiters for HTML
        relativePath = relativePath.split(sep).join('/');

        const scriptTag = `<script src="${relativePath}"></script>`;

        // Inject before body end
        if (content.includes('</body>')) {
            content = content.replace('</body>', `${scriptTag}\n</body>`);
            await writeFile(file, content, 'utf8');
            console.log(`✅ Injected ads into: ${file.split(sep).pop()} (Path: ${relativePath})`);
            modifiedCount++;
        } else {
            console.warn(`⚠️ No </body> tag found in: ${file}`);
        }
    }

    console.log(`\n🎉 Injection complete. Modified ${modifiedCount} files.`);
}

main().catch(console.error);
