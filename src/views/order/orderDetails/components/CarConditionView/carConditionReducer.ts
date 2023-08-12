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
  REMARK = 'REMARK',
  SCARATCHES = 'SCARATCHES',
  DENT = 'DENT',
  ANY_OTHER_OBSERVATION = 'ANY_OTHER_OBSERVATION',
}

/** CAR CONDITION FORM STATE */

interface ICarConditionFormState {
  carConditionNo: string;
  chooseTemplate: string;
  dateOfCarCondition: string;
  cnBiltyLrNo: string;
  manufacturer: string;
  model: string;
  color: string;
  year: string;
  vehicleRegNo: string;
  vehicleKm: string;
  insuranceCompanyName: string;
  insurancePolicyNo: string;
  vehicleValue: string;
  chasisNo: string;
  engineNo: string;
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
  batteryNo: string;
  tyreNo: string;
  anyOtherAccessories: string;
  remark: string;
  scaratches: string;
  dent: string;
  anyOtherObservation: string;
}

/** ACTION INTERFACE */

interface ICarConditionFormAction {
  type: CARCONDITION_FORM_ACTION;
  payload: string;
}

/** INITIAL STATE */

export const initialState: ICarConditionFormState = {
  carConditionNo: '',
  chooseTemplate: '',
  dateOfCarCondition: '',
  cnBiltyLrNo: '',
  manufacturer: '',
  model: '',
  color: '',
  year: '',
  vehicleRegNo: '',
  vehicleKm: '',
  insuranceCompanyName: '',
  insurancePolicyNo: '',
  vehicleValue: '',
  chasisNo: '',
  engineNo: '',
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
  batteryNo: '',
  tyreNo: '',
  anyOtherAccessories: '',
  remark: '',
  scaratches: '',
  dent: '',
  anyOtherObservation: '',
};

/** Car Condition Reducer */

export const carConditionReducer = (
  state: ICarConditionFormState,
  action: ICarConditionFormAction,
) => {
  const {type, payload} = action;
  switch (type) {
    case CARCONDITION_FORM_ACTION.CARCONDITION_NO:
      return {...state, carConditionNo: payload};
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
      return {...state, year: payload};
    case CARCONDITION_FORM_ACTION.VEHICLE_REG_NO:
      return {...state, vehicleRegNo: payload};
    case CARCONDITION_FORM_ACTION.VEHICLE_KM:
      return {...state, vehicleKm: payload};
    case CARCONDITION_FORM_ACTION.INSURANCE_COMPANY_NAME:
      return {...state, insuranceCompanyName: payload};
    case CARCONDITION_FORM_ACTION.INSURANCE_POLICY_NO:
      return {...state, insurancePolicyNo: payload};
    case CARCONDITION_FORM_ACTION.VEHICLE_VALUE:
      return {...state, vehicleValue: payload};
    case CARCONDITION_FORM_ACTION.CHASIS_NO:
      return {...state, chasisNo: payload};
    case CARCONDITION_FORM_ACTION.ENGINE_NO:
      return {...state, engineNo: payload};
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
      return {...state, batteryNo: payload};
    case CARCONDITION_FORM_ACTION.TYRE_NO:
      return {...state, tyreNo: payload};
    case CARCONDITION_FORM_ACTION.ANY_OTHER_ACCESSORIES:
      return {...state, anyOtherAccessories: payload};
    case CARCONDITION_FORM_ACTION.REMARK:
      return {...state, remark: payload};
    case CARCONDITION_FORM_ACTION.SCARATCHES:
      return {...state, scaratches: payload};
    case CARCONDITION_FORM_ACTION.DENT:
      return {...state, dent: payload};
    case CARCONDITION_FORM_ACTION.ANY_OTHER_OBSERVATION:
      return {...state, anyOtherObservation: payload};
    default:
      return state;
  }
};
