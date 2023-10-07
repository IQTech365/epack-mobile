import { IGetEnquiriesData } from '../../interface/enquiry/IGetEnquiriesResponse';
import {EnquiryStackRoute} from '../../utils/constants';
export type EnquiryStackParamList = {
    EnquiryRoot: undefined,
    AddEnquiry: undefined,
    EnquiryDetails: {enquiryId: string, item: IGetEnquiriesData} | undefined,
}