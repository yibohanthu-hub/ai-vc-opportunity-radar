#!/usr/bin/env node

/**
 * Domestic-first public signal intake.
 *
 * This deliberately collects only a small number of public, no-key sources.
 * It writes a candidate queue, not a verified deal database: company identity,
 * financing, contacts, speakers and activity quality remain pending until a
 * human opens the original source.
 */
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const outputPath = join(root, 'live-signals.js');
const timeoutMs = 15_000;
const userAgent = 'AI-Opportunity-Radar-Demo/1.1 (domestic public-signal intake; contact: portfolio-demo)';
const sourceUrls = {
  infoq: 'https://www.infoq.cn/feed',
  qbitai: 'https://www.qbitai.com/feed',
  huodongxing: [
    { id: 'huodongxing-beijing', city: '北京', url: 'https://www.huodongxing.com/events?city=%E5%8C%97%E4%BA%AC&tag=AI' },
    { id: 'huodongxing-shanghai', city: '上海', url: 'https://www.huodongxing.com/events?city=%E4%B8%8A%E6%B5%B7&tag=AI' },
    { id: 'huodongxing-shenzhen', city: '深圳', url: 'https://www.huodongxing.com/events?city=%E6%B7%B1%E5%9C%B3&tag=AI' }
  ]
};

const aiTerms = /人工智能|\bAI\b|AIGC|大模型|生成式|智能体|Agent|具身智能|人形机器人|自动驾驶|机器学习|多模态|算力|推理|机器人|计算机视觉|语音模型|视觉模型|AI\s*Coding|VLA|世界模型|强化学习|\bRL\b/i;
const opportunityTerms = /创业|初创|融资|获投|天使|种子|Pre[-\s]?A|A轮|B轮|轮融资|发布|推出|上线|开源|产品|模型|智能体|机器人|公司|企业|团队|项目|成立|投资|估值|自动驾驶|具身/i;
const mainlandTerms = /中国|国内|本土|北京|上海|深圳|杭州|广州|成都|合肥|武汉|苏州|南京|厦门|宁波|西安|天津|长沙|东莞|重庆|青岛|济南|智谱|MiniMax|月之暗面|Kimi|百川|零一万物|阶跃|面壁|生数|硅基流动|DeepSeek|深度求索|轻舟|智元|银河通用|逐际|星尘|加速进化|松延|元象|帕西尼|Rokid|思谋|斯年智驾|原力灵机|优可测|无问芯穹/i;
const matureCompanyTerms = /阿里巴巴|阿里云|腾讯|百度|字节跳动|华为|蚂蚁集团|小米|京东|美团|拼多多|快手|联想|比亚迪|中国移动|中国电信|中国联通|苹果|Apple|Google|Meta|微软|Microsoft|英伟达|NVIDIA|金山|WPS|寒武纪|兆易创新|长电科技|澜起科技|上海电影|儒意/i;
const eventTerms = /活动|大会|峰会|论坛|展会|嘉年华|沙龙|研讨|课程|讲座|招聘|闭门分享/i;
const marketTerms = /A股|股市|指数|收跌|涨停|股价|公告|市值|研报|财报/i;

function cleanText(value = '') {
  return String(value)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#(?:x([0-9a-f]+)|([0-9]+));/gi, (_, hex, decimal) => String.fromCodePoint(parseInt(hex || decimal, hex ? 16 : 10)))
    .replace(/\s+/g, ' ')
    .trim();
}

function limitedText(value, max = 260) {
  const text = cleanText(value);
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function stableId(prefix, value) {
  let hash = 5381;
  for (const char of String(value).toLowerCase()) hash = ((hash << 5) + hash) ^ char.charCodeAt(0);
  return `${prefix}-${(hash >>> 0).toString(36)}`;
}

function titleKey(value) {
  return cleanText(value).toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, ' ').trim();
}

function toIso(value) {
  const time = Date.parse(value);
  return Number.isFinite(time) ? new Date(time).toISOString() : null;
}

function getTag(block, name) {
  const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'));
  return match ? cleanText(match[1]) : '';
}

function parseRss(xml) {
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(match => {
    const block = match[1];
    return {
      title: getTag(block, 'title'),
      url: getTag(block, 'link'),
      publishedAt: toIso(getTag(block, 'pubDate') || getTag(block, 'dc:date')),
      summary: limitedText(getTag(block, 'description') || getTag(block, 'content:encoded'))
    };
  }).filter(item => item.title && item.url);
}

