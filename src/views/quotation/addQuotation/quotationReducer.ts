//** ALL ACTIONS */
export enum QUOTATION_FORM_ACTION {
  SHIFTING_TYPE = 'SHIFTING_TYPE',
  DATE_OF_QUOTATION = 'DATE_OF_QUOTATION',
  SERIAL_NUMBER = 'SERIAL_NUMBER',
  SHIFTING_LUGGAGE = 'SHIFTING_LUGGAGE',
  TEMPLATE = 'TEMPLATE',
  VEHCILE_TYPE = 'VEHCILE_TYPE',
  MANUFACTURER = 'MANUFACTURER',
  MODEL = 'MODEL',
  COMPANY_NAME = 'COMPANY_NAME',
  PARTY_NAME = 'PARTY_NAME',
  MOBILE_NUMBER = 'MOBILE_NUMBER',
  PICKUP_PINCODE = 'PICKUP_PINCODE',
  PICKUP_CITY = 'PICKUP_CITY',
  PICKUP_STATE = 'PICKUP_STATE',
  PICKUP_LOCALITY = 'PICKUP_LOCALITY',
  PICKUP_ADDRESS = 'PICKUP_ADDRESS',
  DELIVERY_PINCODE = 'DELIVERY_PINCODE',
  DELIVERY_CITY = 'DELIVERY_CITY',
  DELIVERY_STATE = 'DELIVERY_STATE',
  DELIVERY_LOCALITY = 'DELIVERY_LOCALITY',
  DELIVERY_ADDRESS = 'DELIVERY_ADDRESS',
  PART_LOAD = 'PART_LOAD ',
  FULL_LOAD = 'FULL_LOAD',
  PACKING_CHARGES = 'PACKING_CHARGES',
  PACKING_MATERIAL_CHARGES = 'PACKING_MATERIAL_CHARGES',
  LOADING_CHARGES ='LOADING_CHARGES ',
  UNLOADING_CHARGES ='UNLOADING_CHARGES',
  UNPACKING_CHARGES = 'UNPACKING_CHARGES',
  ADVANCE_AMOUNT = 'ADVANCE_AMOUNT',
  SURCHARGE = 'SURCHARGE',
  DISCOUNT_IN_QUOTATION = 'DISCOUNT_IN_QUOTATION',
  GST_IN_QUOTATION = 'GST_IN_QUOTATION',
  INSURANCE_DETAILS = 'INSURANCE_DETAIL ',
  INSURANCE_TYPE = 'INSURANCE_TYPE',
  INSURANCE_CHARGE = 'INSURANCE_CHARGE',
  VALUE_OF_GOODS = 'VALUE_OF_GOODS',
  STORAGE_CHARGES ='STORAGE_CHARGES ',
  FROM_DATE ='FROM_DATE',
  TO_DATE = 'TO_DATE',
  STORAGE_AMOUNT = 'STORAGE_AMOUNT',
  OTHER_CHARGES = 'OTHER_CHARGES',
  AMOUNT = 'AMOUNT',
  OTHER_DETAILS = 'OTHER_DETAILS ',
}

export enum EChargeStatus {
  INCLUDED = 'INCLUDED',
  ADDITIONAL = 'ADDITIONAL',
  NOT_REQUIRED = 'NOT REQUIRED',
}

export  type TCharge = {
  status: EChargeStatus,
  part_load_charge: string,
  full_load_charge: string,
}

/** QUOTATOIN FORM STATE */
interface IQuotationFormState {
  shiftingType: string;
  dateOfQuotation: string;
  serialNumber: string;
  shiftingLuggage: string;
  template: string;
  vehcileType: string;
  manufacturer: string;
  model: string;
  companyName: string;
  partyName: string;
  mobileNumber: string;
  pickupPincode: string;
  pickupCity: string;
  pickupState: string;
  pickupLocality: string;
  pickupAddress: string;
  deliveryPincode: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryLocality: string;
  deliveryAddress: string;
  partLoad: string;
  fullLoad: string;
  packingCharges: TCharge | null;
  packingMaterialCharges : TCharge | null ;
  loadingCharges : TCharge | null ;
  unLoadingCharges : TCharge | null ;
  unPackingCharges : TCharge | null ;
  advanceAmount : string;
  surcharge : string ;
  discountInQuotation : TCharge | null ;
  gstInQuotation : TCharge | null ;
  insuranceDetails : TCharge | null ;
  insuranceType : string;
  insuranceCharge: string ;
  valueOfGoods: string;
  storageCharges: TCharge | null;
  fromDate: string ;
  toDate : string ;
  storageAmount :string ;
  otherCharges :string ;
  amount : string ;
otherDetailsOne : boolean;
otherDetailsTwo : boolean;
otherDetailsThree : boolean;
}

/** ACTION INTERFACE */
interface IQuotationAction {
  type: QUOTATION_FORM_ACTION;
  payload: string;
}

/** INITIAL STATE */
export const initialState: IQuotationFormState = {
  shiftingType: '',
  dateOfQuotation: '',
  serialNumber: '',
  shiftingLuggage: '',
  template: '',
  vehcileType: '',
  manufacturer: '',
  model: '',
  companyName: '',
  partyName: '',
  mobileNumber: '',
  pickupPincode: '',
  pickupCity: '',
  pickupState: '',
  pickupLocality: '',
  pickupAddress: '',
  deliveryPincode: '',
  deliveryCity: '',
  deliveryState: '',
  deliveryLocality: '',
  deliveryAddress: '',
  partLoad: '',
  fullLoad: '',
  packingCharges: null,
  packingMaterialCharges : null,
  loadingCharges : null,
  unLoadingCharges : null,
  unPackingCharges : null,
  advanceAmount : '',
  surcharge :'',
  discountInQuotation : null,
  gstInQuotation : null,
  insuranceDetails :null ,
  insuranceType : '',
  insuranceCharge:'',
  valueOfGoods: '',
  storageCharges: null,
  fromDate: '',
  toDate : '',
  storageAmount :'',
  otherCharges :'',
  amount : '',
  otherDetailsOne : true,
otherDetailsTwo : true,
otherDetailsThree : true,

};

