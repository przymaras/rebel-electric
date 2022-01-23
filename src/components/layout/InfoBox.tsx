import styles from "./InfoBox.module.css";

const InfoBox: React.FC = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default InfoBox;
