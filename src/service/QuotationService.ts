import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {ADD_QUOTATION, GET_QUOTATION_LIST} from '../http/Endpoint';
import {IAddQuotationRequest} from '../interface/quotation/IAddQuotationRequest';
import {IAddQuotationResponse} from '../interface/quotation/IAddQuotationResponse';
import { IGetQuotationRequest } from '../interface/quotation/IGetQuotationRequest';
import { IGetQuotationsResponse } from '../interface/quotation/IGetQuotationsResponse';

export const AddQuotationService = async (payload: IAddQuotationRequest,): Promise<IAddQuotationResponse> => {
  const api = Api.getInstance();
  return await api.post<IAddQuotationRequest,AxiosResponse<IAddQuotationResponse>>(payload, ADD_QUOTATION);
};

export const GetQuotationsService = async (payload: IGetQuotationRequest): Promise<IGetQuotationsResponse> => {
  console.log('GetQuotationsService-payload--', payload);
  
  const api = Api.getInstance();
  // return await api.get<IGetQuotationsResponse>(GET_QUOTATION_LIST);
  return await api.post<IGetQuotationRequest,AxiosResponse<IGetQuotationsResponse>>(payload, GET_QUOTATION_LIST);
}