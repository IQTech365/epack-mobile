//** ALL ACTIONS */
export enum INVOICE_FORM_ACTION {
  INVOICE_NO = 'INVOICE_NO',
  CHOOSE_TEMPLETE = 'CHOOSE_TEMPLETE',
  DATE_INVOICE = 'DATE_INVOICE',
  TRUK_NO = 'TRUK_NO',
  CONSIGNMNET_NO = 'CONSIGNMNET_NO',
  SHIFTING_LUGGAGE = 'SHIFTING_LUGGAGE',
  BILLING_CONSIGNER_NAME = 'BILLING_CONSIGNER_NAME',
  BILLING_CONSIGNER_GST = 'BILLING_CONSIGNER_GST',
  BILLING_CONSIGNER_MOBILE_NO = 'BILLING_CONSIGNER_MOBILE_NO',
  BILLING_ADDRESS = 'BILLING_ADDRESS',
  BILLING_LANDNMARK = 'BILLING_LANDNMARK',
  BILLING_PINCODE = 'BILLING_PINCODE',
  BILLING_STATE = 'BILLING_STATE',
  BILLING_CITY = 'BILLING_CITY',
  BILLING_LOADING_ADDRESS = 'BILLING_LOADING_ADDRESS',
  VEHICLE_INVOICE_NO = 'VEHICLE_INVOICE_NO',
  VEHICLE_TYPE = 'VEHICLE_TYPE',
  VEHICLE_NO = 'VEHICLE_NO',
  VEHICLE_FROM_LOCATION = 'VEHICLE_FROM_LOCATION',
  VEHICLE_TO_LOCATION = 'VEHICLE_TO_LOCATION',
  VEHICLE_DRIVER_NAME = 'VEHICLE_DRIVER_NAME',
  VEHICLE_MOBILE_NO = 'VEHICLE_MOBILE_NO',
  VEHICLE_DRIVER_LICENCE_NO = 'VEHICLE_DRIVER_LICENCE_NO',
  VEHICLE_SEAL_NO = 'VEHICLE_SEAL_NO',
  VEHICLE_IN_DATE = 'VEHICLE_IN_DATE',
  VEHICLE_OUT_DATE = 'VEHICLE_OUT_DATE',
  MATERIAL_NAME = 'MATERIAL_NAME',
  MATERIAL_NO_ARTICLES = 'MATERIAL_NO_ARTICLES',
  MATERIAL_PACKING_TYPE = 'MATERIAL_PACKING_TYPE',
  MATERIAL_HSN_CODE = 'MATERIAL_HSN_CODE',
  MATERIAL_BILL_INVOICE_NO = 'MATERIAL_BILL_INVOICE_NO',
  MATERIAL_NET_WEIGHT = 'MATERIAL_NET_WEIGHT',
  MATERIAL_UNITS = 'MATERIAL_UNITS',
  MATERIAL_VALUE_GOODS = 'MATERIAL_VALUE_GOODS',
  MATERIAL_RISK_TYPE = 'MATERIAL_RISK_TYPE',
  FREIGHT_DETAIL = 'FREIGHT_DETAIL',
  FIXED_FREIGHT = 'FIXED_FREIGHT',
  ACTUAL_WEIGHT = 'ACTUAL_WEIGHT',
  APPLICATION_WEIGHT = 'APPLICATION_WEIGHT',
  UINTS = 'UNITS',
  RATE = 'RATE',
  FREIGHT_ChARGES = 'FREIGHT_ChARGES',
  PICKUP_CHARGES = 'PICKUP_CHARGES',
  PICKUP_AMOUNT = 'AMOUNT',
  DOOR_DELIVERY_CHARGES = 'DOOR_DELIVERY_CHARGES',
  DOOR_DELIVERY_AMOUNT = 'DOOR_DELIVERY_AMOUNT',
  PACKING_CHARGES = 'PACKING_CHARGES',
  PACKING_AMOUNT = 'PACKING_AMOUNT',
  PACKING_MATERIAL_CHARGES = 'PACKING_MATERIAL_CHARGES',
  PACKING_MATERAIL_AMOUNT = 'PACKING_MATERAIL_AMOUNT',
  UNPACKING_CHARGES = 'UNPACKING_CHARGES',
  UNPACKING_AMOUNT = 'UNPACKING_AMOUNT',
  LOADING_CHARGES = 'LOADING_CHARGES',
  LOADING_AMOUNT = 'LOADING_AMOUNT',
  UNLOADING_CHARGES = 'UNLOADING_CHARGES',
  UNLOADING_AMOUNT = 'UNLOADING_AMOUNT',
  ADVANCE_AMOUNT = 'BALANCE_AMOUNT',
  BLANCE_AMOUNT = 'BLANCE_AMOUNT',
  REMARK = 'REMARK',
}

