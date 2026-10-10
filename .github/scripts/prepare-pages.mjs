import { mkdir, readdir, copyFile, writeFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const output = path.resolve(root, process.argv[2] || '_site');
if (!output.startsWith(root + path.sep)) throw new Error('The output must be a subdirectory of this project.');
await mkdir(output, { recursive: true });
if ((await readdir(output)).length) throw new Error('The _site output must be empty. GitHub Actions uses a fresh checkout.');
let files = 0;
async function copy(relative) {
  const destination = path.join(output, relative);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(path.join(root, relative), destination);
  files++;
}
async function assets(directory) {
  const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.woff2', '.css', '.js', '.json', '.txt']);
  for (const entry of await readdir(path.join(root, directory), { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const relative = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error('Linked assets are not supported.');
    if (entry.isDirectory()) await assets(relative);
    else if (entry.isFile() && allowed.has(path.extname(entry.name).toLowerCase())) await copy(relative);
  }
}
for (const relative of ['index.html', 'styles.css', 'config.js', 'app.js']) await copy(relative);
await assets('assets');
let html = await readFile(path.join(root, 'index.html'), 'utf8');
for (const relative of ['config.js', 'app.js', 'styles.css']) {
  const version = createHash('sha256').update(await readFile(path.join(root, relative))).digest('hex').slice(0, 16);
  const escaped = relative.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const attribute = new RegExp(`((?:src|href)=")${escaped}(?:\\?[^"\\s]*)?("[\\s>])`, 'g');
  html = html.replace(attribute, `$1${relative}?v=${version}$2`);
}
await writeFile(path.join(output, 'index.html'), html);
await writeFile(path.join(output, '.nojekyll'), '');
console.log(JSON.stringify({ directory: path.relative(root, output), files: files + 1, result: 'Public website files prepared' }));
