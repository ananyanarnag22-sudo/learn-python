from pydantic import BaseModel

class Contact(BaseModel):
    name: str
    email: str
    subject: str
    message: str


class UserSignup(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str