from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from ..data.datasource import Base
from ..model.app import App
from ..model.user import User


class AppToUser(Base):
    __tablename__ = 'app_to_user'
    id = Column(Integer, primary_key=True)
    app_id = Column(Integer, ForeignKey('app.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    app = relationship(App)
    user = relationship(User)

    def __init__(self, app_id: int = None, user_id: int = None) -> None:
        self.app_id = app_id
        self.user_id = user_id


    def __repr__(self):
        return f'<AppToUser: id={self.id}, app_id={self.app_id}, user_id={self.user_id}>'