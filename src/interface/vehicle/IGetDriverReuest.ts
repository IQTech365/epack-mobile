import {IAddDriverRequest} from './IAddDriverRequest';

export interface IGetDriverData extends IAddDriverRequest {
  _id: string;
  createdAt: string;
}

export interface IGetDriverResponse {
  data: [IGetDriverData];
  status: number;
  error: boolean;
}
