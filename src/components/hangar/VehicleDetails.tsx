import useTranslation from "next-translate/useTranslation";
import { Vehicle } from "../../models/hangar";
import { ItemManufacturerObj } from "../../../src/models/hangar";

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
  controllersData?: ItemManufacturerObj[];
  motorsData?: ItemManufacturerObj[];
}

const VehicleDetails: React.FC<VehicleDetailsProps> = (props) => {
  const { t } = useTranslation();
  const unknownText = t("hangar:unknown");

  const vData = props.vehicleData;
  const cData = props.controllersData;
  const mData = props.motorsData;

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
        <DataTablesEbike
          vehicleData={vData}
          motorsData={mData}
          controllersData={cData}
        />
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
