import {IAddEnquiryRequest} from './IAddEnquiryRequest';

export interface IGetEnquiriesData extends IAddEnquiryRequest {
  _id: string;
  createdAt: string;
}

export interface IGetEnquiriesResponse {
  data: [IGetEnquiriesData];
  status: number;
  error: boolean;
}
