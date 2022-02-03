import useTranslation from "next-translate/useTranslation";
import { Vehicle } from "../../models/hangar";

import styles from "./VehicleDetails.module.scss";

import { IconAcademy } from "../icons/IconAcademy";
import TitleBox from "../layout/TitleBox";
import VehicleSwiper from "./VehicleSwiper";
import VehicleVeiwsCatLikes from "./VehicleVeiwsCatLikes";
import DataTablesEbike from "./DataTablesEbike";
import Description from "./Description";
import BtnLink from "../layout/BtnLink";

interface VehicleDetailsProps {
  vehicleData?: Vehicle;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = (props) => {
  const { t } = useTranslation();
  const vData = props.vehicleData;
  const unknownText = t("hangar:unknown");
  return (
    <>
      <TitleBox>
        <div className={styles.title}>
          <h1 className="rebel-font" style={{ fontSize: "3rem" }}>
            {vData?.projectName ?? unknownText}
          </h1>
          <div className={styles.userWrapper}>
            <IconAcademy />
            <p>{vData?.userName ?? unknownText}</p>
            <IconAcademy />
            <p>{vData?.city ?? unknownText}</p>
          </div>
        </div>
      </TitleBox>
      <div className={styles.container}>
        <VehicleSwiper
          images={vData?.vehicleImages ?? []}
          projectName={vData?.projectName ?? unknownText}
        />
        <VehicleVeiwsCatLikes
          likes={vData?.likesCount ?? "0"}
          views={vData?.viewsCount ?? "0"}
        />
        <DataTablesEbike vehicleData={vData} />
        <Description description={vData?.description ?? ""} />
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
};

export default VehicleDetails;
