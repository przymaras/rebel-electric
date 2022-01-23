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
  manufacturer: string;
  model: string;
  year: string;
  wheelSize: string;
  brakes: string;
  mass: string;
  vmax: string;
  range: string;
  controller: string;
  ctrlVoltage: string;
  ctrlCurrent: string;
  motor: string;
  motorModel: string;
  batteryType: string;
  cellsType: string;
  batVoltage: string;
  batSeries: string;
  batParallels: string;
  cellsManuf: string;
  cellsModel: string;
  capacityWh: string;
  capacityAh: string;
  vehicleImages: string[];
  category: number[];
}

export interface CategoriesObj {
  catTitle: string;
  categories: any[];
}
