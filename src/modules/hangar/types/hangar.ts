export interface IVehicle {
  _id: string;
  projectName: string;
  vehicleImages: string[];
  category: string;
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
  batVoltageOther?: string;
  capacity?: string;
  capacityUnit?: string;
  batteryCase?: string;

  userName?: string;
  city?: string;
  likesCount?: string;
  viewsCount?: string;
}
export interface IAddEbikeValues {
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
  category: string;
  wheelOther: string;
  brakesOther: string;
  massUnit: string;
  vmaxUnit: string;
  rangeUnit: string;
  totalCostCurrency: string;
  ctrlManufOther: string;
  ctrlModelOther: string;
  motorManufOther: string;
  motorModelOther: string;
  batteryCaseOther: string;
  cellsTypeOther: string;
  batVoltageOther: string;
}

export interface IVehicleCategory {
  id: string;
  name: string;
  image: string;
  child?: IVehicleCategories;
}

export interface IVehicleCategories {
  catTitle: string;
  powerRelated?: boolean;
  categories: IVehicleCategory[];
}

interface IItemModel {
  _id: string;
  model: string;
  validated: boolean;
  url: string;
  categories: string[];
}

export interface ItemManufacturer {
  _id: string;
  manufacturer: string;
  url: string;
  validated: boolean;
  categories: string[];
  models: IItemModel[];
}
