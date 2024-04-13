import { ISingleEnquiryData } from '../../interface/enquiry/ISingleEnquiryResponse';
import { IBilty } from '../../interface/order/IGetBiltyListResponse';
import { IInvoice } from '../../interface/order/IGetInvoiceListResponse';
import { IPackingListData } from '../../interface/order/IPackingMaterialResponse';
export type OrderStackParamList = {
    OrderRoot: undefined,
    AddOrder: undefined,
    OrderDetails: {orderId: string, item: ISingleEnquiryData} | undefined,
    EditPackingItems: {item:IPackingListData, orderId: string} | undefined,
    EditInvoice: {item:IInvoice, enquiry: ISingleEnquiryData, orderID:string},
    EditBilty: {item:IBilty, orderID:string},
}