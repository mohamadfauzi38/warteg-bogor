import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };
const pages = new Set(['index.html', 'styles.css', 'app.js', 'config.js']);

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    const relative = decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html';
    const segments = relative.split(/[\\/]/);
    if (segments.some(segment => segment.startsWith('.') || segment === '..') || (!pages.has(relative) && !relative.startsWith('assets/'))) {
      response.writeHead(404); response.end('Not found'); return;
    }
    const fullPath = path.resolve(root, relative);
    if (!fullPath.startsWith(root + path.sep)) { response.writeHead(404); response.end('Not found'); return; }
    const bytes = await readFile(fullPath);
    response.writeHead(200, { 'Content-Type': mime[path.extname(fullPath)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    response.end(bytes);
  } catch {
    response.writeHead(404); response.end('Not found');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Warteg Bogor siap di http://127.0.0.1:${port}`));
