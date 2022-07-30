/* eslint-disable jsx-a11y/alt-text */

/* eslint-disable @next/next/no-img-element */
//Swiper Zoom doesn't work for <Image /> element - fix it later
import React, { useState } from 'react';
import SwiperClass, { FreeMode, Navigation, Thumbs, Zoom, Lazy } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/lazy';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import { Swiper, SwiperSlide } from 'swiper/react';

import { VehicleSwiperStyles } from 'src/modules/hangar/components/VehicleSwiperStyles';
import { getFullSrc, getSmallThumbSrc } from 'src/utils/common-functions';

import styles from './VehicleSwiper.module.scss';

interface VehicleSwiperProps {
  images: string[];
  projectName: string;
}

export const VehicleSwiper: React.FC<VehicleSwiperProps> = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  const handleSetSwiper = (swiperObject: SwiperClass) => {
    setThumbsSwiper(swiperObject);
  };

  return (
    <>
      <VehicleSwiperStyles />
      <div data-testid='VehicleSwiper' className={styles.container}>
        <Swiper
          loop={false}
          modules={[FreeMode, Navigation, Thumbs, Zoom, Lazy]}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          className='mySwiper2'
          zoom={true}
          lazy={{
            loadPrevNext: true,
          }}
        >
          {props.images.map((imageName, index) => (
            <SwiperSlide key={index} zoom={true}>
              <img
                src='/img/rebel-logo-2000.svg'
                data-src={getFullSrc({ imageName, seoName: `${props.projectName} ${index}` })}
                alt={`${props.projectName} ${index}`}
                className='swiper-lazy'
              />
              <div className='swiper-lazy-preloader'></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          onSwiper={handleSetSwiper}
          loop={false}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          className='mySwiper'
        >
          {props.images.map((imageName, index) => (
            <SwiperSlide key={index}>
              <img
                src={getSmallThumbSrc({ imageName, seoName: `${props.projectName} ${index}` })}
                alt={`${props.projectName} ${index}`}
                className={styles.thumb}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
