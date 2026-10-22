from datetime import date

from app.services.invoice_numbering import next_invoice_number, next_quote_number


def test_sequences_progress(session):
    assert next_invoice_number(session, date(2026, 8, 4)) == "GF-2026-001"
    assert next_invoice_number(session, date(2026, 8, 4)) == "GF-2026-002"
    assert next_quote_number(session, date(2026, 8, 4)) == "Q-2026-001"
