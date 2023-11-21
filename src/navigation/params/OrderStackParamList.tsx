import { ISingleEnquiryData } from '../../interface/enquiry/ISingleEnquiryResponse';
export type OrderStackParamList = {
    OrderRoot: undefined,
    AddOrder: undefined,
    OrderDetails: {orderId: string, item: ISingleEnquiryData} | undefined,
}