import {IAddContactDetailRequest} from './IAddContactDetailRequest';

export interface IGetContactDetailsData extends IAddContactDetailRequest {
    _id: string;
    createdAt: string;
}

export interface IGetContactDetailsResponse {
    data: IGetContactDetailsData[];
    status: number;
    error: boolean;
}