import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {ADD_QUOTATION, GET_QUOTATION, GET_QUOTATION_LIST, GET_QUOTATION_TEMPLATE_HTML, UPDATE_QUOTATION} from '../http/Endpoint';
import {IAddQuotationRequest} from '../interface/quotation/IAddQuotationRequest';
import {IAddQuotationResponse} from '../interface/quotation/IAddQuotationResponse';
import { IGetQuotationRequest } from '../interface/quotation/IGetQuotationRequest';
import { IGetQuotationsResponse } from '../interface/quotation/IGetQuotationsResponse';
import { IGetSingleQuotationResponse } from '../interface/quotation/IGetSingleQuotationResponse';
import { IHtmlTemplateResponse } from '../interface/order/templates/ITemplateResponse';
import { IUpdateQuotationRequest, IUpdateQuotationResponse } from '../interface/quotation/quotation';

export const AddQuotationService = async (payload: IAddQuotationRequest,): Promise<IAddQuotationResponse> => {
  const api = Api.getInstance();
  return await api.post<IAddQuotationRequest,AxiosResponse<IAddQuotationResponse>>(payload, ADD_QUOTATION);
};

export const UpdateQuotationService = async (payload: IUpdateQuotationRequest,): Promise<IUpdateQuotationResponse> => {
  const {params, payload:data} = payload;
  const api = Api.getInstance();
  return await api.update<IAddQuotationRequest,AxiosResponse<IUpdateQuotationResponse>>(data, UPDATE_QUOTATION(params));
};

export const GetQuotationsService = async (payload: IGetQuotationRequest): Promise<IGetQuotationsResponse> => {
  const api = Api.getInstance();
  return await api.post<IGetQuotationRequest,AxiosResponse<IGetQuotationsResponse>>(payload, GET_QUOTATION_LIST);
}

export const GetSingleQuotationService = async (payload: string): Promise<IGetSingleQuotationResponse> => {
  const api = Api.getInstance();
  return await api.get<IGetSingleQuotationResponse>(GET_QUOTATION(payload));
}

export const GetQuotationTemplateHtmlService = async (templateId:string, docId:string): Promise<IHtmlTemplateResponse> => {
  const api = Api.getInstance();
  return await api.get<IHtmlTemplateResponse>(GET_QUOTATION_TEMPLATE_HTML(templateId, docId));
}