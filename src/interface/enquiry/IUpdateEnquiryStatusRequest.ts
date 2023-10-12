export interface IUpdateEnquiryStatus {
    enquiryId: string;
    status: string;
}

export type TUpdateEnquiryStatusRequest = Omit<IUpdateEnquiryStatus, 'enquiryId'>;