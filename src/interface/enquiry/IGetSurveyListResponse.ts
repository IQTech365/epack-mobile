import { IAddSurveyRequest } from "./IAddSurveyRequest";

export interface IGetSurveyListData extends IAddSurveyRequest {
    _id: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
}

export interface IGetSurveyListResponse {
    data: IGetSurveyListData;
    status: number;
    error: boolean;
}