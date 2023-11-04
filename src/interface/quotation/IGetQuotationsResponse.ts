interface IPickupAddress {
  shiftingFrom: string;
  state: string;
  city: string;
  pincode: string;
  locality: string;
  landmark: string;
  floor: string;
  isLiftAvailable: string;
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
  templateId: string;
  quotationData: string;
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
