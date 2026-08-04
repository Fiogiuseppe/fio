from datetime import date
from decimal import Decimal

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.repositories.audit_logs import AuditLogsRepository
from app.services.invoice_numbering import next_invoice_number


class InvoicesRepository:
    def __init__(self, session: Session):
        self.session = session

    def list(self) -> list[Invoice]:
        return list(self.session.scalars(select(Invoice).order_by(Invoice.issue_date.desc())))

    def get(self, invoice_id: int) -> Invoice | None:
        return self.session.get(Invoice, invoice_id)

    def create_draft(self, **values: object) -> Invoice:
        invoice = Invoice(
            invoice_number=f"DRAFT-{date.today():%Y%m%d}-{date.today().strftime('%H%M%S')}",
            status="draft",
            amount_paid_dkk=Decimal("0"),
            **values,
        )
        self.session.add(invoice)
        self.session.flush()
        AuditLogsRepository(self.session).record(
            "invoice", str(invoice.id), "create", "Created invoice draft"
        )
        return invoice

    def copy_to_draft(self, invoice: Invoice) -> Invoice:
        return self.create_draft(
            client_id=invoice.client_id,
            issue_date=date.today(),
            due_date=invoice.due_date,
            title=f"{invoice.title} (copy)",
            description=invoice.description,
            category=invoice.category,
            currency=invoice.currency,
            original_net_amount=invoice.original_net_amount,
            exchange_rate_to_dkk=invoice.exchange_rate_to_dkk,
            net_amount_dkk=invoice.net_amount_dkk,
            vat_rate=invoice.vat_rate,
            vat_amount_dkk=invoice.vat_amount_dkk,
            gross_amount_dkk=invoice.gross_amount_dkk,
            notes=invoice.notes,
            document_path=invoice.document_path,
        )

    def update_draft(self, invoice: Invoice, **values: object) -> Invoice:
        if invoice.status != "draft":
            raise ValueError("Only draft invoices can be edited.")
        for key, value in values.items():
            setattr(invoice, key, value)
        self.session.flush()
        AuditLogsRepository(self.session).record(
            "invoice", str(invoice.id), "update", f"Updated draft {invoice.invoice_number}"
        )
        return invoice

    def mark_sent(self, invoice: Invoice) -> Invoice:
        if invoice.status != "draft":
            raise ValueError("Only draft invoices can be marked as sent.")
        invoice.invoice_number = next_invoice_number(self.session, invoice.issue_date)
        invoice.status = "sent"
        AuditLogsRepository(self.session).record(
            "invoice", str(invoice.id), "send", f"Sent {invoice.invoice_number}"
        )
        return invoice

    def record_payment(self, invoice: Invoice, amount: Decimal, paid_on: date) -> Invoice:
        if amount <= 0:
            raise ValueError("Payment amount must be positive.")
        remaining = Decimal(str(invoice.gross_amount_dkk)) - Decimal(str(invoice.amount_paid_dkk))
        if amount > remaining:
            raise ValueError("Payment exceeds outstanding amount.")
        invoice.amount_paid_dkk = Decimal(str(invoice.amount_paid_dkk)) + amount
        invoice.paid_date = paid_on
        invoice.status = (
            "paid"
            if Decimal(str(invoice.amount_paid_dkk)) >= Decimal(str(invoice.gross_amount_dkk))
            else "partially_paid"
        )
        AuditLogsRepository(self.session).record(
            "invoice",
            str(invoice.id),
            "payment",
            f"Payment {amount} DKK on {paid_on.isoformat()}",
        )
        return invoice

    def mark_cancelled(self, invoice: Invoice, reason: str = "") -> Invoice:
        if invoice.status == "cancelled":
            return invoice
        invoice.status = "cancelled"
        AuditLogsRepository(self.session).record(
            "invoice",
            str(invoice.id),
            "cancel",
            f"Cancelled {invoice.invoice_number}. {reason}".strip(),
        )
        return invoice

    def mark_archived(self, invoice: Invoice) -> Invoice:
        invoice.status = "archived"
        AuditLogsRepository(self.session).record(
            "invoice", str(invoice.id), "archive", f"Archived {invoice.invoice_number}"
        )
        return invoice

    def refresh_overdue(self, today: date | None = None) -> int:
        today = today or date.today()
        changed = 0
        for invoice in self.list():
            if (
                invoice.status in {"sent", "partially_paid"}
                and invoice.due_date < today
                and Decimal(str(invoice.amount_paid_dkk)) < Decimal(str(invoice.gross_amount_dkk))
            ):
                invoice.status = "overdue"
                changed += 1
        if changed:
            AuditLogsRepository(self.session).record(
                "invoice", "batch", "status", f"Marked {changed} overdue invoice(s)"
            )
        return changed
