import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperClass from "swiper";
import { useEffect, useRef } from "react";

import { useWindowResize } from "../../hooks/useWindowResize";

import "swiper/css";
import styles from "./CategorySwiper.module.scss";
import { VehiclesCategories } from "../../models/hangar";

interface CategorySwiperProps {
  selectedCategory: number[];
  currentCatLvl: number;
  addVehicle?: boolean;
  cat: VehiclesCategories;
  setSelectedCategory: (newCategory: number[]) => void;
}

const CategorySwiper: React.FC<CategorySwiperProps> = (props) => {
  const selectedCategory = props.selectedCategory;
  const setSelectedCategory = props.setSelectedCategory;

  let timer: any;
  let initialSlide = 1;
  const swiperObject = useRef<SwiperClass>();
  const [currentWidth, currentHeight] = useWindowResize();

  if (
    selectedCategory[props.currentCatLvl] !== undefined &&
    selectedCategory[props.currentCatLvl] !== -1
  ) {
    initialSlide = selectedCategory[props.currentCatLvl] + 2;
  }

  useEffect(() => {
    if (
      selectedCategory[props.currentCatLvl] !== undefined &&
      selectedCategory[props.currentCatLvl] === -1
    ) {
      swiperObject.current!.slideTo(1, 400);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cat.categories]); //set last category (without child) to slide no 1  when parent category has changed

  let firstSlideText = "";
  if (props?.addVehicle && props.currentCatLvl === 0) {
    firstSlideText = "Wybierz kategorię główną";
  } else if (props?.addVehicle && props.currentCatLvl !== 0) {
    firstSlideText = "Wybierz podkategorię";
  } else if (!props?.addVehicle && props.currentCatLvl === 0) {
    firstSlideText = "Pokaż wszystkie (bez filtra kategorii)";
  } else if (!props?.addVehicle && props.currentCatLvl !== 0) {
    firstSlideText = "Pokaż wszystkie z tej podkategorii";
  }

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
              setSelectedCategory(
                (() => {
                  const newArray = [...selectedCategory];
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
                })()
              );
            }, 400);
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
          <p>{firstSlideText}</p>
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
};

export default CategorySwiper;
