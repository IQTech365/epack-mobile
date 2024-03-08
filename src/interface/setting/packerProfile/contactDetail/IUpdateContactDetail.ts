import { IAddContactDetailRequest } from "./IAddContactDetailRequest";

export interface IUpdateContactDetailPayload {
    id:string;
    payload:IAddContactDetailRequest;
}

export interface IUpdateContactDetailResponse {
    data:any;
    status:number;
    error:boolean;
}