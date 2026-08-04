from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.expense import Expense
from app.repositories.audit_logs import AuditLogsRepository


class ExpensesRepository:
    def __init__(self, session: Session): self.session = session
    def list(self) -> list[Expense]: return list(self.session.scalars(select(Expense).order_by(Expense.expense_date.desc())))
    def create(self, **values: object) -> Expense:
        number = f"EXP-{values['expense_date']:%Y}-{self.session.query(Expense).count() + 1:03d}"
        expense = Expense(expense_number=number, **values); self.session.add(expense); self.session.flush()
        AuditLogsRepository(self.session).record("expense", str(expense.id), "create", f"Created {number}")
        return expense
