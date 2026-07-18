from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "AI-Innovation-Product-Portfolio-Note.pdf"
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


def styles():
    pdfmetrics.registerFont(TTFont("STHeiti", CHINESE_FONT, subfontIndex=0))
    base = getSampleStyleSheet()
    cjk = "STHeiti"
    return {
        "kicker": ParagraphStyle("kicker", parent=base["Normal"], fontName="Helvetica-Bold", fontSize=7.5, leading=10, textColor=VIOLET, tracking=1.1),
        "title": ParagraphStyle("title", parent=base["Normal"], fontName=cjk, fontSize=24, leading=31, textColor=INK, alignment=TA_LEFT, wordWrap="CJK"),
        "subtitle": ParagraphStyle("subtitle", parent=base["Normal"], fontName=cjk, fontSize=10.6, leading=17, textColor=MUTED, wordWrap="CJK"),
        "h2": ParagraphStyle("h2", parent=base["Normal"], fontName=cjk, fontSize=11, leading=16, textColor=INK, wordWrap="CJK"),
        "body": ParagraphStyle("body", parent=base["Normal"], fontName=cjk, fontSize=8.5, leading=13.5, textColor=MUTED, wordWrap="CJK"),
        "body_dark": ParagraphStyle("body_dark", parent=base["Normal"], fontName=cjk, fontSize=8.7, leading=13.8, textColor=INK, wordWrap="CJK"),
        "stat": ParagraphStyle("stat", parent=base["Normal"], fontName=cjk, fontSize=19, leading=23, textColor=VIOLET, alignment=TA_LEFT, wordWrap="CJK"),
        "stat_label": ParagraphStyle("stat_label", parent=base["Normal"], fontName=cjk, fontSize=7.6, leading=11, textColor=MUTED, wordWrap="CJK"),
        "small": ParagraphStyle("small", parent=base["Normal"], fontName=cjk, fontSize=7.4, leading=11.4, textColor=MUTED, wordWrap="CJK"),
        "table_head": ParagraphStyle("table_head", parent=base["Normal"], fontName=cjk, fontSize=8.3, leading=12, textColor=INK, wordWrap="CJK"),
        "table_body": ParagraphStyle("table_body", parent=base["Normal"], fontName=cjk, fontSize=7.55, leading=11.4, textColor=MUTED, wordWrap="CJK"),
    }


def p(text, style, sheet):
    return Paragraph(text, sheet[style])


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAPER)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    canvas.setFillColor(VIOLET)
    canvas.rect(18 * mm, A4[1] - 16 * mm, 10 * mm, 3 * mm, fill=1, stroke=0)
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica-Bold", 7)
    canvas.drawString(31 * mm, A4[1] - 15.2 * mm, "AI INNOVATION PRODUCT PORTFOLIO")
    canvas.setStrokeColor(LINE)
    canvas.line(18 * mm, 16 * mm, A4[0] - 18 * mm, 16 * mm)
    canvas.setFont("Helvetica", 7)
    canvas.drawRightString(A4[0] - 18 * mm, 10 * mm, "AI Opportunity Radar · 2026.07")
    canvas.restoreState()


def build_pdf():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    sheet = styles()
    width = A4[0] - 36 * mm
    doc = SimpleDocTemplate(str(OUT), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=27 * mm, bottomMargin=24 * mm)

    story = [
        p("AI INNOVATION PRODUCT / PORTFOLIO NOTE", "kicker", sheet),
        Spacer(1, 2 * mm),
        p("AI 创新产品岗位补充说明", "title", sheet),
        Spacer(1, 2 * mm),
        p("AI Opportunity Radar｜独立完成的可操作 AI Agent 产品实践", "subtitle", sheet),
        Spacer(1, 7 * mm),
    ]

    stats = Table([
        [p("60", "stat", sheet), p("36", "stat", sheet), p("38", "stat", sheet), p("4 小时", "stat", sheet)],
        [p("国内优先项目样本", "stat_label", sheet), p("AI 活动样本", "stat_label", sheet), p("已接入公开来源", "stat_label", sheet), p("自动采集与发布节奏", "stat_label", sheet)],
    ], colWidths=[width / 4] * 4)
    stats.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.white), ("BOX", (0, 0), (-1, -1), 0.6, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.45, LINE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    story += [stats, Spacer(1, 8 * mm), p("我完成的不是一个静态页面，而是一个从公开信号到用户行动的可验证工作流：采集 → 规范化 → 去重 → 可解释初筛 → 人工核验 → 收藏 / 跟进反馈。", "body_dark", sheet), Spacer(1, 6 * mm)]

    rows = [
        [p("0→1 产品", "table_head", sheet), p("从“信息多、判断慢、难跟进”的真实任务出发，定义项目 / 活动 / 证据 / 验证问题 / 跟进状态，独立完成可操作 Web 原型。", "table_body", sheet), p("把问题拆成用户场景、信息架构、字段、交互与验证闭环。", "table_body", sheet)],
        [p("AI Agent", "table_head", sheet), p("接入公开源采集，候选先进入待核验队列；来源、未知字段和判断理由可见，Agent 不伪造事实、不替用户决策。", "table_body", sheet), p("能定义模型、人和证据的协作边界。", "table_body", sheet)],
        [p("物理 AI 与评测", "table_head", sheet), p("样本覆盖具身智能、机器人、AI 终端、自动驾驶及相关活动；已验证功能、数据与自动化发布，并预设真实用户效果指标。", "table_body", sheet), p("将技术信号转为场景假设、验证问题与迭代指标。", "table_body", sheet)],
    ]
    mapping = Table([[p("岗位能力", "table_head", sheet), p("作品中的证据", "table_head", sheet), p("可迁移价值", "table_head", sheet)]] + rows, colWidths=[26 * mm, 82 * mm, width - 108 * mm])
    mapping.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), VIOLET_SOFT), ("BACKGROUND", (0, 1), (0, -1), TEAL_SOFT),
        ("BOX", (0, 0), (-1, -1), 0.6, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.45, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8), ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story += [mapping, Spacer(1, 8 * mm)]

    evaluation = Table([[p("评估与下一步", "h2", sheet)], [p("已经完成：浏览器功能验证、数据校验、线上自动化更新验证。下一步不虚构“用户喜爱”，而用发现有效线索率、核验耗时、收藏到跟进转化率与人工判定失真率评估真实产品价值。", "body_dark", sheet)]], colWidths=[width])
    evaluation.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#FFF8E9")), ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#F0DFBD")),
        ("LEFTPADDING", (0, 0), (-1, -1), 12), ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    story += [evaluation, Spacer(1, 7 * mm)]

    boundary = Table([[p("作品边界", "h2", sheet)], [p("本作品面向 VC 信息发现，不假装是车载系统、VLA 或机器人控制 Demo；它证明的是我能将 AI / 物理 AI 信息、用户工作流与可验证指标快速落成可体验的 0→1 产品原型。", "body_dark", sheet)]], colWidths=[width])
    boundary.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), colors.white), ("BOX", (0, 0), (-1, -1), 0.6, LINE),
        ("LINEBEFORE", (0, 0), (0, -1), 3, TEAL), ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12), ("TOPPADDING", (0, 0), (-1, -1), 10), ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    story += [boundary, Spacer(1, 6 * mm), p("在线作品：https://www.aivcradar.online/#/portfolio    ·    源码与自动化配置：https://github.com/yibohanthu-hub/ai-vc-opportunity-radar", "small", sheet)]

    doc.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
    print(OUT)


if __name__ == "__main__":
    build_pdf()
