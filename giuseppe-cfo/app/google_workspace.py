from __future__ import annotations

import os
from datetime import date
from decimal import Decimal
from pathlib import Path
from uuid import uuid4

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

from app.models import Client, Expense, Invoice

SCOPES = (
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
)
HEADERS = {
    "Clients": ["Client ID", "Name", "Email", "Address", "CVR", "Created at"],
    "Invoices": ["Number", "Issue date", "Due date", "Client ID", "Client name", "Net DKK", "VAT DKK", "Total DKK", "PDF URL"],
    "Expenses": ["Date", "Vendor", "Description", "Net DKK", "VAT DKK", "Category", "Receipt URL"],
}


class GoogleWorkspace:
    """The single persistence boundary for the accounting workbook and Drive."""

    def __init__(self, spreadsheet_id: str | None = None, folder_id: str | None = None) -> None:
        credential_path = os.environ["GOOGLE_APPLICATION_CREDENTIALS"]
        self.spreadsheet_id = spreadsheet_id or os.environ["ACCOUNTING_SPREADSHEET_ID"]
        self.folder_id = folder_id or os.environ["INVOICE_DRIVE_FOLDER_ID"]
        credentials = Credentials.from_service_account_file(credential_path, scopes=SCOPES)
        self.sheets = build("sheets", "v4", credentials=credentials, cache_discovery=False)
        self.drive = build("drive", "v3", credentials=credentials, cache_discovery=False)

    def ensure_workbook(self) -> None:
        metadata = self.sheets.spreadsheets().get(spreadsheetId=self.spreadsheet_id).execute()
        existing = {sheet["properties"]["title"] for sheet in metadata["sheets"]}
        missing = [name for name in HEADERS if name not in existing]
        if missing:
            self.sheets.spreadsheets().batchUpdate(
                spreadsheetId=self.spreadsheet_id,
                body={"requests": [{"addSheet": {"properties": {"title": name}}} for name in missing]},
            ).execute()
        for tab, header in HEADERS.items():
            values = self._values(f"{tab}!A1:Z1")
            if not values:
                self._append(tab, header)

    def _values(self, range_name: str) -> list[list[str]]:
        return self.sheets.spreadsheets().values().get(
            spreadsheetId=self.spreadsheet_id, range=range_name
        ).execute().get("values", [])

    def _append(self, tab: str, values: list[str]) -> None:
        self.sheets.spreadsheets().values().append(
            spreadsheetId=self.spreadsheet_id,
            range=f"{tab}!A:Z",
            valueInputOption="USER_ENTERED",
            insertDataOption="INSERT_ROWS",
            body={"values": [values]},
        ).execute()

    def add_client(self, name: str, email: str, address: str = "", cvr: str = "") -> Client:
        client = Client(uuid4().hex[:10], name.strip(), email.strip(), address.strip(), cvr.strip())
        self._append("Clients", [client.client_id, client.name, client.email, client.address, client.cvr, date.today().isoformat()])
        return client

    def list_clients(self) -> list[Client]:
        rows = self._values("Clients!A2:E")
        return [Client(*(row + [""] * 5)[:5]) for row in rows if len(row) >= 3]

    def add_expense(self, expense: Expense) -> None:
        self._append("Expenses", [
            expense.expense_date.isoformat(), expense.vendor, expense.description,
            str(expense.net_amount), str(expense.vat_amount), expense.category, expense.receipt_url,
        ])

    def add_invoice(self, invoice: Invoice) -> None:
        self._append("Invoices", [
            invoice.number, invoice.issue_date.isoformat(), invoice.due_date.isoformat(),
            invoice.client.client_id, invoice.client.name, str(invoice.net_amount),
            str(invoice.vat_amount), str(invoice.total_amount), invoice.pdf_url,
        ])

    def next_invoice_number(self) -> str:
        rows = self._values("Invoices!A2:A")
        numbers = [row[0] for row in rows if row]
        return f"INV-{date.today():%Y}-{len(numbers) + 1:04d}"

    def invoice_revenue(self) -> list[tuple[date, Decimal]]:
        rows = self._values("Invoices!A2:F")
        result: list[tuple[date, Decimal]] = []
        for row in rows:
            if len(row) >= 6:
                result.append((date.fromisoformat(row[1]), Decimal(row[5].replace(",", ""))))
        return result

    def upload_invoice_pdf(self, pdf_path: Path) -> str:
        from googleapiclient.http import MediaFileUpload

        metadata = {"name": pdf_path.name, "parents": [self.folder_id], "mimeType": "application/pdf"}
        uploaded = self.drive.files().create(
            body=metadata, media_body=MediaFileUpload(str(pdf_path), mimetype="application/pdf"), fields="webViewLink"
        ).execute()
        return uploaded["webViewLink"]
