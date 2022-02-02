export interface Vehicle {
  _id: string;
  projectName: string;
  vehicleImages: string[];
  createdAt: string;
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
