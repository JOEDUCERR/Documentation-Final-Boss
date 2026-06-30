import { useEffect, useState } from "react";
import api from "../api";
import NoteCard from "../components/NoteCard";
import NoteEditor from "../components/NoteEditor";

export default function Home() {

    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);

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

    return (
            <div className="layout">

        <div className="sidebar">

            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search notes"
            />

            <button
                onClick={() => setSelected(null)}
            >
                + New Note
            </button>

            {notes.map(note => (

                <NoteCard
                    key={note.id}
                    note={note}
                    onClick={() => setSelected(note)}
                />

            ))}

        </div>

        <NoteEditor
            selected={selected}
            refresh={loadNotes}
            clearSelection={() => setSelected(null)}
        />

    </div>
    );

}