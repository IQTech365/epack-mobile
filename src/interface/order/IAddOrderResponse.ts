interface IAddOrderData {}

export interface IAddOrderResponse {
    data: IAddOrderData;
    status: number;
    error: boolean;
}