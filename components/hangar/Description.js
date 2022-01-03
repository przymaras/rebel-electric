import styles from "./Description.module.css";

function Description(props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>Opis od autora</p>
      </div>
      <div className={styles.content}>
        <p>
          Przejechane już ponad 2.5k km, ostatnio czujnik termiczny wklejony i
          taśma termoprzewodząca - lepsze odprowadzanie temperatury z silnika.
          Dodatkowo dodane smaru i inspekcja nylonowego kółka, jak nowe.
        </p>
      </div>
    </div>
  );
}

export default Description;
