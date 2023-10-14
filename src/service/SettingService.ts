import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {ADD_FOOTER_CONTENT, GET_FOOTER_CONTENTS, GET_OTP, VERIFY_OTP} from '../http/Endpoint';
import { IOtpVerifyRequest } from '../interface/otp/IOtpVerifyRequest';
import { IOtpVerifyResponse } from '../interface/otp/IOtpVerifyResponse';
import { IAddFooterContentRequest } from '../interface/setting/packerProfile/footerContent/IAddFooterContentRequest';
import { IAddFooterContentResponse } from '../interface/setting/packerProfile/footerContent/IAddFooterContentResponse';
import { IGetFooterContentsResponse } from '../interface/setting/packerProfile/footerContent/IGetFooterContentsResponse';
import { IAddPaymentMethodRequest } from '../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodRequest';
import { IAddPaymentMethodResponse } from '../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodResponse';

// PAYMENT
export const AddPaymentMethodService = async (payload: IAddPaymentMethodRequest): Promise<IAddPaymentMethodResponse> => {
    const api = Api.getInstance();
    return await api.post<IAddPaymentMethodRequest, AxiosResponse<IAddPaymentMethodResponse>>(payload, GET_OTP);
}

// FOOTER CONTENT
export const AddFooterContentService = async (payload: IAddFooterContentRequest): Promise<IAddFooterContentResponse> => {
    const api = Api.getInstance();
    return await api.post<IAddFooterContentRequest, AxiosResponse<IAddFooterContentResponse>>(payload, ADD_FOOTER_CONTENT);
}

export const GetFooterContentsService = async (payload: string): Promise<IGetFooterContentsResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetFooterContentsResponse>(GET_FOOTER_CONTENTS(payload));
}

export const VerifyOtpService = async (payload: IOtpVerifyRequest): Promise<IOtpVerifyResponse> => {
    const api = Api.getInstance();
    return await api.post<IOtpVerifyRequest, AxiosResponse<IOtpVerifyResponse>>(payload, VERIFY_OTP);
}