from datetime import date
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

from app.constants import CURRENCIES


class SettingsInput(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    business_name: str = Field(min_length=1, max_length=200)
    business_type: str = Field(min_length=1, max_length=50)
    main_industry_code: str = Field(min_length=1, max_length=30)
    main_industry_description: str = Field(min_length=1, max_length=200)
    start_date: date
    business_address: str = ""
    postal_code: str = ""
    city: str = ""
    country: str = "Denmark"
    email: EmailStr | None = None
    telephone: str = ""
    website: str = ""
    cvr_number: str = ""
    bank_name: str = ""
    iban: str = ""
    swift_bic: str = ""
    accounting_currency: str = "DKK"
    vat_registered: bool = False
    vat_threshold_dkk: Decimal = Field(default=Decimal("50000"), gt=0)
    tax_reserve_percentage: Decimal = Field(default=Decimal("40"), ge=0, le=100)
    invoice_prefix: str = Field(min_length=1, max_length=20)
    quote_prefix: str = Field(min_length=1, max_length=20)

    @field_validator("accounting_currency")
    @classmethod
    def validate_currency(cls, value: str) -> str:
        if value not in CURRENCIES:
            raise ValueError(f"Currency must be one of: {', '.join(CURRENCIES)}")
        return value
