import { IGetEnquiriesData } from '../../interface/enquiry/IGetEnquiriesResponse';
import { IEnquiry } from '../../interface/quotation/IGetQuotationsResponse';
import {EnquiryStackRoute} from '../../utils/constants';
export type EnquiryStackParamList = {
    EnquiryRoot: undefined,
    AddEnquiry: undefined,
    EnquiryDetails: {enquiryId: string, item: IEnquiry} | undefined,
}