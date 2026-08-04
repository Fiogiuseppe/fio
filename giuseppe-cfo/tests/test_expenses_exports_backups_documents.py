from datetime import date
from decimal import Decimal

from app.config import Paths
from app.repositories.expenses import ExpensesRepository
from app.services.backups import create_backup, restore_backup, validate_backup_zip
from app.services.documents import path_exists, validate_local_document_path
from app.services.exports import export_csv, export_excel


def test_expense_currency_and_archive_restore(session):
    repo = ExpensesRepository(session)
    expense = repo.create(
        expense_date=date.today(),
        supplier="Vendor",
        description="Software",
        category="Software",
        currency="EUR",
        original_amount=Decimal("100"),
        exchange_rate_to_dkk=Decimal("7.45"),
        amount_dkk=Decimal("745"),
        business_use_percentage=Decimal("100"),
        deductible_planning_amount_dkk=Decimal("745"),
        payment_method="Card",
        receipt_path="",
        notes="",
    )
    repo.archive(expense)
    repo.restore(expense)
    assert repo.get(expense.id).is_archived is False


def test_exports_generate_files(session):
    clients_csv = export_csv(session, "clients")
    assert clients_csv.exists()
    workbook = export_excel(session)
    assert workbook.exists()


def test_backup_and_restore(tmp_path):
    root = tmp_path / "project"
    paths = Paths(root=root)
    (root / "data/private").mkdir(parents=True)
    (root / "documents/invoices").mkdir(parents=True)
    (root / "data/private/giuseppe_cfo.sqlite3").write_text("db")
    (root / "documents/invoices/sample.txt").write_text("invoice")
    backup = create_backup(paths)
    validate_backup_zip(backup)
    (root / "data/private/giuseppe_cfo.sqlite3").write_text("modified")
    safety = restore_backup(backup, "RESTORE", paths=paths)
    assert safety.exists()
    assert (root / "data/private/giuseppe_cfo.sqlite3").read_text() == "db"


def test_document_path_validation(tmp_path):
    file = tmp_path / "receipt.pdf"
    file.write_text("x")
    assert validate_local_document_path(str(file)) == file
    assert path_exists(str(file))
    assert not path_exists(str(tmp_path / "missing.pdf"))
