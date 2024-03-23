import {Reducer} from 'react';

export enum ACTION {
  BILTY_LR_CN_NO = 'BILTY_LR_CN_NO',
  DATE_OF_BILTY_LR_CR = 'DATE_OF_BILTY_LR_CR',
  BILTY_TEMPLATE_ID = 'BILTY_TEMPLATE_ID',
  // Consigner Details
  CONSIGNER_ADDRESS_SAME_AS_CLIENT_ADDRESS = 'CONSIGNER_ADDRESS_SAME_AS_CLIENT_ADDRESS',
  CONSIGNER_NAME = 'CONSIGNER_NAME',
  CONSIGNER_GST = 'CONSIGNER_GST',
  CONSIGNER_MOBILE_NO = 'CONSIGNER_MOBILE_NO',
  CONSIGNER_ADDRESS = 'CONSIGNER_ADDRESS',
  CONSIGNER_PINCODE = 'CONSIGNER_PINCODE',
  CONSIGNER_STATE = 'CONSIGNER_STATE',
  CONSIGNER_CITY = 'CONSIGNER_CITY',
  LOADING_ADDRESS_SAME_AS_CONSINGER_ADDRESS = 'LOADING_ADDRESS_SAME_AS_CONSINGER_ADDRESS',
  // Loading Address
  LOADING_ADDRESS = 'LOADING_ADDRESS',
  LOADING_PINCODE = 'LOADING_PINCODE',
  LOADING_STATE = 'LOADING_STATE',
  LOADING_CITY = 'LOADING_CITY',
  // Consignee Details
  CONSIGNEE_ADDRESS_SAME_AS_CLIENT_ADDRESS = 'CONSIGNEE_ADDRESS_SAME_AS_CLIENT_ADDRESS',
  CONSIGNEE_NAME = 'CONSIGNEE_NAME',
  CONSIGNEE_GST = 'CONSIGNEE_GST',
  CONSIGNEE_MOBILE_NO = 'CONSIGNEE_MOBILE_NO',
  CONSIGNEE_ADDRESS = 'CONSIGNEE_ADDRESS',
  CONSIGNEE_PINCODE = 'CONSIGNEE_PINCODE',
  CONSIGNEE_STATE = 'CONSIGNEE_STATE',
  CONSIGNEE_CITY = 'CONSIGNEE_CITY',
  //
  DELIVERY_ADDRESS_SAME_AS_CONSIGNEE_ADDRESS = 'DELIVERY_ADDRESS_SAME_AS_CONSIGNEE_ADDRESS',
  //
  DELIVERY_ADDRESS = 'DELIVERY_ADDRESS',
  DELIVERY_PINCODE = 'DELIVERY_PINCODE',
  DELIVERY_STATE = 'DELIVERY_STATE',
  DELIVERY_CITY = 'DELIVERY_CITY',
  // Vehicle Details
  INVOICE_NO = 'INVOICE_NO',
  VEHICLE_TYPE = 'VEHICLE_TYPE',
  VEHICLE_NO = 'VEHICLE_NO',
  FROM_LOCATION = 'FROM_LOCATION',
  TO_LOCATIION = 'TO_LOCATIION',
  DRIVER_NAME = 'DRIVER_NAME',
  DRIVER_MOBILE_NO = 'DRIVER_MOBILE_NO',
  DRIVER_LICENCE_NO = 'DRIVER_LICENCE_NO',
  SEAL_NO = 'SEAL_NO',
  IN_DATE = 'IN_DATE',
  OUT_DATE = 'OUT_DATE',
  TRANSIT_DAYS = 'TRANSIT_DAYS',
  EXPECTED_DATE_OF_DELIVERY = 'EXPECTED_DATE_OF_DELIVERY',
  // E-Way Bill Details
  E_WAY_BILL_NO = 'E_WAY_BILL_NO',
  GENERATED_ON = 'GENERATED_ON',
  EXPIRY_DATE = 'EXPIRY_DATE',
  // Material Details
  TYPE_OF_MOVING = 'TYPE_OF_MOVING',
  MATERIALS = 'MATERIALS',
  ADD_MATERIAL = 'ADD_MATERIAL',
  LIABILITY_OF_TAX = 'LIABILITY_OF_TAX',
  // Risk Type
  RISK_TYPE = 'RISK_TYPE',
  // Freight Details
  FREIGHT_TYPE = 'FREIGHT_TYPE',
  FREIGHT_CHARGE = 'FREIGHT_CHARGE',

