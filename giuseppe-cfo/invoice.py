"""Invoice creation helpers."""

from pathlib import Path

from app.google_workspace import GoogleWorkspace
from app.invoices import generate_invoice_pdf
from app.models import Invoice


def create_invoice(workspace: GoogleWorkspace, invoice: Invoice, output_directory: Path = Path("pdf")) -> Invoice:
    pdf_path = generate_invoice_pdf(invoice, output_directory)
    pdf_url = workspace.upload_invoice_pdf(pdf_path)
    stored_invoice = Invoice(
        invoice.number, invoice.issue_date, invoice.due_date, invoice.client, invoice.lines, pdf_url
    )
    workspace.add_invoice(stored_invoice)
    return stored_invoice
