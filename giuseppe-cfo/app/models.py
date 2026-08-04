from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from decimal import Decimal


@dataclass(frozen=True)
class Client:
    client_id: str
    name: str
    email: str
    address: str = ""
    cvr: str = ""


@dataclass(frozen=True)
class Expense:
    expense_date: date
    vendor: str
    description: str
    net_amount: Decimal
    vat_amount: Decimal
    category: str
    receipt_url: str = ""


@dataclass(frozen=True)
class InvoiceLine:
    description: str
    quantity: Decimal
    unit_price: Decimal
    vat_rate: Decimal = Decimal("0.25")

    @property
    def net_amount(self) -> Decimal:
        return self.quantity * self.unit_price

    @property
    def vat_amount(self) -> Decimal:
        return self.net_amount * self.vat_rate


@dataclass(frozen=True)
class Invoice:
    number: str
    issue_date: date
    due_date: date
    client: Client
    lines: list[InvoiceLine]
    pdf_url: str = ""

    @property
    def net_amount(self) -> Decimal:
        return sum((line.net_amount for line in self.lines), Decimal("0"))

    @property
    def vat_amount(self) -> Decimal:
        return sum((line.vat_amount for line in self.lines), Decimal("0"))

    @property
    def total_amount(self) -> Decimal:
        return self.net_amount + self.vat_amount
