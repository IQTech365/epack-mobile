import {Reducer} from 'react';

export enum ACTION {
  SHIFTING_TYPE = 'SHIFTING_TYPE',
  DATE_OF_MOVING = 'DATE_OF_MOVING',
  BILLING_BY = 'BILLING_BY',
  // Individual
  PARTY_NAME = 'PARTY_NAME',
  PARTY_MOBILE_NO = 'PARTY_MOBILE_NO',
  // Company
  COMPANY_NAME = 'COMPANY_NAME',
  APPROVAL_AUTHORITY = 'APPROVAL_AUTHORITY',
  AUTHORITY_PERSON_NAME = 'AUTHORITY_PERSON_NAME',
  AUTHORITY_MOBILE_NUMBER = 'AUTHORITY_MOBILE_NUMBER',
  COMPANY_GST = 'COMPANY_GST',
  EMPLOYEE_NAME = 'EMPLOYEE_NAME',
  EMPLOYEE_DESIGNATION = 'EMPLOYEE_DESIGNATION',
  EMPLOYEE_MOBILE_NUMBER = 'EMPLOYEE_MOBILE_NUMBER',
  COMPANY_ADDRESS = 'COMPANY_ADDRESS',
  // Amount
  ORDER_AMOUNT = 'ORDER_AMOUNT',
  TOKEN_AMOUNT = 'TOKEN_AMOUNT',
  SHIFTING_LUGGAGE = 'SHIFTING_LUGGAGE',
  // Pickup Address `P = Pickup Address`
  P_PINCODE = 'P_PINCODE',
  P_STATE = 'P_STATE',
  P_CITY = 'P_CITY',
  P_ADDRESS = 'P_ADDRESS',
  P_CURRENT_FLOOR = 'P_CURRENT_FLOOR',
  P_LIFT_STATUS = 'P_LIFT_STATUS',
  // Drop Address `D = Drop Address`
  D_PINCODE = 'D_PINCODE',
  D_STATE = 'D_STATE',
  D_CITY = 'D_CITY',
  D_ADDRESS = 'D_ADDRESS',
  D_CURRENT_FLOOR = 'D_CURRENT_FLOOR',
  D_LIFT_STATUS = 'D_LIFT_STATUS',
}

export interface IState {
  shifting_type: string;
  date_of_moving: string;
  billing_by: string;
  //Individual
  party_name: string;
  party_mobile_no: string;
  //Company
  company_name: string;
  approval_authority: string;
  authority_person_name: string;
  authority_mobile_no: string;
  company_gst: string;
  employee_name: string;
  employee_designation: string;
  employee_mobile_no: string;
  company_address: string;
  //Amount
  order_amount: string;
  token_amount: string;
  shifting_luggages: string[];
  //Pickup
  p_pincode: string;
  p_state: string;
  p_city: string;
  p_address: string;
  p_current_floor: string;
  p_lift_status: string;
  //Drop
  d_pincode: string;
  d_state: string;
  d_city: string;
  d_address: string;
  d_current_floor: string;
  d_lift_status: string;
}

export interface IAction {
  type: ACTION;
  payload: string | string[];
}

export const initialState: IState = {
  shifting_type: '',
  date_of_moving: '',
  billing_by: '',
  //Individual
  party_name: '',
  party_mobile_no: '',
  //Company
  company_name: '',
  approval_authority: '',
  authority_person_name: '',
  authority_mobile_no: '',
  company_gst: '',
  employee_name: '',
  employee_designation: '',
  employee_mobile_no: '',
  company_address: '',
  //Amount
  order_amount: '',
  token_amount: '',
  shifting_luggages: [],
  //Pickup
  p_pincode: '',
  p_state: '',
  p_city: '',
  p_address: '',
  p_current_floor: '',
  p_lift_status: '',
  //Drop
  d_pincode: '',
  d_state: '',
  d_city: '',
  d_address: '',
  d_current_floor: '',
  d_lift_status: '',
};

export const addOrderReducer: Reducer<IState, IAction> = (
  state: IState,
  action: IAction,
) => {
  const {type, payload} = action;
  switch (type) {
    case ACTION.SHIFTING_TYPE:
      return {...state, shifting_type: payload as string};
    case ACTION.DATE_OF_MOVING:
      return {...state, date_of_moving: payload as string};
    case ACTION.BILLING_BY:
      return {...state, billing_by: payload as string};
    // Billing Individual
    case ACTION.PARTY_NAME:
      return {...state, party_name: payload as string};
    case ACTION.PARTY_MOBILE_NO:
      return {...state, party_mobile_no: payload as string};
    // Billing Company
    case ACTION.COMPANY_NAME:
      return {...state, company_name: payload as string};
    case ACTION.APPROVAL_AUTHORITY:
      return {...state, approval_authority: payload as string};
    case ACTION.AUTHORITY_PERSON_NAME:
      return {...state, authority_person_name: payload as string};
    case ACTION.AUTHORITY_MOBILE_NUMBER:
      return {...state, authority_mobile_no: payload as string};
    case ACTION.COMPANY_GST:
      return {...state, company_gst: payload as string};
    case ACTION.EMPLOYEE_NAME:
      return {...state, employee_name: payload as string};
    case ACTION.EMPLOYEE_DESIGNATION:
      return {...state, employee_designation: payload as string};
    case ACTION.EMPLOYEE_MOBILE_NUMBER:
      return {...state, employee_mobile_no: payload as string};
    case ACTION.COMPANY_ADDRESS:
      return {...state, company_address: payload as string};
    // Amount
    case ACTION.ORDER_AMOUNT:
      return {...state, order_amount: payload as string};
    case ACTION.TOKEN_AMOUNT:
      return {...state, token_amount: payload as string};
    case ACTION.SHIFTING_LUGGAGE:
      return {...state, shifting_luggages: payload as string[]};
    // Pickup Address
    case ACTION.P_PINCODE:
      return {...state, p_pincode: payload as string};
    case ACTION.P_STATE:
      return {...state, p_state: payload as string};
    case ACTION.P_CITY:
      return {...state, p_city: payload as string};
    case ACTION.P_ADDRESS:
      return {...state, p_address: payload as string};
    case ACTION.P_CURRENT_FLOOR:
      return {...state, p_current_floor: payload as string};
    case ACTION.P_LIFT_STATUS:
      return {...state, p_lift_status: payload as string};
    // Drop Address
    case ACTION.D_PINCODE:
      return {...state, d_pincode: payload as string};
    case ACTION.D_STATE:
      return {...state, d_state: payload as string};
    case ACTION.D_CITY:
      return {...state, d_city: payload as string};
    case ACTION.D_ADDRESS:
      return {...state, d_address: payload as string};
    case ACTION.D_CURRENT_FLOOR:
      return {...state, d_current_floor: payload as string};
    case ACTION.D_LIFT_STATUS:
      return {...state, d_lift_status: payload as string};
    default:
      return state;
  }
};
