import create from 'zustand';

import { AddVehicleState, createAddVehicleSlice } from './createAddVehicleSlice';
import { CategoriesState, createCategoriesSlice } from './createCategoriesSlice';
import { HangarState, createHangarSlice } from './createHangarSlice';

export type StoreState = HangarState & AddVehicleState & CategoriesState;

export const useStore = create<StoreState>((set, get) => ({
  ...createAddVehicleSlice(set, get),
  ...createHangarSlice(set, get),
  ...createCategoriesSlice(set, get),
}));
