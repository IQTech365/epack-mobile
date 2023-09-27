interface IGovtRegdDetail {
    companyType: string;
    companyPAN: string;
    companyGST: string;
    incorporationNumber: string;
    IBAStatus: string;
    IBAcode: string;
    IBAExpiry: string;
    udyamRegdNumber: string;
    shopActNumber: string;
    ISONumber: string;
}

interface IAccountDetail {
    bankName: string;
    accountNumber: string;
    bankIFSC: string;
    accountHolderName: string;
    UPI: string;
}

export interface ICompanyRegistrationRequest {
    authId: string;
    companyName: string;
    contactPerson: string;
    email: string;
    companyMobile: string;
    companyAddress: string;
    state: string;
    city: string;
    pincode: string;
    ibaApprovalCode: string;
    ibaValidDate: string;
    companyWebite?: string;
    CINNumber: string;
    companyLogo: string;
    punchLine?: string;
    companyProfile: string;
    district: string;
    postOffice: string;
    govRegdDetails?: IGovtRegdDetail | {},
    accountDetails?: IAccountDetail[] | [],
    packerSignature: string;
    termsconditions: string;
}