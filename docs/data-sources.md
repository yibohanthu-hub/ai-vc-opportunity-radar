# 数据来源说明

已整理样本快照：2026-07-16。第一版采取**中国大陆优先、海外补充**的范围策略：项目和活动首先服务向中国企业展示的 VC 工作流。每个实体的来源 URL、来源类型和写入时间都在 `../data.js` 中，详情页可直接打开。

## 实时待核验来源

实时队列由 `../scripts/refresh-live-signals.mjs` 生成，并写入 `../live-signals.js`。它只用于发现候选线索，不等同于正式项目或活动档案。

| 来源 | 用途 | 接入边界 |
| --- | --- | --- |
| [InfoQ 中文 RSS](https://www.infoq.cn/feed) | 中国大陆 AI、创业、融资、产品新闻候选 | 仅以 AI、创业/产品、中国大陆主体或场景关键词入队；上市公司、泛市场新闻和活动报道会被排除。 |
| [量子位 RSS](https://www.qbitai.com/feed) | 中国大陆 AI 产品与技术新闻候选 | 只进入待核验队列；公司主体、融资和所在地不从标题推断。 |
| [活动行：北京 AI 活动](https://www.huodongxing.com/events?city=%E5%8C%97%E4%BA%AC&tag=AI) | 北京公开 AI 活动候选 | 只读取公开列表中的名称、日期文本、地点、主办方与原始链接。 |
| [活动行：上海 AI 活动](https://www.huodongxing.com/events?city=%E4%B8%8A%E6%B5%B7&tag=AI) | 上海公开 AI 活动候选 | 同上。 |
| [活动行：深圳 AI 活动](https://www.huodongxing.com/events?city=%E6%B7%B1%E5%9C%B3&tag=AI) | 深圳公开 AI 活动候选 | 同上。 |

采集遵守低频、只读、公开源原则：每次运行每个来源只请求一次，单次最多写入 18 条项目 / 产品候选和 18 条活动候选。活动行列表页的年份、嘉宾、报名状态与现场机制仍标为待核验。

## 正式项目样本来源

23 个中国大陆优先样本都保留至少一个公司公开入口。代表性来源包括：

- [智谱](https://www.zhipuai.cn/)、[MiniMax](https://www.minimaxi.com/)、[月之暗面](https://www.moonshot.cn/)、[百川智能](https://www.baichuan-ai.com/)、[零一万物](https://www.lingyiwanwu.com/)、[阶跃星辰](https://www.stepfun.com/)、[面壁智能](https://www.modelbest.cn/)、[生数科技](https://www.shengshu-ai.com/)
- [硅基流动](https://siliconflow.cn/)、[DeepWisdom](https://deepwisdom.ai/)、[DeepSeek](https://www.deepseek.com/)、[轻舟智航](https://www.qcraft.ai/)
- [智元机器人](https://www.agibot.com/)、[银河通用](https://www.galbot.com/)、[逐际动力](https://www.limxdynamics.com/)、[星尘智能](https://www.astribot.com/)、[加速进化](https://www.boosterobotics.com/)、[松延动力](https://www.noetixrobotics.com/)、[元象 XVERSE](https://www.xverse.cn/)、[帕西尼感知科技](https://www.pasini.com/)、[Rokid](https://www.rokid.com/)、[LiblibAI](https://www.liblib.art/)、[思谋科技](https://www.smartmore.com/)

公司官网用于确认“公开存在的产品 / 技术方向”，不自动证明融资金额、估值、创始团队、收入或联系方式。因此这些字段无证据时明确保留“未知 / 待核验”。

## 正式活动样本来源

21 个中国大陆优先活动样本优先使用官方、政府或公开报名页。代表性来源包括：

- [WAIC 2026 上海市政府信息页](https://japanese.shanghai.gov.cn/ja-2026WAIC/index.html)、[WAIC Academic 官方日程](https://waica2026.worldaic.com.cn/program/)、[2026 北京智源大会日程](https://2026.baai.ac.cn/schedule)
- [2026 中国具身智能大会](https://ceai.caai.cn/)、[2026 世界机器人大会论坛](https://www.worldrobotconference.com/forum/)、[2026 世界机器人大会 SARA](https://www.worldrobotconference.com/sara/)
- [CICAI 2026](https://www.caai.cn/site/content/5469.html)、[全球开发者先锋大会政府信息页](https://www.shanghai.gov.cn/nw4411/20260215/13cea19844984e7794b46a62c3b37d8f.html)、[全球数字经济大会](https://www.gdec.net.cn/2025/actives/newsdetail?id=1241&lang=zh)
- [上海国际人工智能展](https://www.sifeshow.com/) 与活动行公开报名页中的中国大陆 AI 活动。

## 使用原则

- 来源链接支持“从摘要回到原始证据”，不代表每一个字段都已完成独立事实审计。
- 从当前收录来源不能确认的融资、估值、团队背景、活动嘉宾或日程，Demo 一律显示未知 / 待核验。
- 活动信息时效性高；参与或联系前必须重新打开官方页面核验。
- “中国大陆优先”是产品范围策略，不是对单一来源标题或公司主体的自动事实判定；实时队列仍要求人工确认主体与主要经营地。
