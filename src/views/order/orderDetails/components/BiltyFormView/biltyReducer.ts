//** ALL ACTIONS*/

export enum BILTY_FORM_ACTION {
  BILTY_LR_CN_NO = 'BILTY_LR_CN_NO',
  CHOOSE_DESIGN = 'CHOOSE_DESIGN',
  DATE_OF_BILTY = 'DATE_OF_BILTY',
  CONSIGNER_NAME = 'CONSIGNER_NAME',
  CONSIGNER_GST = 'CONSIGNER_GST',
  CONSIGNER_MOBILE_NO = 'CONSIGNER_MOBILE_NO',
  CONSIGNER_ADDRESS = 'CONSIGNER_ADDRESS',
  CONSIGNER_PINCODE = 'CONSIGNER_PINCODE',
  CONSIGNER_STATE = 'CONSIGNER_STATE',
  CONSIGNER_CITY = 'CONSIGNER_CITY',
  LOADING_STATE = 'LOADING_STATE',
  LOADING_CITY = 'LOADING_CITY',
  UNLOADING_STATE = 'UNLOADING_STATE',
  UNLOADING_CITY = 'UNLOADING_CITY',
  CONSIGNEE_NAME = 'CONSIGNEE_NAME',
  CONSIGNEE_GST = 'CONSIGNEE_GST',
  CONSIGNEE_MOBILE_NO = 'CONSIGNEE_MOBILE_NO',
  CONSIGNEE_ADDRESS = 'CONSIGNEE_ADDRESS',
  CONSIGNEE_PINCODE = 'CONSIGNEE_PINCODE',
  CONSIGNEE_STATE = 'CONSIGNEE_STATE',
  CONSIGNEE_CITY = 'CONSIGNEE_CITY',
  INVOICE_NO = 'INVOICE_NO',
  VEHICLE_TYPE = 'VEHICLE_TYPE',
  VEHICLE_NO = 'VEHICLE_NO',
  FROM_LOCATION = 'FROM_LOCATION',
  TO_LOCATION = 'TO_LOCATION',
  DRIVER_NAME = 'DRIVER_NAME',
  DRIVER_MOBILE_NO = 'DRIVER_MOBILE_NO',
  DRIVER_LICENCE_NO = 'DRIVER_LICENCE_NO',
  SEAL_NO = 'SEAL_NO',
  IN_DATE = 'IN_DATE',
  OUT_DATE = 'OUT_DATE',
  E_WAY_BILL_NO = 'E_WAY_BILL_NO',
  GENERATED_ON = 'GENERATED_ON',
  EXPIRY_DATE = 'EXPIRY_DATE',
  MATERIAL_NAME = 'MATERIAL_NAME',
  NO_OF_ARTICLES = 'NO_OF_ARTICLES',
  PACKING_TYPE = 'PACKING_TYPE',
  HSN_CODE = 'HSN_CODE',
  BILL_INVOICE_NO = 'BILL_INVOICE_NO',
  NET_WEIGHT = 'NET_WEIGHT',
  UNITONE = 'UNITONE',
  VALUE_OF_GOODS = 'VALUE_OF_GOODS',
  RISK_TYPE = 'RISK_TYPE',
  FREIGHT_DETAILS = 'FREIGHT_DETAILS',
  ACTUAL_WEIGHT = 'ACTUAL_WEIGHT',
  APPLICABLE_WEIGHT = 'APPLICABLE_WEIGHT',
  UNITTWO = 'UNITTWO',
  RATE = 'RATE',
  FREIGHT_CHARGES = 'FREIGHT_CHARGES',
  PICKUP_CHARGES = 'PICKUP_CHARGES',
  PICKUP_CHARGES_AMOUNT = 'PICKUP_CHARGES_AMOUNT',
  DOOR_DELIVERY_CHARGES = 'DOOR_DELIVERY_CHARGES',
  DOOR_DELIVERY_CHARGES_AMOUNT = 'DOOR_DELIVERY_CHARGES_AMOUNT',
  PACKING_CHARGES = 'PACKING_CHARGES',
  PACKING_MATERIAL_CHARGES = 'PACKING_MATERIAL_CHARGES',
  PACKING_MATERIAL_CHARGES_AMOUNT = 'PACKING_MATERIAL_CHARGES_AMOUNT',
  PACKING_CHARGES_AMOUNT = 'PACKING_CHARGES_AMOUNT',
  UNPACKING_CHARGES = 'UNPACKING_CHARGES',
  UNPACKING_CHARGES_AMOUNT = 'UNPACKING_CHARGES_AMOUNT',
  LOADING_CHARGES = 'LOADING_CHARGES',
  LOADING_CHARGES_AMOUNT = 'LOADING_CHARGES_AMOUNT',
  UNLOADING_CHARGES = 'UNLOADING_CHARGES',
  UNLOADING_CHARGES_AMOUNT = 'UNLOADING_CHARGES_AMOUNT',
  TOTAL_AMOUNT = 'TOTAL_AMOUNT',
  ADVANCE_AMOUNT = 'ADVANCE_AMOUNT',
  BALANCE_AMOUNT = 'BALANCE_AMOUNT',
  INSURANCE_DETAILS = 'INSURANCE_DETAILS',
  INSURANCE_COMPANY = 'INSURANCE_COMPANY',
  POLICY_NO = 'POLICY_NO',
  INSURANCE_DATE = 'INSURANCE_DATE',
  INSURANCE_AMOUNT = 'INSURANCE_AMOUNT',
  DEMURRAGE_CHARGES = 'DEMURRAGE_CHARGES',
  CHARGE_DATE = 'CHARGE_DATE',
  CHARGE_APPLICABLE_AFTER = 'CHARGE_APPLICABLE_AFTER',
  REMARK = 'REMARK',
}

