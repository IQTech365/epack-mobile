import {Reducer} from 'react';
import billingByOptions from '../../../data/billingByOptions.json';
import shiftingTypes from '../../../data/shiftingType.json';
import shiftingLuggages from '../../../data/shiftingLuggage.json';
import liftStatusOptions from '../../../data/liftStatusOptions.json';
import floorOptions from '../../../data/floorOptions.json';
import {
  discountInQuotationOptions,
  gstInQuotationOptions,
  options,
  options2,
} from './components/FreightDetailsView/components/utils';

export enum ACTION {
  SHIFTING_TYPE = 'SHIFTING_TYPE',
  SHIFTING_LUGGAGE = 'SHIFTING_LUGGAGE',
  QUOTATION_NO = 'QUOTATION_NO',
  DATE_OF_QUOTATION = 'DATE_OF_QUOTATION',
  DATE_OF_MOVING = 'DATE_OF_MOVING',
  BILLING_BY = 'BILLING_BY',
  //
  VEHICLE_TYPE = 'VEHICLE_TYPE',
  VEHICLE_MANUFACTURER = 'VEHICLE_MANUFACTURER',
  VEHICLE_MODEL = 'VEHICLE_MODEL',
  //
  PARTY_NAME = 'PARTY_NAME',
  PARTY_MOBILE_NO = 'PARTY_MOBILE_NO',
  //
  COMPANY_NAME = 'COMPANY_NAME',
  APPROVAL_AUTHORITY = 'APPROVAL_AUTHORITY',
  AUTHORITY_PERSON_NAME = 'AUTHORITY_PERSON_NAME',
  AUTHORITY_MOBILE_NO = 'AUTHORITY_MOBILE_NO',
  COMPANY_GST = 'COMPANY_GST',
  EMPLOYEE_NAME = 'EMPLOYEE_NAME',
  EMPLOYEE_DESIGNATION = 'EMPLOYEE_DESIGNATION',
  EMPLOYEE_MOBILE_NO = 'EMPLOYEE_MOBILE_NO',
  COMPANY_ADDRESS = 'COMPANY_ADDRESS',
  //
  PICKUP_PINCODE = 'PICKUP_PINCODE',
  PICKUP_STATE = 'PICKUP_STATE',
  PICKUP_CITY = 'PICKUP_CITY',
  PICKUP_ADDRESS = 'PICKUP_ADDRESS',
  PICKUP_CURRENT_FLOOR = 'PICKUP_CURRENT_FLOOR',
  PICKUP_LIFT_STATUS = 'PICKUP_LIFT_STATUS',
  //
  DROP_PINCODE = 'DROP_PINCODE',
  DROP_STATE = 'DROP_STATE',
  DROP_CITY = 'DROP_CITY',
  DROP_ADDRESS = 'DROP_ADDRESS',
  DROP_CURRENT_FLOOR = 'DROP_CURRENT_FLOOR',
  DROP_LIFT_STATUS = 'DROP_LIFT_STATUS',
  //
  FREIGHT_PART_LOAD = 'FREIGHT_PART_LOAD',
  FREIGHT_FULL_LOAD = 'FREIGHT_FULL_LOAD',
  LORRY_TYPE = 'LORRY_TYPE',
  FREIGHT_PART_CHARGE = 'FREIGHT_PART_CHARGE',
  FREIGHT_FULL_CHARGE = 'FREIGHT_FULL_CHARGE',
  //
  PACKING_CHARGE = 'PACKING_CHARGE',
  PACKING_CHARGE_PART_LOAD = 'PACKING_CHARGE_PART_LOAD',
  PACKING_CHARGE_FULL_LOAD = 'PACKING_CHARGE_FULL_LOAD',
  //
  PACKING_MATERIAL_CHARGE = 'PACKING_MATERIAL_CHARGE',
  PACKING_MATERIAL_CHARGE_PART_LOAD = 'PACKING_MATERIAL_CHARGE_PART_LOAD',
  PACKING_MATERIAL_CHARGE_FULL_LOAD = 'PACKING_MATERIAL_CHARGE_FULL_LOAD',
  //
  LOADING_CHARGE = 'LOADING_CHARGE',
  LOADING_CHARGE_PART_LOAD = 'LOADING_CHARGE_PART_LOAD',
  LOADING_CHARGE_FULL_LOAD = 'LOADING_CHARGE_FULL_LOAD',
  //
  UNLOADING_CHARGE = 'UNLOADING_CHARGE',
  UNLOADING_CHARGE_PART_LOAD = 'UNLOADING_CHARGE_PART_LOAD',
  UNLOADING_CHARGE_FULL_LOAD = 'UNLOADING_CHARGE_FULL_LOAD',
  //
  UNPACKING_CHARGE = 'UNPACKING_CHARGE',
  UNPACKING_CHARGE_PART_LOAD = 'UNPACKING_CHARGE_PART_LOAD',
  UNPACKING_CHARGE_FULL_LOAD = 'UNPACKING_CHARGE_FULL_LOAD',
  //
  OTHER_CHARGES = 'OTHER_CHARGES',
  //
  ADVANCE_AMOUNT = 'ADVANCE_AMOUNT',
  //
  SURCHARGE = 'SURCHARGE',
  SURCHARGE_PERCENT = 'SURCHARGE_PERCENT',
  //
  DISCOUNT_IN_QUOTATION = 'DISCOUNT_IN_QUOTATION',
  DISCOUNT_PERCENT_OR_VALUE = 'DISCOUNT_PERCENT_OR_VALUE',
  //
  GST_IN_QUOTATION = 'GST_IN_QUOTATION',
  GST_PERCENT = 'GST_PERCENT',
  GST_TYPE = 'GST_TYPE',
  //
  TRANSIT_INSURANCE = 'TRANSIT_INSURANCE',
  TRANSIT_SHIFTING_LUGGAGE = 'TRANSIT_SHIFTING_LUGGAGE',
  TRANSIT_INSURANCE_TYPE = 'TRANSIT_INSURANCE_TYPE',
  TRANSIT_INSURANCE_PERCENT = 'TRANSIT_INSURANCE_PERCENT',
  TRANSIT_INSURANCE_GST_PERCENT = 'TRANSIT_INSURANCE_GST_PERCENT',
  TRANSIT_GOODS_VALUE = 'TRANSIT_GOODS_VALUE',
  //
  STORAGE = 'STORAGE',
  STORAGE_DURATION = 'STORAGE_DURATION',
  STORAGE_FROM_DATE = 'STORAGE_FROM_DATE',
  STORAGE_TO_DATE = 'STORAGE_TO_DATE',
  STORAGE_AMOUNT = 'STORAGE_AMOUNT',
  //
  OTHER_DETAIL_1 = 'OTHER_DETAIL_1',
  OTHER_DETAIL_2 = 'OTHER_DETAIL_2',
  OTHER_DETAIL_3 = 'OTHER_DETAIL_3',
  OTHER_DETAIL_4 = 'OTHER_DETAIL_4',
  //
  RESET_ALL_PART_LOAD = 'RESET_ALL_PART_LOAD',
  RESET_ALL_FULL_LOAD = 'RESET_ALL_FULL_LOAD',
  //
  PARTY_NAME_ERROR = 'PARTY_NAME_ERROR',
  PARTY_MOBILE_NO_ERROR = 'PARTY_MOBILE_NO_ERROR',
  COMPANY_NAME_ERROR = 'COMPANY_NAME_ERROR',
  EMPLOYEE_NAME_ERROR = 'EMPLOYEE_NAME_ERROR',
  AUTHORITY_MOBILE_NO_ERROR = 'AUTHORITY_MOBILE_NO_ERROR',
  EMPLOYEE_MOBILE_NO_ERROR = 'EMPLOYEE_MOBILE_NO_ERROR',
  PICKUP_PINCODE_ERROR = 'PICKUP_PINCODE_ERROR',
  DROP_PINCODE_ERROR = 'DROP_PINCODE_ERROR',
  //
  RESET_ERROR = 'RESET_ERROR',
  VALIDATE_FORM = 'VALIDATE_FORM',
  VALID_FORM = 'VALID_FORM',
}

