import create from "zustand";

import {
  AddVehicleCategoryState,
  createAddVehicleCategorySlice,
} from "./createAddVehicleCategorySlice";

import {
  HangarCategoryState,
  createHangarCategorySlice,
} from "./createHangarCategorySlice";

export type StoreState = HangarCategoryState & AddVehicleCategoryState;

export const useStore = create<StoreState>((set, get) => ({
  ...createAddVehicleCategorySlice(set, get),
  ...createHangarCategorySlice(set, get),
}));
