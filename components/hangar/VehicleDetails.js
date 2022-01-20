import useTranslation from "next-translate/useTranslation";

import { IconAcademy } from "../icons/IconAcademy";
import TitleBox from "../layout/TitleBox";
import VehicleSwiper from "./VehicleSwiper";

import styles from "./VehicleDetails.module.css";
import VehicleVeiwsCatLikes from "./VehicleVeiwsCatLikes";
import DataTablesEbike from "./DataTablesEbike";
import Description from "./Description";
import BtnLink from "../layout/BtnLink";
import { ifData } from "../tools/common-functions";

function VehicleDetails(props) {
  const { t } = useTranslation();
  const vData = props.vehicleData;

  return (
    <>
      <TitleBox>
        <div className={styles.title}>
          <h1 className="rebel-font" style={{ fontSize: "3rem" }}>
            {ifData(vData, "projectName", "unknown")}
          </h1>
          <div className={styles.userWrapper}>
            <IconAcademy />
            <p>{ifData(vData, "userName", "unknown")}</p>
            <IconAcademy />
            <p>{ifData(vData, "city", "unknown")}</p>
          </div>
        </div>
      </TitleBox>
      <div className={styles.container}>
        <VehicleSwiper
          images={ifData(vData, "vehicleImages", [])}
          projectName={ifData(vData, "projectName", "Vehicle")}
        />
        <VehicleVeiwsCatLikes
          likes={ifData(vData, "likesCount", 0)}
          views={ifData(vData, "viewsCount", 0)}
        />
        <DataTablesEbike vehicleData={vData} />
        <Description description={ifData(vData, "description", "")} />
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
