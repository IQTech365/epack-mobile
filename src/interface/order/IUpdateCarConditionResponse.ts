import { ICreateCarConditionRequest } from "./ICreateCarConditionRequest";

export interface IUpdateCarConditionPayload {
    id:string;
    data:ICreateCarConditionRequest;
}

export interface  IUpdateCarConditionResponse {
    data: any;
    status:number;
    error:boolean;
}