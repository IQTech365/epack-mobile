import {IAddFooterContentRequest} from './IAddFooterContentRequest';

export interface IGetFooterContentData extends IAddFooterContentRequest {
    _id: string;
    isAdmin:boolean;
    isActive:boolean;
    isDeleted:boolean;
    createdAt: string;
    __v:number;
}

export interface IGetFooterContentsResponse {
    data: IGetFooterContentData[];
    status: number;
    error: boolean;
}