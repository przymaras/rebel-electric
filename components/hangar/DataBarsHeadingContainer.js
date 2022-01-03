import styles from "./DataBarsHeadingContainer.module.css";

function DataBarsHeadingContainer(props) {
  return <div className={styles.container}>{props.children}</div>;
}

export default DataBarsHeadingContainer;
