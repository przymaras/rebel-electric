import useTranslation from 'next-translate/useTranslation';
import { useEffect, useRef } from 'react';
import SwiperClass from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { DoubleArrowLeft, DoubleArrowRight } from 'src/assets';
import { useWindowResize } from 'src/hooks/useWindowResize/useWindowResize';
import { IVehicleCategories } from 'src/modules/hangar/types/hangar';

import styles from './CategorySwiper.module.scss';

interface CategorySwiperProps {
  selectedCategory: number[];
  currentCatLvl: number;
  addVehicle?: boolean;
  cat: IVehicleCategories;
  setSelectedCategory: (newCategory: number[]) => void;
}

export const CategorySwiper: React.FC<CategorySwiperProps> = (props) => {
  const selectedCategory = props.selectedCategory;
  const setSelectedCategory = props.setSelectedCategory;
  const { t } = useTranslation();

  let timer: number;
  let initialSlide = 1;
  const swiperObject = useRef<SwiperClass>();
  const currentWidth = useWindowResize()[0];

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
      if (swiperObject.current) {
        swiperObject.current.slideTo(1, 400);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cat.categories]); //set last category (without child) to slide no 1  when parent category has changed

  let firstSlideText = '';
  if (props?.addVehicle && props.currentCatLvl === 0) {
    firstSlideText = t(`hangar:catFirstSlideChooseMain`);
  } else if (props?.addVehicle && props.currentCatLvl !== 0) {
    firstSlideText = t(`hangar:catFirstSlideChooseSub`);
  } else if (!props?.addVehicle && props.currentCatLvl === 0) {
    firstSlideText = t(`hangar:catFirstSlideShowAll`);
  } else if (!props?.addVehicle && props.currentCatLvl !== 0) {
    firstSlideText = t(`hangar:catFirstSlideCurrentSub`);
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
            timer = window.setTimeout(() => {
              swiper.slideTo(1, 400);
            }, 100);
          } else if (swiper.isEnd) {
            timer = window.setTimeout(() => {
              swiper.slideTo(props.cat.categories.length + 1, 400);
            }, 100);
          } else if (
            swiper.activeIndex > 0 &&
            swiper.activeIndex < props.cat.categories.length + 2
          ) {
            clearTimeout(timer); // allow user to swipe more than once without reload subcategories
            timer = window.setTimeout(() => {
              setSelectedCategory(
                (() => {
                  const newArray = [...selectedCategory];
                  let newIndex = swiper.activeIndex - 2 < 0 ? -1 : swiper.activeIndex - 2;

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
          if (swiper.clickedIndex !== 0 && swiper.clickedIndex !== swiper.slides.length - 1) {
            timer = window.setTimeout(() => {
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
          <div className={styles.firstSlide}>
            <DoubleArrowLeft height={29} />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <p>{firstSlideText}</p>
        </SwiperSlide>
        {props.cat.categories.map((category) => {
          const SvgImage = category.image;
          return (
            <SwiperSlide
              // onClick={(event, swiper) => setSelectedCategory("eBIKE")}
              key={category.id}
            >
              <div data-testid={`Slide-${category.name}`} className={styles.slideContent}>
                <div className={styles.categoryImg}>
                  <SvgImage title={`Category ${t(`hangar:${category.name}`)}`} height={75} />
                </div>
                <p>{t(`hangar:${category.name}`)}</p>
              </div>
            </SwiperSlide>
          );
        })}

        <SwiperSlide>
          <div className={styles.lastSlide}>
            <DoubleArrowRight height={29} />
          </div>
        </SwiperSlide>
      </Swiper>
      <p className={styles.catName}>{t(`hangar:${props.cat.catTitle}`)}</p>
    </div>
  );
};
