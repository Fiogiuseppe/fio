from __future__ import annotations

from datetime import date, timedelta
from decimal import Decimal
from typing import Iterable

VAT_REGISTRATION_THRESHOLD = Decimal("50000")


def rolling_revenue(invoices: Iterable[tuple[date, Decimal]], as_of: date | None = None) -> Decimal:
    """Return net revenue issued during the preceding 12 months."""
    as_of = as_of or date.today()
    start = as_of - timedelta(days=365)
    return sum(
        (amount for issued, amount in invoices if start <= issued <= as_of),
        Decimal("0"),
    )


def vat_status(invoices: Iterable[tuple[date, Decimal]], as_of: date | None = None) -> dict[str, Decimal | bool]:
    revenue = rolling_revenue(invoices, as_of)
    remaining = max(Decimal("0"), VAT_REGISTRATION_THRESHOLD - revenue)
    return {
        "rolling_revenue": revenue,
        "threshold": VAT_REGISTRATION_THRESHOLD,
        "remaining": remaining,
        "registration_required": revenue >= VAT_REGISTRATION_THRESHOLD,
    }
