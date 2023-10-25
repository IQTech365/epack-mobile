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
import { IUpdateEnquiryStatus, TUpdateEnquiryStatusRequest } from '../interface/enquiry/IUpdateEnquiryStatusRequest';
import { IUpdateEnquiryStatusResponse } from '../interface/enquiry/IUpdateEnquiryStatusResponse';
import { IUpdateEnquiryRequest } from '../interface/enquiry/IupdateEnquiryRequest';

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

export const UpdateEnquiryStatusService = async (id:IUpdateEnquiryStatus, requestBody:IUpdateEnquiryRequest ): Promise<IUpdateEnquiryStatusResponse> => {
    const api = Api.getInstance();
  
    return await api.update<IUpdateEnquiryRequest, AxiosResponse<IUpdateEnquiryStatusResponse>>(requestBody, EDIT_ENQUIRY(id.enquiryId));
}

// TODO: refactor code once in use
// export const DeleteCompanyService = async (payload: string): Promise<IOtpVerifyResponse> => {
//     const api = Api.getInstance();
//     return await api.delete<IOtpVerifyRequest, AxiosResponse<IOtpVerifyResponse>>(DELETE_COMPANY(payload));
// }

// ** Followup Service
