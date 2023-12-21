import {Reducer} from 'react';
import entityOptions from '../../../../../data/entityOptions.json';
export enum ACTION {
  ENTITY = 'ENTITY',
  SUB_ENTITY = 'SUB_ENTITY',
  DRIVER_NAME = 'DRIVER_NAME',
  DRIVER_PHOTO = 'DRIVER_PHOTO',
  DRIVER_MOBILE_NO = 'DRIVER_MOBILE_NO',
  DRIVER_LICENSE_NO = 'DRIVER_LICENSE_NO',
  LICENSE_PHOTO = 'LICENSE_PHOTO',
  AADHAR_CARD_NO = 'AADHAR_CARD_NO',
  AADHAR_FRONT_PHOTO = 'AADHAR_FRONT_PHOTO',
  AADHAR_BACK_PHOTO = 'AADHAR_BACK_PHOTO',
  PERMANENT_ADD_PINCODE = 'PERMANENT_ADD_PINCODE',
  PERMANENT_ADD_STATE = 'PERMANENT_ADD_STATE',
  PERMANENT_ADD_CITY = 'PERMANENT_ADD_CITY',
  PERMANENT_ADD_LOCALITY = 'PERMANENT_ADD_LOCALITY',
  PERMANENT_ADD_ADDRESS = 'PERMANENT_ADD_ADDRESS',
  IS_CURRENT_ADD_SAME_AS_PERMANENT = 'IS_CURRENT_ADD_SAME_AS_PERMANENT',
  CURRENT_ADD_PINCODE = 'CURRENT_ADD_PINCODE',
  CURRENT_ADD_STATE = 'CURRENT_ADD_STATE',
  CURRENT_ADD_CITY = 'CURRENT_ADD_CITY',
  CURRENT_ADD_LOCALITY = 'CURRENT_ADD_LOCALITY',
  CURRENT_ADD_ADDRESS = 'CURRENT_ADD_ADDRESS',
}

export interface IState {
  entity: string;
  sub_entity: string;
  driver_name: string;
  driver_photo: string;
  driver_mobile_no: string;
  driver_license_no: string;
  license_photo: string;
  aadhar_card_no: string;
  aadhar_front_photo: string;
  aadhar_back_photo: string;
  permanent_add_pincode: string;
  permanent_add_state: string;
  permanent_add_city: string;
  permanent_add_locality: string;
  permanent_add_address: string;
  is_current_add_same_as_permanent: boolean;
  current_add_pincode: string;
  current_add_state: string;
  current_add_city: string;
  current_add_locality: string;
  current_add_address: string;
}

export interface Action {
  type: ACTION;
  payload: string | boolean;
}

export const initialState: IState = {
  entity: entityOptions[0].label,
  sub_entity: '',
  driver_name: '',
  driver_photo: '',
  driver_mobile_no: '',
  driver_license_no: '',
  license_photo: '',
  aadhar_card_no: '',
  aadhar_front_photo: '',
  aadhar_back_photo: '',
  permanent_add_pincode: '',
  permanent_add_state: '',
  permanent_add_city: '',
  permanent_add_locality: '',
  permanent_add_address: '',
  is_current_add_same_as_permanent: true,
  current_add_pincode: '',
  current_add_state: '',
  current_add_city: '',
  current_add_locality: '',
  current_add_address: '',
};

export const addDriverReducer: Reducer<IState, Action> = (
  state: IState,
  action: Action,
) => {
  const {type, payload} = action;
  switch (type) {
    case ACTION.ENTITY:
      return {...state, entity: payload as string};
    case ACTION.SUB_ENTITY:
      return {...state, sub_entity: payload as string};
    case ACTION.DRIVER_NAME:
      return {...state, driver_name: payload as string};
    case ACTION.DRIVER_PHOTO:
      return {...state, driver_photo: payload as string};
    case ACTION.DRIVER_MOBILE_NO:
      return {...state, driver_mobile_no: payload as string};
    case ACTION.DRIVER_LICENSE_NO:
      return {...state, driver_license_no: payload as string};
    case ACTION.LICENSE_PHOTO:
      return {...state, license_photo: payload as string};
    case ACTION.AADHAR_CARD_NO:
      return {...state, aadhar_card_no: payload as string};
    case ACTION.AADHAR_FRONT_PHOTO:
      return {...state, aadhar_front_photo: payload as string};
    case ACTION.AADHAR_BACK_PHOTO:
      return {...state, aadhar_back_photo: payload as string};
    case ACTION.PERMANENT_ADD_PINCODE:
      return {...state, permanent_add_pincode: payload as string};
    case ACTION.PERMANENT_ADD_STATE:
      return {...state, permanent_add_state: payload as string};
    case ACTION.PERMANENT_ADD_CITY:
      return {...state, permanent_add_city: payload as string};
    case ACTION.PERMANENT_ADD_LOCALITY:
      return {...state, permanent_add_locality: payload as string};
    case ACTION.PERMANENT_ADD_ADDRESS:
      return {...state, permanent_add_address: payload as string};
    case ACTION.IS_CURRENT_ADD_SAME_AS_PERMANENT:
      return {...state, is_current_add_same_as_permanent: payload as boolean};
    case ACTION.CURRENT_ADD_PINCODE:
      return {...state, current_add_pincode: payload as string};
    case ACTION.CURRENT_ADD_STATE:
      return {...state, current_add_state: payload as string};
    case ACTION.CURRENT_ADD_CITY:
      return {...state, current_add_city: payload as string};
    case ACTION.CURRENT_ADD_LOCALITY:
      return {...state, current_add_locality: payload as string};
    case ACTION.CURRENT_ADD_ADDRESS:
      return {...state, current_add_address: payload as string};
    default:
      return state;
  }
};