  PICKUP_CHARGE = 'PICKUP_CHARGE',
  PICKUP_CHARGE_AMOUNT = 'PICKUP_CHARGE_AMOUNT',

  DOOR_DELIVERY_CHARGE = 'DOOR_DELIVERY_CHARGE',
  DOOR_DELIVERY_CHARGE_AMOUNT = 'DOOR_DELIVERY_CHARGE_AMOUNT',

  PACKING_CHARGE = 'PACKING_CHARGE',
  PACKING_CHARGE_AMOUNT = 'PACKING_CHARGE_AMOUNT',

  PACKING_MATERIAL_CHARGE = 'PACKING_MATERIAL_CHARGE',
  PACKING_MATERIAL_CHARGE_AMOUNT = 'PACKING_MATERIAL_CHARGE_AMOUNT',

  UNPACKING_CHARGE = 'UNPACKING_CHARGE',
  UNPACKING_CHARGE_AMOUNT = 'UNPACKING_CHARGE_AMOUNT',

  LOADING_CHARGE = 'LOADING_CHARGE',
  LOADING_CHARGE_AMOUNT = 'LOADING_CHARGE_AMOUNT',

  UNLOADING_CHARGE = 'UNLOADING_CHARGE',
  UNLOADING_CHARGE_AMOUNT = 'UNLOADING_CHARGE_AMOUNT',

  TOTAL_AMOUNT = 'TOTAL_AMOUNT',
  ADVANCE_AMOUNT = 'ADVANCE_AMOUNT',
  BALANCE_AMOUNT = 'BALANCE_AMOUNT',
  // Insurance Details
  INSURANCE = 'INSURANCE',
  INSURANCE_COMPANY = 'INSURANCE_COMPANY',
  POLICY_NO = 'POLICY_NO',
  INSURANCE_DATE = 'INSURANCE_DATE',
  INSURANCE_AMOUNT = 'INSURANCE_AMOUNT',
  // Demurrage Details
  DEMURRAGE_CHARGE = 'DEMURRAGE_CHARGE',
  RATE = 'RATE',
  CHARGE_APPLICABLE_AFTER = 'CHARGE_APPLICABLE_AFTER',
  // Other Details
  REMARK = 'REMARK',
}

export interface IMaterial {
  material_name: string;
  no_of_articles: string;
  packing_type: string;
  hsn_code: string;
  bill_invoice_no: string;
  actual_weight: string;
  applicable_weight: string;
  units: string;
  value_of_goods: string;
}

export interface IState {
  bilty_lr_cr_no: string;
  date_of_bilty_lr_cr_no: string;
  bilty_template_id: string;

  // **** Consigner Details ****
  consigner_address_same_as_client: boolean;
  consigner_name: string;
  consigner_gst: string;
  consigner_mobile_no: string;
  consigner_address: string;
  consinger_pincode: string;
  consigner_state: string;
  consigner_city: string;
  loading_address_same_as_consigner: boolean;

  //  **** Loading Address ****
  loading_address: string;
  loading_pincode: string;
  loading_state: string;
  loading_city: string;

  //  **** Consingee Details ****
  consignee_address_same_as_client: boolean;
  consignee_name: string;
  consignee_gst: string;
  consignee_mobile_no: string;
  consignee_address: string;
  consignee_pincode: string;
  consignee_state: string;
  consignee_city: string;
  delivery_address_same_as_consignee: boolean;

  //  **** Delivery Address  ****
  delivery_address: string;
  delivery_pincode: string;
  delivery_state: string;
  delivery_city: string;

  // **** Vehicle Details ****
  invoice_no: string;
  vehicle_type: string;
  vehicle_no: string;
  from_location: string;
  to_location: string;
  driver_name: string;
  driver_mobile_no: string;
  driver_license_no: string;
  seal_no: string;
  in_date: string;
  out_date: string;
  transit_days: string;
  expected_date_of_delivery: string;

