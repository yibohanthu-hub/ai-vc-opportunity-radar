(() => {
  const DATA = window.RADAR_DATA;
  const LIVE = window.RADAR_LIVE_SIGNALS || {
    generatedAt: null,
    status: 'unavailable',
    disclaimer: '实时线索数据尚未生成。',
    sources: [],
    projectCandidates: [],
    eventCandidates: []
  };
  const STORAGE_KEY = 'vc-opportunity-radar-demo-v1';
  const SAMPLE_DATE = '2026-07-17';
  const projectSeedToday = new Set(['zhipu-ai', 'minimax', 'moonshot', 'stepfun', 'siliconflow', 'agibot', 'galbot', 'deepseek', 'neoteai', 'weifan-intelligence', 'synmat-ai', 'manifold-ai', 'k2-lab', 'wujie-dynamics', 'cas-yukun', 'neowa-robotics', 'shunheng-intelligence', 'chengwu-robotics', 'lexiang-technology', 'physis-ai', 'xingyuan-zhi', 'beta-infinity', 'fuan-intelligence', 'zhuizhi-engineering', 'quantum-leap', 'roboparty', 'crown-physical-ai', 'coolqq-cookiepi', 'bxi-robotics', 'lingqiao-intelligence', 'newqi-robotics', 'brainrock-embodied', 'coddie-ai', 'xingyi-ai', 'molian-agent-net', 'zhizi-computing', 'ace-robotics', 'xing-su-steering', 'mifeng-physical-data', 'baiyao-virtual-cell', 'qingtian-robot-leasing', 'knowin-robotics', 'zhengxing-physical-ai', 'meixin-food-ai', 'dm-robotics']);
  const eventSeedToday = new Set(['waic-2026', 'waic-academic-2026', 'wrc-2026', 'cicai-2026', 'ai-interactive-film-game', 'embodied-robot-commercialization', 'gaiec-2026', 'ai-show-hangzhou-2026', 'gaie-shenzhen-2026', 'shenzhen-bci-challenge-2026', 'gaic-hangzhou-2026', 'idc-ai-summit-2026', 'iaicc-2026', 'ai-hangzhou-2026', 'robotech-2026', 'beijing-ai-innovation-challenge-2026', 'embodied-robot-forum-2026', 'embodied-robot-components-2026', 'seai-guangzhou-2026', 'shenzhi-cup-2026', 'startup-shanghai-2026']);

  const initialState = {
    favorites: {},
    ignored: {},
    tags: {},
    followups: {},
    viewed: {},
    behavior: [],
    selected: {},
    lastRefresh: DATA.snapshot.poolUpdatedAt
  };

  let state = loadState();
  let toast = '';
  const ui = {
    project: { search: '', date: 'all', industry: '', region: '', stage: '', amount: 'all', bBefore: '', confidence: '', sort: 'score' },
    event: { search: '', theme: '', type: '', location: '', mode: '', quality: '', discovery: '', time: 'all', sort: 'score' },
    signal: { search: '', kind: '', source: '' }
  };

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return { ...initialState, ...stored, favorites: stored.favorites || {}, ignored: stored.ignored || {}, tags: stored.tags || {}, followups: stored.followups || {}, viewed: stored.viewed || {}, behavior: stored.behavior || [], selected: {} };
    } catch {
      return { ...initialState };
    }
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, selected: {} }));
  }

  function key(type, id) { return `${type}:${id}`; }
  function tagList(type, id) { return state.tags[key(type, id)] || []; }
  function followup(type, id) { return state.followups[key(type, id)] || '未处理'; }
  function isFavorite(type, id) { return Boolean(state.favorites[key(type, id)]); }
  function isIgnored(type, id) { return Boolean(state.ignored[key(type, id)]); }
  function isSelected(type, id) { return Boolean(state.selected[key(type, id)]); }
  function liveCandidates() { return [...(LIVE.projectCandidates || []), ...(LIVE.eventCandidates || [])]; }
  function liveProjectCandidates() { return [...(LIVE.projectCandidates || [])]; }
  function liveEventCandidates() { return [...(LIVE.eventCandidates || [])]; }
  function entity(type, id) {
    const collection = type === 'project' ? DATA.projects : type === 'event' ? DATA.events : liveCandidates();
    return collection.find(item => item.id === id);
  }
  function entityScore(item) { return Object.values(item.score).reduce((sum, value) => sum + value, 0); }
  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[char]);
  }
  function routeParts() { return (location.hash.replace(/^#\/?/, '') || 'dashboard').split('/'); }
  function routeName() { return routeParts()[0] || 'dashboard'; }
  function routeEntityId() { return routeParts()[1]; }
  function go(path) { location.hash = path.startsWith('#') ? path : `#/${path}`; }
  function record(action, type, id, meta = {}) {
    state.behavior = [{ action, type, id, at: new Date().toISOString(), ...meta }, ...state.behavior].slice(0, 80);
    persist();
  }
  function setToast(message) {
    toast = message;
    render();
    window.setTimeout(() => { if (toast === message) { toast = ''; render(); } }, 2800);
  }
  function sourceLinks(sources) {
    return sources.map(item => `<a class="source-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer"><span>${escapeHtml(item.type)}</span>${escapeHtml(item.title)}<b>↗</b></a>`).join('');
  }
  function statusClass(status) { return `status-${status.replace(/[^\w\u4e00-\u9fff]/g, '')}`; }
  function confidenceClass(value) { return value === '高' ? 'confidence-high' : value === '中' ? 'confidence-mid' : 'confidence-low'; }
  function scoreBar(score, max) { return `<span class="score-bar"><i style="width:${Math.round((score / max) * 100)}%"></i></span>`; }
  function chip(text, className = '') { return `<span class="chip ${className}">${escapeHtml(text)}</span>`; }
  function statusControl(type, id) {
    const current = followup(type, id);
    return `<label class="select-wrap compact"><span class="sr-only">跟进状态</span><select data-action="set-status" data-type="${type}" data-id="${id}">${['未处理', '待研究', '待联系', '已联系', '暂停'].map(item => `<option ${item === current ? 'selected' : ''}>${item}</option>`).join('')}</select></label>`;
  }
  function tagsMarkup(type, id) {
    const tags = tagList(type, id);
    return `<div class="tag-row">${tags.map(tag => chip(tag, 'tag-user')).join('')}<button class="text-button" data-action="add-tag" data-type="${type}" data-id="${id}">+ 标签</button></div>`;
  }
  function actionButtons(type, id, compact = false) {
    const favorite = isFavorite(type, id);
    const ignored = isIgnored(type, id);
    return `<div class="card-actions ${compact ? 'compact' : ''}">
      <button class="icon-action ${favorite ? 'active' : ''}" title="${favorite ? '取消收藏' : '收藏'}" data-action="favorite" data-type="${type}" data-id="${id}">${favorite ? '★ 已收藏' : '☆ 收藏'}</button>
      <button class="icon-action ${ignored ? 'active-ignored' : ''}" title="${ignored ? '取消忽略' : '忽略'}" data-action="ignore" data-type="${type}" data-id="${id}">${ignored ? '↺ 恢复' : '⊘ 忽略'}</button>
    </div>`;
  }
  function empty(title, text, route) {
    return `<section class="empty-state"><div class="empty-mark">⌁</div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(text)}</p>${route ? `<button class="primary-button" data-action="navigate" data-route="${route}">返回列表</button>` : ''}</section>`;
  }

  function navLink(route, label, icon) {
    const active = routeName() === route || (route === 'projects' && routeName() === 'project') || (route === 'events' && routeName() === 'event') || (route === 'signals' && routeName() === 'signal');
    return `<button class="nav-link ${active ? 'active' : ''}" data-action="navigate" data-route="#/${route}"><span>${icon}</span>${label}</button>`;
  }
  function appShell(content) {
    return `<div class="shell">
      <aside class="sidebar">
        <button class="brand" data-action="navigate" data-route="#/dashboard"><span class="brand-glyph">◒</span><span><b>AI 机会雷达</b><small>创投机会发现</small></span></button>
        <div class="nav-group"><p>工作台</p>${navLink('dashboard', '今日雷达', '⌂')}${navLink('projects', '创业项目', '◈')}${navLink('events', 'AI 活动', '◎')}${navLink('signals', '实时待核验', '⌁')}${navLink('follow-ups', '收藏与跟进', '↗')}</div>
        <div class="sidebar-foot"><span class="pulse"></span>国内优先样本<br/><b>2026.07.17</b></div>
      </aside>
      <main class="main"><header class="topbar"><div><span class="eyebrow">CN VC · AI SIGNAL DESK</span><h1>${pageTitle()}</h1></div><div class="topbar-tools"><button class="refresh-button" data-action="navigate" data-route="#/signals">⌁ 实时线索</button></div></header>${content}</main>
      <nav class="mobile-nav">${navLink('dashboard', '今日', '⌂')}${navLink('projects', '项目', '◈')}${navLink('events', '活动', '◎')}${navLink('signals', '线索', '⌁')}${navLink('follow-ups', '跟进', '↗')}</nav>
      ${toast ? `<div class="toast">${escapeHtml(toast)}</div>` : ''}
    </div>`;
  }
  function pageTitle() {
    if (routeName() === 'projects' && routeEntityId()) return '项目详情';
    if (routeName() === 'events' && routeEntityId()) return '活动详情';
    if (routeName() === 'signals' && routeEntityId()) return '线索核验';
    const names = { dashboard: '今日机会雷达', portfolio: 'AI 创新产品作品集', projects: '创业项目池', project: '项目详情', events: 'AI 活动雷达', event: '活动详情', signals: '国内实时待核验线索', signal: '线索核验', 'follow-ups': '收藏与跟进' };
    return names[routeName()] || 'AI 机会雷达';
  }

  function dashboard() {
    const projectsToday = Number.isFinite(Number(LIVE.fresh?.projects)) ? Number(LIVE.fresh.projects) : DATA.projects.filter(item => projectSeedToday.has(item.id)).length;
    const eventsToday = Number.isFinite(Number(LIVE.fresh?.events)) ? Number(LIVE.fresh.events) : DATA.events.filter(item => eventSeedToday.has(item.id)).length;
    const favorites = Object.keys(state.favorites).length;
    const pending = Object.values(state.followups).filter(item => ['待研究', '待联系', '已联系'].includes(item)).length;
    const highProjects = DATA.projects.filter(item => item.confidence === '高').sort((a, b) => entityScore(b) - entityScore(a)).slice(0, 3);
    const highEvents = DATA.events.filter(item => item.quality === '高').sort((a, b) => entityScore(b) - entityScore(a)).slice(0, 3);
    const liveCount = liveCandidates().length;
    return `<section class="hero-card"><div><span class="eyebrow accent">国内公开信号队列 · ${liveTimestamp(LIVE.generatedAt)}</span><h2>把公开信号变成可验证、<br/>可跟进的机会清单。</h2><p>面向国内 VC 场景。Agent 负责发现、整理、去重、解释和记录反馈；投资经理保留判断与触达权。</p><div class="hero-actions"><button class="primary-button" data-action="navigate" data-route="#/projects">查看新增项目 <span>→</span></button><button class="secondary-button" data-action="navigate" data-route="#/events">查看 AI 活动</button><button class="secondary-button" data-action="navigate" data-route="#/signals">待核验线索 ${liveCount} 条</button></div></div><div class="hero-orbit"><div class="orbit-center">AI<br/><small>RADAR</small></div><i class="orbit-dot dot-1"></i><i class="orbit-dot dot-2"></i><i class="orbit-dot dot-3"></i></div></section>
      <section class="stat-grid">
        ${statCard('今日新增项目', projectsToday, `本次采集 · 待核验池 ${liveProjectCandidates().length} 条`, '◈', '#7c5cff')}
        ${statCard('今日新增活动', eventsToday, `本次采集 · 待核验池 ${liveEventCandidates().length} 条`, '◎', '#22b8a7')}
        ${statCard('已收藏', favorites, '跨项目与活动', '★', '#f0a93b')}
        ${statCard('待跟进', pending, '研究、联系或已联系', '↗', '#ec6a5c')}
      </section>
      <section class="section-head"><div><span class="eyebrow">推荐入口</span><h2>为你推荐</h2></div></section>
      <section class="two-columns"><div>${miniProjectList(highProjects)}</div><div>${miniEventList(highEvents)}</div></section>`;
  }

  function portfolioPage() {
    const liveSourceCount = (LIVE.sources || []).length;
    return `<section class="portfolio-hero">
      <div class="portfolio-hero-main">
        <span class="eyebrow accent">AI INNOVATION PRODUCT PORTFOLIO</span>
        <h2>把公开信号变成可验证的<br/>AI 产品决策工作流。</h2>
        <p>这是一个独立完成、可实际操作的 AI Agent 产品原型：从国内公开信息采集出发，完成实体整理、可解释初筛、人工核验与反馈回流，而不是停留在概念说明或静态界面。</p>
        <div class="hero-actions"><button class="primary-button" data-action="navigate" data-route="#/dashboard">进入可操作 Demo <span>→</span></button><button class="secondary-button" data-action="navigate" data-route="#/projects">查看项目雷达</button><a class="portfolio-source-link" href="https://github.com/yibohanthu-hub/ai-vc-opportunity-radar" target="_blank" rel="noreferrer">查看公开源码 ↗</a></div>
      </div>
      <aside class="portfolio-hero-aside"><span>作品性质</span><b>独立完成的 0→1 产品实践</b><p>聚焦真实用户任务、数据边界与可运行闭环；页面内的收藏、标签和跟进均可实际操作。</p><small>国内公开信息优先 · 人工保留最终判断</small></aside>
    </section>
    <section class="portfolio-facts" aria-label="作品事实">
      <article><b>${DATA.projects.length}</b><span>国内优先项目样本</span></article>
      <article><b>${DATA.events.length}</b><span>AI 活动样本</span></article>
      <article><b>${liveSourceCount}</b><span>已接入公开来源</span></article>
      <article><b>4 小时</b><span>自动采集与发布节奏</span></article>
    </section>
    <section class="portfolio-section-head"><div><span class="eyebrow">能力证据</span><h2>这份作品实际证明什么</h2></div><p>不是把 AI 当作一个功能标签，而是从用户任务、数据质量、可解释性和验证方式出发完成产品闭环。</p></section>
    <section class="portfolio-evidence-grid">
      <article><span>01</span><h3>从业务问题到可体验原型</h3><p>将“信息多、筛选难、难以持续跟进”的工作流拆为项目、活动、来源、验证问题和跟进状态，并独立完成 Web 原型与交互。</p></article>
      <article><span>02</span><h3>把 Agent 放进可信工作流</h3><p>Agent 负责采集、规范化、去重、摘要和理由生成；不确定字段保留“未知”，人工仍掌握核验、判断和触达权。</p></article>
      <article><span>03</span><h3>理解物理 AI 的信息与场景</h3><p>信息池覆盖具身智能、机器人、AI 终端、自动驾驶及相关活动信号；产品方法可迁移到“技术信号—场景假设—验证”的创新探索。</p></article>
      <article><span>04</span><h3>先定义可验证的效果</h3><p>已完成浏览器功能验证与自动化更新验证；下一步以“发现有效线索率、核验耗时、收藏到跟进转化率”检验真实用户价值。</p></article>
    </section>
    <section class="portfolio-transfer">
      <div><span class="eyebrow accent">可迁移的产品方法</span><h2>技术信号不是答案，<br/>它要经过产品化验证。</h2><p>这一过程可用于 AI Agent、生成式 AI 与物理 AI 的新场景探索：先捕捉变化，再形成可检查的假设，最后用用户反馈和效果指标继续迭代。</p></div>
      <ol><li><b>技术 / 产品信号</b><span>来自公开来源、行业活动和用户任务</span></li><li><b>场景假设</b><span>明确谁在何时需要更快、更可信的判断</span></li><li><b>证据与可解释初筛</b><span>保留来源、未知项、理由与下一步问题</span></li><li><b>人工验证 / 反馈</b><span>以行为和结果指标驱动下一轮迭代</span></li></ol>
    </section>
    <section class="portfolio-boundary"><b>作品边界</b><p>本作品面向 VC 信息发现，不假装是车载系统、VLA 或机器人产品；它证明的是将 AI / 物理 AI 信息、用户工作流和可验证指标快速落成可体验产品的能力。</p></section>`;
  }
  function statCard(title, value, note, icon, color) {
    return `<article class="stat-card"><span class="stat-icon" style="--accent:${color}">${icon}</span><div><p>${title}</p><strong>${value}</strong><small>${note}</small></div></article>`;
  }
  function miniProjectList(items) {
    return `<article class="panel mini-list"><div class="panel-head"><h2>项目线索</h2><button class="text-button" data-action="navigate" data-route="#/projects">全部 →</button></div>${items.map(item => `<button class="mini-item" data-action="navigate" data-route="#/projects/${item.id}"><span class="mini-mark project-mark">◈</span><span><b>${escapeHtml(item.name)}</b><small>${escapeHtml(item.subSector)} · ${escapeHtml(item.location)}</small></span><em>${entityScore(item)}/30</em></button>`).join('')}</article>`;
  }
  function miniEventList(items) {
    return `<article class="panel mini-list"><div class="panel-head"><h2>活动线索</h2><button class="text-button" data-action="navigate" data-route="#/events">全部 →</button></div>${items.map(item => `<button class="mini-item" data-action="navigate" data-route="#/events/${item.id}"><span class="mini-mark event-mark">◎</span><span><b>${escapeHtml(item.name)}</b><small>${escapeHtml(item.date)}</small></span><em>${entityScore(item)}/35</em></button>`).join('')}</article>`;
  }

  function liveTimestamp(value) {
    if (!value || value === '未知') return '待首次同步';
    const timestamp = Date.parse(value);
    if (!Number.isFinite(timestamp)) return String(value);
    return new Date(timestamp).toLocaleString('zh-CN', { hour12: false, month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  }
  function signalIcon(item) { return item.kind === 'event' ? '◎' : '◈'; }
  function signalKindLabel(item) { return item.kind === 'event' ? '国内活动待核验' : '国内项目 / 产品待核验'; }
  function signalSources() { return [...new Set(liveCandidates().map(item => item.sourceName))]; }
  function filteredSignals() {
    const query = ui.signal.search.toLowerCase().trim();
    return liveCandidates().filter(item => {
      const haystack = [item.name, item.category, item.sourceName, item.summary, item.reasoning].join(' ').toLowerCase();
      return (!query || haystack.includes(query)) && (!ui.signal.kind || item.kind === ui.signal.kind) && (!ui.signal.source || item.sourceName === ui.signal.source);
    }).sort((a, b) => Date.parse(b.lastSeenAt || b.collectedAt) - Date.parse(a.lastSeenAt || a.collectedAt));
  }
  function signalFilters() {
    return `<div class="filters signal-filters"><label class="search-box">⌕<input data-filter="signal" data-key="search" value="${escapeHtml(ui.signal.search)}" placeholder="搜索线索、来源或关键词" /></label>${selectFilter('signal', 'kind', '线索类型', ['project|项目 / 产品', 'event|AI 活动'], ui.signal.kind, true)}${selectFilter('signal', 'source', '公开来源', signalSources(), ui.signal.source)}<button class="clear-button" data-action="clear-filters" data-type="signal">清除</button></div>`;
  }
  function signalsPage() {
    const signals = filteredSignals();
    const healthySources = (LIVE.sources || []).filter(source => source.status === 'success').length;
    const failedSources = (LIVE.sources || []).filter(source => source.status === 'error').length;
    const statusText = LIVE.status === 'success' ? '本次抓取完整' : LIVE.status === 'partial' ? '部分来源暂不可用' : '尚未生成实时数据';
    const freshCount = Number(LIVE.fresh?.projects || 0) + Number(LIVE.fresh?.events || 0);
    const retained = Math.max(0, liveCandidates().length - freshCount);
    return `<section class="signal-overview"><div><span class="eyebrow accent">国内公开源采集</span><h2>${liveCandidates().length} 条实时待核验线索</h2><p>最近抓取 ${escapeHtml(liveTimestamp(LIVE.generatedAt))}：本次新增 ${freshCount} 条，保留近 ${escapeHtml(String(LIVE.retention?.days || 45))} 天仍待核验的 ${retained} 条。队列不自动补全公司、融资、联系人或活动质量；人工核验后才可进入正式信息池。</p></div><div class="signal-health"><b>${healthySources}/${(LIVE.sources || []).length}</b><span>来源正常</span><small>${escapeHtml(statusText)}${failedSources ? ` · ${failedSources} 个来源待恢复` : ''}</small></div></section><section class="source-run-list">${(LIVE.sources || []).map(source => `<a class="source-run ${source.status}" href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer"><span>${source.status === 'success' ? '✓' : '!'}</span><b>${escapeHtml(source.name)}</b><small>${source.status === 'success' ? `${source.records} 条本次候选` : '本次未获取'}</small></a>`).join('')}</section>${signalFilters()}<section class="list-stack" data-signal-results>${signals.length ? signals.map(signalCard).join('') : empty('没有符合条件的实时线索', '尝试清除筛选，或等待下一次后台采集。')}</section><section class="source-notice"><b>数据边界</b><span>${escapeHtml(LIVE.disclaimer || '实时信号只作为待核验候选。')}</span></section>`;
  }
  function signalCard(item) {
    const isEvent = item.kind === 'event';
    const score = entityScore(item);
    const timeLabel = isEvent ? `活动日期：${item.eventMeta?.startDate || '未知'}` : `来源时间：${liveTimestamp(item.publishedAt)}`;
    return `<article class="live-signal-card ${isIgnored('signal', item.id) ? 'is-ignored' : ''}"><div class="signal-main"><div class="card-kicker"><span class="entity-icon">${signalIcon(item)}</span>${chip(signalKindLabel(item))}${!isEvent && item.earlyStage ? chip('早期线索') : ''}${!isEvent && item.stageHint && item.stageHint !== '阶段待核验' ? chip(`阶段：${item.stageHint}`) : ''}<span class="confidence confidence-low">${escapeHtml(item.confidence)}</span></div><div class="card-title-row"><div><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.summary)}</p></div><div class="signal-score"><b>${score}</b><span>/ 25</span>${scoreBar(score, 25)}</div></div><div class="signal-meta"><span>${escapeHtml(timeLabel)}</span>${!isEvent ? `<span>阶段线索：${escapeHtml(item.stageHint || '待核验')}</span>` : ''}${isEvent ? `<span>形式：${escapeHtml(item.eventMeta?.mode || '未知')}</span><span>地点：${escapeHtml(item.eventMeta?.location || '未知')}</span>` : ''}<span>首次发现：${escapeHtml(liveTimestamp(item.firstCollectedAt || item.collectedAt))}</span><span>最近见到：${escapeHtml(liveTimestamp(item.lastSeenAt || item.collectedAt))}</span><span>来源：${escapeHtml(item.sourceName)}</span></div><div class="why-row"><b>为何入队</b><span>${escapeHtml(item.reasoning)}</span></div></div><div class="card-side">${actionButtons('signal', item.id)}${statusControl('signal', item.id)}${tagsMarkup('signal', item.id)}<button class="view-button" data-action="navigate" data-route="#/signals/${item.id}">查看来源与核验 <span>→</span></button></div></article>`;
  }
  function signalDetail(id) {
    const item = entity('signal', id);
    if (!item) return empty('未找到实时线索', '该线索可能已在下一次去重后从候选队列中消失。', '#/signals');
    state.viewed[key('signal', id)] = new Date().toISOString(); persist();
    const isEvent = item.kind === 'event';
    const rows = [
      ['队列类型', signalKindLabel(item)],
      [isEvent ? '活动日期' : '来源发布时间', isEvent ? item.eventMeta?.startDate || '未知' : liveTimestamp(item.publishedAt)],
      ['首次发现', liveTimestamp(item.firstCollectedAt || item.collectedAt)],
      ['最近一次看到', liveTimestamp(item.lastSeenAt || item.collectedAt)],
      ['连续出现次数', `${Number(item.seenCount) || 1} 次`],
      ['来源', item.sourceName],
      ...(isEvent ? [['形式', item.eventMeta?.mode || '未知'], ['地点', item.eventMeta?.location || '未知'], ['主办方', item.eventMeta?.organizer || '未知']] : [['标题 / 摘要阶段线索', item.stageHint || '待核验']]),
      ['自动摘要', item.summary]
    ];
    return `<button class="back-button" data-action="navigate" data-route="#/signals">← 返回实时线索</button><section class="detail-hero signal-detail"><div><div class="card-kicker">${chip(signalKindLabel(item))}<span class="confidence confidence-low">${escapeHtml(item.confidence)}</span></div><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.summary)}</p><div class="detail-actions">${actionButtons('signal', item.id)}${statusControl('signal', item.id)}${tagsMarkup('signal', item.id)}</div></div><div class="detail-score"><span>候选信号</span><b>${entityScore(item)}<small>/25</small></b>${scoreBar(entityScore(item), 25)}<p>不构成投资或参会建议</p></div></section><section class="detail-grid"><div class="detail-column"><article class="detail-panel"><div class="panel-head"><h2>采集记录</h2><span>字段缺失即保留未知</span></div>${detailRows(rows)}</article><article class="detail-panel"><div class="panel-head"><h2>来源证据</h2><span>公开、可打开</span></div><div class="source-list">${sourceLinks(item.sources)}</div><p class="muted-note">页面内不保存或推断非公开联系方式；后续动作前必须回到原始来源核验。</p></article></div><aside class="detail-column"><article class="analysis-panel"><span class="eyebrow accent">AGENT 入队说明</span><h2>为什么它没有直接进入正式信息池</h2>${bulletList([item.reasoning, '来源内容未自动等同于公司档案、融资事实或高价值活动。'], 'good-list')}<h3>待核验信息</h3>${bulletList(item.unknowns || [], 'warn-list')}<h3>建议下一步</h3>${bulletList([item.nextAction], 'question-list')}</article><article class="detail-panel score-panel"><div class="panel-head"><h2>候选优先级构成</h2><span>可解释规则</span></div>${scoreRows(item.score, { novelty: '信息新颖性', source: '来源可追溯性', relevance: 'AI 相关性', completeness: '字段完整度', followup: '核验价值' })}</article></aside></section>`;
  }

  function projectFilters() {
    const industries = [...new Set(DATA.projects.map(item => item.industry))];
    const regions = [...new Set(DATA.projects.map(item => item.region))];
    return `<div class="filters"><label class="search-box">⌕<input data-filter="project" data-key="search" value="${escapeHtml(ui.project.search)}" placeholder="搜索项目、赛道或创始人" /></label>${selectFilter('project', 'date', '发现时间', ['all|全部写入时间', 'today|今日写入', 'earlier|历史样本'], ui.project.date, true)}${selectFilter('project', 'industry', '行业 / 细分', industries, ui.project.industry)}${selectFilter('project', 'region', '地区', regions, ui.project.region)}${selectFilter('project', 'stage', '融资阶段', ['未知', '种子轮', '天使轮', 'Pre-A', 'Series A', '后期私营公司'], ui.project.stage)}${selectFilter('project', 'amount', '融资金额', ['all|全部金额', 'disclosed|已披露（含待核验）', 'unknown|未知'], ui.project.amount, true)}${selectFilter('project', 'bBefore', 'B 轮以前可能性', ['是', '可能', '待核验', '否'], ui.project.bBefore)}${selectFilter('project', 'confidence', '信息可信度', ['高', '中', '低'], ui.project.confidence)}${selectFilter('project', 'sort', '排序：综合信号', ['score|综合信号', 'novelty|信息新颖性', 'source|来源可信度', 'followup|潜在跟进价值'], ui.project.sort, true)}<button class="clear-button" data-action="clear-filters" data-type="project">清除</button></div>`;
  }
  function eventFilters() {
    const types = [...new Set(DATA.events.map(item => item.type))];
    const modes = [...new Set(DATA.events.map(item => item.mode))];
    const locations = [...new Set(DATA.events.map(item => item.location))];
    return `<div class="filters"><label class="search-box">⌕<input data-filter="event" data-key="search" value="${escapeHtml(ui.event.search)}" placeholder="搜索活动、主办方或嘉宾" /></label><label class="search-box">⌕<input data-filter="event" data-key="theme" value="${escapeHtml(ui.event.theme)}" placeholder="主题关键词" /></label>${selectFilter('event', 'type', '活动类型', types, ui.event.type)}${selectFilter('event', 'location', '地点', locations, ui.event.location)}${selectFilter('event', 'mode', '线上 / 线下', modes, ui.event.mode)}${selectFilter('event', 'quality', '活动质量', ['高', '中', '低'], ui.event.quality)}${selectFilter('event', 'discovery', '发现项目可能性', ['高', '中', '低'], ui.event.discovery)}${selectFilter('event', 'time', '时间', ['all|全部时间', 'upcoming|近期 / 未来', 'past|历史参考'], ui.event.time, true)}${selectFilter('event', 'sort', '排序：综合信号', ['score|综合信号', 'topic|主题质量', 'speakers|嘉宾质量', 'discovery|项目发现价值', 'urgency|时间紧迫性'], ui.event.sort, true)}<button class="clear-button" data-action="clear-filters" data-type="event">清除</button></div>`;
  }
  function selectFilter(type, keyName, label, options, selected, encoded = false) {
    const choice = `<option value="">${escapeHtml(label)}</option>${options.map(raw => { const [value, text] = encoded ? raw.split('|') : [raw, raw]; return `<option value="${escapeHtml(value)}" ${value === selected ? 'selected' : ''}>${escapeHtml(text)}</option>`; }).join('')}`;
    return `<label class="select-wrap"><span class="sr-only">${escapeHtml(label)}</span><select data-filter="${type}" data-key="${keyName}">${choice}</select></label>`;
  }
  function matchesFundingStage(stage, filter) {
    if (!filter) return true;
    const value = String(stage || '').replace(/\s+/g, '');
    const stageFamilies = {
      '种子轮': /种子\+*轮/i,
      '天使轮': /天使\+*轮/i,
      'Pre-A': /Pre-?A\+*轮/i,
      'Series A': /SeriesA|(?:^|[^-])A\+*轮/i,
      '后期私营公司': /B\+*轮|C\+*轮|D\+*轮|后期|成熟/i
    };
    if (filter === '未知') return /未知|待核验|未披露/i.test(value);
    return stageFamilies[filter]?.test(value) || value.includes(filter);
  }
  function filteredProjects() {
    const f = ui.project;
    const query = f.search.toLowerCase().trim();
    const result = DATA.projects.filter(item => {
      const haystack = [item.name, item.industry, item.subSector, item.description, item.founders, item.location].join(' ').toLowerCase();
      const dateOk = f.date === 'all' || !f.date || (f.date === 'today' ? projectSeedToday.has(item.id) : !projectSeedToday.has(item.id));
      const amountKnown = !item.amount.startsWith('未知');
      const amountOk = f.amount === 'all' || !f.amount || (f.amount === 'disclosed' ? amountKnown : !amountKnown);
      return (!query || haystack.includes(query)) && dateOk && (!f.industry || item.industry === f.industry) && (!f.region || item.region === f.region) && matchesFundingStage(item.stage, f.stage) && amountOk && (!f.confidence || item.confidence === f.confidence) && (!f.bBefore || item.bBefore.includes(f.bBefore));
    });
    const sortKey = f.sort || 'score';
    return result.sort((a, b) => sortKey === 'score' ? entityScore(b) - entityScore(a) : (b.score[sortKey] || 0) - (a.score[sortKey] || 0));
  }
  function filteredEvents() {
    const f = ui.event;
    const query = f.search.toLowerCase().trim();
    const theme = f.theme.toLowerCase().trim();
    const result = DATA.events.filter(item => {
      const haystack = [item.name, item.type, item.theme, item.organizer, item.location, item.speakers.join(' ')].join(' ').toLowerCase();
      const timeOk = f.time === 'all' || !f.time || (f.time === 'upcoming' ? item.isoStart >= SAMPLE_DATE : item.isoStart < SAMPLE_DATE);
      return (!query || haystack.includes(query)) && (!theme || item.theme.toLowerCase().includes(theme)) && (!f.type || item.type === f.type) && (!f.location || item.location === f.location) && (!f.mode || item.mode === f.mode) && (!f.quality || item.quality === f.quality) && (!f.discovery || item.discoveryPotential === f.discovery) && timeOk;
    });
    const sortKey = f.sort || 'score';
    return result.sort((a, b) => sortKey === 'score' ? entityScore(b) - entityScore(a) : (b.score[sortKey] || 0) - (a.score[sortKey] || 0));
  }
  function projectsPage() {
    const list = filteredProjects();
    const live = liveProjectCandidates().sort((a, b) => Number(Boolean(b.earlyStage)) - Number(Boolean(a.earlyStage)) || Date.parse(b.collectedAt) - Date.parse(a.collectedAt));
    const total = DATA.projects.length + live.length;
    return `<section class="page-intro"><div class="legend">${chip('◆ 已整理项目', 'confidence-high')}${chip('◇ 实时待核验', 'confidence-low')}<span data-project-count>已整理 ${DATA.projects.length} 条 · 实时待核验 ${live.length} 条 · 项目线索合计 ${total} 条 · 当前已整理筛选 ${list.length} 条</span></div></section>${projectFilters()}<section class="list-stack" data-project-results>${list.length ? list.map(projectCard).join('') : empty('没有符合条件的项目', '尝试清除筛选或更换搜索词。')}</section>${live.length ? `<section class="section-head inline live-project-head"><div><span class="eyebrow">自动更新候选</span><h2>实时待核验创业项目</h2><p>这 ${live.length} 条来自近 ${LIVE.retention?.days || 45} 天公开源抓取，按早期阶段线索优先展示；它们尚未被自动升级为正式项目档案。</p></div><button class="text-button" data-action="navigate" data-route="#/signals">查看全部实时线索 →</button></section><section class="list-stack live-project-list">${live.map(signalCard).join('')}</section>` : ''}`;
  }
  function projectCard(item) {
    const score = entityScore(item);
    return `<article class="opportunity-card project-card ${isIgnored('project', item.id) ? 'is-ignored' : ''}">
      <div class="card-main">
        <div class="card-kicker"><span class="entity-icon">◈</span>${chip(item.industry)}${chip(item.region)}${item.earlyStageSignal ? chip('早期项目') : ''}<span class="confidence ${confidenceClass(item.confidence)}">可信度 ${item.confidence}</span></div>
        <div class="card-title-row"><div><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.description)}</p></div><div class="signal-score"><b>${score}</b><span>/ 30</span>${scoreBar(score, 30)}</div></div>
        <div class="field-grid summary-fields">
          <div><small>创始人</small><span>${escapeHtml(item.founders)}</span></div>
          <div><small>所在地</small><span>${escapeHtml(item.location)}</span></div>
          <div><small>成立 / 公开出现</small><span>${escapeHtml(item.foundedAt)}</span></div>
          <div><small>融资阶段</small><span>${escapeHtml(item.stage)}</span></div>
          <div><small>B 轮以前</small><span>${escapeHtml(item.bBefore)}</span></div>
          <div><small>融资金额</small><span>${escapeHtml(item.amount)}</span></div>
          <div><small>估值</small><span>${escapeHtml(item.valuation)}</span></div>
          <div><small>最近公开融资</small><span>${escapeHtml(item.lastFunding)}</span></div>
        </div>
        <div class="why-row"><b>为何值得关注</b><span>${escapeHtml(item.why[0])}</span></div>
        <div class="card-meta"><span>发现：${escapeHtml(item.discoveredAt)}</span><span>更新：${escapeHtml(item.informationUpdatedAt)}</span><span>来源：${escapeHtml(item.sources.map(s => s.type).join(' + '))}</span></div>
      </div>
      <div class="card-side">${actionButtons('project', item.id)}${statusControl('project', item.id)}${tagsMarkup('project', item.id)}<button class="view-button" data-action="navigate" data-route="#/projects/${item.id}">查看完整资料 <span>→</span></button></div>
    </article>`;
  }
  function projectDetail(id) {
    const item = entity('project', id);
    if (!item) return empty('未找到项目', '该项目可能已从本地样本中移除。', '#/projects');
    state.viewed[key('project', id)] = new Date().toISOString(); persist();
    const relatedEvents = DATA.events.filter(event => item.relatedEvents.includes(event.id));
    return `<button class="back-button" data-action="navigate" data-route="#/projects">← 返回项目池</button><section class="detail-hero"><div><div class="card-kicker">${chip(item.industry)}${chip(item.subSector)}${item.earlyStageSignal ? chip('早期项目') : ''}<span class="confidence ${confidenceClass(item.confidence)}">信息可信度 ${item.confidence}</span></div><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.fullDescription)}</p><div class="detail-actions">${actionButtons('project', item.id)}${statusControl('project', item.id)}${tagsMarkup('project', item.id)}</div></div><div class="detail-score"><span>可解释信号</span><b>${entityScore(item)}<small>/30</small></b>${scoreBar(entityScore(item), 30)}<p>不构成投资建议</p></div></section><section class="detail-grid"><div class="detail-column"><article class="detail-panel"><div class="panel-head"><h2>公司与产品</h2><span>${escapeHtml(item.location)}</span></div>${detailRows([['所属行业', item.industry], ['细分方向', item.subSector], ['产品 / 服务', item.product], ['目标客户与场景', item.targetCustomers], ['AI 技术 / 应用方式', item.aiApproach], ['商业化线索', item.commercial], ['竞争 / 替代方案', item.competitors]])}</article><article class="detail-panel"><div class="panel-head"><h2>创始团队与融资</h2><span>不补造未知信息</span></div>${detailRows([['成立 / 公开出现', item.foundedAt], ['创始人', item.founders], ['团队背景', item.founderBackground], ['融资阶段', item.stage], ['融资金额', item.amount], ['估值', item.valuation], ['最近公开融资', item.lastFunding], ['B 轮以前可能性', item.bBefore]])}</article><article class="detail-panel"><div class="panel-head"><h2>公开来源与联系方式</h2><span>仅公开、合规入口</span></div><div class="source-list">${sourceLinks(item.sources)}</div><div class="contact-list">${item.publicContacts.map(contact => `<a href="${escapeHtml(contact.url)}" target="_blank" rel="noreferrer">↗ ${escapeHtml(contact.label)}</a>`).join('')}</div><p class="muted-note">${escapeHtml(item.sourceUpdate)} 不自动联系创始人、不发送邮件或社交消息。</p></article></div><aside class="detail-column"><article class="analysis-panel"><span class="eyebrow accent">AGENT 初筛说明</span><h2>为什么它进入你的阅读队列</h2>${bulletList(item.why, 'good-list')}<h3>主要不确定性</h3>${bulletList(item.uncertainties, 'warn-list')}<h3>下一步可验证的问题</h3>${bulletList(item.verifyQuestions, 'question-list')}</article><article class="detail-panel score-panel"><div class="panel-head"><h2>排序构成</h2><span>规则可解释</span></div>${scoreRows(item.score, { novelty: '信息新颖性', source: '来源可信度', completeness: '信息完整度', relevance: 'AI 相关性', stage: '早期阶段线索', followup: '潜在跟进价值' })}<p class="muted-note">分数反映公开信号与示例规则，不是“应投 / 不应投”的判断。</p></article><article class="detail-panel"><div class="panel-head"><h2>相关 AI 活动</h2><button class="text-button" data-action="navigate" data-route="#/events">全部 →</button></div>${relatedEvents.length ? relatedEvents.map(event => `<button class="related-item" data-action="navigate" data-route="#/events/${event.id}"><span>◎</span><div><b>${escapeHtml(event.name)}</b><small>${escapeHtml(event.date)} · ${escapeHtml(event.discoveryPotential)}发现可能性</small></div><i>→</i></button>`).join('') : '<p class="muted-note">暂无关联活动。</p>'}</article></aside></section>`;
  }
  function detailRows(rows) { return `<dl class="detail-rows">${rows.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl>`; }
  function bulletList(items, kind) { return `<ul class="analysis-list ${kind}">${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`; }
  function scoreRows(scores, labels) { return `<div class="score-rows">${Object.entries(scores).map(([name, value]) => `<div><span>${escapeHtml(labels[name] || name)}</span>${scoreBar(value, 5)}<b>${value}/5</b></div>`).join('')}</div>`; }

  function eventsPage() {
    const list = filteredEvents();
    const live = liveEventCandidates().sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)) || Date.parse(b.lastSeenAt || b.collectedAt) - Date.parse(a.lastSeenAt || a.collectedAt));
    const total = DATA.events.length + live.length;
    return `<section class="page-intro"><div class="legend">${chip('● 已整理高价值', 'quality-high')}${chip('◇ 实时待核验', 'confidence-low')}${chip('● 低优先级', 'quality-low')}<span data-event-count>已整理 ${DATA.events.length} 条 · 实时待核验 ${live.length} 条 · 活动线索合计 ${total} 条 · 当前已整理筛选 ${list.length} 条</span></div></section>${eventFilters()}<section class="event-grid" data-event-results>${list.length ? list.map(eventCard).join('') : empty('没有符合条件的活动', '尝试清除筛选或更换搜索词。')}</section>${live.length ? `<section class="section-head inline live-project-head"><div><span class="eyebrow">自动更新候选</span><h2>实时待核验 AI 活动</h2><p>这 ${live.length} 条来自近 ${LIVE.retention?.days || 45} 天国内公开活动目录；日期、嘉宾、主办方与项目发现价值都必须打开原始页面复核。</p></div><button class="text-button" data-action="navigate" data-route="#/signals">查看全部实时线索 →</button></section><section class="list-stack live-project-list">${live.map(signalCard).join('')}</section>` : ''}`;
  }
  function eventCard(item) {
    const score = entityScore(item);
    return `<article class="event-card ${isIgnored('event', item.id) ? 'is-ignored' : ''}"><div class="event-top"><span class="date-chip">${escapeHtml(item.date)}</span><span class="quality quality-${item.quality}">价值 ${escapeHtml(item.quality)}</span></div><div class="event-title"><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.theme)}</p></div><div class="event-facts"><span>⌖ ${escapeHtml(item.location)}</span><span>◌ ${escapeHtml(item.mode)}</span><span>◇ ${escapeHtml(item.type)}</span></div><div class="event-eval"><div><span>主题质量</span>${scoreBar(item.score.topic, 5)}</div><div><span>嘉宾质量</span>${scoreBar(item.score.speakers, 5)}</div><div><span>项目发现</span>${scoreBar(item.score.discovery, 5)}</div></div><p class="quality-reason"><b>判断：</b>${escapeHtml(item.qualityReason)}</p><div class="event-bottom"><div><small>来源 · ${escapeHtml(item.sources[0].type)}</small><b>${score}/35</b></div>${actionButtons('event', item.id, true)}${statusControl('event', item.id)}<button class="view-button small" data-action="navigate" data-route="#/events/${item.id}">详情 →</button></div></article>`;
  }
  function eventDetail(id) {
    const item = entity('event', id);
    if (!item) return empty('未找到活动', '该活动可能已从本地样本中移除。', '#/events');
    state.viewed[key('event', id)] = new Date().toISOString(); persist();
    const relatedProjects = DATA.projects.filter(project => item.relatedProjects.includes(project.id));
    return `<button class="back-button" data-action="navigate" data-route="#/events">← 返回活动雷达</button><section class="detail-hero event-detail"><div><div class="card-kicker">${chip(item.type)}${chip(item.mode)}<span class="quality quality-${item.quality}">活动质量 ${item.quality}</span></div><h2>${escapeHtml(item.name)}</h2><p>${escapeHtml(item.theme)}</p><div class="detail-actions">${actionButtons('event', item.id)}${statusControl('event', item.id)}${tagsMarkup('event', item.id)}</div></div><div class="detail-score"><span>可解释信号</span><b>${entityScore(item)}<small>/35</small></b>${scoreBar(entityScore(item), 35)}<p>不替代参会判断</p></div></section><section class="detail-grid"><div class="detail-column"><article class="detail-panel"><div class="panel-head"><h2>活动资料</h2><span>${escapeHtml(item.date)}</span></div>${detailRows([['时间', item.date], ['地点', item.location], ['形式', item.mode], ['主办方', item.organizer], ['主题', item.theme], ['预计参与人群', item.audience], ['嘉宾名单', item.speakers.join('；')], ['嘉宾背景 / 质量', item.speakerQuality]])}</article><article class="detail-panel"><div class="panel-head"><h2>投资人视角</h2><span>Agent 解释</span></div>${detailRows([['对投资人的实际价值', item.investorValue], ['发现潜在项目可能性', item.discoveryPotential], ['活动质量判断', item.quality], ['判断理由', item.qualityReason], ['下一步行动', item.nextAction]])}</article><article class="detail-panel"><div class="panel-head"><h2>来源证据</h2><span>更新 ${escapeHtml(item.informationUpdatedAt)}</span></div><div class="source-list">${sourceLinks(item.sources)}</div><p class="muted-note">嘉宾和场地等可能变动，打开来源链接后仍需在行动前复核。</p></article></div><aside class="detail-column"><article class="analysis-panel"><span class="eyebrow accent">可能值得关注的人</span><h2>与项目发现有关的参会者</h2>${bulletList(item.attendeesToWatch, 'question-list')}<p class="muted-note">这是可验证的约见/研究方向，不是对个人或组织的推荐结论。</p></article><article class="detail-panel score-panel"><div class="panel-head"><h2>质量排序构成</h2><span>规则可解释</span></div>${scoreRows(item.score, { topic: '主题质量', speakers: '嘉宾质量', format: '交流形式', investor: '投资人实际价值', discovery: '项目发现可能性', source: '信息可信度', urgency: '时间紧迫性' })}</article><article class="detail-panel"><div class="panel-head"><h2>关联项目</h2><button class="text-button" data-action="navigate" data-route="#/projects">全部 →</button></div>${relatedProjects.length ? relatedProjects.map(project => `<button class="related-item" data-action="navigate" data-route="#/projects/${project.id}"><span>◈</span><div><b>${escapeHtml(project.name)}</b><small>${escapeHtml(project.subSector)} · 可信度 ${escapeHtml(project.confidence)}</small></div><i>→</i></button>`).join('') : '<p class="muted-note">暂无关联项目。可在活动后手动添加新线索。</p>'}</article></aside></section>`;
  }

  function followupsPage() {
    const projects = DATA.projects.filter(item => isFavorite('project', item.id) || followup('project', item.id) !== '未处理' || tagList('project', item.id).length);
    const events = DATA.events.filter(item => isFavorite('event', item.id) || followup('event', item.id) !== '未处理' || tagList('event', item.id).length);
    const signals = liveCandidates().filter(item => isFavorite('signal', item.id) || followup('signal', item.id) !== '未处理' || tagList('signal', item.id).length);
    const viewedCount = Object.keys(state.viewed).length;
    return `<section class="followup-hero"><div><span class="eyebrow accent">可执行清单</span><h2>把感兴趣的线索收拢，<br/>再决定是否触达。</h2><p>本页只提供公开来源入口和下一步行动建议，不自动联系创始人，也不发送任何消息。</p></div><div class="followup-summary"><div><b>${projects.length + events.length + signals.length}</b><span>已整理线索</span></div><div><b>${viewedCount}</b><span>已查看记录</span></div></div></section><section class="batch-toolbar"><div><b>批量整理</b><span data-selection-count>${Object.keys(state.selected).length} 条已选择</span></div><div><label class="select-wrap compact"><select data-action="batch-status"><option value="">设置跟进状态…</option>${['待研究', '待联系', '已联系', '暂停', '未处理'].map(item => `<option value="${item}">${item}</option>`).join('')}</select></label><button class="secondary-button compact" data-action="batch-tag">添加标签</button><button class="clear-button" data-action="clear-selection">取消选择</button></div></section><section class="followup-sections"><div><div class="section-head inline"><div><span class="eyebrow">收藏项目</span><h2>项目</h2></div><button class="text-button" data-action="navigate" data-route="#/projects">继续发现 →</button></div>${projects.length ? `<div class="followup-list">${projects.map(item => followupRow('project', item)).join('')}</div>` : empty('还没有整理任何项目', '在项目卡片中收藏、加标签或设置跟进状态后，它们会出现在这里。', '#/projects')}</div><div><div class="section-head inline"><div><span class="eyebrow">收藏活动</span><h2>活动</h2></div><button class="text-button" data-action="navigate" data-route="#/events">继续发现 →</button></div>${events.length ? `<div class="followup-list">${events.map(item => followupRow('event', item)).join('')}</div>` : empty('还没有整理任何活动', '在活动卡片中收藏、加标签或设置跟进状态后，它们会出现在这里。', '#/events')}</div><div><div class="section-head inline"><div><span class="eyebrow">实时待核验</span><h2>公开信号</h2></div><button class="text-button" data-action="navigate" data-route="#/signals">继续核验 →</button></div>${signals.length ? `<div class="followup-list">${signals.map(item => followupRow('signal', item)).join('')}</div>` : empty('还没有整理任何实时线索', '在实时待核验队列中收藏、加标签或设置跟进状态后，它们会出现在这里。', '#/signals')}</div></section><section class="behavior-panel"><span class="eyebrow">为第二阶段准备的行为信号</span><h2>已记录 ${state.behavior.length} 次交互</h2><p>记录了查看、收藏、忽略、标签、筛选、更新与跟进状态。本 Demo 不训练模型；后续可解释推荐示例：<b>“你最近收藏了 3 个 Agent 基础设施项目，因此推荐这条线索。”</b></p></section>`;
  }
  function followupRow(type, item) {
    const label = type === 'project' ? item.subSector : type === 'event' ? item.theme : item.category;
    const lastViewed = state.viewed[key(type, item.id)] ? new Date(state.viewed[key(type, item.id)]).toLocaleString('zh-CN', { hour12: false }) : '未查看';
    const action = type === 'project' ? (item.verifyQuestions[0] || '打开公开来源核验') : item.nextAction;
    const route = type === 'project' ? 'projects' : type === 'event' ? 'events' : 'signals';
    const icon = type === 'project' ? '◈' : type === 'event' ? '◎' : '⌁';
    return `<article class="followup-row"><label class="check-wrap"><input type="checkbox" data-action="select" data-type="${type}" data-id="${item.id}" ${isSelected(type, item.id) ? 'checked' : ''}/><span></span></label><span class="row-icon">${icon}</span><div class="row-main"><button data-action="navigate" data-route="#/${route}/${item.id}"><b>${escapeHtml(item.name)}</b><small>${escapeHtml(label)}</small></button><div>${tagsMarkup(type, item.id)}</div></div><div class="row-meta"><small>最近查看</small><span>${escapeHtml(lastViewed)}</span></div><div class="row-meta"><small>下一步行动</small><span>${escapeHtml(action)}</span></div>${statusControl(type, item.id)}<button class="source-mini" data-action="open-source" data-type="${type}" data-id="${item.id}">来源 ↗</button></article>`;
  }

  function renderPage() {
    const name = routeName();
    if (name === 'dashboard') return dashboard();
    if (name === 'portfolio') return portfolioPage();
    if (name === 'projects') return routeEntityId() ? projectDetail(routeEntityId()) : projectsPage();
    if (name === 'events') return routeEntityId() ? eventDetail(routeEntityId()) : eventsPage();
    if (name === 'signals') return routeEntityId() ? signalDetail(routeEntityId()) : signalsPage();
    if (name === 'follow-ups') return followupsPage();
    if (name === 'project') return projectDetail(routeEntityId());
    if (name === 'event') return eventDetail(routeEntityId());
    if (name === 'signal') return signalDetail(routeEntityId());
    return dashboard();
  }
  function render() { document.getElementById('app').innerHTML = appShell(renderPage()); }

  document.getElementById('app').addEventListener('click', event => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action;
    const type = button.dataset.type;
    const id = button.dataset.id;
    if (action === 'navigate') { go(button.dataset.route); return; }
    if (action === 'favorite') {
      const itemKey = key(type, id);
      state.favorites[itemKey] = !state.favorites[itemKey];
      if (state.favorites[itemKey]) delete state.ignored[itemKey];
      else delete state.favorites[itemKey];
      record(state.favorites[itemKey] ? 'favorite' : 'unfavorite', type, id);
      setToast(state.favorites[itemKey] ? '已收藏到跟进清单' : '已取消收藏');
      return;
    }
    if (action === 'ignore') {
      const itemKey = key(type, id);
      state.ignored[itemKey] = !state.ignored[itemKey];
      if (state.ignored[itemKey]) { delete state.favorites[itemKey]; state.followups[itemKey] = '暂停'; }
      else delete state.ignored[itemKey];
      record(state.ignored[itemKey] ? 'ignore' : 'restore', type, id);
      setToast(state.ignored[itemKey] ? '已标记为忽略（可随时恢复）' : '已恢复该线索');
      return;
    }
    if (action === 'add-tag') {
      const label = window.prompt('添加一个标签（例如：Agent 基础设施、7 月回访）');
      if (label && label.trim()) {
        const itemKey = key(type, id);
        const next = new Set(tagList(type, id)); next.add(label.trim().slice(0, 24));
        state.tags[itemKey] = [...next]; record('tag', type, id, { tag: label.trim().slice(0, 24) }); persist(); setToast('标签已添加');
      }
      render();
      return;
    }
    if (action === 'clear-filters') { ui[type] = type === 'project' ? { search: '', date: 'all', industry: '', region: '', stage: '', amount: 'all', bBefore: '', confidence: '', sort: 'score' } : type === 'event' ? { search: '', theme: '', type: '', location: '', mode: '', quality: '', discovery: '', time: 'all', sort: 'score' } : { search: '', kind: '', source: '' }; record('clear_filters', type, 'all'); render(); return; }
    if (action === 'batch-tag') {
      const label = window.prompt('给已选择线索添加标签');
      if (label && label.trim()) {
        Object.keys(state.selected).forEach(itemKey => { const next = new Set(state.tags[itemKey] || []); next.add(label.trim().slice(0, 24)); state.tags[itemKey] = [...next]; });
        record('batch_tag', 'system', 'selection', { tag: label.trim().slice(0, 24) }); persist(); setToast('已给已选择线索添加标签');
      }
      render(); return;
    }
    if (action === 'clear-selection') { state.selected = {}; render(); return; }
    if (action === 'open-source') {
      const item = entity(type, id);
      if (item?.sources?.[0]) { window.open(item.sources[0].url, '_blank', 'noopener,noreferrer'); record('open_source', type, id); }
      return;
    }
  });
  function refreshFilteredList(type) {
    if (type === 'project') {
      const list = filteredProjects();
      const count = document.querySelector('[data-project-count]');
      const results = document.querySelector('[data-project-results]');
      if (count) count.textContent = `已整理 ${DATA.projects.length} 条 · 实时待核验 ${liveProjectCandidates().length} 条 · 项目线索合计 ${DATA.projects.length + liveProjectCandidates().length} 条 · 当前已整理筛选 ${list.length} 条`;
      if (results) results.innerHTML = list.length ? list.map(projectCard).join('') : empty('没有符合条件的项目', '尝试清除筛选或更换搜索词。');
      return;
    }
    if (type === 'signal') {
      const list = filteredSignals();
      const results = document.querySelector('[data-signal-results]');
      if (results) results.innerHTML = list.length ? list.map(signalCard).join('') : empty('没有符合条件的实时线索', '尝试清除筛选，或等待下一次后台采集。');
      return;
    }
    const list = filteredEvents();
    const count = document.querySelector('[data-event-count]');
    const results = document.querySelector('[data-event-results]');
    if (count) count.textContent = `已整理 ${DATA.events.length} 条 · 实时待核验 ${liveEventCandidates().length} 条 · 活动线索合计 ${DATA.events.length + liveEventCandidates().length} 条 · 当前已整理筛选 ${list.length} 条`;
    if (results) results.innerHTML = list.length ? list.map(eventCard).join('') : empty('没有符合条件的活动', '尝试清除筛选或更换搜索词。');
  }
  document.getElementById('app').addEventListener('input', event => {
    const input = event.target;
    if (!input.dataset.filter) return;
    const type = input.dataset.filter;
    const keyName = input.dataset.key;
    ui[type][keyName] = input.value;
    refreshFilteredList(type);
  });
  document.getElementById('app').addEventListener('change', event => {
    const input = event.target;
    if (input.dataset.filter) { ui[input.dataset.filter][input.dataset.key] = input.value; record('filter', input.dataset.filter, input.dataset.key, { value: input.value }); refreshFilteredList(input.dataset.filter); return; }
    if (input.dataset.action === 'set-status') {
      state.followups[key(input.dataset.type, input.dataset.id)] = input.value; record('status', input.dataset.type, input.dataset.id, { status: input.value }); persist(); setToast(`跟进状态已改为“${input.value}”`); return;
    }
    if (input.dataset.action === 'select') {
      const itemKey = key(input.dataset.type, input.dataset.id);
      state.selected[itemKey] = input.checked;
      if (!input.checked) delete state.selected[itemKey];
      const count = document.querySelector('[data-selection-count]');
      if (count) count.textContent = `${Object.keys(state.selected).length} 条已选择`;
      return;
    }
    if (input.dataset.action === 'batch-status' && input.value) {
      Object.keys(state.selected).forEach(itemKey => { state.followups[itemKey] = input.value; }); record('batch_status', 'system', 'selection', { status: input.value }); persist(); setToast(`已批量设为“${input.value}”`); return;
    }
  });
  window.addEventListener('hashchange', () => { const [name, id] = routeParts(); if ((name === 'projects' || name === 'events' || name === 'signals') && id) record('view', name === 'projects' ? 'project' : name === 'events' ? 'event' : 'signal', id); render(); });
  if (!location.hash) location.hash = '#/dashboard';
  render();
})();
