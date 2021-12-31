import CategoryBox from "../layout/CategoryBox";
import CategoryContainer from "../layout/CategoryContainer";
import CategorySwiper from "../layout/CategorySwiper";
import SwiperInDocumentStyles from "../layout/SwiperInDocumentStyles";

function CategorySelector(props) {
  return (
    <>
      <SwiperInDocumentStyles />
      <CategorySwiper cat={dummyVehiclesCat} />
      <CategorySwiper cat={dummyVehiclesCat.categories[0].child} />
      <CategorySwiper
        cat={dummyVehiclesCat.categories[0].child.categories[0].child}
      />
      <CategorySwiper
        cat={
          dummyVehiclesCat.categories[0].child.categories[0].child.categories[0]
            .child
        }
      />
      <CategorySwiper
        cat={
          dummyVehiclesCat.categories[0].child.categories[0].child.categories[0]
            .child.categories[0].child
        }
      />

      {/* <CategoryContainer title="ZAWIESZENIE">
        <CategoryBox />
        <CategoryBox />
        </CategoryContainer>
        
        <CategoryContainer title="NAPĘD">
        <CategoryBox />
        <CategoryBox />
        <CategoryBox />
        </CategoryContainer>
        
        <CategoryContainer title="MOC">
        <CategoryBox />
        <CategoryBox />
        <CategoryBox />
    </CategoryContainer> */}
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
      image: "https://rebel-electric.com/new/bike_kind/2/2/1/3.png",
      child: {
        catTitle: "WYKONANIE",
        categories: [
          {
            id: "2",
            name: "KONWERSJA",
            image: "https://rebel-electric.com/new/bike_kind/4.png",
            child: {
              catTitle: "ZAWIESZENIE",
              categories: [
                {
                  id: "3",
                  name: "SZTYWNY TYŁ",
                  image: "https://rebel-electric.com/new/bike_kind/3.png",
                  child: {
                    catTitle: "NAPĘD",
                    categories: [
                      {
                        id: "3",
                        name: "HUB TYŁ",
                        image: "https://rebel-electric.com/new/bike_kind/3.png",
                        child: {
                          catTitle: "MOC",
                          categories: [
                            {
                              id: "3",
                              name: "NISKA MOC",
                              image:
                                "https://rebel-electric.com/new/bike_kind/3.png",
                            },
                            {
                              id: "1",
                              name: "ŚREDNIA MOC",
                              image:
                                "https://rebel-electric.com/new/bike_kind/2/2/1/3.png",
                            },
                            {
                              id: "4",
                              name: "CRUISER",
                              image:
                                "https://rebel-electric.com/new/bike_kind/4.png",
                            },
                          ],
                        },
                      },
                      {
                        id: "1",
                        name: "HUB PRZÓD",
                        image:
                          "https://rebel-electric.com/new/bike_kind/2/2/1/3.png",
                        child: {
                          catTitle: "MOC",
                          categories: [
                            {
                              id: "3",
                              name: "NISKA MOC",
                              image:
                                "https://rebel-electric.com/new/bike_kind/3.png",
                            },
                            {
                              id: "1",
                              name: "ŚREDNIA MOC",
                              image:
                                "https://rebel-electric.com/new/bike_kind/2/2/1/3.png",
                            },
                            {
                              id: "4",
                              name: "CRUISER",
                              image:
                                "https://rebel-electric.com/new/bike_kind/4.png",
                            },
                          ],
                        },
                      },
                      {
                        id: "4",
                        name: "MID",
                        image: "https://rebel-electric.com/new/bike_kind/4.png",
                        child: {
                          catTitle: "MOC",
                          categories: [
                            {
                              id: "3",
                              name: "NISKA MOC",
                              image:
                                "https://rebel-electric.com/new/bike_kind/3.png",
                            },
                            {
                              id: "1",
                              name: "ŚREDNIA MOC",
                              image:
                                "https://rebel-electric.com/new/bike_kind/2/2/1/3.png",
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
                  image: "https://rebel-electric.com/new/bike_kind/2/2/1/3.png",
                  child: {
                    catTitle: "NAPĘD",
                    categories: [
                      {
                        id: "3",
                        name: "HUB TYŁ",
                        image: "https://rebel-electric.com/new/bike_kind/3.png",
                        child: {
                          catTitle: "MOC",
                          categories: [
                            {
                              id: "3",
                              name: "NISKA MOC",
                              image:
                                "https://rebel-electric.com/new/bike_kind/3.png",
                            },
                            {
                              id: "1",
                              name: "ŚREDNIA MOC",
                              image:
                                "https://rebel-electric.com/new/bike_kind/2/2/1/3.png",
                            },
                            {
                              id: "4",
                              name: "SZALONA MOC",
                              image:
                                "https://rebel-electric.com/new/bike_kind/4.png",
                            },
                          ],
                        },
                      },
                      {
                        id: "1",
                        name: "HUB PRZÓD",
                        image:
                          "https://rebel-electric.com/new/bike_kind/2/2/1/3.png",
                        child: {
                          catTitle: "MOC",
                          categories: [
                            {
                              id: "3",
                              name: "NISKA MOC",
                              image:
                                "https://rebel-electric.com/new/bike_kind/3.png",
                            },
                            {
                              id: "1",
                              name: "ŚREDNIA MOC",
                              image:
                                "https://rebel-electric.com/new/bike_kind/2/2/1/3.png",
                            },
                          ],
                        },
                      },
                      {
                        id: "4",
                        name: "MID",
                        image: "https://rebel-electric.com/new/bike_kind/4.png",
                        child: {
                          catTitle: "MOC",
                          categories: [
                            {
                              id: "3",
                              name: "NISKA MOC",
                              image:
                                "https://rebel-electric.com/new/bike_kind/3.png",
                            },
                            {
                              id: "1",
                              name: "ŚREDNIA MOC",
                              image:
                                "https://rebel-electric.com/new/bike_kind/2/2/1/3.png",
                            },
                            {
                              id: "2",
                              name: "SZALONA MOC",
                              image:
                                "https://rebel-electric.com/new/bike_kind/2/2/1/3.png",
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
            id: "3",
            name: "MONSTERBIKE",
            image: "https://rebel-electric.com/new/bike_kind/3.png",
          },
          {
            id: "1",
            name: "FABRYCZNY",
            image: "https://rebel-electric.com/new/bike_kind/2/2/1/3.png",
          },
          {
            id: "4",
            name: "INNY",
            image: "https://rebel-electric.com/new/bike_kind/4.png",
          },
        ],
      },
    },
    {
      id: "2",
      name: "eMoto",
      image: "https://rebel-electric.com/new/bike_kind/4.png",
    },
    {
      id: "3",
      name: "eCar",
      image: "https://rebel-electric.com/new/bike_kind/3.png",
    },
    {
      id: "4",
      name: "oneWheel",
      image: "https://rebel-electric.com/new/bike_kind/4.png",
    },
  ],
};

const dummyEbikesTypes = {
  catTitle: "WYKONANIE",
  categories: [
    {
      id: "1",
      name: "FABRYCZNY",
      image: "https://rebel-electric.com/new/bike_kind/2/2/1/3.png",
    },
    {
      id: "2",
      name: "KONWERSJA",
      image: "https://rebel-electric.com/new/bike_kind/4.png",
    },
    {
      id: "3",
      name: "MONSTERBIKE",
      image: "https://rebel-electric.com/new/bike_kind/3.png",
    },
    {
      id: "4",
      name: "INNY",
      image: "https://rebel-electric.com/new/bike_kind/4.png",
    },
  ],
};
