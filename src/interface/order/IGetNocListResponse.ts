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


export interface IUpdateNocFormPayloadRequest {
  id(id: any): string;
  data<T, U>(data: any, arg1: string): IUpdateNocFormResponse | PromiseLike<IUpdateNocFormResponse>;
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


export interface IUpdateNocFormResponse {
  data: IUpdateNocFormPayloadRequest[];
  status: number;
  error: boolean;
}
