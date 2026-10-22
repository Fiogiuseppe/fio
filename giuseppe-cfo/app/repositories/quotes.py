from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.invoice import Invoice
from app.models.quote import Quote
from app.repositories.audit_logs import AuditLogsRepository
from app.services.invoice_numbering import next_quote_number


class QuotesRepository:
    def __init__(self, session: Session):
        self.session = session

    def list(self) -> list[Quote]:
        return list(self.session.scalars(select(Quote).order_by(Quote.issue_date.desc())))

    def create(self, status: str = "draft", **values: object) -> Quote:
        issued_on = values.get("issue_date")
        quote = Quote(
            quote_number=next_quote_number(
                self.session, issued_on if isinstance(issued_on, date) else None
            ),
            status=status,
            **values,
        )
        self.session.add(quote)
        self.session.flush()
        AuditLogsRepository(self.session).record(
            "quote", str(quote.id), "create", f"Created {quote.quote_number}"
        )
        return quote

    def get(self, quote_id: int) -> Quote | None:
        return self.session.get(Quote, quote_id)

    def update(self, quote: Quote, **values: object) -> Quote:
        if quote.status != "draft":
            raise ValueError("Only draft quotes can be edited.")
        for key, value in values.items():
            setattr(quote, key, value)
        self.session.flush()
        AuditLogsRepository(self.session).record(
            "quote", str(quote.id), "update", f"Updated {quote.quote_number}"
        )
        return quote

    def set_status(self, quote: Quote, status: str) -> Quote:
        quote.status = status
        self.session.flush()
        AuditLogsRepository(self.session).record(
            "quote",
            str(quote.id),
            "status",
            f"Set {quote.quote_number} to {status}",
        )
        return quote

    def duplicate(self, quote: Quote) -> Quote:
        return self.create(
            client_id=quote.client_id,
            issue_date=quote.issue_date,
            expiry_date=quote.expiry_date,
            title=f"{quote.title} (copy)",
            description=quote.description,
            currency=quote.currency,
            original_subtotal=quote.original_subtotal,
            exchange_rate_to_dkk=quote.exchange_rate_to_dkk,
            subtotal_dkk=quote.subtotal_dkk,
            notes=quote.notes,
        )

    def archive(self, quote: Quote) -> Quote:
        quote.status = "archived"
        self.session.flush()
        AuditLogsRepository(self.session).record(
            "quote", str(quote.id), "archive", f"Archived {quote.quote_number}"
        )
        return quote

    def convert_to_invoice_draft(self, quote: Quote, due_date: date) -> Invoice:
        if quote.status != "accepted":
            raise ValueError("Only accepted quotes can be converted.")
        quote.status = "converted"
        invoice = Invoice(
            invoice_number=f"DRAFT-{date.today():%Y%m%d}-{quote.id:04d}",
            client_id=quote.client_id,
            issue_date=date.today(),
            due_date=due_date,
            title=quote.title,
            description=quote.description,
            category="Creative services",
            currency=quote.currency,
            original_net_amount=quote.original_subtotal,
            exchange_rate_to_dkk=quote.exchange_rate_to_dkk,
            net_amount_dkk=quote.subtotal_dkk,
            vat_rate=0,
            vat_amount_dkk=0,
            gross_amount_dkk=quote.subtotal_dkk,
            status="draft",
            amount_paid_dkk=0,
            notes=f"Converted from quote {quote.quote_number}",
        )
        self.session.add(invoice)
        self.session.flush()
        AuditLogsRepository(self.session).record(
            "quote",
            str(quote.id),
            "convert",
            f"Converted {quote.quote_number} to invoice {invoice.invoice_number}",
        )
        return invoice
