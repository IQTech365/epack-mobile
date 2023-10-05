//** ALL ACTIONS*/

export enum CARCONDITION_FORM_ACTION {
  CARCONDITION_NO = 'CARCONDITION_NO ',
  CHOOSE_TEMPLATE = 'CHOOSE_TEMPLATE ',
  DATE_OF_CARCONDITION = 'DATE_OF_CARCONDITION',
  CN_BILTY_LR_NO = 'CN_BILTY_LR_NO ',
  MANUFACTURER = 'MANUFACTURER',
  MODEL = 'MODEL',
  COLOR = 'COLOR',
  YEAR = 'YEAR',
  VEHICLE_REG_NO = 'VEHICLE_REG_NO',
  VEHICLE_KM = 'VEHICLE_KM',
  INSURANCE_COMPANY_NAME = 'INSURANCE_COMPANY_NAME',
  INSURANCE_POLICY_NO = 'INSURANCE_POLICY_NO',
  VEHICLE_VALUE = 'VEHICLE_VALUE',
  CHASIS_NO = 'CHASIS_NO',
  ENGINE_NO = 'ENGINE_NO',
  STEPNEY = 'STEPNEY',
  WHEEL_CAPS = 'WHEEL_CAPS',
  SIDE_RARE_VIEW_MIRROR = 'SIDE_RARE_VIEW_MIRROR',
  CAR_RADIO_PLAYER = 'CAR_RADIO_PLAYER',
  AIR_CONDITION = 'AIR_CONDITION',
  DIGITAL_WATCH = 'DIGITAL_WATCH',
  SPEAKER = 'SPEAKER',
  TOOLKIT = 'TOOLKIT',
  JACK = 'JACK',
  WIPER_ARMS_AND_BLADES = 'WIPER_ARMS_AND_BLADES',
  MUD_FLAP = 'MUD_FLAP',
  FLOOR_RUBBER_CARPET = 'FLOOR_RUBBER_CARPET',
  FUEL = 'FUEL',
  CAR_COVER = 'CAR_COVER',
  BATTERY_NO = 'BATTERY_NO',
  TYRE_NO = 'TYRE_NO',
  ANY_OTHER_ACCESSORIES = 'ANY_OTHER_ACCESSORIES',
  REMARKS = 'REMARKS',
  SCARATCHES = 'SCARATCHES',
  DENT = 'DENT',
  ANY_OTHER_OBSERVATION = 'ANY_OTHER_OBSERVATION',
}

/** CAR CONDITION FORM STATE */

interface ICarConditionFormState {
  carConditionNumber: string;
  chooseTemplate: string;
  dateOfCarCondition: string;
  cnBiltyLrNo: string;
  manufacturer: string;
  model: string;
  color: string;
  yearOfManufacturing: string;
  vehicleRegistrationNumber: string;
  vehicleCoveredDistanceInKM: string;
  insuranceCompany: string;
  insurancePolicyNumber: string;
  vehicleValue: string;
  chasisNumber: string;
  engineNumber: string;
  stepney: string;
  wheelCaps: string;
  sideRareViewMirror: string;
  carRadioPlayer: string;
  airCondition: string;
  digitalWatch: string;
  speaker: string;
  toolKit: string;
  jack: string;
  wiperAarmAndBlade: string;
  mudFlap: string;
  floorRubberCarpet: string;
  fuel: string;
  carCover: string;
  batteryNumber: string;
  tyreNumber: string;
  anyOtherAccessorie: string;
  remarks: string;
  scaratches: string;
  dent: string;
  visibleObservation: string;
}

/** ACTION INTERFACE */

interface ICarConditionFormAction {
  type: CARCONDITION_FORM_ACTION;
  payload: string;
}

/** INITIAL STATE */

export const initialState: ICarConditionFormState = {
  carConditionNumber: '',
  chooseTemplate: '',
  dateOfCarCondition: '',
  cnBiltyLrNo: '',
  manufacturer: '',
  model: '',
  color: '',
  yearOfManufacturing: '',
  vehicleRegistrationNumber: '',
  vehicleCoveredDistanceInKM: '',
  insuranceCompany: '',
  insurancePolicyNumber: '',
  vehicleValue: '',
  chasisNumber: '',
  engineNumber: '',
  stepney: '',
  wheelCaps: '',
  sideRareViewMirror: '',
  carRadioPlayer: '',
  airCondition: '',
  digitalWatch: '',
  speaker: '',
  toolKit: '',
  jack: '',
  wiperAarmAndBlade: '',
  mudFlap: '',
  floorRubberCarpet: '',
  fuel: '',
  carCover: '',
  batteryNumber: '',
  tyreNumber: '',
  anyOtherAccessorie: '',
  remarks: '',
  scaratches: '',
  dent: '',
  visibleObservation: '',
};

