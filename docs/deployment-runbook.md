# 自有域名与自动更新部署运行手册

## 目标架构

```text
InfoQ 中文 / 量子位 / 36 氪 / 雷峰网公开 RSS / 融资快报 / 活动行 28 城目录
            ↓（每 4 小时）
 GitHub Actions：采集、去重、字段校验
            ↓（仅有变化时提交）
        main 分支更新
            ↓
 GitHub Pages：构建并自动发布静态站点
            ↓
   www.aivcradar.online → 公开访问
```

这条路径不需要持续运行传统云服务器。站点本身为静态页面；采集脚本由 GitHub Actions 定时运行，更新后的 `live-signals.js` 随静态站点重新发布。

## 已在仓库中准备好的内容

- `.github/workflows/refresh-live-signals.yml`：每 4 小时第 17 分钟运行一次采集，候选近 45 天滚动保留并写入 `live-signals.js`。
- `.github/workflows/deploy-pages.yml`：主分支更新后执行数据校验、构建，并发布 GitHub Pages。
- `scripts/refresh-live-signals.mjs`：读取 InfoQ 中文 RSS、量子位 RSS、36 氪与雷峰网公开 RSS / 融资快报，以及活动行 28 座重点产业城市 AI 活动目录（共 38 个来源）。
- `scripts/check-live-signals.mjs`：拒绝缺来源、缺抓取时间或不符合“待核验”边界的生成文件。

## 上线步骤

### 1. 确定公开仓库

建议仓库名：`ai-vc-opportunity-radar`。如果使用 GitHub Free，仓库应设为公开；GitHub Pages 对公开仓库可用。若坚持私有仓库，应先确认账户套餐支持私有仓库 Pages。

### 2. 推送仓库并启用 Actions 权限

在仓库 `Settings → Actions → General` 中，将 `Workflow permissions` 设为 **Read and write permissions**，这样采集工作流才能提交更新后的 `live-signals.js`。

### 3. 启用 GitHub Pages

在 `Settings → Pages` 中选择 **GitHub Actions** 作为发布来源。推送代码后，手动运行一次：

1. `Refresh domestic public AI signals`；
2. `Deploy AI Opportunity Radar`。

首次成功后，Pages 会给出一个临时 `github.io` 地址，供 DNS 配置前测试。

### 4. 绑定自有域名

当前线上地址使用：

```text
www.aivcradar.online
```

对应 DNS 记录为：

```text
类型：CNAME
主机记录：www
记录值：yibohanthu-hub.github.io
```

不要使用通配符 DNS。完成 DNS 生效后，在 GitHub Pages 中验证域名并开启 `Enforce HTTPS`。当前 `https://www.aivcradar.online` 已可公开访问；仍应保留 GitHub 仓库作为发布故障时的源码备份入口。

### 5. 上线后验收

1. 访问 `https://www.aivcradar.online/#/signals`；
2. 页面显示最近成功抓取时间和每个来源的健康状态；
3. GitHub Actions 手动运行后，确认 `live-signals.js` 有变化时会提交并触发部署；
4. 从无痕窗口确认自有域名无需登录即可访问。

## 运行边界与告警建议

- GitHub 的定时工作流是尽力调度，不是秒级或金融级 SLA；页面以最近成功抓取时间为准。
- 任一来源失败时，其他来源仍可更新，页面会显示部分来源异常；所有来源均失败时，脚本保留上一次成功队列而不覆盖为空数据。
- 下一阶段再增加失败通知、来源适配器测试、字段级证据、人工审核状态和可配置的白名单/排除名单。

## 需要域名持有者提供的内容

1. 已购买的主域名，或授权购买一个域名；
2. DNS 管理权限，或由持有者按上面的 CNAME 指令配置；
3. 一个可用于公开 Pages 的 GitHub 仓库，或授权创建公开仓库。

参考：

- [GitHub Pages 自有域名配置](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages 域名验证](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [GitHub Actions 定时触发](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows)
