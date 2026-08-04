from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import Date, DateTime, ForeignKey, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Invoice(Base):
    __tablename__ = "invoices"
    id: Mapped[int] = mapped_column(primary_key=True)
    invoice_number: Mapped[str] = mapped_column(String(40), unique=True)
    client_id: Mapped[int] = mapped_column(ForeignKey("clients.id"))
    issue_date: Mapped[date] = mapped_column(Date, default=date.today)
    due_date: Mapped[date] = mapped_column(Date)
    title: Mapped[str] = mapped_column(String(250))
    description: Mapped[str] = mapped_column(Text, default="")
    category: Mapped[str] = mapped_column(String(100), default="Creative services")
    currency: Mapped[str] = mapped_column(String(3), default="DKK")
    original_net_amount: Mapped[Decimal] = mapped_column(Numeric(14, 2))
    exchange_rate_to_dkk: Mapped[Decimal] = mapped_column(Numeric(14, 6), default=1)
    net_amount_dkk: Mapped[Decimal] = mapped_column(Numeric(14, 2))
    vat_rate: Mapped[Decimal] = mapped_column(Numeric(5, 4), default=0)
    vat_amount_dkk: Mapped[Decimal] = mapped_column(Numeric(14, 2), default=0)
    gross_amount_dkk: Mapped[Decimal] = mapped_column(Numeric(14, 2))
    status: Mapped[str] = mapped_column(String(20), default="draft")
    amount_paid_dkk: Mapped[Decimal] = mapped_column(Numeric(14, 2), default=0)
    paid_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    document_path: Mapped[str] = mapped_column(Text, default="")
    notes: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.now, onupdate=datetime.now
    )
