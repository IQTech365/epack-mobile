import { IEnquiry } from '../../interface/quotation/IGetQuotationsResponse';
export type EnquiryStackParamList = {
    EnquiryRoot: undefined,
    AddEnquiry: undefined,
    EnquiryDetails: {enquiryId: string, item: IEnquiry} | undefined,
}