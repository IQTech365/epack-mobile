export interface IInvoice {
  _id: string;
  enquiryId: string;
  serialNo: string;
  shiftingLuggage: string;
  templateId: string;
  invoiceData: string;
  vehicleNo: string;
  consignmentNo: string;
  movingMode: string;
  deliveryDate: string;
  vehicleType: string;
  manufacture: string;
  model: string;
  partyName: string;
  mobile: string;
  billingBy: string;
  billingDetails: string;
  pickupAddress: {
    shiftingFrom: string;
    state: string;
    city: string;
    address: string;
    pincode: string;
    landmark: string;
    locality: string;
    floor: string;
    isLiftAvailable: string;
  };
  openBody: string;
  closeBody: string;
  seperate: string;
  sharing: string;
  isPartLoad: string;
  isFullLoad: string;
  freightCharges: string;
  freightHSNCode: string;
  pickupChargesStatus: string;
  pickupChargesAmount: string;
  pickupHSNCode: string;
  doorDeliveryStatus: string;
  doorDeliveryAmount: string;
  doorDeliveryHSNCode: string;
  packagingChargesStatus: string;
  packagingChargesAmount: string;
  packagingHSNCode: string;
  packingMaterialChargesStatus: string;
  packingMaterialChargesAmount: string;
  packingMaterialHSNCode: string;
  loadingChargesStatus: string;
  loadingChargesAmount: string;
  loadingHSNCode: string;
  unLoadingChargesStatus: string;
  unLoadingChargesAmount: string;
  unLoadingHSNCode: string;
  unPackagingChargesStatus: string;
  unPackagingChargesAmount: string;
  unPackagingHSNCode: string;
  biltyDate: string;
  biltyNo: string;
  otherCharges: [];
  surchargeCharges: string;
  discountType: string;
  discountAmount: string;
  gstStatus: string;
  gstType: string;
  gstPercentage: string;
  gstPaidBy: string;
  transitInsurance: {
    isRequired: string;
    transitType: string;
    charges: [];
  };
  storageCharges: {
    isRequired: string;
    storageChargesType: string;
    fromDate: string;
    toDate: string;
    amount: string;
  };
  __v: number;
}

export interface IGetInvoiceListResponse {
  data: IInvoice[];
  status: number;
  error: boolean;
}
