export interface IPackingType {
  _id: string;
  packingType: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: 0;
}
export interface IPackingTypeResponse {
  data: IPackingType[];
  status: number;
  error: boolean;
}

export interface IVehicleSize {}
export interface IVehicleSizeResponse {
  data: IVehicleSize[];
  status: number;
  error: boolean;
}

export interface IUnit {}
export interface IUnitResponse {
  data: IUnit[];
  status: number;
  error: boolean;
}

// Vehicle Company
export interface IVehicleCompany {
  _id: string;
  vehicleCompanyName: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  vehicletypes: string;
  vehicletypesid: string;
}
export interface IVehicleCompanyResponse {
  data: IVehicleCompany[];
  status: number;
  error: boolean;
}

// Vehicle Color
export interface IVehicleColor {
  _id: string;
  vehicleColorName: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: number;
}
export interface IVehicleColorResponse {
  data: IVehicleColor[];
  status: number;
  error: boolean;
}

// Vehicle Accessories
export interface IVehicleAccessory {
  _id: string;
  vehicleType: string;
  vehicleAccessory: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: number;
}
export interface IVehicleAccessoryResponse {
  data: IVehicleAccessory[];
  status: number;
  error: boolean;
}

// Vehicle Model
export interface IVehicleModel {
  _id: string;
  vehicleType: string;
  vehicleCompanyName: string;
  vehicleModel: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: number;
}
export interface IVehicleModelResponse {
  data: IVehicleModel[];
  status: number;
  error: boolean;
}

// Vehicle Type
export interface IVehicleType {
  _id: string;
  vehicleType: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: number;
}
export interface IVehicleTypesResponse {
  data: IVehicleType[];
  status: number;
  error: boolean;
}
