import { IAddEnquiryRequest } from "./IAddEnquiryRequest";

interface IGetEnquiriesData extends IAddEnquiryRequest {
    _id: string;
}

export interface IGetEnquiriesResponse {
    data: [IGetEnquiriesData];
    status: number;
    error: boolean;
}