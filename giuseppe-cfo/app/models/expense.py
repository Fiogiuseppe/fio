from datetime import date, datetime
from decimal import Decimal

from sqlalchemy import Date, DateTime, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Expense(Base):
    __tablename__ = "expenses"
    id: Mapped[int] = mapped_column(primary_key=True)
    expense_number: Mapped[str] = mapped_column(String(40), unique=True)
    expense_date: Mapped[date] = mapped_column(Date, default=date.today)
    supplier: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(Text, default="")
    category: Mapped[str] = mapped_column(String(100), default="Other")
    currency: Mapped[str] = mapped_column(String(3), default="DKK")
    original_amount: Mapped[Decimal] = mapped_column(Numeric(14, 2))
    exchange_rate_to_dkk: Mapped[Decimal] = mapped_column(Numeric(14, 6), default=1)
    amount_dkk: Mapped[Decimal] = mapped_column(Numeric(14, 2))
    business_use_percentage: Mapped[Decimal] = mapped_column(Numeric(5, 2), default=100)
    deductible_planning_amount_dkk: Mapped[Decimal] = mapped_column(Numeric(14, 2))
    payment_method: Mapped[str] = mapped_column(String(100), default="")
    receipt_path: Mapped[str] = mapped_column(Text, default="")
    notes: Mapped[str] = mapped_column(Text, default="")
    is_archived: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
