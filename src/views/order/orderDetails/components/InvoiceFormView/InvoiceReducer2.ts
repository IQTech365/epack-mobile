import {
  billingByOptions,
  doorDeliveryChargeOptions,
  loadTypeOptions,
  loadingChargeOptions,
  pickupChargeOptions,
  unloadingChargeOptions,
} from './utils';

export enum ACTION {
  BILING_TYPE = 'BILING_TYPE',
  SAME_AS_CLIENT_ADDRESS = 'SAME_AS_CLIENT_ADDRESS',
  //
  FREIGHT_LOAD_TYPE = 'FREIGHT_LOAD_TYPE',
  FREIGHT_CHARGES = 'FREIGHT_CHARGES',
  FREIGHT_HSN = 'FREIGHT_HSN',
  //
  PICKUP_CHARGE = 'PICKUP_CHARGE',
  PICKUP_CHARGE_AMOUNT = 'PICKUP_CHARGE_AMOUNT',
  PICKUP_CHARGE_HSN = 'PICKUP_CHARGE_HSN',
  //
  DOOR_DELIVERY_CHARGE = 'DOOR_DELIVERY_CHARGE',
  DOOR_DELIVERY_AMOUNT = 'DOOR_DELIVERY_AMOUNT',
  DOOR_DELIVERY_HSN = 'DOOR_DELIVERY_HSN',
  //
  PACKING_CHARGE = 'PACKING_CHARGE',
  PACKING_AMOUNT = 'PACKING_AMOUNT',
  PACKING_HSN = 'PACKING_HSN',
  //
  PACKING_MATERIAL_CHARGE = 'PACKING_MATERIAL_CHARGE',
  PACKING_MATERIAL_AMOUNT = 'PACKING_MATERIAL_AMOUNT',
  PACKING_MATERIAL_HSN = 'PACKING_MATERIAL_HSN',
  //
  LOADING_CHARGE = 'LOADING_CHARGE',
  LOADING_AMOUNT = 'LOADING_AMOUNT',
  LOADING_HSN = 'LOADING_HSN',
  //
  UNLOADING_CHARGE = 'UNLOADING_CHARGE',
  UNLOADING_AMOUNT = 'UNLOADING_AMOUNT',
  UNLOADING_HSN = 'UNLOADING_HSN',
  //
  UNPACKING_CHARGE = 'UNPACKING_CHARGE',
  UNPACKING_AMOUNT = 'UNPACKING_AMOUNT',
  UNPACKING_HSN = 'UNPACKING_HSN',
  //
  OTHER_CHARGES = 'OTHER_CHARGES',
  //
  SURCHARGE = 'SURCHARGE',
  SURCHARGE_PERCENT = 'SURCHARGE_PERCENT',
  //
  DISCOUNT_IN_INVOICE = 'DISCOUNT_IN_INVOICE',
  DISCOUNT_VALUE_OR_PERCENT = 'DISCOUNT_VALUE_OR_PERCENT',
  //
  GST_ON_INVOICE = 'GST_ON_INVOICE',
  GST_PERCENT = 'GST_PERCENT',
  GST_TYPE = 'GST_TYPE',
  GST_PAID_BY = 'GST_PAID_BY',
  //
  TRANSIT_INSURANCE = 'TRANSIT_INSURANCE',
  TRANSIT_LUGGAGE = 'TRANSIT_LUGGAGE',
  TRANSIT_INSURANCE_TYPE = 'TRANSIT_INSURANCE_TYPE',
  TRANSIT_INSURANCE_CHARGE = 'TRANSIT_INSURANCE_CHARGE',
  TRANSIT_INSURANCE_GST = 'TRANSIT_INSURANCE_GST',
  TRANSIT_GOODS_VALUE = 'TRANSIT_GOODS_VALUE',
  //
  STORAGE = 'STORAGE',
  STORAGE_DURATION = 'STORAGE_DURATION',
  STORAGE_FROM_DATE = 'STORAGE_FROM_DATE',
  STORAGE_TO_DATE = 'STORAGE_TO_DATE',
  STORAGE_AMOUNT = 'STORAGE_AMOUNT',
}

export interface IOtherCharge {
  particular_name: string;
  quantity: string;
  rate_per_item: string;
  amount: string;
  hsn_code: string;
}

