import Image from "next/image";
import styles from "./HomeRecent.module.css";

function HomeRecent(props) {
  return (
    <div className={styles.container}>
      <div className={styles.recentImgContainer}>
        <Image
          src={props.src}
          alt={props.alt}
          layout="fill"
          className={styles.img}
        />
      </div>
      <h2 className={styles.recentName}>{props.name}</h2>
    </div>
  );
}

export default HomeRecent;
