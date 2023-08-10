//** ALL ACTIONS*/

export enum ADDORDER_FORM_ACTION {
  SHIFTING_TYPE = 'SHIFTING_TYPE',
  DATE_OF_MOVING = 'DATE_OF_MOVING',
  PARTY_NAME = 'PARTY_NAME',
  MOBILE = 'MOBILE',
  PARTY_COMPANY_NAME = 'PARTY_COMPANY_NAME',
  ORDER_AMOUNT = 'ORDER_AMOUNT',
  TOKEN_AMOUNT = 'TOKEN_AMOUNT',
  SHIFTING_LUGGAGE = 'SHIFTING_LUGGAGE',
  DATE_OF_QUOTATION = 'DATE_OF_QUOTATION',
  PICKUP_PINCODE = 'PICKUP_PINCODE',
  PICKUP_CITY = ' PICKUP_CITY',
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
}

/** ADD ORDER FORM STATE */

interface IAddorderFormState {
  shiftingType: string;
  dateOfMoving: string;
  partyName: string;
  mobile: string;
  partyCompanyName: string;
  orderAmount: string;
  tokenAmount: string;
  shiftingLuggage: [string];
  dateOfQuotation: string;
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
}

/** ACTION INTERFACE */

interface IAddorderFormAction {
  type: ADDORDER_FORM_ACTION;
  payload: string | [string];
}

/** INITIAL STATE */

export const initialState: IAddorderFormState = {
  shiftingType: '',
  dateOfMoving: '',
  partyName: '',
  mobile: '',
  partyCompanyName: '',
  orderAmount: '',
  tokenAmount: '',
  shiftingLuggage: [''],
  dateOfQuotation: '',
  pickupPincode: '',
  pickupCity: '',
  pickupState: '',
  pickupLocality: '',
  pickupAddress: '',
  pickupCurrentFloor: '',
  pickupLiftStatus: '',
  deliveryPincode: '',
  deliveryCity: '',
  deliveryState: '',
  deliveryLocality: '',
  deliveryAddress: '',
  deliveryCurrentFloor: '',
  deliveryLiftStatus: '',
};

/** AddOrder Reducer */

export const addOrderReducer = (
  state: IAddorderFormState,
  action: IAddorderFormAction,
) => {
  const {type, payload} = action;
  switch (type) {
    case ADDORDER_FORM_ACTION.SHIFTING_TYPE:
      return {...state, shiftingType: payload};
    case ADDORDER_FORM_ACTION.DATE_OF_MOVING:
      return {...state, dateOfMoving: payload};
    case ADDORDER_FORM_ACTION.PARTY_NAME:
      return {...state, partyName: payload};
    case ADDORDER_FORM_ACTION.MOBILE:
      return {...state, mobile: payload};
    case ADDORDER_FORM_ACTION.PARTY_COMPANY_NAME:
      return {...state, partyCompanyName: payload};
    case ADDORDER_FORM_ACTION.ORDER_AMOUNT:
      return {...state, orderAmount: payload};
    case ADDORDER_FORM_ACTION.TOKEN_AMOUNT:
      return {...state, tokenAmount: payload};
    case ADDORDER_FORM_ACTION.SHIFTING_LUGGAGE:
      return {...state, shiftingLuggage: payload};
    case ADDORDER_FORM_ACTION.DATE_OF_QUOTATION:
      return {...state, dateOfQuotation: payload};
    case ADDORDER_FORM_ACTION.PICKUP_PINCODE:
      return {...state, pickupPincode: payload};
    case ADDORDER_FORM_ACTION.PICKUP_CITY:
      return {...state, pickupCity: payload};
    case ADDORDER_FORM_ACTION.PICKUP_STATE:
      return {...state, pickupState: payload};
    case ADDORDER_FORM_ACTION.PICKUP_LOCALITY:
      return {...state, pickupLocality: payload};
    case ADDORDER_FORM_ACTION.PICKUP_ADDRESS:
      return {...state, pickupAddress: payload};
    case ADDORDER_FORM_ACTION.PICKUP_CURRENT_FLOOR:
      return {...state, pickupCurrentFloor: payload};
    case ADDORDER_FORM_ACTION.DELIVERY_PINCODE:
      return {...state, deliveryPincode: payload};
    case ADDORDER_FORM_ACTION.DELIVERY_CITY:
      return {...state, deliveryCity: payload};
    case ADDORDER_FORM_ACTION.DELIVERY_STATE:
      return {...state, deliveryState: payload};
    case ADDORDER_FORM_ACTION.DELIVERY_LOCALITY:
      return {...state, deliveryLocality: payload};
    case ADDORDER_FORM_ACTION.DELIVERY_ADDRESS:
      return {...state, deliveryAddress: payload};
    case ADDORDER_FORM_ACTION.DELIVERY_CURRENT_FLOOR:
      return {...state, deliveryCurrentFloor: payload};
    case ADDORDER_FORM_ACTION.DELIVERY_LIFT_STATUS:
      return {...state, deliveryLiftStatus: payload};
    default:
      return state;
  }
};
