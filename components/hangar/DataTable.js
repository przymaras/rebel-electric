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
          <strong>{props.title}</strong>
        </p>
        <div className={styles.headingInfo}>
          <p>{props.col1Title}</p>
          <p>
            <strong>{props.col1Value}</strong>
          </p>
        </div>
        <div className={styles.headingInfo}>
          <p>{props.col2Title}</p>
          <p>
            <strong>{props.col2Value}</strong>
          </p>
        </div>
        <div className={styles.headingInfo}>
          <p>{props.col3Title}</p>
          <p>
            <strong>{props.col3Value}</strong>
          </p>
        </div>
      </div>
      <div className={`${styles.detailsRow}  ${cssStyleLight}`}>
        {props.row1}
      </div>
      <div className={`${styles.detailsRow}  ${cssStyleLight}`}>
        {props.row2}
      </div>
    </div>
  );
}

export default DataTable;
