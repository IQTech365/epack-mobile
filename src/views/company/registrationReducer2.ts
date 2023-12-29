import {Reducer} from 'react';
import { ibaApprovalOptions } from './utils';
import companyTypeOptions from '../../data/companyType.json';
export enum ACTION {
  COMPANY_NAME = 'COMPANY_NAME',
  CONTACT_PERSON = 'CONTACT_PERSON',
  EMAIL = 'EMAIL',
  PINCODE = 'PINCODE',
  MOBILE = 'MOBILE',
  CITY = 'CITY',
  STATE = 'STATE',
  ADDRESS = 'ADDRESS',
  IBA_APPROVAL_STATUS = 'IBA_APPROVAL_STATUS',
  IBA_APPROVAL_CODE = 'IBA_APPROVAL_CODE',
  IBA_EXPIRY_DATE = 'IBA_EXPIRY_DATE',
  COMPANY_TYPE = 'COMPANY_TYPE',
  GOVT_DOCUMENT = 'GOVT_DOCUMENT',
  COMPANY_LOGO_URL = 'COMPANY_LOGO_URL',
  COMPANY_SIGNATURE_URL = 'COMPANY_SIGNATURE_URL',
}

export interface IState {
  company_name: string;
  contact_person: string;
  mobile: string;
  email: string;
  pincode: string;
  state: string;
  city: string;
  address: string;
  iba_approval_status: string;
  iba_approval_code:string;
  iba_expiry_date: string;
  company_type: string;
  govt_document: string;
  company_logo_url: string;
  company_signature_url: string;
}

export interface IAction {
  type: ACTION;
  payload: string;
}

export const initialState: IState = {
  company_name: '',
  contact_person: '',
  mobile: '',
  email: '',
  pincode: '',
  state: '',
  city: '',
  address: '',
  iba_approval_status: ibaApprovalOptions[0],
  iba_approval_code: '',
  iba_expiry_date: '',
  company_type: companyTypeOptions[0].label,
  govt_document: '',
  company_logo_url: '',
  company_signature_url: '',
};

export const registrationReducer: Reducer<IState, IAction> = (
  state: IState,
  action: IAction,
) => {
  const {type, payload} = action;
  switch (type) {
    case ACTION.COMPANY_NAME:
      return {...state, company_name: payload as string};
    case ACTION.CONTACT_PERSON:
      return {...state, contact_person: payload as string};
    case ACTION.MOBILE:
      return {...state, mobile: payload as string};
    case ACTION.EMAIL:
      return {...state, email: payload as string};
    case ACTION.PINCODE:
      return {...state, pincode: payload as string};
    case ACTION.STATE:
      return {...state, state: payload as string};
    case ACTION.CITY:
      return {...state, city: payload as string};
    case ACTION.ADDRESS:
      return {...state, address: payload as string};
    case ACTION.IBA_APPROVAL_STATUS:
      return {...state, iba_approval_status: payload as string};
    case ACTION.IBA_APPROVAL_CODE:
      return {...state, iba_approval_code: payload as string};
    case ACTION.IBA_EXPIRY_DATE:
      return {...state, iba_expiry_date: payload as string};
    case ACTION.COMPANY_TYPE:
      return {...state, company_type: payload as string};
    case ACTION.GOVT_DOCUMENT:
      return {...state, govt_document: payload as string};
    case ACTION.COMPANY_LOGO_URL:
      return {...state, company_logo_url: payload as string};
    case ACTION.COMPANY_SIGNATURE_URL:
      return {...state, company_signature_url: payload as string};
    default:
      return state;
  }
};
