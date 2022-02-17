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

const categories: VehiclesCategories = {
  catTitle: "RODZAJ POJAZDU",
  categories: [
    {
      id: "cGB6DW-xNd8GdX4I9N24S",
      name: "eBike",
      image: "/img/categories/ebike/ebike-factory.svg",
      child: {
        catTitle: "WYKONANIE",
        categories: [
          {
            id: "DwNLVj_Mf-bHgSzsL1KZL",
            name: "KONWERSJA",
            image: "/img/categories/ebike/ebike-conversion.svg",
            child: {
              catTitle: "ZAWIESZENIE",
              categories: [
                {
                  id: "XKBYwLwfXn_Emv8E1hztm",
                  name: "SZTYWNY TYŁ",
                  image: "/img/categories/ebike/ebike-conversion-ht.svg",
                  child: {
                    catTitle: "NAPĘD",
                    categories: [
                      {
                        id: "in1KQgvIjIC1bmV0hBOZd",
                        name: "HUB TYŁ",
                        image:
                          "/img/categories/ebike/ebike-conversion-ht-hub_r.svg",
                        child: {
                          catTitle: "MOC",
                          powerRelated: true,
                          categories: [
                            {
                              id: "OFk8Ql-Cu18GRgsV6cfF1",
                              name: "ŚREDNIA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-hub_r-mp.svg",
                            },
                            {
                              id: "b0YlW9bMwRUXV6Au3cDH_",
                              name: "DUŻA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-hub_r-hp.svg",
                            },
                            {
                              id: "Vno_VCgCqeoT6XVNXmBo1",
                              name: "CRUISER",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-hub_r-cruiser.svg",
                            },
                          ],
                        },
                      },
                      {
                        id: "1mkxGiFObWo1Jz2yYtT1Q",
                        name: "HUB PRZÓD",
                        image:
                          "/img/categories/ebike/ebike-conversion-ht-hub_f.svg",
                        child: {
                          catTitle: "MOC",
                          powerRelated: true,
                          categories: [
                            {
                              id: "hL96QxppkzaN_4lAU6nPZ",
                              name: "NISKA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-hub_f-lp.svg",
                            },
                            {
                              id: "hL96QxppkzaN_4lAU6nPZ",
                              name: "ŚREDNIA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-hub_f-mp.svg",
                            },
                            {
                              id: "hL96QxppkzaN_4lAU6nPZ",
                              name: "CRUISER",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-hub_f-cruiser.svg",
                            },
                          ],
                        },
                      },
                      {
                        id: "hL96QxppkzaN_4lAU6nPZ",
                        name: "MID",
                        image:
                          "/img/categories/ebike/ebike-conversion-ht-mid.svg",
                        child: {
                          catTitle: "MOC",
                          powerRelated: true,
                          categories: [
                            {
                              id: "VH20EFscWX5RZZvVANgmo",
                              name: "NISKA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-ht-mid-lp.svg",
                            },
                            {
                              id: "yrYPh2P9uiIIcvXKI0U7A",
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
                  id: "vdn0glY4OxzyMAROdDRnK",
                  name: "AMORTYZOWANY",
                  image: "/img/categories/ebike/ebike-conversion-full.svg",
                  child: {
                    catTitle: "NAPĘD",
                    categories: [
                      {
                        id: "DDwqfomYcMsHwEVEgkpE4",
                        name: "HUB TYŁ",
                        image:
                          "/img/categories/ebike/ebike-conversion-full-hub_r.svg",
                        child: {
                          catTitle: "MOC",
                          powerRelated: true,
                          categories: [
                            {
                              id: "Kqvsu-NJb4sWLsq9xl5V_",
                              name: "ŚREDNIA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-hub_r-mp.svg",
                            },
                            {
                              id: "cg-RsVO3_knIoap7k9Ac3",
                              name: "DUŻA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-hub_r-hp.svg",
                            },
                            {
                              id: "LV-grOQ1I-kqPhu-mFf1T",
                              name: "SZALONA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-hub_r-ip.svg",
                            },
                          ],
                        },
                      },
                      {
                        id: "ZCaoFYRpohPFZDPPaxI9B",
                        name: "HUB PRZÓD",
                        image:
                          "/img/categories/ebike/ebike-conversion-full-hub_f.svg",
                        child: {
                          catTitle: "MOC",
                          powerRelated: true,
                          categories: [
                            {
                              id: "A54ydtMWJh1PYfITzkxO7",
                              name: "NISKA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-hub_f-lp.svg",
                            },
                            {
                              id: "uRo95TnWiEhVNqgGMshB3",
                              name: "ŚREDNIA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-hub_f-mp.svg",
                            },
                          ],
                        },
                      },
                      {
                        id: "W9mxgnMZbSsp-s8HzAR1U",
                        name: "MID",
                        image:
                          "/img/categories/ebike/ebike-conversion-full-mid.svg",
                        child: {
                          catTitle: "MOC",
                          powerRelated: true,
                          categories: [
                            {
                              id: "WvLux4IwSCJtsvSW1idgb",
                              name: "ŚREDNIA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-mid-mp.svg",
                            },
                            {
                              id: "kCOfhCzz9EEiQdsN-sA26",
                              name: "DUŻA MOC",
                              image:
                                "/img/categories/ebike/ebike-conversion-full-mid-hp.svg",
                            },
                            {
                              id: "JE_RWSU9TC0sDG79X3oCe",
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
            id: "ZAFEtsbS_twu60cJPh8mY",
            name: "FABRYCZNY",
            image: "/img/categories/ebike/ebike-factory.svg",
            child: {
              catTitle: "ZAWIESZENIE",
              categories: [
                {
                  id: "TV7T57ayF7ehqp68Zl394",
                  name: "SZTYWNY TYŁ",
                  image: "/img/categories/ebike/ebike-factory-ht.svg",
                },
                {
                  id: "GvsG6l4X2Fl_0KCKobP9M",
                  name: "AMORTYZOWANY",
                  image: "/img/categories/ebike/ebike-factory-full.svg",
                },
              ],
            },
          },
          {
            id: "gpIumLWLhuYRdG9SATW_O",
            name: "INNY",
            image: "/img/categories/other.svg",
          },
        ],
      },
    },
    {
      id: "o_4BEAOpUnqWndFlFu8FM",
      name: "MONSTER eBIKE",
      image: "/img/categories/ebike/ebike-monster.svg",
      child: {
        catTitle: "TYP",
        categories: [
          {
            id: "maIs1g-It6gQHE03B16oz",
            name: "GÓRSKI",
            image: "/img/categories/ebike/ebike-monster-hill_c.svg",
          },
          {
            id: "31gPVruvZ1URza7Rk4EqN",
            name: "SPEED",
            image: "/img/categories/ebike/ebike-monster-speed.svg",
          },
          {
            id: "a6VkOdtqJGt1Q2wH_jUiw",
            name: "LEKKI",
            image: "/img/categories/ebike/ebike-monster-light.svg",
          },
        ],
      },
    },
    {
      id: "Tj-t6OmSgcjst7vS0VTlP",
      name: "eMoto",
      image: "/img/categories/emoto/emoto.svg",
      child: {
        catTitle: "WYKONANIE",
        categories: [
          {
            id: "fG9Fg1QGmx2BuuKbQY_bE",
            name: "FABRYCZNY",
            image: "/img/categories/emoto/emoto-factory.svg",
          },
          {
            id: "A_e5lCIX0OAKJ3KRnp7CA",
            name: "KONWERSJA",
            image: "/img/categories/emoto/emoto-conversion-mid.svg",
            child: {
              catTitle: "NAPĘD",
              categories: [
                {
                  id: "fiHHGNgmMMA2h7FYOrXgY",
                  name: "HUB TYŁ",
                  image: "/img/categories/emoto/emoto-conversion-hub.svg",
                },
                {
                  id: "VWt61uiWvxzxijHCVOyj7",
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
      id: "gJTvJiV6d6CHgnawhIz7v",
      name: "eCar",
      image: "/img/categories/other.svg",
    },
    {
      id: "5ttnUNAu5tC0w7lBDgPx2",
      name: "Inny",
      image: "/img/categories/other.svg",
    },
  ],
};
