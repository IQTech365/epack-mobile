export interface BillingDetails {
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

export interface PickupAddress {
    shiftingFrom: string;
    state: string;
    city: string;
    address: string;
    pincode: string;
    locality: string;
    landmark: string;
    floor: string;
    isLiftAvailable: string;
}

export interface DropAddress {
    shiftingTo: string;
    state: string;
    city: string;
    address: string;
    pincode: string;
    locality: string;
    landmark: string;
    floor: string;
    isLiftAvailable: string;
}
export interface IAddOrderRequest {
  companyId: string;
  authId: string;
  enquiryManager: string;
  shiftingType: string;
  partyCompanyName: string;
  partyName: string;
  email: string;
  mobile: string;
  phone: string;
  orderAmount: string;
  tokenAmount: string;
  shiftingLuggage: [string];
  enquirySource: string;
  gstNumber: string;
  alternateNumbers: string;
  shiftingDate: string;
  pickupAddress: PickupAddress;
  dropAddress: DropAddress;
  billingBy: string;
  billingDetails: BillingDetails | null;
  status: string;
}
