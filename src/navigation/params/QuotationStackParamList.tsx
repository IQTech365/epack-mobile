import { IGetEnquiriesData } from '../../interface/enquiry/IGetEnquiriesResponse';
export type QuotationStackParamList = {
    QuotationRoot: undefined,
    AddQuotation: undefined,
    QuotationDetails: {enquiryId: string, item: IGetEnquiriesData},
}