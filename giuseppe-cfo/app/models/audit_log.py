from datetime import datetime

from sqlalchemy import DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"
    id: Mapped[int] = mapped_column(primary_key=True)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    entity_type: Mapped[str] = mapped_column(String(50))
    entity_identifier: Mapped[str] = mapped_column(String(100))
    action: Mapped[str] = mapped_column(String(20))
    summary: Mapped[str] = mapped_column(Text)
