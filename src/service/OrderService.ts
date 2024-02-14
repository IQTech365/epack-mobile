import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {
  ADD_ENQUIRY,
  CREATE_BILTY,
  CREATE_CAR_CONDITION,
  CREATE_INVOICE,
  CREATE_MONEY_RECEIPT,
  CREATE_PACKING_LIST,
  DELETE_PACKING_LIST_ITEM,
  EDIT_CAR_CONDITION_LIST,
  EDIT_COMPANY,
  EDIT_MONEY_RECEIPT_LIST,
  GET_BILTY_LIST,
  GET_BILTY_TEMPLATE_HTML,
  GET_CAR_CONDITION_LIST,
  GET_CAR_CONDITION_TEMPLATE_HTML,
  GET_INVOICE_LIST,
  GET_INVOICE_TEMPLATE_HTML,
  GET_MONEY_RECEIPT_LIST,
  GET_MONEY_RECEIPT_TEMPLATE_HTML,
  GET_ORDER_DETAILS,
  GET_ORDER_LIST,
  GET_PACKING_LIST,
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
import { IHtmlBiltyTemplateRequest, IHtmlCarConditionTemplateRequest, IHtmlInvoiceTemplateRequest, IHtmlMoneyReceiptTemplateRequest, IHtmlTemplateRequest, IHtmlTemplateResponse } from '../interface/order/templates/ITemplateResponse';
import { ICreatePackingMaterialRequest, ICreatePackingMaterialResponse, IDeletePackingListItemResponse, IGetPackingListRequest, IPackingListResponse } from '../interface/order/IPackingMaterialResponse';
import { IGetInvoiceListResponse } from '../interface/order/IGetInvoiceListResponse';

export const GetOrderDetailsService = async (payload: string): Promise<IOrderDetailsResponse> => {
    const api = Api.getInstance();
    return await api.get<IOrderDetailsResponse>(GET_ORDER_DETAILS(payload));
}

export const AddOrderService = async (payload: IAddOrderRequest): Promise<IAddOrderResponse> => {
    const api = Api.getInstance();
    return await api.post<IAddOrderRequest, AxiosResponse<IAddOrderResponse>>(payload, ADD_ENQUIRY);
}

export const CreateCarConditionService = async (payload: ICreateCarConditionRequest): Promise<ICreateCarConditionResponse> => {
    const api = Api.getInstance();
    return await api.post<ICreateCarConditionRequest, AxiosResponse<ICreateCarConditionResponse>>(payload, CREATE_CAR_CONDITION);
}

export const EditCarConditionService = async (id:string, requestBody:ICreateCarConditionRequest): Promise<ICreateCarConditionResponse> => {
    const api = Api.getInstance();
    return await api.update<ICreateCarConditionRequest, AxiosResponse<ICreateCarConditionResponse>>(requestBody, EDIT_CAR_CONDITION_LIST(id));
}

export const GetCarConditionListService = async (payload: string): Promise<IGetCarConditionListResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetCarConditionListResponse>(GET_CAR_CONDITION_LIST(payload));
}

export const CreateBiltyService = async (payload: ICreateBiltyRequest): Promise<ICreateBiltyResponse> => {
    const api = Api.getInstance();
    return await api.post<ICreateBiltyRequest, AxiosResponse<ICreateBiltyResponse>>(payload, CREATE_BILTY);
}

export const GetBiltyListService = async (payload: string): Promise<IGetBiltyListResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetBiltyListResponse>(GET_BILTY_LIST(payload));
}

export const CreateMoneyReceiptService = async (payload: ICreateMoneyReceiptRequest): Promise<ICreateMoneyReceiptResponse> => {
    const api = Api.getInstance();
    return await api.post<ICreateMoneyReceiptRequest, AxiosResponse<ICreateMoneyReceiptResponse>>(payload, CREATE_MONEY_RECEIPT);
}

export const GetMoneyReceiptListService = async (payload: string): Promise<IGetMoneyReceiptsResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetMoneyReceiptsResponse>(GET_MONEY_RECEIPT_LIST(payload));
}

export const EditMoneyReceiptListService = async (id:string, requestBody: any): Promise<IGetMoneyReceiptsResponse> => {
    const api = Api.getInstance();
    return await api.update<any, AxiosResponse<IGetMoneyReceiptsResponse>>(requestBody, EDIT_MONEY_RECEIPT_LIST(id));
}

