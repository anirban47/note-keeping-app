import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
    function useStickyState(defaultValue, key) {
        const [value, setValue] = useState(() => {
            const stickyValue = window.localStorage.getItem(key);

            return stickyValue !== null
                ? JSON.parse(stickyValue)
                : defaultValue;
        });

        useEffect(() => {
            window.localStorage.setItem(key, JSON.stringify(value));
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value, setValue]); // eslint-disable-next-line react-hooks/exhaustive-deps

        return [value, setValue];
    }

    const [notes, updateNotes] = useStickyState([], "notes");

    function addNote(noteObj) {
        updateNotes((prevNotes) => {
            return [...prevNotes, { key: prevNotes.length, ...noteObj }];
        });
    }

    function deleteNote(id) {
        updateNotes((prevNotes) => {
            return prevNotes.filter((note, index) => {
                return index !== id;
            });
        });
    }

    return (
        <div>
            <Header />
            <CreateArea addClicked={addNote} />
            {notes.map((note, index) => {
                return (
                    <Note
                        key={index}
                        id={index}
                        title={note.title}
                        content={note.content}
                        deleteClicked={deleteNote}
                    />
                );
            })}
            <Footer />
        </div>
    );
}

export default App;