async function request(name, url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        accept: 'application/rss+xml, application/xml, text/html;q=0.9, */*;q=0.5',
        'user-agent': userAgent
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } catch (error) {
    throw new Error(`${name}: ${error.name === 'AbortError' ? 'request timed out' : error.message}`);
  } finally {
    clearTimeout(timeout);
  }
}

function matchedRules({ title, summary, type }) {
  const corpus = `${title} ${summary}`;
  const matches = ['国内优先公开源'];
  if (aiTerms.test(corpus)) matches.push('AI 相关关键词');
  if (type === 'project' && opportunityTerms.test(corpus)) matches.push('创业 / 融资 / 产品关键词');
  if (type === 'project' && mainlandTerms.test(corpus)) matches.push('国内主体 / 场景关键词');
  if (type === 'event') matches.push('国内 AI 活动目录');
  return matches;
}

function isMainlandProjectCandidate(item) {
  const corpus = `${item.title} ${item.summary}`;
  return aiTerms.test(corpus)
    && opportunityTerms.test(corpus)
    && mainlandTerms.test(corpus)
    && !matureCompanyTerms.test(corpus)
    && !eventTerms.test(corpus)
    && !marketTerms.test(corpus);
}

function projectSignal({ title, url, publishedAt, summary, sourceName, sourceUrl, sourceWeight = 3, collectedAt }) {
  const rules = matchedRules({ title, summary, type: 'project' });
  return {
    id: stableId('live-project', url || title),
    kind: 'project',
    name: title,
    category: '国内创业 / 产品待核验',
    sourceName,
    sourceUrl,
    url,
    publishedAt: publishedAt || '未知',
    collectedAt,
    summary: summary || '来源未提供可用摘要；请打开原始链接核验主体、融资与产品信息。',
    confidence: '待核验',
    reasoning: `规则命中：${rules.join('、')}；自动收录为国内优先候选，不代表已确认公司、融资、所在地或投资价值。`,
    unknowns: ['公司主体与国内经营主体：待核验', '融资阶段、金额与估值：未知', '公开联系方式：待人工核验'],
    nextAction: '打开来源，先确认公司主体、主要经营地、AI 相关性与是否存在可验证融资 / 产品信息。',
    sources: [{ title: sourceName, url, type: '公开新闻 / RSS' }],
    score: { novelty: 5, source: sourceWeight, relevance: aiTerms.test(`${title} ${summary}`) ? 4 : 2, completeness: 1, followup: 4 }
  };
}

function eventSignal({ name, url, startDate, description, location, mode, organizer, sourceName, sourceUrl, sourceWeight = 3, collectedAt }) {
  const rules = matchedRules({ title: name, summary: description, type: 'event' });
  return {
    id: stableId('live-event', url || name),
    kind: 'event',
    name,
    category: '国内 AI 活动待核验',
    sourceName,
    sourceUrl,
    url,
    publishedAt: startDate || '未知',
    collectedAt,
    summary: description || '来源未提供活动描述；请打开官方 / 报名页确认。',
    confidence: '待核验',
    reasoning: `规则命中：${rules.join('、')}；活动质量、嘉宾、主办方和项目发现价值均未由 Agent 自动确认。`,
    unknowns: ['主办方、嘉宾和实际参与人群：待核验', '活动质量与项目发现价值：待人工筛选', '公开联系入口：请以来源页为准'],
    nextAction: '打开活动页，确认日期、主办方、嘉宾与是否存在创业者交流或项目展示机制。',
    eventMeta: {
      startDate: startDate || '未知',
      location: location || '未知',
      mode: mode || '未知',
      organizer: organizer || '未知'
    },
    sources: [{ title: sourceName, url, type: '公开活动目录' }],
    score: { novelty: 5, source: sourceWeight, relevance: 4, completeness: 2, followup: 4 }
  };
}

