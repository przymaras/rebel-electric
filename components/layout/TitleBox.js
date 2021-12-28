import styles from "./TitleBox.module.css";

function TitleBox(props) {
  return <div className={styles.container}>{props.children}</div>;
}

export default TitleBox;
