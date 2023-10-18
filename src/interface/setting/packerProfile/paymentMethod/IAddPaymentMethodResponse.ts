import {IAddPaymentMethodRequest} from './IAddPaymentMethodRequest';

export interface IAddPaymentMethodData extends IAddPaymentMethodRequest {
    _id: string;
    createdAt: string;
}

export interface IAddPaymentMethodResponse {
    data: IAddPaymentMethodData;
    status: number;
    error: boolean;
}