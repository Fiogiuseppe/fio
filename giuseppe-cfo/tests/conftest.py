import pytest

from app.database import initialise_database, session_factory


@pytest.fixture()
def session(tmp_path):
    url = f"sqlite:///{tmp_path / 'test.sqlite3'}"
    initialise_database(url)
    factory = session_factory(url)
    with factory() as value:
        yield value
