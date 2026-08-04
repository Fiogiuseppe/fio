from sqlalchemy.orm import Session

from app.models.settings import BusinessSettings


class SettingsRepository:
    def __init__(self, session: Session): self.session = session
    def get_or_create(self) -> BusinessSettings:
        settings = self.session.query(BusinessSettings).first()
        if not settings:
            settings = BusinessSettings(); self.session.add(settings); self.session.commit()
        return settings
