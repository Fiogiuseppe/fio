from sqlalchemy.orm import Session

from app.models.settings import BusinessSettings
from app.repositories.audit_logs import AuditLogsRepository


class SettingsRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_or_create(self) -> BusinessSettings:
        settings = self.session.query(BusinessSettings).first()
        if not settings:
            settings = BusinessSettings()
            self.session.add(settings)
            self.session.commit()
        return settings

    def update(self, settings: BusinessSettings, **values: object) -> BusinessSettings:
        notable = []
        for key, value in values.items():
            previous = getattr(settings, key)
            setattr(settings, key, value)
            if previous != value and key in {
                "business_name",
                "vat_registered",
                "vat_threshold_dkk",
                "tax_reserve_percentage",
                "invoice_prefix",
                "quote_prefix",
            }:
                notable.append(key)
        self.session.flush()
        if notable:
            AuditLogsRepository(self.session).record(
                "settings",
                str(settings.id),
                "update",
                f"Updated settings fields: {', '.join(sorted(notable))}",
            )
        return settings
