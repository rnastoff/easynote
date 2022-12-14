
import styles from './DeleteModal.module.css';

interface Props {
  deleteModalVisible: boolean;
  setDeleteModalVisible: Function;
  onDeleteNote: Function;
  activeNoteID: string;
}

const DeleteModal = (props: Props) => {

  let deleteModalVisible = props.deleteModalVisible ? `${styles.deleteModalVisible}` : "";

  const onDeleteConfirm = () => {
    props.onDeleteNote(props.activeNoteID);
    props.setDeleteModalVisible(false);
  }

  return (
    <div className={`${styles.deleteModal} ${deleteModalVisible}`} data-testid="deleteModal">
      <div className={styles.deleteModalConfirmation}>Confirm</div>
      <div className={styles.deleteModalText}>Delete This Note?</div>

      <div className={styles.deleteModalButtons}>
        <button
          className={styles.deleteModalCancelBTN}
          role="button"
          onClick={() => props.setDeleteModalVisible(false)}
        >Cancel
        </button>
        <button
          className={styles.deleteModalConfirmBTN}
          role="button"
          onClick={onDeleteConfirm}
        >Confirm
        </button>
      </div>
    </div>
  )
}

export default DeleteModal;