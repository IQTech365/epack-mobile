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
