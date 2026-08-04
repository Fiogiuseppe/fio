from datetime import date
from decimal import Decimal

from sqlalchemy import Boolean, Date, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class BusinessSettings(Base):
    __tablename__ = "business_settings"
    id: Mapped[int] = mapped_column(primary_key=True)
    business_name: Mapped[str] = mapped_column(String(200), default="Giuseppe Fioretti")
    business_type: Mapped[str] = mapped_column(String(50), default="PMV")
    main_industry_code: Mapped[str] = mapped_column(String(30), default="74.12.00")
    main_industry_description: Mapped[str] = mapped_column(String(200), default="Graphic design and visual communication")
    start_date: Mapped[date] = mapped_column(Date, default=date(2026, 8, 4))
    business_address: Mapped[str] = mapped_column(String(250), default="")
    postal_code: Mapped[str] = mapped_column(String(30), default="")
    city: Mapped[str] = mapped_column(String(100), default="")
    country: Mapped[str] = mapped_column(String(100), default="Denmark")
    email: Mapped[str] = mapped_column(String(254), default="")
    telephone: Mapped[str] = mapped_column(String(50), default="")
    website: Mapped[str] = mapped_column(String(250), default="")
    cvr_number: Mapped[str] = mapped_column(String(50), default="")
    bank_name: Mapped[str] = mapped_column(String(150), default="")
    iban: Mapped[str] = mapped_column(String(50), default="")
    swift_bic: Mapped[str] = mapped_column(String(50), default="")
    accounting_currency: Mapped[str] = mapped_column(String(3), default="DKK")
    vat_registered: Mapped[bool] = mapped_column(Boolean, default=False)
    vat_threshold_dkk: Mapped[Decimal] = mapped_column(Numeric(14, 2), default=50000)
    tax_reserve_percentage: Mapped[Decimal] = mapped_column(Numeric(5, 2), default=40)
    invoice_prefix: Mapped[str] = mapped_column(String(20), default="GF")
    quote_prefix: Mapped[str] = mapped_column(String(20), default="Q")
    next_invoice_sequence: Mapped[int] = mapped_column(default=1)
    next_quote_sequence: Mapped[int] = mapped_column(default=1)
