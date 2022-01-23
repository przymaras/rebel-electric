import { IconAcademy } from "../icons/IconAcademy";
import styles from "./DataBar.module.css";

interface DataBarProps {
  style: string;
  col1: string;
  col2: string;
  col3: string;
}

const DataBar: React.FC<DataBarProps> = (props) => {
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
      <p>{props.col1}</p>
      <p>{props.col2}</p>
      <p>{props.col3}</p>
    </div>
  );
};

export default DataBar;
