import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../data.js', import.meta.url), 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);
const data = sandbox.window.RADAR_DATA;
const requiredProjectFields = ['id', 'name', 'description', 'industry', 'location', 'stage', 'amount', 'valuation', 'lastFunding', 'sources', 'informationUpdatedAt', 'confidence', 'why', 'uncertainties', 'verifyQuestions'];
const requiredEventFields = ['id', 'name', 'date', 'location', 'mode', 'organizer', 'theme', 'sources', 'informationUpdatedAt', 'quality', 'qualityReason'];
const problems = [];

function ensure(records, fields, label) {
  records.forEach((record, index) => {
    fields.forEach(field => { if (!record[field] || (Array.isArray(record[field]) && record[field].length === 0)) problems.push(`${label}[${index}] missing ${field}`); });
    (record.sources || []).forEach(item => { if (!/^https:\/\//.test(item.url || '')) problems.push(`${label}[${index}] has invalid source URL`); });
  });
}

ensure(data.projects, requiredProjectFields, 'project');
ensure(data.events, requiredEventFields, 'event');
if (data.projects.length < 20) problems.push(`expected >= 20 projects, received ${data.projects.length}`);
if (data.events.length < 20) problems.push(`expected >= 20 events, received ${data.events.length}`);
if ((data.ingestionTestCases?.duplicates || []).length < 3) problems.push('expected >= 3 duplicate-ingestion test cases');
if ((data.ingestionTestCases?.missingFields || []).length < 5) problems.push('expected >= 5 missing-field test cases');
if (data.events.filter(item => item.quality === '低').length < 3) problems.push('expected >= 3 low-value event examples');
const manualReviewProjects = data.projects.filter(item => item.confidence === '低' || item.needsManualReview);
if (manualReviewProjects.length < 5) problems.push('expected >= 5 low-confidence or manual-review project examples');

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(JSON.stringify({ projects: data.projects.length, events: data.events.length, duplicateIngestionCases: data.ingestionTestCases.duplicates.length, missingFieldCases: data.ingestionTestCases.missingFields.length, manualReviewProjects: manualReviewProjects.length, lowValueEvents: data.events.filter(item => item.quality === '低').length }, null, 2));
