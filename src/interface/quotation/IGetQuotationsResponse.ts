import {IAddQuotationRequest} from './IAddQuotationRequest';

interface IGetQuotationData extends IAddQuotationRequest {
    _id: string;
}

export interface IGetQuotationsResponse {
    data: [IGetQuotationData];
    status: number;
    error: boolean;
  }