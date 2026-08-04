import bcrypt

from app.auth import authentication_enabled, session_is_valid, timeout_seconds, verify_password
from app.network import is_private_bind_address


def test_password_verification_and_malformed_hash(monkeypatch):
    password_hash = bcrypt.hashpw(b"test-password", bcrypt.gensalt()).decode()
    monkeypatch.setenv("GIUSEPPE_CFO_PASSWORD_HASH", password_hash)
    assert authentication_enabled()
    assert verify_password("test-password")
    assert not verify_password("incorrect")
    assert not verify_password("test-password", "not-a-hash")


def test_session_timeout(monkeypatch):
    monkeypatch.setenv("GIUSEPPE_CFO_SESSION_TIMEOUT_MINUTES", "1")
    assert timeout_seconds() == 60
    assert session_is_valid(100.0, now=159.9)
    assert not session_is_valid(100.0, now=160.0)


def test_only_private_or_loopback_addresses_are_allowed():
    assert is_private_bind_address("127.0.0.1")
    assert is_private_bind_address("192.168.1.10")
    assert is_private_bind_address("100.101.102.103")
    assert not is_private_bind_address("8.8.8.8")
    assert not is_private_bind_address("not-an-ip")
