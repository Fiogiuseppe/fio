from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Client(Base):
    __tablename__ = "clients"
    id: Mapped[int] = mapped_column(primary_key=True)
    client_code: Mapped[str] = mapped_column(String(30), unique=True)
    company_name: Mapped[str] = mapped_column(String(200))
    contact_name: Mapped[str] = mapped_column(String(200), default="")
    email: Mapped[str] = mapped_column(String(254), default="")
    telephone: Mapped[str] = mapped_column(String(50), default="")
    billing_address: Mapped[str] = mapped_column(Text, default="")
    postal_code: Mapped[str] = mapped_column(String(30), default="")
    city: Mapped[str] = mapped_column(String(100), default="")
    country: Mapped[str] = mapped_column(String(100), default="Denmark")
    vat_or_business_number: Mapped[str] = mapped_column(String(80), default="")
    default_currency: Mapped[str] = mapped_column(String(3), default="DKK")
    payment_terms_days: Mapped[int] = mapped_column(Integer, default=14)
    notes: Mapped[str] = mapped_column(Text, default="")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
