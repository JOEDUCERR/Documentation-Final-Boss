from sqlalchemy.orm import Session
from models import Note
from schemas import NoteCreate, NoteUpdate


def get_notes(db: Session, search: str = ""):
    query = db.query(Note)

    if search:
        query = query.filter(
            Note.title.contains(search) |
            Note.content.contains(search)
        )

    return query.order_by(Note.updated_at.desc()).all()


def get_note(db: Session, note_id: int):
    return db.query(Note).filter(Note.id == note_id).first()


def create_note(db: Session, note: NoteCreate):
    db_note = Note(**note.model_dump())

    db.add(db_note)
    db.commit()
    db.refresh(db_note)

    return db_note


def update_note(db: Session, note_id: int, note: NoteUpdate):
    db_note = get_note(db, note_id)

    if not db_note:
        return None

    for key, value in note.model_dump().items():
        setattr(db_note, key, value)

    db.commit()
    db.refresh(db_note)

    return db_note


def delete_note(db: Session, note_id: int):
    note = get_note(db, note_id)

    if note:
        db.delete(note)
        db.commit()