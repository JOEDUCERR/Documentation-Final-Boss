from pydantic import BaseModel


class NoteCreate(BaseModel):
    title: str
    content: str = ""
    category: str = "General"
    color: str = "gray"


class NoteUpdate(BaseModel):
    title: str
    content: str
    category: str
    color: str


class NoteOut(BaseModel):
    id: int
    title: str
    content: str
    category: str
    color: str

    class Config:
        from_attributes = True