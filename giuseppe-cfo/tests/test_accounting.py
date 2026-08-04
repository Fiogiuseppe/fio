from datetime import date, timedelta
from decimal import Decimal

from app.accounting import VAT_REGISTRATION_THRESHOLD, rolling_revenue, vat_status


def test_rolling_revenue_uses_last_twelve_months() -> None:
    today = date(2026, 8, 4)
    invoices = [
        (today - timedelta(days=1), Decimal("12500")),
        (today - timedelta(days=365), Decimal("500")),
        (today - timedelta(days=366), Decimal("999")),
    ]
    assert rolling_revenue(invoices, today) == Decimal("13000")


def test_vat_status_marks_threshold_as_reached() -> None:
    today = date(2026, 8, 4)
    status = vat_status([(today, VAT_REGISTRATION_THRESHOLD)], today)
    assert status["registration_required"] is True
    assert status["remaining"] == Decimal("0")
