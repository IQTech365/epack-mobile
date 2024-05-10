import { ICustomerBillingInfo } from "../common/common";

export interface IPickupAddress {
  shiftingFrom: string;
  state: string;
  city: string;
  pincode: string;
  address:string;
  locality: string;
  landmark: string;
  floor: string;
  isLiftAvailable: string;
}

export interface IDropAddress {
  shiftingTo: string;
  state: string;
  city: string;
  locality: string;
  address:string;
  pincode: string;
  landmark: string;
  floor: string;
  isLiftAvailable: string;
}

export interface IEnquiry {
  _id: string;
  authId: string;
  companyId: string;
  enquiryManager: string;
  shiftingType: string;
  vehicleType: string;
  manufacture: string;
  model: string;
  partyCompanyName: string;
  partyName: string;
  email: string;
  mobile: string;
  shiftingLuggage: [];
  shiftingDate: string;
  enquirySource: string;
  gstNumber: string;
  landline: string;
  pickupAddress: IPickupAddress;
  dropAddress: IDropAddress;
  alternateNumbers: string[];
  billingBy: string;
  billingDetails: ICustomerBillingInfo | null;
  orderAmount: string;
  tokenAmount: string;
  deliveryDate: string | null;
  deliveredDate: string | null;
  status: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
}

export interface IGetQuotationData {
  _id: string;
  companyId: string;
  enquiryId: string;
  shiftingLuggage: string;
  lorryType: string;
  vehicleType: string;
  manufacture: string;
  model: string;
  templateId: string;
  quotationDate: string;
  quotationNumber: string;
  quotationAmount: string;
  advanceAmount: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  enquiries: IEnquiry[];
}

export interface IGetQuotationsResponse {
  data: IGetQuotationData[];
  status: number;
  error: boolean;
}
