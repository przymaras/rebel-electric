import useTranslation from "next-translate/useTranslation";

import styles from "./Hangar.module.scss";

import { IconAcademy } from "../icons/IconAcademy";
import TitleBox from "../layout/TitleBox";
import InfoBox from "../layout/InfoBox";
import SearchBar from "./SearchBar";
import SearchResultSortBar from "./SearchResultSortBar";
import DataBar from "./DataBar";
import DataBarLabels from "./DataBarLabels";
import VehicleBox from "./VehicleBox";
import DataBarsHeadingContainer from "./DataBarsHeadingContainer";
import CategorySelector from "./CategorySelector";
import { Vehicle } from "../../models/hangar";

interface HangarProps {
  vehicles: Vehicle[];
}

const Hangar: React.FC<HangarProps> = (props) => {
  const { t } = useTranslation();
  const vehicles = props.vehicles;

  return (
    <>
      <TitleBox>
        <div className={styles.title}>
          <IconAcademy />
          <h1 className="rebel-font" style={{ fontSize: "5rem" }}>
            {" "}
            {t("hangar:header")}{" "}
          </h1>
        </div>
        <p>{t("hangar:header-info")}</p>
      </TitleBox>
      <div className={styles.sectionWrapper}>
        <h2 className={`rebel-font ${styles.selectCategoryTitle}`}>
          {t("hangar:select-category")}
        </h2>

        <InfoBox>
          <p>{t("hangar:select-category-info-1")}</p>
        </InfoBox>
      </div>

      <CategorySelector />

      <SearchBar />

      <SearchResultSortBar found={vehicles.length} />

      <DataBarLabels />

      <DataBarsHeadingContainer>
        <DataBar
          style="base"
          col1={t("hangar:label-vmax")}
          col2={t("hangar:label-mass")}
          col3={t("hangar:label-range")}
        />

        <DataBar
          style="electrical"
          col1={t("hangar:label-pmax")}
          col2={t("hangar:label-voltage")}
          col3={t("hangar:label-imax")}
        />

        <DataBar
          style="battery"
          col1={t("hangar:label-capwh")}
          col2={t("hangar:label-capah")}
          col3={t("hangar:label-ibatmax")}
        />
      </DataBarsHeadingContainer>
      <div className={styles.vehiclesWrapper}>
        {vehicles.map((vehicle) => (
          <VehicleBox key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </>
  );
};

export default Hangar;
