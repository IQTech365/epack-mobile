import {IAddDocumentRequest} from './IAddDocumentRequest';

export interface IGetDocumentData extends IAddDocumentRequest {
    _id: string;
    isActive: boolean;
    createdAt: string;
}

export interface IGetDocumentsResponse {
    data: IGetDocumentData[];
    status: number;
    error: boolean;
}