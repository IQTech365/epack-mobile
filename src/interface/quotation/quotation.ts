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
