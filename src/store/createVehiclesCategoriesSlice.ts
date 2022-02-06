import { GetState, SetState } from "zustand";
import { StoreState } from "./useStore";
import { VehiclesCategories } from "../models/hangar";

export interface VehiclesCategoriesState {
  vehiclesCategories: VehiclesCategories;
  setVehiclesCategories: (newValue: boolean) => void;
}

export const createVehiclesCategoriesSlice: (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => VehiclesCategoriesState = (set, get) => ({
  vehiclesCategories: categories,
  setVehiclesCategories: (newValue) => ({ vehiclesCategories: newValue }),
});

const categories = {
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
                          powerRelated: true,
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
                          powerRelated: true,
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
                          powerRelated: true,
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
                          powerRelated: true,
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
                          powerRelated: true,
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
                          powerRelated: true,
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
