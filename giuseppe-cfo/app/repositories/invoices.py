from datetime import date
from decimal import Decimal

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.repositories.audit_logs import AuditLogsRepository
from app.services.invoice_numbering import next_invoice_number


class InvoicesRepository:
    def __init__(self, session: Session): self.session = session
    def list(self) -> list[Invoice]: return list(self.session.scalars(select(Invoice).order_by(Invoice.issue_date.desc())))
    def create_draft(self, **values: object) -> Invoice:
        invoice = Invoice(invoice_number=f"DRAFT-{date.today():%Y%m%d}-{date.today().strftime('%H%M%S')}", **values)
        self.session.add(invoice); self.session.flush()
        AuditLogsRepository(self.session).record("invoice", str(invoice.id), "create", "Created invoice draft")
        return invoice
    def mark_sent(self, invoice: Invoice) -> Invoice:
        if invoice.status != "draft": raise ValueError("Only draft invoices can be marked as sent.")
        invoice.invoice_number = next_invoice_number(self.session, invoice.issue_date)
        invoice.status = "sent"; AuditLogsRepository(self.session).record("invoice", str(invoice.id), "update", f"Sent {invoice.invoice_number}")
        return invoice
    def record_payment(self, invoice: Invoice, amount: Decimal, paid_on: date) -> Invoice:
        invoice.amount_paid_dkk += amount; invoice.paid_date = paid_on
        invoice.status = "paid" if invoice.amount_paid_dkk >= invoice.gross_amount_dkk else "partially_paid"
        AuditLogsRepository(self.session).record("invoice", str(invoice.id), "update", "Recorded payment")
        return invoice
