import { IEnquiry } from "./IGetQuotationsResponse";

export interface ICharge {
  luggageType: string;
  insurancePerc: string;
  gst: string;
  value: string;
}
export interface ITransitInsurance {
  isRequired: string;
  transitType: string;
  charges: ICharge[];
}

export interface IStorage {
  isRequired: string;
  storageChargesType: string;
  amount: string;
  fromDate:string;
  toDate:string;
}

export interface ILoad {
  ratePerItem: string;
  amount: string;
}
export interface IOtherCharge {
  jobType: string;
  qty: string;
  partLoad: ILoad;
  fullLoad: ILoad;
}
export interface IQuotationFreight {
  _id: string;
  quotationId: string;
  isPartLoad: string;
  isFullLoad: string;
  openBody: string;
  closeBody: string;
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
  transitInsurance: ITransitInsurance;
  storageCharges: IStorage;
  otherCharges: IOtherCharge[];
  otherDetail1: string;
  otherDetail2: string;
  easy_access_for_loading_unloading: string;
  any_restrcition_for_loading_unloading: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
}
export interface ISingleQuotationData {
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
  quotationfreights: IQuotationFreight;
  enquiries: IEnquiry;
}

export interface IGetSingleQuotationResponse {
  data: ISingleQuotationData;
  status: number;
  error: boolean;
}