/** Quotation Reducer */
export const quotationReducer = (
  state: IQuotationFormState,
  action: IQuotationAction,
) => {
  const {type, payload} = action;
  switch (type) {
    case QUOTATION_FORM_ACTION.SHIFTING_TYPE:
      return {...state, shiftingType: payload};
    case QUOTATION_FORM_ACTION.DATE_OF_QUOTATION:
      return {...state, dateOfQuotation: payload};
    case QUOTATION_FORM_ACTION.SERIAL_NUMBER:
      return {...state, serialNumber: payload};
    case QUOTATION_FORM_ACTION.SHIFTING_LUGGAGE:
      return {...state, shiftingLuggage: payload};
    case QUOTATION_FORM_ACTION.TEMPLATE:
      return {...state, template: payload};
    case QUOTATION_FORM_ACTION.VEHCILE_TYPE:
      return {...state, vehcileType: payload};
    case QUOTATION_FORM_ACTION.MANUFACTURER:
      return {...state, manufacturer: payload};
    case QUOTATION_FORM_ACTION.MODEL:
      return {...state, model: payload};
    case QUOTATION_FORM_ACTION.COMPANY_NAME:
      return {...state, companyName: payload};
    case QUOTATION_FORM_ACTION.PARTY_NAME:
      return {...state, partyName: payload};
    case QUOTATION_FORM_ACTION.MOBILE_NUMBER:
      return {...state, mobileNumber: payload};
    case QUOTATION_FORM_ACTION.PICKUP_PINCODE:
      return {...state, pickupPincode: payload};
    case QUOTATION_FORM_ACTION.PICKUP_CITY:
      return {...state, pickupCity: payload};
    case QUOTATION_FORM_ACTION.PICKUP_STATE:
      return {...state, pickupState: payload};
    case QUOTATION_FORM_ACTION.PICKUP_LOCALITY:
      return {...state, pickupLocality: payload};
    case QUOTATION_FORM_ACTION.PICKUP_ADDRESS:
      return {...state, pickupAddress: payload};
    case QUOTATION_FORM_ACTION.DELIVERY_PINCODE:
      return {...state, deliveryPincode: payload};
    case QUOTATION_FORM_ACTION.DELIVERY_CITY:
      return {...state, deliveryCity: payload};
    case QUOTATION_FORM_ACTION.DELIVERY_STATE:
      return {...state, deliveryState: payload};
    case QUOTATION_FORM_ACTION.DELIVERY_LOCALITY:
      return {...state, deliveryLocality: payload};
    case QUOTATION_FORM_ACTION.DELIVERY_ADDRESS:
      return {...state, deliveryAddress: payload};
    case QUOTATION_FORM_ACTION.PART_LOAD:
      return {...state, partLoad: payload};
    case QUOTATION_FORM_ACTION.FULL_LOAD:
      return {...state, fullLoad: payload};
    case QUOTATION_FORM_ACTION.PACKING_CHARGES:
      return {...state, packingCharges: payload};
    case QUOTATION_FORM_ACTION.PACKING_MATERIAL_CHARGES:
      return {...state, packingMaterialCharges: payload};
    case QUOTATION_FORM_ACTION.LOADING_CHARGES:
      return {...state, loadingCharges: payload};
    case QUOTATION_FORM_ACTION.UNLOADING_CHARGES:
      return {...state, unLoadingCharges: payload};
    case QUOTATION_FORM_ACTION.UNPACKING_CHARGES:
      return {...state, unPackingCharges: payload};
    case QUOTATION_FORM_ACTION.ADVANCE_AMOUNT:
      return {...state, advanceAmount: payload};
    case QUOTATION_FORM_ACTION.SURCHARGE:
      return {...state, surcharge: payload};
    case QUOTATION_FORM_ACTION.DISCOUNT_IN_QUOTATION:
      return {...state, discountInQuotation: payload};
    case QUOTATION_FORM_ACTION.GST_IN_QUOTATION:
      return {...state, gstInQuotation: payload};
    case QUOTATION_FORM_ACTION.INSURANCE_DETAILS:
      return {...state, insuranceDetails: payload};
    case QUOTATION_FORM_ACTION.INSURANCE_TYPE:
      return {...state, insuranceType: payload};
    case QUOTATION_FORM_ACTION.INSURANCE_CHARGE:
      return {...state, insuranceCharge: payload};
    case QUOTATION_FORM_ACTION.VALUE_OF_GOODS:
      return {...state, valueOfGoods: payload};
    case QUOTATION_FORM_ACTION.STORAGE_CHARGES:
      return {...state, storageCharges: payload};
    case QUOTATION_FORM_ACTION.FROM_DATE:
      return {...state, fromDate: payload};
    case QUOTATION_FORM_ACTION.TO_DATE:
      return {...state, toDate: payload};
    case QUOTATION_FORM_ACTION.AMOUNT:
      return {...state, amount: payload};
    case QUOTATION_FORM_ACTION.OTHER_DETAILS:
      return {...state, otherDetails: payload};
    default:
      return state;
  }
};
