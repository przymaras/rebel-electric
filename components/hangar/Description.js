import styles from "./Description.module.css";

function Description(props) {
  const markupToRender = (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>Opis od autora</p>
      </div>
      <div className={styles.content}>
        <p>{props.description}</p>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {props.description && markupToRender}
    </div>
  );
}

export default Description;
