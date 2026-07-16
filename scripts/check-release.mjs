import { access, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const files = [
  'server/index.js',
  'client/index.html',
  'client/app.js',
  'client/data.js',
  'client/live-signals.js',
  'client/styles.css',
  'client/favicon.svg',
  'client/og.png'
];

for (const file of files) await access(join(dist, file));

const worker = await readFile(join(dist, 'server/index.js'), 'utf8');
const html = await readFile(join(dist, 'client/index.html'), 'utf8');
const liveSignals = await readFile(join(dist, 'client/live-signals.js'), 'utf8');
const png = await readFile(join(dist, 'client/og.png'));
const ogStat = await stat(join(dist, 'client/og.png'));

if (!worker.includes('env.ASSETS.fetch')) throw new Error('Release worker does not serve static assets.');
if (!html.includes('__SITE_ORIGIN__/og.png')) throw new Error('Open Graph image metadata is missing.');
if (!html.includes('./live-signals.js') || !liveSignals.includes('window.RADAR_LIVE_SIGNALS')) throw new Error('Live signal queue is not included in the release bundle.');
if (png.subarray(0, 8).compare(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) !== 0) throw new Error('Open Graph asset is not a PNG.');
if (ogStat.size < 10_000) throw new Error('Open Graph asset is unexpectedly small.');

console.log(JSON.stringify({ releaseFiles: files.length, ogImageBytes: ogStat.size, liveSignalsBytes: Buffer.byteLength(liveSignals) }, null, 2));
