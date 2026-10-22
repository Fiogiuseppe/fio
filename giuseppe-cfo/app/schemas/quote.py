from datetime import date
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.constants import CURRENCIES
from app.services.accounting import convert_to_dkk


class QuoteInput(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    client_id: int
    issue_date: date
    expiry_date: date
    title: str = Field(min_length=1, max_length=250)
    description: str = ""
    currency: str = "DKK"
    original_subtotal: Decimal = Field(ge=0)
    exchange_rate_to_dkk: Decimal = Field(default=Decimal("1"), gt=0)
    notes: str = ""

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

    def subtotal_dkk(self) -> Decimal:
        return convert_to_dkk(self.original_subtotal, self.exchange_rate_to_dkk)
