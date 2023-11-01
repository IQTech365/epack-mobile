import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IAddPaymentMethodRequest } from '../../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodRequest';
import { IAddPaymentMethodResponse } from '../../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodResponse';
import { IGetPaymentMethodsResponse } from '../../interface/setting/packerProfile/paymentMethod/IGetPaymentMethodsResponse';
import { ICreateSerialNoRequest } from '../../interface/setting/serialNo/ICreateSerialNoRequest';
import { ICreateSerialNoResponse } from '../../interface/setting/serialNo/ICreateSerialNoResponse';

interface ISNSettingState {
    serialNoFor: string;
    moneyReceiptSNList: ICreateSerialNoResponse | null;
    carConditionsSNList: ICreateSerialNoResponse | null;
    biltySNList: ICreateSerialNoResponse | null;
    invoiceSNList: ICreateSerialNoResponse | null;
    quotationSNList: ICreateSerialNoResponse | null;
    // Add Serial No
    createSerialNumberInfo: ICreateSerialNoResponse | null;
    createSerialNumberRequesting: boolean;
    createSerialNumberSuccess: boolean;
    createSerialNumberFailure: boolean;
    createSerialNumberError: any;
    // Update Serial No
    updateSerialNumberInfo: any;
    updateSerialNumberRequesting: boolean;
    updateSerialNumberSuccess: boolean;
    updateSerialNumberFailure: boolean;
    updateSerialNumberError: any;
    // Get Serial No
    paymentMethods: IGetPaymentMethodsResponse | null;
    getSerialNumberRequesting: boolean;
    getSerialNumberSuccess: boolean;
    getSerialNumberFailure: boolean;
    getSerialNumberError: any;

}

const initialState: ISNSettingState = {
    serialNoFor: '',
    moneyReceiptSNList: null,
    carConditionsSNList: null,
    biltySNList: null,
    invoiceSNList: null,
    quotationSNList: null,
    // Add Money Receipt SN
    createSerialNumberInfo: null,
    createSerialNumberRequesting: false,
    createSerialNumberSuccess: false,
    createSerialNumberFailure: false,
    createSerialNumberError: null,
    // Update Money Receipt SN
    updateSerialNumberInfo: null,
    updateSerialNumberRequesting: false,
    updateSerialNumberSuccess: false,
    updateSerialNumberFailure: false,
    updateSerialNumberError: false,
    // Get Money Receipt SN
    paymentMethods: null,
    getSerialNumberRequesting: false,
    getSerialNumberSuccess: false,
    getSerialNumberFailure: false,
    getSerialNumberError: null,
}

export const SNSettingSlice = createSlice({
    name: 'SNSettingSlice',
    initialState: initialState,
    reducers: {
        // ***** Create SN *****
        createSerialNoRequest: (state, action: PayloadAction<ICreateSerialNoRequest>) => {
            state.createSerialNumberRequesting = true;
        },
        createSerialNoSuccess: (state, action: PayloadAction<ICreateSerialNoResponse>) => {
            state.createSerialNumberRequesting = false;
            state.createSerialNumberSuccess = true;
            state.createSerialNumberInfo = action.payload;
        },
        createSerialNoFailure: (state, action: PayloadAction<any>) => {
            state.createSerialNumberRequesting = false;
            state.createSerialNumberSuccess = false;
            state.createSerialNumberFailure = true;
            state.createSerialNumberError = action.payload;
        },
        resetCreateSerialNoRequest: (state) => {
            state.createSerialNumberRequesting = false;
            state.createSerialNumberSuccess = false;
            state.createSerialNumberFailure = false;
            state.createSerialNumberError = null;
        },
        // ***** Update SN *****
        updateSerialNoRequest: (state, action: PayloadAction<IAddPaymentMethodRequest>) => {
            state.updateSerialNumberRequesting = true;
        },
        updateSerialNoSuccess: (state, action: PayloadAction<IAddPaymentMethodResponse>) => {
            state.updateSerialNumberRequesting = false;
            state.updateSerialNumberSuccess = true;
            state.updateSerialNumberInfo = action.payload;
        },
        updateSerialNoFailure: (state, action: PayloadAction<any>) => {
            state.updateSerialNumberRequesting = false;
            state.updateSerialNumberSuccess = false;
            state.updateSerialNumberFailure = true;
            state.updateSerialNumberError = action.payload;
        },
        resetUpdateSerialNoRequest: (state) => {
            state.updateSerialNumberRequesting = false;
            state.updateSerialNumberSuccess = false;
            state.updateSerialNumberFailure = false;
            state.updateSerialNumberError = null;
        },
        // ***** Get SN *****
        getSerialNoRequest: (state, action: PayloadAction<string>) => {
            state.getSerialNumberRequesting = true;
        },
        getSerialNoSuccess: (state, action: PayloadAction<IGetPaymentMethodsResponse>) => {
            state.getSerialNumberRequesting = false;
            state.getSerialNumberSuccess = true;
            state.paymentMethods = action.payload;
        },
        getSerialNoFailure: (state, action: PayloadAction<any>) => {
            state.getSerialNumberRequesting = false;
            state.getSerialNumberSuccess = false;
            state.getSerialNumberFailure = true;
            state.getSerialNumberError = action.payload;
        },
    }
});

export default SNSettingSlice.reducer;

export const {
    // Add Payment method
    createSerialNoRequest,
    createSerialNoSuccess,
    createSerialNoFailure,
    resetCreateSerialNoRequest,
    // Update Payment method
    updateSerialNoRequest,
    updateSerialNoSuccess,
    updateSerialNoFailure,
    resetUpdateSerialNoRequest,
    // Get Money Receipt SN
    getSerialNoRequest,
    getSerialNoSuccess,
    getSerialNoFailure,

} = SNSettingSlice.actions;