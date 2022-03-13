import { GetState, SetState } from 'zustand';

import { VehiclesCategories } from '../models/hangar';
import { categories } from './categoriesData';
import { StoreState } from './useStore';

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
