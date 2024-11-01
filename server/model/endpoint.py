from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from ..data.datasource import Base
from ..model.app import App


class Endpoint(Base):
    __tablename__ = 'endpoint'

    id = Column(Integer, primary_key=True)
    url = Column(String(255), nullable=False)
    method = Column(String(127), nullable=False)

    app_id = Column(Integer, ForeignKey('app.id'), nullable=False)
    app = relationship(App)

    status = Column(String(127), default='unknown')

    def __init__(self, url: str = None, method: str = None, app_id: int = None) -> None:
        self.url = url
        self.method = method
        self.app_id = app_id

    def __repr__(self) -> str:
        return f'<Endpoint: id={self.id}, url={self.url}, method={self.method}, app_id={self.app_id}, status={self.status}>'

