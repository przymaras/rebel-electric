import Link from "next/link";
import Image from "next/image";

import DataBar from "./DataBar";

import styles from "./VehicleBox.module.css";

function VehicleBox(props) {
  return (
    <Link href={`/hangar/vId`} passHref>
      <a>
        <div className={styles.container}>
          <h2 className={`${styles.title} rebel-font`}>Cube Ams 100 TSDZ2</h2>
          <div className={styles.categoryImg}>
            <Image
              src="https://rebel-electric.com/new/full/2079"
              alt="Cube Ams 100 TSDZ2"
              layout="fill"
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
