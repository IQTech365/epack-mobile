import {IAddDocumentRequest} from './IAddDocumentRequest';

export interface IAddDocumentData extends IAddDocumentRequest {
    _id: string;
    createdAt: string;
}

export interface IAddDocumentResponse {
    data: IAddDocumentData;
    status: number;
    error: boolean;
}