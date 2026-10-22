from pathlib import Path


def validate_local_document_path(value: str) -> Path:
    path = Path(value).expanduser()
    if not path.exists():
        raise ValueError("The local document path does not exist.")
    return path


def path_exists(value: str) -> bool:
    return Path(value).expanduser().exists()
