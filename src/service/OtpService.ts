import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {GET_OTP, VERIFY_OTP} from '../http/Endpoint';
import { IOtpGetRequest } from '../interface/otp/IOtpGetRequest';
import { IOtpGetResponse } from '../interface/otp/IOtpGetResponse';
import { IOtpVerifyRequest } from '../interface/otp/IOtpVerifyRequest';
import { IOtpVerifyResponse } from '../interface/otp/IOtpVerifyResponse';

export const GetOtpService = async (payload: IOtpGetRequest): Promise<IOtpGetResponse> => {
    console.log('GetOtpService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<IOtpGetRequest, AxiosResponse<IOtpGetResponse>>(payload, GET_OTP);
}

export const VerifyOtpService = async (payload: IOtpVerifyRequest): Promise<IOtpVerifyResponse> => {
    const api = Api.getInstance();
    return await api.post<IOtpVerifyRequest, AxiosResponse<IOtpVerifyResponse>>(payload, VERIFY_OTP);
}