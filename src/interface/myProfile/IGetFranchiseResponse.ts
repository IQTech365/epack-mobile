import {IAddFranchiseRequest} from './IAddFranchiseRequest';

export interface IGetFranchiseData extends IAddFranchiseRequest {
  _id: string;
  createdAt: string;
}

export interface IGetFranchiseResponse {
  data: [IGetFranchiseData];
  status: number;
  error: boolean;
}
