import { useState } from "react";
import CategorySwiper from "../layout/CategorySwiper";
import CategorySwiperStyles from "./CategorySwiperStyles";

function CategorySelector(props) {
  const [selectedIndexes, setSelectedIndexes] = useState([-1]);

  function renderSelectedSwipers(cat, selected) {
    let currentCatLvl = -1;

    function renderSwiper(cat, selected) {
      currentCatLvl++;
      const Swiper = (
        <CategorySwiper
          cat={cat}
          name={cat.catTitle}
          currentCatLvl={currentCatLvl}
          selectedIndexes={selectedIndexes}
          setSelectedIndexes={setSelectedIndexes}
        />
      );

      if (
        selected[currentCatLvl] !== undefined &&
        cat.categories[selected[currentCatLvl]] !== undefined
      ) {
        if (cat.categories[selected[currentCatLvl]].child) {
          if (selected[currentCatLvl + 1] === undefined)
            setSelectedIndexes((p) => [...p, -1]);
          return (
            <>
              {Swiper}
              {renderSwiper(
                cat.categories[selected[currentCatLvl]].child,
                selected
              )}
            </>
          );
        } else {
          return Swiper;
        }
      } else if (selected[currentCatLvl] === -1) {
        return Swiper;
      }
    }
    return renderSwiper(cat, selected);
  }

  function renderSelectedCategoriesNames(cat, selected) {
    let currentIndex = -1;

    function renderSelected(cat, selected) {
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
    }

    return renderSelected(cat, selected);
  }

  return (
    <>
      <CategorySwiperStyles />
      {renderSelectedSwipers(dummyVehiclesCat, selectedIndexes)}
      {renderSelectedCategoriesNames(dummyVehiclesCat, selectedIndexes)}
    </>
  );
}

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
      id: "3",
      name: "eCar",
      image: "/img/categories/other.svg",
    },
    {
      id: "4",
      name: "Inny",
      image: "/img/categories/other.svg",
    },
  ],
};
