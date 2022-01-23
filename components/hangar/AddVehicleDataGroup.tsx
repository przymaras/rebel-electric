import { IconAcademy } from "../icons/IconAcademy";
import styles from "./AddVehicleDataGroup.module.css";

interface AddVehicleDataGroupProps {
  style: string;
  name: string;
}

const AddVehicleDataGroup: React.FC<AddVehicleDataGroupProps> = (props) => {
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
      <div className={styles.heading}>
        <IconAcademy />
        <h2 className="rebel-font">{props.name}</h2>
      </div>
      <div className={styles.wrapper}>{props.children}</div>
    </div>
  );
};

export default AddVehicleDataGroup;
