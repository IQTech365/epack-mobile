import { IGetOrdersData } from '../../interface/order/IGetOrdersResponse';
export type OrderStackParamList = {
    OrderRoot: undefined,
    AddOrder: undefined,
    OrderDetails: {orderId: string, item: IGetOrdersData} | null,
}