import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

import styles from "./Hangar.module.css";

import { IconAcademy } from "../icons/IconAcademy";
import TitleBox from "../layout/TitleBox";
import InfoBox from "../layout/InfoBox";
import SearchBar from "../layout/SearchBar";
import SearchResultSortBar from "../layout/SearchResultSortBar";
import DataBar from "../layout/DataBar";
import DataBarLabels from "../layout/DataBarLabels";
import VehicleBox from "../layout/VehicleBox";
import DataBarsHeadingContainer from "../layout/DataBarsHeadingContainer";
import CategorySelector from "../layout/CategorySelector";

function Hangar(props) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(
    "NIE WYBRANO KATEGORII"
  );

  return (
    <>
      <TitleBox>
        <div>
          <IconAcademy />
          <h1 className="rebel-font"> {t("hangar:header")} </h1>
        </div>
        <p>{t("hangar:header-info")}</p>
      </TitleBox>

      <h2 className={`rebel-font ${styles.selectCategoryTitle}`}>
        {t("hangar:select-category")}
      </h2>

      <InfoBox>
        <p>{t("hangar:select-category-info-1")}</p>
      </InfoBox>

      <CategorySelector />

      {/* <CategorySwiper cat={dummyVehiclesCat} />
      <CategorySwiper cat={dummyEbikesTypes} />
      <SwiperInDocumentStyles />

      <CategoryContainer title="ZAWIESZENIE">
        <CategoryBox />
        <CategoryBox />
      </CategoryContainer>

      <CategoryContainer title="NAPĘD">
        <CategoryBox />
        <CategoryBox />
        <CategoryBox />
      </CategoryContainer>

      <CategoryContainer title="MOC">
        <CategoryBox />
        <CategoryBox />
        <CategoryBox />
      </CategoryContainer> */}

      <SearchBar />

      <SearchResultSortBar />

      <DataBarLabels />

      <DataBarsHeadingContainer>
        <DataBar
          style="base"
          text={{
            a: t("hangar:label-vmax"),
            b: t("hangar:label-mass"),
            c: t("hangar:label-range"),
          }}
        />

        <DataBar
          style="electrical"
          text={{
            a: t("hangar:label-pmax"),
            b: t("hangar:label-voltage"),
            c: t("hangar:label-imax"),
          }}
        />

        <DataBar
          style="battery"
          text={{
            a: t("hangar:label-capwh"),
            b: t("hangar:label-capah"),
            c: t("hangar:label-ibatmax"),
          }}
        />
      </DataBarsHeadingContainer>

      <VehicleBox />
      <VehicleBox />
      <VehicleBox />
      <VehicleBox />
      <VehicleBox />
      <VehicleBox />
    </>
  );
}

export default Hangar;
