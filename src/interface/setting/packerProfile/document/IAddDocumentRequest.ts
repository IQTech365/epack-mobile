export interface IAddDocumentRequest {
  companyId: string;
  moduleId: string[];
  documentType: string;
  ibaValidTillDate?: string;
  documentTypeValue: string;
  documentTypeTitle: string;
  createdBy: string;
}
