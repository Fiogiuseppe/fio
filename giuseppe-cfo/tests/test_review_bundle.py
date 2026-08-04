from zipfile import ZipFile

import pytest

from scripts import create_review_bundle


def test_review_bundle_excludes_private_data(tmp_path, monkeypatch):
    root = tmp_path / "repo"
    (root / "app").mkdir(parents=True)
    (root / "docs").mkdir()
    (root / "README.md").write_text("ok")
    (root / "AGENTS.md").write_text("ok")
    (root / "pyproject.toml").write_text("ok")
    (root / "requirements.txt").write_text("ok")
    (root / "Makefile").write_text("ok")
    (root / "app" / "module.py").write_text("print('safe')")
    review = root / "review_bundle"
    review.mkdir()
    monkeypatch.setattr(create_review_bundle, "ROOT", root)
    monkeypatch.setattr(
        create_review_bundle,
        "SAFE",
        ("app", "docs", "README.md", "AGENTS.md", "pyproject.toml", "requirements.txt", "Makefile"),
    )
    monkeypatch.setattr(
        create_review_bundle,
        "ensure_local_directories",
        lambda: type("P", (), {"review_bundle": review})(),
    )
    monkeypatch.setattr(create_review_bundle.subprocess, "check_output", lambda *args, **kwargs: "")
    output = create_review_bundle.create()
    assert output.exists()
    with ZipFile(output, "r") as archive:
        names = archive.namelist()
        assert "data/private/giuseppe_cfo.sqlite3" not in names


def test_review_bundle_secret_detection(tmp_path, monkeypatch):
    root = tmp_path / "repo"
    (root / "app").mkdir(parents=True)
    (root / "README.md").write_text("ok")
    (root / "AGENTS.md").write_text("ok")
    (root / "pyproject.toml").write_text("ok")
    (root / "requirements.txt").write_text("ok")
    (root / "Makefile").write_text("ok")
    (root / "app" / "secrets.py").write_text("pass" + "word='123'")
    monkeypatch.setattr(create_review_bundle, "ROOT", root)
    monkeypatch.setattr(
        create_review_bundle,
        "SAFE",
        ("app", "README.md", "AGENTS.md", "pyproject.toml", "requirements.txt", "Makefile"),
    )
    with pytest.raises(RuntimeError):
        create_review_bundle.create()
