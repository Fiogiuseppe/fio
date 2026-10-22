from decimal import Decimal

CURRENCIES = ("DKK", "EUR", "USD", "GBP", "SEK", "NOK")
EXPENSE_CATEGORIES = (
    "Materials",
    "Software",
    "Equipment",
    "Travel",
    "Transport",
    "Marketing",
    "Professional services",
    "Education",
    "Office",
    "Shipping",
    "UREES production",
    "Workshop costs",
    "Other",
)
VAT_THRESHOLD_DKK = Decimal("50000")
