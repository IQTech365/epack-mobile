import {Reducer} from 'react';

//** ALL ACTIONS */
export enum QUOTATION_FORM_ACTION {
  SHIFTING_TYPE = 'SHIFTING_TYPE',
  DATE_OF_QUOTATION = 'DATE_OF_QUOTATION',
  DATE_OF_MOVING = 'DATE_OF_MOVING',
  BILLING_BY = 'BILLING_BY',
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
  PICKUP_CURRENT_FLOOR = 'PICKUP_CURRENT_FLOOR',
  PICKUP_LIFT_STATUS = 'PICKUP_LIFT_STATUS',
  DELIVERY_PINCODE = 'DELIVERY_PINCODE',
  DELIVERY_CITY = 'DELIVERY_CITY',
  DELIVERY_STATE = 'DELIVERY_STATE',
  DELIVERY_LOCALITY = 'DELIVERY_LOCALITY',
  DELIVERY_ADDRESS = 'DELIVERY_ADDRESS',
  DELIVERY_CURRENT_FLOOR = 'DELIVERY_CURRENT_FLOOR',
  DELIVERY_LIFT_STATUS = 'DELIVERY_LIFT_STATUS',
  PART_LOAD = 'PART_LOAD ',
  FULL_LOAD = 'FULL_LOAD',
  FREIGHT_PART_CHARGE = 'FREIGHT_PART_CHARGE',
  FREIGHT_FULL_CHARGE = 'FREIGHT_FULL_CHARGE',
  LORRY_TYPE = 'LORRY_TYPE',
  PACKING_CHARGES = 'PACKING_CHARGES',
  PACKING_MATERIAL_CHARGES = 'PACKING_MATERIAL_CHARGES',
  LOADING_CHARGES = 'LOADING_CHARGES ',
  UNLOADING_CHARGES = 'UNLOADING_CHARGES',
  UNPACKING_CHARGES = 'UNPACKING_CHARGES',
  ADVANCE_AMOUNT = 'ADVANCE_AMOUNT',
  SURCHARGE = 'SURCHARGE',
  DISCOUNT_IN_QUOTATION = 'DISCOUNT_IN_QUOTATION',
  GST_IN_QUOTATION = 'GST_IN_QUOTATION',
  INSURANCE_DETAILS = 'INSURANCE_DETAIL ',
  INSURANCE_TYPE = 'INSURANCE_TYPE',
  INSURANCE_CHARGE = 'INSURANCE_CHARGE',
  VALUE_OF_GOODS = 'VALUE_OF_GOODS',
  STORAGE_CHARGES = 'STORAGE_CHARGES ',
  STORAGE_FROM_DATE = 'STORAGE_FROM_DATE',
  STORAGE_TO_DATE = 'STORAGE_TO_DATE',
  STORAGE_AMOUNT = 'STORAGE_AMOUNT',
  OTHER_CHARGES = 'OTHER_CHARGES',
  AMOUNT = 'AMOUNT',
  OTHER_DETAILS = 'OTHER_DETAILS ',
  // ERRORS
  PICKUP_PINCODE_ERROR = 'PICKUP_PINCODE_ERROR',
}

// ** Billing Info
export type TBillingInfo = {
  company_name: string;
  approval_authority: string;
  authority_person_name: string;
  authority_mobile_number: string;
  company_address: string;
  company_gst: string;
  employee_name: string;
  employee_designation: string;
  employee_mobile_number: string;
}

// ** Billing By
export type TBillingBy = {
  billing_by: string;
  billing_info: TBillingInfo | null;
}

// ** Packing Charge
export enum EChargeStatus {
  INCLUDED = 'INCLUDED',
  ADDITIONAL = 'ADDITIONAL',
  NOT_REQUIRED = 'NOT REQUIRED',
  LOADING_BY_PARTY = 'LOADING_BY_PARTY',
  UNLOADING_BY_PARTY = 'UNLOADING_BY_PARTY',
}

export type TCharge = {
  status: EChargeStatus;
  part_load_charge: string;
  full_load_charge: string;
};

