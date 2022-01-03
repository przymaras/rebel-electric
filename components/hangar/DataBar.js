import { IconAcademy } from "../icons/IconAcademy";
import styles from "./DataBar.module.css";

function DataBar(props) {
  let cssStyle;

  switch (props.style) {
    case "base":
      cssStyle = styles.base;
      break;
    case "electrical":
      cssStyle = styles.electrical;
      break;
    case "battery":
      cssStyle = styles.battery;
      break;

    default:
      cssStyle = "";
      break;
  }
  return (
    <div className={`${styles.container} ${cssStyle}`}>
      <IconAcademy />
      <p>{props.text.a}</p>
      <p>{props.text.b}</p>
      <p>{props.text.c}</p>
    </div>
  );
}

export default DataBar;
