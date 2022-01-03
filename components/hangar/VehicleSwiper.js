/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

//Swiper Zoom doesn't work for <Image /> element - fix it later

import { useState } from "react";

import VehicleSwiperStyles from "./VehicleSwiperStyles";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Zoom } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/zoom";

import styles from "./VehicleSwiper.module.css";

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
          modules={[FreeMode, Navigation, Thumbs, Zoom]}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          className="mySwiper2"
          zoom={true}
        >
          <SwiperSlide zoom={true}>
            <img src="https://rebel-electric.com/new/full/2079" />
          </SwiperSlide>

          <SwiperSlide zoom={true}>
            <img src="https://rebel-electric.com/new/full/2080" />
          </SwiperSlide>
          <SwiperSlide zoom={true}>
            <img src="https://rebel-electric.com/new/full/2081" />
          </SwiperSlide>
          <SwiperSlide zoom={true}>
            <img src="https://rebel-electric.com/new/full/2082" />
          </SwiperSlide>
          <SwiperSlide zoom={true}>
            <img src="https://rebel-electric.com/new/full/2083" />
          </SwiperSlide>
          <SwiperSlide zoom={true}>
            <img src="https://rebel-electric.com/new/full/2084" />
          </SwiperSlide>
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={false}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          className="mySwiper"
          zoom={true}
        >
          <SwiperSlide>
            <img src="https://rebel-electric.com/new/thumb/2079.jpg" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="https://rebel-electric.com/new/thumb/2080.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://rebel-electric.com/new/thumb/2081.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://rebel-electric.com/new/thumb/2082.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://rebel-electric.com/new/thumb/2083.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://rebel-electric.com/new/thumb/2084.jpg" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

export default VehicleSwiper;
