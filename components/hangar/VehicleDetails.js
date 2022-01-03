import useTranslation from "next-translate/useTranslation";

import { IconAcademy } from "../icons/IconAcademy";
import TitleBox from "../layout/TitleBox";
import VehicleSwiper from "./VehicleSwiper";

import styles from "./VehicleDetails.module.css";
import VehicleVeiwsCatLikes from "./VehicleVeiwsCatLikes";
import DataTables from "./DataTables";
import Description from "./Description";
import BtnLink from "../layout/BtnLink";

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
      <div className={styles.container}>
        <VehicleSwiper />
        <VehicleVeiwsCatLikes />
        <DataTables />
        <Description />
        <div className={styles.buttonsWrapper}>
          <BtnLink
            href="/users/add"
            icon={<IconAcademy />}
            text={"Zobacz profil właściciela"}
            horizontal={true}
          />
          <BtnLink
            href="/users/add"
            icon={<IconAcademy />}
            text={"Zobacz podobne pojazdy"}
            horizontal={true}
          />
        </div>
      </div>
    </>
  );
}

export default VehicleDetails;
