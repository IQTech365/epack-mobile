import {ICreateCarConditionRequest} from './ICreateCarConditionRequest';

export interface IGetCarConditionData extends ICreateCarConditionRequest {
    _id: string;
    createdAt: string;
}

export interface IGetCarConditionListResponse {
    data: IGetCarConditionData[];
    status: number;
    error: boolean;
}