  // **** E-Way Bill Details ****
  e_way_bill_no: string;
  generated_on: string;
  expirty_date: string;

  // **** Material Details ****
  type_of_moving: string;
  materials: IMaterial[];
  add_material: string;
  risk_type: string;
  liability_of_tax:string,

  // **** Freight Details ****
  freight_type: string;
  freight_charge: string;

  pickup_charge: string;
  pickup_charge_amount: string;

  door_delivery_charge: string;
  door_delivery_charge_amount: string;

  packing_charge: string;
  packing_charge_amount: string;

  packing_material_charge: string;
  packing_material_charge_amount: string;

  unpacking_charge: string;
  unpacking_charge_amount: string;

  loading_charge: string;
  loading_charge_amount: string;

  unloading_charge: string;
  unloading_charge_amount: string;

  total_amunt: string;
  advance_amount: string;
  balance_amount: string;

  // **** Insurance Details ****
  insurance: string;
  insurance_company: string;
  policy_number: string;
  insurance_date: string;
  insurance_amount: string;

  // **** Demurrage Details
  demurrage_charge: string;
  rate: string;
  charge_applicable_after: string;

  // **** Other Details ****
  remark: string;
}

export interface IAction {
  type: ACTION;
  payload: string | boolean | IMaterial[];
}

export const initialState: IState = {
  bilty_lr_cr_no: '',
  date_of_bilty_lr_cr_no: '',
  bilty_template_id: '',
  // **** Consigner Details ****
  consigner_address_same_as_client: true,
  consigner_name: '',
  consigner_gst: '',
  consigner_mobile_no: '',
  consigner_address: '',
  consinger_pincode: '',
  consigner_state: '',
  consigner_city: '',
  loading_address_same_as_consigner: true,

  //  **** Loading Address ****
  loading_address: '',
  loading_pincode: '',
  loading_state: '',
  loading_city: '',

  //  **** Consingee Details ****
  consignee_address_same_as_client: true,
  consignee_name: '',
  consignee_gst: '',
  consignee_mobile_no: '',
  consignee_address: '',
  consignee_pincode: '',
  consignee_state: '',
  consignee_city: '',
  delivery_address_same_as_consignee: true,

  //  **** Delivery Address  ****
  delivery_address: '',
  delivery_pincode: '',
  delivery_state: '',
  delivery_city: '',

  // **** Vehicle Details ****
  invoice_no: '',
  vehicle_type: '',
  vehicle_no: '',
  from_location: '',
  to_location: '',
  driver_name: '',
  driver_mobile_no: '',
  driver_license_no: '',
  seal_no: '',
  in_date: '',
  out_date: '',
  transit_days: '',
  expected_date_of_delivery: '',

  // **** E-Way Bill Details ****
  e_way_bill_no: '',
  generated_on: '',
  expirty_date: '',

  // **** Material Details ****
  type_of_moving: '',
  materials: [],
  add_material: 'NO',
  risk_type: '',
  liability_of_tax:'',

  // **** Freight Details ****
  freight_type: '',
  freight_charge: '',

  pickup_charge: '',
  pickup_charge_amount: '',

  door_delivery_charge: '',
  door_delivery_charge_amount: '',

  packing_charge: '',
  packing_charge_amount: '',

  packing_material_charge: '',
  packing_material_charge_amount: '',

  unpacking_charge: '',
  unpacking_charge_amount: '',

  loading_charge: '',
  loading_charge_amount: '',

  unloading_charge: '',
  unloading_charge_amount: '',

  total_amunt: '',
  advance_amount: '',
  balance_amount: '',

  // **** Insurance Details ****
  insurance: '',
  insurance_company: '',
  policy_number: '',
  insurance_date: '',
  insurance_amount: '',

  // **** Demurrage Details
  demurrage_charge: '',
  rate: '',
  charge_applicable_after: '',

  // **** Other Details ****
  remark: '',
};

