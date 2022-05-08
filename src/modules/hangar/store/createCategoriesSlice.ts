import { GetState, SetState } from 'zustand';

import { VehiclesCategories } from 'src/modules/hangar/types/hangar';
import { StoreState } from 'src/store/useStore';

import { categories } from './categoriesData';

export interface CategoriesState {
  vehiclesCategories: VehiclesCategories;
  setVehiclesCategories: (newValue: boolean) => void;
}

export const createCategoriesSlice: (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => CategoriesState = () => ({
  vehiclesCategories: categories,
  setVehiclesCategories: (newValue) => ({ vehiclesCategories: newValue }),
});
