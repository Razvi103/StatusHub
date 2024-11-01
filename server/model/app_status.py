from sqlalchemy.orm import relationship
from ..data.datasource import Base
from ..model.app import App
from sqlalchemy import Column, Integer, DateTime, ForeignKey, String
import datetime


class AppStatus(Base):
    __tablename__ = 'app_status'
    id = Column(Integer, primary_key=True)
    app_id = Column(Integer, ForeignKey('app.id'), nullable=False)
    app = relationship(App)

    new_status = Column(String(127), default='unknown')

    updated_date = Column(DateTime, default=datetime.datetime.now())

    def __init__(self, app_id: int = None, new_status: str = None) -> None:
        self.app_id = app_id
        self.new_status = new_status

    def __repr__(self) -> str:
        return (f'<App Status: id={self.id}, app_id={self.endpoint_id}, new_status={self.new_status}'
                f' ,updated_date = {self.updated_date}>')