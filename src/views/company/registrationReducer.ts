import {Reducer} from 'react';

// ** ALL ACTIONS
export enum COMPANY_REGISTRATION_ACTION {
  COMPANY_NAME = 'COMPANY_NAME',
  CONTACT_PERSON = 'CONTACT_PERSON',
  EMAIL = 'EMAIL',
  PIN_CODE = 'PIN_CODE',
  MOBILE = 'MOBILE',
  CITY = 'CITY',
  STATE = 'STATE',
  ADDRESS = 'ADDRESS',
  SHIFTING_LUGGAGE = 'SHIFTING_LUGGAGE',
  IBA_APPROVAL_CODE = 'IBA_APPROVAL_CODE',
  IBA_CODE_VALID_TILL = 'IBA_CODE_VALID_TILL',
  COMPANY_TYPE = 'COMPANY_TYPE',
  DOCUMENT = 'DOCUMENT',
  COMPANY_LOGO = 'COMPANY_LOGO',
  OWNER_SIGNATURE = 'OWNER_SIGNATURE',
  DOCUMENT_SERIAL_NUMBERS = 'DOCUMENT_SERIAL_NUMBERS',
  DOCUMENT_TEMPLATES = 'DOCUMENT_TEMPLATES',
  // Errors
  PINCODE_ERROR = 'PINCODE_ERROR',
  COMPANY_NAME_ERROR = 'COMPANY_NAME_ERROR',
  CONTACT_PERSON_ERROR = 'CONTACT_PERSON_ERROR',
  EMAIL_ERROR = 'EMAIL_ERROR',
  MOBILE_ERROR = 'MOBILE_ERROR',
  CITY_ERROR = 'CITY_ERROR',
  STATE_ERROR = 'STATE_ERROR',
  ADDRESS_ERROR = 'ADDRESS_ERROR',
  SHIFTING_LUGGAGE_ERROR = 'SHIFTING_LUGGAGE_ERROR',
  IBA_APPROVAL_CODE_ERROR = 'IBA_APPROVAL_CODE_ERROR',
  IBA_CODE_VALID_TILL_ERROR = 'IBA_CODE_VALID_TILL_ERROR',
  COMPANY_TYPE_ERROR = 'COMPANY_TYPE_ERROR',
  DOCUMENT_ERROR = 'DOCUMENT_ERROR',
  COMPANY_LOGO_ERROR = 'COMPANY_LOGO_ERROR',
  OWNER_SIGNATURE_ERROR = 'OWNER_SIGNATURE_ERROR',
  DOCUMENT_SERIAL_NUMBERS_ERROR = 'DOCUMENT_SERIAL_NUMBERS_ERROR',
  DOCUMENT_TEMPLATES_ERROR = 'DOCUMENT_TEMPLATES_ERROR',
}

export interface IDocumentSerialNo {
  quotation: string;
  invoice: string;
  bilty: string;
  car_condition: string;
  money_receipt: string;
}

interface ITemplate {
  planType: string;
  templateId: string;
}

export interface IDocumentTemplate {
  quotation: ITemplate;
  invoice: ITemplate;
  bilty: ITemplate;
  car_condition: ITemplate;
  money_receipt: ITemplate;
}

// ** REDUCER STATE INTERFACE
export interface ICompanyRegistrationState {
  companyName: string;
  contactPerson: string;
  email: string;
  mobile: string;
  pinCode: string;
  city: string;
  state: string;
  address: string;
  shiftingLuggage: string;
  ibaApprovalCode: string;
  ibaApprovalValidTill: string;
  companyType: string;
  document: string;
  companyLogo: string;
  ownerSignature: string;
  documentSerialNumbers: IDocumentSerialNo | null;
  documentTemplates: IDocumentTemplate | null;
  errors: {
    companyName: string;
    contactPerson: string;
    email: string;
    mobile: string;
    pinCode: string;
    city: string;
    state: string;
    address: string;
    shiftingLuggage: string;
    ibaApprovalCode: string;
    ibaApprovalValidTill: string;
    companyType: string;
    document: string;
    companyLogo: string;
    ownerSignature: string;
    documentSerialNumbers: string;
    documentTemplates: string;
  };
}

type TPayload = string | IDocumentSerialNo | IDocumentTemplate;

/** ACTION INTERFACE */
export interface ICompanyRegistrationAction {
  type: COMPANY_REGISTRATION_ACTION;
  payload: TPayload;
}

// ** INITIAL STATE
export const initialState: ICompanyRegistrationState = {
  companyName: '',
  contactPerson: '',
  email: '',
  mobile: '',
  pinCode: '',
  city: '',
  state: '',
  address: '',
  shiftingLuggage: '',
  ibaApprovalCode: '',
  ibaApprovalValidTill: '',
  companyType: '',
  document: '',
  companyLogo: '',
  ownerSignature: '',
  documentSerialNumbers: null,
  documentTemplates: null,
  errors: {
    companyName: '',
    contactPerson: '',
    email: '',
    mobile: '',
    pinCode: '',
    city: '',
    state: '',
    address: '',
    shiftingLuggage: '',
    ibaApprovalCode: '',
    ibaApprovalValidTill: '',
    companyType: '',
    document: '',
    companyLogo: '',
    ownerSignature: '',
    documentSerialNumbers: '',
    documentTemplates: '',
  },
};

