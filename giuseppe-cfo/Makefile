setup:
	python scripts/setup.py
run:
	python run_app.py
test:
	python -m pytest
lint:
	python -m ruff check app tests scripts
typecheck:
	python -m mypy app
check: test lint typecheck
backup:
	python scripts/create_backup.py
review:
	python scripts/create_review_bundle.py
