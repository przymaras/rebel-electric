/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

//Swiper Zoom doesn't work for <Image /> element - fix it later

import { useState } from "react";

import VehicleSwiperStyles from "./VehicleSwiperStyles";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Zoom, Lazy } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import "swiper/css/lazy";

import styles from "./VehicleSwiper.module.css";

import { getFullSrc, getSmallThumbSrc } from "../tools/common-functions";

function VehicleSwiper(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <VehicleSwiperStyles />
      <div className={styles.container}>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={false}
          modules={[FreeMode, Navigation, Thumbs, Zoom, Lazy]}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          className="mySwiper2"
          zoom={true}
          lazy={{
            loadPrevNext: true,
          }}
        >
          {props.images.map((image, index) => (
            <SwiperSlide key={index} zoom={true}>
              <img
                src="/img/rebel.jpg"
                data-src={getFullSrc(image, `${props.projectName} ${index}`)}
                alt={`${props.projectName} ${index}`}
                className="swiper-lazy"
              />
              <div className="swiper-lazy-preloader"></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={false}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          className="mySwiper"
        >
          {props.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={getSmallThumbSrc(image, `${props.projectName} ${index}`)}
                alt={`${props.projectName} ${index}`}
                className={styles.thumb}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default VehicleSwiper;
