export interface ITemplate {
  _id: string;
  templateName: string;
  moduleId: string;
  templateVersion: string;
  templateHTML: string;
  isActive: boolean;
  isDeleted: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface ITemplateData {
  _id: string;
  rows: ITemplate[];
}

export interface ITemplateListResponse {
  data: ITemplateData[];
  status: number;
  error: boolean;
}

export interface ISaveDocumentTemplateIdParams {
  templateId: string;
}

export interface ISaveDocumentTemplateIdRequestPayload {
  companyId:string,
	moduleId:string,
}

// Save Template ID
export interface ISaveDocumentTemplateIdPayload {
  params:ISaveDocumentTemplateIdParams;
	payload: ISaveDocumentTemplateIdRequestPayload;
}

export interface ISaveDocumentTemplateIdResponse {
  data: any;
  status: number;
  error: boolean;
}

// Get Saved Document Template Id List
export interface ISavedDocumentTemplateId {

}

export interface ISavedDocumentTemplateIdResponse {
  data: ISavedDocumentTemplateId[];
  status: number;
  error: boolean;
}

// 