function parseHuodongxing(html, source, collectedAt) {
  const blocks = html.split(/<div class=["']search-tab-content-item-mesh\b[^>]*>/i).slice(1);
  const records = [];
  for (const block of blocks) {
    const titleMatch = block.match(/class=["']item-title["'][^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/i)
      || block.match(/class=["']item-logo["'][^>]*alt=["']([^"']+)/i);
    const hrefMatch = block.match(/<a\s+href=["']([^"']*\/event\/[^"']+)/i);
    const dateMatch = block.match(/class=["']item-dress[^"']*["'][\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i);
    const locationMatch = block.match(/class=["']item-dress-pp["'][^>]*>([\s\S]*?)<\/span>/i);
    const organizerMatch = block.match(/class=["']user-name["'][^>]*>([\s\S]*?)<\/p>/i);
    const name = cleanText(titleMatch?.[1] || '');
    const href = cleanText(hrefMatch?.[1] || '');
    if (!name || !href || !aiTerms.test(name)) continue;
    const canonical = new URL(href, 'https://www.huodongxing.com');
    canonical.search = '';
    const date = cleanText(dateMatch?.[1] || '');
    const location = cleanText(locationMatch?.[1] || source.city);
    const organizer = cleanText(organizerMatch?.[1] || '未知');
    records.push(eventSignal({
      name,
      url: canonical.href,
      startDate: date ? `${date}（活动行列表页，年份待核验）` : '未知',
      description: `活动行 ${source.city} AI 公开目录收录。主办方：${organizer || '未知'}；具体议程、嘉宾与项目展示需打开活动页核验。`,
      location,
      mode: '线下 / 待核验',
      organizer,
      sourceName: `活动行：${source.city} AI 活动目录`,
      sourceUrl: source.url,
      sourceWeight: 3,
      collectedAt
    }));
  }
  return records;
}

function uniqueByTitleAndUrl(items, limit) {
  const seen = new Set();
  return items.filter(item => {
    const key = `${titleKey(item.name)}|${item.url}`;
    if (!item.name || !item.url || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, limit);
}

const collectedAt = new Date().toISOString();
const sourceRuns = [];
const rawProjects = [];
let rawEvents = [];

async function runSource({ id, name, url, loader, target }) {
  try {
    const records = await loader();
    sourceRuns.push({ id, name, url, status: 'success', fetchedAt: collectedAt, records: records.length });
    if (target === 'project') rawProjects.push(...records);
    else rawEvents.push(...records);
  } catch (error) {
    sourceRuns.push({ id, name, url, status: 'error', fetchedAt: collectedAt, records: 0, message: limitedText(error.message, 120) });
  }
}

await runSource({
  id: 'infoq-rss',
  name: 'InfoQ 中文（国内 AI / 创业 / 产品新闻）',
  url: sourceUrls.infoq,
  target: 'project',
  loader: async () => parseRss(await request('InfoQ 中文 RSS', sourceUrls.infoq))
    .filter(isMainlandProjectCandidate)
    .map(item => projectSignal({ ...item, sourceName: 'InfoQ 中文（国内 AI / 创业 / 产品新闻）', sourceUrl: sourceUrls.infoq, sourceWeight: 4, collectedAt }))
});

await runSource({
  id: 'qbitai-rss',
  name: '量子位 RSS（国内 AI 新闻）',
  url: sourceUrls.qbitai,
  target: 'project',
  loader: async () => parseRss(await request('量子位 RSS', sourceUrls.qbitai))
    .filter(isMainlandProjectCandidate)
    .map(item => projectSignal({ ...item, sourceName: '量子位 RSS（国内 AI 新闻）', sourceUrl: sourceUrls.qbitai, sourceWeight: 4, collectedAt }))
});

for (const source of sourceUrls.huodongxing) {
  await runSource({
    id: source.id,
    name: `活动行：${source.city} AI 活动目录`,
    url: source.url,
    target: 'event',
    loader: async () => parseHuodongxing(await request(`活动行 ${source.city}`, source.url), source, collectedAt)
  });
}

const projectCandidates = uniqueByTitleAndUrl(rawProjects, 18);
rawEvents = uniqueByTitleAndUrl(rawEvents, 18);

if (!projectCandidates.length && !rawEvents.length) {
  console.error(JSON.stringify({ ok: false, reason: 'No domestic candidates were collected; previous live-signals.js was left untouched.', sources: sourceRuns }, null, 2));
  process.exitCode = 1;
} else {
  const payload = {
    version: 2,
    generatedAt: collectedAt,
    status: sourceRuns.some(source => source.status === 'error') ? 'partial' : 'success',
    disclaimer: '实时队列以国内公开来源为优先，只收录待核验候选。未知字段保持未知；必须打开原始来源并由投资经理核验后，才能进入正式项目 / 活动信息池。',
    sources: sourceRuns,
    projectCandidates,
    eventCandidates: rawEvents
  };
  const body = `/* Generated by scripts/refresh-live-signals.mjs. Do not hand-edit. */\n(function () {\n  window.RADAR_LIVE_SIGNALS = ${JSON.stringify(payload, null, 2)};\n})();\n`;
  await writeFile(outputPath, body, 'utf8');
  console.log(JSON.stringify({ ok: true, generatedAt: collectedAt, status: payload.status, projects: projectCandidates.length, events: rawEvents.length, sources: sourceRuns }, null, 2));
}
