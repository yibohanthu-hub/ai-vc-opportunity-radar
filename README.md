# AI Opportunity Radar · VC Demo

面向国内 VC 投资经理的 AI 机会发现与活动雷达作品集 Demo。

它把已核验样本与真实公开来源的待核验队列整理成可筛选、可验证、可收藏和可跟进的机会池；它不替代投资判断、不自动联系任何人。

## 启动

```bash
cd /Users/yibo/CEO/ai-vc-opportunity-radar-demo
npm start
```

打开 `http://localhost:4173`。

无需安装第三方前端依赖。页面是原生 HTML/CSS/JavaScript 单页应用，状态保存在当前浏览器的 `localStorage` 中。

## 已实现

- Dashboard：今日新增项目/活动、收藏和待跟进数量，以及推荐入口。
- 创业项目雷达：60 个国内优先公开样本，其中 35 个带有种子、天使、Pre-A、A 轮或成立时间较短等早期信号；项目页同时展示自动更新的实时待核验项目，避免把新闻标题伪装成正式档案。
- 项目详情：产品、创始团队、融资字段、来源、公开联系入口、筛选理由、不确定性和验证问题。
- AI 活动雷达：36 个国内优先公开活动样本，按时间、地点、主题、活动类型、形式、质量和项目发现可能性筛选；页面同时展示自动更新的实时待核验活动。
- 活动详情：主题、嘉宾信息状态、主办方、投资人价值、来源、质量理由和关联项目。
- 收藏/忽略/标签/跟进/最近查看/批量整理；行为记录为第二阶段个性化推荐做准备。
- 实时待核验队列：从 InfoQ 中文、量子位、36 氪、雷峰网的公开 RSS / 融资快报，以及活动行 28 个重点城市 AI 目录实际采集，共 38 个公开来源；近 45 天候选滚动保留、去重并显示抓取时间、来源状态、入队理由、标题 / 摘要阶段线索、原始链接和未知字段。
- 早期项目发现：公司官网、融资公告、高校/研究院创业营、孵化器与公开创投媒体为正式证据入口；小红书等公开内容平台只作人工候选发现，不做自动抓取，关键事实必须交叉核验。
- `npm run refresh:signals` 可立即更新队列；`npm run check:signals` 验证其来源和字段边界。
- GitHub Actions 已上线：每 4 小时采集一次公开信号，校验后将刷新后的静态站点发布到 GitHub Pages；手动端到端验证已通过。

## 发布与投递

- 公开仓库：[yibohanthu-hub/ai-vc-opportunity-radar](https://github.com/yibohanthu-hub/ai-vc-opportunity-radar)。自有域名为 `www.aivcradar.online`，已通过 GitHub Pages HTTPS 证书验证。
- 面向 AI 创新产品岗位的直接作品集入口：[`https://www.aivcradar.online/#/portfolio`](https://www.aivcradar.online/#/portfolio)。该入口用真实实现与测试证据说明 0→1 产品、AI Agent 工作流、物理 AI 场景理解与评估边界，不对外宣称这是车载或 VLA 产品。
- 附加的一页岗位说明 PDF：`output/pdf/AI-Innovation-Product-Portfolio-Note.pdf`；可直接与 4 页案例 PDF 一起上传。
- `npm run check:release` 会同时检查样本数据、生成可部署静态版本，并验证线上版本需要的入口文件与链接预览图。
- `public/og.png` 是投递链接在邮件、聊天工具和作品集页中的预览封面；发布时会自动替换为实际站点域名。
- 推荐投递材料和使用说明见 [投递交付说明](docs/submission-guide.md)；自有域名与自动更新上线步骤见 [部署运行手册](docs/deployment-runbook.md)。

## 关键文件

- `data.js`：样本、来源、分数、筛选理由和待核验问题。
- `live-signals.js`：由真实采集脚本生成的公开来源待核验队列。
- `scripts/refresh-live-signals.mjs`：公开来源采集、规范化、去重与来源健康记录。
- `.github/workflows/`：每 4 小时采集和 GitHub Pages 自动部署配置。
- `app.js`：路由、筛选、交互、浏览器本地存储和可解释排序展示。
- `styles.css`：响应式界面。
- `docs/`：产品说明、作品集案例、演示脚本、测试记录和数据来源说明。
- `output/playwright/`：浏览器验证截图。

## 数据边界

- 每个实体都至少保留一个可点击公开来源、信息池更新时间与可信度状态；样本与实时队列优先覆盖国内。
- 融资额、估值、创始人背景和联系方式若未从当前收录来源确认，显示“未知 / 待核验”。
- 公开联系方式仅为官网或公开档案入口；系统不发送邮件、电话、社交媒体或微信消息。
- 部分活动是历史样本或待官方当前页复核的样本，界面已明确标注，不能被当作实时日程。
- 实时队列是候选信息而非已完成投研档案；任何实际触达、投资或参会前都必须回到原始来源核验。

详见：[产品说明](docs/product-spec.md)、[作品集案例](docs/portfolio-case-study.md)、[AI 创新产品岗位说明](docs/ai-innovation-product-fit.md)、[90 秒演示脚本](docs/demo-script-90s.md)、[测试与验证记录](docs/test-and-validation.md)、[实时信号管道](docs/live-signal-pipeline.md)、[部署运行手册](docs/deployment-runbook.md)。
