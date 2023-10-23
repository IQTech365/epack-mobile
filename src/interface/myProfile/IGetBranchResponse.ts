import {IAddBranchRequest} from './IAddBranchRequest';

export interface IGetBranchData extends IAddBranchRequest {
  _id: string;
  createdAt: string;
}

export interface IGetBranchsResponse {
  data: [IGetBranchData];
  status: number;
  error: boolean;
}
