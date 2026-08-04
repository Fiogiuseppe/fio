from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.quote import Quote
from app.repositories.audit_logs import AuditLogsRepository
from app.services.invoice_numbering import next_quote_number


class QuotesRepository:
    def __init__(self, session: Session):
        self.session = session

    def list(self) -> list[Quote]:
        return list(self.session.scalars(select(Quote).order_by(Quote.issue_date.desc())))

    def create(self, **values: object) -> Quote:
        issued_on = values.get("issue_date")
        quote = Quote(
            quote_number=next_quote_number(
                self.session, issued_on if isinstance(issued_on, date) else None
            ),
            **values,
        )
        self.session.add(quote)
        self.session.flush()
        AuditLogsRepository(self.session).record(
            "quote", str(quote.id), "create", f"Created {quote.quote_number}"
        )
        return quote
