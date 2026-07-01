import { useEffect, useState } from "react";
import api from "../api";
import NoteCard from "../components/NoteCard";
import NoteEditor from "../components/NoteEditor";

export default function Home() {

    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);
    const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
        return saved ? saved === "dark" : true;
    });

    async function loadNotes() {
        const res = await api.get("/notes", {
            params: { search }
        });

        setNotes(res.data);
        return res.data;
    }

    useEffect(() => {
        loadNotes();
    }, [search]);

    useEffect(() => {
        localStorage.setItem(
            "theme",
            dark ? "dark" : "light"
        );
    }, [dark]);

    return (
            <div className={dark ? "layout dark" : "layout light"}>

        <div className="sidebar">

            <div className="sidebar-header">
                <div className="brand">
                    <span className="brand-mark">Notebook</span>
                    <button
                        className="theme-toggle"
                        onClick={() => setDark(!dark)}
                    >
                        {dark ? "Light" : "Dark"}
                    </button>
                </div>

                <div className="search-wrap topbar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="7" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search notes"
                    />
                </div>

                <button
                    className="new-note-btn"
                    onClick={() => setSelected(null)}
                >
                    + New note
                </button>
            </div>

            <div className="note-list">

                {notes.length === 0 &&
                    <p className="note-list-empty">
                        No notes yet.<br />Start by creating one.
                    </p>
                }

                {notes.map(note => (

                    <NoteCard
                        key={note.id}
                        note={note}
                        active={selected && selected.id === note.id}
                        onClick={() => setSelected(note)}
                    />

                ))}

            </div>

        </div>

        <NoteEditor
            selected={selected}
            refresh={loadNotes}
            clearSelection={() => setSelected(null)}
        />

    </div>
    );

}
