import create from "zustand";

import {
  AddVehicleCategoryState,
  createAddVehicleCategorySlice,
} from "./createAddVehicleCategorySlice";

import {
  HangarCategoryState,
  createHangarCategorySlice,
} from "./createHangarCategorySlice";

import {
  VehiclesCategoriesState,
  createVehiclesCategoriesSlice,
} from "./createVehiclesCategoriesSlice";

export type StoreState = HangarCategoryState &
  AddVehicleCategoryState &
  VehiclesCategoriesState;

export const useStore = create<StoreState>((set, get) => ({
  ...createAddVehicleCategorySlice(set, get),
  ...createHangarCategorySlice(set, get),
  ...createVehiclesCategoriesSlice(set, get),
}));
