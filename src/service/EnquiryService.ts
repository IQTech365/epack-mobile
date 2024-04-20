import {AxiosResponse} from 'axios';
import {Api} from '../http/Api';
import {ADD_ENQUIRY, EDIT_COMPANY, GET_ENQUIRY_LIST, ADD_FOLLOWUP, GET_FOLLOWUP_COMMENTS, ADD_SURVEY, GET_SURVEY_COMMENTS, EDIT_ENQUIRY, GET_ENQUIRY, ADD_SURVEY_ITEM, GET_SURVEY_ITEM, ADD_PACKING_MATERIAL, GET_PACKING_MATERIALS, EDIT_SURVEY_ITEM, GET_SURVEY_LIST_ITEM_TEMPLATE_HTML, UPDATE_PACKING_MATERIALS} from '../http/Endpoint';
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
import { IAddSurveyItemRequest } from '../interface/enquiry/IAddSurveyItemRequest';
import { IGetSurveyItemListResponse, IGetSurvyeItemListRequestPayload } from '../interface/enquiry/IGetSurveyItemListResponse';
import { ISingleEnquiryResponse } from '../interface/enquiry/ISingleEnquiryResponse';
import { IAddPackingMaterialRequest } from '../interface/enquiry/IAddPackingMaterialRequest';
import { IAddPackingMaterialResponse } from '../interface/enquiry/IAddPackingMaterialResponse';
import { IGetPackingMaterialsRequest, IPackingMaterialsResponse } from '../interface/enquiry/IPackingMaterialsResponse';
import { ISurveyListTemlatePayload, ISurveyListTemplateResponse, IUpdateSurveyItemPayload, IUpdateSurveyItemRequest, IUpdateSurveyItemResponse } from '../interface/enquiry/enquiry';
import { IUpdatePackingMaterialRequest, IUpdatePackingMaterialResponse } from '../interface/enquiry/IUpdatePackingMaterialResponse';

export const AddEnquiryService = async (payload: IAddEnquiryRequest): Promise<IAddEnquiryResponse> => {
    const api = Api.getInstance();
    return await api.post<IAddEnquiryRequest, AxiosResponse<IAddEnquiryResponse>>(payload, ADD_ENQUIRY);
}

// TODO: refactor code once in use
export const EditEnquiryService = async (payload: IOtpVerifyRequest): Promise<IOtpVerifyResponse> => {
    const api = Api.getInstance();
    return await api.update<IOtpVerifyRequest, AxiosResponse<IOtpVerifyResponse>>(payload, EDIT_COMPANY(''));
}

export const GetEnquiriesService = async (payload: string): Promise<IGetEnquiriesResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetEnquiriesResponse>(GET_ENQUIRY_LIST(payload));
}

export const GetEnquiryService = async (payload: string): Promise<ISingleEnquiryResponse> => {
    const api = Api.getInstance();
    return await api.get<ISingleEnquiryResponse>(GET_ENQUIRY(payload));
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

export const AddSurveyItemService = async (payload: IAddSurveyItemRequest): Promise<IAddSurveyResponse> => {
    const api = Api.getInstance();
    return await api.post<IAddSurveyItemRequest, AxiosResponse<IAddSurveyResponse>>(payload, ADD_SURVEY_ITEM);
}

export const GetSurveyItemListService = async (payload: IGetSurvyeItemListRequestPayload): Promise<IGetSurveyItemListResponse> => {
    const api = Api.getInstance();
    return await api.post<IGetSurvyeItemListRequestPayload, AxiosResponse<IGetSurveyItemListResponse>>(payload, GET_SURVEY_ITEM);
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

export const AddPackingMaterialService = async (payload: IAddPackingMaterialRequest): Promise<IAddPackingMaterialResponse> => {
    const api = Api.getInstance();
    return await api.post<IAddPackingMaterialRequest, AxiosResponse<IAddPackingMaterialResponse>>(payload, ADD_PACKING_MATERIAL);
}

export const UpdatePackingMaterialService = async (id:string, requestBody: IUpdatePackingMaterialRequest): Promise<IUpdatePackingMaterialResponse> => {
    const api = Api.getInstance();
    return await api.update<IUpdatePackingMaterialRequest, AxiosResponse<IUpdatePackingMaterialResponse>>(requestBody, UPDATE_PACKING_MATERIALS(id));
}

export const GetPackingMaterialsService = async (payload: IGetPackingMaterialsRequest): Promise<IPackingMaterialsResponse> => {
    const api = Api.getInstance();
    return await api.post<IGetPackingMaterialsRequest, AxiosResponse<IPackingMaterialsResponse>>(payload, GET_PACKING_MATERIALS);
}

export const UpdateSurveyItemListService = async (req:IUpdateSurveyItemRequest): Promise<IUpdateSurveyItemResponse> => {
    const {surveyId, payload} = req;
    const api = Api.getInstance();
    return await api.update<IUpdateSurveyItemPayload, AxiosResponse<IUpdateSurveyItemResponse>>(payload, EDIT_SURVEY_ITEM(surveyId));
}

export const GetSurveyListItemTemplateService = async (payload: ISurveyListTemlatePayload): Promise<ISurveyListTemplateResponse> => {
    const api = Api.getInstance();
    return await api.post<ISurveyListTemlatePayload, AxiosResponse<ISurveyListTemplateResponse>>(payload, GET_SURVEY_LIST_ITEM_TEMPLATE_HTML);
}

