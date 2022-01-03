import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef } from "react";

import { useWindowResize } from "../../hooks/useWindowResize";

import "swiper/css";
import styles from "./CategorySwiper.module.css";

function CategorySwiper(props) {
  let timer;
  let initialSlide = 1;
  const swiperObject = useRef(() => {});
  const [currentWidth, currentHeight] = useWindowResize();

  if (
    props.selectedIndexes[props.currentCatLvl] !== undefined &&
    props.selectedIndexes[props.currentCatLvl] !== -1
  ) {
    initialSlide = props.selectedIndexes[props.currentCatLvl] + 2;
  }
  console.log(initialSlide);
  useEffect(() => {
    if (
      props.selectedIndexes[props.currentCatLvl] !== undefined &&
      props.selectedIndexes[props.currentCatLvl] === -1
    ) {
      swiperObject.current.slideTo(1, 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cat.categories]); //set last category (without child) to slide no 1  when parent category has changed

  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={currentWidth > 700 ? (currentWidth > 1024 ? 6 : 4) : 2}
        initialSlide={initialSlide}
        centeredSlides={true}
        spaceBetween={10}
        grabCursor={true}
        className={styles.categorySwiper}
        // slideToClickedSlide={true}
        // loop={true}
        onActiveIndexChange={(swiper) => {
          if (swiper.isBeginning) {
            timer = setTimeout(() => {
              swiper.slideTo(1, 400);
            }, 100);
          } else if (swiper.isEnd) {
            timer = setTimeout(() => {
              swiper.slideTo(props.cat.categories.length + 1, 400);
            }, 100);
          } else if (
            swiper.activeIndex > 0 &&
            swiper.activeIndex < props.cat.categories.length + 2
          ) {
            clearTimeout(timer); // allow user to swipe more than once without reload subcategories
            timer = setTimeout(() => {
              props.setSelectedIndexes((prevIndexes) => {
                const newArray = [...prevIndexes];
                let newIndex =
                  swiper.activeIndex - 2 < 0 ? -1 : swiper.activeIndex - 2;

                if (newIndex > props.cat.categories.length - 1) {
                  newIndex = props.cat.categories.length - 1;
                } //sometimes fast repetitions of onReachEnd caused index value to overflow

                if (!newIndex) {
                  newIndex = 0;
                } //sometimes fast repetitions of onReachBeginning caused index value to be NaN
                newArray.splice(props.currentCatLvl, 1, newIndex);
                newArray.splice(props.currentCatLvl + 1);
                return newArray;
              });
            }, 800);
          }
        }}
        // onReachBeginning={(swiper) =>
        //   (timer = setTimeout(() => {
        //     swiper.slideTo(1, 400);
        //   }, 100))
        // }
        // onReachEnd={(swiper) =>
        //   (timer = setTimeout(() => {
        //     swiper.slideTo(props.cat.categories.length + 1, 400);
        //   }, 100))
        // }
        onClick={(swiper) => {
          if (
            swiper.clickedIndex !== 0 &&
            swiper.clickedIndex !== swiper.slides.length - 1
          ) {
            timer = setTimeout(() => {
              swiper.slideTo(swiper.clickedIndex, 400);
              // console.log(swiper.realIndex);
              // swiper.init();
            }, 100);
          }
        }}
        onAfterInit={(swiper) => {
          clearTimeout(timer);
          swiperObject.current = swiper;
        }}
      >
        <SwiperSlide>
          <div className={styles.firstSlide}></div>
        </SwiperSlide>

        <SwiperSlide>
          <p>
            {props.currentCatLvl === 0
              ? "Pokaż wszystkie (bez filtra kategorii)"
              : "Pokaż wszystkie z tej podkategorii"}
          </p>
        </SwiperSlide>
        {props.cat.categories.map((category) => {
          return (
            <SwiperSlide
              // onClick={(event, swiper) => setSelectedCategory("eBIKE")}
              key={category.id}
            >
              <div className={styles.slideContent}>
                <div className={styles.categoryImg}>
                  <Image
                    src={category.image}
                    alt={`Category ${category.name}`}
                    layout="fill"
                  />
                </div>
                <p>{category.name}</p>
              </div>
            </SwiperSlide>
          );
        })}

        <SwiperSlide>
          <div className={styles.lastSlide}></div>
        </SwiperSlide>
      </Swiper>
      <p className={styles.catName}>{props.cat.catTitle}</p>
    </div>
  );
}

export default CategorySwiper;
