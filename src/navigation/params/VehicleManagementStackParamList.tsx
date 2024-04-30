import { IDriver } from '../../interface/order/IGetBiltyListResponse';
import {IVehicle} from '../../interface/vehicle/IGetLorryResponse';
export type VehicleManagementStackParamList = {
  VehicleManagementRoot: undefined;
  ManageDriver: undefined;
  DriverDetails: {item: IDriver};
  ManageVehicle: undefined;
  VehicleDetails: {item: IVehicle};
};
