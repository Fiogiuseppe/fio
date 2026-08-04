from datetime import date

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.expense import Expense
from app.repositories.audit_logs import AuditLogsRepository


class ExpensesRepository:
    def __init__(self, session: Session):
        self.session = session

    def list(
        self,
        include_archived: bool = True,
        search: str = "",
        supplier: str = "",
        category: str = "",
    ) -> list[Expense]:
        statement = select(Expense).order_by(Expense.expense_date.desc())
        if not include_archived:
            statement = statement.where(Expense.is_archived.is_(False))
        if search:
            pattern = f"%{search}%"
            statement = statement.where(
                Expense.description.ilike(pattern)
                | Expense.supplier.ilike(pattern)
                | Expense.expense_number.ilike(pattern)
            )
        if supplier:
            statement = statement.where(Expense.supplier == supplier)
        if category:
            statement = statement.where(Expense.category == category)
        return list(self.session.scalars(statement))

    def get(self, expense_id: int) -> Expense | None:
        return self.session.get(Expense, expense_id)

    def next_expense_number(self, expense_year: int) -> str:
        count = (
            self.session.query(Expense)
            .filter(Expense.expense_number.like(f"EXP-{expense_year}-%"))
            .count()
        )
        return f"EXP-{expense_year}-{count + 1:03d}"

    def create(self, **values: object) -> Expense:
        expense_date = values.get("expense_date")
        if not isinstance(expense_date, date):
            raise ValueError("expense_date must be a date.")
        number = self.next_expense_number(expense_date.year)
        expense = Expense(expense_number=number, is_archived=False, **values)
        self.session.add(expense)
        self.session.flush()
        AuditLogsRepository(self.session).record(
            "expense", str(expense.id), "create", f"Created {number}"
        )
        return expense

    def update(self, expense: Expense, **values: object) -> Expense:
        for key, value in values.items():
            setattr(expense, key, value)
        self.session.flush()
        AuditLogsRepository(self.session).record(
            "expense", str(expense.id), "update", f"Updated {expense.expense_number}"
        )
        return expense

    def archive(self, expense: Expense) -> Expense:
        expense.is_archived = True
        AuditLogsRepository(self.session).record(
            "expense", str(expense.id), "archive", f"Archived {expense.expense_number}"
        )
        return expense

    def restore(self, expense: Expense) -> Expense:
        expense.is_archived = False
        AuditLogsRepository(self.session).record(
            "expense", str(expense.id), "restore", f"Restored {expense.expense_number}"
        )
        return expense
