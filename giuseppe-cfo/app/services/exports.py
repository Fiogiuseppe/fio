from datetime import datetime
from pathlib import Path
from typing import Any

import pandas as pd
from sqlalchemy.orm import Session

from app.config import ensure_local_directories, project_paths
from app.models import BusinessSettings, Client, Expense, Invoice, Quote
from app.services.accounting import estimated_profit, gross_turnover, total_expenses


def _frame(records: list[Any]) -> pd.DataFrame:
    return pd.DataFrame(
        [
            {column.name: getattr(record, column.name) for column in record.__table__.columns}
            for record in records
        ]
    )


def export_csv(session: Session, entity: str) -> Path:
    model = {"clients": Client, "quotes": Quote, "invoices": Invoice, "expenses": Expense}[entity]
    path = (
        ensure_local_directories(project_paths()).exports
        / f"{entity}_{datetime.now():%Y-%m-%d_%H%M%S}.csv"
    )
    _frame(list(session.query(model))).to_csv(path, index=False)
    return path


def export_excel(session: Session) -> Path:
    path = (
        ensure_local_directories(project_paths()).exports
        / f"giuseppe_cfo_export_{datetime.now():%Y-%m-%d_%H%M%S}.xlsx"
    )
    with pd.ExcelWriter(path, engine="openpyxl") as writer:
        for name, model in {
            "Clients": Client,
            "Quotes": Quote,
            "Invoices": Invoice,
            "Expenses": Expense,
        }.items():
            _frame(list(session.query(model))).to_excel(writer, sheet_name=name, index=False)
        invoices = list(session.query(Invoice))
        expenses = list(session.query(Expense))
        turnover = gross_turnover(invoices)
        costs = total_expenses(expenses)
        dashboard = pd.DataFrame(
            [
                {"Metric": "Gross turnover DKK", "Value": str(turnover)},
                {"Metric": "Expenses DKK", "Value": str(costs)},
                {"Metric": "Estimated profit DKK", "Value": str(estimated_profit(turnover, costs))},
                {"Metric": "Note", "Value": "Planning tool only — not tax or accounting advice."},
            ]
        )
        dashboard.to_excel(writer, sheet_name="Dashboard", index=False)
        settings = session.query(BusinessSettings).first()
        settings_summary = pd.DataFrame(
            [
                {
                    "business_name": settings.business_name if settings else "",
                    "business_type": settings.business_type if settings else "",
                    "accounting_currency": settings.accounting_currency if settings else "DKK",
                    "vat_registered": settings.vat_registered if settings else False,
                    "vat_threshold_dkk": str(settings.vat_threshold_dkk) if settings else "50000",
                    "tax_reserve_percentage": str(settings.tax_reserve_percentage)
                    if settings
                    else "40",
                    "invoice_prefix": settings.invoice_prefix if settings else "GF",
                    "quote_prefix": settings.quote_prefix if settings else "Q",
                    "note": "Bank fields intentionally excluded.",
                }
            ]
        )
        settings_summary.to_excel(writer, sheet_name="Settings summary", index=False)
        pd.DataFrame(
            [{"Generated at": datetime.now().isoformat(timespec="seconds"), "Rows": len(invoices)}]
        ).to_excel(writer, sheet_name="Reports summary", index=False)
    return path
