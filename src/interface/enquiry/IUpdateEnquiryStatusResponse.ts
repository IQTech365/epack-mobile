import { IUpdateEnquiryStatusRequest } from "./IUpdateEnquiryStatusRequest";

export interface IUpdateEnquiryStatusResponse {
    data: IUpdateEnquiryStatusRequest;
    status: number;
    error: boolean;
}