interface ICompanyInfoData {
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
  ibaApprovalCode: string;
  ibaValidDate: string;
  companyWebite: string;
  CINNumber: string;
  companyLogo: string;
  punchLine: string;
  companyProfile: string;
  district: string;
  postOffice: string;
  accountDetais: [];
  isActive: boolean;
  isDeleted: boolean;
  created: string;
  companySignature: string;
}

export interface ICompanyRegistrationResponse {
  data: ICompanyInfoData;
  status: number;
  error: boolean;
}
