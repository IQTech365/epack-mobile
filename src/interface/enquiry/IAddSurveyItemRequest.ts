export interface ISurveyListItem {
  itemName: string;
  quantity: string;
  valueOfGoods: string;
  cftValue?:string;
  remarks: string;
  groupID?: string;
}

export interface IAddSurveyItemRequest {
  companyId:string;
  enquiryId: string;
  surveyListNo: string;
  surveyDate: string;
  surveyItems: ISurveyListItem[];
  addedBy: string;
  isAuto: boolean;
  isHeadOffice:boolean;
}

export interface IAddSurveyItemPayload{
  companyId:string;
  enquiryId: string;
  surveyListNo: string;
  surveyDate: string;
  surveyItems: ISurveyListItem[];
  addedBy: string;
  isAuto: boolean;
  isHeadOffice:boolean;
  quotationId:string;


}
