import {IAddFooterContentRequest} from './IAddFooterContentRequest';

export interface IAddFooterContentData extends IAddFooterContentRequest {
    _id: string;
    createdAt: string;
}

export interface IAddFooterContentResponse {
    data: IAddFooterContentData;
    status: number;
    error: boolean;
}