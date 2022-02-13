import { IconBattery } from "../icons/IconBattery";
import { IconLightning } from "../icons/IconLightning";
import { IconStar } from "../icons/IconStar";
import styles from "./DataBar.module.scss";

interface DataBarProps {
  style: string;
  col1: string;
  col2: string;
  col3: string;
}

const DataBar: React.FC<DataBarProps> = (props) => {
  let cssStyle;
  let Icon = IconStar;

  switch (props.style) {
    case "base":
      cssStyle = styles.base;
      Icon = IconStar;
      break;
    case "electrical":
      cssStyle = styles.electrical;
      Icon = IconLightning;
      break;
    case "battery":
      cssStyle = styles.battery;
      Icon = IconBattery;
      break;

    default:
      cssStyle = "";
      break;
  }
  return (
    <div className={`${styles.container} ${cssStyle}`}>
      <Icon />
      <p>{props.col1}</p>
      <p>{props.col2}</p>
      <p>{props.col3}</p>
    </div>
  );
};

export default DataBar;
