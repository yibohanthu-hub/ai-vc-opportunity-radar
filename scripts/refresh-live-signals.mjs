#!/usr/bin/env node

/**
 * Domestic-first public signal intake.
 *
 * This collects a deliberately bounded set of public, no-key sources.
 * It writes a rolling candidate queue, not a verified deal database: company identity,
 * financing, contacts, speakers and activity quality remain pending until a
 * human opens the original source.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const outputPath = join(root, 'live-signals.js');
const timeoutMs = 15_000;
const userAgent = 'AI-Opportunity-Radar-Demo/1.2 (domestic public-signal intake; contact: portfolio-demo)';
const retentionDays = 45;
const maxRssItemAgeDays = 120;
const maxProjectCandidates = 120;
const maxEventCandidates = 120;
const sourceUrls = {
  infoq: 'https://www.infoq.cn/feed',
  qbitai: 'https://www.qbitai.com/feed',
  kr36Financing: 'https://pitchhub.36kr.com/financing-flash',
  // 36 氪公开说明页列出的 RSS。这里只保留标题、摘要、时间和原始链接，
  // 并继续按国内 / AI / 创业或产品规则筛选，不把整条资讯流当作项目库。
  kr36Rss: [
    { id: '36kr-rss-main', name: '36氪 RSS（公开创投 / 科技资讯）', url: 'https://36kr.com/feed' },
    { id: '36kr-rss-article', name: '36氪文章 RSS（公开科技 / 创业报道）', url: 'https://36kr.com/feed-article' },
    { id: '36kr-rss-newsflash', name: '36氪快讯 RSS（公开产品 / 融资快讯）', url: 'https://36kr.com/feed-newsflash' }
  ],
  // 雷峰网公开列出的 RSS 分类。AI、机器人、智能驾驶和投融资共同覆盖
  // 早期 AI 公司、具身智能、自动驾驶及融资线索；依旧由后续规则筛选。
  leiphoneRss: [
    { id: 'leiphone-ai', name: '雷峰网 RSS（人工智能 / 创业报道）', url: 'https://www.leiphone.com/feed/categoryRss/name/ai' },
    { id: 'leiphone-robot', name: '雷峰网 RSS（机器人 / 创业报道）', url: 'https://www.leiphone.com/feed/categoryRss/name/robot' },
    { id: 'leiphone-transportation', name: '雷峰网 RSS（智能驾驶 / 创业报道）', url: 'https://www.leiphone.com/feed/categoryRss/name/transportation' },
    { id: 'leiphone-financing', name: '雷峰网 RSS（投融资 / 创业报道）', url: 'https://www.leiphone.com/feed/categoryRss/name/touzi' }
  ],
  huodongxing: [
    { id: 'huodongxing-beijing', city: '北京', url: 'https://www.huodongxing.com/events?city=%E5%8C%97%E4%BA%AC&tag=AI' },
    { id: 'huodongxing-shanghai', city: '上海', url: 'https://www.huodongxing.com/events?city=%E4%B8%8A%E6%B5%B7&tag=AI' },
    { id: 'huodongxing-shenzhen', city: '深圳', url: 'https://www.huodongxing.com/events?city=%E6%B7%B1%E5%9C%B3&tag=AI' },
    { id: 'huodongxing-hangzhou', city: '杭州', url: 'https://www.huodongxing.com/events?city=%E6%9D%AD%E5%B7%9E&tag=AI' },
    { id: 'huodongxing-guangzhou', city: '广州', url: 'https://www.huodongxing.com/events?city=%E5%B9%BF%E5%B7%9E&tag=AI' },
    { id: 'huodongxing-chengdu', city: '成都', url: 'https://www.huodongxing.com/events?city=%E6%88%90%E9%83%BD&tag=AI' },
    { id: 'huodongxing-nanjing', city: '南京', url: 'https://www.huodongxing.com/events?city=%E5%8D%97%E4%BA%AC&tag=AI' },
    { id: 'huodongxing-wuhan', city: '武汉', url: 'https://www.huodongxing.com/events?city=%E6%AD%A6%E6%B1%89&tag=AI' },
    { id: 'huodongxing-suzhou', city: '苏州', url: 'https://www.huodongxing.com/events?city=%E8%8B%8F%E5%B7%9E&tag=AI' },
    { id: 'huodongxing-xian', city: '西安', url: 'https://www.huodongxing.com/events?city=%E8%A5%BF%E5%AE%89&tag=AI' },
    { id: 'huodongxing-chongqing', city: '重庆', url: 'https://www.huodongxing.com/events?city=%E9%87%8D%E5%BA%86&tag=AI' },
    { id: 'huodongxing-tianjin', city: '天津', url: 'https://www.huodongxing.com/events?city=%E5%A4%A9%E6%B4%A5&tag=AI' },
    { id: 'huodongxing-changsha', city: '长沙', url: 'https://www.huodongxing.com/events?city=%E9%95%BF%E6%B2%99&tag=AI' },
    { id: 'huodongxing-hefei', city: '合肥', url: 'https://www.huodongxing.com/events?city=%E5%90%88%E8%82%A5&tag=AI' },
    { id: 'huodongxing-xiamen', city: '厦门', url: 'https://www.huodongxing.com/events?city=%E5%8E%A6%E9%97%A8&tag=AI' },
    { id: 'huodongxing-qingdao', city: '青岛', url: 'https://www.huodongxing.com/events?city=%E9%9D%92%E5%B2%9B&tag=AI' },
    { id: 'huodongxing-ningbo', city: '宁波', url: 'https://www.huodongxing.com/events?city=%E5%AE%81%E6%B3%A2&tag=AI' },
    { id: 'huodongxing-dongguan', city: '东莞', url: 'https://www.huodongxing.com/events?city=%E4%B8%9C%E8%8E%9E&tag=AI' },
    { id: 'huodongxing-foshan', city: '佛山', url: 'https://www.huodongxing.com/events?city=%E4%BD%9B%E5%B1%B1&tag=AI' },
    { id: 'huodongxing-wuxi', city: '无锡', url: 'https://www.huodongxing.com/events?city=%E6%97%A0%E9%94%A1&tag=AI' },
    { id: 'huodongxing-jinan', city: '济南', url: 'https://www.huodongxing.com/events?city=%E6%B5%8E%E5%8D%97&tag=AI' },
    { id: 'huodongxing-zhengzhou', city: '郑州', url: 'https://www.huodongxing.com/events?city=%E9%83%91%E5%B7%9E&tag=AI' },
    { id: 'huodongxing-fuzhou', city: '福州', url: 'https://www.huodongxing.com/events?city=%E7%A6%8F%E5%B7%9E&tag=AI' },
    { id: 'huodongxing-kunming', city: '昆明', url: 'https://www.huodongxing.com/events?city=%E6%98%86%E6%98%8E&tag=AI' },
    { id: 'huodongxing-nanchang', city: '南昌', url: 'https://www.huodongxing.com/events?city=%E5%8D%97%E6%98%8C&tag=AI' },
    { id: 'huodongxing-shenyang', city: '沈阳', url: 'https://www.huodongxing.com/events?city=%E6%B2%88%E9%98%B3&tag=AI' },
    { id: 'huodongxing-dalian', city: '大连', url: 'https://www.huodongxing.com/events?city=%E5%A4%A7%E8%BF%9E&tag=AI' },
    { id: 'huodongxing-changzhou', city: '常州', url: 'https://www.huodongxing.com/events?city=%E5%B8%B8%E5%B7%9E&tag=AI' }
  ]
};

const aiTerms = /人工智能|\bAI\b|AIGC|大模型|生成式|智能体|Agent|具身智能|人形机器人|自动驾驶|机器学习|多模态|算力|推理|机器人|计算机视觉|语音模型|视觉模型|AI\s*Coding|VLA|世界模型|强化学习|\bRL\b/i;
const opportunityTerms = /创业|初创|融资|获投|天使|种子|Pre[-\s]?A|A轮|B轮|轮融资|发布|推出|上线|开源|产品|模型|智能体|机器人|公司|企业|团队|项目|成立|投资|估值|自动驾驶|具身/i;
const mainlandTerms = /中国|国内|本土|北京|上海|深圳|杭州|广州|成都|合肥|武汉|苏州|南京|厦门|宁波|西安|天津|长沙|东莞|重庆|青岛|济南|智谱|MiniMax|月之暗面|Kimi|百川|零一万物|阶跃|面壁|生数|硅基流动|DeepSeek|深度求索|轻舟|智元|银河通用|逐际|星尘|加速进化|松延|元象|帕西尼|Rokid|思谋|斯年智驾|原力灵机|优可测|无问芯穹/i;
const matureCompanyTerms = /阿里巴巴|阿里云|腾讯|百度|字节跳动|华为|蚂蚁集团|小米|京东|美团|拼多多|快手|联想|比亚迪|理想汽车|蔚来|小鹏|中国移动|中国电信|中国联通|商汤|科大讯飞|苹果|Apple|Google|Meta|微软|Microsoft|英伟达|NVIDIA|英特尔|Intel|OpenAI|ChatGPT|Claude|Mistral|Tesla|SpaceX|金山|WPS|寒武纪|兆易创新|长电科技|澜起科技|上海电影|儒意/i;
// 新闻源里的 AI 技术会议、报告和研究机构资讯不应冒充“创业项目候选”。
// 这里宁可漏掉边缘线索，也把实时队列优先留给可进一步核验的公司 / 产品。
const eventTerms = /活动|大会|峰会|论坛|展会|嘉年华|沙龙|研讨|课程|讲座|招聘|闭门分享|AICon|ICRA|CVPR|NeurIPS|ICML|ACL|报告|白皮书|研究院|实验室|训练营|开发者日/i;
const marketTerms = /A股|股市|指数|收跌|涨停|股价|公告|市值|研报|财报/i;
const researchNoiseTerms = /一作|论文|研究员|学术会议|课题组/i;

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

function isRecentRssItem(item) {
  const timestamp = Date.parse(item.publishedAt || '');
  // 某些公开 RSS 会把多年旧文重新置顶。能解析到日期时，拒绝过旧条目；
  // 不能解析日期的条目仍可作为候选，但会在页面上暴露其来源时间状态。
  return !Number.isFinite(timestamp) || timestamp >= Date.now() - maxRssItemAgeDays * 24 * 60 * 60 * 1000;
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
    && !researchNoiseTerms.test(corpus)
    && !marketTerms.test(corpus);
}

function isKr36FinancingCandidate(item) {
  const corpus = `${item.title} ${item.summary}`;
  // 36 氪融资快报本身是公开创业 / 融资目录，因此只以标题和摘要判断 AI
  // 相关性与排除项。这里不从中文媒体页面自动推断公司注册地、融资事实或
  // 主体信息，页面仍会把这类字段标成待核验。
  return aiTerms.test(corpus)
    && opportunityTerms.test(corpus)
    && !eventTerms.test(corpus)
    && !marketTerms.test(corpus);
}

function fundingStageHint(value = '') {
  const corpus = cleanText(value);
  if (/种子\+?\+?轮/i.test(corpus)) return corpus.match(/种子\+?\+?轮/i)?.[0] || '种子轮';
  if (/天使\+?\+?轮/i.test(corpus)) return corpus.match(/天使\+?\+?轮/i)?.[0] || '天使轮';
  if (/Pre[-\s]?A\+?轮/i.test(corpus)) return corpus.match(/Pre[-\s]?A\+?轮/i)?.[0]?.replace(/\s+/g, '') || 'Pre-A';
  if (/A\+?轮/i.test(corpus)) return corpus.match(/A\+?轮/i)?.[0] || 'A轮';
  if (/B\+?轮/i.test(corpus)) return corpus.match(/B\+?轮/i)?.[0] || 'B轮';
  return '阶段待核验';
}

function isEarlyStageHint(stage) {
  return /种子|天使|Pre[-\s]?A|\bA\+?轮/i.test(stage);
}

function projectSignal({ title, url, publishedAt, summary, sourceName, sourceUrl, sourceWeight = 3, collectedAt }) {
  const stageHint = fundingStageHint(`${title} ${summary}`);
  const earlyStage = isEarlyStageHint(stageHint);
  const rules = matchedRules({ title, summary, type: 'project' });
  if (stageHint !== '阶段待核验') rules.push(`标题 / 摘要阶段线索：${stageHint}`);
  return {
    id: stableId('live-project', url || title),
    kind: 'project',
    name: title,
    category: earlyStage ? '国内早期创业 / 产品待核验' : '国内创业 / 产品待核验',
    sourceName,
    sourceUrl,
    url,
    publishedAt: publishedAt || '未知',
    collectedAt,
    stageHint,
    earlyStage,
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

function parseKr36Financing(html, source, collectedAt) {
  const blocks = html.split(/<div\s+class=(?:["']?css-xle9x["']?)[^>]*>/i).slice(1);
  const records = [];
  for (const block of blocks) {
    const titleMatch = block.match(/<a\b[^>]*\bclass=(?:["'][^"']*\btitle\b[^"']*["']|title)[^>]*\bhref=(?:["']([^"']+)["']|([^\s>]+))[^>]*>([\s\S]*?)<\/a>/i);
    const title = cleanText(titleMatch?.[3] || '');
    const href = cleanText(titleMatch?.[1] || titleMatch?.[2] || '');
    if (!title || !href) continue;

    let canonical;
    try {
      canonical = new URL(href, 'https://36kr.com');
    } catch {
      continue;
    }
    if (!/^(?:www\.)?36kr\.com$/i.test(canonical.hostname)) continue;

    const descriptionMatch = block.match(/<div\s+class=(?:["']?item-desc["']?)[^>]*>\s*<span[^>]*>([\s\S]*?)<\/span>/i);
    const timeMatch = block.match(/<span\s+class=(?:["']?time["']?)[^>]*>([\s\S]*?)<\/span>/i);
    const item = {
      title,
      url: canonical.href,
      publishedAt: cleanText(timeMatch?.[1] || '') || null,
      summary: limitedText(descriptionMatch?.[1] || '')
    };
    if (!isKr36FinancingCandidate(item)) continue;
    records.push(projectSignal({
      ...item,
      sourceName: '36氪融资快报（公开融资 / 创业线索）',
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

function candidateKey(item) {
  try {
    const canonical = new URL(item.url);
    canonical.hash = '';
    canonical.search = '';
    return `${item.kind}|${canonical.href}`;
  } catch {
    return `${item.kind}|${titleKey(item.name)}`;
  }
}

async function previousQueue() {
  try {
    const body = await readFile(outputPath, 'utf8');
    const match = body.match(/window\.RADAR_LIVE_SIGNALS\s*=\s*(\{[\s\S]*\})\s*;\s*\n\}\)\(\);\s*$/);
    if (!match) return null;
    const payload = JSON.parse(match[1]);
    return payload && typeof payload === 'object' ? payload : null;
  } catch {
    return null;
  }
}

function candidateTimestamp(item) {
  const timestamp = Date.parse(item.lastSeenAt || item.collectedAt || item.publishedAt || '');
  return Number.isFinite(timestamp) ? timestamp : 0;
}

function mergeRollingCandidates(fresh, previous, limit) {
  const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
  // V2 队列没有 retention 元数据。升级时将其用原有抓取时间初始化，
  // 这样旧候选不会因为字段升级而被丢失或在校验中变成不完整记录。
const previousItems = (previous || [])
    .filter(item => item && item.id && item.name && item.url && candidateTimestamp(item) >= cutoff && isRecentRssItem(item))
    .map(item => {
      const knownAt = item.lastSeenAt || item.collectedAt || item.publishedAt || collectedAt;
      return {
        ...item,
        firstCollectedAt: item.firstCollectedAt || item.collectedAt || knownAt,
        lastSeenAt: item.lastSeenAt || item.collectedAt || knownAt,
        seenCount: Number.isInteger(item.seenCount) && item.seenCount > 0 ? item.seenCount : 1,
        isNew: false
      };
    });
  const previousByKey = new Map(previousItems.map(item => [candidateKey(item), item]));
  const seen = new Set();
  const current = fresh.map(item => {
    const key = candidateKey(item);
    const prior = previousByKey.get(key);
    seen.add(key);
    return {
      ...item,
      firstCollectedAt: prior?.firstCollectedAt || prior?.collectedAt || collectedAt,
      lastSeenAt: collectedAt,
      seenCount: (Number(prior?.seenCount) || 0) + 1,
      isNew: !prior
    };
  });
  const retained = previousItems
    .filter(item => !seen.has(candidateKey(item)))
    .map(item => ({ ...item, isNew: false }));
  return [...current, ...retained]
    .sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) || candidateTimestamp(b) - candidateTimestamp(a))
    .slice(0, limit);
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
    .filter(isRecentRssItem)
    .filter(isMainlandProjectCandidate)
    .map(item => projectSignal({ ...item, sourceName: 'InfoQ 中文（国内 AI / 创业 / 产品新闻）', sourceUrl: sourceUrls.infoq, sourceWeight: 4, collectedAt }))
});

await runSource({
  id: 'qbitai-rss',
  name: '量子位 RSS（国内 AI 新闻）',
  url: sourceUrls.qbitai,
  target: 'project',
  loader: async () => parseRss(await request('量子位 RSS', sourceUrls.qbitai))
    .filter(isRecentRssItem)
    .filter(isMainlandProjectCandidate)
    .map(item => projectSignal({ ...item, sourceName: '量子位 RSS（国内 AI 新闻）', sourceUrl: sourceUrls.qbitai, sourceWeight: 4, collectedAt }))
});

await runSource({
  id: '36kr-financing-flash',
  name: '36氪融资快报（公开融资 / 创业线索）',
  url: sourceUrls.kr36Financing,
  target: 'project',
  loader: async () => parseKr36Financing(await request('36氪融资快报', sourceUrls.kr36Financing), { url: sourceUrls.kr36Financing }, collectedAt)
});

for (const source of sourceUrls.kr36Rss) {
  await runSource({
    id: source.id,
    name: source.name,
    url: source.url,
    target: 'project',
    loader: async () => parseRss(await request(source.name, source.url))
      .filter(isRecentRssItem)
      .filter(isMainlandProjectCandidate)
      .map(item => projectSignal({ ...item, sourceName: source.name, sourceUrl: source.url, sourceWeight: 3, collectedAt }))
  });
}

for (const source of sourceUrls.leiphoneRss) {
  await runSource({
    id: source.id,
    name: source.name,
    url: source.url,
    target: 'project',
    loader: async () => parseRss(await request(source.name, source.url))
      .filter(isRecentRssItem)
      .filter(isMainlandProjectCandidate)
      .map(item => projectSignal({ ...item, sourceName: source.name, sourceUrl: source.url, sourceWeight: 4, collectedAt }))
  });
}

for (const source of sourceUrls.huodongxing) {
  await runSource({
    id: source.id,
    name: `活动行：${source.city} AI 活动目录`,
    url: source.url,
    target: 'event',
    loader: async () => parseHuodongxing(await request(`活动行 ${source.city}`, source.url), source, collectedAt)
  });
}

const freshProjects = uniqueByTitleAndUrl(rawProjects, maxProjectCandidates);
const freshEvents = uniqueByTitleAndUrl(rawEvents, maxEventCandidates);
const previous = await previousQueue();
const projectCandidates = mergeRollingCandidates(freshProjects, previous?.projectCandidates, maxProjectCandidates);
const eventCandidates = mergeRollingCandidates(freshEvents, previous?.eventCandidates, maxEventCandidates);

if (!freshProjects.length && !freshEvents.length) {
  console.error(JSON.stringify({ ok: false, reason: 'No domestic candidates were collected; previous live-signals.js was left untouched.', sources: sourceRuns }, null, 2));
  process.exitCode = 1;
} else {
  const payload = {
    version: 3,
    generatedAt: collectedAt,
    status: sourceRuns.some(source => source.status === 'error') ? 'partial' : 'success',
    disclaimer: `实时队列以国内公开来源为优先，保留近 ${retentionDays} 天待核验候选。未知字段保持未知；必须打开原始来源并由投资经理核验后，才能进入正式项目 / 活动信息池。`,
    refreshCadence: '每 4 小时自动采集并发布一次（GitHub Actions 尽力调度）',
    retention: { days: retentionDays, maxProjectCandidates, maxEventCandidates },
    fresh: { projects: projectCandidates.filter(item => item.isNew).length, events: eventCandidates.filter(item => item.isNew).length },
    sources: sourceRuns,
    projectCandidates,
    eventCandidates
  };
  const body = `/* Generated by scripts/refresh-live-signals.mjs. Do not hand-edit. */\n(function () {\n  window.RADAR_LIVE_SIGNALS = ${JSON.stringify(payload, null, 2)};\n})();\n`;
  await writeFile(outputPath, body, 'utf8');
  console.log(JSON.stringify({ ok: true, generatedAt: collectedAt, status: payload.status, fresh: payload.fresh, projects: projectCandidates.length, events: eventCandidates.length, sources: sourceRuns }, null, 2));
}
