import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectCards } from "swiper";

import "swiper/css";
import "swiper/css/effect-cards";
import styles from "./CategorySwiper.module.css";

function CategorySwiper(props) {
  return (
    <div className={styles.container}>
      <Swiper
        modules={[EffectCards]}
        effect={"cards"}
        grabCursor={true}
        className={styles.categorySwiper}
        onActiveIndexChange={(swiper) => console.log(swiper.activeIndex)}
      >
        {props.cat.categories.map((category) => {
          return (
            <SwiperSlide
              onClick={(event, swiper) => setSelectedCategory("eBIKE")}
              key={category.id}
            >
              <div className={styles.categoryImg}>
                <Image
                  src={category.image}
                  alt={`Category ${category.name}`}
                  layout="fill"
                />
              </div>
              {category.name}
            </SwiperSlide>
          );
        })}
      </Swiper>
      {props.cat.catTitle}
    </div>
  );
}

export default CategorySwiper;
