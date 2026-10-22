from datetime import datetime

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog


class AuditLogsRepository:
    def __init__(self, session: Session):
        self.session = session

    def record(
        self, entity_type: str, entity_identifier: str, action: str, summary: str
    ) -> AuditLog:
        record = AuditLog(
            entity_type=entity_type,
            entity_identifier=entity_identifier,
            action=action,
            summary=summary,
        )
        self.session.add(record)
        return record

    def list(
        self,
        entity_type: str = "",
        action: str = "",
        start: datetime | None = None,
        end: datetime | None = None,
        limit: int = 500,
    ) -> list[AuditLog]:
        statement = select(AuditLog).order_by(AuditLog.timestamp.desc()).limit(limit)
        if entity_type:
            statement = statement.where(AuditLog.entity_type == entity_type)
        if action:
            statement = statement.where(AuditLog.action == action)
        if start:
            statement = statement.where(AuditLog.timestamp >= start)
        if end:
            statement = statement.where(AuditLog.timestamp <= end)
        return list(self.session.scalars(statement))