export type TInsuranceDetails = {
  status: string;
  shifting_luggage: string;
  insurance_type: string;
  insurance_charge_percent: string;
  insurance_gst_percent: string;
  insurance_goods_value: string;
};

export interface IOtherCharge {
  particular_name: string;
  quantity: string;
  part_load_rate_per_item: string;
  part_load_amount: string;
  full_load_rate_per_item: string;
  full_load_amount: string;
}

export interface IState {
  shifting_type: string;
  shifting_luggage: string;
  quotation_no: string;
  date_of_quotation: string;
  date_of_moving: string;
  // **** Vehicle ****
  vehicle_type: string;
  vehicle_manufacturer: string;
  vehicle_model: string;
  // **** Billing ****
  billing_by: string;
  // **** Billing Individual ****
  party_name: string;
  party_mobile_no: string;
  // **** Billing Company ****
  company_name: string;
  approval_authority: string;
  authority_person_name: string;
  authority_mobile_no: string;
  company_gst: string;
  employee_name: string;
  employee_designation: string;
  employee_mobile_no: string;
  company_address: string;
  // **** Pickup Address
  pickup_pincode: string;
  pickup_state: string;
  pickup_city: string;
  pickup_address: string;
  pickup_current_floor: string;
  pickup_lift_status: string;
  // **** Drop Address
  drop_pincode: string;
  drop_state: string;
  drop_city: string;
  drop_address: string;
  drop_current_floor: string;
  drop_lift_status: string;
  // **** Freight Details ****
  freight_part_load: boolean;
  freight_full_load: boolean;
  lorry_type: string;
  freight_part_charge: string;
  freight_full_charge: string;
  // **** Packing Charge ****
  packing_charge: string;
  packing_charge_part_load: string;
  packing_charge_full_load: string;
  // **** Packing Material Charge ****
  packing_material_charge: string;
  packing_material_charge_part_load: string;
  packing_material_charge_full_load: string;
  // **** Loading Charge ****
  loading_charge: string;
  loading_charge_part_load: string;
  loading_charge_full_load: string;
  // **** Unloading Charge ****
  unloading_charge: string;
  unloading_charge_part_load: string;
  unloading_charge_full_load: string;
  // **** Unpacking Charge ****
  unpacking_charge: string;
  unpacking_charge_part_load: string;
  unpacking_charge_full_load: string;
  // **** Other Charges ****
  other_charges: IOtherCharge[];
  advance_amount: string;
  // **** Surcharge ****
  surcharge: string;
  surcharge_percent: string;
  // **** Discount In Quotation
  discount_in_quotation: string;
  discount_percent_or_value: string;
  // **** GST in Quotation
  gst_in_quotation: string;
  gst_percent: string;
  gst_type: string;
  // **** Transit Insurance ****
  transit_insurance: string;
  transit_shifting_luggage: string;
  transit_insurance_type: string;
  transit_insurance_charge: string;
  transit_insurance_gst: string;
  transit_goods_value: string;
  // **** Storage Charge ****
  storage: string;
  storage_duration: string;
  storage_from_date: string;
  storage_to_date: string;
  storage_amount: string;
  // **** Other Details ****
  other_detail_1: string;
  other_detail_2: string;
  other_detail_3: string;
  other_detail_4: string;
  // **** ERRORS ****
  errors: {
    party_name: string;
    party_mobile_no: string;
    company_name: string;
    authority_mobile_no: string;
    employee_name: string;
    employee_mobile_no: string;
    pickup_pincode: string;
    drop_pincode: string;
  };
  validate_form: boolean;
  valid_form: boolean;
}

