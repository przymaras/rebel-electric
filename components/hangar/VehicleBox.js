/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";

import DataBar from "./DataBar";

import styles from "./VehicleBox.module.css";
// import { useDataFetcher } from "../../hooks/useDataFetcher";

function VehicleBox(props) {
  // const [mainImage, mainImageIsAvailable] = useDataFetcher(
  //   `http://localhost:3000/api/img/${props.vehicle.vehicleImages[0]}`
  // );
  // console.log(props.vehicle.vehicleImages[0]);
  return (
    <Link href={`/hangar/vId`} passHref>
      <a>
        <div className={styles.container}>
          <h2 className={`${styles.title} rebel-font`}>
            {props.vehicle.projectName}
          </h2>
          <div className={styles.categoryImg}>
            {/* {mainImageIsAvailable ? ( */}
            <img
              src={`https://ik.imagekit.io/rebelelectric/tr:n-big_thumb/hangar/${props.vehicle.vehicleImages[0]}`}
              // src="d"
              alt="Cube Ams 100 TSDZ2"
              loading="lazy"
            />
            {/* ) : (
              <img
                src="/img/rebel-electric-logo.svg"
                alt="Rebel vehicle"
                loading="lazy"
                style={{ background: "#acb0bd", objectFit: "contain" }}
              />
            )} */}
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