/** Invoice FORM STATE */
interface InvoiceFormState {
  invoiceNo: string;
  chooseTemplete: string;
  dateInvoice: string;
  trukNo: string;
  consignmnetNo: string;
  shifting_luggage: String;
  billingConsignerName: string;
  billingConsignerGst: string;
  billingConsignerMobileNo: string;
  billingAddress: string;
  billingLandmark: string;
  billingPincode: string;
  billingState: string;
  billingCity: string;
  billingLoadingAddress: boolean;
  vehicleInvoiceNo: string;
  vehicleType: string;
  vehicleNo: string;
  vehicleFromLocation: string;
  vehicleToLocation: string;
  vehicleDriverName: string;
  vehicleMobileNo: string;
  vehicleDriverLicenceNo: string;
  vehicleSealNo: string;
  vehicleInDate: string;
  vehicleOutDate: string;
  materialName: string;
  materialNoArticles: string;
  materialPackingtype: string;
  materialHSNCode: string;
  materialBillInvoiceNo: string;
  materialNetWeight: string;
  materialUnits: string;
  materialValueGoods: string;
  materialRiskType: object;
  freightDetails: object;
  fixedFreight: boolean;
  actualWeight: string;
  applicationWeight: string;
  units: string;
  rate: string;
  freightCarges: string;
  pickupCharges: string;
  pickupAmount: string;
  doorDeliveryCharges: string;
  doorDeliveryAmount: string;
  packingCharges: string;
  packingAmount: string;
  packingMaterialCharges: string;
  packingMaterialAmount: string;
  unpackingCharges: string;
  unpackingAmount: string;
  loadingCharges: string;
  loadingAmount: string;
  unloadingCharges: string;
  unloadingAmount: string;
  advanceAmount: string;
  balanceAmount: string;
  remark: string;
}

/** ACTION INTERFACE */
interface InvoiceAction {
  type: INVOICE_FORM_ACTION;
  payload: string;
}

/** INITIAL STATE */
export const initialState: InvoiceFormState = {
  invoiceNo: '',
  chooseTemplete: '',
  dateInvoice: '',
  trukNo: '',
  consignmnetNo: '',
  shifting_luggage: '',
  billingConsignerName: '',
  billingConsignerGst: '',
  billingConsignerMobileNo: '',
  billingAddress: '',
  billingLandmark: '',
  billingPincode: '',
  billingState: '',
  billingCity: '',
  billingLoadingAddress: false,
  vehicleInvoiceNo: '',
  vehicleType: '',
  vehicleNo: '',
  vehicleFromLocation: '',
  vehicleToLocation: '',
  vehicleDriverName: '',
  vehicleMobileNo: '',
  vehicleDriverLicenceNo: '',
  vehicleSealNo: '',
  vehicleInDate: '',
  vehicleOutDate: '',
  materialName: '',
  materialNoArticles: '',
  materialPackingtype: '',
  materialHSNCode: '',
  materialBillInvoiceNo: '',
  materialNetWeight: '',
  materialUnits: '',
  materialValueGoods: '',
  materialRiskType: {},
  freightDetails: {},
  fixedFreight: false,
  actualWeight: '',
  applicationWeight: '',
  units: '',
  rate: '',
  freightCarges: '',
  pickupCharges: '',
  pickupAmount: '',
  doorDeliveryCharges: '',
  doorDeliveryAmount: '',
  packingCharges: '',
  packingAmount: '',
  packingMaterialCharges: '',
  packingMaterialAmount: '',
  unpackingCharges: '',
  unpackingAmount: '',
  loadingCharges: '',
  loadingAmount: '',
  unloadingCharges: '',
  unloadingAmount: '',
  advanceAmount: '',
  balanceAmount: '',
  remark: '',
};

