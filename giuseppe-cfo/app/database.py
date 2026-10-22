from collections.abc import Generator
from pathlib import Path

from alembic import command
from alembic.config import Config
from alembic.runtime.migration import MigrationContext
from alembic.script import ScriptDirectory
from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.config import ensure_local_directories, project_paths


class Base(DeclarativeBase):
    pass


EXPECTED_TABLES = {
    "audit_logs",
    "business_settings",
    "clients",
    "documents",
    "expenses",
    "invoices",
    "quotes",
}


def resolved_database_url(database_url: str | None = None) -> str:
    return database_url or f"sqlite:///{ensure_local_directories(project_paths()).database}"


def local_database_path(database_url_value: str) -> Path | None:
    if database_url_value.startswith("sqlite:///"):
        return Path(database_url_value.replace("sqlite:///", "", 1))
    return None


def get_engine(database_url: str | None = None):
    url = resolved_database_url(database_url)
    return create_engine(
        url, connect_args={"check_same_thread": False} if url.startswith("sqlite") else {}
    )


def session_factory(database_url: str | None = None) -> sessionmaker[Session]:
    return sessionmaker(bind=get_engine(database_url), expire_on_commit=False)


def alembic_config(database_url_value: str) -> Config:
    config = Config(str(project_paths().root / "alembic.ini"))
    config.set_main_option("script_location", str(project_paths().root / "migrations"))
    config.set_main_option("sqlalchemy.url", database_url_value)
    return config


def schema_up_to_date(database_url_value: str) -> bool:
    config = alembic_config(database_url_value)
    head = ScriptDirectory.from_config(config).get_current_head()
    with get_engine(database_url_value).connect() as connection:
        current = MigrationContext.configure(connection).get_current_revision()
    return current == head


def _has_preexisting_schema(database_url_value: str) -> bool:
    inspector = inspect(get_engine(database_url_value))
    names = set(inspector.get_table_names())
    return EXPECTED_TABLES.issubset(names) and "alembic_version" not in names


def migrate_database(database_url: str | None = None, create_safety_backup: bool = True) -> None:
    url = resolved_database_url(database_url)
    db_path = local_database_path(url)
    if db_path is not None:
        db_path.parent.mkdir(parents=True, exist_ok=True)
    preexisting = db_path is not None and db_path.exists() and _has_preexisting_schema(url)
    if preexisting and create_safety_backup and db_path == project_paths().database:
        from app.services.backups import create_backup

        create_backup()
    config = alembic_config(url)
    if preexisting:
        command.stamp(config, "head")
    else:
        command.upgrade(config, "head")


def initialise_database(
    database_url: str | None = None, create_safety_backup: bool = False
) -> None:
    url = resolved_database_url(database_url)
    migrate_database(url, create_safety_backup=create_safety_backup)
    from app.repositories.settings import SettingsRepository

    with session_factory(url)() as session:
        SettingsRepository(session).get_or_create()


def session_scope(database_url: str | None = None) -> Generator[Session, None, None]:
    session = session_factory(database_url)()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
