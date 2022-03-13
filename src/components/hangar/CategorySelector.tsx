import { ErrorMessage, FormikHelpers, FormikProps } from 'formik';
import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { VehiclesCategories } from '../../models/hangar';

import styles from './CategorySelector.module.scss';

import { useStore } from '../../store/useStore';
import { StoreState } from '../../store/useStore';

import CategorySwiper from './CategorySwiper';

import CategorySwiperStyles from './CategorySwiperStyles';

interface CategorySelectorProps {
  addVehicle?: boolean;
}

const vehiclesCategoriesSelector = (state: StoreState) => state.vehiclesCategories;

const CategorySelector: React.FC<CategorySelectorProps> = (props) => {
  const categorySelector = useCallback<(state: StoreState) => number[]>(
    (state) => {
      if (props.addVehicle === true) return state.addVehicleCategory;
      else return state.hangarCategory;
    },
    [props.addVehicle]
  );

  const setCategorySelector = useCallback<(state: StoreState) => (cat: number[]) => void>(
    (state) => {
      if (props.addVehicle === true) return state.setAddVehicleCategory;
      else return state.setHangarCategory;
    },
    [props.addVehicle]
  );

  const selectedCategory = useStore(categorySelector);
  const setSelectedCategory = useStore(setCategorySelector);
  const vehiclesCategories = useStore(vehiclesCategoriesSelector);

  useEffect(() => {
    if (props.addVehicle === true) {
      useStore.getState().setNewCategoryChosen(true);
    } else {
      useStore.getState().setNewHangarCategoryChosen(true);
    }
  }, [selectedCategory, props.addVehicle]);

  /**
   * Here we are rendering recursively category swipers.
   * Each time we are checking if selected category at current level has child category,
   * if yes - then we are rendering category at current level and one child category level.
   * "selected" is an array that may looks like this [0, 0 ,1, 1, -1]
   * we read this as:
   * [0, selected first category at category level 0
   *  0, selected first category at category level 1
   *  1, selected second category at category level 2
   *  1, selected second category at category level 3
   * -1], no category is selected at category level 4
   *  We dont know if there will be more child categories
   *  Not every categories has child subcategories
   */
  function renderSelectedSwipers(cat: VehiclesCategories, selected: number[]) {
    /**
     * Category level means how deeply nested we are right now in category tree (multi dimensional array of objects)
     * starting from -1 so first increment gives 0 and points to first item in "selected" array
     */
    let currentCatLvl = -1;

    const renderSwiper: (cat: VehiclesCategories, selected: number[]) => React.ReactNode = (
      cat,
      selected
    ) => {
      //increment category level / first is from -1 to 0
      currentCatLvl++;

      const Swiper = (
        //this is actual swiper to render
        <>
          <CategorySwiper
            cat={cat}
            // name={cat.catTitle}
            currentCatLvl={currentCatLvl}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            addVehicle={props.addVehicle}
          />
        </>
      );

      const thereIsCategoryToRenderAtCurrentLevel = cat.categories[selected[currentCatLvl]];

      const thisIsFirstRenderWithoutSelectedCategory = selected[currentCatLvl] === -1;

      if (thereIsCategoryToRenderAtCurrentLevel || thisIsFirstRenderWithoutSelectedCategory) {
        // try to render this category level
        // or first category level if this is first render without any selections
        const thereAreChildCategories = cat.categories[selected[currentCatLvl]]?.child;

        const childCategoryIsNotPowerRelated =
          !cat.categories[selected[currentCatLvl]]?.child?.powerRelated;

        const isNotInAddVEhicleMode = !props.addVehicle ?? true;

        if (thereAreChildCategories && (childCategoryIsNotPowerRelated || isNotInAddVEhicleMode)) {
          // enter recursive mode
          const thisIsFirstTimeGoingThroughCategoryArray =
            selected[currentCatLvl + 1] === undefined;

          if (thisIsFirstTimeGoingThroughCategoryArray)
            // check if this is first time when we are going through category array
            // if yes put -1 at next category level so, next time "renderSwiper" method
            // will know about this child category and will go one step further
            setSelectedCategory([...selectedCategory, -1]);
          return (
            <>
              {/*render swiper at current category level*/}
              {Swiper}

              {/*enter recursive mode but this time as "cat" argument we pass child array*/}
              {renderSwiper(cat.categories[selected[currentCatLvl]].child!, selected)}
            </>
          );
        } else {
          //if there are no child categories or we have no category selected yet at current level
          // then render just current category level
          return Swiper;
        }
      }
    };
    return renderSwiper(cat, selected);
  }

  const renderSelectedCategoriesNames = (cat: VehiclesCategories, selected: number[]) => {
    let currentIndex = -1;

    const renderSelected: (cat: VehiclesCategories, selected: number[]) => React.ReactNode = (
      cat,
      selected
    ) => {
      currentIndex++;
      if (
        selected[currentIndex] !== undefined &&
        cat.categories[selected[currentIndex]] !== undefined
      ) {
        if (
          cat.categories[selected[currentIndex]].child &&
          !cat.categories[selected[currentIndex]]?.child?.powerRelated
        ) {
          return (
            <>
              {/* <p> */}
              {/* {cat.catTitle}:  */}
              {cat.categories[selected[currentIndex]].name} / {/* </p> */}
              {renderSelected(cat.categories[selected[currentIndex]].child!, selected)}
            </>
          );
        } else {
          return (
            // <p>
            // {cat.catTitle}:
            cat.categories[selected[currentIndex]].name
            /* </p> */
          );
        }
      }
    };

    return renderSelected(cat, selected);
  };

  return (
    <>
      <CategorySwiperStyles />
      {renderSelectedSwipers(vehiclesCategories, selectedCategory)}
      {!selectedCategory.includes(-1) && (props.addVehicle ?? false) && (
        <div>
          <p className={styles.selectedCategory}>
            Twój pojazd trafi do kategorii:{' '}
            <strong>{renderSelectedCategoriesNames(vehiclesCategories, selectedCategory)}</strong>
          </p>
        </div>
      )}
    </>
  );
};

export default CategorySelector;
