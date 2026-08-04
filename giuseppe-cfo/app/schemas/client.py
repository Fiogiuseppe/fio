from pydantic import BaseModel, Field


class ClientInput(BaseModel):
    company_name: str = Field(min_length=1, max_length=200)
    email: str = ""
