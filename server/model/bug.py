from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from ..data.datasource import Base
from ..model.user import User
from ..model.endpoint import Endpoint
from datetime import datetime


class Bug(Base):
    __tablename__ = 'bug'

    id = Column(Integer, primary_key=True)
    description = Column(String(255))
    reported_date = Column(DateTime, default=datetime.now())

    endpoint_id = Column(Integer, ForeignKey('endpoint.id'), nullable=False)
    endpoint = relationship(Endpoint)

    is_solved = Column(Boolean, default=False)
    solved_date = Column(DateTime)

    assigned_user_id = Column(Integer, ForeignKey('user.id'))
    assigned_user = relationship(User)

    def __init__(self, description: str = None, endpoint_id: int = None):
        self.description = description
        self.endpoint_id = endpoint_id

    def __repr__(self):
        return f'<Bug: id={self.id}, description={self.description}, reported_date={self.reported_date}, is_solved={self.is_solved}, endpoint_id={self.endpoint_id}>'

