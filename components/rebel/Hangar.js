import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCards } from "swiper";

import Image from "next/image";

import { IconAcademy } from "../icons/IconAcademy";
import TitleBox from "../layout/TitleBox";
import InfoBox from "../layout/InfoBox";
import CategoryBox from "../layout/CategoryBox";
import CategoryContainer from "../layout/CategoryContainer";
import SearchBar from "../layout/SearchBar";

import styles from "./Hangar.module.css";

import "swiper/css";
import "swiper/css/effect-cards";
import SearchResultSortBar from "../layout/SearchResultSortBar";
import DataBar from "../layout/DataBar";
import DataBarLabels from "../layout/DataBarLabels";
import { markAssetError } from "next/dist/client/route-loader";
import VehicleBox from "../layout/VehicleBox";
import DataBarsHeadingContainer from "../layout/DataBarsHeadingContainer";

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
      <h2 className={`rebel-font ${styles.selectCategory}`}>
        {t("hangar:select-category")}
      </h2>
      <InfoBox>
        <p>{t("hangar:select-category-info-1")}</p>
        <p>{t("hangar:select-category-info-2")}</p>
      </InfoBox>
      <Swiper
        modules={[EffectCards]}
        effect={"cards"}
        grabCursor={true}
        className={styles.categorySwiper}
        onActiveIndexChange={(swiper) => console.log(swiper.activeIndex)}
      >
        <SwiperSlide onClick={(event, swiper) => setSelectedCategory("eBIKE")}>
          <div className={styles.categoryImg}>
            <Image
              src="https://rebel-electric.com/new/bike_kind/2/2/1/3.png"
              alt="Vehicle category"
              layout="fill"
            />
          </div>
          eBike
        </SwiperSlide>
        <SwiperSlide onClick={() => setSelectedCategory("MONSTERBIKE")}>
          <div className={styles.categoryImg}>
            <Image
              src="https://rebel-electric.com/new/bike_kind/3.png"
              alt="Vehicle category"
              layout="fill"
            />
          </div>
          eCar
        </SwiperSlide>
        <SwiperSlide onClick={() => setSelectedCategory("EMOTO")}>
          <div className={styles.categoryImg}>
            <Image
              src="https://rebel-electric.com/new/bike_kind/4.png"
              alt="Vehicle category"
              layout="fill"
            />
          </div>
          oneWheel
        </SwiperSlide>
      </Swiper>
      KATEGORIA GŁÓWNA
      <Swiper
        modules={[EffectCards]}
        effect={"cards"}
        grabCursor={true}
        className={styles.categorySwiper}
        onActiveIndexChange={(swiper) => console.log(swiper.activeIndex)}
      >
        <SwiperSlide onClick={() => setSelectedCategory("KONWERSJA")}>
          <div className={styles.categoryImg}>
            <Image
              src="https://rebel-electric.com/new/bike_kind/2/2/1/3.png"
              alt="Vehicle category"
              layout="fill"
            />
          </div>
          KONWERSJA
        </SwiperSlide>
        <SwiperSlide onClick={() => setSelectedCategory("MONSTERBIKE")}>
          <div className={styles.categoryImg}>
            <Image
              src="https://rebel-electric.com/new/bike_kind/3.png"
              alt="Vehicle category"
              layout="fill"
            />
          </div>
          MONSTERBIKE
        </SwiperSlide>
        <SwiperSlide onClick={() => setSelectedCategory("EMOTO")}>
          <div className={styles.categoryImg}>
            <Image
              src="https://rebel-electric.com/new/bike_kind/4.png"
              alt="Vehicle category"
              layout="fill"
            />
          </div>
          eMOTO
        </SwiperSlide>
      </Swiper>
      PODKATEGORIA GŁÓWNA
      <CategoryContainer>
        <CategoryBox />
        <CategoryBox />
        <CategoryBox />
      </CategoryContainer>
      SUBKATEGORIA 1
      <CategoryContainer>
        <CategoryBox />
        <CategoryBox />
      </CategoryContainer>
      SUBKATEGORIA 2
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
      <style global jsx>{`
        .swiper {
          width: 240px;
          height: 180px;
        }

        .swiper-slide {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          /* border-radius: 18px; */
          font-size: 22px;
          font-weight: bold;
          letter-spacing: 1px;
          color: #46474d;
          padding-bottom: 0.5em;
          box-shadow: 0px 4px 4px #bbbbbb;
          background-size: contain;
          background-repeat: no-repeat;
          border: 3px solid black;
          background-color: rgb(255, 255, 255);
        }
      `}</style>
    </>
  );
}

export default Hangar;
