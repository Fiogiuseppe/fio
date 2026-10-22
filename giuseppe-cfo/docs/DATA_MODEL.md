# Data model

Giuseppe CFO stores records in a local SQLite database.

## Entities and relationships

- `clients` (1) → (many) `quotes`
- `clients` (1) → (many) `invoices`
- `quotes` can be converted into one draft `invoice` (tracked by status/audit summary)
- `expenses` are independent records linked to suppliers and optional receipt paths
- `documents` can reference one related entity via (`related_entity_type`, `related_entity_id`)
- `business_settings` is treated as a singleton row
- `audit_logs` records create/update/archive/status/payment/backup/restore events

## Sensitive data approach

- No CPR field exists in schema.
- Bank data is stored only in `business_settings` and excluded from standard exports.
- File contents are never stored in `documents`; only path and metadata are stored.

## Numbering

- Quotes: `Q-YYYY-NNN`
- Sent invoices: `GF-YYYY-NNN`
- Draft invoices use temporary `DRAFT-...` identifiers.
- Cancelled invoice numbers remain reserved and are never reused.
