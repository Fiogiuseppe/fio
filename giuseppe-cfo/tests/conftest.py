import pytest

from app.database import (
    initialise_database,
    resolved_database_url,
    schema_up_to_date,
    session_factory,
)


@pytest.fixture()
def session(tmp_path):
    url = f"sqlite:///{tmp_path / 'test.sqlite3'}"
    initialise_database(url)
    factory = session_factory(url)
    with factory() as value:
        yield value


@pytest.fixture()
def sqlite_url(tmp_path) -> str:
    return f"sqlite:///{tmp_path / 'test.sqlite3'}"


def test_temp_database_migrates(sqlite_url):
    initialise_database(sqlite_url)
    assert schema_up_to_date(sqlite_url)
    assert resolved_database_url(sqlite_url) == sqlite_url
