export default function NoteCard({ note, onClick }) {
    return (
        <div
            className="card"
            onClick={onClick}
        >
            <h3>{note.title}</h3>

            <span
                className="badge"
                style={{ background: note.color }}
            >
                {note.category}
            </span>
        </div>
    );
}