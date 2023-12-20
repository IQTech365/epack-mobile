import {IAddFranchiseRequest} from './IAddFranchiseRequest';

export interface IGetFranchiseData extends IAddFranchiseRequest {
  _id: string;
  createdAt: string;
}

export interface IFranchise {
  _id: string;
  companyId: string;
  franchiseName: string;
  franchiseOwnerName: string;
  registeredMobile: string;
  website: string;
  gstNo: string;
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

export interface IGetFranchiseResponse {
  data: IFranchise[];
  status: number;
  error: boolean;
}
