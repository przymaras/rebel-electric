import useTranslation from 'next-translate/useTranslation';
import { useCallback } from 'react';
import { useEffect } from 'react';

import { CategorySwiper } from 'src/modules/hangar/components/CategorySwiper';
import { CategorySwiperStyles } from 'src/modules/hangar/components/CategorySwiperStyles';
import { vehicleCategories } from 'src/modules/hangar/store/vehicleCategories';
import { IVehicleCategories } from 'src/modules/hangar/types/hangar';
import { useStore, StoreState } from 'src/store/useStore';

import styles from './CategorySelector.module.scss';

interface CategorySelectorProps {
  addVehicle?: boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = (props) => {
  const { t } = useTranslation();
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
  function renderSelectedSwipers(cat: IVehicleCategories, selected: number[]) {
    /**
     * Category level means how deeply nested we are right now in category tree (multi dimensional array of objects)
     * starting from -1 so first increment gives 0 and points to first item in "selected" array
     */
    let currentCatLvl2 = -1;

    const renderSwiper: (cat: IVehicleCategories, selected: number[]) => React.ReactNode = (
      cat2,
      selected2
    ) => {
      //increment category level / first is from -1 to 0
      currentCatLvl2 += 1;

      const Swiper = (
        //this is actual swiper to render
        <>
          <CategorySwiper
            cat={cat2}
            // name={cat.catTitle}
            currentCatLvl={currentCatLvl2}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            addVehicle={props.addVehicle}
          />
        </>
      );

      const thereIsCategoryToRenderAtCurrentLevel = cat2.categories[selected2[currentCatLvl2]];

      const thisIsFirstRenderWithoutSelectedCategory = selected2[currentCatLvl2] === -1;

      if (thereIsCategoryToRenderAtCurrentLevel || thisIsFirstRenderWithoutSelectedCategory) {
        // try to render this category level
        // or first category level if this is first render without any selections
        const thereAreChildCategories = cat2.categories[selected2[currentCatLvl2]]?.child;

        const childCategoryIsNotPowerRelated =
          !cat2.categories[selected2[currentCatLvl2]]?.child?.powerRelated;

        const isNotInAddVEhicleMode = !props.addVehicle ?? true;

        if (thereAreChildCategories && (childCategoryIsNotPowerRelated || isNotInAddVEhicleMode)) {
          // enter recursive mode
          const thisIsFirstTimeGoingThroughCategoryArray =
            selected2[currentCatLvl2 + 1] === undefined;

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
              {renderSwiper(cat2.categories[selected2[currentCatLvl2]].child!, selected2)}
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

  const renderSelectedCategoriesNames = (cat: IVehicleCategories, selected: number[]) => {
    let currentIndex2 = -1;

    const renderSelected: (cat: IVehicleCategories, selected: number[]) => React.ReactNode = (
      cat2,
      selected2
    ) => {
      currentIndex2 += 1;
      if (
        selected2[currentIndex2] !== undefined &&
        cat2.categories[selected2[currentIndex2]] !== undefined
      ) {
        if (
          cat2.categories[selected2[currentIndex2]].child &&
          !cat2.categories[selected2[currentIndex2]]?.child?.powerRelated
        ) {
          return (
            <>
              {/* <p> */}
              {/* {cat.catTitle}:  */}
              {t(`hangar:${cat2.categories[selected2[currentIndex2]].name}`)} / {/* </p> */}
              {renderSelected(cat2.categories[selected2[currentIndex2]].child!, selected2)}
            </>
          );
        } else {
          return (
            // <p>
            // {cat.catTitle}:
            t(`hangar:${cat2.categories[selected2[currentIndex2]].name}`)
            /* </p> */
          );
        }
      }
    };

    return renderSelected(cat, selected);
  };

  return (
    <div data-testid='CategorySelector'>
      <CategorySwiperStyles />
      {renderSelectedSwipers(vehicleCategories, selectedCategory)}
      {!selectedCategory.includes(-1) && (props.addVehicle ?? false) && (
        <div>
          <p className={styles.selectedCategory}>
            {t('hangar:catChosen')}{' '}
            <strong>{renderSelectedCategoriesNames(vehicleCategories, selectedCategory)}</strong>
          </p>
        </div>
      )}
    </div>
  );
};
