# Giuseppe CFO user guide

Planning tool only — not tax or accounting advice.

## Start the app

```bash
cd giuseppe-cfo
source .venv/bin/activate
python scripts/setup.py
python run_app.py
```

Open `http://127.0.0.1:8501` in your browser.

To stop the app: return to the terminal and press `Ctrl+C`.

## Daily workflow

1. **Home/Dashboard**: review turnover, expenses, estimated profit, tax-reserve planning, and threshold warning.
2. **Clients**: create or edit a client before creating quotes/invoices.
3. **Quotes**:
   - create a quote;
   - set status to sent/accepted/rejected/expired;
   - convert accepted quotes into draft invoices.
4. **Invoices**:
   - create draft invoices;
   - mark drafts as sent (official number assigned);
   - record partial/full payments;
   - cancel or archive when needed.
5. **Expenses**:
   - add expenses;
   - set category and business-use percentage;
   - register receipt paths;
   - archive/restore entries.
6. **Documents**:
   - register local file paths for invoice PDF, quote PDF, receipt, contract, or other.
7. **Reports**:
   - choose a year;
   - view monthly turnover/expenses/profit and category summaries.
8. **Backup & Export**:
   - create CSV/Excel exports;
   - create backup ZIP;
   - restore from backup (requires typing `RESTORE`);
   - create review bundle ZIP.
9. **Settings**:
   - update business profile, VAT status, threshold, and prefixes.
10. **Audit Log**:
    - review recorded actions and filters.

## Backup and restore

- Create backups often from **Backup & Export**.
- Restore requires typed confirmation (`RESTORE`) and creates a safety backup first.
- Only restore from backups you trust.

## Review bundle safety

`review_bundle/giuseppe_cfo_review.zip` is for code review only.  
Do not put database files, customer files, contracts, receipts, or exports into the bundle.

## Where data is stored

- Database: `data/private/giuseppe_cfo.sqlite3`
- Documents: `documents/`
- Invoices folder: `documents/invoices/`
- Quotes folder: `documents/quotes/`
- Receipts folder: `documents/receipts/`
- Exports: `exports/`
- Backups: `backups/`
- Review ZIP: `review_bundle/giuseppe_cfo_review.zip`
