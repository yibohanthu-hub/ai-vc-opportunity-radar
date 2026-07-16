import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const client = join(dist, 'client');
const server = join(dist, 'server');
const assets = ['index.html', 'app.js', 'data.js', 'live-signals.js', 'styles.css', 'favicon.svg'];

const workerSource = `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);
    const isHtml = (response.headers.get('content-type') || '').includes('text/html');

    if (request.method === 'GET' && isHtml && (url.pathname === '/' || url.pathname.endsWith('/index.html'))) {
      const html = (await response.text()).replaceAll('__SITE_ORIGIN__', url.origin);
      const headers = new Headers(response.headers);
      headers.delete('content-length');
      return new Response(html, { status: response.status, statusText: response.statusText, headers });
    }

    if (request.method === 'GET' && response.status === 404) {
      return env.ASSETS.fetch(new Request(new URL('/', url), request));
    }

    return response;
  }
};
`;

await rm(dist, { recursive: true, force: true });
await mkdir(client, { recursive: true });
await mkdir(server, { recursive: true });

for (const asset of assets) await copyFile(join(root, asset), join(client, asset));
await copyFile(join(root, 'public', 'og.png'), join(client, 'og.png'));
await writeFile(join(server, 'index.js'), workerSource, 'utf8');

console.log(`Static release bundle created in ${dist}`);
