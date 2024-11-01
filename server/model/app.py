from sqlalchemy import Column, Integer, String
from ..data.datasource import Base
import string
import random

class App(Base):
    __tablename__ = 'app'
    id = Column(Integer, primary_key=True)
    name = Column(String(127), nullable=False)
    url = Column(String(127))
    status = Column(String(127), default="unknown")
    interval = Column(Integer, default=20)
    join_code = Column(String(127))

    def __generate_app_code(self) -> str:
        letters_and_digits = string.ascii_letters + string.digits
        return ''.join(random.choices(letters_and_digits, k=6))

    def __init__(self, name: str = None, url: str = None, interval: int = None) -> None:
        self.name = name
        self.url = url
        self.interval = interval
        self.join_code = self.__generate_app_code()

    def __repr__(self) -> str:
        return f'<App:\n \
                id: {self.id}\n \
                name: {self.name} \
                url: {self.url} \
                status: {self.status} \
                interval: {self.interval}>'