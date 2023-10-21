export interface IAddDocumentRequest {
    companyId: string;
    documentTypeId: string;
    documentNumber: string;
    title: string;
    modulesView: string[];
    createdBy: string;
}