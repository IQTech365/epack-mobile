import { Reducer } from 'react';

//** ALL ACTIONS */
export enum ADD_Driver_FORM_ACTION {
    CHOOSE_ENTITY = 'CHOOSE_ENTITY',
    ENTITY_ID = 'ENTITY_ID',
    BRANCH_NAME = 'BRANCH_NAME',
    DRIVER_NAME = 'DRIVER_NAME',
    MOBILE = 'MOBILE',
    LICENCE_NO = 'LICENCE_NO',
    AADHAR_NO = 'AADHAR_NO',
    PERMANENT_ADDRESS = 'PERMANENT_ADDRESS',
    CURRENT_ADDRESS = 'CURRENT_ADDRESS',
    CREATED_BY = 'CREATED_BY',
}

// **  Address info
export type TAddressInfo = {
    state: string;
    city: string;
    address: string;
    pincode: string;
    locality: string;
};

const defaultAddress: TAddressInfo = {
    state: '',
    city: '',
    address: '',
    pincode: '',
    locality: '',
};

/** ADD DRIVER FORM STATE */
export interface IAddDriverFormState {
    chooseEntity: string;
    entityId: string;
    branchName: string;
    driverName: string;
    mobile: string;
    licenceNo: string;
    aadharNo: string;
    permanentAddress: TAddressInfo | null;
    currentAddress: TAddressInfo | null;
    createdBy: string;
}

/** ACTION INTERFACE */
export interface IAddDriverAction {
    type: ADD_Driver_FORM_ACTION;
    payload: string;
}

/** INITIAL STATE */
export const initialState: IAddDriverFormState = {
    chooseEntity: '',
    entityId: '',
    branchName: '',
    driverName: '',
    mobile: '',
    licenceNo: '',
    aadharNo: '',
    permanentAddress: defaultAddress,
    currentAddress: defaultAddress,
    createdBy: ''
};

/** Add Lorry Reducer */
export const addAddDriverReducer: Reducer<
    IAddDriverFormState,
    IAddDriverAction
> = (state: IAddDriverFormState, action: IAddDriverAction) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_Driver_FORM_ACTION.CHOOSE_ENTITY:
            return { ...state, chooseEntity: payload as string };
        case ADD_Driver_FORM_ACTION.ENTITY_ID:
            return { ...state, entityId: payload as string };
        case ADD_Driver_FORM_ACTION.BRANCH_NAME:
            return { ...state, branchName: payload as string };
        case ADD_Driver_FORM_ACTION.DRIVER_NAME:
            return { ...state, driverName: payload as string };
        case ADD_Driver_FORM_ACTION.MOBILE:
            return { ...state, mobile: payload as string };
        case ADD_Driver_FORM_ACTION.LICENCE_NO:
            return { ...state, licenceNo: payload as string };
        case ADD_Driver_FORM_ACTION.AADHAR_NO:
            return { ...state, aadharNo: payload as string };
        case ADD_Driver_FORM_ACTION.PERMANENT_ADDRESS:
            return { ...state, permanentAddress: payload as unknown as TAddressInfo };
        case ADD_Driver_FORM_ACTION.CURRENT_ADDRESS:
            return { ...state, currentAddress: payload as unknown as TAddressInfo };
        default:
            return state;
    }
};