import {Reducer} from 'react';

//** ALL ACTIONS */
export enum ENQUIRY_FORM_ACTION {
  SHIFTING_TYPE = 'SHIFTING_TYPE',
  BILLING_BY = 'BILLING_BY',
  COMPANY_NAME_PARTY = 'COMPANY_NAME_PARTY',
  PARTY_NAME = 'PARTY_NAME',
  MOBILE_NUMBER = 'MOBILE_NUMBER',
  SHIFTING_LUGGAGE = 'SHIFTING_LUGGAGE',
  PICKUP_PINCODE = 'PICKUP_PINCODE',
  PICKUP_CITY = 'PICKUP_CITY',
  PICKUP_STATE = 'PICKUP_STATE',
  PICKUP_LOCALITY = 'PICKUP_LOCALITY',
  PICKUP_ADDRESS = 'PICKUP_ADDRESS',
  PICKUP_CURRENT_FLOOR = 'PICKUP_CURRENT_FLOOR',
  PICKUP_CURRENT_LIFT_STATUS = 'PICKUP_CURRENT_LIFT_STATUS',
  DELIVERY_PINCODE = 'DELIVERY_PINCODE',
  DELIVERY_CITY = 'DELIVERY_CITY',
  DELIVERY_STATE = 'DELIVERY_STATE',
  DELIVERY_LOCALITY = 'DELIVERY_LOCALITY',
  DELIVERY_ADDRESS = 'DELIVERY_ADDRESS',
  DELIVERY_CURRENT_FLOOR = 'DELIVERY_CURRENT_FLOOR',
  DELIVERY_CURRENT_LIFT_STATUS = 'DELIVERY_CURRENT_LIFT_STATUS',
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
};

// ** Billing By
export type TBillingBy = {
  billing_by: string;
  billing_info: TBillingInfo | null;
};

// ** Shifting Luggage
export type TShifingLuggage = {
  items: string[];
};

const defaultBillingBy: TBillingBy = {
  billing_by: 'Billing By Individual',
  billing_info: null,
}

/** ENQUIRY FORM STATE */
interface EnquiryFormState {
  shiftingType: string;
  billingBy: TBillingBy | null;
  companyNameParty: string;
  partyName: string;
  mobileNumber: string;
  shiftingLuggage: TShifingLuggage | null;
  pickupPincode: string;
  pickupCity: string;
  pickupState: string;
  pickupLocality: string;
  pickupAddress: string;
  pickupCurrentFloor: String;
  pickupCurrentLiftStatus: String;
  deliveryPincode: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryLocality: string;
  deliveryAddress: string;
  deliveryCurrentFloor: String;
  deliveryCurrentLiftStatus: String;
}

type TPayload = string | TBillingBy | TShifingLuggage;

/** ACTION INTERFACE */
interface EnquiryAction {
  type: ENQUIRY_FORM_ACTION;
  payload: TPayload;
}

/** INITIAL STATE */
export const initialState: EnquiryFormState = {
  shiftingType: 'Local',
  billingBy: defaultBillingBy,
  companyNameParty: '',
  shiftingLuggage: null,
  partyName: '',
  mobileNumber: '',
  pickupPincode: '',
  pickupCity: '',
  pickupState: '',
  pickupLocality: '',
  pickupAddress: '',
  pickupCurrentFloor: '',
  pickupCurrentLiftStatus: '',
  deliveryPincode: '',
  deliveryCity: '',
  deliveryState: '',
  deliveryLocality: '',
  deliveryAddress: '',
  deliveryCurrentFloor: '',
  deliveryCurrentLiftStatus: '',
};

/** Quotation Reducer */
export const enquiryReducer: Reducer<EnquiryFormState, EnquiryAction> = (
  state: EnquiryFormState,
  action: EnquiryAction,
) => {
  const {type, payload} = action;
  switch (type) {
    case ENQUIRY_FORM_ACTION.SHIFTING_TYPE:
      return {...state, shiftingType: payload as string};
    case ENQUIRY_FORM_ACTION.BILLING_BY:
      return {...state, billingBy: payload as TBillingBy};
    case ENQUIRY_FORM_ACTION.SHIFTING_LUGGAGE:
      return {...state, shiftingLuggage: payload as TShifingLuggage};
    case ENQUIRY_FORM_ACTION.COMPANY_NAME_PARTY:
      return {...state, companyNameParty: payload as string};
    case ENQUIRY_FORM_ACTION.PARTY_NAME:
      return {...state, partyName: payload as string};
    case ENQUIRY_FORM_ACTION.MOBILE_NUMBER:
      return {...state, mobileNumber: payload as string};
    case ENQUIRY_FORM_ACTION.PICKUP_PINCODE:
      return {...state, pickupPincode: payload as string};
    case ENQUIRY_FORM_ACTION.PICKUP_CITY:
      return {...state, pickupCity: payload as string};
    case ENQUIRY_FORM_ACTION.PICKUP_STATE:
      return {...state, pickupState: payload as string};
    case ENQUIRY_FORM_ACTION.PICKUP_LOCALITY:
      return {...state, pickupLocality: payload as string};
    case ENQUIRY_FORM_ACTION.PICKUP_ADDRESS:
      return {...state, pickupAddress: payload as string};
    case ENQUIRY_FORM_ACTION.PICKUP_CURRENT_FLOOR:
      return {...state, pickupCurrentFloor: payload as string};
    case ENQUIRY_FORM_ACTION.PICKUP_CURRENT_LIFT_STATUS:
      return {...state, pickupCurrentLiftStatus: payload as string};
    case ENQUIRY_FORM_ACTION.DELIVERY_PINCODE:
      return {...state, deliveryPincode: payload as string};
    case ENQUIRY_FORM_ACTION.DELIVERY_CITY:
      return {...state, deliveryCity: payload as string};
    case ENQUIRY_FORM_ACTION.DELIVERY_STATE:
      return {...state, deliveryState: payload as string};
    case ENQUIRY_FORM_ACTION.DELIVERY_LOCALITY:
      return {...state, deliveryLocality: payload as string};
    case ENQUIRY_FORM_ACTION.DELIVERY_ADDRESS:
      return {...state, deliveryAddress: payload as string};
    case ENQUIRY_FORM_ACTION.DELIVERY_CURRENT_FLOOR:
      return {...state, deliveryCurrentFloor: payload as string};
    case ENQUIRY_FORM_ACTION.DELIVERY_CURRENT_LIFT_STATUS:
      return {...state, deliveryCurrentLiftStatus: payload as string};
    default:
      return state;
  }
};
