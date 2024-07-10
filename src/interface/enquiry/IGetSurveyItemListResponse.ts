import { IAddSurveyItemRequest } from "./IAddSurveyItemRequest";

export interface IGetSurveyItemListData extends IAddSurveyItemRequest {
    _id: string;
    isActive: boolean;
    isDeleted: boolean;
    quotationId: boolean;
    createdAt: string;
}

export interface IGetSurvyeItemListRequestPayload {
    enquiryId: string;
    // id : string
    // id: string;
}

export interface IGetSurvyeItemListByIdRequestPayload {
    // enquiryId: string;
    id : string
    // id: string;
}

export interface IGetSurveyItemListResponse {
    data: IGetSurveyItemListData[];
    status: number;
    error: boolean;
}