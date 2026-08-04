from collections import defaultdict
from datetime import date
from decimal import ROUND_HALF_UP, Decimal
from typing import Any, Iterable

ZERO = Decimal("0")


def money(value: Decimal | int | str) -> Decimal:
    return Decimal(str(value)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)


def convert_to_dkk(amount: Decimal, rate_to_dkk: Decimal) -> Decimal:
    return money(amount * rate_to_dkk)


def business_use_amount(amount: Decimal, percentage: Decimal) -> Decimal:
    return money(amount * percentage / 100)


def gross_turnover(invoices: Iterable[Any]) -> Decimal:
    return money(
        sum((Decimal(str(i.net_amount_dkk)) for i in invoices if i.status != "cancelled"), ZERO)
    )


def total_expenses(expenses: Iterable[Any]) -> Decimal:
    return money(
        sum(
            (Decimal(str(e.deductible_planning_amount_dkk)) for e in expenses if not e.is_archived),
            ZERO,
        )
    )


def estimated_profit(turnover: Decimal, expenses: Decimal) -> Decimal:
    return money(turnover - expenses)


def suggested_tax_reserve(profit: Decimal, percent: Decimal) -> Decimal:
    return money(max(profit, ZERO) * percent / 100)


def outstanding_invoices(invoices: Iterable[Any]) -> Decimal:
    return money(
        sum(
            (
                max(Decimal(str(i.gross_amount_dkk)) - Decimal(str(i.amount_paid_dkk)), ZERO)
                for i in invoices
                if i.status not in ("paid", "cancelled")
            ),
            ZERO,
        )
    )


def overdue_invoices(invoices: Iterable[Any], today: date | None = None) -> list[Any]:
    today = today or date.today()
    return [i for i in invoices if i.due_date < today and i.status not in ("paid", "cancelled")]


def threshold_percentage(turnover: Decimal, threshold: Decimal) -> Decimal:
    return money(turnover * 100 / threshold) if threshold else ZERO


def remaining_threshold(turnover: Decimal, threshold: Decimal) -> Decimal:
    return money(max(threshold - turnover, ZERO))


def threshold_warning(percent: Decimal) -> str:
    if percent < 70:
        return "Comfortable"
    if percent < 90:
        return "Watch closely"
    if percent < 100:
        return "Prepare registration change"
    return "Immediate attention required"


def monthly_totals(records: Iterable[Any], amount_field: str) -> dict[str, Decimal]:
    result: dict[str, Decimal] = defaultdict(lambda: ZERO)
    for record in records:
        record_date = getattr(record, "issue_date", getattr(record, "expense_date", None))
        if record_date is None:
            continue
        result[record_date.strftime("%Y-%m")] += Decimal(str(getattr(record, amount_field)))
    return {key: money(value) for key, value in result.items()}


def category_totals(invoices: Iterable[Any]) -> dict[str, Decimal]:
    result: dict[str, Decimal] = defaultdict(lambda: ZERO)
    for invoice in invoices:
        result[invoice.category] += Decimal(str(invoice.net_amount_dkk))
    return {key: money(value) for key, value in result.items()}
