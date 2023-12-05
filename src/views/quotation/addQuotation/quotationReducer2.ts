import { Reducer } from "react"

export enum ACTION {
    SHIFTING_TYPE = 'SHIFTING_TYPE',
    SHIFTING_LUGGAGE = 'SHIFTING_LUGGAGE',
    QUOTATION_NO = 'QUOTATION_NO',
    BILLING_BY = 'BILLING_BY',
    //
    VEHICLE_TYPE = 'VEHICLE_TYPE',
    VEHICLE_MANUFACTURER = 'VEHICLE_MANUFACTURER',
    VEHICLE_MODEL = 'VEHICLE_MODEL',
    //
    PARTY_NAME = 'PARTY_NAME',
    PARTY_MOBILE_NO = 'PARTY_MOBILE_NO',
    //
    COMPANY_NAME = 'COMPANY_NAME',
    APPROVAL_AUTHORITY = 'APPROVAL_AUTHORITY',
    AUTHORITY_PERSON_NAME = 'AUTHORITY_PERSON_NAME',
    AUTHORITY_MOBILE_NO = 'AUTHORITY_MOBILE_NO',
    COMPANY_GST = 'COMPANY_GST',
    EMPLOYEE_NAME = 'EMPLOYEE_NAME',
    EMPLOYEE_DESIGNATION = 'EMPLOYEE_DESIGNATION',
    EMPLOYEE_MOBILE_NO = 'EMPLOYEE_MOBILE_NO',
    COMPANY_ADDRESS = 'COMPANY_ADDRESS',
    //
    PICKUP_PINCODE = 'PICKUP_PINCODE',
    PICKUP_STATE = 'PICKUP_STATE',
    PICKUP_CITY = 'PICKUP_CITY',
    PICKUP_ADDRESS = 'PICKUP_ADDRESS',
    PICKUP_CURRENT_FLOOR = 'PICKUP_CURRENT_FLOOR',
    PICKUP_LIFT_STATUS = 'PICKUP_LIFT_STATUS',
    //
    DROP_PINCODE = 'DROP_PINCODE',
    DROP_STATE = 'DROP_STATE',
    DROP_CITY = 'DROP_CITY',
    DROP_ADDRESS = 'DROP_ADDRESS',
    DROP_CURRENT_FLOOR = 'DROP_CURRENT_FLOOR',
    DROP_LIFT_STATUS = 'DROP_LIFT_STATUS',
    //
    FREIGHT_LOAD_TYPE = 'FREIGHT_LOAD_TYPE',
    LORRY_TYPE = 'LORRY_TYPE',
    FREIGHT_PART_CHARGE = 'FREIGHT_PART_CHARGE',
    FREIGHT_FULL_CHARGE = 'FREIGHT_FULL_CHARGE',
    //
    PACKING_CHARGE = 'PACKING_CHARGE',
    PACKING_CHARGE_PART_LOAD = 'PACKING_CHARGE_PART_LOAD',
    PACKING_CHARGE_FULL_LOAD = 'PACKING_CHARGE_FULL_LOAD',
    //
    PACKING_MATERIAL_CHARGE = 'PACKING_MATERIAL_CHARGE',
    PACKING_MATERIAL_CHARGE_PART_LOAD = 'PACKING_MATERIAL_CHARGE_PART_LOAD',
    PACKING_MATERIAL_CHARGE_FULL_LOAD = 'PACKING_MATERIAL_CHARGE_FULL_LOAD',
    //
    LOADING_CHARGE = 'LOADING_CHARGE',
    LOADING_CHARGE_PART_LOAD = 'LOADING_CHARGE_PART_LOAD',
    LOADING_CHARGE_FULL_LOAD = 'LOADING_CHARGE_FULL_LOAD',
    //
    UNLOADING_CHARGE = 'UNLOADING_CHARGE',
    UNLOADING_CHARGE_PART_LOAD = 'UNLOADING_CHARGE_PART_LOAD',
    UNLOADING_CHARGE_FULL_LOAD = 'UNLOADING_CHARGE_FULL_LOAD',
    //
    UNPACKING_CHARGE = 'UNPACKING_CHARGE',
    UNPACKING_CHARGE_PART_LOAD = 'UNPACKING_CHARGE_PART_LOAD',
    UNPACKING_CHARGE_FULL_LOAD = 'UNPACKING_CHARGE_FULL_LOAD',
    //
    OTHER_CHARGES = 'OTHER_CHARGES',
    //
    ADVANCE_AMOUNT = 'ADVANCE_AMOUNT',
    //
    SURCHARGE = 'SURCHARGE',
    SURCHARGE_PERCENT = 'SURCHARGE_PERCENT',
    //
    DISCOUNT_IN_QUOTATION = 'DISCOUNT_IN_QUOTATION',
    DISCOUNT_PERCENT_OR_VALUE = 'DISCOUNT_PERCENT_OR_VALUE',
    //
    GST_IN_QUOTATION = 'GST_IN_QUOTATION',
    GST_PERCENT = 'GST_PERCENT',
    GST_TYPE = 'GST_TYPE',
    //
    TRANSIT_INSURANCE = 'TRANSIT_INSURANCE',
    TRANSIT_SHIFTING_LUGGAGE = 'TRANSIT_SHIFTING_LUGGAGE',
    TRANSIT_INSURANCE_TYPE = 'TRANSIT_INSURANCE_TYPE',
    TRANSIT_INSURANCE_PERCENT = 'TRANSIT_INSURANCE_PERCENT',
    TRANSIT_INSURANCE_GST_PERCENT = 'TRANSIT_INSURANCE_GST_PERCENT',
    TRANSIT_GOODS_VALUE = 'TRANSIT_GOODS_VALUE',
    //
    STORAGE = 'STORAGE',
    STORAGE_DURATION = 'STORAGE_DURATION',
    STORAGE_FROM_DATE = 'STORAGE_FROM_DATE',
    STORAGE_TO_DATE = 'STORAGE_TO_DATE',
    STORAGE_AMOUNT = 'STORAGE_AMOUNT',
    //
    OTHER_DETAIL_1 = 'OTHER_DETAIL_1',
    OTHER_DETAIL_2 = 'OTHER_DETAIL_2',
    OTHER_DETAIL_3 = 'OTHER_DETAIL_3',
    OTHER_DETAIL_4 = 'OTHER_DETAIL_4',
}

