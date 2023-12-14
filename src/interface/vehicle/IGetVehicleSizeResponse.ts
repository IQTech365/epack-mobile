export interface IVehicleSize {
  _id: string;
  vehicleType: string;
  vehicleSize: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  __v: 0;
}
export interface IGetVehicleSizeResponse {
  data: IVehicleSize[];
  status: number;
  error: boolean;
}
