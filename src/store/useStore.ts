import create from 'zustand';

import {
  AddVehicleState,
  createAddVehicleSlice,
} from 'src/modules/hangar/store/createAddVehicleSlice';
import {
  CategoriesState,
  createCategoriesSlice,
} from 'src/modules/hangar/store/createCategoriesSlice';
import { HangarState, createHangarSlice } from 'src/modules/hangar/store/createHangarSlice';

export type StoreState = HangarState & AddVehicleState & CategoriesState;

export const useStore = create<StoreState>((set, get) => ({
  ...createAddVehicleSlice(set, get),
  ...createHangarSlice(set, get),
  ...createCategoriesSlice(set, get),
}));