export interface IOtherCharge {
    particular_name: string;
    quantity:string;
    part_load_rate_per_item:string;
    part_load_amount:string;
    full_load_rate_per_item:string;
    full_load_amount:string;
}

export interface IState {
    shifting_type: string,
    shifting_luggage:string,
    quotation_no:string,
    date_of_quotation:string,
    date_of_moving:string,
    // **** Vehicle ****
    vehicle_type:string,
    vehicle_manufacturer:string,
    vehicle_model:string,
    // **** Billing ****
    billing_by:string,
    // **** Billing Individual ****
    party_name:string,
    party_mobile_no:string,
    // **** Billing Company ****
    company_name:string,
    approval_authority:string,
    authority_person_name:string,
    authority_mobile_no:string,
    company_gst:string,
    employee_name:string,
    employee_designation:string,
    employee_mobile_no:string,
    company_address:string,
    // **** Pickup Address
    pickup_pincode:string,
    pickup_state:string,
    pickup_city:string,
    pickup_address:string,
    pickup_current_floor:string,
    pickup_lift_status:string,
    // **** Drop Address
    drop_pincode:string,
    drop_state:string,
    drop_city:string,
    drop_address:string,
    drop_current_floor:string,
    drop_lift_status:string,
    // **** Freight Details ****
    freight_load_type:string,
    lorry_type:string,
    freight_part_charge:string,
    freight_full_charge:string,
    // **** Packing Charge ****
    packing_charge:string,
    packing_charge_part_load: string,
    packing_charge_full_load:string,
    // **** Packing Material Charge ****
    packing_material_charge:string,
    packing_material_charge_part_load: string,
    packing_material_charge_full_load:string,
    // **** Loading Charge ****
    loading_charge:string,
    loading_charge_part_load: string,
    loading_charge_full_load:string,
    // **** Unloading Charge ****
    unloading_charge:string,
    unloading_charge_part_load: string,
    unloading_charge_full_load:string,
    // **** Unpacking Charge ****
    unpacking_charge:string,
    unpacking_charge_part_load: string,
    unpacking_charge_full_load:string,
    // **** Other Charges ****
    other_charges:IOtherCharge[],
    advance_amount:string,
    // **** Surcharge ****
    surcharge:string,
    surcharge_percent: string,
    // **** Discount In Quotation
    discount_in_quotation:string,
    discount_percent_or_value: string,
    // **** GST in Quotation
    gst_in_quotation:string,
    gst_percent:string,
    gst_type:string,
    // **** Transit Insurance ****
    transit_insurance:string,
    transit_shifting_luggage:string,
    transit_insurance_type:string,
    transit_insurance_charge:string,
    transit_insurance_gst:string,
    transit_goods_value:string,
    // **** Storage Charge ****
    storage:string,
    storage_duration:string,
    storage_from_date:string,
    storage_to_date:string,
    storage_amount:string,
    // **** Other Details ****
    other_detail_1:string,
    other_detail_2:string,
    other_detail_3:string,
    other_detail_4:string,
}

