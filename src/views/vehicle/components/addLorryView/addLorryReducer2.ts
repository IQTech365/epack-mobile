import {Reducer} from 'react';

export enum ACTION {
  ENTITY = 'ENTITY',
  SUB_ENTITY = 'SUB_ENTITY',
  LORRY_COMPANY_NAME = 'LORRY_COMPANY_NAME',
  LORRY_TYPE = 'LORRY_TYPE',
  REG_NUMBER = 'REG_NUMBER',
  VEHICLE_MODEL = 'VEHICLE_MODEL',
  MANUFACTURING_YEAR = 'MANUFACTURING_YEAR',
  VEHICLE_CHASIS_NO = 'VEHICLE_CHASIS_NO',
  VEHICLE_ENGINE_NO = 'VEHICLE_ENGINE_NO',
  VEHICLE_RC_NO = 'VEHICLE_RC_NO',
  VEHICLE_RC_PHOTO = 'VEHICLE_RC_PHOTO',
  POLLUTION_CERTIFICATE_NO = 'POLLUTION_CERTIFICATE_NO',
  POLLUTION_CERTIFICATE_RENEWWAL_DATE = 'POLLUTION_CERTIFICATE_RENEWWAL_DATE',
  POLLUTION_CERTIFICATE_PHOTO = 'POLLUTION_CERTIFICATE_PHOTO',
  PERMIT_NO = 'PERMIT_NO',
  PERMIT_NO_RENEWAL_DATE = 'PERMIT_NO_RENEWAL_DATE',
  PERMIT_PHOTO = 'PERMIT_PHOTO',
}

export interface IState {
  entity: string;
  sub_entity: string;
  lorry_company_name: string;
  lorry_type: string;
  reg_number: string;
  vehicle_model:string;
  manufacturing_year: string;
  vehicle_chasis_no: string;
  vehicle_engine_no: string;
  vehicle_rc_no: string;
  vehicle_rc_photo: string;
  pollution_certificate_no: string;
  pollution_certificate_renewal_date: string;
  pollution_certificate_photo: string;
  permit_no: string;
  permit_no_renewal_date: string;
  permit_photo: string;
}

export const initialState: IState = {
  entity: '',
  sub_entity: '',
  lorry_company_name: '',
  lorry_type: '',
  reg_number: '',
  vehicle_model: '',
  manufacturing_year: '',
  vehicle_chasis_no: '',
  vehicle_engine_no: '',
  vehicle_rc_no: '',
  vehicle_rc_photo: '',
  pollution_certificate_no: '',
  pollution_certificate_renewal_date: '',
  pollution_certificate_photo: '',
  permit_no: '',
  permit_no_renewal_date: '',
  permit_photo: '',
};

export interface Action {
  type: ACTION;
  payload: string;
}

export const addLorryReducer: Reducer<IState, Action> = (
  state: IState,
  action: Action,
) => {
  const {type, payload} = action;
  switch (type) {
    case ACTION.ENTITY:
      return {...state, entity: payload as string};
    case ACTION.SUB_ENTITY:
      return {...state, sub_entity: payload as string};
    case ACTION.LORRY_COMPANY_NAME:
      return {...state, lorry_company_name: payload as string};
    case ACTION.LORRY_TYPE:
      return {...state, lorry_type: payload as string};
    case ACTION.REG_NUMBER:
      return {...state, reg_number: payload as string};
    case ACTION.VEHICLE_MODEL:
      return {...state, vehicle_model: payload as string};
    case ACTION.MANUFACTURING_YEAR:
      return {...state, manufacturing_year: payload as string};
    case ACTION.VEHICLE_CHASIS_NO:
      return {...state, vehicle_chasis_no: payload as string};
    case ACTION.VEHICLE_ENGINE_NO:
      return {...state, vehicle_engine_no: payload as string};
    case ACTION.VEHICLE_RC_NO:
      return {...state, vehicle_rc_no: payload as string};
    case ACTION.VEHICLE_RC_PHOTO:
      return {...state, vehicle_rc_photo: payload as string};
    case ACTION.POLLUTION_CERTIFICATE_NO:
      return {...state, pollution_certificate_no: payload as string};
    case ACTION.POLLUTION_CERTIFICATE_PHOTO:
      return {...state, pollution_certificate_photo: payload as string};
    case ACTION.POLLUTION_CERTIFICATE_RENEWWAL_DATE:
      return {...state, pollution_certificate_renewal_date: payload as string};
    case ACTION.PERMIT_NO:
      return {...state, permit_no: payload as string};
    case ACTION.PERMIT_NO_RENEWAL_DATE:
      return {...state, permit_no_renewal_date: payload as string};
    case ACTION.PERMIT_PHOTO:
      return {...state, permit_photo: payload as string};
    default:
      return state;
  }
};
