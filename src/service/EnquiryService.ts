import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {ADD_ENQUIRY, EDIT_COMPANY, GET_ENQUIRY_LIST, ADD_FOLLOWUP, GET_FOLLOWUP_COMMENTS, ADD_SURVEY, GET_SURVEY_COMMENTS, EDIT_ENQUIRY} from '../http/Endpoint';
import { IOtpVerifyRequest } from '../interface/otp/IOtpVerifyRequest';
import { IOtpVerifyResponse } from '../interface/otp/IOtpVerifyResponse';
import { IAddEnquiryRequest } from '../interface/enquiry/IAddEnquiryRequest';
import { IAddEnquiryResponse } from '../interface/enquiry/IAddEnquiryResponse';
import { IGetEnquiriesResponse } from '../interface/enquiry/IGetEnquiriesResponse';
import { IAddFollowupRequest } from '../interface/enquiry/IAddFollowupRequest';
import { IAddFollowupResponse } from '../interface/enquiry/IAddFollowupResponse';
import { IGetFollowupsResponse } from '../interface/enquiry/IGetFollowupsResponse';
import { IAddSurveyRequest } from '../interface/enquiry/IAddSurveyRequest';
import { IAddSurveyResponse } from '../interface/enquiry/IAddSurveyResponse';
import { IGetSurveyListResponse } from '../interface/enquiry/IGetSurveyListResponse';
import { IUpdateEnquiryStatusRequest } from '../interface/enquiry/IUpdateEnquiryStatusRequest';
import { IUpdateEnquiryStatusResponse } from '../interface/enquiry/IUpdateEnquiryStatusResponse';
import { IDropAddress, IPickupAddress } from '../interface/order/IUpdateAddressRequest';
import { IUpdateAddressResponse } from '../interface/order/IUpdateAddressResponse';
import { IUpdateCompanyContactDetailRequest, IUpdateContactDetailResponse, IUpdateIndividualContactDetailRequest } from '../interface/order/IUpdateContactDetails';
import { IUpdateShiftingInfoRequest, IUpdateShiftingInfoResponse } from '../interface/enquiry/IUpdateShiftingInfo';

export const AddEnquiryService = async (payload: IAddEnquiryRequest): Promise<IAddEnquiryResponse> => {
    const api = Api.getInstance();
    return await api.post<IAddEnquiryRequest, AxiosResponse<IAddEnquiryResponse>>(payload, ADD_ENQUIRY);
}

// TODO: refactor code once in use
export const EditEnquiryService = async (payload: IOtpVerifyRequest): Promise<IOtpVerifyResponse> => {
    const api = Api.getInstance();
    return await api.update<IOtpVerifyRequest, AxiosResponse<IOtpVerifyResponse>>(payload, EDIT_COMPANY);
}

export const GetEnquiriesService = async (payload: string): Promise<IGetEnquiriesResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetEnquiriesResponse>(GET_ENQUIRY_LIST(payload));
}

export const AddFollowupService = async (payload: IAddFollowupRequest): Promise<IAddFollowupResponse> => {
    const api = Api.getInstance();
    return await api.post<IAddFollowupRequest, AxiosResponse<IAddFollowupResponse>>(payload, ADD_FOLLOWUP);
}

export const GetFollowupsService = async (payload: string): Promise<IGetFollowupsResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetFollowupsResponse>(GET_FOLLOWUP_COMMENTS(payload));
}

export const AddSurveyService = async (payload: IAddSurveyRequest): Promise<IAddSurveyResponse> => {
    const api = Api.getInstance();
    return await api.post<IAddSurveyRequest, AxiosResponse<IAddSurveyResponse>>(payload, ADD_SURVEY);
}

export const GetSurveyListService = async (payload: string): Promise<IGetSurveyListResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetSurveyListResponse>(GET_SURVEY_COMMENTS(payload));
}

export const UpdateEnquiryStatusService = async (id:string, requestBody:IUpdateEnquiryStatusRequest ): Promise<IUpdateEnquiryStatusResponse> => {
    const api = Api.getInstance();
    return await api.update<IUpdateEnquiryStatusRequest, AxiosResponse<IUpdateEnquiryStatusResponse>>(requestBody, EDIT_ENQUIRY(id));
}

export const UpdateAddressService = async (id:string, requestBody: IPickupAddress | IDropAddress ): Promise<IUpdateAddressResponse> => {
    const api = Api.getInstance();
    return await api.update<IPickupAddress | IDropAddress, AxiosResponse<IUpdateAddressResponse>>(requestBody, EDIT_ENQUIRY(id));
}

export const UpdateContactDetailsService = async (id:string, requestBody: IUpdateIndividualContactDetailRequest | IUpdateCompanyContactDetailRequest ): Promise<IUpdateContactDetailResponse> => {
    const api = Api.getInstance();
    return await api.update<IUpdateIndividualContactDetailRequest | IUpdateCompanyContactDetailRequest, AxiosResponse<IUpdateContactDetailResponse>>(requestBody, EDIT_ENQUIRY(id));
}

export const UpdateShiftingInfoService = async (id:string, requestBody: IUpdateShiftingInfoRequest): Promise<IUpdateShiftingInfoResponse> => {
    const api = Api.getInstance();
    return await api.update<IUpdateShiftingInfoRequest, AxiosResponse<IUpdateShiftingInfoResponse>>(requestBody, EDIT_ENQUIRY(id));
}

