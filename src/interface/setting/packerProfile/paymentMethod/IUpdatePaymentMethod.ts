import { IAddPaymentMethodRequest } from "./IAddPaymentMethodRequest";

export interface IUpdatePaymentMethodPayload {
    id:string;
    payload: IAddPaymentMethodRequest;
}

export interface IUpdatePaymentMethodResponse {
    data:any;
    status:number;
    error:boolean;
}