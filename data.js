/*
 * Domestic-first public-information sample set for a portfolio prototype.
 * Snapshot: 2026-07-17. Official company and event pages are retained as
 * evidence; missing financing, founder, speaker and contact fields remain
 * unknown instead of being inferred.
 */
(function () {
  const capturedAt = '2026-07-17';
  const source = (title, url, type = '公开来源') => ({ title, url, type, capturedAt });

  const project = (item) => ({
    region: '国内',
    location: '国内（以公司公开主体信息为准）',
    stage: '未知（本样本未以二手报道补全）',
    amount: '未知',
    valuation: '未知',
    lastFunding: '未知',
    bBefore: '待核验',
    foundedAt: '未知（本样本未以公开资料补全）',
    earlyStageSignal: false,
    founders: '未知（本样本未用二手报道补全）',
    founderBackground: '未知（需以公司公开资料或可信采访核验）',
    fullDescription: '本条记录以公司公开页面为证据，确认其产品方向并将其纳入国内优先的 AI 机会池。融资、团队、客户与商业化字段没有可靠公开证据时保持未知。',
    commercial: '客户、收入和商业化进展：待通过公司公开资料或可信报道核验。',
    competitors: '同赛道国内与全球 AI 产品 / 解决方案；具体竞品格局待人工研究。',
    publicContacts: [{ label: '公司官网 / 公开联系入口', url: item.url }],
    sources: [source(item.sourceTitle || '公司官网', item.url, item.sourceType || '公司官网')],
    discoveredAt: '2026-07-16 08:40',
    informationUpdatedAt: capturedAt,
    sourceUpdate: '本样本于 2026-07-17 以公司公开页面整理；融资、团队和联系方式需在行动前复核。',
    confidence: '中',
    confidenceNote: '产品方向来自公司公开页面；公司主体、融资和团队字段按证据边界保留未知或待核验。',
    score: { novelty: 4, source: 4, completeness: 2, relevance: 5, stage: 3, followup: 4 },
    why: ['来自国内优先的 AI 创业 / 产品样本，可作为进一步阅读与验证的入口。', '产品方向与当前模型、智能体、具身智能或 AI 基础设施主题相关。'],
    uncertainties: ['创始团队、融资轮次、金额和估值未在本条证据中确认。', '客户、收入与实际部署深度需要进一步核验。'],
    verifyQuestions: ['公司当前的核心产品、目标客户和商业模式是什么？', '是否存在可验证的近期融资、客户或产品进展？', '与同赛道替代方案相比，实际差异化和落地门槛是什么？'],
    relatedEvents: ['waic-2026', 'wrc-2026'],
    ...item
  });

  const event = (item) => ({
    location: '国内（以官方活动页为准）',
    mode: '线下 / 待官方页面核验',
    organizer: '以官方活动页为准',
    type: 'AI 产业活动',
    speakers: ['以官方当前日程和嘉宾名单为准'],
    speakerQuality: '嘉宾背景与出席状态待以官方当前页面核验',
    audience: 'AI 创业团队、产业方、研究者、开发者与投资人；实际参与人群以官方活动页为准。',
    investorValue: '可用于发现国内 AI 产业、产品与团队线索；应先确认议程、项目展示与交流机制。',
    discoveryPotential: '中',
    quality: '中',
    qualityReason: '具备公开可验证的活动来源，但项目发现价值仍取决于议程、嘉宾、展区和交流安排。',
    score: { topic: 4, speakers: 3, format: 3, investor: 3, discovery: 3, source: 4, urgency: 3 },
    sources: [source(item.sourceTitle || '官方活动页', item.url, item.sourceType || '官方页')],
    informationUpdatedAt: capturedAt,
    relatedProjects: ['zhipu-ai', 'stepfun', 'agibot'],
    attendeesToWatch: ['关注公开项目展示、创业者交流与产业合作环节；以官方日程为准。'],
    nextAction: '打开官方活动页，核验当前日期、地点、报名状态、嘉宾与创业项目展示安排。',
    ...item
  });

  window.RADAR_DATA = {
    snapshot: {
      capturedAt,
      poolUpdatedAt: '2026-07-17 12:20',
      morningStatus: '已完成 · 国内优先样本与早期项目扩展',
      eveningStatus: '待运行 · 由定时采集任务写入待核验队列',
      disclaimer: '作品集 Demo：已整理样本与实时待核验队列均以国内公开来源为优先；未知字段不会被补造。'
    },
    projects: [
      project({
        id: 'zhipu-ai', name: '智谱', industry: '基础模型', subSector: '通用大模型 / 智能体', location: '北京（以公司公开主体信息为准）',
        description: '提供 GLM 系列大模型与智能体相关能力的中国 AI 公司。',
        product: '面向开发者与企业的大模型、智能体与模型服务能力。', targetCustomers: '需要构建中文大模型应用、智能体或企业 AI 能力的开发团队与企业。', aiApproach: '语言模型、多模态与工具调用等能力以公司公开产品页为准。', url: 'https://www.zhipuai.cn/',
        confidence: '高', score: { novelty: 4, source: 5, completeness: 3, relevance: 5, stage: 3, followup: 5 },
        why: ['国内大模型与智能体生态的重要公开产品样本。', '适合跟踪模型能力、开发者产品和企业落地路径。'], relatedEvents: ['waic-2026', 'baai-2026', 'cicai-2026']
      }),
      project({
        id: 'minimax', name: 'MiniMax', industry: '基础模型', subSector: '多模态生成模型', location: '上海（以公司公开主体信息为准）',
        description: '面向文本、语音和多模态生成能力的中国 AI 产品样本。',
        product: '多模态模型与面向用户、开发者的 AI 产品能力。', targetCustomers: '需要生成式 AI 能力、语音或多模态产品的用户与开发团队。', aiApproach: '多模态基础模型与生成式 AI 能力以公司公开产品页为准。', url: 'https://www.minimaxi.com/',
        confidence: '高', score: { novelty: 4, source: 5, completeness: 3, relevance: 5, stage: 3, followup: 4 },
        why: ['多模态产品化是国内 AI 应用竞争的持续主题。', '可用于验证模型能力如何转化为用户与开发者产品。'], relatedEvents: ['waic-2026', 'waic-academic-2026']
      }),
      project({
        id: 'moonshot', name: '月之暗面', industry: '基础模型', subSector: '长上下文 / AI 助手', location: '国内（以公司公开主体信息为准）',
        description: '以 Kimi 等 AI 助手产品为代表的国内大模型应用样本。',
        product: '面向用户和开发者的 AI 助手及大模型相关能力。', targetCustomers: '知识工作者、开发者和需要 AI 助手能力的企业用户。', aiApproach: '语言模型与长文本处理相关能力以公司公开页面为准。', url: 'https://www.moonshot.cn/',
        confidence: '高', score: { novelty: 4, source: 5, completeness: 3, relevance: 5, stage: 3, followup: 5 },
        why: ['国内 AI 助手产品化的代表性公开样本。', '适合研究用户产品、模型能力与商业化路径之间的关系。'], relatedEvents: ['waic-2026', 'gdec-2026']
      }),
      project({
        id: 'baichuan', name: '百川智能', industry: '基础模型', subSector: '大模型 / 行业应用', location: '北京（以公司公开主体信息为准）',
        description: '提供大模型与相关行业 AI 能力的国内公开产品样本。',
        product: '大模型和面向行业场景的 AI 服务能力。', targetCustomers: '需要部署或使用大模型能力的企业与开发团队。', aiApproach: '语言模型和行业 AI 能力以公司公开资料为准。', url: 'https://www.baichuan-ai.com/',
        score: { novelty: 3, source: 5, completeness: 2, relevance: 5, stage: 3, followup: 4 },
        why: ['可补充观察国内基础模型与行业应用的组合。', '需进一步确认最新产品策略和商业化边界。'], relatedEvents: ['waic-2026', 'baai-2026']
      }),
      project({
        id: 'zero-one', name: '零一万物', industry: '基础模型', subSector: '企业大模型 / Agent', location: '北京（以公司公开主体信息为准）',
        description: '聚焦大模型与企业 AI 产品能力的国内公开样本。',
        product: '面向企业与开发者的大模型及 AI 应用能力。', targetCustomers: '需要构建企业 AI 应用、Agent 或模型能力的团队。', aiApproach: '大模型和 Agent 相关能力以公司公开页面为准。', url: 'https://www.lingyiwanwu.com/',
        score: { novelty: 4, source: 5, completeness: 2, relevance: 5, stage: 3, followup: 4 },
        why: ['企业大模型与 Agent 是国内 B 端 AI 机会的关键赛道。', '可通过客户、交付方式与模型成本进一步验证。'], relatedEvents: ['waic-2026', 'gdec-2026']
      }),
      project({
        id: 'stepfun', name: '阶跃星辰', industry: '基础模型', subSector: '多模态基础模型', location: '上海（以公司公开主体信息为准）',
        description: '提供多模态大模型相关能力的国内 AI 公司样本。',
        product: '多模态模型与面向开发者、企业的 AI 服务能力。', targetCustomers: '需要多模态模型、AI 内容或企业智能化能力的团队。', aiApproach: '多模态基础模型相关能力以公司公开页面为准。', url: 'https://www.stepfun.com/',
        confidence: '高', score: { novelty: 4, source: 5, completeness: 3, relevance: 5, stage: 3, followup: 5 },
        why: ['多模态模型能力可连接内容、机器人和企业应用多个场景。', '适合验证模型供给、产品化和生态合作路径。'], relatedEvents: ['waic-2026', 'waic-academic-2026']
      }),
      project({
        id: 'modelbest', name: '面壁智能', industry: '基础模型', subSector: '端侧大模型', location: '北京（以公司公开主体信息为准）',
        description: '聚焦高效大模型与端侧部署相关能力的国内样本。',
        product: '面向端侧和效率优化场景的大模型能力。', targetCustomers: '需要在终端、边缘或受限算力环境使用模型能力的产品团队与企业。', aiApproach: '高效模型、端侧推理和相关产品能力以公司公开资料为准。', url: 'https://www.modelbest.cn/',
        confidence: '中', needsManualReview: true, score: { novelty: 5, source: 4, completeness: 2, relevance: 5, stage: 3, followup: 5 },
        why: ['端侧模型与推理效率是国内 AI 软硬件协同的重要信号。', '需要核验实际终端合作、性能指标和商业化进展。'], relatedEvents: ['waic-2026', 'aie-shanghai-2026']
      }),
      project({
        id: 'shengshu', name: '生数科技', industry: '生成式 AI', subSector: '视频生成', location: '北京（以公司公开主体信息为准）',
        description: '提供生成式视频相关 AI 产品能力的国内样本。',
        product: '面向视频创作和内容生产的生成式 AI 能力。', targetCustomers: '内容创作者、媒体、营销与需要视频生成能力的企业团队。', aiApproach: '生成式视频模型及相关产品能力以公司公开页面为准。', url: 'https://www.shengshu-ai.com/',
        score: { novelty: 4, source: 5, completeness: 2, relevance: 5, stage: 3, followup: 4 },
        why: ['视频生成仍是内容 AI 商业化和模型竞争的重要场景。', '需验证版权、成本、客户留存与企业交付能力。'], relatedEvents: ['waic-2026', 'ai-interactive-film-game']
      }),
      project({
        id: 'siliconflow', name: '硅基流动', industry: 'AI 基础设施', subSector: '模型推理 / 开发平台', location: '国内（以公司公开主体信息为准）',
        description: '提供模型推理与 AI 开发相关基础设施能力的国内样本。',
        product: '面向开发者的模型推理、部署与 AI 基础设施服务。', targetCustomers: '需要调用、部署或优化大模型推理的开发团队与企业。', aiApproach: '模型推理、算力调度与开发者服务能力以公司公开资料为准。', url: 'https://siliconflow.cn/',
        confidence: '高', score: { novelty: 5, source: 5, completeness: 3, relevance: 5, stage: 3, followup: 5 },
        why: ['推理成本、性能和开发者体验决定了模型应用能否规模化。', '适合从技术护城河、客户结构和单位经济三个维度验证。'], relatedEvents: ['waic-2026', 'aie-shanghai-2026', 'gdec-2026']
      }),
      project({
        id: 'deepwisdom', name: 'DeepWisdom', industry: 'Agent 基础设施', subSector: '多智能体协作', location: '国内（以公司公开主体信息为准）',
        description: '提供多智能体协作与 AI 软件开发相关能力的国内样本。',
        product: '多智能体协作、自动化软件开发与开发者相关工具。', targetCustomers: '需要将复杂任务拆解给多个 AI Agent 执行的开发团队与企业。', aiApproach: '多智能体协作和自动化工作流能力以公司公开页面为准。', url: 'https://deepwisdom.ai/',
        confidence: '中', needsManualReview: true, score: { novelty: 5, source: 4, completeness: 2, relevance: 5, stage: 3, followup: 5 },
        why: ['多智能体协作连接了软件开发、研究与企业自动化的需求。', '需进一步验证开源、产品化与企业付费之间的转化。'], relatedEvents: ['waic-2026', 'ai-coding-salon']
      }),
      project({
        id: 'deepseek', name: 'DeepSeek', industry: '基础模型', subSector: '开源模型 / 推理', location: '国内（以公司公开主体信息为准）',
        description: '提供大模型与推理相关能力的国内公开产品样本。',
        product: '面向用户与开发者的大模型及推理相关服务。', targetCustomers: '需要使用或构建大模型能力的研究者、开发者与企业。', aiApproach: '大模型、推理与开放生态相关信息以公司公开页面为准。', url: 'https://www.deepseek.com/',
        confidence: '高', score: { novelty: 5, source: 5, completeness: 3, relevance: 5, stage: 3, followup: 4 },
        why: ['模型能力、推理效率和开放生态对国内 AI 创业竞争格局有外溢影响。', '需要区分其生态影响与直接可投资机会。'], relatedEvents: ['waic-2026', 'baai-2026', 'cicai-2026']
      }),
      project({
        id: 'qcraft', name: '轻舟智航', industry: '具身智能', subSector: '自动驾驶', location: '北京（以公司公开主体信息为准）',
        description: '提供自动驾驶和智能出行相关技术能力的国内样本。',
        product: '自动驾驶系统与智能出行相关解决方案。', targetCustomers: '需要自动驾驶或智能出行技术的车企、出行与产业合作方。', aiApproach: '感知、决策、规划与自动驾驶系统能力以公司公开页面为准。', url: 'https://www.qcraft.ai/',
        confidence: '中', score: { novelty: 4, source: 4, completeness: 2, relevance: 5, stage: 3, followup: 4 },
        why: ['自动驾驶是 AI、数据、硬件与规模化交付相交的国内赛道。', '需核验量产、合作深度与安全验证路径。'], relatedEvents: ['waic-2026', 'wrc-2026']
      }),
      project({
        id: 'agibot', name: '智元机器人', industry: '具身智能', subSector: '通用人形机器人', location: '上海（以公司公开主体信息为准）',
        description: '提供通用具身智能和人形机器人相关能力的国内样本。',
        product: '面向工业、服务或开发场景的具身智能与机器人产品。', targetCustomers: '需要机器人自动化、具身智能能力或机器人开发平台的产业客户。', aiApproach: '具身感知、运动控制、模型和机器人系统能力以公司公开页面为准。', url: 'https://www.agibot.com/',
        confidence: '高', score: { novelty: 5, source: 5, completeness: 3, relevance: 5, stage: 3, followup: 5 },
        why: ['具身智能在国内产业链和应用场景中具有高关注度。', '可通过订单、交付、数据闭环和供应链能力进一步验证。'], relatedEvents: ['wrc-2026', 'embodied-robot-commercialization', 'waic-2026']
      }),
      project({
        id: 'galbot', name: '银河通用', industry: '具身智能', subSector: '通用机器人', location: '北京（以公司公开主体信息为准）',
        description: '聚焦通用具身智能与机器人能力的国内样本。',
        product: '面向真实场景任务的具身智能与机器人系统。', targetCustomers: '需要机器人自动化、柔性操作或智能化升级的产业客户。', aiApproach: '视觉、操作、决策与机器人系统相关能力以公司公开页面为准。', url: 'https://www.galbot.com/',
        confidence: '中', needsManualReview: true, score: { novelty: 5, source: 4, completeness: 2, relevance: 5, stage: 3, followup: 5 },
        why: ['通用机器人需要同时验证技术泛化与商业场景闭环。', '适合在展示、部署与客户试点中寻找可验证证据。'], relatedEvents: ['wrc-2026', 'embodied-robot-commercialization']
      }),
      project({
        id: 'limx-dynamics', name: '逐际动力', industry: '具身智能', subSector: '机器人运动控制', location: '深圳（以公司公开主体信息为准）',
        description: '提供具身智能和机器人运动能力相关产品的国内样本。',
        product: '机器人本体、运动控制与具身智能相关产品能力。', targetCustomers: '需要移动、操作或具身智能机器人能力的产业与开发团队。', aiApproach: '运动控制、机器人学习和系统集成能力以公司公开页面为准。', url: 'https://www.limxdynamics.com/',
        confidence: '中', score: { novelty: 4, source: 4, completeness: 2, relevance: 5, stage: 3, followup: 4 },
        why: ['机器人本体和运动能力是具身智能商业化的重要底座。', '需核验量产、可靠性与真实客户交付。'], relatedEvents: ['wrc-2026', 'embodied-robot-commercialization']
      }),
      project({
        id: 'astribot', name: '星尘智能', industry: '具身智能', subSector: '服务机器人 / 操作', location: '深圳（以公司公开主体信息为准）',
        description: '聚焦具身智能机器人与操作能力的国内样本。',
        product: '面向服务、操作或真实场景任务的机器人产品能力。', targetCustomers: '需要机器人自动化或具身智能解决方案的产业客户。', aiApproach: '机器人视觉、操作、学习与系统能力以公司公开页面为准。', url: 'https://www.astribot.com/',
        confidence: '低', needsManualReview: true, score: { novelty: 5, source: 3, completeness: 1, relevance: 5, stage: 3, followup: 5 },
        why: ['具身智能项目是否能从演示走到稳定交付需要重点验证。', '信息不完整，因此优先作为人工研究候选而非结论。'], relatedEvents: ['wrc-2026', 'embodied-robot-commercialization']
      }),
      project({
        id: 'booster-robotics', name: '加速进化', industry: '具身智能', subSector: '人形机器人 / 运动智能', location: '国内（以公司公开主体信息为准）',
        description: '提供人形机器人和运动智能相关能力的国内样本。',
        product: '面向机器人运动、开发或应用的相关产品与平台。', targetCustomers: '机器人开发团队、教育研究与需要运动智能能力的产业客户。', aiApproach: '机器人控制、运动智能和系统能力以公司公开页面为准。', url: 'https://www.boosterobotics.com/',
        confidence: '中', needsManualReview: true, score: { novelty: 4, source: 4, completeness: 1, relevance: 5, stage: 3, followup: 4 },
        why: ['运动智能的技术成熟度和开发者生态值得持续跟踪。', '需核验实际产品交付、客户类型和性能可复现性。'], relatedEvents: ['wrc-2026', 'wrc-sara-2026']
      }),
      project({
        id: 'noetix', name: '松延动力', industry: '具身智能', subSector: '人形机器人', location: '北京（以公司公开主体信息为准）',
        description: '提供人形机器人与具身智能相关产品能力的国内样本。',
        product: '人形机器人和相关开发、应用能力。', targetCustomers: '需要机器人研发、展示、教育或行业应用能力的合作方。', aiApproach: '机器人本体、控制与具身智能能力以公司公开页面为准。', url: 'https://www.noetixrobotics.com/',
        confidence: '中', needsManualReview: true, score: { novelty: 4, source: 4, completeness: 1, relevance: 5, stage: 3, followup: 4 },
        why: ['人形机器人赛道需要同时审视本体、控制、成本和应用场景。', '应通过可复现演示与客户项目核验真实性能。'], relatedEvents: ['wrc-2026', 'embodied-robot-commercialization']
      }),
      project({
        id: 'xverse', name: '元象 XVERSE', industry: '生成式 AI', subSector: '3D 生成 / 空间智能', location: '深圳（以公司公开主体信息为准）',
        description: '提供 3D、空间智能与生成式 AI 相关能力的国内样本。',
        product: '面向内容、空间计算或 3D 生产的 AI 能力。', targetCustomers: '需要 3D 内容、空间智能或数字化展示能力的创作与企业团队。', aiApproach: '生成式 3D、视觉和空间智能能力以公司公开页面为准。', url: 'https://www.xverse.cn/',
        confidence: '中', score: { novelty: 4, source: 4, completeness: 2, relevance: 5, stage: 3, followup: 4 },
        why: ['3D 生成和空间智能连接内容、工业与交互式体验场景。', '需验证产品用户、生成质量和商业化路径。'], relatedEvents: ['waic-2026', 'ai-interactive-film-game']
      }),
      project({
        id: 'pasini', name: '帕西尼感知科技', industry: '具身智能', subSector: '机器人触觉 / 感知', location: '深圳（以公司公开主体信息为准）',
        description: '聚焦机器人触觉与具身感知能力的国内样本。',
        product: '机器人触觉、感知与具身智能相关产品能力。', targetCustomers: '需要精细操作、触觉感知或机器人系统升级的产业与研发团队。', aiApproach: '触觉传感、感知与机器人系统能力以公司公开页面为准。', url: 'https://www.pasini.com/',
        confidence: '低', needsManualReview: true, score: { novelty: 5, source: 3, completeness: 1, relevance: 5, stage: 3, followup: 5 },
        why: ['触觉和精细操作可能成为具身智能落地的关键能力。', '需要核验传感器性能、系统集成与真实客户需求。'], relatedEvents: ['wrc-2026', 'embodied-robot-commercialization']
      }),
      project({
        id: 'rokid', name: 'Rokid', industry: 'AI 终端', subSector: 'AR / 智能眼镜', location: '杭州（以公司公开主体信息为准）',
        description: '提供 AR、智能眼镜与 AI 终端相关产品能力的国内样本。',
        product: '智能眼镜、AR 与面向终端用户的 AI 交互产品。', targetCustomers: '消费者、企业现场工作人员与需要空间计算能力的行业客户。', aiApproach: '语音、视觉、空间计算和终端 AI 能力以公司公开页面为准。', url: 'https://www.rokid.com/',
        confidence: '中', score: { novelty: 4, source: 4, completeness: 2, relevance: 5, stage: 3, followup: 4 },
        why: ['AI 终端是模型能力走向物理世界的重要入口。', '需要验证硬件销量、开发者生态与场景复购。'], relatedEvents: ['waic-2026', 'aie-shanghai-2026']
      }),
      project({
        id: 'liblib', name: 'LiblibAI', industry: '生成式 AI', subSector: 'AI 创作工具 / 模型社区', location: '国内（以公司公开主体信息为准）',
        description: '提供 AI 图像创作、模型与创作者社区相关能力的国内样本。',
        product: '面向创作者的 AI 图像生成、模型工具与内容社区能力。', targetCustomers: '设计师、内容创作者、品牌与需要视觉生成能力的团队。', aiApproach: '生成式视觉模型、工作流与社区生态以公司公开页面为准。', url: 'https://www.liblib.art/',
        confidence: '中', score: { novelty: 4, source: 4, completeness: 2, relevance: 5, stage: 3, followup: 4 },
        why: ['创作工具的留存、社区网络效应和模型供给值得研究。', '需核验版权、付费渗透与平台治理机制。'], relatedEvents: ['waic-2026', 'ai-comic-export']
      }),
      project({
        id: 'neoteai', name: '新智具身（NeoteAI）', industry: '具身智能', subSector: '视触觉 / 具身大模型', location: '上海（公司官网公开地址）',
        description: '2025 年启动的具身智能团队，聚焦将触觉信息融入具身模型、传感器与机器人系统。',
        product: 'InTac 视触觉传感器，以及面向机器人操作的 VTLA 具身大模型、触觉世界模型和强化学习能力。', targetCustomers: '需要精细操作、触觉感知或具身智能解决方案的机器人与工业客户。', aiApproach: '以视触觉融合、VTLA 大模型、触觉世界模型与强化学习为公开技术路线。', url: 'https://www.neoteai.com/',
        foundedAt: '2025-06（行业报道；待主体登记交叉核验）', earlyStageSignal: true, founders: '赵世豪（CEO；公司公开活动信息）', founderBackground: '团队源自复旦大学可信具身智能研究院；个人履历需以官方资料补充。',
        stage: '天使轮（2026-05-27；公司公告）', amount: '近亿元人民币（公司公告）', lastFunding: '2026-05-27（公司公告）', bBefore: '是（天使轮已披露）',
        fullDescription: '公司官网显示其专注于具身智能核心技术与系统研发；官方融资公告披露其完成成立以来首轮近亿元天使轮融资。成立时间来自行业报道，仍应在正式尽调前以主体登记资料复核。',
        commercial: '官网展示工业制造场景交流与视触觉传感器产品；客户、订单与收入未在本条证据中确认。', competitors: '视触觉传感、机器人操作模型与具身智能系统方案；需按技术路线、成本和量产能力进一步比较。',
        publicContacts: [{ label: '公司官网 / 公开商务入口', url: 'https://www.neoteai.com/' }],
        sources: [source('新智具身官网', 'https://www.neoteai.com/', '公司官网'), source('新智具身官方融资公告', 'https://www.neoteai.com/news/148.html', '公司公告'), source('行业报道：新智具身成立于 2025 年 6 月', 'https://www.ne-time.cn/web/article/38833', '行业报道 / 待主体登记核验')],
        discoveredAt: '2026-07-17 12:20', sourceUpdate: '2026-07-17 复核公司官网、官方融资公告与行业报道；成立时间尚待主体登记交叉核验。', confidence: '高', confidenceNote: '产品方向和融资来自公司公开页面；成立时间使用行业报道并明确待复核。',
        score: { novelty: 5, source: 5, completeness: 4, relevance: 5, stage: 5, followup: 5 },
        why: ['成立时间较短且已披露首轮天使融资，适合放入早期具身智能观察队列。', '视触觉与机器人精细操作是可明确提出技术、产品和客户验证问题的方向。'],
        uncertainties: ['成立日期、创始团队完整履历和股权主体仍需用工商及公司资料复核。', '传感器性能、量产成本、真实客户部署与复购尚无本条公开证据。'],
        verifyQuestions: ['视触觉传感器与模型系统分别处于样机、试点还是量产阶段？', '当前最优先的工业或机器人客户场景是什么，是否已有可核验部署？', '与视觉/力控/触觉替代方案相比，性能、成本和集成门槛如何？'], relatedEvents: ['wrc-2026', 'embodied-robot-commercialization', 'waic-2026']
      }),
      project({
        id: 'weifan-intelligence', name: '维泛智能', industry: 'AI 基础设施', subSector: '类脑芯片 / 具身智能计算', location: '北京（北京大学公开报道）',
        description: '2025 年成立、孵化自北京大学类脑芯片实验室的具身智能计算创业团队。',
        product: '面向人形机器人、边缘智能和工业智能的高性能、低功耗、自主可控核心计算方案。', targetCustomers: '需要机器人“大小脑”融合计算、边缘智能或工业智能计算方案的产业与研发团队。', aiApproach: '类脑芯片、神经形态计算与具身智能“大小脑”融合路径以高校公开报道为准。', url: 'https://sie.pku.edu.cn/xwgg/xwdt/74cf931e6f1c43278b070528e5ba7633.htm',
        foundedAt: '2025-05（北京大学公开报道）', earlyStageSignal: true, founders: '未知（当前公开来源未列明）', founderBackground: '孵化自北京大学类脑芯片实验室（北京大学公开报道）。',
        stage: '种子轮（2026-05；高校公开报道）', amount: '数亿元人民币（高校公开报道）', lastFunding: '2026-05（高校公开报道）', bBefore: '是（种子轮已披露）',
        fullDescription: '北京大学创新创业学院公开报道称，维泛智能成立于 2025 年 5 月，孵化自北京大学类脑芯片实验室，并完成数亿元种子轮融资。当前记录不从该报道推断未披露的团队、客户或估值。',
        commercial: '产品落地、客户与收入：待通过公司官网、产品发布或可信采访进一步核验。', competitors: '机器人控制芯片、边缘 AI 芯片与类脑计算方案；需要比较工艺、软件栈、功耗与客户验证。',
        publicContacts: [{ label: '北京大学 AI 创业营公开报道', url: 'https://sie.pku.edu.cn/xwgg/xwdt/74cf931e6f1c43278b070528e5ba7633.htm' }],
        sources: [source('北京大学创新创业学院：维泛智能完成种子轮融资', 'https://sie.pku.edu.cn/xwgg/xwdt/74cf931e6f1c43278b070528e5ba7633.htm', '高校孵化 / 公开报道')],
        discoveredAt: '2026-07-17 12:20', sourceUpdate: '2026-07-17 复核北京大学公开报道；个人创始人、估值和产品交付仍待核验。', confidence: '中', needsManualReview: true, confidenceNote: '成立时间、融资与技术方向来自高校公开报道；公司主体和商业化证据尚需补充。',
        score: { novelty: 5, source: 5, completeness: 3, relevance: 5, stage: 5, followup: 5 },
        why: ['成立于 2025 年且披露种子轮，符合“从实验室到公司”的早期项目筛选方向。', '芯片与具身智能计算的技术-产品-产业验证路径清晰，便于形成后续问题清单。'],
        uncertainties: ['当前公开来源未列明完整创始团队、公司官网、估值或客户。', '“数亿元”融资、核心产品成熟度和量产计划需以公司或投资方材料交叉验证。'],
        verifyQuestions: ['核心芯片是否已有流片、样片、SDK 或客户验证？', '系统级“大小脑融合”相对通用 GPU / NPU 方案的实际优势是什么？', '种子资金将优先投入研发、流片、软件工具链还是客户试点？'], relatedEvents: ['wrc-2026', 'waic-2026', 'aie-shanghai-2026']
      }),
      project({
        id: 'synmat-ai', name: '新研智材', industry: 'AI for Science', subSector: '材料信息学 / AI 材料研发', location: '深圳（公开融资报道）',
        description: '2024 年末成立的 AI for Science 创业团队，面向半导体与新能源材料研发场景。',
        product: '以材料信息学和人工智能辅助半导体核心材料、新能源材料等高端研发。', targetCustomers: '材料研发、半导体、新能源与需要缩短材料研发周期的产业客户。', aiApproach: '材料信息学、AI 辅助设计与材料研发工作流，具体技术栈以公司后续公开资料为准。', url: 'https://synmatai.cn/',
        foundedAt: '2024-12-11（公开融资报道）', earlyStageSignal: true, founders: '未知（当前公开来源未列明）', founderBackground: '未知（待公司官网或可信采访补充）。',
        stage: '种子轮（2025-09-04；公开融资报道）', amount: '千万级人民币（公开融资报道）', lastFunding: '2025-09-04（公开融资报道）', bBefore: '是（种子轮已披露）',
        fullDescription: '公司官网确认其定位为材料信息学与人工智能融合的科技公司；公开融资报道披露其于 2024 年 12 月成立并完成千万级种子轮融资。融资细节仍需以公司或投资方公告复核。',
        commercial: '官网展示材料研发定位；付费客户、产品交付和实际研发周期改进未由当前来源独立核验。', competitors: 'AI for Science、计算材料学与材料研发软件；需要比较数据获取、实验闭环、模型可解释性和客户导入周期。',
        publicContacts: [{ label: '新研智材官网', url: 'https://synmatai.cn/' }],
        sources: [source('新研智材官网', 'https://synmatai.cn/', '公司官网'), source('投资界：新研智材完成千万级种子轮融资', 'https://news.pedaily.cn/202509/554515.shtml', '公开融资报道')],
        discoveredAt: '2026-07-17 12:20', sourceUpdate: '2026-07-17 复核公司官网与公开融资报道；融资金额和主体信息待公司或投资方材料交叉验证。', confidence: '中', needsManualReview: true, confidenceNote: '产品方向有官网证据；成立时间与融资字段来自公开融资报道。',
        score: { novelty: 5, source: 4, completeness: 3, relevance: 5, stage: 5, followup: 4 },
        why: ['成立不足两年、处于种子轮，且将 AI 用于明确的产业研发流程。', 'AI for Science 的价值可从数据、实验闭环、研发效率和付费客户四条线验证。'],
        uncertainties: ['创始团队、专有数据来源、模型性能与客户采用进展尚未在当前证据中确认。', '“研发周期缩短”类主张需要取得可复现的对照与客户案例。'],
        verifyQuestions: ['首个聚焦材料与实际客户研发流程分别是什么？', '训练数据、实验验证和模型输出如何形成闭环？', '种子轮后是否已有可核验的试点、订单或联合研发伙伴？'], relatedEvents: ['waic-2026', 'cicai-2026', 'gdec-2026']
      }),
      project({
        id: 'manifold-ai', name: 'Manifold AI（流形空间）', industry: 'AI 基础设施', subSector: '世界模型 / 物理 AI Infra', location: '北京（公开融资报道；待主体登记复核）',
        description: '2025 年启动的世界模型创业团队，探索将多模态世界模型用于具身智能与物理 AI 场景。',
        product: 'RoboScape 等世界模型与相关 Infra，面向电商物流、3C 制造、汽车制造及 MR 场景探索落地。', targetCustomers: '需要世界模型、机器人仿真、物理 AI 或空间智能能力的产业与开发团队。', aiApproach: '以室外、室内、空域世界模型和多模态世界模型作为公开技术方向。', url: 'https://www.manifoldai.cn/',
        foundedAt: '2025-05 下旬（公开融资报道）', earlyStageSignal: true, founders: '未知（当前公开来源未列明个人创始人）', founderBackground: '公开融资报道提及清华 FIB 实验室与产业团队背景；具体人员待公司公开资料核验。',
        stage: 'Pre-A+（2026-06；公开融资报道）', amount: '数亿元人民币（公开融资报道）', lastFunding: '2026-06（公开融资报道）', bBefore: '是（Pre-A+ 已披露）',
        fullDescription: '官网显示项目于 2025 年 5 月上线；公开融资报道描述其为世界模型方向创业公司，并披露新一轮数亿元融资。实际主体、融资条款和客户进展仍需以公司或投资方材料复核。',
        commercial: '公开报道列出物流、制造、汽车制造与 MR 的探索方向；付费合同、交付深度和产品成熟度尚待核验。', competitors: '机器人世界模型、仿真平台、物理 AI 及空间智能方案；需比较数据规模、泛化能力、部署成本与产品交付。',
        publicContacts: [{ label: 'Manifold AI 官网', url: 'https://www.manifoldai.cn/' }],
        sources: [source('Manifold AI 官网', 'https://www.manifoldai.cn/', '公司官网'), source('投资界：Manifold AI 完成新一轮融资', 'https://news.pedaily.cn/202606/565342.shtml', '公开融资报道')],
        discoveredAt: '2026-07-17 12:20', sourceUpdate: '2026-07-17 复核官网和公开融资报道；主体、融资条款及客户仍待人工核验。', confidence: '中', needsManualReview: true, confidenceNote: '产品上线有官网证据；成立时间、地点与融资字段主要来自公开融资报道。',
        score: { novelty: 5, source: 4, completeness: 3, relevance: 5, stage: 5, followup: 5 },
        why: ['团队成立时间较短，且世界模型与物理 AI 的技术主题具备明确的产业验证路径。', '技术、数据、仿真和现场落地之间的差距正是适合投资经理提问的早期不确定性。'],
        uncertainties: ['公司主体、个人创始人、融资条款与客户名称未由当前官方材料完整确认。', '世界模型基准成绩与真实机器人/制造场景表现之间的关联需要独立验证。'],
        verifyQuestions: ['当前最优先的付费或试点场景是什么，是否已有可核验交付？', '训练数据、仿真数据和真实数据如何组合，并如何避免场景迁移失效？', '世界模型产品以 SDK、项目制交付还是平台订阅方式商业化？'], relatedEvents: ['wrc-2026', 'waic-2026', 'aie-shanghai-2026']
      }),
      project({
        id: 'k2-lab', name: '攀峰智能（K2 Lab）', industry: 'AI 应用', subSector: '商业化视频 Agent / 内容电商', location: '国内（具体注册地待主体核验）',
        description: '2025 年 10 月创立的商业化 Agent 团队，面向内容电商的选品、创作、分发与复盘工作流。',
        product: 'Moras 商业化视频 Agent，报道描述其可支持选品推荐、脚本生成、内容创作、剪辑、发布、数据分析等流程。', targetCustomers: '内容电商商家、创作者、出海营销与希望用 Agent 自动化视频商业化流程的团队。', aiApproach: '以多步骤 Agent 协同执行内容电商理解、创作、分发与效果复盘；产品能力以公开报道为准。', url: 'https://36kr.com/p/3768320373441281',
        foundedAt: '2025-10（公开融资报道）', earlyStageSignal: true, founders: '王铭（公开报道提及；个人履历待公司资料核验）', founderBackground: '公开报道提及其此前在钉钉任职；具体职位与团队信息需以公司资料交叉核验。',
        stage: '天使轮（2026-04；公开融资报道）', amount: '数千万元人民币（媒体披露）', lastFunding: '2026-04（公开融资报道）', bBefore: '是（天使轮已披露）',
        fullDescription: '公开媒体报道显示，攀峰智能成立于 2025 年 10 月并获得早期融资，定位为面向“超级个体”的商业化 Agent 产品。当前记录仅以公开报道作为线索证据，不把媒体描述直接等同于产品、客户或融资事实。',
        commercial: '报道指向内容电商达人和商家场景；产品上线、客户、GMV 与留存数据必须由公司公开材料或客户案例复核。', competitors: 'AI 内容工具、营销自动化、视频生成与电商 Agent；需要比较实际工作流覆盖、人工替代率、平台规则适配和付费意愿。',
        publicContacts: [{ label: '36氪公开融资报道', url: 'https://36kr.com/p/3768320373441281' }],
        sources: [source('36氪：攀峰智能完成天使轮融资', 'https://36kr.com/p/3768320373441281', '公开融资报道'), source('C114：攀峰智能种子轮融资报道', 'https://www.c114.net.cn/industry/51690.html', '公开行业报道')],
        discoveredAt: '2026-07-17 12:20', sourceUpdate: '2026-07-17 交叉比对两篇公开报道；公司主体、官网、团队与产品数据仍待人工核验。', confidence: '中', needsManualReview: true, confidenceNote: '成立时间、融资和产品描述来自媒体报道，尚未获得公司官网或投资方公告交叉验证。',
        score: { novelty: 5, source: 3, completeness: 2, relevance: 5, stage: 5, followup: 5 },
        why: ['成立不足一年、早期融资且产品场景聚焦，符合早期应用型 AI 项目的发现目标。', '内容电商 Agent 可以围绕任务完成率、成本、转化、平台依赖和客户留存形成具体验证。'],
        uncertainties: ['公司主体、官网、完整团队、融资条款和投资方未被当前公司材料证实。', '媒体提及的产品能力、客户效果与商业化指标均需要独立证据。'],
        verifyQuestions: ['Moras 是否已公开可用，核心用户是谁，付费和留存数据如何？', 'Agent 在平台规则、内容质量和账户安全约束下的真实完成率如何？', '与通用视频生成工具和人工运营团队相比，单位产出成本和转化提升是否可复现？'], relatedEvents: ['ai-comic-export', 'ai-interactive-film-game', 'enterprise-ai-collab']
      }),
      project({
        id: 'smartmore', name: '思谋科技', industry: 'AI 应用', subSector: '工业视觉 / 智能制造', location: '国内（以公司公开主体信息为准）',
        description: '提供工业视觉与智能制造相关 AI 能力的国内样本。',
        product: '面向制造业的机器视觉、检测与智能化解决方案。', targetCustomers: '需要质量检测、自动化与智能制造升级的工业客户。', aiApproach: '计算机视觉、工业检测与 AI 系统集成能力以公司公开页面为准。', url: 'https://www.smartmore.com/',
        confidence: '低', needsManualReview: true, score: { novelty: 3, source: 3, completeness: 1, relevance: 4, stage: 3, followup: 4 },
        why: ['工业 AI 的价值最终取决于交付周期、ROI 与可复制性。', '需要重点核验客户结构、项目制程度和回款质量。'], relatedEvents: ['waic-2026', 'gdec-2026']
      })
    ],
    events: [
      event({
        id: 'waic-2026', name: '2026 世界人工智能大会（WAIC）', date: '2026-07-17 — 2026-07-20', isoStart: '2026-07-17', location: '上海', organizer: '世界人工智能大会组委会（以官方页为准）', type: 'AI 产业大会', theme: '人工智能产业、模型、机器人与应用生态', sourceTitle: '上海市政府 WAIC 2026 信息页', sourceType: '政府信息页', url: 'https://japanese.shanghai.gov.cn/ja-2026WAIC/index.html',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 4, format: 4, investor: 5, discovery: 5, source: 5, urgency: 5 },
        qualityReason: '国内大型 AI 产业活动，适合通过项目展示、分论坛和产业交流发现模型、具身智能与应用团队；仍需按具体议程二次筛选。', relatedProjects: ['zhipu-ai', 'stepfun', 'siliconflow', 'agibot'], attendeesToWatch: ['模型、智能体、具身智能与 AI 基础设施创业团队。', '具备产品展示、产业合作或融资需求的参展团队。']
      }),
      event({
        id: 'waic-academic-2026', name: 'WAIC 2026 学术活动', date: '2026-07-18 — 2026-07-20', isoStart: '2026-07-18', location: '上海', organizer: 'WAIC Academic（以官方页为准）', type: 'AI 学术与产业论坛', theme: '人工智能研究、模型技术与产业转化', sourceTitle: 'WAIC Academic 官方日程', sourceType: '官方日程', url: 'https://waica2026.worldaic.com.cn/program/',
        quality: '高', discoveryPotential: '中', score: { topic: 5, speakers: 5, format: 3, investor: 4, discovery: 3, source: 5, urgency: 5 },
        qualityReason: '研究和产业交叉密度高，适合识别技术方向与专家；项目发现需要结合展示、合作和周边交流环节。', relatedProjects: ['zhipu-ai', 'minimax', 'stepfun', 'deepseek']
      }),
      event({
        id: 'baai-2026', name: '2026 北京智源大会', date: '2026-06-12 — 2026-06-13（已结束）', isoStart: '2026-06-12', location: '北京', organizer: '北京智源人工智能研究院（以官方页为准）', type: 'AI 技术大会', theme: '基础模型、AI 研究与产业创新', sourceTitle: '2026 北京智源大会官方日程', sourceType: '官方日程', url: 'https://2026.baai.ac.cn/schedule',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 5, format: 4, investor: 5, discovery: 4, source: 5, urgency: 1 },
        qualityReason: '基础模型与研究创业生态密度高，适合复盘公开议程、发布内容和参会组织；本期已结束。', relatedProjects: ['zhipu-ai', 'baichuan', 'deepseek', 'modelbest']
      }),
      event({
        id: 'ceai-2026', name: '2026 中国具身智能大会（CEAI）', date: '2026-04-10 — 2026-04-12（已结束）', isoStart: '2026-04-10', location: '合肥', organizer: '中国人工智能学会（以官方页为准）', type: '具身智能大会', theme: '具身智能、机器人与产业应用', sourceTitle: 'CEAI 官方页', sourceType: '官方页', url: 'https://ceai.caai.cn/',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 4, format: 4, investor: 5, discovery: 5, source: 5, urgency: 1 },
        qualityReason: '主题与具身智能投资高度相关，适合复盘参展项目、学术成果与产业合作；本期已结束。', relatedProjects: ['agibot', 'galbot', 'limx-dynamics', 'pasini']
      }),
      event({
        id: 'wrc-2026', name: '2026 世界机器人大会（WRC）', date: '2026-08-20 — 2026-08-22', isoStart: '2026-08-20', location: '北京', organizer: '世界机器人大会组委会（以官方页为准）', type: '机器人产业大会', theme: '机器人、具身智能、产业应用与开发者生态', sourceTitle: '2026 世界机器人大会论坛页', sourceType: '官方页', url: 'https://www.worldrobotconference.com/forum/',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 4, format: 5, investor: 5, discovery: 5, source: 5, urgency: 5 },
        qualityReason: '具身智能、机器人本体、零部件与应用场景集中，适合建立项目清单并安排现场验证。', relatedProjects: ['agibot', 'galbot', 'limx-dynamics', 'astribot', 'noetix', 'pasini']
      }),
      event({
        id: 'wrc-sara-2026', name: '2026 世界机器人大会 SARA 论坛', date: '2026-08-21', isoStart: '2026-08-21', location: '北京', organizer: '世界机器人大会（以官方页为准）', type: '机器人专题论坛', theme: '机器人与相关产业技术交流', sourceTitle: 'WRC SARA 官方页', sourceType: '官方页', url: 'https://www.worldrobotconference.com/sara/',
        quality: '中', discoveryPotential: '中', score: { topic: 4, speakers: 3, format: 3, investor: 3, discovery: 3, source: 5, urgency: 5 },
        qualityReason: '专题清晰但具体嘉宾、项目展示和交流机制需要在当前议程中确认。', relatedProjects: ['booster-robotics', 'noetix', 'limx-dynamics']
      }),
      event({
        id: 'cicai-2026', name: '2026 中国国际人工智能大会（CICAI）', date: '2026-10-17 — 2026-10-18', isoStart: '2026-10-17', location: '地点待官方当前页核验', organizer: '中国人工智能学会（以官方页为准）', type: 'AI 产业大会', theme: '人工智能技术、应用与产业生态', sourceTitle: '中国人工智能学会 CICAI 2026 信息页', sourceType: '官方信息页', url: 'https://www.caai.cn/site/content/5469.html',
        quality: '高', discoveryPotential: '中', score: { topic: 5, speakers: 4, format: 3, investor: 4, discovery: 3, source: 5, urgency: 4 },
        qualityReason: '主题匹配度高，但场地、嘉宾与项目交流形式尚需以当前官方页为准。', relatedProjects: ['zhipu-ai', 'siliconflow', 'deepseek']
      }),
      event({
        id: 'gdps-2026', name: '2026 全球开发者先锋大会', date: '2026-03-27 — 2026-03-29（已结束）', isoStart: '2026-03-27', location: '上海', organizer: '以官方 / 政府信息页为准', type: '开发者与 AI 大会', theme: '开发者、人工智能与产业创新', sourceTitle: '上海市政府大会信息页', sourceType: '政府信息页', url: 'https://www.shanghai.gov.cn/nw4411/20260215/13cea19844984e7794b46a62c3b37d8f.html',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 4, format: 4, investor: 4, discovery: 4, source: 5, urgency: 1 },
        qualityReason: '开发者和产业合作密度高，可作为复盘国内 AI 开发者项目与生态的来源；本期已结束。', relatedProjects: ['siliconflow', 'deepwisdom', 'stepfun']
      }),
      event({
        id: 'gdec-2026', name: '2026 全球数字经济大会', date: '2026-07-02 — 2026-07-05（已结束）', isoStart: '2026-07-02', location: '北京', organizer: '全球数字经济大会组委会（以官方页为准）', type: '数字经济与 AI 大会', theme: '数字经济、人工智能与产业应用', sourceTitle: '全球数字经济大会官方信息页', sourceType: '官方信息页', url: 'https://www.gdec.net.cn/2025/actives/newsdetail?id=1241&lang=zh',
        quality: '中', discoveryPotential: '中', score: { topic: 4, speakers: 3, format: 4, investor: 3, discovery: 3, source: 4, urgency: 1 },
        qualityReason: '产业覆盖面广但 AI 不一定是唯一主线，需要按分论坛和项目目录筛选；本期已结束。', relatedProjects: ['moonshot', 'zero-one', 'siliconflow', 'smartmore']
      }),
      event({
        id: 'digital-economy-expo-2026', name: '2026 中国国际数字经济博览会', date: '2026-07-02 — 2026-07-04（已结束）', isoStart: '2026-07-02', location: '北京', organizer: '以北京市政府公开信息页为准', type: '数字经济展会', theme: '数字经济、产业数字化与 AI 应用', sourceTitle: '北京市政府展会信息页', sourceType: '政府信息页', url: 'https://www.beijing.gov.cn/fuwu/lqfw/gggs/202606/t20260622_4709816.html',
        quality: '低', discoveryPotential: '低', score: { topic: 3, speakers: 2, format: 3, investor: 2, discovery: 2, source: 5, urgency: 1 },
        qualityReason: '活动公开性高但主题较泛，若目标是发现早期 AI 项目，需先证明存在专门项目展示或高密度交流机制；本期已结束。', relatedProjects: ['smartmore', 'rokid']
      }),
      event({
        id: 'aie-shanghai-2026', name: '2026 上海国际人工智能展', date: '2026-12-09 — 2026-12-11', isoStart: '2026-12-09', location: '上海', organizer: '以官方展会页为准', type: 'AI 产业展会', theme: '人工智能技术、应用与产业生态', sourceTitle: '上海国际人工智能展官方页', sourceType: '官方页', url: 'https://www.sifeshow.com/',
        quality: '中', discoveryPotential: '高', score: { topic: 4, speakers: 3, format: 4, investor: 4, discovery: 4, source: 4, urgency: 3 },
        qualityReason: '展会形态有利于发现参展项目和产业合作方，但需提前取得展商、论坛与项目展示信息。', relatedProjects: ['modelbest', 'siliconflow', 'rokid']
      }),
      event({
        id: 'csai-2026', name: 'CSAI 2026', date: '2026-12-18 — 2026-12-21', isoStart: '2026-12-18', location: '北京', organizer: '以官方征稿页为准', type: 'AI 学术会议', theme: '人工智能研究与应用', sourceTitle: 'CSAI 2026 官方征稿页', sourceType: '官方 PDF', url: 'https://csai.org/assets/files/CSAI-CFP-CN.pdf',
        quality: '中', discoveryPotential: '中', score: { topic: 5, speakers: 4, format: 3, investor: 3, discovery: 3, source: 4, urgency: 3 },
        qualityReason: '学术主题深度较高，适合识别研究方向和专家；创业项目发现价值取决于产学研转化与交流安排。', relatedProjects: ['zhipu-ai', 'deepseek', 'xverse']
      }),
      event({
        id: 'wsai-2026', name: 'WSAI 2026', date: '2026-06-24 — 2026-06-26（已结束）', isoStart: '2026-06-24', location: '济南', organizer: '以官方征稿页为准', type: 'AI 学术会议', theme: '人工智能与相关交叉研究', sourceTitle: 'WSAI 2026 官方征稿页', sourceType: '官方 PDF', url: 'https://www.wsai.org/wsai_cfp.pdf',
        quality: '中', discoveryPotential: '中', score: { topic: 4, speakers: 4, format: 3, investor: 3, discovery: 2, source: 4, urgency: 1 },
        qualityReason: '技术信息密度可能较高，但未确认创业展示或高质量项目交流机制；本期已结束。', relatedProjects: ['deepwisdom', 'xverse']
      }),
      event({
        id: 'aitc-2026', name: 'AITC 2026', date: '2026-06-19 — 2026-06-21（已结束）', isoStart: '2026-06-19', location: '成都', organizer: '以官方征稿页为准', type: 'AI 技术会议', theme: '人工智能与计算机视觉相关研究', sourceTitle: 'AITC 2026 官方征稿页', sourceType: '官方 PDF', url: 'https://aitc.org/cfp-cv.pdf',
        quality: '中', discoveryPotential: '中', score: { topic: 4, speakers: 4, format: 3, investor: 3, discovery: 2, source: 4, urgency: 1 },
        qualityReason: '适合研究技术方向与专家网络，项目发现价值需要以实际交流和展示安排为准；本期已结束。', relatedProjects: ['qcraft', 'pasini']
      }),
      event({
        id: 'caa-ai-science-2026', name: '2026 中国自动化与人工智能科普大会', date: '2026-01-31 — 2026-02-01（已结束）', isoStart: '2026-01-31', location: '北京', organizer: '中国自动化学会（以官方页为准）', type: '科普与行业活动', theme: '自动化、人工智能与公众传播', sourceTitle: '中国自动化学会公开通知', sourceType: '官方 PDF', url: 'https://www.caa.org.cn/Uploads/image/file/20260128/20260128153604_72996.pdf',
        quality: '低', discoveryPotential: '低', score: { topic: 3, speakers: 2, format: 2, investor: 1, discovery: 1, source: 4, urgency: 1 },
        qualityReason: '信息公开但活动目标偏科普，不适合当前“发现可跟进创业项目”的优先目标；本期已结束。', relatedProjects: ['noetix', 'rokid']
      }),
      event({
        id: 'cjai-2026', name: '2026 中国司法人工智能大会', date: '2026-01-23 — 2026-01-24（已结束）', isoStart: '2026-01-23', location: '上海', organizer: '中国人工智能学会（以官方页为准）', type: '垂直行业 AI 大会', theme: '司法人工智能与行业应用', sourceTitle: '中国人工智能学会公开信息页', sourceType: '官方信息页', url: 'https://www.caai.cn/site/content/5468.html',
        quality: '中', discoveryPotential: '低', score: { topic: 4, speakers: 4, format: 3, investor: 3, discovery: 2, source: 5, urgency: 1 },
        qualityReason: '垂直领域认知价值明确，但创业项目发现面较窄；本期已结束。', relatedProjects: ['zhipu-ai', 'zero-one']
      }),
      event({
        id: 'ai-interactive-film-game', name: '2026 AI 互动影游大会', date: '2026-08-31', isoStart: '2026-08-31', location: '北京海淀', organizer: '北京动漫游戏产业协会（以报名页为准）', type: 'AI 内容产业活动', theme: 'AI 互动影游、内容与创作工具', sourceTitle: '活动行公开报名页', sourceType: '公开报名页', url: 'https://www.huodongxing.com/event/2869413106200',
        quality: '中', discoveryPotential: '中', score: { topic: 4, speakers: 3, format: 4, investor: 3, discovery: 3, source: 3, urgency: 5 },
        qualityReason: '主题垂直，可能接触内容 AI 创业团队；嘉宾、项目展示和交流质量需以报名页与现场议程核验。', relatedProjects: ['shengshu', 'xverse', 'liblib']
      }),
      event({
        id: 'ai-comic-export', name: '2026 AI 漫剧出海大会', date: '2026-08-31', isoStart: '2026-08-31', location: '北京海淀', organizer: '以活动行报名页为准', type: 'AI 内容产业活动', theme: 'AI 漫剧、内容生成与出海', sourceTitle: '活动行公开报名页', sourceType: '公开报名页', url: 'https://www.huodongxing.com/event/2869411959800',
        quality: '中', discoveryPotential: '中', score: { topic: 4, speakers: 3, format: 4, investor: 3, discovery: 3, source: 3, urgency: 5 },
        qualityReason: '可观察 AI 内容生产与出海方向，但需要核验项目真实性、用户数据与商业模式。', relatedProjects: ['shengshu', 'liblib', 'xverse']
      }),
      event({
        id: 'enterprise-ai-collab', name: '企业级 AI 项目合作沟通会', date: '2026-07-20', isoStart: '2026-07-20', location: '北京海淀', organizer: '以活动行报名页为准', type: 'AI 创业交流活动', theme: '企业级 AI、项目合作与创业交流', sourceTitle: '活动行公开报名页', sourceType: '公开报名页', url: 'https://www.huodongxing.com/event/1864527292600',
        quality: '中', discoveryPotential: '高', score: { topic: 4, speakers: 2, format: 4, investor: 4, discovery: 4, source: 3, urgency: 5 },
        qualityReason: '若活动存在真实项目路演或合作洽谈，线索价值较高；必须先确认主办方、参会者与交流形式。', relatedProjects: ['zero-one', 'siliconflow', 'deepwisdom']
      }),
      event({
        id: 'embodied-robot-commercialization', name: '具身智能机器人商业化分享会', date: '2026-07-16', isoStart: '2026-07-16', location: '北京海淀', organizer: '以活动行报名页为准', type: '具身智能交流活动', theme: '具身智能机器人商业化与产业合作', sourceTitle: '活动行公开报名页', sourceType: '公开报名页', url: 'https://www.huodongxing.com/event/4868965177700',
        quality: '中', discoveryPotential: '高', score: { topic: 5, speakers: 2, format: 4, investor: 4, discovery: 4, source: 3, urgency: 5 },
        qualityReason: '主题对具身智能投资高度相关，活动规模与嘉宾需核验，但适合验证商业化话题和新团队。', relatedProjects: ['agibot', 'galbot', 'limx-dynamics', 'pasini']
      }),
      event({
        id: 'ai-coding-salon', name: 'AI Coding 主题分享活动', date: '2026-07-25', isoStart: '2026-07-25', location: '北京海淀', organizer: '以活动行报名页为准', type: '开发者沙龙', theme: 'AI Coding、开发者工具与技术交流', sourceTitle: '活动行公开报名页', sourceType: '公开报名页', url: 'https://www.huodongxing.com/event/4868381692000',
        quality: '低', discoveryPotential: '中', score: { topic: 3, speakers: 2, format: 3, investor: 2, discovery: 2, source: 3, urgency: 5 },
        qualityReason: '开发者主题相关，但尚未确认高质量项目展示、主办方背书或创业者密度，不应因“AI”标签自动高排。', relatedProjects: ['deepwisdom', 'siliconflow']
      })
    ],
    ingestionTestCases: {
      duplicates: [
        { incoming: '智谱 / 智谱AI', handling: '名称标准化后与公司官网 URL 比对，保留一个实体并记录来源。' },
        { incoming: '2026 WAIC / 世界人工智能大会', handling: '活动名称、日期和官方链接比对，合并到同一活动实体。' },
        { incoming: '硅基流动产品新闻 / 公司官网', handling: '新闻先进入待核验队列，人工确认主体后再关联正式项目。' }
      ],
      missingFields: [
        { entity: '面壁智能', fields: ['融资金额', '估值'], handling: '保持未知，不从摘要推断。' },
        { entity: '星尘智能', fields: ['创始团队', '融资轮次'], handling: '标记人工核验。' },
        { entity: '2026 世界机器人大会', fields: ['完整嘉宾名单'], handling: '以官方当前议程为准。' },
        { entity: '企业级 AI 项目合作沟通会', fields: ['参会项目名单'], handling: '不补造，要求打开报名页核验。' },
        { entity: 'AI Coding 主题分享活动', fields: ['主办方背景', '创业者密度'], handling: '保持待核验并给低优先级。' },
        { entity: '中国国际数字经济博览会', fields: ['AI 项目发现机制'], handling: '低价值样本，不以展会规模替代项目线索质量。' }
      ]
    }
  };
})();
