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
  batteryType: string;
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
