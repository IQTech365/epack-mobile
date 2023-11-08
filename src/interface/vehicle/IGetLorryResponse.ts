import {IAddLorryRequest} from './IAddLorryRequest';

export interface IGetLorryData extends IAddLorryRequest {
  _id: string;
  createdAt: string;
}

export interface IGetLorryResponse {
  data: [IGetLorryData];
  status: number;
  error: boolean;
}
