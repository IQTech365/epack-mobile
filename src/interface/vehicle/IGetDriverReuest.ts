import { IVehicleSize } from '../common/common';
import {IAddDriverRequest} from './IAddDriverRequest';

export interface IGetDriverData extends IAddDriverRequest {
  _id: string;
  createdAt: string;
}

export interface IGetDriverResponse {
  data: IVehicleSize[];
  status: number;
  error: boolean;
}