export const biltyReducer: Reducer<IState, IAction> = (
  state: IState,
  action: IAction,
) => {
  const {type, payload} = action;
  switch (type) {
    // **** Basic Details ****
    case ACTION.BILTY_LR_CN_NO:
      return {...state, bilty_lr_cr_no: payload as string};
    case ACTION.BILTY_TEMPLATE_ID:
      return {...state, bilty_template_id: payload as string};
    case ACTION.DATE_OF_BILTY_LR_CR:
      return {...state, date_of_bilty_lr_cr_no: payload as string};

    // **** Consigner Details ****
    case ACTION.CONSIGNER_ADDRESS_SAME_AS_CLIENT_ADDRESS:
      return {...state, consigner_address_same_as_client: payload as boolean};
    case ACTION.CONSIGNER_NAME:
      return {...state, consigner_name: payload as string};
    case ACTION.CONSIGNER_GST:
      return {...state, consigner_gst: payload as string};
    case ACTION.CONSIGNER_MOBILE_NO:
      return {...state, consigner_mobile_no: payload as string};
    case ACTION.CONSIGNER_ADDRESS:
      return {...state, consigner_address: payload as string};
    case ACTION.CONSIGNER_PINCODE:
      return {...state, consinger_pincode: payload as string};
    case ACTION.CONSIGNER_STATE:
      return {...state, consigner_state: payload as string};
    case ACTION.CONSIGNER_CITY:
      return {...state, consigner_city: payload as string};
    case ACTION.LOADING_ADDRESS_SAME_AS_CONSINGER_ADDRESS:
      return {...state, loading_address_same_as_consigner: payload as boolean};

    // **** Loading Address ****
    case ACTION.LOADING_ADDRESS:
      return {...state, loading_address: payload as string};
    case ACTION.LOADING_PINCODE:
      return {...state, loading_pincode: payload as string};
    case ACTION.LOADING_STATE:
      return {...state, loading_state: payload as string};
    case ACTION.LOADING_CITY:
      return {...state, loading_city: payload as string};

    // **** Consignee Details ****
    case ACTION.CONSIGNEE_ADDRESS_SAME_AS_CLIENT_ADDRESS:
      return {...state, consignee_address_same_as_client: payload as boolean};
    case ACTION.CONSIGNEE_NAME:
      return {...state, consignee_name: payload as string};
    case ACTION.CONSIGNEE_GST:
      return {...state, consignee_gst: payload as string};
    case ACTION.CONSIGNEE_MOBILE_NO:
      return {...state, consignee_mobile_no: payload as string};
    case ACTION.CONSIGNEE_ADDRESS:
      return {...state, consignee_address: payload as string};
    case ACTION.CONSIGNEE_PINCODE:
      return {...state, consignee_pincode: payload as string};
    case ACTION.CONSIGNEE_STATE:
      return {...state, consignee_state: payload as string};
    case ACTION.CONSIGNEE_CITY:
      return {...state, consignee_city: payload as string};
    case ACTION.DELIVERY_ADDRESS_SAME_AS_CONSIGNEE_ADDRESS:
      return {...state, delivery_address_same_as_consignee: payload as boolean};

    // **** Delivery Address ****
    case ACTION.DELIVERY_ADDRESS:
      return {...state, delivery_address: payload as string};
    case ACTION.DELIVERY_PINCODE:
      return {...state, delivery_pincode: payload as string};
    case ACTION.DELIVERY_STATE:
      return {...state, delivery_state: payload as string};
    case ACTION.DELIVERY_CITY:
      return {...state, delivery_city: payload as string};

    // **** Freight Details ****
    case ACTION.INVOICE_NO:
      return {...state, invoice_no: payload as string};
    case ACTION.VEHICLE_TYPE:
      return {...state, vehicle_type: payload as string};
    case ACTION.VEHICLE_NO:
      return {...state, vehicle_no: payload as string};
    case ACTION.FROM_LOCATION:
      return {...state, from_location: payload as string};
    case ACTION.TO_LOCATIION:
      return {...state, to_location: payload as string};
    case ACTION.DRIVER_NAME:
      return {...state, driver_name: payload as string};
    case ACTION.DRIVER_MOBILE_NO:
      return {...state, driver_mobile_no: payload as string};
    case ACTION.DRIVER_LICENCE_NO:
      return {...state, driver_license_no: payload as string};
    case ACTION.SEAL_NO:
      return {...state, seal_no: payload as string};
    case ACTION.IN_DATE:
      return {...state, in_date: payload as string};
    case ACTION.OUT_DATE:
      return {...state, out_date: payload as string};
    case ACTION.TRANSIT_DAYS:
      return {...state, transit_days: payload as string};
    case ACTION.EXPECTED_DATE_OF_DELIVERY:
      return {...state, expected_date_of_delivery: payload as string};

    // **** E-Way Bill Details ****
    case ACTION.E_WAY_BILL_NO:
      return {...state, e_way_bill_no: payload as string};
    case ACTION.GENERATED_ON:
      return {...state, generated_on: payload as string};
    case ACTION.EXPIRY_DATE:
      return {...state, expirty_date: payload as string};

    // **** Material Details ****
    case ACTION.TYPE_OF_MOVING:
      return {...state, type_of_moving: payload as string};
    case ACTION.MATERIALS:
      return {...state, materials: payload as IMaterial[]};
    case ACTION.ADD_MATERIAL:
      return {...state, add_material: payload as string};
    case ACTION.RISK_TYPE:
      return {...state, risk_type: payload as string};
    case ACTION.LIABILITY_OF_TAX:
        return {...state, liability_of_tax: payload as string};
    // **** Freight Details ****
    case ACTION.FREIGHT_TYPE:
      return {...state, freight_type: payload as string};
    case ACTION.FREIGHT_CHARGE:
      return {...state, freight_charge: payload as string};
    case ACTION.PICKUP_CHARGE:
      return {...state, pickup_charge: payload as string};
    case ACTION.PICKUP_CHARGE_AMOUNT:
      return {...state, pickup_charge_amount: payload as string};
    case ACTION.DOOR_DELIVERY_CHARGE:
      return {...state, door_delivery_charge: payload as string};
    case ACTION.DOOR_DELIVERY_CHARGE_AMOUNT:
      return {...state, door_delivery_charge_amount: payload as string};
    case ACTION.PACKING_CHARGE:
      return {...state, packing_charge: payload as string};
    case ACTION.PACKING_CHARGE_AMOUNT:
      return {...state, packing_charge_amount: payload as string};
    case ACTION.PACKING_MATERIAL_CHARGE:
      return {...state, packing_material_charge: payload as string};
    case ACTION.PACKING_MATERIAL_CHARGE_AMOUNT:
      return {...state, packing_material_charge_amount: payload as string};
    case ACTION.UNPACKING_CHARGE:
      return {...state, unpacking_charge: payload as string};
    case ACTION.UNPACKING_CHARGE_AMOUNT:
      return {...state, unpacking_charge_amount: payload as string};
    case ACTION.LOADING_CHARGE:
      return {...state, loading_charge: payload as string};
    case ACTION.LOADING_CHARGE_AMOUNT:
      return {...state, loading_charge_amount: payload as string};
    case ACTION.UNLOADING_CHARGE:
      return {...state, unloading_charge: payload as string};
    case ACTION.UNLOADING_CHARGE_AMOUNT:
      return {...state, unloading_charge_amount: payload as string};
    case ACTION.TOTAL_AMOUNT:
      return {...state, total_amunt: payload as string};
    case ACTION.ADVANCE_AMOUNT:
      return {...state, advance_amount: payload as string};
    case ACTION.BALANCE_AMOUNT:
      return {...state, balance_amount: payload as string};

    // **** Insurance Details ****
    case ACTION.INSURANCE:
      return {...state, insurance: payload as string};
    case ACTION.INSURANCE_COMPANY:
      return {...state, insurance_company: payload as string};
    case ACTION.POLICY_NO:
      return {...state, policy_number: payload as string};
    case ACTION.INSURANCE_DATE:
      return {...state, insurance_date: payload as string};
    case ACTION.INSURANCE_AMOUNT:
      return {...state, insurance_amount: payload as string};

    // **** Demurrage Details ****
    case ACTION.DEMURRAGE_CHARGE:
      return {...state, demurrage_charge: payload as string};
    case ACTION.RATE:
      return {...state, rate: payload as string};
    case ACTION.CHARGE_APPLICABLE_AFTER:
      return {...state, charge_applicable_after: payload as string};

    // **** Other Details ****
    case ACTION.REMARK:
      return {...state, remark: payload as string};
    default:
      return state;
  }
};
