import {IAddContactDetailRequest} from './IAddContactDetailRequest';

export interface IAddContactDetailData extends IAddContactDetailRequest {
    _id: string;
    createdAt: string;
}

export interface IAddContactDetailResponse {
    data: IAddContactDetailData;
    status: number;
    error: boolean;
}