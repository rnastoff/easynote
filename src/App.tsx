import { useState, useEffect } from 'react';
import uuid from 'react-uuid';

import styles from './App.module.css';

import Sidebar from './components/Sidebar';
import Main from './components/Main';
import DeleteModal from './components/DeleteModal';

interface noteProp {
  id: string;
  title: string;
  body: string;
  lastModified: number;
}

function App() {
  const [notes, setNotes] = useState<noteProp[]>(localStorage.notes ? JSON.parse(localStorage.notes) : []);
  const [activeNoteID, setActiveNoteID] = useState("");

  const [mobileSidebarVisible, setMobileSidebarVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes])

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "New Note Title",
      body: "Enter your note here...",
      lastModified: Date.now()
    };
    setNotes([...notes, newNote]);
    setActiveNoteID(newNote.id);
  }

  const onUpdateNote = (updatedNote: noteProp) => {
    const updatedNotesArray = notes.map((note: noteProp) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArray);
  }

  const onDeleteNote = (noteID: string) => {
    const updatedNotesArray = notes.filter((note) => {
      return note.id !== noteID;
    });
    setNotes(updatedNotesArray);
    setActiveNoteID(notes[0].id);
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNoteID);
  }

  //DEBUGGING
  // useEffect(() => console.log(notes), [notes]);
  // useEffect(() => console.log(activeNoteID), [activeNoteID]);

  return (
    <div className={styles.app}>
      {deleteModalVisible && <div className={styles.deleteModalOverlay}></div>}
      <Sidebar
        notes={notes}
        activeNoteID={activeNoteID}
        setActiveNoteID={setActiveNoteID}
        onDeleteNote={onDeleteNote}
        mobileSidebarVisible={mobileSidebarVisible}
        setMobileSidebarVisible={setMobileSidebarVisible}
        setDeleteModalVisible={setDeleteModalVisible}
      />
      <Main
        notes={notes}
        activeNote={getActiveNote()}
        onAddNote={onAddNote}
        onUpdateNote={onUpdateNote}
        setMobileSidebarVisible={setMobileSidebarVisible}
      />
      <DeleteModal
        deleteModalVisible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        onDeleteNote={onDeleteNote}
        activeNoteID={activeNoteID}
      />
    </div>
  );
}

export default App;
