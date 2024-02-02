export interface IInvoiceBillingInfo {
  companyName: string;
  approvalAuthority: string;
  authorityPersonName: string;
  authorityPersonMobile: string;
  companyAddress: string;
  companyGST: string;
  employeeName: string;
  employeeDesignation: string;
  employeeMobile: string;
  state: string;
  city: string;
  pincode: string;
}

export interface IInvoicePickupAddress {
  shiftingFrom: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
  landmark: string;
  locality: string;
  floor: string;
  isLiftAvailable: string;
}

export interface IInvoiceOtherCharge {
  item: string;
  HSNCode: string;
  qty: string;
  rate: string;
  amount: string;
}

export interface IInvoiceTransitInsuranceCharge {
  luggageType: string;
  insurancePerc: string;
  gst: string;
  value: string;
}

export interface IInvoiceTransitInsurance {
  isRequired: string;
  transitType: string;
  charges: IInvoiceTransitInsuranceCharge[];
}

export interface IInvoiceStorageCharge {
  isRequired: string;
  storageChargesType: string;
  fromDate: string;
  toDate: string;
  amount: string;
}

export interface ICreateInvoiceRequest {
  enquiryId: string;
  isAuto: boolean;
  isHeadOffice: boolean;
  branchId?: string;
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
  billingDetails: IInvoiceBillingInfo | string;
  pickupAddress: IInvoicePickupAddress;
  openBody: boolean;
  closeBody: boolean;
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

  otherCharges: IInvoiceOtherCharge[];
  surchargeCharges: string;
  discountType: string;
  discountAmount: string;
  gstStatus: string;
  gstType: string;
  gstPercentage: string;
  gstPaidBy: string;
  transitInsurance: IInvoiceTransitInsurance;
  storageCharges: IInvoiceStorageCharge;
}
