from __future__ import annotations

from decimal import Decimal
from typing import List

from sqlalchemy import Select, func, select
from sqlalchemy.orm import Session

from app.models.client import Client
from app.models.invoice import Invoice
from app.models.quote import Quote
from app.repositories.audit_logs import AuditLogsRepository


class ClientsRepository:
    def __init__(self, session: Session):
        self.session = session

    def _base_query(self) -> Select[tuple[Client]]:
        return select(Client).order_by(Client.company_name)

    def list(
        self,
        include_inactive: bool = True,
        search: str = "",
        active_filter: str = "all",
    ) -> List[Client]:
        statement = self._base_query()
        if active_filter == "active":
            statement = statement.where(Client.is_active.is_(True))
        elif active_filter == "archived":
            statement = statement.where(Client.is_active.is_(False))
        elif not include_inactive:
            statement = statement.where(Client.is_active.is_(True))
        if search:
            pattern = f"%{search.strip()}%"
            statement = statement.where(
                Client.company_name.ilike(pattern)
                | Client.client_code.ilike(pattern)
                | Client.email.ilike(pattern)
            )
        return list(self.session.scalars(statement))

    def next_client_code(self) -> str:
        latest = self.session.scalar(select(func.max(Client.id))) or 0
        return f"C-{latest + 1:04d}"

    def exists_code(self, client_code: str, exclude_id: int | None = None) -> bool:
        statement = select(Client.id).where(Client.client_code == client_code)
        if exclude_id:
            statement = statement.where(Client.id != exclude_id)
        return self.session.scalar(statement) is not None

    def get(self, client_id: int) -> Client | None:
        return self.session.get(Client, client_id)

    def create(self, **values: object) -> Client:
        client = Client(**values)
        if self.exists_code(client.client_code):
            raise ValueError(f"Client code {client.client_code} already exists.")
        self.session.add(client)
        self.session.flush()
        AuditLogsRepository(self.session).record(
            "client",
            str(client.id),
            "create",
            f"Created client {client.client_code}",
        )
        return client

    def update(self, client: Client, **values: object) -> Client:
        new_code = str(values.get("client_code", client.client_code))
        if self.exists_code(new_code, exclude_id=client.id):
            raise ValueError(f"Client code {new_code} already exists.")
        for key, value in values.items():
            setattr(client, key, value)
        self.session.flush()
        AuditLogsRepository(self.session).record(
            "client",
            str(client.id),
            "update",
            f"Updated client {client.client_code}",
        )
        return client

    def archive(self, client: Client) -> None:
        client.is_active = False
        AuditLogsRepository(self.session).record(
            "client",
            str(client.id),
            "archive",
            f"Archived client {client.client_code}",
        )

    def restore(self, client: Client) -> None:
        client.is_active = True
        AuditLogsRepository(self.session).record(
            "client",
            str(client.id),
            "restore",
            f"Restored client {client.client_code}",
        )

    def related_quotes(self, client_id: int) -> List[Quote]:
        return list(
            self.session.scalars(
                select(Quote).where(Quote.client_id == client_id).order_by(Quote.issue_date.desc())
            )
        )

    def related_invoices(self, client_id: int) -> List[Invoice]:
        return list(
            self.session.scalars(
                select(Invoice)
                .where(Invoice.client_id == client_id)
                .order_by(Invoice.issue_date.desc())
            )
        )

    def outstanding_value(self, client_id: int) -> Decimal:
        invoices = self.related_invoices(client_id)
        return sum(
            (
                Decimal(str(item.gross_amount_dkk)) - Decimal(str(item.amount_paid_dkk))
                for item in invoices
            ),
            Decimal("0"),
        )

    def total_paid_revenue(self, client_id: int) -> Decimal:
        return sum(
            (
                Decimal(str(item.amount_paid_dkk))
                for item in self.related_invoices(client_id)
                if item.status in {"paid", "partially_paid"}
            ),
            Decimal("0"),
        )