// ** Surchage
export enum ESurchageStatus {
  APPLICABLE = 'APPLICABLE',
  NOT_APPLICABLE = 'NOT APPLICABLE',
  EXTRA = 'EXTRA',
}

export type TSurcharge = {
  status: ESurchageStatus,
  surcharge_percent: string,
}

// ** GST in Quotation
export enum EGstInQuotationStatus {
  WITH_GST = 'WITH GST',
  WITHOUT_GST = 'WITHOUT GST',
  GST_EXEMPTED = 'GST EXEMPTED',
}

export type TGstInQuotation = {
  status: EGstInQuotationStatus,
  gst_percent: string,
  gst_type: string,
}

// ** Discount in quotation
export enum EDiscountInQuotationType {
  PERCENT = 'PERCENT',
  FLAT = 'FLAT',
}
export type TDiscountInQuotation = {
  discount_type: EDiscountInQuotationType,
  discount_value: string,
}

// ** Insurance details
export type TInsuranceDetails = {
  status: 'Required' | 'Not Required',
  shifting_luggage: string,
  insurance_type: string,
  insurance_charge_percent: string,
  insurance_gst_percent: string,
  insurance_goods_value: string,
}

// ** storage charge
export type TStorageCharge = {
  status: 'Required' | 'Not Required',
  storage_duration_type: string,
  storage_from_date: string,
  storage_to_date: string,
  storage_amount: string,
}

export type TOtherChargeItem = {
  name: string,
  value: string,
}

export type TOtherCharge = {
  ratePerItem: string;
  amount: string;
}

// ** Other charges
export type TOtherCharges = {
  jobType: string;
  qty: string;
  partLoad: TOtherCharge | null;
  fullLoad: TOtherCharge | null;
}

// ** Other Details
export type TOtherDetails = {
  easy_access_for_loading_unloading: string,
  any_restrcition_for_loading_unloading: string,
  items_got_down_from_balcony: string,
  any_needs_or_concern: string,
}

/** QUOTATOIN FORM STATE */
export interface IQuotationFormState {
  shiftingType: string;
  dateOfQuotation: string;
  dateOfMoving: string;
  billingBy: TBillingBy | null;
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
  pickupCurrentFloor: string;
  pickupLiftStatus: string;
  deliveryPincode: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryLocality: string;
  deliveryAddress: string;
  deliveryCurrentFloor: string;
  deliveryLiftStatus: string;
  partLoad: boolean;
  fullLoad: boolean;
  lorryType: string;
  freightPartCharge: string;
  freightFullCharge: string;
  packingCharges: TCharge | null;
  packingMaterialCharges: TCharge | null;
  loadingCharges: TCharge | null;
  unLoadingCharges: TCharge | null;
  unPackingCharges: TCharge | null;
  advanceAmount: string;
  surcharge: TSurcharge | null;
  discountInQuotation: TDiscountInQuotation | null;
  gstInQuotation: TGstInQuotation | null;
  insuranceDetails: TInsuranceDetails | null;
  storageCharges: TStorageCharge | null;
  otherCharges: [TOtherCharges] | null;
  otherDetails: TOtherDetails | null;
  //Errors
  errors: {
    shiftingType: string;
    dateOfQuotation: string;
    dateOfMoving: string;
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
    packingCharges: string;
    packingMaterialCharges: string;
    loadingCharges: string;
    unLoadingCharges: string;
    unPackingCharges: string;
    advanceAmount: string;
    surcharge: string;
    discountInQuotation: string;
    gstInQuotation: string;
    insuranceDetails: string;
    storageCharges: string;
    otherCharges: string;
    otherDetails: string;
  };
}

type TPayload = string | TCharge | boolean | TSurcharge | TGstInQuotation | TDiscountInQuotation | TInsuranceDetails | TStorageCharge | [TOtherCharges] | TOtherDetails | TBillingBy;

/** ACTION INTERFACE */
export interface IQuotationAction {
  type: QUOTATION_FORM_ACTION;
  payload: TPayload;
}

