from datetime import date, timedelta
from decimal import Decimal

from app.repositories.clients import ClientsRepository
from app.repositories.invoices import InvoicesRepository
from app.repositories.quotes import QuotesRepository


def seed_client(session):
    return ClientsRepository(session).create(client_code="C-0099", company_name="Fictional Client")


def test_quote_lifecycle_and_conversion(session):
    client = seed_client(session)
    quotes = QuotesRepository(session)
    quote = quotes.create(
        client_id=client.id,
        issue_date=date.today(),
        expiry_date=date.today() + timedelta(days=30),
        title="Workshop package",
        description="Fictional",
        currency="DKK",
        original_subtotal=Decimal("1000"),
        exchange_rate_to_dkk=Decimal("1"),
        subtotal_dkk=Decimal("1000"),
        notes="",
    )
    quotes.set_status(quote, "accepted")
    invoice = quotes.convert_to_invoice_draft(quote, date.today() + timedelta(days=14))
    session.commit()
    assert quote.status == "converted"
    assert invoice.status == "draft"


def test_invoice_send_and_payment_rules(session):
    client = seed_client(session)
    invoices = InvoicesRepository(session)
    invoice = invoices.create_draft(
        client_id=client.id,
        issue_date=date(2026, 8, 4),
        due_date=date(2026, 8, 18),
        title="Design fee",
        description="",
        category="Creative services",
        currency="DKK",
        original_net_amount=Decimal("500"),
        exchange_rate_to_dkk=Decimal("1"),
        net_amount_dkk=Decimal("500"),
        vat_rate=Decimal("0"),
        vat_amount_dkk=Decimal("0"),
        gross_amount_dkk=Decimal("500"),
        notes="",
    )
    invoices.mark_sent(invoice)
    session.commit()
    assert invoice.invoice_number.startswith("GF-2026-")
    try:
        invoices.record_payment(invoice, Decimal("600"), date.today())
    except ValueError as error:
        assert "exceeds" in str(error)
    else:
        raise AssertionError("Excessive payment should fail")
    invoices.record_payment(invoice, Decimal("200"), date.today())
    assert invoice.status == "partially_paid"
    invoices.record_payment(invoice, Decimal("300"), date.today())
    assert invoice.status == "paid"
