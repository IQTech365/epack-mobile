import {Reducer} from 'react';

//** ALL ACTIONS */
export enum ENQUIRY_FORM_ACTION {
  SHIFTING_TYPE = 'SHIFTING_TYPE',
  BILLING_BY = 'BILLING_BY',
  COMPANY_NAME_PARTY = 'COMPANY_NAME_PARTY',
  PARTY_NAME = 'PARTY_NAME',
  MOBILE_NUMBER = 'MOBILE_NUMBER',
  SHIFTING_LUGGAGE = 'SHIFTING_LUGGAGE',
  PICKUP_ADDRESS = 'PICKUP_ADDRESS',
  DROP_ADDRESS = 'DROP_ADDRESS',
  PICKUP_PINCODE_ERROR = 'PICKUP_PINCODE_ERROR',
  DROP_PINCODE_ERROR = 'DROP_PINCODE_ERROR',
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

// ** Pickup Address info
export type TPickupAddressInfo = {
  shiftingFrom: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
  locality: string;
  landmark: string;
  floor: string;
  isLiftAvailable: string;
};

// ** Drop Address info
export type TDropAddressInfo = {
  shiftingTo: string;
  state: string;
  city: string;
  address: string;
  pincode: string;
  locality: string;
  landmark: string;
  floor: string;
  isLiftAvailable: string;
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
  billing_by: 'by Individual',
  billing_info: null,
};

const defaultPickupAddress: TPickupAddressInfo = {
  shiftingFrom: '',
  state: '',
  city: '',
  address: '',
  pincode: '',
  locality: '',
  landmark: '',
  floor: 'Ground Floor',
  isLiftAvailable: 'Yes',
};

const defaultDropAddress: TDropAddressInfo = {
  shiftingTo: '',
  state: '',
  city: '',
  address: '',
  pincode: '',
  locality: '',
  landmark: '',
  floor: 'Ground Floor',
  isLiftAvailable: 'Yes',
};

/** ENQUIRY FORM STATE */
interface EnquiryFormState {
  shiftingType: string;
  billingBy: TBillingBy | null;
  partyCompanyName: string;
  partyName: string;
  mobile: string;
  shiftingLuggage: string[] | [];
  pickupAddress: TPickupAddressInfo | null;
  dropAddress: TDropAddressInfo | null;
  errors: {
    pickupPincode: string;
    dropPincode: string;
  };
}

type TPayload =
  | string
  | TBillingBy
  | [string]
  | TPickupAddressInfo
  | TDropAddressInfo;

/** ACTION INTERFACE */
interface EnquiryAction {
  type: ENQUIRY_FORM_ACTION;
  payload: TPayload;
}

/** INITIAL STATE */
export const initialState: EnquiryFormState = {
  shiftingType: 'Local',
  billingBy: defaultBillingBy,
  partyCompanyName: '',
  shiftingLuggage: ['Household'],
  partyName: '',
  mobile: '',
  pickupAddress: defaultPickupAddress,
  dropAddress: defaultDropAddress,
  errors: {
    pickupPincode: '',
    dropPincode: '',
  },
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
      return {...state, shiftingLuggage: payload as [string]};
    case ENQUIRY_FORM_ACTION.COMPANY_NAME_PARTY:
      return {...state, partyCompanyName: payload as string};
    case ENQUIRY_FORM_ACTION.PARTY_NAME:
      return {...state, partyName: payload as string};
    case ENQUIRY_FORM_ACTION.MOBILE_NUMBER:
      return {...state, mobile: payload as string};
    case ENQUIRY_FORM_ACTION.PICKUP_ADDRESS:
      return {...state, pickupAddress: payload as TPickupAddressInfo};
    case ENQUIRY_FORM_ACTION.DROP_ADDRESS:
      return {...state, dropAddress: payload as TDropAddressInfo};
    case ENQUIRY_FORM_ACTION.PICKUP_PINCODE_ERROR:
      return {...state, pickupPincode: payload as string};
    case ENQUIRY_FORM_ACTION.DROP_PINCODE_ERROR:
      return {...state, dropPincode: payload as string};
    default:
      return state;
  }
};
