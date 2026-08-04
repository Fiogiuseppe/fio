# Project status
Stage: local-first foundation, core interface, and private-device access.

Completed: SQLite models, client/quote/invoice/expense entry, dashboard calculations, exports, local backups, audit records, optional bcrypt-hash login, automatic idle-session timeout, and loopback/private-network launch validation.

Partial: document registration, correction/archive screens, quotes UI, invoice payment/sending UI, and reports need further UI work. PDF generation is deferred.

Known issue: legal and tax treatment is intentionally not encoded as advice. Backup restore is not implemented. Remote access requires the primary computer to be switched on and the application running; no data is synchronised.

Next: expand page-level editing and correction workflows while preserving the local-only data model.
