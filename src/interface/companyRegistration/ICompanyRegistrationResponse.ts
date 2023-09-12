interface ICompanyInfoData {};

export interface ICompanyRegistrationResponse {
    data: ICompanyInfoData;
    status: number;
    error: boolean;
}