"""Configuration loaded from environment variables."""

from dataclasses import dataclass
import os


@dataclass(frozen=True)
class Settings:
    spreadsheet_id: str
    invoice_drive_folder_id: str
    openai_model: str = "gpt-4.1-mini"
    payment_terms_days: int = 14


def settings() -> Settings:
    return Settings(
        spreadsheet_id=os.environ["ACCOUNTING_SPREADSHEET_ID"],
        invoice_drive_folder_id=os.environ["INVOICE_DRIVE_FOLDER_ID"],
        openai_model=os.getenv("OPENAI_MODEL", "gpt-4.1-mini"),
        payment_terms_days=int(os.getenv("PAYMENT_TERMS_DAYS", "14")),
    )