interface State {
  billing_type: string;
  same_as_client_address: boolean;
  // **** Freight Charge ****
  freight_load_type: string;
  freight_charges: string;
  freight_hsn: string;
  // **** Pickup Charge ****
  pickup_charge: string;
  pickup_charge_amount: string;
  pickup_charge_hsn: string;
  // **** Door Delivery Charge ****
  door_delivery_charge: string;
  door_delivery_amount: string;
  door_delivery_hsn: string;
  // **** Packing Charge ****
  packing_charge: string;
  packing_amount: string;
  packing_hsn: string;
  // **** Packing Material Charge ****
  packing_material_charge: string;
  packing_material_amount: string;
  packing_material_hsn: string;
  // **** Loading Charge ****
  loading_charge: string;
  loading_amount: string;
  loading_hsn: string;
  // **** Unloading Charge ****
  unloading_charge: string;
  unloading_amount: string;
  unloading_hsn: string;
  // **** Unpacking Charge ****
  unpacking_charge: string;
  unpacking_amount: string;
  unpakcing_hsn: string;
  // **** Other Charges ****
  other_charges: IOtherCharge[];
  // **** Surcharge ****
  surcharge: string;
  surcharge_percent: string;
  // **** Discount in Invoice ****
  discount_in_invoice: string;
  discount_value_or_percent: string;
  // **** GST on Invoice
  gst_on_invoice: string;
  gst_percent: string;
  gst_type: string;
  gst_paid_by: string;
  // **** Insurace ****
  transit_insurance: string;
  transit_luggage: string;
  transit_insurance_type: string;
  transit_insurance_charge: string;
  transit_insurance_gst: string;
  transit_goods_value: string;
  // **** Storage ****
  storage:string;
  storage_duration: string;
  storage_from_date: string;
  storage_to_date: string;
  storage_amount: string;
}

interface Action {
  type: ACTION;
  payload: string | boolean | IOtherCharge[];
}

export const initialState: State = {
  billing_type: billingByOptions[0],
  same_as_client_address: true,
  freight_load_type: loadTypeOptions[0],
  freight_charges: '',
  freight_hsn: '',
  // **** Pickup Charge ****
  pickup_charge: pickupChargeOptions[1],
  pickup_charge_amount: '',
  pickup_charge_hsn: '',
  // **** Door Delivery Charge ****
  door_delivery_charge: doorDeliveryChargeOptions[1],
  door_delivery_amount: '',
  door_delivery_hsn: '',
  // **** Packing Charge ****
  packing_charge: pickupChargeOptions[1],
  packing_amount: '',
  packing_hsn: '',
  // **** Packing Material Charge ****
  packing_material_charge: pickupChargeOptions[1],
  packing_material_amount: '',
  packing_material_hsn: '',
  // **** Loading Charge ****
  loading_charge: loadingChargeOptions[1],
  loading_amount: '',
  loading_hsn: '',
  // **** Unloading Charge ****
  unloading_charge: unloadingChargeOptions[1],
  unloading_amount: '',
  unloading_hsn: '',
  // **** Unpacking Charge ****
  unpacking_charge: '',
  unpacking_amount: '',
  unpakcing_hsn: '',
  // **** Other Charges ****
  other_charges: [],
  // **** Surcharge ****
  surcharge: '',
  surcharge_percent: '',
  // **** Discount in Invoice ****
  discount_in_invoice: '',
  discount_value_or_percent: '',
  // **** GST on Invoice ****
  gst_on_invoice: '',
  gst_percent: '',
  gst_type: '',
  gst_paid_by: '',
  // **** Insurace ****
  transit_insurance: '',
  transit_luggage: '',
  transit_insurance_type: '',
  transit_insurance_charge: '',
  transit_insurance_gst: '',
  transit_goods_value: '',
  // **** Storage ****
  storage:'',
  storage_duration: '',
  storage_from_date: '',
  storage_to_date: '',
  storage_amount: '',
};

