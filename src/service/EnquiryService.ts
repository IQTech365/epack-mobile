import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {ADD_ENQUIRY, EDIT_COMPANY} from '../http/Endpoint';
import { IOtpVerifyRequest } from '../interface/otp/IOtpVerifyRequest';
import { IOtpVerifyResponse } from '../interface/otp/IOtpVerifyResponse';
import { IAddEnquiryRequest } from '../interface/enquiry/IAddEnquiryRequest';
import { IAddEnquiryResponse } from '../interface/enquiry/IAddEnquiryResponse';

export const AddEnquiryService = async (payload: IAddEnquiryRequest): Promise<IAddEnquiryResponse> => {
    console.log('AddEnquiryService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<IAddEnquiryRequest, AxiosResponse<IAddEnquiryResponse>>(payload, ADD_ENQUIRY);
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