/** BILTY FORM STATE */

interface IBiltyFormState {
  biltyLrCnNo: string;
  chooseDesigns: string;
  dateofBiltyLrCnNo: string;
  consignerName: string;
  consignerGst: string;
  consignerMobileNo: string;
  consignerAddress: string;
  consignerPincode: string;
  consignerState: string;
  consignerCity: string;
  loadingState: string;
  loadingCity: string;
  unloadingState: string;
  unloadingCity: string;
  consigneeName: string;
  consigneeGst: string;
  consigneeMobileNo: string;
  consigneeAddress: string;
  consigneePincode: string;
  consigneeState: string;
  consigneeCity: string;
  invoiceNo: string;
  vehicleType: string;
  vehicleNo: string;
  fromLocation: string;
  toLocation: string;
  driverName: string;
  driverMobileNo: string;
  driverLicenceNo: string;
  sealNo: string;
  inDate: string;
  outDate: string;
  eWayBillNo: string;
  generatedOn: string;
  expiryDate: string;
  materialName: string;
  noOfArticles: string;
  packingType: string;
  hsnCode: string;
  billInvoiceNo: string;
  netWeight: string;
  unitOne: string;
  valueOfGoods: string;
  riskType: string;
  freightDetails: string;
  actualWeight: string;
  applicableWeight: string;
  unitTwo: string;
  rate: string;
  freightCharges: string;
  pickupCharges: string;
  pickupChargesAmount: string;
  doorDeliveryCharges: string;
  doorDeliveryChargesAmount: string;
  packingCharges: string;
  packingChargesAmount: string;
  packingMaterialCharges: string;
  packingMaterialChargesAmount: string;
  unPackingCharges: string;
  unPackingChargesAmount: string;
  loadingCharges: string;
  loadingChargesAmount: string;
  unLoadingCharges: string;
  unLoadingChargesAmount: string;
  totalAmount: string;
  advanceAmount: string;
  balanceAmount: string;
  insuranceDetails: string;
  insuranceCompany: string;
  policyNumber: string;
  insuranceDate: string;
  insuranceAmount: string;
  demurrageCharge: string;
  chargeDate: string;
  chargeapplicableAfter: string;
  remark: string;
}

