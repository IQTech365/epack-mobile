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
