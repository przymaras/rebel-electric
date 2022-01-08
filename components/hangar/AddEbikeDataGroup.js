import { IconAcademy } from "../icons/IconAcademy";
import styles from "./AddEbikeDataGroup.module.css";

function AddEbikeDataGroup(props) {
  return (
    <div className={styles.container}>
      <div>
        <IconAcademy />
        <h2 className="rebel-font">{props.type}</h2>
      </div>
      <div>{props.children}</div>
    </div>
  );
}

export default AddEbikeDataGroup;
