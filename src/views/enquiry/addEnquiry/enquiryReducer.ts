//** ALL ACTIONS */
export enum ENQUIRY_FORM_ACTION {
  SHIFTING_TYPE = 'SHIFTING_TYPE',
  DATE_OF_QUOTATION = 'DATE_OF_QUOTATION',
  SERIAL_NUMBER = 'SERIAL_NUMBER',
  SHIFTING_LUGGAGE = 'SHIFTING_LUGGAGE',
  TEMPLATE = 'TEMPLATE',
  VEHCILE_TYPE = 'VEHCILE_TYPE',
  MANUFACTURER = 'MANUFACTURER',
  MODEL = 'MODEL',
  COMPANY_NAME = 'COMPANY_NAME',
  PARTY_NAME = 'PARTY_NAME',
  MOBILE_NUMBER = 'MOBILE_NUMBER',
  PICKUP_PINCODE = 'PICKUP_PINCODE',
  PICKUP_CITY = 'PICKUP_CITY',
  PICKUP_STATE = 'PICKUP_STATE',
  PICKUP_LOCALITY = 'PICKUP_LOCALITY',
  PICKUP_ADDRESS = 'PICKUP_ADDRESS',
  DELIVERY_PINCODE = 'DELIVERY_PINCODE',
  DELIVERY_CITY = 'DELIVERY_CITY',
  DELIVERY_STATE = 'DELIVERY_STATE',
  DELIVERY_LOCALITY = 'DELIVERY_LOCALITY',
  DELIVERY_ADDRESS = 'DELIVERY_ADDRESS',
}

/** ENQUIRY FORM STATE */
interface EnquiryFormState {
  shiftingType: string;
  dateOfQuotation: string;
  serialNumber: string;
  shiftingLuggage: string;
  template: string;
  vehcileType: string;
  manufacturer: string;
  model: string;
  companyName: string;
  partyName: string;
  mobileNumber: string;
  pickupPincode: string;
  pickupCity: string;
  pickupState: string;
  pickupLocality: string;
  pickupAddress: string;
  deliveryPincode: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryLocality: string;
  deliveryAddress: string;
}

/** ACTION INTERFACE */
interface EnquiryAction {
  type: ENQUIRY_FORM_ACTION;
  payload: string;
}

/** INITIAL STATE */
export const initialState: EnquiryFormState = {
  shiftingType: '',
  dateOfQuotation: '',
  serialNumber: '',
  shiftingLuggage: '',
  template: '',
  vehcileType: '',
  manufacturer: '',
  model: '',
  companyName: '',
  partyName: '',
  mobileNumber: '',
  pickupPincode: '',
  pickupCity: '',
  pickupState: '',
  pickupLocality: '',
  pickupAddress: '',
  deliveryPincode: '',
  deliveryCity: '',
  deliveryState: '',
  deliveryLocality: '',
  deliveryAddress: '',
};

/** Quotation Reducer */
export const enquiryReducer = (
  state: EnquiryFormState,
  action: EnquiryAction,
) => {
  const {type, payload} = action;
  switch (type) {
    case ENQUIRY_FORM_ACTION.SHIFTING_TYPE:
      return {...state, shiftingType: payload};
    case ENQUIRY_FORM_ACTION.DATE_OF_QUOTATION:
      return {...state, dateOfQuotation: payload};
    case ENQUIRY_FORM_ACTION.SERIAL_NUMBER:
      return {...state, serialNumber: payload};
    case ENQUIRY_FORM_ACTION.SHIFTING_LUGGAGE:
      return {...state, shiftingLuggage: payload};
    case ENQUIRY_FORM_ACTION.TEMPLATE:
      return {...state, template: payload};
    case ENQUIRY_FORM_ACTION.VEHCILE_TYPE:
      return {...state, vehcileType: payload};
    case ENQUIRY_FORM_ACTION.MANUFACTURER:
      return {...state, manufacturer: payload};
    case ENQUIRY_FORM_ACTION.MODEL:
      return {...state, model: payload};
    case ENQUIRY_FORM_ACTION.COMPANY_NAME:
      return {...state, companyName: payload};
    case ENQUIRY_FORM_ACTION.PARTY_NAME:
      return {...state, partyName: payload};
    case ENQUIRY_FORM_ACTION.MOBILE_NUMBER:
      return {...state, mobileNumber: payload};
    case ENQUIRY_FORM_ACTION.PICKUP_PINCODE:
      return {...state, pickupPincode: payload};
    case ENQUIRY_FORM_ACTION.PICKUP_CITY:
      return {...state, pickupCity: payload};
    case ENQUIRY_FORM_ACTION.PICKUP_STATE:
      return {...state, pickupState: payload};
    case ENQUIRY_FORM_ACTION.PICKUP_LOCALITY:
      return {...state, pickupLocality: payload};
    case ENQUIRY_FORM_ACTION.PICKUP_ADDRESS:
      return {...state, pickupAddress: payload};
    case ENQUIRY_FORM_ACTION.DELIVERY_PINCODE:
      return {...state, deliveryPincode: payload};
    case ENQUIRY_FORM_ACTION.DELIVERY_CITY:
      return {...state, deliveryCity: payload};
    case ENQUIRY_FORM_ACTION.DELIVERY_STATE:
      return {...state, deliveryState: payload};
    case ENQUIRY_FORM_ACTION.DELIVERY_LOCALITY:
      return {...state, deliveryLocality: payload};
    case ENQUIRY_FORM_ACTION.DELIVERY_ADDRESS:
      return {...state, deliveryAddress: payload};
    default:
      return state;
  }
};
