/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { getBigThumbSrc } from "../tools/common-functions";

import styles from "./Recent.module.css";

function Recent(props) {
  const imageName = props.src;
  const projectName = props.name;
  const id = props.id;
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
      <h2 className={styles.recentName}>{props.name}</h2>
    </div>
  );
}

export default Recent;
