from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "VC-AI-Opportunity-Radar-Case-Study.pdf"
CHINESE_FONT = "/System/Library/Fonts/STHeiti Light.ttc"

INK = colors.HexColor("#111827")
MUTED = colors.HexColor("#64748B")
VIOLET = colors.HexColor("#6953D8")
VIOLET_SOFT = colors.HexColor("#F0EDFF")
TEAL = colors.HexColor("#108F81")
TEAL_SOFT = colors.HexColor("#E4F7F2")
PAPER = colors.HexColor("#F8F7F3")
LINE = colors.HexColor("#E4E7EC")
GOLD = colors.HexColor("#B77913")


def build_styles():
    pdfmetrics.registerFont(TTFont("STHeiti", CHINESE_FONT, subfontIndex=0))
    base = getSampleStyleSheet()
    cjk = "STHeiti"
    return {
        "kicker": ParagraphStyle(
            "Kicker", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=7.5,
            leading=10, textColor=VIOLET, spaceAfter=7, tracking=1.1,
        ),
        "title": ParagraphStyle(
            "Title", parent=base["Normal"], fontName=cjk, fontSize=28,
            leading=36, textColor=INK, spaceAfter=12, alignment=TA_LEFT, wordWrap="CJK",
        ),
        "subtitle": ParagraphStyle(
            "Subtitle", parent=base["Normal"], fontName=cjk, fontSize=12,
            leading=20, textColor=MUTED, spaceAfter=12, wordWrap="CJK",
        ),
        "h1": ParagraphStyle(
            "H1", parent=base["Normal"], fontName=cjk, fontSize=19,
            leading=27, textColor=INK, spaceAfter=9, wordWrap="CJK",
        ),
        "h2": ParagraphStyle(
            "H2", parent=base["Normal"], fontName=cjk, fontSize=11,
            leading=16, textColor=VIOLET, spaceBefore=7, spaceAfter=4, wordWrap="CJK",
        ),
        "body": ParagraphStyle(
            "Body", parent=base["Normal"], fontName=cjk, fontSize=9.2,
            leading=15, textColor=INK, spaceAfter=5, wordWrap="CJK",
        ),
        "small": ParagraphStyle(
            "Small", parent=base["Normal"], fontName=cjk, fontSize=7.8,
            leading=12, textColor=MUTED, wordWrap="CJK",
        ),
        "card_title": ParagraphStyle(
            "CardTitle", parent=base["Normal"], fontName=cjk, fontSize=10,
            leading=14, textColor=INK, spaceAfter=3, wordWrap="CJK",
        ),
        "card_body": ParagraphStyle(
            "CardBody", parent=base["Normal"], fontName=cjk, fontSize=8.1,
            leading=12.6, textColor=MUTED, wordWrap="CJK",
        ),
        "quote": ParagraphStyle(
            "Quote", parent=base["Normal"], fontName=cjk, fontSize=12,
            leading=20, textColor=colors.HexColor("#352D70"), leftIndent=10,
            rightIndent=8, wordWrap="CJK",
        ),
    }


def p(text, style, styles):
    return Paragraph(text, styles[style])


def card(title, body, styles, width):
    table = Table([[p(title, "card_title", styles)], [p(body, "card_body", styles)]], colWidths=[width])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.white),
        ("BOX", (0, 0), (-1, -1), 0.6, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return table


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(colors.HexColor("#F8F7F3"))
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    canvas.setFillColor(VIOLET)
    canvas.rect(18 * mm, A4[1] - 17 * mm, 10 * mm, 3 * mm, fill=1, stroke=0)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica-Bold", 7)
    canvas.drawString(31 * mm, A4[1] - 16.2 * mm, "ORBITS  /  AI OPPORTUNITY RADAR")
    canvas.setFont("Helvetica", 7)
    canvas.drawRightString(A4[0] - 18 * mm, 13 * mm, f"Portfolio case · {doc.page}")
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 18 * mm, A4[0] - 18 * mm, 18 * mm)
    canvas.restoreState()


