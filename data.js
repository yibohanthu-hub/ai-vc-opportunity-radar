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

  // Public financing reports are useful for finding very early teams, but they
  // are not a substitute for a company dossier. This helper keeps those records
  // visibly in the formal pool while retaining their source boundary and manual
  // review requirement instead of filling gaps with guesses.
  const earlyFundingProject = (item) => project({
    industry: '具身智能',
    subSector: '早期融资 / 待核验',
    location: '国内（公开融资报道；待主体核验）',
    description: '来自公开融资报道的国内早期 AI 项目线索；产品、主体与商业化信息需要进一步核验。',
    product: '待以公司、投资方或客户公开材料进一步核验。',
    targetCustomers: '目标客户与应用场景：待核验。',
    aiApproach: '技术路线以当前公开融资报道为线索，需回到公司或投资方材料验证。',
    founders: '未知（当前公开报道未完整披露）',
    founderBackground: '未知（需以公司、投资方或可信采访核验）',
    foundedAt: '未知（早期融资披露；主体成立时间待核验）',
    stage: '待核验',
    amount: '未知',
    valuation: '未知',
    lastFunding: '未知',
    bBefore: '待核验',
    earlyStageSignal: true,
    fullDescription: '本条记录来自公开融资报道，用于扩展早期项目发现范围。只有来源明确披露的信息被写入；团队、主体、融资条款、客户与产品能力均需要进一步交叉验证。',
    commercial: '公开报道可能提及试点或订单；合同、收入、客户与交付深度均待人工核验。',
    competitors: '同赛道国内与全球 AI / 机器人 / 软件解决方案；具体竞品格局需人工研究。',
    publicContacts: [{ label: '公开融资报道 / 原始来源', url: item.url }],
    sources: [source(item.sourceTitle || '公开融资报道', item.url, item.sourceType || '公开融资报道')],
    discoveredAt: '2026-07-17 20:10',
    informationUpdatedAt: capturedAt,
    sourceUpdate: '2026-07-17 以公开融资报道整理；仅保留可见披露，所有关键事实在行动前需人工交叉核验。',
    confidence: '中',
    needsManualReview: true,
    confidenceNote: '当前记录以公开融资报道为单一或主要线索，不能自动等同于已完成主体、融资或商业化事实审计。',
    score: { novelty: 5, source: 4, completeness: 3, relevance: 5, stage: 5, followup: 5 },
    why: ['近期公开披露早期融资或成立时间较短，可作为国内 AI 项目发现与人工研究入口。', '技术主题、融资节奏和真实场景验证均可形成下一步可解释的问题清单。'],
    uncertainties: ['公司主体、完整团队、融资条款、估值与公开联系入口可能未在当前来源完整披露。', '媒体报道的产品、客户、订单或性能描述需要公司、投资方或客户材料交叉验证。'],
    verifyQuestions: ['公司主体、成立时间、核心团队和当前融资状态能否由公司或投资方公开材料确认？', '最优先产品、目标客户与试点/订单是否有可复核证据？', '与现有替代方案相比，技术、交付成本与客户 ROI 的差异是什么？'],
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
      poolUpdatedAt: '2026-07-17 21:15',
      morningStatus: '已完成 · 国内优先样本与早期项目扩展',
      eveningStatus: '待运行 · 由定时采集任务写入待核验队列',
      disclaimer: '作品集 Demo：已整理样本与实时待核验队列均以国内公开来源为优先；未知字段不会被补造。'
    },
    projects: [
      earlyFundingProject({
        id: 'coddie-ai', name: '珂迪科技（Coddie）', industry: 'AI 终端', subSector: 'AI 母婴智能硬件 / 家庭场景', location: '深圳（深圳珂迪科技有限公司；公开融资报道）',
        description: '面向新手父母的 AI 母婴智能硬件团队，公开报道披露其以“AI 决策 + 硬件执行”处理看护、安抚与陪伴等高频任务。', product: '围绕家庭育儿场景的 AI 智能硬件产品矩阵（公开融资报道）。', targetCustomers: '新手父母与家庭育儿场景用户。', aiApproach: 'AI 决策与智能硬件执行结合（公开融资报道）。', url: 'https://news.pedaily.cn/20260528/130819.shtml',
        foundedAt: '2026 年（公开融资报道）', stage: '天使轮（2026-05；公开融资报道）', amount: '数千万元人民币（公开融资报道）', lastFunding: '2026-05-28（公开融资报道）', bBefore: '是（天使轮已披露）',
        sourceTitle: '投资界：珂迪 Coddie 完成天使轮融资', founders: '何鋡威（创始人；公开融资报道）', founderBackground: '公开报道提及连续创业及团队来自华为、安克创新、拓竹科技等；具体履历待公司资料核验。', relatedEvents: ['ai-hangzhou-2026', 'ai-show-hangzhou-2026']
      }),
      earlyFundingProject({
        id: 'xingyi-ai', name: '星熠智能', industry: 'AI 应用', subSector: 'AI 人力供应链 / 招聘智能体', location: '上海（上海星熠无限智能科技有限公司；公开融资报道）',
        description: '面向服务行业一线人才供给的 AI 团队，公开报道披露其用 KYMS AI 胜任力引擎支持招聘、筛选、邀约与到岗交付。', product: '“极速到岗”人才交付服务及 KYMS AI 胜任力引擎（公开融资报道）。', targetCustomers: '连锁餐饮等需要一线人才供给与招聘交付的企业。', aiApproach: '将招聘经验转化为可追踪、可复用的 AI 胜任力与工作流能力（公开融资报道）。', url: 'https://news.pedaily.cn/202606/565533.shtml',
        stage: '天使轮（2026-06；公开融资报道）', amount: '千万元人民币（公开融资报道）', lastFunding: '2026-06-25（公开融资报道）', bBefore: '是（天使轮已披露）', sourceTitle: '投资界：星熠智能完成天使轮融资', relatedEvents: ['idc-ai-summit-2026', 'enterprise-ai-collab']
      }),
      earlyFundingProject({
        id: 'molian-agent-net', name: '魔联科技', industry: 'AI 基础设施', subSector: 'Agent 互联网 / 智能体通信协议', location: '上海（上海魔联科技有限公司；公开融资报道）',
        description: '公开报道披露其定位为 Agent 互联网基础设施服务商，并发布 ACP 智能体通信协议。', product: 'ACP（Agent Communication Protocol）与 Agent 互联网基础设施产品（公开融资报道）。', targetCustomers: '需要跨平台、跨架构智能体通信与协作能力的开发者和企业团队。', aiApproach: '以通信协议与基础设施支持异构智能体交互和协作（公开融资报道）。', url: 'https://www.36kr.com/p/3715369024680320',
        stage: '轮次待核验（2026-03；公开融资报道）', amount: '数千万元人民币（公开融资报道）', lastFunding: '2026-03-09（公开融资报道）', bBefore: '待核验', sourceTitle: '36氪：上海魔联科技完成数千万元融资', relatedEvents: ['idc-ai-summit-2026', 'gaiec-2026']
      }),
      earlyFundingProject({
        id: 'zhizi-computing', name: '智子芯元', industry: 'AI 基础设施', subSector: 'AI for Computing / 计算优化', location: '深圳（智子芯元（深圳）科技有限责任公司；公开融资报道）',
        description: '面向国产芯片与科学、工业、金融计算等场景的 AI for Computing 团队。', product: 'KernelCAT 计算优化平台及自动化计算优化数据集 / 智能体训练基础设施（公开融资报道）。', targetCustomers: '国产芯片、科学计算、工业仿真和金融计算相关团队。', aiApproach: '运筹优化与系统架构结合，使用 AI 优化计算系统能力（公开融资报道）。', url: 'https://news.pedaily.cn/202606/565451.shtml',
        stage: '天使+轮（2026-06；公开融资报道）', amount: '数千万元人民币（公开融资报道）', lastFunding: '2026-06-23（公开融资报道）', bBefore: '是（天使+轮已披露）', sourceTitle: '投资界：智子芯元完成天使+轮融资', relatedEvents: ['ai-hangzhou-2026', 'idc-ai-summit-2026']
      }),
      earlyFundingProject({
        id: 'ace-robotics', name: '大晓机器人（ACE ROBOTICS）', industry: '具身智能', subSector: '具身世界模型 / 机器人系统', location: '国内（公开融资报道；主体所在地待核验）',
        description: '公开报道披露其面向具身智能的世界模型、机器人系统和商业化场景落地开展研发。', product: '“开悟世界模型”与相关具身智能机器人系统（公开融资报道）。', targetCustomers: '需要具身智能与机器人解决方案的产业客户。', aiApproach: '世界模型与端侧部署相关技术路线（公开融资报道）。', url: 'https://news.pedaily.cn/202606/565204.shtml',
        stage: '天使+轮（2026-06；公开融资报道）', amount: '2026 年上半年累计融资数亿美元（公开融资报道）', lastFunding: '2026-06-15（公开融资报道）', bBefore: '是（天使+轮已披露）', sourceTitle: '投资界：大晓机器人完成天使+轮融资', relatedEvents: ['wrc-2026', 'robotech-2026']
      }),
      earlyFundingProject({
        id: 'xing-su-steering', name: '星溯长空', industry: 'AI 应用', subSector: '线控转向 / 智能汽车控制', location: '国内（公开融资报道；主体所在地待核验）',
        description: '线控转向系统及全栈解决方案团队，公开报道提及 AI 智能转向控制算法与智能新能源车应用。', product: '线控转向系统与全栈解决方案（公开融资报道）。', targetCustomers: '智能新能源乘用车、商用智能物流车与相关汽车产业链客户。', aiApproach: 'AI 智能转向控制、状态监测与自适应控制（公开融资报道）。', url: 'https://news.pedaily.cn/202603/561780.shtml',
        stage: '天使轮（2026-03；公开融资报道）', amount: '数千万元人民币（公开融资报道）', lastFunding: '2026-03-17（公开融资报道）', bBefore: '是（天使轮已披露）', sourceTitle: '投资界：星溯长空完成天使轮融资', relatedEvents: ['robotech-2026', 'embodied-robot-forum-2026']
      }),
      earlyFundingProject({
        id: 'mifeng-physical-data', name: '觅蜂科技', industry: 'AI 基础设施', subSector: '物理 AI 数据服务 / 具身数据', location: '国内（公开融资报道；主体所在地待核验）',
        description: '公开报道披露其为物理 AI 数据服务平台，关注具身智能数据采集、治理和数据供给。', product: 'MEgo 系列硬件与物理 AI 数据服务平台（公开融资报道）。', targetCustomers: '具身智能机器人、模型训练和需要高质量真实数据的产业团队。', aiApproach: '真实数据采集、数据治理与物理 AI 数据基础设施（公开融资报道）。', url: 'https://news.pedaily.cn/202606/565296.shtml',
        stage: '天使+轮（2026-06；公开融资报道）', amount: '数亿元人民币（公开融资报道）', lastFunding: '2026-06-17（公开融资报道）', bBefore: '是（天使+轮已披露）', sourceTitle: '投资界：觅蜂科技完成天使+轮融资', relatedEvents: ['wrc-2026', 'robotech-2026']
      }),
      earlyFundingProject({
        id: 'baiyao-virtual-cell', name: '百曜科技', industry: 'AI for Science', subSector: 'AI 虚拟细胞 / 生命科学模型', location: '国内（公开融资报道；主体所在地待核验）',
        description: 'AI 虚拟细胞平台团队，公开报道披露其持续构建细胞行为与状态分析、预测的基础模型。', product: 'AIVC 虚拟细胞基础模型、扰动模型与数据平台（公开融资报道）。', targetCustomers: '生物医药、生命科学与需要细胞级建模能力的研发团队。', aiApproach: 'AI 虚拟细胞与生命科学数据建模（公开融资报道）。', url: 'https://www.36kr.com/p/3835460873385348',
        foundedAt: '2023 年起（公开融资报道）', stage: '新一轮融资（2026-06；轮次待核验）', amount: '数千万元人民币（公开融资报道）', lastFunding: '2026-06-05（公开融资报道）', bBefore: '待核验', earlyStageSignal: false, sourceTitle: '36氪：百曜科技完成新一轮融资', relatedEvents: ['cicai-2026', 'gaiec-2026']
      }),
      earlyFundingProject({
        id: 'qingtian-robot-leasing', name: '擎天租', industry: '具身智能', subSector: '机器人租赁 / 场景运营平台', location: '国内（公开融资报道；主体所在地待核验）',
        description: '机器人租赁与场景运营平台，公开报道披露其通过标准化履约网络和调度系统连接机器人供给和真实场景。', product: '机器人租赁、资产调度与标准化履约服务平台（公开融资报道）。', targetCustomers: '需要机器人短租、活动服务和场景化部署的客户与合作伙伴。', aiApproach: '机器人调度、数据采集回收与具身智能场景运营（公开融资报道）。', url: 'https://news.pedaily.cn/202603/561818.shtml',
        stage: '天使轮与天使+轮（2026-03；公开融资报道）', amount: '亿元级人民币（公开融资报道）', lastFunding: '2026-03-18（公开融资报道）', bBefore: '是（天使系列已披露）', sourceTitle: '投资界：擎天租完成天使轮及天使+轮融资', relatedEvents: ['wrc-2026', 'robotech-2026']
      }),
      earlyFundingProject({
        id: 'knowin-robotics', name: '诺因智能（KNOWIN）', industry: '具身智能', subSector: '家庭具身智能 / 家用人形机器人', location: '国内（公开融资报道；主体所在地待核验）',
        description: '消费级家庭具身智能团队，公开报道披露其面向家用人形机器人开展研发和量产准备。', product: '家庭具身智能与家用人形机器人相关产品（公开融资报道）。', targetCustomers: '家庭场景用户和相关渠道、服务合作方。', aiApproach: '全球通用具身大模型新架构（公开融资报道）。', url: 'https://news.pedaily.cn/202603/561445.shtml',
        foundedAt: '2025-07（公开融资报道）', stage: '天使+轮（2026-03；公开融资报道）', amount: '未披露', valuation: '投后估值超 20 亿元人民币（公开融资报道）', lastFunding: '2026-03-06（公开融资报道）', bBefore: '是（天使+轮已披露）', sourceTitle: '投资界：诺因智能完成天使+轮融资', relatedEvents: ['wrc-2026', 'ai-hangzhou-2026']
      }),
      earlyFundingProject({
        id: 'zhengxing-physical-ai', name: '正行创新', industry: '具身智能', subSector: '物理智能 / 世界动作模型', location: '北京（正行创新（北京）科技有限公司；公开融资报道）',
        description: '面向物理智能的具身智能团队，公开报道披露其用世界动作模型与强化学习探索工业、零售等真实场景。', product: '物理智能机器人产品与相关模型、基础设施（公开融资报道）。', targetCustomers: '零售、工业等需要机器人部署的产业客户。', aiApproach: '世界动作模型、强化学习与数据—模型—基础设施协同路线（公开融资报道）。', url: 'https://news.pedaily.cn/202606/565442.shtml',
        foundedAt: '2026 年初（公开融资报道）', stage: '天使轮系列（2026-06；公开融资报道）', amount: '近 1 亿美元（公开融资报道）', lastFunding: '2026-06-23（公开融资报道）', bBefore: '是（天使轮已披露）', sourceTitle: '投资界：正行创新完成近亿美元天使轮融资', founders: '姚颂（创始人兼 CEO；公开融资报道）', founderBackground: '公开报道提及深鉴科技、东方空间等连续创业经历；个人履历待公司资料核验。', relatedEvents: ['wrc-2026', 'gaiec-2026', 'robotech-2026']
      }),
      earlyFundingProject({
        id: 'meixin-food-ai', name: '美鑫智能', industry: 'AI 应用', subSector: '餐饮智能制造 / 食品自动化设备', location: '湖州（湖州美鑫智能设备有限公司；公开融资报道）',
        description: '食品智能生产线团队，公开报道披露其研发披萨自动烹饪及生产设备，并采用 AI 算法调节压面与发酵过程。', product: '披萨自动烹饪、食品智能生产线与相关设备（公开融资报道）。', targetCustomers: '餐饮连锁、食品生产和需要自动化烹饪设备的客户。', aiApproach: 'AI 算法辅助食品生产过程控制（公开融资报道）。', url: 'https://news.pedaily.cn/202607/565973.shtml',
        stage: '天使轮（2026-07；公开融资报道）', amount: '千万元人民币（公开融资报道）', lastFunding: '2026-07-08（公开融资报道）', bBefore: '是（天使轮已披露）', sourceTitle: '投资界：美鑫智能完成天使轮融资', relatedEvents: ['ai-hangzhou-2026', 'ai-show-hangzhou-2026']
      }),
      earlyFundingProject({
        id: 'dm-robotics', name: '戴盟机器人', industry: '具身智能', subSector: '视触觉感知 / 物理世界模型', location: '深圳（戴盟（深圳）机器人科技有限公司；公开融资报道）',
        description: '具身智能机器人团队，公开报道披露其以单色光视触觉技术和物理交互数据集为基础，推进物理世界模型研发。', product: '视触觉感知、物理交互数据集与机器人系统（公开融资报道）。', targetCustomers: '需要机器人感知、精细操作与物理交互能力的产业客户。', aiApproach: '视触觉感知、物理交互数据与物理世界模型（公开融资报道）。', url: 'https://news.pedaily.cn/202606/564853.shtml',
        stage: 'A 轮（2026-06；公开融资报道）', amount: '亿元人民币（公开融资报道）', lastFunding: '2026-06-04（公开融资报道）', bBefore: '是（A 轮已披露）', sourceTitle: '投资界：戴盟机器人完成亿元 A 轮融资', relatedEvents: ['wrc-2026', 'robotech-2026', 'gaie-shenzhen-2026']
      }),
      earlyFundingProject({
        id: 'crown-physical-ai', name: '日冕开物', industry: '具身智能', subSector: '物理世界基础模型 / 工业具身', location: '北京（北京日冕机器人有限公司；36氪公开报道）',
        description: '2026 年 3 月成立的具身智能世界模型团队，公开报道披露其希望以物理世界基础模型服务机器人跨场景任务执行。', product: 'LaMPA 世界模型、世界奖励模型及相关强化学习与数据闭环能力（36氪公开报道）。', targetCustomers: '工业制造与需要复杂操作机器人的产业客户；当前公开合作与交付范围待进一步核验。', aiApproach: '世界模型、世界奖励模型、强化学习与“自采 + 众包 + 模型增强”数据路线（36氪公开报道）。', url: 'https://www.36kr.com/p/3899081603483525',
        foundedAt: '2026-03（36氪公开报道）', stage: '连续两轮种子轮（2026-07；36氪公开报道）', amount: '数亿元人民币（两轮合计；36氪公开报道）', lastFunding: '2026-07-17（36氪公开报道）', bBefore: '是（种子轮已披露）',
        sourceTitle: '36氪：日冕开物完成连续两轮种子轮融资', founders: '肖中阳（创始人；36氪公开报道）', founderBackground: '公开报道提及团队具有清华自动驾驶、蔚来和华为智驾世界模型研发与交付经历；个人履历需以公司资料复核。',
        fullDescription: '36氪公开报道披露，北京日冕机器人有限公司于 2026 年 3 月成立，近期完成连续两轮种子轮融资。团队以物理世界基础模型和强化学习为技术主线，并计划从服务器制造高精度装配场景开始验证。该记录只保留原报道可见信息，不将合作、交付或融资描述自动等同于已审计事实。',
        commercial: '报道提及与远图未来达成战略合作并计划进入服务器制造高精度装配场景；试点范围、合同、收入与跨产线部署效果需由公司、客户或投资方材料核验。', competitors: '具身世界模型、机器人强化学习与工业机器人软件方案；需比较数据来源、场景泛化、工程集成成本与真实部署成功率。',
        why: ['成立仅数月即披露连续种子融资，且切入工业高精度装配这一可验证的具身场景。', '世界模型、数据闭环和强化学习之间的技术假设可转化为明确的产品与交付核验问题。'],
        uncertainties: ['融资条款、公司主体信息、团队完整构成及战略合作实际范围需要交叉验证。', '模型在真实工业现场的成功率、稳定性、数据成本和客户付费方式尚无独立证据。'],
        verifyQuestions: ['服务器制造场景的首个可验证工位、成功率和部署周期分别是什么？', '世界模型、世界奖励模型与强化学习在新场景迁移中各自贡献如何衡量？', '数据采集、标注、仿真与真实现场数据的单位成本及可持续性如何？'], relatedEvents: ['wrc-2026', 'waic-2026', 'gaiec-2026']
      }),
      earlyFundingProject({
        id: 'coolqq-cookiepi', name: '酷奇奇科技（CookiePi）', industry: 'AI 应用', subSector: 'AI 角色硬件 / 情感交互', location: '国内（公开融资报道；具体主体注册地待核验）',
        description: 'AI 角色硬件团队，公开报道披露其以 CookiePi 角色互动伙伴探索分布式、多端的主动式交互体验。', product: 'CookiePi 角色互动伙伴：多个 AI 互动伙伴嵌入家居场景，支持对话与角色化互动（36氪公开报道）。', targetCustomers: '关注陪伴、家庭交互与 AI 角色体验的个人和家庭用户；实际目标客群、定价和渠道待核验。', aiApproach: '角色交互与多端协同能力以公开产品描述为线索；模型、语音、端侧和隐私技术路线待公司材料确认。', url: 'https://www.36kr.com/p/3898370289846153',
        foundedAt: '2025（36氪公开报道）', stage: '种子轮（2026-07；36氪公开报道）', amount: '数千万元人民币（36氪公开报道）', lastFunding: '2026-07-17（36氪公开报道）', bBefore: '是（种子轮已披露）',
        sourceTitle: '36氪：酷奇奇科技完成数千万元种子轮融资', founders: '徐驰恒（公开报道提及；个人履历待公司资料核验）', founderBackground: '公开报道提及创始人曾为商汤早期员工；完整履历及团队构成需以公司公开资料核验。',
        fullDescription: '36氪公开报道披露，AI 角色硬件公司酷奇奇科技完成数千万元种子轮融资，核心产品为 CookiePi 角色互动伙伴。本记录将其纳入早期消费级 AI 产品发现池，保留融资报道的证据边界；产品可用性、用户留存与公司主体信息均待进一步验证。',
        commercial: '报道描述的是家庭分布式角色互动产品；量产进度、价格、复购/订阅、渠道与用户留存均未由当前来源独立验证。', competitors: 'AI 陪伴硬件、智能音箱、角色聊天产品和家庭机器人；需比较主动交互价值、硬件成本、隐私边界与长期留存。',
        why: ['种子轮阶段且产品形态明确，可作为国内消费级 AI 硬件与角色交互的早期样本。', '“多端角色互动”能围绕用户留存、场景频率、硬件成本和安全边界形成具体核验。'],
        uncertainties: ['公司主体、完整团队、产品上市状态与融资条款未在当前来源完整披露。', '角色化互动的长期留存、儿童/家庭安全及隐私处理能力尚待验证。'],
        verifyQuestions: ['CookiePi 是否已面向真实用户交付，核心使用场景、价格与留存表现如何？', '硬件、模型调用和内容运营的单位经济模型是否能支撑规模化？', '家庭场景的隐私、未成年人保护和内容安全机制如何落地？'], relatedEvents: ['waic-2026', 'ai-show-hangzhou-2026', 'gaiec-2026']
      }),
      earlyFundingProject({
        id: 'bxi-robotics', name: '半醒具身（BXI Robotics）', industry: '具身智能', subSector: '人形机器人 ODM / 本体方案', location: '国内（公开融资报道；公司主体与总部待核验）',
        description: '人形机器人 ODM 方案团队，公开报道披露其围绕量产人形机器人本体与相关交付方案进行研发。', product: '“精灵”系列人形机器人及 ODM 方案（36氪公开报道）；具体型号、量产状态与交付边界待核验。', targetCustomers: '需要人形机器人本体、ODM 或定制化方案的机器人产业客户与合作方。', aiApproach: '具身智能算法与机器人系统能力以公开报道为线索；模型、控制与数据体系需以公司材料进一步确认。', url: 'https://www.36kr.com/p/3899057634363266',
        foundedAt: '2022（36氪公开报道；待主体登记复核）', stage: '新一轮融资（2026-07；公开报道未披露轮次）', amount: '千万元级人民币（36氪公开报道）', lastFunding: '2026-07-17（36氪公开报道）', bBefore: '待核验（当前报道未披露轮次）', earlyStageSignal: false,
        sourceTitle: '36氪：半醒具身获千万元级新一轮融资', founders: '未知（当前公开报道未完整披露）', founderBackground: '未知（需以公司或投资方材料核验）。',
        fullDescription: '36氪公开报道披露，人形机器人 ODM 方案商半醒具身近期完成千万元级新一轮融资，并提及其此前于 2025 年完成首轮机构融资。该项目进入正式信息池是为了扩大机器人本体与供应链观察范围；当前不把融资轮次、产品量产或商业交付自动补成已确认事实。',
        commercial: '公开报道提及量产版本参与机器人赛事；客户、订单、单机成本、售后与实际交付数量均待人工核验。', competitors: '人形机器人本体、ODM、关节与系统集成方案；需比较量产一致性、可靠性、软硬件适配与交付效率。',
        why: ['公开融资和可见产品样机为机器人 ODM 方向提供了可追溯的观察入口。', '本体量产、ODM 交付和客户定制之间的边界适合形成高价值的尽调问题。'],
        uncertainties: ['公司主体、完整团队、融资轮次和客户结构未由当前来源完整确认。', '赛事表现不等于工业或服务场景中的稳定性、可维护性和商业价值。'],
        verifyQuestions: ['当前 ODM 客户、量产节奏与实际交付数量能否由客户或公司材料佐证？', '精灵系列在可靠性、成本和维护要求上与同类本体的差异是什么？', '公司收入来自本体销售、ODM 项目还是后续软件/服务，毛利与现金流表现如何？'], relatedEvents: ['wrc-2026', 'waic-2026', 'ai-show-hangzhou-2026']
      }),
      earlyFundingProject({
        id: 'lingqiao-intelligence', name: '灵巧智能', industry: '具身智能', subSector: '灵巧操作 / 具身智能系统', location: '上海（上海人工智能研究院孵化；公开报道）',
        description: '聚焦灵巧操作技术研发与产业化的具身智能团队，公开报道披露其已形成灵巧手、数据采集与操作系统等产品线。', product: 'DexHand021 系列三指/五指灵巧手、DexCap 数据采集系统与自研灵巧操作系统（上海证券报公开报道）。', targetCustomers: '教育、电力、工业及其他需要机器人精细操作能力的产业客户。', aiApproach: '围绕硬件、感知、数据、模型和场景构建灵巧操作系统；具体性能与部署效果以公司后续材料为准。', url: 'https://finance.sina.com.cn/roll/2026-07-15/doc-inihxaeu7932923.shtml',
        foundedAt: '未知（上海人工智能研究院孵化；主体成立时间待核验）', stage: 'A 轮（2026-07；公开报道）', amount: '数亿元人民币（公开报道）', lastFunding: '2026-07-15（公开报道）', bBefore: '是（A 轮已披露）',
        sourceTitle: '上海证券报：灵巧智能完成数亿元 A 轮融资', sourceType: '公开融资报道', founders: '许春山（创始人、董事长；公开报道）', founderBackground: '公开报道提及其为公司创始人、董事长；完整从业背景待公司资料核验。',
        fullDescription: '上海证券报公开报道披露，灵巧智能近日完成数亿元 A 轮融资，且 2026 年内已完成天使轮、A 轮两轮股权融资。公司由上海人工智能研究院重点培育孵化，报道列出灵巧手、数据采集系统和教育/电力/工业等优先行业。融资、量产和客户进展仍需以公司、投资方或客户材料复核。',
        commercial: '报道提及量产产品、与上海电气的产业合资合作及工业具身方向；合同、收入、交付数量与客户效果未由当前来源独立审计。', competitors: '灵巧手、具身操作系统、机器人数据采集和工业自动化方案；需比较可靠性、成本、操作成功率与行业复用能力。',
        why: ['A 轮、明确产品线和产业合作同时出现，适合从“技术产品化—场景交付”链路评估。', '灵巧操作是具身智能从展示走向可执行任务的核心瓶颈之一，具有明确的验证变量。'],
        uncertainties: ['公司主体成立时间、估值、完整融资条款与客户名单未在当前来源完整披露。', '量产、场景规模化落地和与产业平台合作的实际进展需要交叉验证。'],
        verifyQuestions: ['DexHand 与 DexCap 的可验证性能、价格、产能和维护成本分别是什么？', '教育、电力、工业三类场景中，哪一类已经完成可复核的付费交付？', '上海电气合作涉及哪些产品、订单或联合开发安排，收入确认方式是什么？'], relatedEvents: ['wrc-2026', 'waic-2026', 'gaiec-2026']
      }),
      earlyFundingProject({
        id: 'newqi-robotics', name: '新奇机器人', industry: '具身智能', subSector: '机器人核心执行部件 / 关节模组', location: '国内（公开融资报道；主体所在地待核验）',
        description: '人形机器人核心执行部件研发制造团队，公开报道披露其专注高精度直线驱动及多类核心关节模组。', product: '谐波关节模组、旋转行星驱动模组及直线关节模组（科创板日报公开报道）。', targetCustomers: '人形机器人本体厂商、核心零部件集成商与需要高精度执行部件的产业客户。', aiApproach: '项目以机器人核心硬件为主；其与具身模型、控制系统的协同方式待以公司技术材料确认。', url: 'https://finance.eastmoney.com/a/202607133804179124.html',
        foundedAt: '2025（科创板日报公开报道）', stage: 'A+ 轮（2026-07；公开报道）', amount: '未知（当前来源未披露）', lastFunding: '2026-07-13（公开报道）', bBefore: '是（A+ 轮已披露）',
        sourceTitle: '科创板日报：新奇机器人完成 A+ 轮融资', sourceType: '公开融资报道', founders: '未知（当前公开报道未完整披露）', founderBackground: '未知（需以公司或投资方材料核验）。',
        fullDescription: '科创板日报公开报道披露，新奇机器人于 2025 年成立，近日完成 A+ 轮融资。公司专注人形机器人核心执行部件研发制造，本轮资金计划用于谐波关节模组量产交付和新一代直线关节模组研发。项目被纳入早期硬件机会池，但主体、客户与量产进度仍需人工复核。',
        commercial: '公开报道明确资金用途涉及量产交付；实际客户、产能、良率、单价与回款周期尚未在当前来源确认。', competitors: '机器人关节、电机、减速器、直线驱动与模组厂商；需比较性能指标、供应链、成本曲线和客户认证周期。',
        why: ['成立时间较短且已进入 A+ 轮，直接切入人形机器人规模化的关键执行部件。', '产能、良率、成本和客户认证均可形成硬件项目的可验证研究路径。'],
        uncertainties: ['公司主体所在地、完整团队、融资金额与估值未披露。', '“量产交付”尚未对应可独立核验的客户、数量或收入。'],
        verifyQuestions: ['当前已完成客户认证的模组型号、性能指标和实际交付数量是多少？', '谐波、旋转行星与直线关节模组的成本、良率和供应链瓶颈是什么？', '机器人本体客户的认证周期、复购率与回款结构如何？'], relatedEvents: ['wrc-2026', 'waic-2026', 'ai-show-hangzhou-2026']
      }),
      earlyFundingProject({
        id: 'brainrock-embodied', name: '具脑磐石', industry: '具身智能', subSector: '类脑智能 / 认知世界模型', location: '国内（公开报道；主体所在地待核验）',
        description: '具身智能大脑团队，公开报道披露其尝试用脑认知启发的路径改进具身智能 VLA 与世界模型能力。', product: '认知世界模型及面向具身机器人的“大脑”算法与工程化系统（36氪公开报道）。', targetCustomers: '汽车零部件、智能制造及需要具身机器人解决方案的产业合作方；具体客户与产品形态待核验。', aiApproach: '以脑认知启发的神经 AI、认知世界模型和具身 VLA 为公开技术线索，需以公司技术材料验证。', url: 'https://www.36kr.com/p/3819931562414467',
        foundedAt: '2025-10（36氪公开报道）', stage: '新一轮融资（2026-05；公开报道未披露轮次）', amount: '亿元级人民币（36氪公开报道）', lastFunding: '2026-05-25（36氪公开报道）', bBefore: '待核验（当前报道未披露轮次）',
        sourceTitle: '36氪：具脑磐石完成新一轮亿元级融资', founders: '朱森华（创始人；36氪公开报道）', founderBackground: '公开报道提及其曾负责华为云 AI 算法创新 Lab 与具身相关项目；个人履历和具体任职需以公司资料复核。',
        fullDescription: '36氪公开报道披露，具脑磐石于 2025 年启动，近期完成亿元级新一轮融资，资金将用于认知世界模型研发、工程化和真实场景验证。项目以类脑认知路径切入具身机器人“大脑”，技术新颖性高，但模型效果、数据需求与商业化边界均需要严格的证据核验。',
        commercial: '公开报道提及真实场景验证与产业合作线索；客户合同、部署数量、收入、模型指标及实际单位经济仍需公司、客户或投资方材料交叉验证。', competitors: '具身 VLA、世界模型、机器人操作系统与类脑智能方案；需比较数据效率、泛化、可解释性、部署成本和真实作业稳定性。',
        why: ['成立时间较短，且技术路线对具身智能“数据与泛化”瓶颈提出了差异化假设。', '近期融资与真实场景验证计划使其具备可追溯的后续研究节点。'],
        uncertainties: ['融资轮次、公司主体、完整团队与真实产业合作范围未由当前来源完整确认。', '脑认知启发路线是否带来可复现的数据效率或泛化提升，尚无独立对照证据。'],
        verifyQuestions: ['认知世界模型相对端到端 VLA 的可复核指标和数据效率差异是什么？', '首批真实场景验证的任务、成功率、部署周期和客户反馈如何记录？', '模型、传感器、控制与安全约束在工程化交付中如何分工，成本结构如何？'], relatedEvents: ['wrc-2026', 'waic-2026', 'gaiec-2026']
      }),
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
      earlyFundingProject({
        id: 'wujie-dynamics', name: '无界动力', industry: '具身智能', subSector: '通用具身大脑 / 世界模型', location: '北京（公开融资报道）',
        description: '公开报道披露其面向工业制造和商业服务场景研发具身通用大脑与世界模型。', product: 'MWA™ 具身通用大脑及相关机器人系统（以公开报道为准）。', targetCustomers: '工业制造、商业服务与需要通用操作机器人的产业客户。', aiApproach: '隐空间世界模型与强化学习路径（公开融资报道）。', url: 'https://news.pedaily.cn/202606/565576.shtml',
        stage: '天使轮（2026-06；公开融资报道）', amount: '超 2 亿美元（公开融资报道）', lastFunding: '2026-06-26（公开融资报道）', bBefore: '是（天使轮已披露）',
        sourceTitle: '投资界：无界动力完成超 2 亿美元天使轮融资', founders: '未知（当前来源未完整披露）', founderBackground: '未知（待公司或投资方材料核验）。',
        why: ['天使轮阶段即披露世界模型与真实场景交付方向，适合核验“大额融资—产品能力—订单”是否一致。', '具身通用大脑的跨场景泛化、数据闭环与交付节奏可形成具体尽调问题。'], relatedEvents: ['wrc-2026', 'waic-2026', 'embodied-robot-commercialization']
      }),
      earlyFundingProject({
        id: 'cas-yukun', name: '中科煜坤', industry: '具身智能', subSector: '时空智能 / 机器人世界模型', location: '北京（公开融资报道）',
        description: '中科院自动化所孵化的时空智能创业团队，面向机器人与复杂物理场景。', product: '多模态通用时空智能基础模型及“感知—理解—预测—决策”技术体系。', targetCustomers: '机器人、智能设备与复杂物理场景的产品和产业团队。', aiApproach: '多模态推理、三维计算机视觉、世界模型与行动模型（公开融资报道）。', url: 'https://news.pedaily.cn/202606/565681.shtml',
        foundedAt: '未知（高校 / 研究机构孵化，主体成立时间待核验）', stage: '种子轮（2026-06；公开融资报道）', amount: '千万元级人民币（公开融资报道）', lastFunding: '2026-06-30（公开融资报道）', bBefore: '是（种子轮已披露）',
        sourceTitle: '投资界：中科煜坤完成千万元级种子轮融资', founders: '吴毅红（创立；公开融资报道）', founderBackground: '中国科学院自动化研究所研究员、机器人视觉团队负责人（公开融资报道）。',
        why: ['科研转化、种子融资与明确的机器人时空智能产品方向同时出现。', '数据来源、端侧协同和从研究成果到客户交付的路径需要早期验证。'], relatedEvents: ['wrc-2026', 'waic-2026', 'ceai-2026']
      }),
      earlyFundingProject({
        id: 'neowa-robotics', name: '纽娲机器人（NeoWa Robotics）', industry: '具身智能', subSector: '世界通行模型 / 机器人导航', location: '国内（公开融资报道；具体主体待核验）',
        description: '公开报道披露其为不同机器人本体提供真实环境中的自主移动、导航与交互能力。', product: '世界通行模型（WTM）、SimWeaver 物理仿真器与相关具行智能系统。', targetCustomers: '物流、园区、文旅及需要机器人自主通行能力的产业客户。', aiApproach: '显式三维与物理规律驱动的世界模型、仿真数据和机器人导航闭环（公开融资报道）。', url: 'https://news.pedaily.cn/202606/565682.shtml',
        stage: '天使轮（2026-06；公开融资报道）', amount: '5,000 万元人民币（公开融资报道）', lastFunding: '2026-06-30（公开融资报道）', bBefore: '是（种子轮与天使轮已披露）',
        sourceTitle: '投资界：纽娲机器人完成 5,000 万元天使轮融资', founders: '杨睿刚（创始人；公开融资报道）', founderBackground: '公开报道提及百度 Apollo 与嬴彻科技经历；个人履历待公司资料复核。',
        why: ['三个月内连续完成种子和天使融资，且聚焦机器人“到达与通行”这一具体问题。', '仿真数据、无图导航和真实部署之间能形成可验证的技术与商业闭环。'], relatedEvents: ['wrc-2026', 'embodied-robot-commercialization', 'waic-2026']
      }),
      earlyFundingProject({
        id: 'shunheng-intelligence', name: '瞬恒智能', industry: '具身智能', subSector: '灵巧操作 / 视触觉感知', location: '国内（公开融资报道；主体待核验）',
        description: '聚焦机器人灵巧精细操作、多模态感知与数据闭环的早期具身智能团队。', product: '具身智能“小脑”模型、视触觉感知与灵巧操作相关技术。', targetCustomers: '需要机器人精细操作能力的制造、服务与机器人本体合作方。', aiApproach: '灵巧操作算法、多模态感知、触觉与数据平台（公开融资报道）。', url: 'https://news.pedaily.cn/202603/561592.shtml',
        stage: '天使轮、天使+轮、天使++轮（2026-03；公开融资报道）', amount: '未知（当前来源未披露具体总额）', lastFunding: '2026-03-11（公开融资报道）', bBefore: '是（天使系列融资已披露）',
        sourceTitle: '投资界：瞬恒智能连续完成三轮早期融资',
        why: ['连续早期融资与灵巧操作方向形成高新颖性信号，但不应将融资节奏替代技术或交付验证。', '可从触觉数据、成功率、场景迁移和客户试点四方面建立核验清单。'], relatedEvents: ['wrc-2026', 'embodied-robot-commercialization', 'ceai-2026']
      }),
      earlyFundingProject({
        id: 'chengwu-robotics', name: '乘物机器人', industry: '具身智能', subSector: '工业具身智能 / 垂类 VLA', location: '深圳（36氪公开报道）',
        description: '工业具身智能技术与产品解决方案团队，公开报道披露其已有工业场景落地。', product: '工业场景软硬件、数据采集、模型训练、场景部署与维护，以及垂类 VLA 研发。', targetCustomers: '制造业与需要工业机器人解决方案的客户。', aiApproach: '空间感知、强化学习、世界模型与工业垂类 VLA（36氪公开报道）。', url: 'https://36kr.com/p/3831135917107075',
        foundedAt: '2025 年（36氪公开报道）', stage: '天使轮（2026-05；36氪公开报道）', amount: '未披露', lastFunding: '2026-05-30（36氪公开报道）', bBefore: '是（天使轮已披露）',
        sourceTitle: '36氪：乘物机器人完成天使轮融资', founders: '黄金龙、单玉虎（36氪公开报道）', founderBackground: '公开报道提及机器人全栈研发与产业化背景；需以公司资料核验。',
        why: ['成立时间较短、已披露天使融资和工业落地线索，适合验证产品化速度。', '应重点区分项目制集成收入与可复制的模型 / 产品能力。'], relatedEvents: ['wrc-2026', 'embodied-robot-commercialization', 'waic-2026']
      }),
      earlyFundingProject({
        id: 'lexiang-technology', name: '乐享科技（元点 Zeroth）', industry: '具身智能', subSector: '家庭具身智能 / 机器人', location: '苏州（公开融资报道）',
        description: '家庭具身智能团队，公开报道披露其发布“元点 Zeroth”品牌并完成 Pre-A 融资。', product: '家庭协作、陪伴与大人形等具身智能机器人产品线（以公开报道为准）。', targetCustomers: '家庭场景用户与相关渠道、服务合作方。', aiApproach: '具身通用模型、VLA、关节模组与机械臂等全栈技术方向（公开融资报道）。', url: 'https://news.pedaily.cn/202607/565774.shtml',
        foundedAt: '约 2025 年初（“成立仅一年半”公开报道；待主体核验）', stage: 'Pre-A 轮（2026-07；公开融资报道）', amount: '近 5 亿元人民币（公开融资报道）', lastFunding: '2026-07-02（公开融资报道）', bBefore: '是（Pre-A 已披露）',
        sourceTitle: '投资界：乐享科技完成近 5 亿元 Pre-A 轮融资',
        why: ['家庭具身智能有明确产品形态与快速融资节奏，但也需要更严格区分预售、订单和规模化交付。', '可围绕消费场景成本、可靠性、售后和真实留存设计验证问题。'], relatedEvents: ['wrc-2026', 'waic-2026', 'embodied-robot-commercialization']
      }),
      earlyFundingProject({
        id: 'physis-ai', name: '逆矩阵（Physis）', industry: 'AI 基础设施', subSector: '物理 AI / 通用世界基座模型', location: '北京（公开融资报道）',
        description: '面向工业、具身智能、物理仿真与科学预测场景的通用世界基座模型团队。', product: '通用世界基座模型与面向物理 AI 场景的底层认知引擎。', targetCustomers: '工业、机器人、物理仿真与科学计算相关团队。', aiApproach: '通用世界模型、物理规律理解与跨场景预测（公开融资报道）。', url: 'https://news.pedaily.cn/202606/565318.shtml',
        stage: '种子++轮（2026-06；公开融资报道）', amount: '超 1 亿美元（公开融资报道）', lastFunding: '2026-06-17（公开融资报道）', bBefore: '是（种子++轮已披露）',
        sourceTitle: '投资界：逆矩阵完成超亿美元种子++轮融资',
        why: ['种子阶段即押注通用世界模型，具备高技术不确定性和高核验价值。', '应验证数据闭环、模型评测、具体场景部署与资本密集度之间的关系。'], relatedEvents: ['waic-2026', 'waic-academic-2026', 'wrc-2026']
      }),
      earlyFundingProject({
        id: 'xingyuan-zhi', name: '星源智', industry: '具身智能', subSector: '具身大脑 / 交互世界模型', location: '国内（北京智源研究院孵化；主体待核验）',
        description: '智源研究院孵化的具身大脑团队，公开报道提及成立十个月后完成多轮融资。', product: '具身交互世界模型与具身大脑相关能力（公开报道）。', targetCustomers: '机器人本体、具身智能与产业场景合作方。', aiApproach: '具身交互世界模型与产业化应用（公开融资报道）。', url: 'https://news.pedaily.cn/202606/564798.shtml',
        foundedAt: '约 2025-08（“成立十个月”公开报道推算；待主体登记核验）', stage: '新一轮融资（2026-06；轮次待核验）', amount: '累计约 10 亿元人民币（公开报道）', lastFunding: '2026-06-03（公开报道）', bBefore: '待核验',
        sourceTitle: '投资界：星源智成立十个月融资 10 亿',
        why: ['成立时间较短、研究机构孵化与具身大脑主题叠加，适合纳入高优先级研究队列。', '需特别核验主体、融资轮次、技术独立性与真实场景商业化，而不是只看资金规模。'], relatedEvents: ['waic-2026', 'wrc-2026', 'baai-2026']
      }),
      earlyFundingProject({
        id: 'beta-infinity', name: '贝塔无限（Beta Infinity）', industry: '具身智能', subSector: '消费级具身智能 / 物理 Agent', location: '国内（公开融资报道；主体待核验）',
        description: '消费级通用具身智能团队，公开报道披露其自 2026 年 3 月开始运营。', product: '消费级具身智能物理 Agent 与终端产品。', targetCustomers: '消费级机器人用户与相关渠道、生态合作方。', aiApproach: '通用具身智能与物理 Agent（公开融资报道）。', url: 'https://news.pedaily.cn/202605/564100.shtml',
        foundedAt: '2026-03（公开融资报道：开始运营）', stage: '种子 / 种子+轮（2026-05；公开融资报道）', amount: '数亿元人民币（公开融资报道）', lastFunding: '2026-05-20（公开融资报道）', bBefore: '是（种子系列已披露）',
        sourceTitle: '投资界：贝塔无限连续完成种子轮、种子+轮融资',
        why: ['运营时间很短且已披露种子系列融资，是“刚出现的团队”典型发现对象。', '消费级具身智能需要用产品可靠性、成本、渠道和复购等硬指标交叉验证。'], relatedEvents: ['wrc-2026', 'waic-2026', 'embodied-robot-commercialization']
      }),
      earlyFundingProject({
        id: 'fuan-intelligence', name: '复鞍智能', industry: 'AI for Science', subSector: '材料 AI / 科研智能体', location: '上海（公开融资报道）',
        description: '复旦科创孵化的 AI for Science 团队，聚焦材料研发与高质量数据集、算法创新。', product: '面向材料研发的 AI 数据、算法与科研智能化能力（公开融资报道）。', targetCustomers: '材料研发、检测与需要缩短研发周期的产业客户。', aiApproach: 'AI for Science、数据集与材料研发算法（公开融资报道）。', url: 'https://news.pedaily.cn/202605/563872.shtml',
        stage: '种子轮（2026-05；公开融资报道）', amount: '数千万元人民币（公开融资报道）', lastFunding: '2026-05-14（公开融资报道）', bBefore: '是（种子轮已披露）',
        sourceTitle: '投资界：复鞍智能完成种子轮融资',
        why: ['高校孵化、材料 AI 与种子融资三类早期信号同时出现。', '需要验证数据闭环、实验验证、客户导入周期与科研服务产品化边界。'], relatedEvents: ['waic-2026', 'cicai-2026', 'gdec-2026']
      }),
      earlyFundingProject({
        id: 'zhuizhi-engineering', name: '追知工科', industry: 'AI 应用', subSector: '垂域工业智能体 / 工艺机器人', location: '上海（36氪公开报道）',
        description: '上海交大成果转化与上海人工智能研究院战略孵化的工业智能体团队。', product: 'WOLIF Industrial Agent、工业大脑与工艺小脑控制体系。', targetCustomers: '航空、新能源、汽车、3C 与其他高精度制造场景客户。', aiApproach: '材料机理、传感、工业控制和智能体闭环结合（36氪公开报道）。', url: 'https://36kr.com/p/3896298534520705',
        foundedAt: '2024-02（36氪公开报道）', stage: '种子轮（2026-07；36氪公开报道）', amount: '数千万元人民币（36氪公开报道）', lastFunding: '2026-07-15（36氪公开报道）', bBefore: '是（种子轮已披露）',
        sourceTitle: '36氪：追知工科获数千万元种子轮融资', founders: '袁琳（创始人；36氪公开报道）', founderBackground: '公开报道提及非夕科技、ABB 中国等经历；需以本人或公司资料核验。',
        why: ['工业智能体选择打磨、焊接等明确工艺切口，适合从首单、订单和交付复制性验证。', '能展示“模型能力”如何转化为制造业工艺控制与持续数据闭环。'], relatedEvents: ['waic-2026', 'wrc-2026', 'enterprise-ai-collab']
      }),
      earlyFundingProject({
        id: 'quantum-leap', name: '幻码跃迁', industry: 'AI 基础设施', subSector: '量子计算 × AI / 量子软件', location: '上海（36氪公开报道）',
        description: '聚焦量子计算与 AI 融合的系统级软件和应用解决方案团队。', product: '量子计算软件栈、算法应用与 AI 驱动研发工具 / 智能体平台。', targetCustomers: '量子硬件厂商、开发者与金融、材料、生物医药等产业研发团队。', aiApproach: '量子软件栈、量子 AI、AI 驱动算法与编译优化（36氪公开报道）。', url: 'https://36kr.com/p/3894898001181572',
        stage: '种子轮（2026-07；36氪公开报道）', amount: '数千万元人民币（36氪公开报道）', lastFunding: '2026-07-14（36氪公开报道）', bBefore: '是（种子轮已披露）',
        sourceTitle: '36氪：幻码跃迁完成数千万元种子轮融资', founders: '幺宏顺（CEO；36氪公开报道）', founderBackground: '公开报道提及百度量子计算研究所等经历；个人履历待公司资料复核。',
        why: ['种子融资与“量子 × AI”基础设施主题为前沿技术筛选提供了清晰样本。', '可围绕量子硬件兼容性、产品可用性、客户场景和技术路线成熟度进行核验。'], relatedEvents: ['waic-2026', 'waic-academic-2026', 'cicai-2026']
      }),
      earlyFundingProject({
        id: 'roboparty', name: 'RoboParty（萝博派对）', industry: '具身智能', subSector: '开源人形机器人 / 全栈平台', location: '国内（公开融资报道；主体待核验）',
        description: '开源具身全栈平台，公开报道披露其具备人形机器人本体、控制、SDK 与开发者生态方向。', product: 'Open Body、Party OS、开源双足人形机器人与相关开发工具。', targetCustomers: '机器人开发者、研究实验室、模型团队与制造、能源等产业客户。', aiApproach: '运动控制、强化学习、VLA、世界模型与 Agent + Skills 架构（36氪公开报道）。', url: 'https://36kr.com/p/3896298378331264',
        foundedAt: '约 2025 年（“成立一年多”公开报道；待主体登记核验）', stage: '天使++轮与 Pre-A 轮（2026-07；36氪公开报道）', amount: '近 5 亿元人民币（36氪公开报道）', lastFunding: '2026-07-15（36氪公开报道）', bBefore: '是（Pre-A 已披露）',
        sourceTitle: '36氪：RoboParty 完成天使++轮和 Pre-A 轮融资',
        why: ['成立时间较短且同时强调开源、本体、控制和开发者生态，技术与商业假设边界鲜明。', '应重点验证量产一致性、开源生态活跃度、数据闭环和产业订单。'], relatedEvents: ['wrc-2026', 'waic-2026', 'embodied-robot-commercialization']
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
        id: 'wrc-2026', name: '2026 世界机器人大会（WRC）', date: '2026-08-19 — 2026-08-23', isoStart: '2026-08-19', location: '北京亦庄北人亦创国际会展中心', organizer: '世界机器人大会组委会（以官方 / 北京市公开信息为准）', type: '机器人产业大会', theme: '机器人、具身智能、产业应用与开发者生态', sourceTitle: '北京市政府：2026 世界机器人大会信息', sourceType: '政府信息页', url: 'https://www.beijing.gov.cn/ywdt/gzdt/202607/t20260708_4752981.html',
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
      }),
      event({
        id: 'gaiec-2026', name: '2026 全球人工智能经济大会（GAIEC）', date: '2026-08-26 — 2026-08-29', isoStart: '2026-08-26', location: '北京首都国际会展中心', organizer: 'GAIEC（以官方页为准）', type: 'AI 产业与创业大会', theme: '人工智能、全球经济、产业应用与创业项目', sourceTitle: 'GAIEC 2026 官方页', sourceType: '官方页', url: 'https://giec.org.cn/zh/',
        speakers: ['官方页列出 200+ 位演讲嘉宾；以报名页和当前议程为准。'], speakerQuality: '官方页列出 Andrew Ng、李开复、Yann LeCun、李飞飞等拟邀/展示嘉宾；实际出席以当前日程核验。', audience: '官方页描述为 5,000+ 全球领袖、创新者、政策制定者与 AI 产业参与者。', investorValue: '与 HICOOL 全球创业者峰会同期，适合结合创业路演、展商、产业论坛和交流环节建立后续核验清单。',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 5, format: 5, investor: 5, discovery: 5, source: 5, urgency: 5 },
        qualityReason: '官方页明确列出创业路演、行业演讲、展商和社交网络活动，且与 HICOOL 同期；适合发现早期团队，但仍需以具体参展商和议程确认。', relatedProjects: ['crown-physical-ai', 'brainrock-embodied', 'lingqiao-intelligence'], attendeesToWatch: ['创业路演和 HICOOL 同期活动中的早期 AI 团队。', '具身智能、AI 基础设施和产业应用方向的展商与演讲嘉宾。']
      }),
      event({
        id: 'ai-show-hangzhou-2026', name: 'AI Show Hangzhou 2026 杭州国际人工智能应用与机器人创新博览会', date: '2026-09-10 — 2026-09-12', isoStart: '2026-09-10', location: '杭州国际博览中心', organizer: '以 AI Show Hangzhou 官方当前页为准', type: 'AI 与机器人产业展会', theme: '人工智能应用、机器人、具身智能与产业场景', sourceTitle: 'AI Show Hangzhou 2026 官方页', sourceType: '官方展会页', url: 'https://www.ai-ex.net/',
        speakers: ['论坛、配套活动和嘉宾名单以官方当前页为准。'], speakerQuality: '官方页已披露展会与配套活动规模，具体嘉宾与企业名单需在会前核验。', audience: 'AI 与机器人企业、产业客户、开发者、研究者与潜在合作方；官方页计划 200+ 参展品牌。', investorValue: '展会形态适合基于展商、论坛和配套活动形成国内 AI/机器人项目池，优先确认早期团队和闭门/路演机制。',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 3, format: 5, investor: 4, discovery: 5, source: 4, urgency: 4 },
        qualityReason: '官方页披露 200+ 参展品牌和 10+ 配套活动，AI 应用与机器人主题明确；嘉宾及项目路演安排仍需会前按官方日程核验。', relatedProjects: ['coolqq-cookiepi', 'bxi-robotics', 'newqi-robotics'], attendeesToWatch: ['机器人与具身智能展商、产品演示和产业采购对接团队。', 'AI 应用、端侧产品和场景化解决方案的早期团队。']
      }),
      event({
        id: 'gaie-shenzhen-2026', name: '2026 全球人工智能终端展暨第七届深圳国际人工智能展览会（GAIE）', date: '2026-05-14 — 2026-05-16（已结束）', isoStart: '2026-05-14', location: '深圳会展中心（福田）1 号馆', organizer: '深圳市人工智能行业协会、深圳会展中心（官方页披露）', type: 'AI 终端与产业展会', theme: 'AI 终端、具身智能、智能体与产业应用', sourceTitle: 'GAIE 2026 官方展会信息', sourceType: '官方展会页', url: 'https://gaie.com.cn/newsCenter/exhibitionNewsDetail/fbd4de8958284ea68b1c3da3a40a8e33',
        speakers: ['人工智能国际合作高峰论坛、具身智能生态大会、投融资对接会等议程；以官方回顾为准。'], speakerQuality: '专题论坛和产业活动由官方活动页列出；单场嘉宾名单需按原议程核验。', audience: 'AI 终端企业、产业方、投资机构、开发者与政府/园区生态参与者。', investorValue: '官方活动页包括“AI 引领·资本赋能”投融资对接会，适合复盘参展企业、项目对接与产业合作信号。',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 3, format: 5, investor: 5, discovery: 5, source: 5, urgency: 1 },
        qualityReason: '已结束活动，但官方页披露了 AI 终端展区、具身智能生态大会与投融资对接会，适合做历史项目和产业合作线索回溯。', relatedProjects: ['coolqq-cookiepi', 'newqi-robotics', 'brainrock-embodied'], attendeesToWatch: ['参展商目录、投融资对接会名单和具身智能生态大会的公开资料。']
      }),
      event({
        id: 'shenzhen-bci-challenge-2026', name: '2026 AI 脑机接口全球挑战赛暨优脑聚创加速计划', date: '2026-06-16 — 2026-09-12（全球征集、挑战赛与加速期；以官方赛程为准）', isoStart: '2026-06-16', location: '深圳市脑科学技术产业创新中心及线上赛程', organizer: '中国神经科学学会科技转化与创新工作委员会、深圳市脑科学学会等（深圳市科技创新局通知）', type: 'AI 前沿技术挑战赛与创业加速计划', theme: 'AI 脑机接口、神经科学、医疗与消费场景产业化', sourceTitle: '深圳市科技创新局：2026 AI 脑机接口全球挑战赛通知', sourceType: '政府通知', url: 'https://stic.sz.gov.cn/xxgk/tzgg/content/post_12851896.html',
        speakers: ['评审、导师与机构名单以官方赛程和通知为准。'], speakerQuality: '由脑科学研究、产业联盟、投资基金与临床/科研平台共同支持；具体导师和评审需核验。', audience: '脑科学与脑机接口早期团队、科研转化项目、医疗机构、产业方与投资机构。', investorValue: '通知明确设置“全球遴选—深度孵化—投资赋能—资源落地”闭环，并面向未注册团队和成立不超过三年的企业征集。',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 4, format: 5, investor: 5, discovery: 5, source: 5, urgency: 4 },
        qualityReason: '这是少见的官方早期项目入口：赛程、早期企业准入和专项投资/孵化机制均已公开，适合寻找水下脑机接口与神经科技团队。', relatedProjects: [], attendeesToWatch: ['进入挑战赛和加速期的未注册团队、成立不超过三年的创业企业。', '脑科学、临床转化、非侵入式 BCI 和神经技术赛道的评审与合作机构。']
      }),
      event({
        id: 'gaic-hangzhou-2026', name: '2026 全球人工智能大会（GAIC）杭州总站', date: '2026-10-21 — 2026-10-23', isoStart: '2026-10-21', location: '杭州（具体场馆待官方当前页核验）', organizer: 'GAIC（以官网为准）', type: 'AI 产业与资本大会', theme: 'AI 产业链、技术研发、场景落地与商业生态', sourceTitle: 'GAIC 官方页', sourceType: '官方页', url: 'https://www.thegaic.com/',
        speakers: ['技术领袖、产业企业、资本机构、学术专家与政策制定者；具体名单以官方日程为准。'], speakerQuality: '官方页强调产业、资本、学术多方参与，个人嘉宾及出席状态需会前核验。', audience: 'AI 创业团队、产业企业、资本机构、学术与政策生态参与者。', investorValue: '官方页说明提供初创企业资本对接和技术赋能，适合优先确认项目路演、需求发布和正式交流机制。',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 4, format: 4, investor: 5, discovery: 5, source: 4, urgency: 4 },
        qualityReason: '主题直接覆盖技术、场景、产业链与资本对接，对寻找早期 AI 应用团队有潜在价值；需核验杭州场次的最终场馆、议程和项目机制。', relatedProjects: ['coolqq-cookiepi', 'lingqiao-intelligence'], attendeesToWatch: ['有正式项目展示、资本对接或产业需求发布环节的早期团队。']
      }),
      event({
        id: 'idc-ai-summit-2026', name: '2026 IDC 中国人工智能与数据峰会（北京站）', date: '2026-08-18', isoStart: '2026-08-18', location: '北京（具体场馆以报名页为准）', organizer: 'IDC（以官方页为准）', type: '企业 AI 与数据峰会', theme: '规模化 AI、智能体、数据与企业 AI 落地', sourceTitle: 'IDC 中国人工智能与数据峰会官方页', sourceType: '官方页', url: 'https://event.idc.com/event/idc-ai-summit-china/',
        speakers: ['政、商、技界决策者、创新者与实践者；完整名单见官方页。'], speakerQuality: '官方页披露 CIO 顾问委员会与企业实践议程，适合观察企业采购和规模化落地信号。', audience: '企业数字化负责人、数据负责人、AI 解决方案开发者、产业客户与技术服务商。', investorValue: '更适合作为企业 AI 需求、采购和场景验证信息源；并非以早期项目发现为主。',
        quality: '中', discoveryPotential: '中', score: { topic: 5, speakers: 4, format: 3, investor: 4, discovery: 2, source: 5, urgency: 5 },
        qualityReason: '官方议程对企业级 AI、智能体、算力、数据与安全较有参考价值，但创业项目发现需要依赖展位、自由交流与合作伙伴名单，而非仅看主论坛。', relatedProjects: ['siliconflow', 'deepwisdom', 'zero-one'], attendeesToWatch: ['企业 AI 落地、智能体、算力与数据基础设施方向的解决方案团队和采购方。']
      }),
      event({
        id: 'iaicc-2026', name: '2026 国际人工智能及创意大会（IAICC）', date: '2026-11-20 — 2026-11-22', isoStart: '2026-11-20', location: '深圳', organizer: 'IAICC（以官方页为准）', type: 'AI 创意与开源工具大会', theme: 'AI 创作、3D、动画、开源工具与数字内容', sourceTitle: 'IAICC 2026 官方页', sourceType: '官方页', url: 'https://iaicc.tech/zh-hans/2026/',
        speakers: ['官方页展示数字内容、开源工具、游戏与 AI 创作领域的历届嘉宾；本届出席名单以当前页为准。'], speakerQuality: '创作工具和数字内容生态的专业人士较多，是否具有创业/产业深度需要结合本届日程判断。', audience: 'AI 创作工具、3D/动画、游戏开发者、数字内容团队与教育/开源社区。', investorValue: '适合关注 AI 创意工具与内容基础设施的产品团队；对通用 AI 项目发现的覆盖相对有限。',
        quality: '中', discoveryPotential: '中', score: { topic: 4, speakers: 3, format: 4, investor: 3, discovery: 3, source: 4, urgency: 3 },
        qualityReason: '聚焦 AI 与创意工具，对 AIGC、3D 与开发者工具有垂直观察价值；因非典型投融资活动，需选择有产品展示或创业团队参与的具体环节。', relatedProjects: ['shengshu', 'coolqq-cookiepi', 'k2-lab'], attendeesToWatch: ['AI 3D、动画、游戏与创意工具的独立开发者和早期产品团队。']
      }),
      event({
        id: 'ai-hangzhou-2026', name: 'AI Hangzhou 2026 杭州人工智能大会', date: '2026-08-18 — 2026-08-20', isoStart: '2026-08-18', location: '杭州国际博览中心', organizer: '长三角人工智能发展大会及相关主管/协会单位（以官方页为准）', type: 'AI 产业大会与展览会', theme: '人工智能产业、算力、数字经济、低空经济与机器人应用', sourceTitle: 'AI Hangzhou 2026 官方页', sourceType: '官方展会页', url: 'https://aihangzhouexpo.com/',
        speakers: ['人工智能高质量发展、算力、数字经济、机器人等同期论坛；嘉宾名单以官方当前页为准。'], speakerQuality: '官网列出多场产业论坛和品牌企业，具体嘉宾、项目展示与出席状态需在会前核验。', audience: '长三角 AI 企业、机器人企业、产业客户、开发者、研究者与投资人。', investorValue: '同一会期内包含产业大会、算力、机器人和数字经济论坛，适合从展商、论坛和供需对接寻找区域早期团队。',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 3, format: 5, investor: 4, discovery: 5, source: 4, urgency: 5 },
        qualityReason: '官方页明确列出 10 余场同期活动和 AI/机器人企业展示，具有较强的区域项目发现可能性；具体路演和嘉宾仍需以临期日程核验。', relatedProjects: ['coddie-ai', 'zhizi-computing', 'meixin-food-ai'], attendeesToWatch: ['具备产品展示、行业采购或项目路演机制的 AI / 机器人展商。']
      }),
      event({
        id: 'robotech-2026', name: '2026 智能机器人博览会（ROBOTECH）', date: '2026-10-27 — 2026-10-29', isoStart: '2026-10-27', location: '深圳国际会展中心（宝安）', organizer: '励展（深圳）展览有限公司（以官方页为准）', type: '具身智能与机器人产业展会', theme: '具身智能、机器人本体、供应链、场景验证与量产应用', sourceTitle: 'ROBOTECH 2026 官方页', sourceType: '官方展会页', url: 'https://www.robotechasia.com/',
        speakers: ['同期论坛和具身人形机器人场景应用活动；具体嘉宾以官方当前日程为准。'], speakerQuality: '官方页明确列出机器人、供应链、场景应用与科研机构等参与范围，个人嘉宾需会前核验。', audience: '机器人本体、零部件、系统集成商、制造/物流/医疗等产业客户、科研机构与投资人。', investorValue: '官方页强调商业洽谈、生态合作和场景验证，适合从参展商、系统集成商和采购方寻找早期具身智能线索。',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 3, format: 5, investor: 5, discovery: 5, source: 5, urgency: 4 },
        qualityReason: '活动覆盖“学术研发—场景验证—量产应用”链条，并明确提供商业配对和展商目录入口，适合具身智能项目发现。', relatedProjects: ['ace-robotics', 'mifeng-physical-data', 'dm-robotics'], attendeesToWatch: ['新成立机器人本体、核心部件、数据和系统集成团队。', '具备真实采购需求的制造、物流和商业服务客户。']
      }),
      event({
        id: 'beijing-ai-innovation-challenge-2026', name: '第三届北京市 AI 创新大赛', date: '2026-07-16 启动（部分赛道征集至 2026-10-07；以官方赛程为准）', isoStart: '2026-07-16', location: '北京 / 部分赛道线上', organizer: '北京市相关组织单位（以北京市政府信息页为准）', type: 'AI 创新应用赛事', theme: 'AIGC 内容安全、青创 AI+ 应用、智能体创新与行业赋能', sourceTitle: '北京市政府：第三届北京市 AI 创新大赛启动', sourceType: '政府信息页', url: 'https://www.beijing.gov.cn/fuwu/lqfw/gggs/202607/t20260717_4767648.html',
        speakers: ['赛事评审、导师与参赛主体以各赛道官方规则为准。'], speakerQuality: '政府公开信息明确列出技术创新与职业发展赛道，具体评审和导师名单待各赛道页面核验。', audience: '中小微科创主体、AI 工具开发者、应用方案团队、行业用户与青年创新者。', investorValue: '“青创未来 AI+ 应用”面向中小微科创主体征集解决方案，智能体创新赛也可作为早期产品团队的公开发现入口。',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 3, format: 5, investor: 4, discovery: 5, source: 5, urgency: 5 },
        qualityReason: '政府信息明确列出面向中小微科创主体、智能体工具和行业应用的赛道，项目发现机制比一般行业大会更直接。', relatedProjects: ['molian-agent-net', 'xingyi-ai'], attendeesToWatch: ['进入“青创未来 AI+ 应用”与智能体创新赛道的中小微团队。']
      }),
      event({
        id: 'embodied-robot-forum-2026', name: '2026 第四届具身智能机器人产业发展论坛', date: '2026-03-17（已结束）', isoStart: '2026-03-17', location: '上海', organizer: '盖世汽车（以公开活动页为准）', type: '具身智能产业论坛', theme: '具身智能、世界模型、VLA、仿真、机器人商业化与场景落地', sourceTitle: '2026 第四届具身智能机器人产业发展论坛公开活动页', sourceType: '公开活动页', url: 'https://www.bagevent.com/event/Embodied',
        speakers: ['全球科学家、企业家、工程师与投资人；具体出席名单以活动回顾为准。'], speakerQuality: '公开活动页强调科学家、企业家、工程师和投资人多方参与，名单和演讲内容可用于后续回溯。', audience: '具身智能技术团队、机器人企业、汽车与制造业客户、投资人。', investorValue: '虽已结束，但可用于回溯世界模型、VLA、仿真和产业化相关的公开参与者与产品线索。',
        quality: '高', discoveryPotential: '中', score: { topic: 5, speakers: 4, format: 4, investor: 4, discovery: 3, source: 4, urgency: 1 },
        qualityReason: '议题直接覆盖具身智能的关键技术和商业化问题；因活动已结束，主要价值是公开回顾与参会者线索回溯。', relatedProjects: ['zhengxing-physical-ai', 'mifeng-physical-data', 'ace-robotics']
      }),
      event({
        id: 'embodied-robot-components-2026', name: '2026 第五届具身智能关键部件论坛', date: '2026-07-03（已结束）', isoStart: '2026-07-03', location: '上海', organizer: '盖世汽车（以公开活动页为准）', type: '具身智能关键部件论坛', theme: '具身智能关键部件、传感、执行器与工程化落地', sourceTitle: '盖世汽车公开活动页中的主办方活动日程', sourceType: '公开活动页', url: 'https://www.bagevent.com/event/Embodied',
        speakers: ['嘉宾与议程需回到活动回顾页核验。'], speakerQuality: '公开日程可确认活动名称、日期与城市，细化嘉宾信息仍待来源补全。', audience: '机器人核心部件企业、本体厂商、系统集成商、产业客户与投资人。', investorValue: '可用于回溯具身智能关键部件供应链、工程化团队和产业合作关系。',
        quality: '中', discoveryPotential: '中', score: { topic: 5, speakers: 2, format: 3, investor: 4, discovery: 3, source: 3, urgency: 1 },
        qualityReason: '主题与具身智能供应链高度相关，但当前公开页对嘉宾和项目展示信息有限，需先补充回顾资料再高排。', relatedProjects: ['dm-robotics', 'newqi-robotics', 'bxi-robotics']
      }),
      event({
        id: 'seai-guangzhou-2026', name: '2026 广州国际数智装备与人工智能展览会（SEAI）', date: '2026-06-03 — 2026-06-05（已结束）', isoStart: '2026-06-03', location: '广州中国进出口商品交易会展馆 D 区', organizer: '以 SEAI 官方页为准', type: '数智装备与人工智能产业展会', theme: '人工智能、智能机器人、数字新基建、智能装备与工业制造', sourceTitle: 'SEAI 2026 官方页', sourceType: '官方展会页', url: 'https://seaigz.com/',
        speakers: ['高端对话、商务对接和成果发布等活动；具体嘉宾以官方回顾为准。'], speakerQuality: '官网明确将活动定位为展示、对话、商务对接与成果发布平台，单场嘉宾待进一步核验。', audience: '数智装备、机器人、智能制造企业、产业客户、服务商与投资人。', investorValue: '已结束活动可以回溯展商、对接和发布信息，重点观察工业 AI 与机器人供应链线索。',
        quality: '中', discoveryPotential: '中', score: { topic: 4, speakers: 3, format: 4, investor: 3, discovery: 3, source: 4, urgency: 1 },
        qualityReason: '展会具备商务对接与成果发布机制，但覆盖面偏广；需要从参展商和分论坛识别真正的 AI 创业项目。', relatedProjects: ['meixin-food-ai', 'xing-su-steering']
      }),
      event({
        id: 'shenzhi-cup-2026', name: '首届“申智杯”人工智能创新大赛', date: '2026 年举办（报名已于 2026-06-19 截止；后续赛程以官方页为准）', isoStart: '2026-06-19', location: '上海 / 赛事现场以官方规则为准', organizer: '上海国投公司、中国信息通信研究院；WAIC 组委会办公室指导', type: 'AI 创新与创业赛事', theme: 'AI 终端、人机交互、算力与计算架构、具身智能、机器人与 AI for Science', sourceTitle: '上海市国资委：首届“申智杯”人工智能创新大赛', sourceType: '政府/国企信息页', url: 'https://www.gzw.sh.gov.cn/shgzw_zxzx_gqdt/20260616/baafbcf5c248459facb170125cfa2c2a.html',
        speakers: ['赛事评审与参赛团队以官方赛程为准。'], speakerQuality: '公开信息列出实测、真机比拼和可复现系统验证机制，具体评审名单仍需核验。', audience: 'AI 终端团队、算力基础设施团队、具身智能机器人团队、AI for Science 团队与产业合作方。', investorValue: '四个赛道均要求现场开发、实测或真机比拼，对发现具备可运行原型的早期团队具有较强价值。',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 4, format: 5, investor: 5, discovery: 5, source: 5, urgency: 3 },
        qualityReason: '比赛设置 48 小时开发、36 小时稳定性实测、真机比拼和可复现演示，不只依赖路演叙事，适合筛查早期产品真实性。', relatedProjects: ['zhizi-computing', 'dm-robotics', 'baiyao-virtual-cell'], attendeesToWatch: ['进入算力、具身智能和 AI4S 决赛/实测环节的团队。']
      }),
      event({
        id: 'startup-shanghai-2026', name: '2026“创·在上海”国际创新创业大赛', date: '2026-03-24 启动（各区域赛与后续赛程以官方通知为准）', isoStart: '2026-03-24', location: '上海', organizer: '“创·在上海”国际创新创业大赛组委会、上海市科技创业中心等', type: '科技创新创业大赛', theme: '人工智能、集成电路、生物医药、智能网联汽车、高端装备与未来产业', sourceTitle: '上海市科学技术委员会：2026“创·在上海”国际创新创业大赛通知', sourceType: '政府通知', url: 'https://stcsm.sh.gov.cn/zwgk/tzgs/zhtz/20260324/fd6101e7ad1f4f4099e8dc69866c6935.html',
        speakers: ['评审、路演与参赛项目以各区域赛和赛事官网为准。'], speakerQuality: '由市级科技创业服务体系组织，项目质量需要通过各赛道入围名单、路演和后续融资/产品证据核验。', audience: '初创团队、科技企业、孵化器、园区、产业方和投资机构。', investorValue: '官方通知明确将人工智能列入赛道，区域赛和入围项目名单可作为本地早期公司的合规公开发现入口。',
        quality: '高', discoveryPotential: '高', score: { topic: 5, speakers: 3, format: 5, investor: 4, discovery: 5, source: 5, urgency: 3 },
        qualityReason: '初创团队和企业直接参赛，且有区域赛、公开报名和官方信息渠道；适合建立上海 AI 早期项目待核验队列。', relatedProjects: ['xingyi-ai', 'molian-agent-net', 'baiyao-virtual-cell'], attendeesToWatch: ['人工智能赛道的入围项目、区域赛展示团队和孵化器推荐企业。']
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
