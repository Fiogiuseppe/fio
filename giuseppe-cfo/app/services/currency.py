from decimal import Decimal


def exchange_rate_label(currency: str, rate: Decimal) -> str:
    return "1 DKK = 1 DKK" if currency == "DKK" else f"1 {currency} = {rate} DKK"
