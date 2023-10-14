import {IAddPaymentMethodRequest} from './IAddPaymentMethodRequest';

export interface IGetPaymentMethodData extends IAddPaymentMethodRequest {
    _id: string;
    createdAt: string;
}

export interface IGetPaymentMethodsResponse {
    data: IGetPaymentMethodData[];
    status: number;
    error: boolean;
}