/** ACTION INTERFACE */

interface IBiltyFormAction {
  type: BILTY_FORM_ACTION;
  payload: string;
}

/** INITIAL STATE */

export const initialState: IBiltyFormState = {
  biltyLrCnNo: '',
  chooseDesigns: '',
  dateofBiltyLrCnNo: '',
  consignerName: '',
  consignerGst: '',
  consignerMobileNo: '',
  consignerAddress: '',
  consignerPincode: '',
  consignerState: '',
  consignerCity: '',
  loadingState: '',
  loadingCity: '',
  unloadingState: '',
  unloadingCity: '',
  consigneeName: '',
  consigneeGst: '',
  consigneeMobileNo: '',
  consigneeAddress: '',
  consigneePincode: '',
  consigneeState: '',
  consigneeCity: '',
  invoiceNo: '',
  vehicleType: '',
  vehicleNo: '',
  fromLocation: '',
  toLocation: '',
  driverName: '',
  driverMobileNo: '',
  driverLicenceNo: '',
  sealNo: '',
  inDate: '',
  outDate: '',
  eWayBillNo: '',
  generatedOn: '',
  expiryDate: '',
  materialName: '',
  noOfArticles: '',
  packingType: '',
  hsnCode: '',
  billInvoiceNo: '',
  netWeight: '',
  unitOne: '',
  valueOfGoods: '',
  riskType: '',
  freightDetails: '',
  actualWeight: '',
  applicableWeight: '',
  unitTwo: '',
  rate: '',
  freightCharges: '',
  pickupCharges: '',
  pickupChargesAmount: '',
  doorDeliveryCharges: '',
  doorDeliveryChargesAmount: '',
  packingCharges: '',
  packingChargesAmount: '',
  packingMaterialCharges: '',
  packingMaterialChargesAmount: '',
  unPackingCharges: '',
  unPackingChargesAmount: '',
  loadingCharges: '',
  loadingChargesAmount: '',
  unLoadingCharges: '',
  unLoadingChargesAmount: '',
  totalAmount: '',
  advanceAmount: '',
  balanceAmount: '',
  insuranceDetails: '',
  insuranceCompany: '',
  policyNumber: '',
  insuranceDate: '',
  insuranceAmount: '',
  demurrageCharge: '',
  chargeDate: '',
  chargeapplicableAfter: '',
  remark: '',
};

/** BILTY Reducer */

