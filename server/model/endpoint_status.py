from sqlalchemy.orm import relationship
from ..data.datasource import Base
from ..model.endpoint import Endpoint
from sqlalchemy import Column, Integer, DateTime, ForeignKey, String
import datetime


class EndpointStatus(Base):
    __tablename__ = 'endpoint_status'

    id = Column(Integer, primary_key=True)

    endpoint_id = Column(Integer, ForeignKey('endpoint.id'), nullable=False)
    endpoint = relationship(Endpoint)

    new_status = Column(String(127), default='unknown')

    updated_date = Column(DateTime, default=datetime.datetime.now())

    def __init__(self, endpoint_id: int = None, new_status: str = None) -> None:
        self.endpoint_id = endpoint_id
        self.new_status = new_status

    def __repr__(self) -> str:
        return (f'<Endpoint Status: id={self.id}, endpoint_id={self.endpoint_id}, new_status={self.new_status},'
                f'updated_date = {self.updated_date}>')

