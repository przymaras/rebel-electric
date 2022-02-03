export interface Vehiclee {
  _id: string;
  projectName: string;
  vehicleImages: string[];
  createdAt: string;
}
export interface Vehicle {
  _id: string;
  projectName: string;
  vehicleImages: string[];
  category: string[];
  createdAt: string;
  ownerId: string;
  video?: string;
  description?: string;
  bikeBase?: string;
  wheelSize?: string;
  wheelOther?: string;
  brakes?: string;
  brakesOther?: string;
  mass?: string;
  massUnit?: string;
  vmax?: string;
  vmaxUnit?: string;
  range?: string;
  rangeUnit?: string;
  totalCost?: string;
  totalCostCurrency?: string;
  ctrlManuf?: string;
  ctrlManufOther?: string;
  ctrlModel?: string;
  ctrlModelOther?: string;
  ctrlCurrent?: string;
  motorManuf?: string;
  motorManufOther?: string;
  motorModel?: string;
  motorModelOther?: string;
  batteryCaseOther?: string;
  cellsType?: string;
  cellsTypeOther?: string;
  batVoltage?: string;
  capacity?: string;
  capacityUnit?: string;
  batteryCase?: string;

  userName?: string;
  city?: string;
  likesCount?: string;
  viewsCount?: string;
}
export interface AddEbikeValues {
  projectName: string;
  video: string;
  description: string;
  bikeBase: string;
  wheelSize: string;
  brakes: string;
  mass: string;
  vmax: string;
  range: string;
  totalCost: string;
  ctrlManuf: string;
  ctrlModel: string;
  ctrlCurrent: string;
  motorManuf: string;
  motorModel: string;
  batteryCase: string;
  cellsType: string;
  batVoltage: string;
  capacity: string;
  capacityUnit: string;
  vehicleImages: string[];
  category: number[];
}

export interface CategoriesObj {
  catTitle: string;
  categories: any[];
}

interface ItemModelObj {
  _id: string;
  model: string;
  validated: boolean;
  url: string;
  categories: string[];
}

export interface ItemManufacturerObj {
  _id: string;
  manufacturer: string;
  url: string;
  validated: boolean;
  categories: string[];
  models: ItemModelObj[];
}
