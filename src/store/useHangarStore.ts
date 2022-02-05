import create, { GetState, SetState } from "zustand";

interface AddVehicleCategoryState {
  addVehicleCategory: number[];
  setAddVehicleCategory: (newCategory: number[]) => void;
  resetAddVehicleCategory: () => void;
}

interface HangarCategoryState {
  hangarCategory: number[];
  setHangarCategory: (newCategory: number[]) => void;
  resetHangarCategory: () => void;
}

type HangarStoreState = HangarCategoryState & AddVehicleCategoryState;

const createAddVehicleCategorySlice: (
  set: SetState<HangarStoreState>,
  get: GetState<HangarStoreState>
) => AddVehicleCategoryState = (set, get) => ({
  addVehicleCategory: [-1],
  setAddVehicleCategory: (newCategory) =>
    set({ addVehicleCategory: newCategory }),
  resetAddVehicleCategory: () => set({ addVehicleCategory: [-1] }),
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
