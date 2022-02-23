import { GetState, SetState } from "zustand";
import { StoreState } from "./useStore";

export interface AddVehicleState {
  addVehicleCategory: number[];
  newCategoryChosen: boolean;
  setAddVehicleCategory: (newCategory: number[]) => void;
  resetAddVehicleCategory: () => void;
  setNewCategoryChosen: (newValue: boolean) => void;
}

export const createAddVehicleSlice: (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => AddVehicleState = (set, get) => ({
  addVehicleCategory: [-1],
  newCategoryChosen: false,
  setAddVehicleCategory: (newCategory) =>
    set({ addVehicleCategory: newCategory }),
  resetAddVehicleCategory: () => set({ addVehicleCategory: [-1] }),
  setNewCategoryChosen: (newValue) => set({ newCategoryChosen: newValue }),
});