// ** COMPANY REGISTRATION REDUCER
export const companyRegistrationReducer: Reducer<
  ICompanyRegistrationState,
  ICompanyRegistrationAction
> = (state: ICompanyRegistrationState, action: ICompanyRegistrationAction) => {
  const {type, payload} = action;
  switch (type) {
    case COMPANY_REGISTRATION_ACTION.COMPANY_NAME:
      return {...state, companyName: payload as string};
    case COMPANY_REGISTRATION_ACTION.CONTACT_PERSON:
      return {...state, contactPerson: payload as string};
    case COMPANY_REGISTRATION_ACTION.EMAIL:
      return {...state, email: payload as string};
    case COMPANY_REGISTRATION_ACTION.MOBILE:
      return {...state, email: payload as string};
    case COMPANY_REGISTRATION_ACTION.PIN_CODE:
      return {...state, pinCode: payload as string};
    case COMPANY_REGISTRATION_ACTION.CITY:
      return {...state, city: payload as string};
    case COMPANY_REGISTRATION_ACTION.STATE:
      return {...state, state: payload as string};
    case COMPANY_REGISTRATION_ACTION.ADDRESS:
      return {...state, address: payload as string};
    case COMPANY_REGISTRATION_ACTION.SHIFTING_LUGGAGE:
      return {...state, shiftingLuggage: payload as string};
    case COMPANY_REGISTRATION_ACTION.IBA_APPROVAL_CODE:
      return {...state, ibaApprovalCode: payload as string};
    case COMPANY_REGISTRATION_ACTION.IBA_CODE_VALID_TILL:
      return {...state, ibaApprovalValidTill: payload as string};
    case COMPANY_REGISTRATION_ACTION.COMPANY_TYPE:
      return {...state, companyType: payload as string};
    case COMPANY_REGISTRATION_ACTION.DOCUMENT:
      return {...state, document: payload as string};
    case COMPANY_REGISTRATION_ACTION.COMPANY_LOGO:
      return {...state, companyLogo: payload as string};
    case COMPANY_REGISTRATION_ACTION.OWNER_SIGNATURE:
      return {...state, ownerSignature: payload as string};
    case COMPANY_REGISTRATION_ACTION.DOCUMENT_SERIAL_NUMBERS:
      return {...state, documentSerialNumbers: payload as IDocumentSerialNo};
    case COMPANY_REGISTRATION_ACTION.DOCUMENT_TEMPLATES:
      return {...state, documentTemplates: payload as IDocumentTemplate};
    //Errors
    case COMPANY_REGISTRATION_ACTION.PINCODE_ERROR:
      return {
        ...state,
        errors: {...state.errors, pinCode: payload as string},
      };
    case COMPANY_REGISTRATION_ACTION.COMPANY_NAME_ERROR:
      return {
        ...state,
        errors: {...state.errors, companyName: payload as string},
      };
    case COMPANY_REGISTRATION_ACTION.CONTACT_PERSON_ERROR:
      return {
        ...state,
        errors: {...state.errors, contactPerson: payload as string},
      };
    case COMPANY_REGISTRATION_ACTION.MOBILE_ERROR:
      return {
        ...state,
        errors: {...state.errors, mobile: payload as string},
      };
    case COMPANY_REGISTRATION_ACTION.EMAIL_ERROR:
      return {
        ...state,
        errors: {...state.errors, email: payload as string},
      };
    case COMPANY_REGISTRATION_ACTION.STATE_ERROR:
      return {
        ...state,
        errors: {...state.errors, state: payload as string},
      };
    case COMPANY_REGISTRATION_ACTION.CITY_ERROR:
      return {
        ...state,
        errors: {...state.errors, city: payload as string},
      };
    case COMPANY_REGISTRATION_ACTION.ADDRESS_ERROR:
      return {
        ...state,
        errors: {...state.errors, address: payload as string},
      };
    case COMPANY_REGISTRATION_ACTION.IBA_APPROVAL_CODE_ERROR:
      return {
        ...state,
        errors: {...state.errors, ibaApprovalCode: payload as string},
      };
    case COMPANY_REGISTRATION_ACTION.IBA_CODE_VALID_TILL_ERROR:
      return {
        ...state,
        errors: {...state.errors, ibaApprovalValidTill: payload as string},
      };
    case COMPANY_REGISTRATION_ACTION.COMPANY_TYPE_ERROR:
      return {
        ...state,
        errors: {...state.errors, companyType: payload as string},
      };
    case COMPANY_REGISTRATION_ACTION.DOCUMENT_ERROR:
      return {
        ...state,
        errors: {...state.errors, document: payload as string},
      };
    default:
      return state;
  }
};
