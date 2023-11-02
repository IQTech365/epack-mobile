import { Reducer } from 'react';

//** ALL ACTIONS */
export enum ADD_LORRY_FORM_ACTION {
    CHOOSE_ENTITY = 'CHOOSE_ENTITY',
    BRANCH_NAME = 'BRANCH_NAME',
    LORRY_COMPANY_NAME = 'LORRY_COMPANY_NAME',
    LORRY_TYPE = 'LORRY_TYPE',
    REGISTRATION_NO = 'REGISTRATION_NO',
    MANUFACTURE_YEAR = 'MANUFACTURE_YEAR',
    VEHICLE_CHASSI_NO = 'VEHICLE_CHASSI_NO',
    VEHICLE_ENGINE_NO = 'VEHICLE_ENGINE_NO',
    VEHICLE_RC_NO = 'VEHICLE_RC_NO',
    UPLOAD_RC = 'UPLOAD_RC',
    POLLUTION_CERTI_NO = 'POLLUTION_CERTI_NO',
    RENEWAL_DATE = 'RENEWAL_DATE',
    UPLOAD_POLLUTION_CERTI_NO = 'UPLOAD_POLLUTION_CERTI_NO',
    PERMIT_NO = 'PERMIT_NO',
    RENEWAL_PERMIT_DATE = 'RENEWAL_PERMIT_DATE',
    UPLOAD_PERMIT = 'UPLOAD_PERMIT',
    CREATED_BY = 'CREATED_BY',
}

/** ADD LORRY FORM STATE */
export interface IAddLorryFormState {
    chooseEntity: string;
    branchName: string;
    lorryCompanyName: string;
    lorryType: string;
    registrationNo: string;
    manufactureYear: string;
    vehicleChassiNo: string;
    vehicleEngineNo: string;
    vehicleRCNo: string;
    uploadRC: string;
    pollutionCertiNo: string;
    renewalDate: string;
    uploadPollutionCertiNo: string;
    permitNo: string;
    renewalPermitDate: string;
    uploadPermit: string;
    createdBy: string;
}

/** ACTION INTERFACE */
export interface IAddLorryAction {
    type: ADD_LORRY_FORM_ACTION;
    payload: string;
}

/** INITIAL STATE */
export const initialState: IAddLorryFormState = {
    chooseEntity: '',
    branchName: '',
    lorryCompanyName: '',
    lorryType: '',
    registrationNo: '',
    manufactureYear: '',
    vehicleChassiNo: '',
    vehicleEngineNo: '',
    vehicleRCNo: '',
    uploadRC: '',
    pollutionCertiNo: '',
    renewalDate: '',
    uploadPollutionCertiNo: '',
    permitNo: '',
    renewalPermitDate: '',
    uploadPermit: '',
    createdBy: '',
};

/** Add Lorry Reducer */
export const addAddLorryReducer: Reducer<
    IAddLorryFormState,
    IAddLorryAction
> = (state: IAddLorryFormState, action: IAddLorryAction) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_LORRY_FORM_ACTION.CHOOSE_ENTITY:
            return { ...state, chooseEntity: payload as string };
        case ADD_LORRY_FORM_ACTION.BRANCH_NAME:
            return { ...state, branchName: payload as string };
        case ADD_LORRY_FORM_ACTION.LORRY_COMPANY_NAME:
            return { ...state, lorryCompanyName: payload as string };
        case ADD_LORRY_FORM_ACTION.LORRY_TYPE:
            return { ...state, lorryType: payload as string };
        case ADD_LORRY_FORM_ACTION.REGISTRATION_NO:
            return { ...state, registrationNo: payload as string };
        case ADD_LORRY_FORM_ACTION.MANUFACTURE_YEAR:
            return { ...state, manufactureYear: payload as string };
        case ADD_LORRY_FORM_ACTION.VEHICLE_CHASSI_NO:
            return { ...state, vehicleChassiNo: payload as string };
        case ADD_LORRY_FORM_ACTION.VEHICLE_ENGINE_NO:
            return { ...state, vehicleEngineNo: payload as string };
        case ADD_LORRY_FORM_ACTION.VEHICLE_RC_NO:
            return { ...state, vehicleRCNo: payload as string };
        case ADD_LORRY_FORM_ACTION.UPLOAD_RC:
            return { ...state, uploadRC: payload as string };
        case ADD_LORRY_FORM_ACTION.POLLUTION_CERTI_NO:
            return { ...state, pollutionCertiNo: payload as string };
        case ADD_LORRY_FORM_ACTION.RENEWAL_DATE:
            return { ...state, renewalDate: payload as string };
        case ADD_LORRY_FORM_ACTION.UPLOAD_POLLUTION_CERTI_NO:
            return { ...state, pollutionCertiNo: payload as string };
        case ADD_LORRY_FORM_ACTION.PERMIT_NO:
            return { ...state, permitNo: payload as string };
        case ADD_LORRY_FORM_ACTION.RENEWAL_PERMIT_DATE:
            return { ...state, renewalPermitDate: payload as string };
        case ADD_LORRY_FORM_ACTION.UPLOAD_PERMIT:
            return { ...state, uploadPermit: payload as string };
        case ADD_LORRY_FORM_ACTION.CREATED_BY:
            return { ...state, createdBy: payload as string };
        default:
            return state;
    }
};