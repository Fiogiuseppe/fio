from app.repositories.clients import ClientsRepository


def test_creates_client(session):
    client = ClientsRepository(session).create(client_code="C-0001", company_name="Fictional Studio")
    assert client.id
