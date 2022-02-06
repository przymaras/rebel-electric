import create, { GetState, SetState } from "zustand";

interface AddVehicleCategoryState {
  addVehicleCategory: number[];
  newCategoryChosen: boolean;
  setAddVehicleCategory: (newCategory: number[]) => void;
  resetAddVehicleCategory: () => void;
  setNewCategoryChosen: (newValue: boolean) => void;
}

interface HangarCategoryState {
  hangarCategory: number[];
  setHangarCategory: (newCategory: number[]) => void;
  resetHangarCategory: () => void;
}

export type HangarStoreState = HangarCategoryState & AddVehicleCategoryState;

const createAddVehicleCategorySlice: (
  set: SetState<HangarStoreState>,
  get: GetState<HangarStoreState>
) => AddVehicleCategoryState = (set, get) => ({
  addVehicleCategory: [-1],
  newCategoryChosen: false,
  setAddVehicleCategory: (newCategory) =>
    set({ addVehicleCategory: newCategory }),
  resetAddVehicleCategory: () => set({ addVehicleCategory: [-1] }),
  setNewCategoryChosen: (newValue) => set({ newCategoryChosen: newValue }),
});

const createHangarCategorySlice: (
  set: SetState<HangarStoreState>,
  get: GetState<HangarStoreState>
) => HangarCategoryState = (set, get) => ({
  hangarCategory: [-1],
  setHangarCategory: (newCategory) => set({ hangarCategory: newCategory }),
  resetHangarCategory: () => set({ hangarCategory: [-1] }),
});

export const useHangarStore = create<HangarStoreState>((set, get) => ({
  ...createAddVehicleCategorySlice(set, get),
  ...createHangarCategorySlice(set, get),
}));
