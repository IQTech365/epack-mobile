import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {
  ADD_ENQUIRY,
  CREATE_BILTY,
  CREATE_CAR_CONDITION,
  CREATE_MONEY_RECEIPT,
  EDIT_COMPANY,
  EDIT_MONEY_RECEIPT_LIST,
  GET_BILTY_LIST,
  GET_CAR_CONDITION_LIST,
  GET_INVOICE_LIST,
  GET_MONEY_RECEIPT_LIST,
  GET_MONEY_RECEIPT_TEMPLATE_HTML,
  GET_ORDER_DETAILS,
  GET_ORDER_LIST
} from '../http/Endpoint';
import { IOtpVerifyRequest } from '../interface/otp/IOtpVerifyRequest';
import { IOtpVerifyResponse } from '../interface/otp/IOtpVerifyResponse';
import { IOrderDetailsResponse } from '../interface/order/IOrderDetailsResponse';
import { IAddOrderRequest } from '../interface/order/IAddOrderRequest';
import { IAddOrderResponse } from '../interface/order/IAddOrderResponse';
import { ICreateCarConditionRequest } from '../interface/order/ICreateCarConditionRequest';
import { ICreateCarConditionResponse } from '../interface/order/ICreateCarConditionResponse';
import { ICreateBiltyRequest } from '../interface/order/ICreateBiltyRequest';
import { ICreateBiltyResponse } from '../interface/order/ICreateBiltyResponse';
import { ICreateMoneyReceiptRequest } from '../interface/order/ICreateMoneyReceiptRequest';
import { ICreateMoneyReceiptResponse } from '../interface/order/ICreateMoneyReceiptResponse';
import { ICreateInvoiceRequest } from '../interface/order/ICreateInvoiceRequest';
import { ICreateInvoiceResponse } from '../interface/order/ICreateInvoiceResponse';
import { IGetOrdersResponse } from '../interface/order/IGetOrdersResponse';
import { IGetMoneyReceiptsResponse } from '../interface/order/IGetMoneyReceiptsResponse';
import { IGetBiltyListResponse } from '../interface/order/IGetBiltyListResponse';
import { IGetCarConditionListResponse } from '../interface/order/IGetCarConditionListResponse';
import { IGetOrdersRequest } from '../interface/order/IGetOrdersRequest';
import { ISingleOrderRequest } from '../interface/order/ISingleOrderRequest';
import { ISingleEnquiryResponse } from '../interface/enquiry/ISingleEnquiryResponse';
import { IMoneyReceiptTempHtmlRequest, IMoneyReceiptTempHtmlResponse } from '../interface/order/templates/ITemplateResponse';

export const GetOrderDetailsService = async (payload: string): Promise<IOrderDetailsResponse> => {
    console.log('GetOrderDetailsService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.get<IOrderDetailsResponse>(GET_ORDER_DETAILS(payload));
}

export const AddOrderService = async (payload: IAddOrderRequest): Promise<IAddOrderResponse> => {
    console.log('AddOrderService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<IAddOrderRequest, AxiosResponse<IAddOrderResponse>>(payload, ADD_ENQUIRY);
}

export const CreateCarConditionService = async (payload: ICreateCarConditionRequest): Promise<ICreateCarConditionResponse> => {
    console.log('CreateCarConditionService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<ICreateCarConditionRequest, AxiosResponse<ICreateCarConditionResponse>>(payload, CREATE_CAR_CONDITION);
}

export const GetCarConditionListService = async (payload: string): Promise<IGetCarConditionListResponse> => {
    console.log('GetCarConditionListService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.get<IGetCarConditionListResponse>(GET_CAR_CONDITION_LIST(payload));
}

export const CreateBiltyService = async (payload: ICreateBiltyRequest): Promise<ICreateBiltyResponse> => {
    console.log('CreateBiltyService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<ICreateBiltyRequest, AxiosResponse<ICreateBiltyResponse>>(payload, CREATE_BILTY);
}

export const GetBiltyListService = async (payload: string): Promise<IGetBiltyListResponse> => {
    console.log('GetBiltyListService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.get<IGetBiltyListResponse>(GET_BILTY_LIST(payload));
}

export const CreateMoneyReceiptService = async (payload: ICreateMoneyReceiptRequest): Promise<ICreateMoneyReceiptResponse> => {
    console.log('CreateMoneyReceiptService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<ICreateMoneyReceiptRequest, AxiosResponse<ICreateMoneyReceiptResponse>>(payload, CREATE_MONEY_RECEIPT);
}

export const GetMoneyReceiptListService = async (payload: string): Promise<IGetMoneyReceiptsResponse> => {
    console.log('GetMoneyReceiptListService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.get<IGetMoneyReceiptsResponse>(GET_MONEY_RECEIPT_LIST(payload));
}

export const EditMoneyReceiptListService = async (id:string, requestBody: any): Promise<IGetMoneyReceiptsResponse> => {
    console.log('EditMoneyReceiptListService--payload--', JSON.stringify(requestBody));
    const api = Api.getInstance();
    return await api.update<any, AxiosResponse<IGetMoneyReceiptsResponse>>(requestBody, EDIT_MONEY_RECEIPT_LIST(id));
}

export const CreateInvoiceService = async (payload: ICreateInvoiceRequest): Promise<ICreateInvoiceResponse> => {
    console.log('CreateInvoiceService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<ICreateInvoiceRequest, AxiosResponse<ICreateInvoiceResponse>>(payload, ADD_ENQUIRY);
}

// TODO: refactor code once in use
export const GetInvoiceListService = async (payload: string): Promise<IGetMoneyReceiptsResponse> => {
    console.log('GetInvoiceListService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.get<IGetMoneyReceiptsResponse>(GET_INVOICE_LIST(payload));
}

// TODO: refactor code once in use
export const EditEnquiryService = async (payload: IOtpVerifyRequest): Promise<IOtpVerifyResponse> => {
    const api = Api.getInstance();
    return await api.update<IOtpVerifyRequest, AxiosResponse<IOtpVerifyResponse>>(payload, EDIT_COMPANY);
}

export const GetOrdersService = async (payload: Partial<IGetOrdersRequest>): Promise<IGetOrdersResponse> => {
    console.log('GetOrdersService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<Partial<IGetOrdersRequest>, AxiosResponse<IGetOrdersResponse>>(payload, GET_ORDER_LIST);
}

export const GetOrderService = async (payload: ISingleOrderRequest): Promise<ISingleEnquiryResponse> => {
    console.log('GetOrderService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<ISingleOrderRequest, AxiosResponse<ISingleEnquiryResponse>>(payload, GET_ORDER_LIST);
}

// Template
export const GetMoneyReceiptTemplateHtmlService = async (templateId:string, moneyReceiptId:string): Promise<IMoneyReceiptTempHtmlResponse> => {
    console.log('GetMoneyReceiptTemplateHtmlService--payload--', JSON.stringify(templateId));
    const api = Api.getInstance();
    return await api.get<IMoneyReceiptTempHtmlResponse>(GET_MONEY_RECEIPT_TEMPLATE_HTML(templateId, moneyReceiptId));
}
