export interface IAddFollowupRequest {
    companyId:string;
    branchId?:string;
    franchiseId?:string;
    enquiryId: string;
    authId: string;
    followUpDate: string;
    comment: string;
}