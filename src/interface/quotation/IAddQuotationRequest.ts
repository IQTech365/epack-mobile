// import { TOtherCharge } from "../../views/quotation/addQuotation/quotationReducer";

export interface ITransitInsurance {
  isRequired: string;
  transitType: string;
  charges: [
    {
      luggageType: string;
      insurancePerc: string;
      gst: string;
      value: string;
    },
  ];
}

export interface IStorageCharges {
  isRequired: string;
  storageChargesType: string;
  fromDate: string;
  toDate: string;
  amount: string;
}

export interface IOtherCharge {
  ratePerItem: string;
  amount: string;
}

export interface IOtherCharges {
  jobType: string;
  qty: string;
  partLoad: IOtherCharge | null;
  fullLoad: IOtherCharge | null;
}
export interface IAddQuotationRequest {
  companyId: string;
  enquiryId?:string;
  authId: string;
  shiftingType: string;
  shiftingLuggage: string;
  vehicleType: string;
  manufacture: string;
  model: string;
  templateId: string;
  quotationDate: string;
  quotationNumber: string;
  enquirySource: string;
  partyCompanyName: string;
  partyName: string;
  email: string;
  mobile: string;
  shiftingDate: string;
  pickupAddress: {
    shiftingFrom: string;
    state: string;
    city: string;
    pincode: string;
    locality: string;
    landmark: string;
    floor: string;
    isLiftAvailable: string;
  };
  dropAddress: {
    shiftingTo: string;
    state: string;
    city: string;
    pincode: string;
    locality: string;
    landmark: string;
    floor: string;
    isLiftAvailable: string;
  };

  partLoad: boolean;
  fullLoad: boolean;
  openBody: boolean;
  closeBody: boolean;
  lorryType: string;
  freightChargesStatus: string;
  partLoadCharge: string;
  fullLoadCharge: string;
  packagingChargesStatus: string;
  packagingPartLoadCharges: string;
  packagingFullLoadCharges: string;
  unPackagingChargesStatus: string;
  unPackagingPartLoadCharges: string;
  unPackagingFullLoadCharges: string;
  unLoadingChargesStatus: string;
  unLoadingPartLoadCharges: string;
  unLoadingFullLoadCharges: string;
  packingMaterialChargesStatus: string;
  packingMaterialPartLoadCharges: string;
  packingMaterialFullLoadCharges: string;
  loadingChargesStatus: string;
  loadingPartLoadCharges: string;
  loadingFullLoadCharges: string;
  gstStatus: string;
  gstType: string;
  gstPercentage: string;
  surchargeIsRequired: string;
  surchargeCharges: string;
  discountType: string;
  discountAmount: string;
  transitInsurance: ITransitInsurance | null;
  storageCharges: IStorageCharges | null;
  otherCharges: IOtherCharges[] | null;
  quotationAmount: string;
  advanceAmount: string;
  billingBy: string;
  billingDetails: {
    companyName: string;
    approvalAuthority: string;
    authorityPersonName: string;
    authorityPersonMobile: string;
    companyAddress: string;
    companyGST: string;
    employeeName: string;
    employeeDesignation: string;
    employeeMobile: string;
  } | {};
  otherDetail1: string;
  otherDetail2: string;
  easy_access_for_loading_unloading: string;
  any_restrcition_for_loading_unloading: string;
  addedBy: string;
}
