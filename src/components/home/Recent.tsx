/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Vehicle } from "../../models/hangar";
import { getBigThumbSrc } from "../../utils/common-functions";

import styles from "./Recent.module.css";

const Recent: React.FC<{ vehicle: Vehicle }> = (props) => {
  const imageName = props.vehicle.vehicleImages[0];
  const projectName = props.vehicle.projectName;
  const id = props.vehicle._id;
  return (
    <div className={styles.container}>
      <Link href={`/hangar/${id}`} passHref>
        <a>
          <div className={styles.recentImgContainer}>
            <img
              // src={`https://ik.imagekit.io/rebelelectric/ik-seo/tr:n-big_thumb,pr-true,di-rebel.jpg/hangar/${imageName}/${underscoredName}.${imageExtension}`}
              src={getBigThumbSrc(imageName, projectName)}
              alt="Cube Ams 100 TSDZ2"
              className={styles.img}
            />
          </div>
        </a>
      </Link>
      <h2 className={styles.recentName}>{props.vehicle.projectName}</h2>
    </div>
  );
};

export default Recent;
