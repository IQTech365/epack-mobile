interface IPickupAddress {
  shiftingFrom: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
  landmark?: string;
  floor: string;
  isLiftAvailable: string;
}

interface IDropAddress {
  shiftingTo: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
  landmark?: string;
  floor: string;
  isLiftAvailable: string;
}

interface IBillingInfo {
  companyName: string;
  approvalAuthority: string;
  authorityPersonName: string;
  authorityPersonMobile: string;
  companyAddress: string;
  companyGST: string;
  employeeName: string;
  employeeDesignation: string;
  employeeMobile: string;
}

export interface IAddEnquiryRequest {
  companyId: string;
  authId: string;
  enquiryManager: string;
  shiftingType: string;
  partyCompanyName: string;
  partyName: string;
  email: string;
  mobile: string;
  phone: string;
  shiftingLuggage: string[];
  enquirySource: string;
  gstNumber: string;
  alternateNumbers: string;
  shiftingDate: string;
  pickupAddress: IPickupAddress;
  dropAddress: IDropAddress;
  billingBy: string;
  billingDetails: IBillingInfo;
  status: string;
}
