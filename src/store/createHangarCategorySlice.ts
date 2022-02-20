import { GetState, SetState } from "zustand";
import { StoreState } from "./useStore";

export interface HangarCategoryState {
  hangarCategory: number[];
  newHangarCategoryChosen: boolean;
  setHangarCategory: (newCategory: number[]) => void;
  resetHangarCategory: () => void;
  setNewHangarCategoryChosen: (newValue: boolean) => void;
}

export const createHangarCategorySlice: (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => HangarCategoryState = (set, get) => ({
  hangarCategory: [-1],
  newHangarCategoryChosen: false,
  setHangarCategory: (newCategory) => set({ hangarCategory: newCategory }),
  resetHangarCategory: () => set({ hangarCategory: [-1] }),
  setNewHangarCategoryChosen: (newValue) =>
    set({ newHangarCategoryChosen: newValue }),
});
