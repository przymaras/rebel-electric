import type { GetState, SetState } from 'zustand';

import type { StoreState } from 'src/store/useStore';

export interface IHangarState {
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
) => IHangarState = (set) => ({
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
