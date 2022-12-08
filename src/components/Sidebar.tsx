
import styles from './Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons'

import Note from './Note';

interface noteProp {
  id: string;
  title: string;
  body: string;
  lastModified: number;
}

interface Props {
  notes: noteProp[];
  activeNoteID: string;
  setActiveNoteID: (note: string) => void;
  onDeleteNote: Function;
  mobileSidebarVisible: boolean;
  setMobileSidebarVisible: Function;
  setDeleteModalVisible: Function;
}

const Sidebar = (props: Props) => {

  let sortedNotes = props.notes.sort((a: noteProp, b: noteProp) => b.lastModified - a.lastModified);
  let mobileSidebarVisible = props.mobileSidebarVisible ? `${styles.sidebarVisible}` : "";

  let notesHTML = sortedNotes.map((note, index) => {
    return (
      <Note
        key={index}
        id={note.id}
        title={note.title}
        body={note.body}
        lastModified={note.lastModified}
        activeNoteID={props.activeNoteID}
        setActiveNoteID={props.setActiveNoteID}
        setDeleteModalVisible={props.setDeleteModalVisible}
      />
    )
  });

  return (
    <section className={`${styles.sidebar} ${mobileSidebarVisible}`}>
      <div className={styles.sidebarGroup}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>Notes</div>
          <FontAwesomeIcon
            className={styles.sidebarCloseIcon}
            icon={faRectangleXmark}
            onClick={() => props.setMobileSidebarVisible(false)}
          />
        </div>

        <div className={styles.sidebarNotes}>
          {notesHTML}
        </div>
      </div>
    </section>
  )
}

export default Sidebar;