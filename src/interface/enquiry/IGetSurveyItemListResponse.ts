import { IAddSurveyItemRequest } from "./IAddSurveyItemRequest";

export interface IGetSurveyItemListData extends IAddSurveyItemRequest {
    _id: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
}

export interface IGetSurvyeItemListRequestPayload {
    enquiryId: string;
    // id: string;
}

export interface IGetSurveyItemListResponse {
    data: IGetSurveyItemListData[];
    status: number;
    error: boolean;
}