from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.config import ensure_local_directories, project_paths


class Base(DeclarativeBase):
    pass


def get_engine(database_url: str | None = None):
    url = database_url or f"sqlite:///{ensure_local_directories(project_paths()).database}"
    return create_engine(url, connect_args={"check_same_thread": False} if url.startswith("sqlite") else {})


def session_factory(database_url: str | None = None) -> sessionmaker[Session]:
    return sessionmaker(bind=get_engine(database_url), expire_on_commit=False)


def initialise_database(database_url: str | None = None) -> None:
    from app.models import (  # noqa: F401
        audit_log,
        client,
        document,
        expense,
        invoice,
        quote,
        settings,
    )
    Base.metadata.create_all(get_engine(database_url))
    from app.repositories.settings import SettingsRepository
    with session_factory(database_url)() as session:
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
