import { ICreateInvoiceRequest } from "./ICreateInvoiceRequest";

export interface IUpdateInvoicePayload {
    id:string;
    data:ICreateInvoiceRequest;
}

export interface IUpdateInvoiceResponse {
    data: any;
    status:number;
    error:boolean;
}