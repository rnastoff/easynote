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
    // Because activeNote can be undefined, we need a conditional
    // if not, we'd get errors with the noteProp interface
    if (props.activeNote) {
      let newNote = {
        ...props.activeNote,
        [key]: value,
        lastModified: Date.now()
      }
      props.onUpdateNote(newNote);
    }
  }


  return (
    <main className={styles.main}>
      {/* <div className={styles.mainOverlay}></div> */}
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
          />
          <textarea
            className={styles.mainBodyInput}
            value={props.activeNote.body}
            onChange={(e) => onEditInput("body", e.target.value)}
          />
        </form>
        :
        <div className={styles.mainEmpty}>There are no active notes</div>
      }
    </main>
  )
}

export default Main;