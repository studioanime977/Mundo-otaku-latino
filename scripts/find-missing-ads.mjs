
import { readdir, readFile } from 'fs/promises';
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

async function main() {
    console.log('Scanning for files missing ads.js...');
    const files = await getFiles(ANIME_DIR);
    const htmlFiles = files.filter(f => f.endsWith('.html'));

    let count = 0;
    for (const file of htmlFiles) {
        const content = await readFile(file, 'utf8');
        if (!content.includes('ads.js')) {
            console.log(`❌ Missing ads.js: ${file.replace(process.cwd(), '')}`);
            count++;
        }
    }

    console.log(`\nFound ${count} files missing ads.js out of ${htmlFiles.length} total.`);
}

main().catch(console.error);
