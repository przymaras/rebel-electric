import styles from "./CategoryContainer.module.css";

function CategoryContainer(props) {
  return (
    <>
      <div className={styles.container}>{props.children}</div>
      {props.title}
    </>
  );
}

export default CategoryContainer;
