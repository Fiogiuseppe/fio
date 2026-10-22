from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.document import Document
from app.repositories.audit_logs import AuditLogsRepository


class DocumentsRepository:
    def __init__(self, session: Session):
        self.session = session

    def list(self, document_type: str = "", related_entity_type: str = "") -> list[Document]:
        statement = select(Document).order_by(Document.created_at.desc())
        if document_type:
            statement = statement.where(Document.document_type == document_type)
        if related_entity_type:
            statement = statement.where(Document.related_entity_type == related_entity_type)
        return list(self.session.scalars(statement))

    def create(self, **values: object) -> Document:
        document = Document(**values)
        self.session.add(document)
        self.session.flush()
        AuditLogsRepository(self.session).record(
            "document",
            str(document.id),
            "create",
            f"Registered {document.document_type} path",
        )
        return document
