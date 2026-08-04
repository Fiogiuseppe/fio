# Giuseppe CFO

A personal CFO app for a Danish PMV. It keeps a client database, records invoices and expenses in Google Sheets, uploads invoice PDFs to Google Drive, and tracks the Danish VAT registration threshold of 50,000 DKK over a rolling 12-month period.

## Setup

1. Create a Google Cloud service account and enable the **Google Sheets API** and **Google Drive API**.
2. Download its JSON key. Share both your accounting spreadsheet and the destination Drive folder with the service-account email address.
3. Create three tabs in the spreadsheet or let the app create them: `Clients`, `Invoices`, and `Expenses`.
4. Export the variables from `.env.example` in your shell. Do not commit the service-account JSON or an `.env` file.
5. Install and run:

```bash
python3 -m venv .venv
. .venv/bin/activate
python3 -m pip install -e '.[dev]'
streamlit run app/main.py
```

## What it does

- **Kunder:** writes customer records to the `Clients` tab.
- **Udgifter:** writes expenses, VAT amount, category, and receipt link to `Expenses`.
- **Fakturaer:** creates a PDF, uploads it to Drive, and writes the invoice totals and URL to `Invoices`.
- **Chat:** `VAT`/`moms` reports the threshold status. Other questions use the OpenAI Responses API when `OPENAI_API_KEY` is configured.

The OpenAI conversation is read-only: it cannot create, alter, or delete accounting entries. Use the forms for those actions.

## Important accounting note

This is an operational aid, not binding tax advice. Danish VAT rules have exceptions and the timing of VAT registration can matter; confirm decisions with SKAT or an accountant.
