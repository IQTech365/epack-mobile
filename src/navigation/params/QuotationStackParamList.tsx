import { IGetEnquiriesData } from '../../interface/enquiry/IGetEnquiriesResponse';
import { IGetQuotationData } from '../../interface/quotation/IGetQuotationsResponse';
export type QuotationStackParamList = {
    QuotationRoot: undefined,
    AddQuotation: {item: IGetQuotationData | undefined, isEdit: boolean},
    QuotationDetails: {enquiryId: string, item: IGetEnquiriesData},
    QuotationSubscription: {isUpgrade: boolean}
}