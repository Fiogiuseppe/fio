from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


class AuditLogsRepository:
    def __init__(self, session: Session): self.session = session
    def record(self, entity_type: str, entity_identifier: str, action: str, summary: str) -> AuditLog:
        record = AuditLog(entity_type=entity_type, entity_identifier=entity_identifier, action=action, summary=summary)
        self.session.add(record); return record