def build_pdf():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    styles = build_styles()
    doc = SimpleDocTemplate(
        str(OUT), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm,
        topMargin=28 * mm, bottomMargin=25 * mm,
    )
    story = []
    col = (A4[0] - 36 * mm - 10 * mm) / 2

    # Page 1
    story += [
        p("DOMESTIC VC · AI PRODUCT PORTFOLIO", "kicker", styles),
        p("AI Opportunity Radar", "title", styles),
        p("把公开信号变成可验证、可跟进的机会清单", "subtitle", styles),
    ]
    quote = Table([[p("“不是让 AI 替投资经理下结论，而是让投资经理更快看到证据、理解不确定性，并把值得继续研究的线索收拢。”", "quote", styles)]], colWidths=[A4[0] - 36 * mm])
    quote.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), VIOLET_SOFT),
        ("LINEBEFORE", (0, 0), (0, -1), 3, VIOLET),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 12),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
    ]))
    story += [quote, Spacer(1, 11 * mm), p("01 / 真实业务问题", "h1", styles)]
    story += [p("国内 VC 投资经理每天在新闻、创始人网络、活动邀约、数据库和聊天记录之间切换。真正的难题不是“找不到项目”，而是难以持续判断：哪些公开信号值得点开、信息是否可信、来源在哪里、下一步该验证什么。", "body", styles)]
    grid = Table([[card("投资人场景", "早晚打开一次，先看国内新项目，再看 AI 活动；先读摘要，后核验证据。", styles, col), card("产品目标", "把分散网页整理为国内优先、可筛选实体、可解释理由和可执行的跟进清单。", styles, col)], [card("我的职责", "独立完成产品定义、字段、公开样本、公开源采集、规则、交互、前端实现和浏览器验证。", styles, col), card("刻意不做", "不把新闻标题伪装成完整投研档案；不搭登录、复杂数据库或自动触达。把重心放在可体验闭环与可信边界。", styles, col)]], colWidths=[col, col], hAlign="LEFT")
    grid.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("BOTTOMPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (0, -1), 10)]))
    story += [Spacer(1, 3 * mm), grid, Spacer(1, 7 * mm), p("结果：一个可运行的 Web Demo，覆盖项目、活动、来源、解释、反馈与跟进六个环节。", "small", styles), PageBreak()]

    # Page 2
    story += [p("02 / 产品取舍与使用流程", "h1", styles)]
    story += [p("我把 V1.6 定义为“可信信息池 + 实时待核验队列”，而不是“AI 投资推荐器”。这既符合投资判断的风险边界，也让产品能先解决高频、可验证的工作。", "body", styles)]
    flow = Table([[p("Dashboard", "card_title", styles), p("项目列表", "card_title", styles), p("项目详情", "card_title", styles), p("活动雷达", "card_title", styles), p("收藏跟进", "card_title", styles)], [p("早晚更新、数量、状态", "card_body", styles), p("摘要、筛选、排序理由", "card_body", styles), p("来源、风险、验证问题", "card_body", styles), p("价值判断、低优先级识别", "card_body", styles), p("标签、状态、批量整理", "card_body", styles)]], colWidths=[(A4[0] - 36 * mm) / 5] * 5)
    flow.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.white), ("BACKGROUND", (0, 1), (-1, 1), colors.HexColor("#FCFCFD")),
        ("BOX", (0, 0), (-1, -1), .6, LINE), ("INNERGRID", (0, 0), (-1, -1), .5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 7), ("RIGHTPADDING", (0, 0), (-1, -1), 7), ("TOPPADDING", (0, 0), (-1, -1), 9), ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]))
    story += [Spacer(1, 4 * mm), flow, Spacer(1, 9 * mm), p("三个关键取舍", "h2", styles)]
    decisions = [
        [p("信息池优先", "card_title", styles), p("不直接给“应投 / 不应投”。Agent 先收集、整理、解释；投资经理保留最终判断。", "card_body", styles)],
        [p("分层真实数据优先", "card_title", styles), p("60 个国内优先项目（含 35 个早期信号项目）+ 36 个活动作为已整理样本；22 个公开来源（InfoQ 中文、量子位、36 氪公开 RSS / 融资快报与活动行 16 城目录）的新信号先进入近 45 天待核验队列。", "card_body", styles)],
        [p("未知优先于猜测", "card_title", styles), p("融资、估值、创始人背景和联系方式没被当前来源确认时，明确显示“未知 / 待核验”。", "card_body", styles)],
    ]
    decision_table = Table(decisions, colWidths=[37 * mm, A4[0] - 36 * mm - 37 * mm])
    decision_table.setStyle(TableStyle([("BACKGROUND", (0, 0), (0, -1), VIOLET_SOFT), ("BOX", (0, 0), (-1, -1), .6, LINE), ("INNERGRID", (0, 0), (-1, -1), .5, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10), ("TOPPADDING", (0, 0), (-1, -1), 9), ("BOTTOMPADDING", (0, 0), (-1, -1), 9)]))
    story += [decision_table, Spacer(1, 7 * mm), p("产品设计原则：卡片回答“是否值得点开”；详情回答“证据是什么、现在还不知道什么、下一步问什么”。", "small", styles), PageBreak()]

    # Page 3
    story += [p("03 / Agent 工作流与可解释排序", "h1", styles)]
    process = Table([[p("公开候选", "card_title", styles), p("实体与字段", "card_title", styles), p("去重与可信度", "card_title", styles), p("可解释初筛", "card_title", styles), p("人工反馈", "card_title", styles)], [p("InfoQ / 量子位 / 36 氪公开 RSS / 融资快报 / 活动行 16 城", "card_body", styles), p("候选项目 / 产品 / 活动与来源", "card_body", styles), p("标题与来源链接去重；近 45 天保留；缺字段显式保留", "card_body", styles), p("理由、不确定性、验证问题", "card_body", styles), p("收藏、忽略、标签、跟进", "card_body", styles)]], colWidths=[(A4[0] - 36 * mm) / 5] * 5)
    process.setStyle(TableStyle([( "BACKGROUND", (0,0), (-1,0), TEAL_SOFT), ("BOX", (0,0), (-1,-1), .6, LINE), ("INNERGRID", (0,0), (-1,-1), .5, LINE), ("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 7), ("RIGHTPADDING", (0,0), (-1,-1), 7), ("TOPPADDING", (0,0), (-1,-1), 9), ("BOTTOMPADDING", (0,0), (-1,-1), 9)]))
    story += [process, Spacer(1, 8 * mm), p("项目字段", "h2", styles), p("名称、行业/细分、产品、目标客户、AI 用法、团队、融资字段、B 轮以前可能性、商业化线索、竞争替代、来源、更新时间、可信度、公开联系入口、关注理由、不确定性和验证问题。", "body", styles), p("活动字段", "h2", styles), p("时间、地点、形式、主办方、主题、嘉宾与质量状态、参与人群、投资人价值、项目发现可能性、来源、活动质量与下一步行动。", "body", styles)]
    score_table = Table([[p("项目排序", "card_title", styles), p("活动排序", "card_title", styles)], [p("新颖性 · 来源可信度 · 信息完整度 · AI 相关性 · 早期阶段线索 · 跟进价值", "card_body", styles), p("主题质量 · 嘉宾质量 · 交流形式 · 投资人价值 · 项目发现可能性 · 来源可信度 · 时间紧迫性", "card_body", styles)]], colWidths=[col, col])
    score_table.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), colors.white), ("BACKGROUND", (0,1), (-1,1), colors.HexColor("#FCFCFD")), ("BOX", (0,0), (-1,-1), .6, LINE), ("INNERGRID", (0,0), (-1,-1), .5, LINE), ("VALIGN", (0,0), (-1,-1), "TOP"), ("LEFTPADDING", (0,0), (-1,-1), 10), ("RIGHTPADDING", (0,0), (-1,-1), 10), ("TOPPADDING", (0,0), (-1,-1), 9), ("BOTTOMPADDING", (0,0), (-1,-1), 9)]))
    story += [Spacer(1, 5 * mm), score_table, Spacer(1, 7 * mm), p("所有分数都是可展开的公开信号优先级，不是黑箱模型，更不是投资建议。", "small", styles), PageBreak()]

    # Page 4
    story += [p("04 / 验证、失败案例与下一步", "h1", styles)]
    evidence = Table([[p("60", "title", styles), p("36", "title", styles), p("22", "title", styles), p("53", "title", styles)], [p("国内优先项目样本", "card_body", styles), p("国内优先活动样本", "card_body", styles), p("实时公开来源", "card_body", styles), p("当前实时待核验线索", "card_body", styles)]], colWidths=[(A4[0]-36*mm)/4]*4)
    evidence.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,-1), colors.white), ("BOX", (0,0), (-1,-1), .6, LINE), ("INNERGRID", (0,0), (-1,-1), .5, LINE), ("ALIGN", (0,0), (-1,-1), "CENTER"), ("VALIGN", (0,0), (-1,-1), "MIDDLE"), ("TOPPADDING", (0,0), (-1,-1), 9), ("BOTTOMPADDING", (0,0), (-1,-1), 9)]))
    story += [evidence, Spacer(1, 8 * mm), p("已验证的闭环", "h2", styles), p("实际浏览器操作覆盖：首页、项目筛选、详情、来源、收藏、标签、跟进状态、活动低价值筛选、活动详情、批量整理，以及实时待核验队列的来源证据、收藏和跟进回流。", "body", styles), p("失败案例：活动日程的“看起来完整”", "h2", styles), p("早期整理活动样本时，最容易犯的错误是为了填满字段而写入没有当前官方证据的 2026 日期、场地或嘉宾。这个 Demo 选择了更保守的处理：没有证据就写“待官方当前页 / 归档核验”，历史活动明确标成历史样本；实时采集结果也先标记为“待核验”。", "body", styles)]
    future = Table([[card("下一步 1", "扩展已上线的国内公开源采集到高校创业营、项目展示和投资机构组合页，并保留人工审核。", styles, col), card("下一步 2", "基于收藏、忽略、标签与跟进做可解释的主动推荐。", styles, col)], [card("下一步 3", "连接 CRM 与日历，但所有外部动作保留人工批准。", styles, col), card("求职价值", "证明把真实投研工作流翻译为产品、数据结构、采集规则、交互和可运行原型的能力。", styles, col)]], colWidths=[col, col])
    future.setStyle(TableStyle([("VALIGN", (0,0), (-1,-1), "TOP"), ("BOTTOMPADDING", (0,0), (-1,-1), 7), ("RIGHTPADDING", (0,0), (0,-1), 10)]))
    story += [Spacer(1, 2 * mm), future]

    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    print(OUT)


if __name__ == "__main__":
    build_pdf()
