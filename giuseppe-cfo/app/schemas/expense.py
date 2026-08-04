from datetime import date
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.constants import CURRENCIES, EXPENSE_CATEGORIES
from app.services.accounting import business_use_amount, convert_to_dkk


class ExpenseInput(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    expense_date: date
    supplier: str = Field(min_length=1, max_length=200)
    description: str = ""
    category: str = "Other"
    currency: str = "DKK"
    original_amount: Decimal = Field(ge=0)
    exchange_rate_to_dkk: Decimal = Field(default=Decimal("1"), gt=0)
    business_use_percentage: Decimal = Field(default=Decimal("100"), ge=0, le=100)
    payment_method: str = ""
    receipt_path: str = ""
    notes: str = ""

    @field_validator("category")
    @classmethod
    def validate_category(cls, value: str) -> str:
        if value not in EXPENSE_CATEGORIES:
            raise ValueError("Unknown expense category.")
        return value

    @field_validator("currency")
    @classmethod
    def validate_currency(cls, value: str) -> str:
        if value not in CURRENCIES:
            raise ValueError(f"Currency must be one of: {', '.join(CURRENCIES)}")
        return value

    @field_validator("exchange_rate_to_dkk")
    @classmethod
    def validate_dkk_rate(cls, value: Decimal, info) -> Decimal:
        if info.data.get("currency") == "DKK" and value != Decimal("1"):
            raise ValueError("Exchange rate must be 1 for DKK.")
        return value

    def amount_dkk(self) -> Decimal:
        return convert_to_dkk(self.original_amount, self.exchange_rate_to_dkk)

    def deductible_planning_amount_dkk(self) -> Decimal:
        return business_use_amount(self.amount_dkk(), self.business_use_percentage)
