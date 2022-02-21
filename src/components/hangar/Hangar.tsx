import useTranslation from "next-translate/useTranslation";

import styles from "./Hangar.module.scss";

import { IconHangar } from "../icons/IconHangar";
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
import {
  getSelectedCategoryId,
  getSelectedCategoryTreeInfo,
} from "../../utils/common-functions";
import { useStore } from "../../store/useStore";
import { useEffect, useState } from "react";

interface HangarProps {
  vehicles: Vehicle[];
}

const Hangar: React.FC<HangarProps> = (props) => {
  const { t } = useTranslation();
  const vehicles = props.vehicles;
  const newHangarCategoryChosen = useStore(
    (state) => state.newHangarCategoryChosen
  );
  const [selectedCategoryInfo, setSelectedCategoryInfo] =
    useState<ReturnType<typeof getSelectedCategoryTreeInfo>>(undefined);

  const [sortBy, setSortBy] = useState<string>("createdAt");

  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (newHangarCategoryChosen) {
      const selectedCategoryId = getSelectedCategoryId(
        useStore.getState().vehiclesCategories,
        useStore.getState().hangarCategory,
        true
      );

      setSelectedCategoryInfo(
        getSelectedCategoryTreeInfo(
          useStore.getState().vehiclesCategories,
          selectedCategoryId ?? ""
        )
      );

      useStore.getState().setNewHangarCategoryChosen(false);
    }
  }, [newHangarCategoryChosen]);

  const vehiclesToDisplay = () => {
    let vehiclesToDisplay: Vehicle[] = [...vehicles];

    if (selectedCategoryInfo) {
      vehiclesToDisplay = vehiclesToDisplay.filter((vehicle) =>
        selectedCategoryInfo.restIDs.includes(vehicle.category)
      );
    }
    console.log(searchValue);
    if (searchValue) {
      vehiclesToDisplay = vehiclesToDisplay.filter((vehicle) =>
        vehicle.projectName.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (sortBy === "createdAt") {
      return vehiclesToDisplay.sort(
        (a, b) =>
          new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()
      );
    }
    if (sortBy === "viewsCount") {
      return vehiclesToDisplay.sort(
        (a, b) => Number(b.viewsCount ?? 0) - Number(a.viewsCount ?? 0)
      );
    }
    if (sortBy === "likesCount") {
      return vehiclesToDisplay.sort(
        (a, b) => Number(b.likesCount ?? 0) - Number(a.likesCount ?? 0)
      );
    }

    return vehiclesToDisplay;
  };

  return (
    <>
      <TitleBox>
        <div className={styles.title}>
          <IconHangar />
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

      <SearchBar setSearchValue={setSearchValue} />

      <SearchResultSortBar
        found={vehiclesToDisplay().length}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

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
          col2={t("hangar:label-imax")}
          col3={t("hangar:label-enCons")}
        />

        <DataBar
          style="battery"
          col1={t("hangar:label-capwh")}
          col2={t("hangar:label-capah")}
          col3={t("hangar:label-voltage")}
        />
      </DataBarsHeadingContainer>
      <div className={styles.vehiclesWrapper}>
        {vehiclesToDisplay().map((vehicle) => (
          <VehicleBox key={vehicle._id} vehicleData={vehicle} />
        ))}
      </div>
    </>
  );
};

export default Hangar;
