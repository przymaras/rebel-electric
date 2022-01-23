/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { getBigThumbSrc } from "../tools/common-functions";

import styles from "./VehicleBox.module.css";

import DataBar from "./DataBar";
import { Vehicle } from "../../models/hangar";

interface VehicleBoxProps {
  vehicle: Vehicle;
}

const VehicleBox: React.FC<VehicleBoxProps> = (props) => {
  const imageName = props.vehicle.vehicleImages[0]
    ? props.vehicle.vehicleImages[0]
    : "none.jpg";
  const projectName = props.vehicle.projectName;
  const vehicleId = props.vehicle._id;
  return (
    <Link href={`/hangar/${vehicleId}`} passHref>
      <a>
        <div className={styles.container}>
          <h2 className={`${styles.title} rebel-font`}>
            {props.vehicle.projectName}
          </h2>
          <div className={styles.categoryImg}>
            <img
              src={getBigThumbSrc(imageName, projectName)}
              alt={projectName}
              loading="lazy"
            />
          </div>

          <DataBar
            style="base"
            col1={`35 km/h`}
            col2={`25 kg`}
            col3={`100 km`}
          />
          <DataBar
            style="electrical"
            col1={`0.8 kW`}
            col2={`48 V`}
            col3={`17 A`}
          />
          <DataBar
            style="battery"
            col1={`1200 Wh`}
            col2={`27 Ah`}
            col3={` 30 A`}
          />
        </div>
      </a>
    </Link>
  );
};

export default VehicleBox;