export interface IAction {
    type: ACTION,
    payload: string,
}

export const initialState:IState = {
    shifting_type:'',
    shifting_luggage:'',
    quotation_no:'',
    date_of_quotation:'',
    date_of_moving:'',
    // **** Vehicle ****
    vehicle_type:'',
    vehicle_manufacturer:'',
    vehicle_model:'',
    // **** Billing ****
    billing_by:'',
    // **** Billing Individual ****
    party_name:'',
    party_mobile_no:'',
    // **** Billing Company ****
    company_name:'',
    approval_authority:'',
    authority_person_name:'',
    authority_mobile_no:'',
    company_gst:'',
    employee_name:'',
    employee_designation:'',
    employee_mobile_no:'',
    company_address:'',
    // **** Pickup Address
    pickup_pincode:'',
    pickup_state:'',
    pickup_city:'',
    pickup_address:'',
    pickup_current_floor:'',
    pickup_lift_status:'',
    // **** Drop Address
    drop_pincode:'',
    drop_state:'',
    drop_city:'',
    drop_address:'',
    drop_current_floor:'',
    drop_lift_status:'',
    // **** Freight Details ****
    freight_load_type:'',
    lorry_type:'',
    freight_part_charge:'',
    freight_full_charge:'',
    // **** Packing Charge ****
    packing_charge:'',
    packing_charge_part_load: '',
    packing_charge_full_load:'',
    // **** Packing Material Charge ****
    packing_material_charge:'',
    packing_material_charge_part_load: '',
    packing_material_charge_full_load:'',
    // **** Loading Charge ****
    loading_charge:'',
    loading_charge_part_load: '',
    loading_charge_full_load:'',
    // **** Unloading Charge ****
    unloading_charge:'',
    unloading_charge_part_load: '',
    unloading_charge_full_load:'',
    // **** Unpacking Charge ****
    unpacking_charge:'',
    unpacking_charge_part_load: '',
    unpacking_charge_full_load:'',
    // **** Other Charges ****
    other_charges:[],
    advance_amount:'',
    // **** Surcharge ****
    surcharge:'',
    surcharge_percent: '',
    // **** Discount In Quotation
    discount_in_quotation:'',
    discount_percent_or_value: '',
    // **** GST in Quotation
    gst_in_quotation:'',
    gst_percent:'',
    gst_type:'',
    // **** Transit Insurance ****
    transit_insurance:'',
    transit_shifting_luggage:'',
    transit_insurance_type:'',
    transit_insurance_charge:'',
    transit_insurance_gst:'',
    transit_goods_value:'',
    // **** Storage Charge ****
    storage:'',
    storage_duration:'',
    storage_from_date:'',
    storage_to_date:'',
    storage_amount:'',
    // **** Other Details ****
    other_detail_1:'',
    other_detail_2:'',
    other_detail_3:'',
    other_detail_4:'',
}

export const quotationReducer:Reducer<IState, IAction> = (state:IState, action:IAction) => {
    const {type, payload} = action;
    switch (type) {
      case ACTION.SHIFTING_TYPE:
        return {...state, shiftingType: payload as string};
      default:
        return state;
    }
}