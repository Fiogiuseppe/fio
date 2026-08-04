from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

from app.constants import CURRENCIES


class ClientInput(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    company_name: str = Field(min_length=1, max_length=200)
    contact_name: str = Field(default="", max_length=200)
    email: EmailStr | None = None
    telephone: str = Field(default="", max_length=50)
    billing_address: str = ""
    postal_code: str = Field(default="", max_length=30)
    city: str = Field(default="", max_length=100)
    country: str = Field(default="Denmark", max_length=100)
    vat_or_business_number: str = Field(default="", max_length=80)
    default_currency: str = "DKK"
    payment_terms_days: int = Field(default=14, ge=0, le=180)
    notes: str = ""

    @field_validator("default_currency")
    @classmethod
    def validate_currency(cls, value: str) -> str:
        if value not in CURRENCIES:
            raise ValueError(f"Currency must be one of: {', '.join(CURRENCIES)}")
        return value
