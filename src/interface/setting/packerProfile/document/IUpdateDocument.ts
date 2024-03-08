import { IAddDocumentRequest, IUpdateDocumentRequest } from "./IAddDocumentRequest";

export interface IUpdateDocumentPayload {
    id:string;
    payload:IUpdateDocumentRequest;
}

export interface IUpdateDocumentResponse {
    data:any;
    status:number;
    error:boolean;
}