export interface IAction {
  type: ACTION;
  payload: string | boolean | IOtherCharge[];
}

export const initialState: IState = {
  shifting_type: shiftingTypes[0].label,
  shifting_luggage: shiftingLuggages[0].label,
  quotation_no: '',
  date_of_quotation: '',
  date_of_moving: '',
  // **** Vehicle ****
  vehicle_type: '',
  vehicle_manufacturer: '',
  vehicle_model: '',
  // **** Billing ****
  billing_by: billingByOptions[0].label,
  // **** Billing Individual ****
  party_name: '',
  party_mobile_no: '',
  // **** Billing Company ****
  company_name: '',
  approval_authority: '',
  authority_person_name: '',
  authority_mobile_no: '',
  company_gst: '',
  employee_name: '',
  employee_designation: '',
  employee_mobile_no: '',
  company_address: '',
  // **** Pickup Address ****
  pickup_pincode: '',
  pickup_state: '',
  pickup_city: '',
  pickup_address: '',
  pickup_current_floor: floorOptions[3].label,
  pickup_lift_status: liftStatusOptions[0].label,
  // **** Drop Address ****
  drop_pincode: '',
  drop_state: '',
  drop_city: '',
  drop_address: '',
  drop_current_floor: floorOptions[3].label,
  drop_lift_status: liftStatusOptions[0].label,
  // **** Freight Details ****
  freight_part_load: true,
  freight_full_load: false,
  lorry_type: '',
  freight_part_charge: '',
  freight_full_charge: '',
  // **** Packing Charge ****
  packing_charge: options[1],
  packing_charge_part_load: '',
  packing_charge_full_load: '',
  // **** Packing Material Charge ****
  packing_material_charge: options[1],
  packing_material_charge_part_load: '',
  packing_material_charge_full_load: '',
  // **** Loading Charge ****
  loading_charge: options[1],
  loading_charge_part_load: '',
  loading_charge_full_load: '',
  // **** Unloading Charge ****
  unloading_charge: options[1],
  unloading_charge_part_load: '',
  unloading_charge_full_load: '',
  // **** Unpacking Charge ****
  unpacking_charge: options[1],
  unpacking_charge_part_load: '',
  unpacking_charge_full_load: '',
  // **** Other Charges ****
  other_charges: [],
  advance_amount: '',
  // **** Surcharge ****
  surcharge: '',
  surcharge_percent: '',
  // **** Discount In Quotation
  discount_in_quotation: discountInQuotationOptions[2],
  discount_percent_or_value: '',
  // **** GST in Quotation
  gst_in_quotation: gstInQuotationOptions[3],
  gst_percent: '',
  gst_type: '',
  // **** Transit Insurance ****
  transit_insurance: options2[1],
  transit_shifting_luggage: '',
  transit_insurance_type: '',
  transit_insurance_charge: '',
  transit_insurance_gst: '',
  transit_goods_value: '',
  // **** Storage Charge ****
  storage: options2[1],
  storage_duration: '',
  storage_from_date: '',
  storage_to_date: '',
  storage_amount: '',
  // **** Other Details ****
  other_detail_1: '',
  other_detail_2: '',
  other_detail_3: '',
  other_detail_4: '',
  // **** Errors ****
  errors: {
    party_name: '',
    party_mobile_no: '',
    company_name: '',
    authority_mobile_no: '',
    employee_name: '',
    employee_mobile_no: '',
    pickup_pincode: '',
    drop_pincode: '',
  },
  validate_form: false,
  valid_form: false,
};

