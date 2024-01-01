export interface IGovtRegDetails {
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

export interface ICompanyInfoData {
  _id: string;
  authId: string;
  companyName: string;
  contactPerson: string;
  email: string;
  companyMobile: string;
  companyAddress: string;
  state: string;
  city: string;
  pincode: string;
  companyWebite: string;
  companyLogo: string;
  punchLine: string;
  companyProfile: string;
  district: string;
  postOffice: string;
  govRegdDetails: IGovtRegDetails;
  accountDetais: [];
  referralCode: string;
  isActive: boolean;
  isDeleted: boolean;
  created: string;
  companySignature: string;
}

export interface IGetCompaniesResponse {
  data: ICompanyInfoData[];
  status: number;
  error: boolean;
}
