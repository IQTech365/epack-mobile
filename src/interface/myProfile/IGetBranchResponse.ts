import {IAddBranchRequest} from './IAddBranchRequest';

export interface IGetBranchData extends IAddBranchRequest {
  _id: string;
  createdAt: string;
}

export interface IBranch {
  _id: string;
  companyId: string;
  branchName: string;
  website: string;
  gstNo: string;
  registeredMobile: string;
  pincode: string;
  state: string;
  city: string;
  locality: string;
  landmark: string;
  email: string;
  address: string;
  createdBy: string;
  status: string;
  createdDate: string;
  __v: number;
}

export interface IGetBranchsResponse {
  data: IBranch[];
  status: number;
  error: boolean;
}
