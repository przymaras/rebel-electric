import styles from "./DataBarsHeadingContainer.module.css";

const DataBarsHeadingContainer: React.FC = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default DataBarsHeadingContainer;