/** INITIAL STATE */
export const initialState: IQuotationFormState = {
  shiftingType: 'LOCAL',
  dateOfQuotation: '',
  dateOfMoving: '',
  billingBy: {billing_by: 'by Individual', billing_info: null},
  serialNumber: '',
  shiftingLuggage: 'Household',
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
  pickupCurrentFloor: 'Ground Floor',
  pickupLiftStatus: 'Yes',
  deliveryPincode: '',
  deliveryCity: '',
  deliveryState: '',
  deliveryLocality: '',
  deliveryAddress: '',
  deliveryCurrentFloor: 'Ground Floor',
  deliveryLiftStatus: 'Yes',
  partLoad: true,
  fullLoad: false,
  lorryType: '',
  freightPartCharge: '',
  freightFullCharge: '',
  packingCharges: null,
  packingMaterialCharges: null,
  loadingCharges: null,
  unLoadingCharges: null,
  unPackingCharges: null,
  advanceAmount: '',
  surcharge: null,
  discountInQuotation: null,
  gstInQuotation: null,
  insuranceDetails: null,
  storageCharges: null,
  otherCharges: null,
  otherDetails: null,
  errors: {
    shiftingType: '',
    dateOfQuotation: '',
    dateOfMoving: '',
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
    packingCharges: '',
    packingMaterialCharges: '',
    loadingCharges: '',
    unLoadingCharges: '',
    unPackingCharges: '',
    advanceAmount: '',
    surcharge: '',
    discountInQuotation: '',
    gstInQuotation: '',
    insuranceDetails: '',
    storageCharges: '',
    otherCharges: '',
    otherDetails: '',
  },
};

/** Quotation Reducer */
export const quotationReducer: Reducer<
  IQuotationFormState,
  IQuotationAction
