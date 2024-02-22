import {ISurveyListItem} from './IAddSurveyItemRequest';

export interface IUpdateSurveyItemPayload {
  surveyListNo: string;
  surveyDate: string;
  surveyItems: ISurveyListItem[];
}

export interface IUpdateSurveyItemRequest {
  surveyId: string;
  payload: IUpdateSurveyItemPayload;
}

export interface IUpdateSurveyItemResponse {
  data: any;
  status: number;
  error: boolean;
}

// Survey Item List Template
export interface ISurveyListTemlatePayload {
  companyId: string;
  surveyListId: string;
  templateId: string;
  enquiryId: string;
}

export interface ISurveyListTemplateResponse {
  html: any;
}
