// Create Serial No#
export interface ICreateSerialNoRequest {
  companyId: string;
  companyEntity: string;
  entityId: string;
  subModuleId: string;
  prefix: string;
  initialValue: string;
}

export interface ICreateSerialNoResponse {
  data: string;
  error: boolean;
  status: number;
}

export enum DOCUMENT_TYPE {
    QUOTATION,
    BILTY,
    CAR_CONDITION,
    INVOICE,
    MONEY_RECEIPT,
    SURVEY_ITEM,
}

// Get Serial No# for given Form
export interface IGetSerialNoRequest {
    document:DOCUMENT_TYPE,
    payload:IGetSerialNoPayload,
}
export interface IGetSerialNoPayload {
    activeCount: string;
    companyId?: string;
    branchId?: string;
    franchiseId?: string;
    isAuto?:boolean;
    isHeadOffice?:boolean;
}

export interface IGetSerialNoResponse {
    data: number;
    error: boolean;
    status: number;
    message: string;
}
