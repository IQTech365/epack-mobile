export interface ICreateSerialNoRequest {
    companyId: string;
    companyEntity: string;
    entityId: string;
    subModuleId: string;
    prefix: string;
    initialValue: string;
    // createdBy: string;
}