> = (state: IQuotationFormState, action: IQuotationAction) => {
  const {type, payload} = action;
  switch (type) {
    case QUOTATION_FORM_ACTION.SHIFTING_TYPE:
      return {...state, shiftingType: payload as string};
    case QUOTATION_FORM_ACTION.DATE_OF_QUOTATION:
      return {...state, dateOfQuotation: payload as string};
    case QUOTATION_FORM_ACTION.DATE_OF_MOVING:
      return {...state, dateOfMoving: payload as string};
    case QUOTATION_FORM_ACTION.BILLING_BY:
      return {...state, billingBy: payload as TBillingBy};
    case QUOTATION_FORM_ACTION.SERIAL_NUMBER:
      return {...state, serialNumber: payload as string};
    case QUOTATION_FORM_ACTION.SHIFTING_LUGGAGE:
      return {...state, shiftingLuggage: payload as string};
    case QUOTATION_FORM_ACTION.TEMPLATE:
      return {...state, template: payload as string};
    case QUOTATION_FORM_ACTION.VEHCILE_TYPE:
      return {...state, vehcileType: payload as string};
    case QUOTATION_FORM_ACTION.MANUFACTURER:
      return {...state, manufacturer: payload as string};
    case QUOTATION_FORM_ACTION.MODEL:
      return {...state, model: payload as string};
    case QUOTATION_FORM_ACTION.COMPANY_NAME:
      return {...state, companyName: payload as string};
    case QUOTATION_FORM_ACTION.PARTY_NAME:
      return {...state, partyName: payload as string};
    case QUOTATION_FORM_ACTION.MOBILE_NUMBER:
      return {...state, mobileNumber: payload as string};
    case QUOTATION_FORM_ACTION.PICKUP_PINCODE:
      return {...state, pickupPincode: payload as string};
    case QUOTATION_FORM_ACTION.PICKUP_CITY:
      return {...state, pickupCity: payload as string};
    case QUOTATION_FORM_ACTION.PICKUP_STATE:
      return {...state, pickupState: payload as string};
    case QUOTATION_FORM_ACTION.PICKUP_LOCALITY:
      return {...state, pickupLocality: payload as string};
    case QUOTATION_FORM_ACTION.PICKUP_ADDRESS:
      return {...state, pickupAddress: payload as string};
    case QUOTATION_FORM_ACTION.PICKUP_CURRENT_FLOOR:
      return {...state, pickupCurrentFloor: payload as string};
    case QUOTATION_FORM_ACTION.PICKUP_LIFT_STATUS:
      return {...state, pickupLiftStatus: payload as string};
    case QUOTATION_FORM_ACTION.DELIVERY_PINCODE:
      return {...state, deliveryPincode: payload as string};
    case QUOTATION_FORM_ACTION.DELIVERY_CITY:
      return {...state, deliveryCity: payload as string};
    case QUOTATION_FORM_ACTION.DELIVERY_STATE:
      return {...state, deliveryState: payload as string};
    case QUOTATION_FORM_ACTION.DELIVERY_LOCALITY:
      return {...state, deliveryLocality: payload as string};
    case QUOTATION_FORM_ACTION.DELIVERY_ADDRESS:
      return {...state, deliveryAddress: payload as string};
    case QUOTATION_FORM_ACTION.DELIVERY_CURRENT_FLOOR:
      return {...state, deliveryCurrentFloor: payload as string};
    case QUOTATION_FORM_ACTION.DELIVERY_LIFT_STATUS:
      return {...state, deliveryLiftStatus: payload as string};
    case QUOTATION_FORM_ACTION.PART_LOAD:
      return {...state, partLoad: payload as boolean};
    case QUOTATION_FORM_ACTION.FULL_LOAD:
      return {...state, fullLoad: payload as boolean};
    case QUOTATION_FORM_ACTION.LORRY_TYPE:
      return {...state, lorryType: payload as string};
    case QUOTATION_FORM_ACTION.FREIGHT_PART_CHARGE:
      return {...state, freightPartCharge: payload as string};
    case QUOTATION_FORM_ACTION.FREIGHT_FULL_CHARGE:
      return {...state, freightFullCharge: payload as string};
    case QUOTATION_FORM_ACTION.PACKING_CHARGES:
      return {...state, packingCharges: payload as TCharge};
    case QUOTATION_FORM_ACTION.PACKING_MATERIAL_CHARGES:
      return {...state, packingMaterialCharges: payload as TCharge};
    case QUOTATION_FORM_ACTION.LOADING_CHARGES:
      return {...state, loadingCharges: payload as TCharge};
    case QUOTATION_FORM_ACTION.UNLOADING_CHARGES:
      return {...state, unLoadingCharges: payload as TCharge};
    case QUOTATION_FORM_ACTION.UNPACKING_CHARGES:
      return {...state, unPackingCharges: payload as TCharge};
    case QUOTATION_FORM_ACTION.ADVANCE_AMOUNT:
      return {...state, advanceAmount: payload as string};
    case QUOTATION_FORM_ACTION.SURCHARGE:
      return {...state, surcharge: payload as TSurcharge};
    case QUOTATION_FORM_ACTION.DISCOUNT_IN_QUOTATION:
      return {...state, discountInQuotation: payload as TDiscountInQuotation};
    case QUOTATION_FORM_ACTION.GST_IN_QUOTATION:
      return {...state, gstInQuotation: payload as TGstInQuotation};
    case QUOTATION_FORM_ACTION.INSURANCE_DETAILS:
      return {...state, insuranceDetails: payload as TInsuranceDetails};
    case QUOTATION_FORM_ACTION.STORAGE_CHARGES:
      return {...state, storageCharges: payload as TStorageCharge};
    case QUOTATION_FORM_ACTION.OTHER_CHARGES:
      return {...state, otherCharges: payload as [TOtherCharges]};
    case QUOTATION_FORM_ACTION.OTHER_DETAILS:
      return {...state, otherDetails: payload as TOtherDetails};
    //Errors
    case QUOTATION_FORM_ACTION.PICKUP_PINCODE_ERROR:
      return {
        ...state,
        errors: {...state.errors, pickupAddress: payload as string},
      };
    default:
      return state;
  }
};
