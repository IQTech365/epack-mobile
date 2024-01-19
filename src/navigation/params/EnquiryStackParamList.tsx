import { IGetSurveyItemListData } from '../../interface/enquiry/IGetSurveyItemListResponse';
import { IEnquiry } from '../../interface/quotation/IGetQuotationsResponse';
export type EnquiryStackParamList = {
    EnquiryRoot: undefined,
    AddEnquiry: undefined,
    EnquiryDetails: {enquiryId: string, item: IEnquiry} | undefined,
    EditSurveyItems: {item:IGetSurveyItemListData} | undefined,
}