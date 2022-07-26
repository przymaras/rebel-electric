import create from 'zustand';

import type { IAddVehicleState } from 'src/modules/hangar/store/createAddVehicleSlice';
import { createAddVehicleSlice } from 'src/modules/hangar/store/createAddVehicleSlice';
import type { ICategoriesState } from 'src/modules/hangar/store/createCategoriesSlice';
import { createCategoriesSlice } from 'src/modules/hangar/store/createCategoriesSlice';
import type { IHangarState } from 'src/modules/hangar/store/createHangarSlice';
import { createHangarSlice } from 'src/modules/hangar/store/createHangarSlice';

export type StoreState = IHangarState & IAddVehicleState & ICategoriesState;

export const useStore = create<StoreState>((set, get) => ({
  ...createAddVehicleSlice(set, get),
  ...createHangarSlice(set, get),
  ...createCategoriesSlice(set, get),
}));
