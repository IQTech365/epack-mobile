import {IAddFooterContentRequest} from './IAddFooterContentRequest';

export interface IGetFooterContentData extends IAddFooterContentRequest {
    _id: string;
    createdAt: string;
}

export interface IGetFooterContentsResponse {
    data: IGetFooterContentData[];
    status: number;
    error: boolean;
}