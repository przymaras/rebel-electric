/* eslint-disable @next/next/no-img-element */

import Link from "next/link";

import styles from "./Recent.module.css";

function Recent(props) {
  return (
    <div className={styles.container}>
      <Link href={`/hangar/vId`} passHref>
        <a>
          <div className={styles.recentImgContainer}>
            {/* <Image
              src={props.src}
              alt={props.alt}
              layout="fill"
              className={styles.img}
            /> */}

            <img
              src={`https://ik.imagekit.io/rebelelectric/tr:n-big_thumb/hangar/${props.src}`}
              // src="d"
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