export const quotationReducer: Reducer<IState, IAction> = (
  state: IState,
  action: IAction,
) => {
  const {type, payload} = action;
  switch (type) {
    case ACTION.SHIFTING_TYPE:
      return {...state, shifting_type: payload as string};
    case ACTION.SHIFTING_LUGGAGE:
      return {...state, shifting_luggage: payload as string};
    case ACTION.QUOTATION_NO:
      return {...state, quotation_no: payload as string};
    case ACTION.DATE_OF_QUOTATION:
      return {...state, date_of_quotation: payload as string};
    case ACTION.DATE_OF_MOVING:
      return {...state, date_of_moving: payload as string};
    // **** Vehicle ****
    case ACTION.VEHICLE_TYPE:
      return {...state, vehicle_type: payload as string};
    case ACTION.VEHICLE_MANUFACTURER:
      return {...state, vehicle_manufacturer: payload as string};
    case ACTION.VEHICLE_MODEL:
      return {...state, vehicle_model: payload as string};
    // **** Billing ****
    case ACTION.BILLING_BY:
      return {...state, billing_by: payload as string};
    // **** Billing Individual ****
    case ACTION.PARTY_NAME:
      return {...state, party_name: payload as string};
    case ACTION.PARTY_MOBILE_NO:
      return {...state, party_mobile_no: payload as string};
    // **** Billing Company ****
    case ACTION.COMPANY_NAME:
      return {...state, company_name: payload as string};
    case ACTION.APPROVAL_AUTHORITY:
      return {...state, approval_authority: payload as string};
    case ACTION.AUTHORITY_PERSON_NAME:
      return {...state, authority_person_name: payload as string};
    case ACTION.AUTHORITY_MOBILE_NO:
      return {...state, authority_mobile_no: payload as string};
    case ACTION.COMPANY_GST:
      return {...state, company_gst: payload as string};
    case ACTION.EMPLOYEE_NAME:
      return {...state, employee_name: payload as string};
    case ACTION.EMPLOYEE_MOBILE_NO:
      return {...state, employee_mobile_no: payload as string};
    case ACTION.EMPLOYEE_DESIGNATION:
      return {...state, employee_designation: payload as string};
    case ACTION.COMPANY_ADDRESS:
      return {...state, company_address: payload as string};
    // **** Pickup Address ****
    case ACTION.PICKUP_PINCODE:
      return {...state, pickup_pincode: payload as string};
    case ACTION.PICKUP_STATE:
      return {...state, pickup_state: payload as string};
    case ACTION.PICKUP_CITY:
      return {...state, pickup_city: payload as string};
    case ACTION.PICKUP_ADDRESS:
      return {...state, pickup_address: payload as string};
    case ACTION.PICKUP_CURRENT_FLOOR:
      return {...state, pickup_current_floor: payload as string};
    case ACTION.PICKUP_LIFT_STATUS:
      return {...state, pickup_lift_status: payload as string};
    // **** Drop Address ****
    case ACTION.DROP_PINCODE:
      return {...state, drop_pincode: payload as string};
    case ACTION.DROP_STATE:
      return {...state, drop_state: payload as string};
    case ACTION.DROP_CITY:
      return {...state, drop_city: payload as string};
    case ACTION.DROP_ADDRESS:
      return {...state, drop_address: payload as string};
    case ACTION.DROP_CURRENT_FLOOR:
      return {...state, drop_current_floor: payload as string};
    case ACTION.DROP_LIFT_STATUS:
      return {...state, drop_lift_status: payload as string};
    // **** Freight Details ****
    case ACTION.FREIGHT_PART_LOAD:
      return {...state, freight_part_load: payload as boolean};
    case ACTION.FREIGHT_FULL_LOAD:
      return {...state, freight_full_load: payload as boolean};
    case ACTION.FREIGHT_PART_CHARGE:
      return {...state, freight_part_charge: payload as string};
    case ACTION.FREIGHT_FULL_CHARGE:
      return {...state, freight_full_charge: payload as string};
    case ACTION.LORRY_TYPE:
      return {...state, lorry_type: payload as string};
    // **** Packing Charge ****
    case ACTION.PACKING_CHARGE:
      return {...state, packing_charge: payload as string};
    case ACTION.PACKING_CHARGE_PART_LOAD:
      return {...state, packing_charge_part_load: payload as string};
    case ACTION.PACKING_CHARGE_FULL_LOAD:
      return {...state, packing_charge_full_load: payload as string};
    // **** Packing Material Charge ****
    case ACTION.PACKING_MATERIAL_CHARGE:
      return {...state, packing_material_charge: payload as string};
    case ACTION.PACKING_MATERIAL_CHARGE_PART_LOAD:
      return {...state, packing_material_charge_part_load: payload as string};
    case ACTION.PACKING_MATERIAL_CHARGE_FULL_LOAD:
      return {...state, packing_material_charge_full_load: payload as string};
    // **** Loading Charge ****
    case ACTION.LOADING_CHARGE:
      return {...state, loading_charge: payload as string};
    case ACTION.LOADING_CHARGE_PART_LOAD:
      return {...state, loading_charge_part_load: payload as string};
    case ACTION.LOADING_CHARGE_FULL_LOAD:
      return {...state, loading_charge_full_load: payload as string};
    // **** Unloading Charge ****
    case ACTION.UNLOADING_CHARGE:
      return {...state, unloading_charge: payload as string};
    case ACTION.UNLOADING_CHARGE_PART_LOAD:
      return {...state, unloading_charge_part_load: payload as string};
    case ACTION.UNLOADING_CHARGE_FULL_LOAD:
      return {...state, unloading_charge_full_load: payload as string};
    // **** Unpacking Charge ****
    case ACTION.UNPACKING_CHARGE:
      return {...state, unpacking_charge: payload as string};
    case ACTION.UNPACKING_CHARGE_PART_LOAD:
      return {...state, unpacking_charge_part_load: payload as string};
    case ACTION.UNPACKING_CHARGE_FULL_LOAD:
      return {...state, unpacking_charge_full_load: payload as string};
    // **** Other Charges ****
    case ACTION.OTHER_CHARGES:
      return {...state, other_charges: payload as IOtherCharge[]};
    case ACTION.ADVANCE_AMOUNT:
      return {...state, advance_amount: payload as string};
    // **** Discount In Quotation
    case ACTION.DISCOUNT_IN_QUOTATION:
      return {...state, discount_in_quotation: payload as string};
    case ACTION.DISCOUNT_PERCENT_OR_VALUE:
      return {...state, discount_percent_or_value: payload as string};
    // **** GST in Quotation
    case ACTION.GST_IN_QUOTATION:
      return {...state, gst_in_quotation: payload as string};
    case ACTION.GST_PERCENT:
      return {...state, gst_percent: payload as string};
    case ACTION.GST_TYPE:
      return {...state, gst_type: payload as string};
    // **** Transit Insurance ****
    case ACTION.TRANSIT_INSURANCE:
      return {...state, transit_insurance: payload as string};
    case ACTION.TRANSIT_SHIFTING_LUGGAGE:
      return {...state, transit_shifting_luggage: payload as string};
    case ACTION.TRANSIT_INSURANCE_TYPE:
      return {...state, transit_insurance_type: payload as string};
    case ACTION.TRANSIT_INSURANCE_PERCENT:
      return {...state, transit_insurance_charge: payload as string};
    case ACTION.TRANSIT_INSURANCE_GST_PERCENT:
      return {...state, transit_insurance_gst: payload as string};
    case ACTION.TRANSIT_GOODS_VALUE:
      return {...state, transit_goods_value: payload as string};
    // **** Surcharge ****
    case ACTION.SURCHARGE:
      return {...state, surcharge: payload as string};
    case ACTION.SURCHARGE_PERCENT:
      return {...state, surcharge_percent: payload as string};
    // **** Storage Charge ****
    case ACTION.STORAGE:
      return {...state, storage: payload as string};
    case ACTION.STORAGE_DURATION:
      return {...state, storage_duration: payload as string};
    case ACTION.STORAGE_FROM_DATE:
      return {...state, storage_from_date: payload as string};
    case ACTION.STORAGE_TO_DATE:
      return {...state, storage_to_date: payload as string};
    case ACTION.STORAGE_AMOUNT:
      return {...state, storage_amount: payload as string};
    // **** Other Details ****
    case ACTION.OTHER_DETAIL_1:
      return {...state, other_detail_1: payload as string};
    case ACTION.OTHER_DETAIL_2:
      return {...state, other_detail_2: payload as string};
    case ACTION.OTHER_DETAIL_3:
      return {...state, other_detail_3: payload as string};
    case ACTION.OTHER_DETAIL_4:
      return {...state, other_detail_4: payload as string};
    // **** RESET ACTIONS ****
    case ACTION.RESET_ALL_PART_LOAD:
      return {
        ...state,
        freight_part_load: false,
        freight_part_charge: '',
        packing_charge_part_load: '',
        packing_material_charge_part_load: '',
        loading_charge_part_load: '',
        unloading_charge_part_load: '',
        unpacking_charge_part_load: '',
      };
    case ACTION.RESET_ALL_FULL_LOAD:
      return {
        ...state,
        freight_full_load: false,
        freight_full_charge: '',
        packing_charge_full_load: '',
        packing_material_charge_full_load: '',
        loading_charge_full_load: '',
        unloading_charge_full_load: '',
        unpacking_charge_full_load: '',
      };
    case ACTION.PARTY_NAME_ERROR:
      return {
        ...state,
        errors: {...state.errors, party_name: payload as string},
      };
    case ACTION.PARTY_MOBILE_NO_ERROR:
      return {
        ...state,
        errors: {...state.errors, party_mobile_no: payload as string},
      };
    case ACTION.COMPANY_NAME_ERROR:
      return {
        ...state,
        errors: {...state.errors, company_name: payload as string},
      };
    case ACTION.EMPLOYEE_NAME_ERROR:
      return {
        ...state,
        errors: {...state.errors, employee_name: payload as string},
      };
    case ACTION.AUTHORITY_MOBILE_NO_ERROR:
      return {
        ...state,
        errors: {...state.errors, authority_mobile_no: payload as string},
      };
    case ACTION.EMPLOYEE_MOBILE_NO_ERROR:
      return {
        ...state,
        errors: {...state.errors, employee_mobile_no: payload as string},
      };
    case ACTION.PICKUP_PINCODE_ERROR:
      return {
        ...state,
        errors: {...state.errors, pickup_pincode: payload as string},
      };
    case ACTION.DROP_PINCODE_ERROR:
      return {
        ...state,
        errors: {...state.errors, drop_pincode: payload as string},
      };
    case ACTION.RESET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          party_name: '',
          party_mobile_no: '',
          company_name: '',
          employee_name: '',
          authority_mobile_no: '',
          employee_mobile_no: '',
          pickup_pincode: '',
          drop_pincode: '',
        },
      };
    case ACTION.VALIDATE_FORM:
      return {
        ...state,
        validate_form: payload as boolean,
      };
    case ACTION.VALID_FORM:
      return {
        ...state,
        valid_form: payload as boolean,
      };
    default:
      return state;
  }
};