export const invoiceReducer = (state: State, action: Action) => {
  const {type, payload} = action;
  switch (type) {
    case ACTION.BILING_TYPE:
      return {...state, billing_type: payload as string};
    case ACTION.SAME_AS_CLIENT_ADDRESS:
      return {...state, same_as_client_address: payload as boolean};
    case ACTION.FREIGHT_LOAD_TYPE:
      return {...state, freight_load_type: payload as string};
    case ACTION.FREIGHT_CHARGES:
      return {...state, freight_charges: payload as string};
    case ACTION.FREIGHT_HSN:
      return {...state, freight_hsn: payload as string};
    // **** Pickup Charges ****
    case ACTION.PICKUP_CHARGE:
      return {...state, pickup_charge: payload as string};
    case ACTION.PICKUP_CHARGE_AMOUNT:
      return {...state, pickup_charge_amount: payload as string};
    case ACTION.PICKUP_CHARGE_HSN:
      return {...state, pickup_charge_hsn: payload as string};
    // **** Door Delivery Charges ****
    case ACTION.DOOR_DELIVERY_CHARGE:
      return {...state, door_delivery_charge: payload as string};
    case ACTION.DOOR_DELIVERY_AMOUNT:
      return {...state, door_delivery_amount: payload as string};
    case ACTION.DOOR_DELIVERY_HSN:
      return {...state, door_delivery_hsn: payload as string};
    // **** Packing Charges ****
    case ACTION.PACKING_CHARGE:
      return {...state, packing_charge: payload as string};
    case ACTION.PACKING_AMOUNT:
      return {...state, packing_amount: payload as string};
    case ACTION.PACKING_HSN:
      return {...state, packing_hsn: payload as string};
    // **** Packing Material Charges ****
    case ACTION.PACKING_MATERIAL_CHARGE:
      return {...state, packing_material_charge: payload as string};
    case ACTION.PACKING_MATERIAL_AMOUNT:
      return {...state, packing_material_amount: payload as string};
    case ACTION.PACKING_MATERIAL_HSN:
      return {...state, packing_material_hsn: payload as string};
    // **** Loading Charge ****
    case ACTION.LOADING_CHARGE:
      return {...state, loading_charge: payload as string};
    case ACTION.LOADING_AMOUNT:
      return {...state, loading_amount: payload as string};
    case ACTION.LOADING_HSN:
      return {...state, loading_hsn: payload as string};
    // **** Unloading Charge ****
    case ACTION.UNLOADING_CHARGE:
      return {...state, unloading_charge: payload as string};
    case ACTION.UNLOADING_AMOUNT:
      return {...state, unloading_amount: payload as string};
    case ACTION.UNLOADING_HSN:
      return {...state, unloading_hsn: payload as string};
    // **** Unpacking Charge ****
    case ACTION.UNPACKING_CHARGE:
      return {...state, unpacking_charge: payload as string};
    case ACTION.UNPACKING_AMOUNT:
      return {...state, unpacking_amount: payload as string};
    case ACTION.UNPACKING_HSN:
      return {...state, unpakcing_hsn: payload as string};
    // **** Other Charges ****
    case ACTION.OTHER_CHARGES:
      return {...state, other_charges: payload as IOtherCharge[]};
    // **** Surcharge ****
    case ACTION.SURCHARGE:
      return {...state, surcharge: payload as string};
    case ACTION.SURCHARGE_PERCENT:
      return {...state, surcharge_percent: payload as string};
    // **** Discount in Invoice ****
    case ACTION.DISCOUNT_IN_INVOICE:
      return {...state, discount_in_invoice: payload as string};
    case ACTION.DISCOUNT_VALUE_OR_PERCENT:
      return {...state, discount_value_or_percent: payload as string};
    // **** GST on Invoice ****
    case ACTION.GST_ON_INVOICE:
      return {...state, gst_on_invoice: payload as string};
    case ACTION.GST_PERCENT:
      return {...state, gst_percent: payload as string};
    case ACTION.GST_TYPE:
      return {...state, gst_type: payload as string};
    case ACTION.GST_PAID_BY:
      return {...state, gst_paid_by: payload as string};
    // **** Insurace ****
    case ACTION.TRANSIT_INSURANCE:
      return {...state, transit_insurance: payload as string};
    case ACTION.TRANSIT_LUGGAGE:
      return {...state, transit_luggage: payload as string};
    case ACTION.TRANSIT_INSURANCE_TYPE:
      return {...state, transit_insurance_type: payload as string};
    case ACTION.TRANSIT_INSURANCE_CHARGE:
      return {...state, transit_insurance_charge: payload as string};
    case ACTION.TRANSIT_INSURANCE_GST:
      return {...state, transit_insurance_gst: payload as string};
    case ACTION.TRANSIT_GOODS_VALUE:
      return {...state, transit_goods_value: payload as string};
    // **** Storage ****
    case ACTION.STORAGE:
      return {...state, storage: payload as string};
    case ACTION.STORAGE_DURATION:
      return {...state, storage_duration: payload as string};
    case ACTION.STORAGE_FROM_DATE:
      return {...state, storage_from_date: payload as string};
    case ACTION.STORAGE_TO_DATE:
      return {...state, storage_to_date: payload as string};
    case ACTION.STORAGE_AMOUNT:
      return {...state, storage_amount: payload as string};
    default:
      return state;
  }
};
