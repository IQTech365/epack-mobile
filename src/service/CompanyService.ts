import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {
  ADD_COMPANY,
  EDIT_COMPANY,
  UPLOAD_COMPANY_LOGO,
  UPLOAD_SIGNATURE,
} from '../http/Endpoint';
import { IOtpVerifyRequest } from '../interface/otp/IOtpVerifyRequest';
import { IOtpVerifyResponse } from '../interface/otp/IOtpVerifyResponse';
import { ICompanyRegistrationRequest } from '../interface/companyRegistration/ICompanyRegistrationRequest';
import { ICompanyRegistrationResponse } from '../interface/companyRegistration/ICompanyRegistrationResponse';

export const AddCompanyService = async (payload: ICompanyRegistrationRequest): Promise<ICompanyRegistrationResponse> => {
    console.log('AddCompanyService--payload--', JSON.stringify(payload));
    const api = Api.getInstance();
    return await api.post<ICompanyRegistrationRequest, AxiosResponse<ICompanyRegistrationResponse>>(payload, ADD_COMPANY);
}

// TODO: refactor code once in use
export const EditCompanyService = async (payload: IOtpVerifyRequest): Promise<IOtpVerifyResponse> => {
    const api = Api.getInstance();
    return await api.update<IOtpVerifyRequest, AxiosResponse<IOtpVerifyResponse>>(payload, EDIT_COMPANY);
}

export const UploadCompanyLogoService = async (payload: any): Promise<any> => {
    const api = Api.getInstance();
    return await api.post<any, AxiosResponse<any>>(payload, UPLOAD_COMPANY_LOGO);
}

export const UploadSignatureService = async (payload: any): Promise<any> => {
    const api = Api.getInstance();
    return await api.post<any, AxiosResponse<any>>(payload, UPLOAD_SIGNATURE);
}

// TODO: refactor code once in use
// export const DeleteCompanyService = async (payload: string): Promise<IOtpVerifyResponse> => {
//     const api = Api.getInstance();
//     return await api.delete<IOtpVerifyRequest, AxiosResponse<IOtpVerifyResponse>>(DELETE_COMPANY(payload));
// }