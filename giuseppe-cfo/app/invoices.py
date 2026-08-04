from __future__ import annotations

import os
from decimal import Decimal
from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
from reportlab.lib import colors

from app.models import Invoice


def dkk(value: Decimal) -> str:
    return f"{value:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".") + " DKK"


def generate_invoice_pdf(invoice: Invoice, output_dir: Path) -> Path:
    """Create a Danish-style invoice PDF. This does not submit or book anything."""
    output_dir.mkdir(parents=True, exist_ok=True)
    output_path = output_dir / f"{invoice.number}.pdf"
    styles = getSampleStyleSheet()
    document = SimpleDocTemplate(
        str(output_path), pagesize=A4, rightMargin=20 * mm, leftMargin=20 * mm, topMargin=18 * mm
    )
    business = os.getenv("BUSINESS_NAME", "Your PMV")
    identity = "<br/>".join(filter(None, [
        business, f"CVR: {os.getenv('BUSINESS_CVR', '')}",
        os.getenv("BUSINESS_ADDRESS", ""), os.getenv("BUSINESS_EMAIL", ""), os.getenv("BUSINESS_PHONE", ""),
    ]))
    recipient = "<br/>".join(filter(None, [invoice.client.name, invoice.client.address, invoice.client.email, invoice.client.cvr and f"CVR: {invoice.client.cvr}"]))
    story = [
        Paragraph("<b>FAKTURA</b>", styles["Title"]), Spacer(1, 7 * mm),
        Table([[Paragraph(identity, styles["BodyText"]), Paragraph(recipient, styles["BodyText"])]], colWidths=[85 * mm, 85 * mm]),
        Spacer(1, 6 * mm),
        Paragraph(f"Fakturanr.: {invoice.number}<br/>Fakturadato: {invoice.issue_date:%d-%m-%Y}<br/>Forfaldsdato: {invoice.due_date:%d-%m-%Y}", styles["BodyText"]),
        Spacer(1, 7 * mm),
    ]
    rows = [["Beskrivelse", "Antal", "Enhedspris", "Moms", "Beløb ekskl. moms"]]
    for line in invoice.lines:
        rows.append([line.description, str(line.quantity), dkk(line.unit_price), f"{line.vat_rate * 100:.0f}%", dkk(line.net_amount)])
    rows += [
        ["", "", "", "Subtotal", dkk(invoice.net_amount)],
        ["", "", "", "Moms", dkk(invoice.vat_amount)],
        ["", "", "", "I alt", dkk(invoice.total_amount)],
    ]
    table = Table(rows, colWidths=[65 * mm, 20 * mm, 30 * mm, 20 * mm, 35 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#173f5f")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -4), 0.25, colors.HexColor("#d1d5db")),
        ("ALIGN", (1, 1), (-1, -1), "RIGHT"),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTNAME", (3, -1), (-1, -1), "Helvetica-Bold"),
        ("LINEABOVE", (3, -1), (-1, -1), 0.75, colors.black),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.append(table)
    document.build(story)
    return output_path
