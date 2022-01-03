import { IconAcademy } from "../icons/IconAcademy";
import styles from "./DataTable.module.css";

function DataTable(props) {
  let cssStyle;
  let cssStyleLight;

  switch (props.style) {
    case "base":
      cssStyle = styles.base;
      cssStyleLight = styles.baseLight;
      break;
    case "electrical":
      cssStyle = styles.electrical;
      cssStyleLight = styles.electricalLight;
      break;
    case "battery":
      cssStyle = styles.battery;
      cssStyleLight = styles.batteryLight;
      break;

    default:
      cssStyle = "";
      break;
  }
  return (
    <div className={styles.container}>
      <div className={`${styles.headingRow}  ${cssStyle}`}>
        <IconAcademy />
        <p>
          <strong>Baza</strong>
        </p>
        <div className={styles.headingInfo}>
          <p>V maks.</p>
          <p>
            <strong>38 km/h</strong>
          </p>
        </div>
        <div className={styles.headingInfo}>
          <p>Masa</p>
          <p>
            <strong>25kg</strong>
          </p>
        </div>
        <div className={styles.headingInfo}>
          <p>Zasięg</p>
          <p>
            <strong>100 km</strong>
          </p>
        </div>
      </div>
      <div className={`${styles.detailsRow}  ${cssStyleLight}`}>
        <p>
          Marka: <strong>Cube</strong>
        </p>
        <p>
          Model: <strong>AMS 100</strong>
        </p>
        <p>
          Rok produkcji bazy: <strong>2010</strong>
        </p>
        <p>
          Rozmiar kół: <strong>26</strong>
        </p>
      </div>
      <div className={`${styles.detailsRow}  ${cssStyleLight}`}>
        <p>
          Hamulce: <strong>tarcze hydrauliczne</strong>
        </p>
        <p>
          Prąd maksymalny na wyjściu: <strong>17A</strong>
        </p>
        <p>
          Sposób montazu baterii: <strong>Skrzynka z aluminium</strong>
        </p>
        <p>
          Typ akumulatora: <strong>Ogniwa Li-Ion 18650</strong>
        </p>
      </div>
    </div>
  );
}

export default DataTable;
