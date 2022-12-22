import { useState, useEffect, useRef } from 'react';

import styles from './Main.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

interface noteProp {
  id: string;
  title: string;
  body: string;
  lastModified: number;
}

interface Props {
  notes: noteProp[];
  activeNote: noteProp | undefined;
  onAddNote: () => void;
  onUpdateNote: (updatedNote: noteProp) => void;
  setMobileSidebarVisible: Function;
}

const Main = (props: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const [textAreaValue, setTextAreaValue] = useState<String>();

  const onEditInput = (key: string, value: string) => {
    if (props.activeNote) {
      let newNote = {
        ...props.activeNote,
        [key]: value,
        lastModified: Date.now()
      }
      props.onUpdateNote(newNote);
      setTextAreaValue(value);
    }
  }

  const onPressEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key.toLowerCase() === "enter") {
      if (textAreaRef.current) {
        event.preventDefault();
        textAreaRef.current.focus()
      }
    }
  }

  useEffect(() => {
    // Adjust textarea height to text
    if (textAreaRef && textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaValue]);



  const activeNoteHTML = <form className={styles.mainNoteGroup} onSubmit={(e) => e.preventDefault()}>
    <input
      type="text"
      role="input"
      className={styles.mainTitleInput}
      value={props.activeNote && props.activeNote.title}
      onChange={(e) => onEditInput("title", e.target.value)}
      onKeyDown={onPressEnter}
    />
    <textarea
      className={styles.mainBodyInput}
      role="textarea"
      value={props.activeNote && props.activeNote.body}
      onChange={(e) => onEditInput("body", e.target.value)}
      ref={textAreaRef}
    />
  </form>;

  const noActiveNotesHTML = <div className={styles.mainEmpty}>There are no active notes</div>;

  return (
    <main className={styles.main}>
      <header>
        <div className={styles.mainLogoMenuGroup}>
          <FontAwesomeIcon
            className={styles.mainMenuIcon}
            icon={faBars}
            onClick={() => props.setMobileSidebarVisible(true)}
          />
          <div className={styles.mainLogo}>EasyNote</div>
        </div>
        <button
          className={styles.mainAddNoteBTN}
          onClick={props.onAddNote}
        >Add Note</button>
      </header>

      {props.activeNote ? activeNoteHTML : noActiveNotesHTML}
    </main>
  )
}

export default Main;