export const CreateInvoiceService = async (payload: ICreateInvoiceRequest): Promise<ICreateInvoiceResponse> => {
    const api = Api.getInstance();
    return await api.post<ICreateInvoiceRequest, AxiosResponse<ICreateInvoiceResponse>>(payload, CREATE_INVOICE);
}

export const GetInvoiceListService = async (payload: string): Promise<IGetInvoiceListResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetInvoiceListResponse>(GET_INVOICE_LIST(payload));
}

export const GetInvoiceTemplateHtmlService = async (payload:IHtmlTemplateRequest): Promise<IHtmlTemplateResponse> => {
    const api = Api.getInstance();
    const data:IHtmlInvoiceTemplateRequest = {
        templateId: payload.templateId,
        invoiceId: payload.quotationId,
    }
    return await api.post<IHtmlInvoiceTemplateRequest,AxiosResponse<IHtmlTemplateResponse>>(data, GET_INVOICE_TEMPLATE_HTML);
}

export const EditEnquiryService = async (payload: IOtpVerifyRequest): Promise<IOtpVerifyResponse> => {
    const api = Api.getInstance();
    return await api.update<IOtpVerifyRequest, AxiosResponse<IOtpVerifyResponse>>(payload, EDIT_COMPANY(''));
}

export const GetOrdersService = async (payload: Partial<IGetOrdersRequest>): Promise<IGetOrdersResponse> => {
    const api = Api.getInstance();
    return await api.post<Partial<IGetOrdersRequest>, AxiosResponse<IGetOrdersResponse>>(payload, GET_ORDER_LIST);
}

export const GetOrderService = async (payload: ISingleOrderRequest): Promise<ISingleEnquiryResponse> => {
    const api = Api.getInstance();
    return await api.post<ISingleOrderRequest, AxiosResponse<ISingleEnquiryResponse>>(payload, GET_ORDER_LIST);
}

// Template
export const GetMoneyReceiptTemplateHtmlService = async (payload:IHtmlTemplateRequest): Promise<IHtmlTemplateResponse> => {
    const api = Api.getInstance();
    const data:IHtmlMoneyReceiptTemplateRequest = {
        templateId: payload.templateId,
        moneyReceiptId: payload.quotationId,
    }
    return await api.post<IHtmlMoneyReceiptTemplateRequest,AxiosResponse<IHtmlTemplateResponse>>(data, GET_MONEY_RECEIPT_TEMPLATE_HTML);
}

export const GetBiltyTemplateHtmlService = async (payload:IHtmlTemplateRequest): Promise<IHtmlTemplateResponse> => {
    const api = Api.getInstance();
    const data:IHtmlBiltyTemplateRequest = {
        templateId: payload.templateId,
        biltyId: payload.quotationId,
    }
    return await api.post<IHtmlBiltyTemplateRequest,AxiosResponse<IHtmlTemplateResponse>>(data, GET_BILTY_TEMPLATE_HTML);
}

export const GetCarConditionTemplateHtmlService = async (payload:IHtmlTemplateRequest): Promise<IHtmlTemplateResponse> => {
    const api = Api.getInstance();
    const data:IHtmlCarConditionTemplateRequest = {
        templateId: payload.templateId,
        carConditionId: payload.quotationId,
    }
    return await api.post<IHtmlCarConditionTemplateRequest,AxiosResponse<IHtmlTemplateResponse>>(data, GET_CAR_CONDITION_TEMPLATE_HTML);
}

export const CreatePackingListService = async (payload: ICreatePackingMaterialRequest): Promise<ICreatePackingMaterialResponse> => {
    const api = Api.getInstance();
    return await api.post<ICreatePackingMaterialRequest, AxiosResponse<ICreatePackingMaterialResponse>>(payload, CREATE_PACKING_LIST);
}

export const GetPackingListService = async (payload: IGetPackingListRequest): Promise<IPackingListResponse> => {
    const api = Api.getInstance();
    return await api.post<IGetPackingListRequest, AxiosResponse<IPackingListResponse>>(payload, GET_PACKING_LIST);
}

export const DeletePackingListItemService = async (item_id: string): Promise<IDeletePackingListItemResponse> => {
    const api = Api.getInstance();
    return await api.delete<any, AxiosResponse<IDeletePackingListItemResponse>>(null, DELETE_PACKING_LIST_ITEM(item_id));
}

