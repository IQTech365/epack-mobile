import {EnquiryStackRoute} from '../../utils/constants';
export type EnquiryStackParamList = {
    EnquiryRoot: undefined,
    AddEnquiry: undefined,
    EnquiryDetails: {enquiryId: string} | undefined,
}