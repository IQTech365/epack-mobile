export interface IAddSurveyRequest {
    companyId:string;
    branchId?:string;
    franchiseId?:string;
    enquiryId: string;
    surveyDate: string;
    comment: string;
    addedBy: string;
}