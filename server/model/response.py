from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from ..data.datasource import Base
from ..model.endpoint import Endpoint


class Response(Base):
    __tablename__ = 'response'
    id = Column(Integer, primary_key=True)

    endpoint_id = Column(Integer, ForeignKey('endpoint.id'), nullable=False)
    endpoint = relationship(Endpoint)

    status_code = Column(Integer)
    information = Column(String(255))   
    date = Column(DateTime)

    def __init__(self, endpoint_id: int = None, status_code: int = None, information: str = None, date: DateTime = None) -> None:
        self.endpoint_id = endpoint_id
        self.status_code = status_code
        self.information = information
        self.date = date

    def __repr__(self) -> str:
        return f'<Response:\n \
                id: {self.id}\n \
                endpoint_id: {self.endpoint_id} \
                status_code: {self.status_code} \
                information: {self.information} \
                date: {self.date}'

