import { ISingleEnquiryData } from '../../interface/enquiry/ISingleEnquiryResponse';
import { IPackingListData } from '../../interface/order/IPackingMaterialResponse';
export type OrderStackParamList = {
    OrderRoot: undefined,
    AddOrder: undefined,
    OrderDetails: {orderId: string, item: ISingleEnquiryData} | undefined,
    EditPackingItems: {item:IPackingListData, orderId: string} | undefined,
}