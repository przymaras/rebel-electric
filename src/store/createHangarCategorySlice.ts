import { GetState, SetState } from "zustand";
import { StoreState } from "./useStore";

export interface HangarCategoryState {
  hangarCategory: number[];
  setHangarCategory: (newCategory: number[]) => void;
  resetHangarCategory: () => void;
}

export const createHangarCategorySlice: (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => HangarCategoryState = (set, get) => ({
  hangarCategory: [-1],
  setHangarCategory: (newCategory) => set({ hangarCategory: newCategory }),
  resetHangarCategory: () => set({ hangarCategory: [-1] }),
});
