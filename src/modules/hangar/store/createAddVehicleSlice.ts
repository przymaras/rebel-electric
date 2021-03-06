import type { GetState, SetState } from 'zustand';

import type { StoreState } from 'src/store/useStore';

export interface IAddVehicleState {
  addVehicleCategory: number[];
  newCategoryChosen: boolean;
  setAddVehicleCategory: (newCategory: number[]) => void;
  resetAddVehicleCategory: () => void;
  setNewCategoryChosen: (newValue: boolean) => void;
}

export const createAddVehicleSlice: (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => IAddVehicleState = (set) => ({
  addVehicleCategory: [-1],
  newCategoryChosen: false,
  setAddVehicleCategory: (newCategory) => set({ addVehicleCategory: newCategory }),
  resetAddVehicleCategory: () => set({ addVehicleCategory: [-1] }),
  setNewCategoryChosen: (newValue) => set({ newCategoryChosen: newValue }),
});
