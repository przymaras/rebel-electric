import type { GetState, SetState } from 'zustand';

import type { IVehicleCategories } from 'src/modules/hangar/types/hangar';
import type { StoreState } from 'src/store/useStore';

import { categories } from './categories';

export interface ICategoriesState {
  vehicleCategories: IVehicleCategories;
  setVehicleCategories: (newValue: IVehicleCategories) => void;
}

export const createCategoriesSlice: (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => ICategoriesState = () => ({
  vehicleCategories: categories,
  setVehicleCategories: (newValue) => ({ vehicleCategories: newValue }),
});
