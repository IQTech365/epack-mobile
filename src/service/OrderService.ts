import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {ADD_ENQUIRY, EDIT_COMPANY} from '../http/Endpoint';
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

export const GetOrderDetailsService = async (payload: string): Promise<IOrderDetailsResponse> => {
    console.log('GetOrderDetailsService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.get<IOrderDetailsResponse>(ADD_ENQUIRY);
}

export const AddOrderService = async (payload: IAddOrderRequest): Promise<IAddOrderResponse> => {
    console.log('AddOrderService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<IAddOrderRequest, AxiosResponse<IAddOrderResponse>>(payload, ADD_ENQUIRY);
}

export const CreateCarConditionService = async (payload: ICreateCarConditionRequest): Promise<ICreateCarConditionResponse> => {
    console.log('CreateCarConditionService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<ICreateCarConditionRequest, AxiosResponse<ICreateCarConditionResponse>>(payload, ADD_ENQUIRY);
}

export const CreateBiltyService = async (payload: ICreateBiltyRequest): Promise<ICreateBiltyResponse> => {
    console.log('CreateBiltyService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<ICreateBiltyRequest, AxiosResponse<ICreateBiltyResponse>>(payload, ADD_ENQUIRY);
}

export const CreateMoneyReceiptService = async (payload: ICreateMoneyReceiptRequest): Promise<ICreateMoneyReceiptResponse> => {
    console.log('CreateMoneyReceiptService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<ICreateMoneyReceiptRequest, AxiosResponse<ICreateMoneyReceiptResponse>>(payload, ADD_ENQUIRY);
}

export const CreateInvoiceService = async (payload: ICreateInvoiceRequest): Promise<ICreateInvoiceResponse> => {
    console.log('CreateInvoiceService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<ICreateInvoiceRequest, AxiosResponse<ICreateInvoiceResponse>>(payload, ADD_ENQUIRY);
}

// TODO: refactor code once in use
export const EditEnquiryService = async (payload: IOtpVerifyRequest): Promise<IOtpVerifyResponse> => {
    const api = Api.getInstance();
    return await api.update<IOtpVerifyRequest, AxiosResponse<IOtpVerifyResponse>>(payload, EDIT_COMPANY);
}

// TODO: refactor code once in use
// export const DeleteCompanyService = async (payload: string): Promise<IOtpVerifyResponse> => {
//     const api = Api.getInstance();
//     return await api.delete<IOtpVerifyRequest, AxiosResponse<IOtpVerifyResponse>>(DELETE_COMPANY(payload));
// }

// ** Followup Service
