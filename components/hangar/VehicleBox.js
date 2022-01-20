/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import { getBigThumbSrc } from "../tools/common-functions";

import DataBar from "./DataBar";

import styles from "./VehicleBox.module.css";

function VehicleBox(props) {
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
            text={{
              a: `35 km/h`,
              b: `25 kg`,
              c: `100 km`,
            }}
          />
          <DataBar
            style="electrical"
            text={{
              a: `0.8 kW`,
              b: `48 V`,
              c: `17 A`,
            }}
          />
          <DataBar
            style="battery"
            text={{
              a: `1200 Wh`,
              b: `27 Ah`,
              c: ` 30 A`,
            }}
          />
        </div>
      </a>
    </Link>
  );
}

export default VehicleBox;
