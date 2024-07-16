export interface IGetNocListRequest {
  _id: string;
  companyId: string;
  enquiryId: string;
}

export interface INocPayload {
  companyId: string;
}

export interface INocTemplatePayload {
  companyId: string;
  nocId: string;
  templateId: string;
  orderId: string;
}

export interface INocTemplateResponse {
  html: any;
}

export interface IGetNocList {
  _id: string;
  companyId: string;
  enquiryId: string;
  nocType: string;
  nocDate: string;
  biltyNo: string;
  biltyDate: string;
  addedBy: string;
  isActive: boolean;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string;
}

export interface IGetNocListResponse {
  data: IGetNocList[];
  status: number;
  error: boolean;
}

export interface INocFormTemplatePayload {
  html: any;
}
