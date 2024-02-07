export interface IUpdateIndividualContactDetailRequest {
    partyName: string;
    email: string;
    landline: string;
    mobile: string;
    orderAmount: string;
    tokenAmount: string;
    alternateNumbers: string[];
}

export interface IUpdateCompanyContactDetailRequest {
    billingDetails: {
        companyName: string;
        approvalAuthority: string;
        authorityPersonName: string;
        authorityPersonMobile: string;
        companyGST: string;
        employeeName: string;
        employeeDesignation: string;
        employeeMobile: string;
        companyAddress: string;
        pincode:string;
        state:string;
        city:string;
    },
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