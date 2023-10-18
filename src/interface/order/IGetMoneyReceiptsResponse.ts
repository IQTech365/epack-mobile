import {ICreateMoneyReceiptRequest} from './ICreateMoneyReceiptRequest';

export interface IGetMoneyReceiptsData extends ICreateMoneyReceiptRequest {
    _id: string;
    createdAt: string;
}

export interface IGetMoneyReceiptsResponse {
    data: IGetMoneyReceiptsData[];
    status: number;
    error: boolean;
}