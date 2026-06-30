from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database import Base


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    content = Column(Text, default="")

    category = Column(String, default="General")

    color = Column(String, default="gray")

    created_at = Column(DateTime, default=datetime.utcnow)

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )