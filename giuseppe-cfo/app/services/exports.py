from datetime import datetime
from pathlib import Path

import pandas as pd
from sqlalchemy.orm import Session

from app.config import ensure_local_directories, project_paths
from app.models import Client, Expense, Invoice, Quote


def _frame(records: list[object]) -> pd.DataFrame:
    return pd.DataFrame([{column.name: getattr(record, column.name) for column in record.__table__.columns} for record in records])

def export_csv(session: Session, entity: str) -> Path:
    model = {"clients": Client, "quotes": Quote, "invoices": Invoice, "expenses": Expense}[entity]
    path = ensure_local_directories(project_paths()).exports / f"{entity}_{datetime.now():%Y-%m-%d_%H%M%S}.csv"
    _frame(list(session.query(model))).to_csv(path, index=False); return path

def export_excel(session: Session) -> Path:
    path = ensure_local_directories(project_paths()).exports / f"giuseppe_cfo_export_{datetime.now():%Y-%m-%d_%H%M%S}.xlsx"
    with pd.ExcelWriter(path, engine="openpyxl") as writer:
        for name, model in {"Clients": Client, "Quotes": Quote, "Invoices": Invoice, "Expenses": Expense}.items():
            _frame(list(session.query(model))).to_excel(writer, sheet_name=name, index=False)
        pd.DataFrame([{"Note": "Local planning export. Bank details intentionally excluded."}]).to_excel(writer, sheet_name="Dashboard", index=False)
    return path
