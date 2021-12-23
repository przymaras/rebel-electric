import styles from "./InfoBox.module.css";

function InfoBox(props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

export default InfoBox;
