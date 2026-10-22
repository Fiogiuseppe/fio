from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import Date, DateTime, ForeignKey, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Quote(Base):
    __tablename__ = "quotes"
    id: Mapped[int] = mapped_column(primary_key=True)
    quote_number: Mapped[str] = mapped_column(String(40), unique=True)
    client_id: Mapped[int] = mapped_column(ForeignKey("clients.id"))
    issue_date: Mapped[date] = mapped_column(Date, default=date.today)
    expiry_date: Mapped[date] = mapped_column(Date)
    title: Mapped[str] = mapped_column(String(250))
    description: Mapped[str] = mapped_column(Text, default="")
    currency: Mapped[str] = mapped_column(String(3), default="DKK")
    original_subtotal: Mapped[Decimal] = mapped_column(Numeric(14, 2))
    exchange_rate_to_dkk: Mapped[Decimal] = mapped_column(Numeric(14, 6), default=1)
    subtotal_dkk: Mapped[Decimal] = mapped_column(Numeric(14, 2))
    status: Mapped[str] = mapped_column(String(20), default="draft")
    document_path: Mapped[str] = mapped_column(Text, default="")
    notes: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now, onupdate=datetime.now
    )
