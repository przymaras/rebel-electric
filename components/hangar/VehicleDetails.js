import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

import { IconAcademy } from "../icons/IconAcademy";
import TitleBox from "../layout/TitleBox";
import VehicleSwiper from "./VehicleSwiper";

import styles from "./VehicleDetails.module.css";

function VehicleDetails(props) {
  const { t } = useTranslation();

  return (
    <>
      <TitleBox>
        <div className={styles.title}>
          <h1 className="rebel-font" style={{ fontSize: "3rem" }}>
            {" "}
            CUBE AMS 100 TSDZ2{" "}
          </h1>
          <div className={styles.userWrapper}>
            <IconAcademy />
            <p>Użytkownik 2839</p>
            <IconAcademy />
            <p>Poznań</p>
          </div>
        </div>
      </TitleBox>
      <VehicleSwiper />
      <div>
        <div>
          <Image
            src="/img/fa-ico/eye-solid.svg"
            alt="Views"
            width={100}
            height={50}
          />
          <p>13</p>
          <p>WYŚWIETLEŃ</p>
        </div>
        <div>
          <Image
            src="/img/categories/ebike/ebike-conversion-full-mid.svg"
            alt="Category"
            width={100}
            height={50}
          />
          <p>HYBRYDA FULL MID</p>
        </div>
        <div>
          <Image
            src="/img/fa-ico/thumbs-up-solid.svg"
            alt="Thumb up"
            width={100}
            height={50}
          />
          <p>1</p>
          <p>POLUBIENIE</p>
        </div>
      </div>
    </>
  );
}

export default VehicleDetails;