export const biltyReducer = (
  state: IBiltyFormState,
  action: IBiltyFormAction,
) => {
  const { type, payload } = action;
  switch (type) {
    case BILTY_FORM_ACTION.BILTY_LR_CN_NO:
      return { ...state, biltyLrCnNo: payload };
    case BILTY_FORM_ACTION.CHOOSE_DESIGN:
      return { ...state, chooseDesign: payload };
    case BILTY_FORM_ACTION.DATE_OF_BILTY:
      return { ...state, dateofBiltyLrCnNo: payload };
    case BILTY_FORM_ACTION.CONSIGNER_NAME:
      return { ...state, consignerName: payload };
    case BILTY_FORM_ACTION.CONSIGNER_GST:
      return { ...state, consignerGst: payload };
    case BILTY_FORM_ACTION.CONSIGNER_MOBILE_NO:
      return { ...state, consignerMobileNo: payload };
    case BILTY_FORM_ACTION.CONSIGNER_ADDRESS:
      return { ...state, consignerAddress: payload };
    case BILTY_FORM_ACTION.CONSIGNER_PINCODE:
      return { ...state, consignerPincode: payload };
    case BILTY_FORM_ACTION.CONSIGNER_STATE:
      return { ...state, consignerState: payload };
    case BILTY_FORM_ACTION.CONSIGNER_CITY:
      return { ...state, consignerCity: payload };
    case BILTY_FORM_ACTION.LOADING_STATE:
      return { ...state, loadingState: payload };
    case BILTY_FORM_ACTION.LOADING_CITY:
      return { ...state, loadingCity: payload };
    case BILTY_FORM_ACTION.CONSIGNEE_NAME:
      return { ...state, consigneeName: payload };
    case BILTY_FORM_ACTION.CONSIGNEE_GST:
      return { ...state, consigneeGst: payload };
    case BILTY_FORM_ACTION.CONSIGNEE_MOBILE_NO:
      return { ...state, consigneeMobileNo: payload };
    case BILTY_FORM_ACTION.CONSIGNEE_ADDRESS:
      return { ...state, consigneeAddress: payload };
    case BILTY_FORM_ACTION.CONSIGNEE_PINCODE:
      return { ...state, consigneePincode: payload };
    case BILTY_FORM_ACTION.CONSIGNEE_STATE:
      return { ...state, consigneeState: payload };
    case BILTY_FORM_ACTION.CONSIGNEE_CITY:
      return { ...state, consigneeCity: payload };
    case BILTY_FORM_ACTION.UNLOADING_STATE:
      return { ...state, unloadingState: payload };
    case BILTY_FORM_ACTION.UNLOADING_CITY:
      return { ...state, unloadingCity: payload };
    case BILTY_FORM_ACTION.INVOICE_NO:
      return { ...state, invoiceNo: payload };
    case BILTY_FORM_ACTION.VEHICLE_TYPE:
      return { ...state, vehicleType: payload };
    case BILTY_FORM_ACTION.VEHICLE_NO:
      return { ...state, vehicleNo: payload };
    case BILTY_FORM_ACTION.FROM_LOCATION:
      return { ...state, fromLocation: payload };
    case BILTY_FORM_ACTION.TO_LOCATION:
      return { ...state, toLocation: payload };
    case BILTY_FORM_ACTION.DRIVER_NAME:
      return { ...state, driverName: payload };
    case BILTY_FORM_ACTION.DRIVER_MOBILE_NO:
      return { ...state, driverMobileNo: payload };
    case BILTY_FORM_ACTION.DRIVER_LICENCE_NO:
      return { ...state, driverLicenceNo: payload };
    case BILTY_FORM_ACTION.SEAL_NO:
      return { ...state, sealNo: payload };
    case BILTY_FORM_ACTION.IN_DATE:
      return { ...state, inDate: payload };
    case BILTY_FORM_ACTION.OUT_DATE:
      return { ...state, outDate: payload };
    case BILTY_FORM_ACTION.E_WAY_BILL_NO:
      return { ...state, eWayBillNo: payload };
    case BILTY_FORM_ACTION.GENERATED_ON:
      return { ...state, generatedOn: payload };
    case BILTY_FORM_ACTION.EXPIRY_DATE:
      return { ...state, expiryDate: payload };
    case BILTY_FORM_ACTION.MATERIAL_NAME:
      return { ...state, materialName: payload };
    case BILTY_FORM_ACTION.NO_OF_ARTICLES:
      return { ...state, noOfArticles: payload };
    case BILTY_FORM_ACTION.PACKING_TYPE:
      return { ...state, packingType: payload };
    case BILTY_FORM_ACTION.HSN_CODE:
      return { ...state, hsnCode: payload };
    case BILTY_FORM_ACTION.BILL_INVOICE_NO:
      return { ...state, billInvoiceNo: payload };
    case BILTY_FORM_ACTION.NET_WEIGHT:
      return { ...state, netWeight: payload };
    case BILTY_FORM_ACTION.UNITONE:
      return { ...state, unitOne: payload };
    case BILTY_FORM_ACTION.VALUE_OF_GOODS:
      return { ...state, valueOfGoods: payload };
    case BILTY_FORM_ACTION.RISK_TYPE:
      return { ...state, riskType: payload };
    case BILTY_FORM_ACTION.FREIGHT_DETAILS:
      return { ...state, freightDetails: payload };
    case BILTY_FORM_ACTION.ACTUAL_WEIGHT:
      return { ...state, actualWeight: payload };
    case BILTY_FORM_ACTION.APPLICABLE_WEIGHT:
      return { ...state, applicableWeight: payload };
    case BILTY_FORM_ACTION.UNITTWO:
      return { ...state, unitTwo: payload };
    case BILTY_FORM_ACTION.RATE:
      return { ...state, rate: payload };
    case BILTY_FORM_ACTION.FREIGHT_CHARGES:
      return { ...state, freightCharges: payload };
    case BILTY_FORM_ACTION.PICKUP_CHARGES:
      return { ...state, pickupCharges: payload };
    case BILTY_FORM_ACTION.PICKUP_CHARGES_AMOUNT:
      return { ...state, pickupChargesAmount: payload };
    case BILTY_FORM_ACTION.DOOR_DELIVERY_CHARGES:
      return { ...state, doorDeliveryCharges: payload };
    case BILTY_FORM_ACTION.DOOR_DELIVERY_CHARGES_AMOUNT:
      return { ...state, doorDeliveryChargesAmount: payload };
    case BILTY_FORM_ACTION.PACKING_CHARGES:
      return { ...state, packingCharges: payload };
    case BILTY_FORM_ACTION.PACKING_CHARGES_AMOUNT:
      return { ...state, packingChargesAmount: payload };
    case BILTY_FORM_ACTION.PACKING_MATERIAL_CHARGES:
      return { ...state, packingMaterialCharges: payload };
    case BILTY_FORM_ACTION.PACKING_MATERIAL_CHARGES_AMOUNT:
      return { ...state, packingMaterialChargesAmount: payload };
    case BILTY_FORM_ACTION.UNPACKING_CHARGES:
      return { ...state, unPackingCharges: payload };
    case BILTY_FORM_ACTION.UNPACKING_CHARGES_AMOUNT:
      return { ...state, unPackingChargesAmount: payload };
    case BILTY_FORM_ACTION.LOADING_CHARGES:
      return { ...state, loadingCharges: payload };
    case BILTY_FORM_ACTION.LOADING_CHARGES_AMOUNT:
      return { ...state, loadingChargesAmount: payload };
    case BILTY_FORM_ACTION.UNLOADING_CHARGES:
      return { ...state, unLoadingCharges: payload };
    case BILTY_FORM_ACTION.UNLOADING_CHARGES_AMOUNT:
      return { ...state, unLoadingChargesAmount: payload };
    case BILTY_FORM_ACTION.TOTAL_AMOUNT:
      return { ...state, totalAmount: payload };
    case BILTY_FORM_ACTION.ADVANCE_AMOUNT:
      return { ...state, advanceAmount: payload };
    case BILTY_FORM_ACTION.BALANCE_AMOUNT:
      return { ...state, balanceAmount: payload };
    case BILTY_FORM_ACTION.BALANCE_AMOUNT:
      return { ...state, balanceAmount: payload };
    case BILTY_FORM_ACTION.INSURANCE_DETAILS:
      return { ...state, insuranceDetails: payload };
    case BILTY_FORM_ACTION.INSURANCE_COMPANY:
      return { ...state, insuranceCompany: payload };
    case BILTY_FORM_ACTION.POLICY_NO:
      return { ...state, policyNo: payload };
    case BILTY_FORM_ACTION.INSURANCE_DATE:
      return { ...state, insuranceDate: payload };
    case BILTY_FORM_ACTION.INSURANCE_AMOUNT:
      return { ...state, insuranceAmount: payload };
    case BILTY_FORM_ACTION.DEMURRAGE_CHARGES:
      return { ...state, demurrageCharge: payload };
    case BILTY_FORM_ACTION.CHARGE_DATE:
      return { ...state, chargeDate: payload };
    case BILTY_FORM_ACTION.CHARGE_APPLICABLE_AFTER:
      return { ...state, chargeapplicableAfter: payload };
    case BILTY_FORM_ACTION.REMARK:
      return { ...state, remark: payload };
  }
};
