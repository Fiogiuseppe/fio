"""Expense-record operations."""

from app.google_workspace import GoogleWorkspace
from app.models import Expense


def record_expense(workspace: GoogleWorkspace, expense: Expense) -> None:
    workspace.add_expense(expense)
