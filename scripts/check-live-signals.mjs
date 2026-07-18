import { readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const file = fileURLToPath(new URL('../live-signals.js', import.meta.url));
globalThis.window = {};
await import(`${pathToFileURL(file).href}?checked=${Date.now()}`);
const data = globalThis.window.RADAR_LIVE_SIGNALS;

if (!data || !Array.isArray(data.sources) || !Array.isArray(data.projectCandidates) || !Array.isArray(data.eventCandidates)) {
  throw new Error('live-signals.js does not expose the expected payload.');
}
if (!Number.isFinite(Date.parse(data.generatedAt))) throw new Error('live signal generatedAt must be an ISO timestamp.');
if (!data.projectCandidates.length && !data.eventCandidates.length) throw new Error('live signal queue must contain at least one collected candidate.');
if (!data.retention || !Number.isInteger(data.retention.days) || data.retention.days < 1) throw new Error('live signal retention metadata is missing or invalid.');
if (!data.fresh || !Number.isInteger(data.fresh.projects) || !Number.isInteger(data.fresh.events)) throw new Error('live signal fresh-count metadata is missing or invalid.');

for (const candidate of [...data.projectCandidates, ...data.eventCandidates]) {
  if (!candidate.id || !candidate.name || !candidate.url || !candidate.collectedAt) throw new Error(`invalid candidate: ${JSON.stringify(candidate)}`);
  if (!candidate.firstCollectedAt || !candidate.lastSeenAt || !Number.isInteger(candidate.seenCount)) throw new Error(`candidate retention metadata is invalid: ${candidate.id}`);
  if (candidate.confidence !== '待核验') throw new Error(`candidate must remain pending verification: ${candidate.id}`);
  if (!candidate.sources?.[0]?.url) throw new Error(`candidate source is missing: ${candidate.id}`);
}

console.log(JSON.stringify({
  generatedAt: data.generatedAt,
  status: data.status,
  sources: data.sources.length,
  successfulSources: data.sources.filter(source => source.status === 'success').length,
  fresh: data.fresh,
  retentionDays: data.retention.days,
  projects: data.projectCandidates.length,
  events: data.eventCandidates.length
}, null, 2));
