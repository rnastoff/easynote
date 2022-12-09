import { useRef } from 'react';

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

  const onEditInput = (key: string, value: string) => {
    //activeNote might be undefined
    if (props.activeNote) {
      let newNote = {
        ...props.activeNote,
        [key]: value,
        lastModified: Date.now()
      }
      props.onUpdateNote(newNote);
    }
  }

  // Focus textarea when pressing enter inside input
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    console.log(event);
    if (event.key.toLowerCase() === "enter") {
      if (textAreaRef.current) {
        event.preventDefault();
        textAreaRef.current.focus()
      }
    }
  }

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



      {props.activeNote ?
        <form className={styles.mainNoteGroup} onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className={styles.mainTitleInput}
            value={props.activeNote.title}
            onChange={(e) => onEditInput("title", e.target.value)}
            onKeyDown={handleEnter}
          />
          <textarea
            className={styles.mainBodyInput}
            value={props.activeNote.body}
            onChange={(e) => onEditInput("body", e.target.value)}
            ref={textAreaRef}
          />
        </form>
        :
        <div className={styles.mainEmpty}>There are no active notes</div>
      }
    </main>
  )
}

export default Main;