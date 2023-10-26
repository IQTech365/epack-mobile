import { Reducer } from 'react';

//** ALL ACTIONS */
export enum ADD_FRANCHISE_FORM_ACTION {
    FRANCHISE_NAME = 'FRANCHISE_NAME',
    FRANCHISE_OWNER = 'FRANCHISE_OWNER',
    REGISTERED_MOBILE = 'REGISTERED_MOBILE',
    PINCODE = 'PINCODE',
    STATE = 'STATE',
    CITY = 'CITY',
    LOCALITY = 'LOCALITY',
    LANDMARK = 'LANDMARK',
    EMAIL = 'EMAIL',
    ADDRESS = 'ADDRESS',
    CREATED_BY = 'CREATED_BY',
}

/** ADD FRANCHISE FORM STATE */
export interface IAddFranchiseFormState {
    franchiseName: string;
    franchiseOwner: string;
    registeredMobile: string;
    pincode: string;
    state: string;
    city: string;
    locality: string;
    landmark: string;
    email: string;
    address: string;
    createdBy: string;
}

/** ACTION INTERFACE */
export interface IAddFranchiseAction {
    type: ADD_FRANCHISE_FORM_ACTION;
    payload: string;
}

/** INITIAL STATE */
export const initialState: IAddFranchiseFormState = {
    franchiseName: '',
    franchiseOwner: '',
    registeredMobile: '',
    pincode: '',
    state: '',
    city: '',
    locality: '',
    landmark: '',
    email: '',
    address: '',
    createdBy: '',
};

/** Add FRANCHISE Reducer */
export const addFranchiseReducer: Reducer<
    IAddFranchiseFormState,
    IAddFranchiseAction
> = (state: IAddFranchiseFormState, action: IAddFranchiseAction) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_FRANCHISE_FORM_ACTION.FRANCHISE_NAME:
            return { ...state, franchiseName: payload as string };
        case ADD_FRANCHISE_FORM_ACTION.FRANCHISE_OWNER:
            return { ...state, franchiseOwner: payload as string };
        case ADD_FRANCHISE_FORM_ACTION.REGISTERED_MOBILE:
            return { ...state, registeredMobile: payload as string };
        case ADD_FRANCHISE_FORM_ACTION.PINCODE:
            return { ...state, pincode: payload as string };
        case ADD_FRANCHISE_FORM_ACTION.STATE:
            return { ...state, state: payload as string };
        case ADD_FRANCHISE_FORM_ACTION.CITY:
            return { ...state, city: payload as string };
        case ADD_FRANCHISE_FORM_ACTION.LOCALITY:
            return { ...state, locality: payload as string };
        case ADD_FRANCHISE_FORM_ACTION.LANDMARK:
            return { ...state, landmark: payload as string };
        case ADD_FRANCHISE_FORM_ACTION.EMAIL:
            return { ...state, email: payload as string };
        case ADD_FRANCHISE_FORM_ACTION.ADDRESS:
            return { ...state, address: payload as string };
        case ADD_FRANCHISE_FORM_ACTION.CREATED_BY:
            return { ...state, createdBy: payload as string };
        default:
            return state;
    }
};