export const invoiceReducer = (
  state: InvoiceFormState,
  action: InvoiceAction,
) => {
  const {type, payload} = action;
  switch (type) {
    case INVOICE_FORM_ACTION.INVOICE_NO:
      return {...state, invoiceNo: payload};
    case INVOICE_FORM_ACTION.CHOOSE_TEMPLETE:
      return {...state, chooseTemplete: payload};
    case INVOICE_FORM_ACTION.DATE_INVOICE:
      return {...state, dateInvoice: payload};
    case INVOICE_FORM_ACTION.TRUK_NO:
      return {...state, trukNo: payload};
    case INVOICE_FORM_ACTION.CONSIGNMNET_NO:
      return {...state, consignmnetNo: payload};
    case INVOICE_FORM_ACTION.SHIFTING_LUGGAGE:
      return {...state, shifting_luggage: payload};
    case INVOICE_FORM_ACTION.BILLING_CONSIGNER_NAME:
      return {...state, billingConsignerName: payload};
    case INVOICE_FORM_ACTION.BILLING_CONSIGNER_GST:
      return {...state, billingConsignerGst: payload};
    case INVOICE_FORM_ACTION.BILLING_CONSIGNER_MOBILE_NO:
      return {...state, billingConsignerMobileNo: payload};
    case INVOICE_FORM_ACTION.BILLING_ADDRESS:
      return {...state, billingAddress: payload};
    case INVOICE_FORM_ACTION.BILLING_LANDNMARK:
      return {...state, billingLandmark: payload};
    case INVOICE_FORM_ACTION.BILLING_PINCODE:
      return {...state, billingPincode: payload};
    case INVOICE_FORM_ACTION.BILLING_STATE:
      return {...state, billingState: payload};
    case INVOICE_FORM_ACTION.BILLING_CITY:
      return {...state, billingCity: payload};
    case INVOICE_FORM_ACTION.BILLING_LOADING_ADDRESS:
      return {...state, billingLoadingAddress: payload};
    case INVOICE_FORM_ACTION.VEHICLE_INVOICE_NO:
      return {...state, vehicleInvoiceNo: payload};
    case INVOICE_FORM_ACTION.VEHICLE_TYPE:
      return {...state, vehicleType: payload};
    case INVOICE_FORM_ACTION.VEHICLE_NO:
      return {...state, vehicleNo: payload};
    case INVOICE_FORM_ACTION.VEHICLE_FROM_LOCATION:
      return {...state, vehicleFromLocation: payload};
    case INVOICE_FORM_ACTION.VEHICLE_TO_LOCATION:
      return {...state, vehicleToLocation: payload};
    case INVOICE_FORM_ACTION.VEHICLE_DRIVER_NAME:
      return {...state, vehicleDriverName: payload};
    case INVOICE_FORM_ACTION.VEHICLE_MOBILE_NO:
      return {...state, vehicleMobileNo: payload};
    case INVOICE_FORM_ACTION.VEHICLE_DRIVER_LICENCE_NO:
      return {...state, vehicleDriverLicenceNo: payload};
    case INVOICE_FORM_ACTION.VEHICLE_SEAL_NO:
      return {...state, vehicleSealNo: payload};
    case INVOICE_FORM_ACTION.VEHICLE_IN_DATE:
      return {...state, vehicleInDate: payload};
    case INVOICE_FORM_ACTION.VEHICLE_OUT_DATE:
      return {...state, vehicleOutDate: payload};
    case INVOICE_FORM_ACTION.MATERIAL_NAME:
      return {...state, materialName: payload};
    case INVOICE_FORM_ACTION.MATERIAL_NO_ARTICLES:
      return {...state, materialNoArticles: payload};
    case INVOICE_FORM_ACTION.MATERIAL_PACKING_TYPE:
      return {...state, materialPackingtype: payload};
    case INVOICE_FORM_ACTION.MATERIAL_HSN_CODE:
      return {...state, materialHSNCode: payload};
    case INVOICE_FORM_ACTION.MATERIAL_BILL_INVOICE_NO:
      return {...state, materialBillInvoiceNo: payload};
    case INVOICE_FORM_ACTION.MATERIAL_NET_WEIGHT:
      return {...state, materialNetWeight: payload};
    case INVOICE_FORM_ACTION.MATERIAL_UNITS:
      return {...state, materialUnits: payload};
    case INVOICE_FORM_ACTION.MATERIAL_VALUE_GOODS:
      return {...state, materialValueGoods: payload};
    case INVOICE_FORM_ACTION.MATERIAL_RISK_TYPE:
      return {...state, materialRiskType: payload};
    case INVOICE_FORM_ACTION.FREIGHT_DETAIL:
      return {...state, freightDetails: payload};
    case INVOICE_FORM_ACTION.FIXED_FREIGHT:
      return {...state, fixedFreight: payload};
    case INVOICE_FORM_ACTION.ACTUAL_WEIGHT:
      return {...state, actualWeight: payload};
    case INVOICE_FORM_ACTION.APPLICATION_WEIGHT:
      return {...state, applicationWeight: payload};
    case INVOICE_FORM_ACTION.UINTS:
      return {...state, units: payload};
    case INVOICE_FORM_ACTION.RATE:
      return {...state, rate: payload};
    case INVOICE_FORM_ACTION.FREIGHT_ChARGES:
      return {...state, freightCarges: payload};
    case INVOICE_FORM_ACTION.PICKUP_CHARGES:
      return {...state, pickupCharges: payload};
    case INVOICE_FORM_ACTION.PICKUP_AMOUNT:
      return {...state, pickupAmount: payload};
    case INVOICE_FORM_ACTION.DOOR_DELIVERY_CHARGES:
      return {...state, doorDeliveryCharges: payload};
    case INVOICE_FORM_ACTION.DOOR_DELIVERY_AMOUNT:
      return {...state, doorDeliveryAmount: payload};
    case INVOICE_FORM_ACTION.PACKING_CHARGES:
      return {...state, packingCharges: payload};
    case INVOICE_FORM_ACTION.PACKING_AMOUNT:
      return {...state, packingAmount: payload};
    case INVOICE_FORM_ACTION.PACKING_MATERIAL_CHARGES:
      return {...state, packingMaterialCharges: payload};
    case INVOICE_FORM_ACTION.PACKING_MATERAIL_AMOUNT:
      return {...state, packingMaterialAmount: payload};
    case INVOICE_FORM_ACTION.UNPACKING_CHARGES:
      return {...state, unpackingCharges: payload};
    case INVOICE_FORM_ACTION.UNPACKING_AMOUNT:
      return {...state, unpackingAmount: payload};
    case INVOICE_FORM_ACTION.LOADING_CHARGES:
      return {...state, loadingCharges: payload};
    case INVOICE_FORM_ACTION.LOADING_AMOUNT:
      return {...state, loadingAmount: payload};
    case INVOICE_FORM_ACTION.UNLOADING_CHARGES:
      return {...state, unloadingCharges: payload};
    case INVOICE_FORM_ACTION.UNLOADING_AMOUNT:
      return {...state, unloadingAmount: payload};
    case INVOICE_FORM_ACTION.ADVANCE_AMOUNT:
      return {...state, advanceAmount: payload};
    case INVOICE_FORM_ACTION.BLANCE_AMOUNT:
      return {...state, balanceAmount: payload};
    case INVOICE_FORM_ACTION.REMARK:
      return {...state, remark: payload};

    default:
      return state;
  }
};
