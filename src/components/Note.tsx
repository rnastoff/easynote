
import styles from './Note.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

interface noteProp {
  id: string;
  title: string;
  body: string;
  lastModified: number;
}

interface Props {
  id: string;
  title: string;
  body: string;
  lastModified: number;
  activeNoteID: string;
  setActiveNoteID: (note: string) => void;
  setDeleteModalVisible: Function;
}

const Note = (props: Props) => {

  let highlightedNote = props.id === props.activeNoteID ? `${styles.noteActive}` : "";

  const truncateText = (text: string) => {
    if (text.length > 20) {
      return text.substring(0, 20) + "...";
    }
    return text;
  }

  return (
    <div className={`${styles.note} ${highlightedNote}`} onClick={() => props.setActiveNoteID(props.id)}>
      <div className={styles.noteDetails}>
        <div className={styles.noteTitle}>{truncateText(props.title)}</div>
        <div className={styles.noteBody}>{truncateText(props.body)}</div>
        <div className={styles.noteDate}>
          Last modified {new Date(props.lastModified).toLocaleDateString("en-US", {
            hour: "2-digit",
            minute: "2-digit"
          })}
        </div>
      </div>

      <FontAwesomeIcon
        className={styles.noteTrashIcon}
        icon={faTrashCan}
        onClick={() => props.setDeleteModalVisible(true)}
      />
    </div>
  )
}

export default Note;