from datetime import date, timedelta
from decimal import Decimal

from app.database import initialise_database, session_factory
from app.repositories.clients import ClientsRepository
from app.repositories.expenses import ExpensesRepository
from app.repositories.invoices import InvoicesRepository
from app.repositories.quotes import QuotesRepository


def create_demo_data() -> None:
    initialise_database(create_safety_backup=True)
    session = session_factory()()
    clients = ClientsRepository(session)
    # Keep seeding idempotent by checking client code existence
    if clients.exists_code("C-DEMO-001"):
        session.close()
        return
    client = clients.create(
        client_code="C-DEMO-001",
        company_name="Nordic Fictional Studio",
        contact_name="Alex Demo",
        email="alex.demo@example.com",
        city="Copenhagen",
        default_currency="DKK",
    )
    quotes = QuotesRepository(session)
    quote = quotes.create(
        client_id=client.id,
        issue_date=date.today() - timedelta(days=12),
        expiry_date=date.today() + timedelta(days=18),
        title="Brand identity package",
        description="Fictional demo quote",
        currency="DKK",
        original_subtotal=Decimal("18000"),
        exchange_rate_to_dkk=Decimal("1"),
        subtotal_dkk=Decimal("18000"),
        notes="Demo only",
    )
    quotes.set_status(quote, "accepted")
    invoice = quotes.convert_to_invoice_draft(quote, date.today() + timedelta(days=14))
    invoices = InvoicesRepository(session)
    invoices.mark_sent(invoice)
    invoices.record_payment(invoice, Decimal("6000"), date.today() - timedelta(days=2))
    expenses = ExpensesRepository(session)
    expenses.create(
        expense_date=date.today() - timedelta(days=6),
        supplier="Fictional Software Vendor",
        description="Design suite subscription",
        category="Software",
        currency="DKK",
        original_amount=Decimal("799"),
        exchange_rate_to_dkk=Decimal("1"),
        amount_dkk=Decimal("799"),
        business_use_percentage=Decimal("100"),
        deductible_planning_amount_dkk=Decimal("799"),
        payment_method="Card",
        receipt_path="",
        notes="Demo record",
    )
    session.commit()
    session.close()


if __name__ == "__main__":
    create_demo_data()
    print("Demo data created (if not already present).")
