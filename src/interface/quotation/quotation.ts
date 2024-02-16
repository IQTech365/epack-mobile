import {IAddQuotationRequest} from './IAddQuotationRequest';

export interface IUpdateQuotationRequest {
  params: string;
  payload: IAddQuotationRequest;
}

export interface IUpdateQuotationResponse {
  data: any;
  status: number;
  error: boolean;
}

export interface IQuotation {
  _id: string;
  companyId: string;
  enquiryId: string;
  isAuto: boolean;
  isHeadOffice: boolean;
  shiftingLuggage: string;
  vehicleType: string;
  manufacture: string;
  model: string;
  loadSize: string;
  quotationDate: string;
  quotationNumber: string;
  quotationAmount: string;
  advanceAmount: string;
  isActive: false;
  isDeleted: false;
  createdAt: string;
}

export interface IQuotationResponse {
  data:IQuotation[];
  status:number;
  error:boolean;
}
