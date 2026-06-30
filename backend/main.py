from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

import crud
import models
import schemas

from database import Base, engine, get_db

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/notes", response_model=list[schemas.NoteOut])
def get_notes(search: str = "", db: Session = Depends(get_db)):
    return crud.get_notes(db, search)


@app.get("/notes/{note_id}", response_model=schemas.NoteOut)
def get_note(note_id: int, db: Session = Depends(get_db)):
    note = crud.get_note(db, note_id)

    if not note:
        raise HTTPException(404)

    return note


@app.post("/notes", response_model=schemas.NoteOut)
def create_note(note: schemas.NoteCreate, db: Session = Depends(get_db)):
    return crud.create_note(db, note)


@app.put("/notes/{note_id}", response_model=schemas.NoteOut)
def update_note(
    note_id: int,
    note: schemas.NoteUpdate,
    db: Session = Depends(get_db),
):
    updated = crud.update_note(db, note_id, note)

    if not updated:
        raise HTTPException(404)

    return updated


@app.delete("/notes/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    crud.delete_note(db, note_id)

    return {"success": True}