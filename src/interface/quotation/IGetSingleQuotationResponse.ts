interface ITransitInsurance {
    
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
}

export interface IGetSingleQuotationResponse {
  data: ISingleQuotationData;
  status: number;
  error: boolean;
}