/** Car Condition Reducer */

export const carConditionReducer = (
  state: ICarConditionFormState,
  action: ICarConditionFormAction,
) => {
  const {type, payload} = action;
  switch (type) {
    case CARCONDITION_FORM_ACTION.CARCONDITION_NO:
      return {...state, carConditionNumber: payload};
    case CARCONDITION_FORM_ACTION.CHOOSE_TEMPLATE:
      return {...state, chooseTemplate: payload};
    case CARCONDITION_FORM_ACTION.DATE_OF_CARCONDITION:
      return {...state, dateOfCarCondition: payload};
    case CARCONDITION_FORM_ACTION.CN_BILTY_LR_NO:
      return {...state, cnBiltyLrNo: payload};
    case CARCONDITION_FORM_ACTION.MANUFACTURER:
      return {...state, manufacturer: payload};
    case CARCONDITION_FORM_ACTION.MODEL:
      return {...state, model: payload};
    case CARCONDITION_FORM_ACTION.COLOR:
      return {...state, color: payload};
    case CARCONDITION_FORM_ACTION.YEAR:
      return {...state, yearOfManufacturing: payload};
    case CARCONDITION_FORM_ACTION.VEHICLE_REG_NO:
      return {...state, vehicleRegistrationNumber: payload};
    case CARCONDITION_FORM_ACTION.VEHICLE_KM:
      return {...state, vehicleCoveredDistanceInKM: payload};
    case CARCONDITION_FORM_ACTION.INSURANCE_COMPANY_NAME:
      return {...state, insuranceCompany: payload};
    case CARCONDITION_FORM_ACTION.INSURANCE_POLICY_NO:
      return {...state, insurancePolicyNumber: payload};
    case CARCONDITION_FORM_ACTION.VEHICLE_VALUE:
      return {...state, vehicleValue: payload};
    case CARCONDITION_FORM_ACTION.CHASIS_NO:
      return {...state, chasisNumber: payload};
    case CARCONDITION_FORM_ACTION.ENGINE_NO:
      return {...state, engineNumber: payload};
    case CARCONDITION_FORM_ACTION.STEPNEY:
      return {...state, stepney: payload};
    case CARCONDITION_FORM_ACTION.WHEEL_CAPS:
      return {...state, wheelCaps: payload};
    case CARCONDITION_FORM_ACTION.SIDE_RARE_VIEW_MIRROR:
      return {...state, sideRareViewMirror: payload};
    case CARCONDITION_FORM_ACTION.CAR_RADIO_PLAYER:
      return {...state, carRadioPlayer: payload};
    case CARCONDITION_FORM_ACTION.AIR_CONDITION:
      return {...state, airCondition: payload};
    case CARCONDITION_FORM_ACTION.DIGITAL_WATCH:
      return {...state, digitalWatch: payload};
    case CARCONDITION_FORM_ACTION.SPEAKER:
      return {...state, speaker: payload};
    case CARCONDITION_FORM_ACTION.TOOLKIT:
      return {...state, toolKit: payload};
    case CARCONDITION_FORM_ACTION.JACK:
      return {...state, jack: payload};
    case CARCONDITION_FORM_ACTION.WIPER_ARMS_AND_BLADES:
      return {...state, wiperAarmAndBlade: payload};
    case CARCONDITION_FORM_ACTION.MUD_FLAP:
      return {...state, mudFlap: payload};
    case CARCONDITION_FORM_ACTION.FLOOR_RUBBER_CARPET:
      return {...state, floorRubberCarpet: payload};
    case CARCONDITION_FORM_ACTION.FUEL:
      return {...state, fuel: payload};
    case CARCONDITION_FORM_ACTION.CAR_COVER:
      return {...state, carCover: payload};
    case CARCONDITION_FORM_ACTION.BATTERY_NO:
      return {...state, batteryNumber: payload};
    case CARCONDITION_FORM_ACTION.TYRE_NO:
      return {...state, tyreNumber: payload};
    case CARCONDITION_FORM_ACTION.ANY_OTHER_ACCESSORIES:
      return {...state, anyOtherAccessorie: payload};
    case CARCONDITION_FORM_ACTION.REMARKS:
      return {...state, remarks: payload};
    case CARCONDITION_FORM_ACTION.SCARATCHES:
      return {...state, scaratches: payload};
    case CARCONDITION_FORM_ACTION.DENT:
      return {...state, dent: payload};
    case CARCONDITION_FORM_ACTION.ANY_OTHER_OBSERVATION:
      return {...state, visibleObservation: payload};
    default:
      return state;
  }
};
