from decimal import Decimal


def dkk(value: Decimal | int | float | str) -> str:
    return f"{Decimal(str(value)):,.2f} DKK"
