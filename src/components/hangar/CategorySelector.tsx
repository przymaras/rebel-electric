import { ErrorMessage, FormikHelpers, FormikProps } from "formik";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { CategoriesObj } from "../../models/hangar";

import { useHangarStore } from "../../store/useHangarStore";
import { HangarStoreState } from "../../store/useHangarStore";

import CategorySwiper from "./CategorySwiper";

import CategorySwiperStyles from "./CategorySwiperStyles";

interface CategorySelectorProps {
  addVehicle?: boolean;
}

const CategorySelector: React.FC<CategorySelectorProps> = (props) => {
  const categorySelector = useCallback<(state: HangarStoreState) => number[]>(
    (state) => {
      if (props.addVehicle === true) return state.addVehicleCategory;
      else return state.hangarCategory;
    },
    [props.addVehicle]
  );

  const setCategorySelector = useCallback<
    (state: HangarStoreState) => (cat: number[]) => void
  >(
    (state) => {
      if (props.addVehicle === true) return state.setAddVehicleCategory;
      else return state.setHangarCategory;
    },
    [props.addVehicle]
  );

  const selectedCategory = useHangarStore(categorySelector);
  const setSelectedCategory = useHangarStore(setCategorySelector);

  useEffect(() => {
    useHangarStore.getState().setNewCategoryChosen(true);
  }, [selectedCategory]);

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
  function renderSelectedSwipers(cat: CategoriesObj, selected: number[]) {
    /**
     * Category level means how deeply nested we are right now in category tree (multi dimensional array of objects)
     * starting from -1 so first increment gives 0 and points to first item in "selected" array
     */
    let currentCatLvl = -1;

    const renderSwiper: (
      cat: CategoriesObj,
      selected: number[]
    ) => React.ReactNode = (cat, selected) => {
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
          />
        </>
      );

      const thereIsCategoryToRenderAtCurrentLevel =
        cat.categories[selected[currentCatLvl]];

      const thisIsFirstRenderWithoutSelectedCategory =
        selected[currentCatLvl] === -1;

      if (
        thereIsCategoryToRenderAtCurrentLevel ||
        thisIsFirstRenderWithoutSelectedCategory
      ) {
        // try to render this category level
        // or first category level if this is first render without any selections
        const thereAreChildCategories =
          cat.categories[selected[currentCatLvl]]?.child;
        if (thereAreChildCategories) {
          // enter recursive mode
          const thereIsFreePlaceForThisSubCategoriesInArray =
            selected[currentCatLvl + 1] === undefined;
          if (thereIsFreePlaceForThisSubCategoriesInArray)
            // check if this is first time when we are going through category array
            // if yes put -1 at next category level so, next time "renderSwiper" method
            // will know about this child category and will go one step further
            setSelectedCategory([...selectedCategory, -1]);
          return (
            <>
              {/*render swiper at current category level*/}
              {Swiper}

              {/*enter recursive mode but this time as "cat" argument we pass child array*/}
              {renderSwiper(
                cat.categories[selected[currentCatLvl]].child,
                selected
              )}
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

  const renderSelectedCategoriesNames = (
    cat: CategoriesObj,
    selected: number[]
  ) => {
    let currentIndex = -1;

    const renderSelected: (
      cat: CategoriesObj,
      selected: number[]
    ) => React.ReactNode = (cat, selected) => {
      currentIndex++;
      if (
        selected[currentIndex] !== undefined &&
        cat.categories[selected[currentIndex]] !== undefined
      ) {
        if (cat.categories[selected[currentIndex]].child) {
          return (
            <>
              <p>
                {cat.catTitle}: {cat.categories[selected[currentIndex]].name}
              </p>
              {renderSelected(
                cat.categories[selected[currentIndex]].child,
                selected
              )}
            </>
          );
        } else {
          return (
            <p>
              {cat.catTitle}: {cat.categories[selected[currentIndex]].name}
            </p>
          );
        }
      }
    };

    return renderSelected(cat, selected);
  };

  return (
    <>
      <CategorySwiperStyles />
      {renderSelectedSwipers(dummyVehiclesCat, selectedCategory)}
      {renderSelectedCategoriesNames(dummyVehiclesCat, selectedCategory)}
    </>
  );
};

export default CategorySelector;

const dummyVehiclesCat = {
  catTitle: "RODZAJ POJAZDU",
  categories: [
    {
      id: "1",
      name: "eBike",
      image: "/img/categories/ebike/ebike-factory.svg",
      child: {
        catTitle: "WYKONANIE",
        categories: [
          {
            id: "2",
            name: "KONWERSJA",
            image: "/img/categories/ebike/ebike-conversion.svg",
            child: {
              catTitle: "ZAWIESZENIE",
              categories: [
                {
                  id: "3",
                  name: "SZTYWNY TYŁ",
                  image: "/img/categories/ebike/ebike-conversion-ht.svg",
                  child: {
                    catTitle: "NAPĘD",
                    categories: [
                      {
                        id: "3",
                        name: "HUB TYŁ",
                        image:
                          "/img/categories/ebike/ebike-conversion-ht-hub_r.svg",
                        child: {
                          catTitle: "MOC",
                          categories: [
                            {
                              id: "3",
                              name: "ŚREDNIA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-hub_r-mp.svg",
                            },
                            {
                              id: "1",
                              name: "DUŻA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-hub_r-hp.svg",
                            },
                            {
                              id: "4",
                              name: "CRUISER",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-hub_r-cruiser.svg",
                            },
                          ],
                        },
                      },
                      {
                        id: "1",
                        name: "HUB PRZÓD",
                        image:
                          "/img/categories/ebike/ebike-conversion-ht-hub_f.svg",
                        child: {
                          catTitle: "MOC",
                          categories: [
                            {
                              id: "3",
                              name: "NISKA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-hub_f-lp.svg",
                            },
                            {
                              id: "1",
                              name: "ŚREDNIA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-hub_f-mp.svg",
                            },
                            {
                              id: "4",
                              name: "CRUISER",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-hub_f-cruiser.svg",
                            },
                          ],
                        },
                      },
                      {
                        id: "4",
                        name: "MID",
                        image:
                          "/img/categories/ebike/ebike-conversion-ht-mid.svg",
                        child: {
                          catTitle: "MOC",
                          categories: [
                            {
                              id: "3",
                              name: "NISKA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-mid-lp.svg",
                            },
                            {
                              id: "1",
                              name: "ŚREDNIA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-mid-mp.svg",
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  id: "1",
                  name: "AMORTYZOWANY",
                  image: "/img/categories/ebike/ebike-conversion-full.svg",
                  child: {
                    catTitle: "NAPĘD",
                    categories: [
                      {
                        id: "3",
                        name: "HUB TYŁ",
                        image:
                          "/img/categories/ebike/ebike-conversion-full-hub_r.svg",
                        child: {
                          catTitle: "MOC",
                          categories: [
                            {
                              id: "3",
                              name: "ŚREDNIA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-hub_r-mp.svg",
                            },
                            {
                              id: "1",
                              name: "DUŻA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-hub_r-hp.svg",
                            },
                            {
                              id: "4",
                              name: "SZALONA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-hub_r-ip.svg",
                            },
                          ],
                        },
                      },
                      {
                        id: "1",
                        name: "HUB PRZÓD",
                        image:
                          "/img/categories/ebike/ebike-conversion-full-hub_f.svg",
                        child: {
                          catTitle: "MOC",
                          categories: [
                            {
                              id: "32",
                              name: "NISKA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-hub_f-lp.svg",
                            },
                            {
                              id: "11",
                              name: "ŚREDNIA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-hub_f-mp.svg",
                            },
                          ],
                        },
                      },
                      {
                        id: "4",
                        name: "MID",
                        image:
                          "/img/categories/ebike/ebike-conversion-full-mid.svg",
                        child: {
                          catTitle: "MOC",
                          categories: [
                            {
                              id: "6",
                              name: "ŚREDNIA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-mid-mp.svg",
                            },
                            {
                              id: "7",
                              name: "DUŻA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-mid-hp.svg",
                            },
                            {
                              id: "8",
                              name: "SZALONA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-mid-ip.svg",
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            id: "1",
            name: "FABRYCZNY",
            image: "/img/categories/ebike/ebike-factory.svg",
            child: {
              catTitle: "ZAWIESZENIE",
              categories: [
                {
                  id: "6",
                  name: "SZTYWNY TYŁ",
                  image: "/img/categories/ebike/ebike-factory-ht.svg",
                },
                {
                  id: "7",
                  name: "AMORTYZOWANY",
                  image: "/img/categories/ebike/ebike-factory-full.svg",
                },
              ],
            },
          },
          {
            id: "4",
            name: "INNY",
            image: "/img/categories/other.svg",
          },
        ],
      },
    },
    {
      id: "3",
      name: "MONSTER eBIKE",
      image: "/img/categories/ebike/ebike-monster.svg",
      child: {
        catTitle: "TYP",
        categories: [
          {
            id: "6",
            name: "GÓRSKI",
            image: "/img/categories/ebike/ebike-monster-hill_c.svg",
          },
          {
            id: "7",
            name: "SPEED",
            image: "/img/categories/ebike/ebike-monster-speed.svg",
          },
          {
            id: "8",
            name: "LEKKI",
            image: "/img/categories/ebike/ebike-monster-light.svg",
          },
        ],
      },
    },
    {
      id: "2",
      name: "eMoto",
      image: "/img/categories/emoto/emoto.svg",
      child: {
        catTitle: "WYKONANIE",
        categories: [
          {
            id: "2",
            name: "FABRYCZNY",
            image: "/img/categories/emoto/emoto-factory.svg",
          },
          {
            id: "3",
            name: "KONWERSJA",
            image: "/img/categories/emoto/emoto-conversion-mid.svg",
            child: {
              catTitle: "NAPĘD",
              categories: [
                {
                  id: "2",
                  name: "HUB TYŁ",
                  image: "/img/categories/emoto/emoto-conversion-hub.svg",
                },
                {
                  id: "3",
                  name: "MID",
                  image: "/img/categories/emoto/emoto-conversion-mid.svg",
                },
              ],
            },
          },
        ],
      },
    },

    {
      id: "4",
      name: "eCar",
      image: "/img/categories/other.svg",
    },
    {
      id: "5",
      name: "Inny",
      image: "/img/categories/other.svg",
    },
  ],
};
