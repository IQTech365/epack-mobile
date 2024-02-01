interface IPickupAddress {
    shiftingFrom: string;
    state: string;
    city: string;
    pincode: string;
    locality: string;
    landmark: string;
    floor: string;
    isLiftAvailable: string;
    address: string;
}

interface IDropAddress {
    shiftingTo: string;
    state: string;
    city: string;
    locality: string;
    pincode: string;
    landmark: string;
    floor: string;
    isLiftAvailable: string;
    address: string;
}

export interface IBillingInfo {
    companyName: string;
    approvalAuthority: string;
    authorityPersonName: string;
    authorityPersonMobile: string;
    companyAddress: string;
    companyGST: string;
    employeeName: string;
    employeeDesignation: string;
    employeeMobile: string;
    state:string;
    city:string;
    pincode:string;
  }

export interface ISingleEnquiryData {
  billingDetails: IBillingInfo | null;
  _id: string;
  authId: string;
  companyId: string;
  enquiryManager: '';
  shiftingType: string;
  vehicleType: string;
  manufacture: string;
  model: string;
  partyCompanyName: string;
  partyName: string;
  email: string;
  mobile: string;
  shiftingLuggage: string[];
  shiftingDate: string;
  enquirySource: string;
  gstNumber: string;
  landline: string;
  pickupAddress: IPickupAddress;
  dropAddress: IDropAddress;
  alternateNumbers: string[];
  billingBy: string;
  orderAmount: string;
  tokenAmount: string;
  deliveryDate: string;
  deliveredDate: string;
  status: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  enquiryDate: string;
}

export interface ISingleEnquiryResponse {
    data: ISingleEnquiryData[];
    status: number;
    error: boolean;
}
