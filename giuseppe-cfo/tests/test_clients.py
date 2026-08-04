from app.repositories.clients import ClientsRepository


def test_creates_client(session):
    client = ClientsRepository(session).create(
        client_code="C-0001", company_name="Fictional Studio"
    )
    assert client.id


def test_duplicate_client_code_rejected(session):
    repo = ClientsRepository(session)
    repo.create(client_code="C-0001", company_name="Studio One")
    session.commit()
    try:
        repo.create(client_code="C-0001", company_name="Studio Two")
    except ValueError as error:
        assert "already exists" in str(error)
    else:
        raise AssertionError("Duplicate client code should fail")


def test_archive_and_restore_client(session):
    repo = ClientsRepository(session)
    client = repo.create(client_code="C-0002", company_name="Studio")
    repo.archive(client)
    session.commit()
    assert repo.get(client.id).is_active is False
    repo.restore(client)
    session.commit()
    assert repo.get(client.id).is_active is True
