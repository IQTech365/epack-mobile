export interface IUpdateIndividualContactDetailRequest {
    email: string;
    landline: string;
    mobile: string;
    orderAmount: string;
    tokenAmount: string;
    alternateNumbers: string[];
}

export interface IUpdateCompanyContactDetailRequest {
    companyName: string;
    approvalAuthority: string;
    authorityPersonName: string;
    authorityMobileNumber: string;
    companyGST: string;
    employeeName: string;
    employeeDesignation: string;
    employeeMobileNumber: string;
    companyAddress: string;
    email: string;
    landline: string;
    orderAmount: string;
    tokenAmount: string;
    alternateNumbers: string[];
}

export interface IUpdateContactDetailResponse {
    data: IUpdateIndividualContactDetailRequest | IUpdateCompanyContactDetailRequest;
    status: number;
    error: boolean;
}