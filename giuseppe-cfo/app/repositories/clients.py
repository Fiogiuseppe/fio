from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.client import Client


class ClientsRepository:
    def __init__(self, session: Session): self.session = session
    def list(self, include_inactive: bool = False) -> list[Client]:
        statement = select(Client).order_by(Client.company_name)
        if not include_inactive: statement = statement.where(Client.is_active.is_(True))
        return list(self.session.scalars(statement))
    def get(self, client_id: int) -> Client | None: return self.session.get(Client, client_id)
    def create(self, **values: object) -> Client:
        client = Client(**values)
        self.session.add(client); self.session.flush()
        return client
    def archive(self, client: Client) -> None: client.is_active = False
