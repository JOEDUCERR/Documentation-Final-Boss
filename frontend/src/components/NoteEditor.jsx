import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import api from "../api";

export default function NoteEditor({
    selected,
    refresh,
    clearSelection
}) {

    const [note, setNote] = useState({
        title:"",
        content:"",
        category:"General",
        color:"gray"
    });

    useEffect(() => {

        if(selected){

            setNote(selected);

        }else{

            setNote({
                title:"",
                content:"",
                category:"General",
                color:"gray"
            });

        }

    }, [selected]);

    async function save(){

        if(selected){

            await api.put(`/notes/${selected.id}`, note);

        }else{

            await api.post("/notes", note);

        }

        await refresh();

    }

    async function remove(){

        if(!selected) return;

        await api.delete(`/notes/${selected.id}`);

        clearSelection();

        refresh();

    }

    return (

        <div className="editor">

            <div className="editor-toolbar">
                <span className="editor-breadcrumb">
                    {selected ? "editing" : "new"} / <span>{note.category || "General"}</span>
                </span>
            </div>

            <div className="editor-body">

                <input
                    className="titleInput"
                    value={note.title}
                    placeholder="Untitled note"
                    onChange={(e)=>
                        setNote({
                            ...note,
                            title:e.target.value
                        })
                    }
                />

                <div className="row">

                    <input
                        value={note.category}
                        placeholder="Category"
                        onChange={(e)=>
                            setNote({
                                ...note,
                                category:e.target.value
                            })
                        }
                    />

                    <select
                        value={note.color}
                        onChange={(e)=>
                            setNote({
                                ...note,
                                color:e.target.value
                            })
                        }
                    >
                        <option>gray</option>
                        <option>blue</option>
                        <option>green</option>
                        <option>orange</option>
                        <option>red</option>
                        <option>purple</option>
                    </select>

                </div>

                <div className="markdown-container">

                    <div className="pane">
                        <span className="pane-label">Markdown</span>
                        <textarea
                            value={note.content}
                            placeholder="Write your note in Markdown..."
                            onChange={(e)=>
                                setNote({
                                    ...note,
                                    content:e.target.value
                                })
                            }
                        />
                    </div>

                    <div className="pane">
                        <span className="pane-label">Preview</span>
                        <div className="preview">
                            <ReactMarkdown>
                                {note.content}
                            </ReactMarkdown>
                        </div>
                    </div>

                </div>

            </div>

            <div className="editor-actions">

                <button className="btn-primary" onClick={save}>
                    Save note
                </button>

                {selected &&
                    <button
                        className="btn-danger"
                        onClick={remove}
                    >
                        Delete
                    </button>
                }

            </div>

        </div>

    );

}
