import Image from "next/image";

import styles from "./VehicleVeiwsCatLikes.module.css";

function VehicleVeiwsCatLikes(props) {
  return (
    <div className={styles.container}>
      <div className={styles.views}>
        <img src="/img/fa-ico/eye-solid.svg" alt="Views" />
        <p>13</p>
        <p>WYŚWIETLEŃ</p>
      </div>
      <div className={styles.category}>
        <img
          src="/img/categories/ebike/ebike-conversion-full-mid.svg"
          alt="Category"
        />
        <p>HYBRYDA FULL MID</p>
      </div>
      <div className={styles.likes}>
        <img src="/img/fa-ico/thumbs-up-solid.svg" alt="Thumb up" />
        <p>1</p>
        <p>POLUBIENIE</p>
      </div>
    </div>
  );
}

export default VehicleVeiwsCatLikes;
