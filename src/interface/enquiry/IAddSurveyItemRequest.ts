export interface ISurveyListItem {
  itemName: string;
  quantity: string;
  valueOfGoods: string;
  remarks: string;
}

export interface IAddSurveyItemRequest {
  enquiryId: string;
  surveyListNo: string;
  surveyDate: string;
  surveyItems: ISurveyListItem[];
  addedBy: string;
}
