import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {ADD_CONTACT_DETAIL, ADD_DOCUMENT, ADD_FOOTER_CONTENT, ADD_PAYMENT_METHOD, ADD_USER_ROLE, GET_CONTACTS, GET_DOCUMENTS, GET_FOOTER_CONTENTS, GET_OTP, GET_PAYMENT_METHODS, GET_ROLE_TYPES, VERIFY_OTP} from '../http/Endpoint';
import { IOtpVerifyRequest } from '../interface/otp/IOtpVerifyRequest';
import { IOtpVerifyResponse } from '../interface/otp/IOtpVerifyResponse';
import { IAddContactDetailRequest } from '../interface/setting/packerProfile/contactDetail/IAddContactDetailRequest';
import { IAddContactDetailResponse } from '../interface/setting/packerProfile/contactDetail/IAddContactDetailResponse';
import { IGetContactDetailsResponse } from '../interface/setting/packerProfile/contactDetail/IGetContactDetailsResponse';
import { IAddDocumentRequest } from '../interface/setting/packerProfile/document/IAddDocumentRequest';
import { IAddDocumentResponse } from '../interface/setting/packerProfile/document/IAddDocumentResponse';
import { IGetDocumentsResponse } from '../interface/setting/packerProfile/document/IGetDocumentsResponse';
import { IAddFooterContentRequest } from '../interface/setting/packerProfile/footerContent/IAddFooterContentRequest';
import { IAddFooterContentResponse } from '../interface/setting/packerProfile/footerContent/IAddFooterContentResponse';
import { IGetFooterContentsResponse } from '../interface/setting/packerProfile/footerContent/IGetFooterContentsResponse';
import { IAddPaymentMethodRequest } from '../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodRequest';
import { IAddPaymentMethodResponse } from '../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodResponse';
import { IAddUserRoleRequest, IAddUserRoleResponse, IRoleTypeResponse } from '../interface/setting/role/IUserRole';

// PAYMENT
export const AddPaymentMethodService = async (payload: IAddPaymentMethodRequest): Promise<IAddPaymentMethodResponse> => {
    const api = Api.getInstance();
    return await api.post<IAddPaymentMethodRequest, AxiosResponse<IAddPaymentMethodResponse>>(payload, ADD_PAYMENT_METHOD);
}

export const GetPaymentMethodService = async (payload: IAddPaymentMethodRequest): Promise<IAddPaymentMethodResponse> => {
    const api = Api.getInstance();
    return await api.get<IAddPaymentMethodResponse>(GET_PAYMENT_METHODS(payload));
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

// PAYMENT
export const AddContactDetailService = async (payload: IAddContactDetailRequest): Promise<IAddContactDetailResponse> => {
    const api = Api.getInstance();
    return await api.post<IAddContactDetailRequest, AxiosResponse<IAddContactDetailResponse>>(payload, ADD_CONTACT_DETAIL);
}

export const GetContactDetailsService = async (payload: string): Promise<IGetContactDetailsResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetContactDetailsResponse>(GET_CONTACTS(payload));
}

// COMPANY DOCUMENT
export const AddCompanyDocumentService = async (payload: IAddDocumentRequest): Promise<IAddDocumentResponse> => {
    const api = Api.getInstance();
    return await api.post<IAddDocumentRequest, AxiosResponse<IAddDocumentResponse>>(payload, ADD_DOCUMENT);
}

export const GetCompanyDocumentsService = async (payload: string): Promise<IGetDocumentsResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetDocumentsResponse>(GET_DOCUMENTS(payload));
}

// USER ROLE
export const AddUserRoleService = async (payload: IAddUserRoleRequest): Promise<IAddUserRoleResponse> => {
    const api = Api.getInstance();
    return await api.post<IAddUserRoleRequest, AxiosResponse<IAddUserRoleResponse>>(payload, ADD_USER_ROLE);
}

// ROLE TYPES
export const GetRoleTypesService = async (): Promise<IRoleTypeResponse> => {
    const api = Api.getInstance();
    return await api.get<IRoleTypeResponse>(GET_ROLE_TYPES);
}