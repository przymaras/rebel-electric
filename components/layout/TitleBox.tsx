import styles from "./TitleBox.module.css";

const TitleBox: React.FC = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default TitleBox;
