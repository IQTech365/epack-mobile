import {IAddOrderRequest} from './IAddOrderRequest';

export interface IGetOrdersData extends IAddOrderRequest {
  _id: string;
  createdAt: string;
}
export interface IGetOrdersResponse {
    data: IGetOrdersData[];
    status: number;
    error: boolean;
}