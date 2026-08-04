from decimal import Decimal

from app.services.accounting import (
    business_use_amount,
    convert_to_dkk,
    estimated_profit,
    remaining_threshold,
    suggested_tax_reserve,
    threshold_percentage,
    threshold_warning,
)


def test_calculations_use_decimal():
    assert convert_to_dkk(Decimal("10"), Decimal("7.5")) == Decimal("75.00")
    assert business_use_amount(Decimal("100"), Decimal("60")) == Decimal("60.00")
    assert estimated_profit(Decimal("200"), Decimal("50")) == Decimal("150.00")
    assert suggested_tax_reserve(Decimal("150"), Decimal("40")) == Decimal("60.00")
def test_threshold_states():
    assert threshold_percentage(Decimal("35000"), Decimal("50000")) == Decimal("70.00")
    assert remaining_threshold(Decimal("35000"), Decimal("50000")) == Decimal("15000.00")
    assert threshold_warning(Decimal("70")) == "Watch closely"
