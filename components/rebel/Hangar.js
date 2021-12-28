import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCards } from "swiper";

import Image from "next/image";
import { IconAcademy } from "../icons/IconAcademy";

import TitleBox from "../layout/TitleBox";
import InfoBox from "../layout/InfoBox";

import styles from "./Hangar.module.css";
import "swiper/css";
import "swiper/css/effect-cards";

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
        <SwiperSlide
          onClick={(event, swiper) => setSelectedCategory("KONWERSJA")}
        >
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
          MONSTEREBIKE
        </SwiperSlide>
        <SwiperSlide onClick={() => setSelectedCategory("EMOTO")}>
          <div className={styles.categoryImg}>
            <Image
              src="https://rebel-electric.com/new/bike_kind/4.png"
              alt="Vehicle category"
              layout="fill"
            />
          </div>
          EMOTO
        </SwiperSlide>
      </Swiper>
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

      {selectedCategory}
    </>
  );
}

export default Hangar;
