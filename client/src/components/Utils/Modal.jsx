import styles from "./Modal.module.css";

export default function Modal({
  isError,
  handleClose,
  action1,
  action2,
  title,
  message,
}) {
  return (
    <>
      <div className={styles.darkBG} onClick={handleClose}></div>
      <div className={styles.centered}>
        <div className={styles.modal}>
          {/* Header */}
          <div
            className={`${styles.modalHeader} ${isError ? styles.error : ""}`}
          >
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
              {action1 ? (
                <button className={styles.actionBtn} onClick={action1.handler}>
                  {action1.name}
                </button>
              ) : null}
              {action2 ? (
                <button className={styles.actionBtn2} onClick={action2.handler}>
                  {action2.name}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
