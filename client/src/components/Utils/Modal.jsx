import styles from "./Modal.module.css";

export default function Modal({ handleClose, actions, title, message }) {
  return (
    <>
      <div className={styles.darkBG} onClick={handleClose}></div>
      <div className={styles.centered}>
        <div className={styles.modal}>
          {/* Header */}
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>{title}</h5>
          </div>
          {/* Close button */}
          {handleClose ? (
            <button className={styles.closeBtn} onClick={handleClose}>
              Close
            </button>
          ) : null}
          {/* Content */}
          <div
            className={styles.modalContent}
            dangerouslySetInnerHTML={{ __html: message }}
          ></div>
          {/* Actions */}
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              {actions.map((action) => (
                <button className={styles.deleteBtn} onClick={action.handler}>
                  {action.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
