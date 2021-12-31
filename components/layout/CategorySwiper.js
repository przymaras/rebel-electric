import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCards } from "swiper";

import "swiper/css";
import "swiper/css/effect-cards";
import styles from "./CategorySwiper.module.css";

import handRight from "../../public/img/hand-point-right-solid.svg";
import handLeft from "../../public/img/hand-point-left-solid.svg";

function CategorySwiper(props) {
  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={2}
        centeredSlides={true}
        spaceBetween={10}
        grabCursor={true}
        className={styles.categorySwiper}
        // onActiveIndexChange={(swiper) => console.log(swiper.activeIndex)}
        onReachBeginning={(swiper) =>
          setTimeout(() => {
            swiper.slideNext(400);
          }, 100)
        }
        onReachEnd={(swiper) =>
          setTimeout(() => {
            swiper.slidePrev(400);
          }, 100)
        }
      >
        <SwiperSlide>
          <div className={styles.firstSlide}></div>
        </SwiperSlide>
        {props.cat.categories.map((category) => {
          return (
            <SwiperSlide
              // onClick={(event, swiper) => setSelectedCategory("eBIKE")}
              key={category.id}
            >
              <div className={styles.categoryImg}>
                <Image
                  src={category.image}
                  alt={`Category ${category.name}`}
                  layout="fill"
                />
              </div>
              <p>{category.name}</p>
            </SwiperSlide>
          );
        })}
        <SwiperSlide>
          <div className={styles.lastSlide}></div>
        </SwiperSlide>
      </Swiper>
      {props.cat.catTitle}
    </div>
  );
}

export default CategorySwiper;
