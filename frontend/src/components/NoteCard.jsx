const COLOR_MAP = {
    gray: "#8b8f99",
    blue: "#5b8def",
    green: "#4caf7d",
    orange: "#d98e34",
    red: "#c0524a",
    purple: "#9b7fd4"
};

export default function NoteCard({ note, onClick, active }) {

    const dotColor = COLOR_MAP[note.color] || note.color;

    return (
        <div
            className={active ? "card active" : "card"}
            onClick={onClick}
        >
            <h3>{note.title || "Untitled"}</h3>

            <div className="card-meta">
                <span
                    className="dot"
                    style={{ background: dotColor }}
                />
                <span className="badge">
                    {note.category}
                </span>
            </div>
        </div>
    );
}
