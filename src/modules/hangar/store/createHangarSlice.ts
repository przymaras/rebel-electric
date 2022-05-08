import { GetState, SetState } from 'zustand';

import { StoreState } from 'src/store/useStore';

export interface HangarState {
  hangarCategory: number[];
  newHangarCategoryChosen: boolean;
  sortBy: string;
  searchValue: string;
  setHangarCategory: (newCategory: number[]) => void;
  resetHangarCategory: () => void;
  setNewHangarCategoryChosen: (newValue: boolean) => void;
  setSortBy: (newSortBy: string) => void;
  setSearchValue: (newSearchValue: string) => void;
}

export const createHangarSlice: (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => HangarState = (set) => ({
  hangarCategory: [-1],
  newHangarCategoryChosen: false,
  sortBy: 'createdAt',
  searchValue: '',
  setHangarCategory: (newCategory) => set({ hangarCategory: newCategory }),
  resetHangarCategory: () => set({ hangarCategory: [-1] }),
  setNewHangarCategoryChosen: (newValue) => set({ newHangarCategoryChosen: newValue }),
  setSortBy: (newSortBy) => set({ sortBy: newSortBy }),
  setSearchValue: (newSearchValue) => set({ searchValue: newSearchValue }),
});
