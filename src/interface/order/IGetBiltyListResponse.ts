import {ICreateBiltyRequest} from './ICreateBiltyRequest';

export interface IGetBiltyData extends ICreateBiltyRequest {
    _id: string;
    createdAt: string;
}

export interface IGetBiltyListResponse {
    data: IGetBiltyData[];
    status: number;
    error: boolean;
}