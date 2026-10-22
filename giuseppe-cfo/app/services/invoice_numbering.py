from datetime import date

from sqlalchemy.orm import Session

from app.models.settings import BusinessSettings


def next_invoice_number(session: Session, issued_on: date | None = None) -> str:
    settings = session.query(BusinessSettings).one()
    year = (issued_on or date.today()).year
    number = f"{settings.invoice_prefix}-{year}-{settings.next_invoice_sequence:03d}"
    settings.next_invoice_sequence += 1
    return number


def next_quote_number(session: Session, issued_on: date | None = None) -> str:
    settings = session.query(BusinessSettings).one()
    year = (issued_on or date.today()).year
    number = f"{settings.quote_prefix}-{year}-{settings.next_quote_sequence:03d}"
    settings.next_quote_sequence += 1
    return number
