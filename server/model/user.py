from sqlalchemy import Column, Integer, String
from ..data.datasource import Base


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String(127), nullable=False)
    email = Column(String(127), unique=True, nullable=False)
    username = Column(String(127), unique=True, nullable=False)
    phone_number = Column(String(15), nullable=True)

    def __init__(self, name: str = None, email: str = None, username: str = None, phone_number: str = None) -> None:
        self.name = name
        self.email = email
        self.username = username
        self.phone_number = phone_number

    def __repr__(self) -> str:
        return f'<User:\n \
                id: {self.id}\n \
                name: {self.name} \
                email: {self.email} \
                username: {self.username}\
                phone_number: {self.phone_number}>'
