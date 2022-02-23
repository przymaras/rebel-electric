import create from "zustand";

import {
  AddVehicleState,
  createAddVehicleSlice,
} from "./createAddVehicleSlice";

import { HangarState, createHangarSlice } from "./createHangarSlice";

import {
  categoriesState,
  createCategoriesSlice,
} from "./createCategoriesSlice";

export type StoreState = HangarState & AddVehicleState & categoriesState;

export const useStore = create<StoreState>((set, get) => ({
  ...createAddVehicleSlice(set, get),
  ...createHangarSlice(set, get),
  ...createCategoriesSlice(set, get),
}));
