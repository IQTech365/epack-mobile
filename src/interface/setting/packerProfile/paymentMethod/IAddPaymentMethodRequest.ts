export interface IAddPaymentMethodRequest {
    companyId: string;
    accountType: string;
    bankId: string;
    qrCode: string;
    accountHolderName: string;
    accountNumber: string;
    ifscCode:string;
    upiType:string;
    upiId:string;
}