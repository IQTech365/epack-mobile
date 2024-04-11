export interface ICompanyUpdatePayload {
    _id?: string;
    authId?: string;
    companyName?: string;
    contactPerson?: string;
    email?: string;
    companyMobile?: string;
    companyAddress?: string;
    state?: string;
    city?: string;
    pincode?: string;
    ibaApprovalCode?: string;
    ibaValidDate?: string;
    companyWebsite?: string;
    CINNumber?: string;
    companyLogo?: string;
    punchLine?: string;
    companyProfile?: string;
    district?: string;
    postOffice?: string;
    companySignature?: string;
}

export interface ICompanyEditRequest {
    companyId: string;
    payload:ICompanyUpdatePayload;
    
}

interface ICompaniesEditData {
    acknowledged: boolean,
    modifiedCount: number,
    upsertedId: null,
    upsertedCount: number,
    matchedCount: number
}

export interface ICompanyEditResponse {
    data: [ICompaniesEditData];
    status: number;
    error: boolean;
}
