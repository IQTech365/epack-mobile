//** ALL ACTIONS*/

export enum ADDORDER_FORM_ACTION {
  SHIFTING_TYPE = 'SHIFTING_TYPE',
  DATE_OF_MOVING = 'DATE_OF_MOVING',
  BILLING_BY = 'BILLING_BY',
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

/** ADD ORDER FORM STATE */

interface IAddOrderFormState {
  shiftingType: string;
  dateOfMoving: string;
  billingBy: TBillingBy | null;
  partyName: string;
  mobile: string;
  partyCompanyName: string;
  orderAmount: string;
  tokenAmount: string;
  shiftingLuggage: [string] | [];
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

interface IAddOrderFormAction {
  type: ADDORDER_FORM_ACTION;
  payload: string | TBillingBy | [string];
}

const defaultBillingBy: TBillingBy = {
  billing_by: 'by Individual',
  billing_info: null,
};

/** INITIAL STATE */

export const initialState: IAddOrderFormState = {
  shiftingType: 'Local',
  dateOfMoving: '',
  billingBy: defaultBillingBy,
  partyName: '',
  mobile: '',
  partyCompanyName: '',
  orderAmount: '',
  tokenAmount: '',
  shiftingLuggage: [],
  dateOfQuotation: '',
  pickupPincode: '',
  pickupCity: '',
  pickupState: '',
  pickupLocality: '',
  pickupAddress: '',
  pickupCurrentFloor: '',
  pickupLiftStatus: 'Yes',
  deliveryPincode: '',
  deliveryCity: '',
  deliveryState: '',
  deliveryLocality: '',
  deliveryAddress: '',
  deliveryCurrentFloor: '',
  deliveryLiftStatus: 'Yes',
};

/** AddOrder Reducer */

export const addOrderReducer = (
  state: IAddOrderFormState,
  action: IAddOrderFormAction,
) => {
  const {type, payload} = action;
  switch (type) {
    case ADDORDER_FORM_ACTION.SHIFTING_TYPE:
      return {...state, shiftingType: payload as string};
    case ADDORDER_FORM_ACTION.BILLING_BY:
      return {...state, billingBy: payload as TBillingBy};
    case ADDORDER_FORM_ACTION.DATE_OF_MOVING:
      return {...state, dateOfMoving: payload  as string};
    case ADDORDER_FORM_ACTION.PARTY_NAME:
      return {...state, partyName: payload  as string};
    case ADDORDER_FORM_ACTION.MOBILE:
      return {...state, mobile: payload  as string};
    case ADDORDER_FORM_ACTION.PARTY_COMPANY_NAME:
      return {...state, partyCompanyName: payload  as string};
    case ADDORDER_FORM_ACTION.ORDER_AMOUNT:
      return {...state, orderAmount: payload  as string};
    case ADDORDER_FORM_ACTION.TOKEN_AMOUNT:
      return {...state, tokenAmount: payload  as string};
    case ADDORDER_FORM_ACTION.SHIFTING_LUGGAGE:
      return {...state, shiftingLuggage: payload as [string]};
    case ADDORDER_FORM_ACTION.DATE_OF_QUOTATION:
      return {...state, dateOfQuotation: payload  as string};
    case ADDORDER_FORM_ACTION.PICKUP_PINCODE:
      return {...state, pickupPincode: payload  as string};
    case ADDORDER_FORM_ACTION.PICKUP_CITY:
      return {...state, pickupCity: payload  as string};
    case ADDORDER_FORM_ACTION.PICKUP_STATE:
      return {...state, pickupState: payload  as string};
    case ADDORDER_FORM_ACTION.PICKUP_LOCALITY:
      return {...state, pickupLocality: payload  as string};
    case ADDORDER_FORM_ACTION.PICKUP_ADDRESS:
      return {...state, pickupAddress: payload  as string};
    case ADDORDER_FORM_ACTION.PICKUP_CURRENT_FLOOR:
      return {...state, pickupCurrentFloor: payload  as string};
    case ADDORDER_FORM_ACTION.PICKUP_LIFT_STATUS:
      return {...state, pickupLiftStatus: payload  as string};
    case ADDORDER_FORM_ACTION.DELIVERY_PINCODE:
      return {...state, deliveryPincode: payload  as string};
    case ADDORDER_FORM_ACTION.DELIVERY_CITY:
      return {...state, deliveryCity: payload  as string};
    case ADDORDER_FORM_ACTION.DELIVERY_STATE:
      return {...state, deliveryState: payload  as string};
    case ADDORDER_FORM_ACTION.DELIVERY_LOCALITY:
      return {...state, deliveryLocality: payload  as string};
    case ADDORDER_FORM_ACTION.DELIVERY_ADDRESS:
      return {...state, deliveryAddress: payload  as string};
    case ADDORDER_FORM_ACTION.DELIVERY_CURRENT_FLOOR:
      return {...state, deliveryCurrentFloor: payload  as string};
    case ADDORDER_FORM_ACTION.DELIVERY_LIFT_STATUS:
      return {...state, deliveryLiftStatus: payload  as string};
    default:
      return state;
  }
};
