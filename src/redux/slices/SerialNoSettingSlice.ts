import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IAddPaymentMethodRequest } from '../../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodRequest';
import { IAddPaymentMethodResponse } from '../../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodResponse';
import { IGetPaymentMethodsResponse } from '../../interface/setting/packerProfile/paymentMethod/IGetPaymentMethodsResponse';
import { ICreateSerialNoResponse } from '../../interface/setting/serialNo/ICreateSerialNoResponse';

interface ISNSettingState {
    serialNoFor: string;
    moneyReceiptSNList: ICreateSerialNoResponse | null;
    carConditionsSNList: ICreateSerialNoResponse | null;
    biltySNList: ICreateSerialNoResponse | null;
    invoiceSNList: ICreateSerialNoResponse | null;
    quotationSNList: ICreateSerialNoResponse | null;
    // Add Money Receipt SN
    createMoneyReceiptSNInfo: IAddPaymentMethodResponse | null;
    createSerialNoRequesting: boolean;
    createSerialNoSuccess: boolean;
    createSerialNoFailure: boolean;
    createSerialNoError: any;
    // Delete Money Receipt SN
    deletePaymentMethodInfo: any;
    deletePaymentMethodRequesting: boolean;
    deletePaymentMethodSuccess: boolean;
    deletePaymentMethodFailure: boolean;
    deletePaymentMethodError: any;
    // Update Money Receipt SN
    updatePaymentMethodInfo: any;
    updatePaymentMethodRequesting: boolean;
    updatePaymentMethodSuccess: boolean;
    updatePaymentMethodFailure: boolean;
    updatePaymentMethodError: any;
    // Get Money Receipt SN
    paymentMethods: IGetPaymentMethodsResponse | null;
    getSerialNoRequesting: boolean;
    getSerialNoSuccess: boolean;
    getSerialNoFailure: boolean;
    getSerialNoError: any;

}

const initialState: ISNSettingState = {
    serialNoFor: '',
    moneyReceiptSNList: null,
    carConditionsSNList: null,
    biltySNList: null,
    invoiceSNList: null,
    quotationSNList: null,
    // Add Money Receipt SN
    createMoneyReceiptSNInfo: null,
    createSerialNoRequesting: false,
    createSerialNoSuccess: false,
    createSerialNoFailure: false,
    createSerialNoError: null,
    // Delete Money Receipt SN
    deletePaymentMethodInfo: null,
    deletePaymentMethodRequesting: false,
    deletePaymentMethodSuccess: false,
    deletePaymentMethodFailure: false,
    deletePaymentMethodError: null,
    // Update Money Receipt SN
    updatePaymentMethodInfo: null,
    updatePaymentMethodRequesting: false,
    updatePaymentMethodSuccess: false,
    updatePaymentMethodFailure: false,
    updatePaymentMethodError: false,
    // Get Money Receipt SN
    paymentMethods: null,
    getSerialNoRequesting: false,
    getSerialNoSuccess: false,
    getSerialNoFailure: false,
    getSerialNoError: null,
}

export const SNSettingSlice = createSlice({
    name: 'SNSettingSlice',
    initialState: initialState,
    reducers: {
        // ***** Add Money Receipt SN *****
        // ******************************
        addPaymentMethodRequest: (state, action: PayloadAction<IAddPaymentMethodRequest>) => {
            state.createSerialNoRequesting = true;
        },
        createSerialNoSuccess: (state, action: PayloadAction<IAddPaymentMethodResponse>) => {
            state.createSerialNoRequesting = false;
            state.createSerialNoSuccess = true;
            state.createMoneyReceiptSNInfo = action.payload;
        },
        createSerialNoFailure: (state, action: PayloadAction<any>) => {
            state.createSerialNoRequesting = false;
            state.createSerialNoSuccess = false;
            state.createSerialNoFailure = true;
            state.createSerialNoError = action.payload;
        },
        resetAddPaymentMethodRequest: (state) => {
            state.createSerialNoRequesting = false;
            state.createSerialNoSuccess = false;
            state.createSerialNoFailure = false;
            state.createSerialNoError = null;
        },
        // ***** Delete Money Receipt SN *****
        // ******************************
        deletePaymentMethodRequest: (state, action: PayloadAction<IAddPaymentMethodRequest>) => {
            state.deletePaymentMethodRequesting = true;
        },
        deletePaymentMethodSuccess: (state, action: PayloadAction<IAddPaymentMethodResponse>) => {
            state.deletePaymentMethodRequesting = false;
            state.deletePaymentMethodSuccess = true;
            state.deletePaymentMethodInfo = action.payload;
        },
        deletePaymentMethodFailure: (state, action: PayloadAction<any>) => {
            state.deletePaymentMethodRequesting = false;
            state.deletePaymentMethodSuccess = false;
            state.deletePaymentMethodFailure = true;
            state.deletePaymentMethodError = action.payload;
        },
        resetDeletePaymentMethodRequest: (state) => {
            state.deletePaymentMethodRequesting = false;
            state.deletePaymentMethodSuccess = false;
            state.deletePaymentMethodFailure = false;
            state.deletePaymentMethodError = null;
        },
        // ***** Update Money Receipt SN *****
        // ******************************
        updatePaymentMethodRequest: (state, action: PayloadAction<IAddPaymentMethodRequest>) => {
            state.updatePaymentMethodRequesting = true;
        },
        updatePaymentMethodSuccess: (state, action: PayloadAction<IAddPaymentMethodResponse>) => {
            state.updatePaymentMethodRequesting = false;
            state.updatePaymentMethodSuccess = true;
            state.updatePaymentMethodInfo = action.payload;
        },
        updatePaymentMethodFailure: (state, action: PayloadAction<any>) => {
            state.updatePaymentMethodRequesting = false;
            state.updatePaymentMethodSuccess = false;
            state.updatePaymentMethodFailure = true;
            state.updatePaymentMethodError = action.payload;
        },
        resetUpdatePaymentMethodRequest: (state) => {
            state.updatePaymentMethodRequesting = false;
            state.updatePaymentMethodSuccess = false;
            state.updatePaymentMethodFailure = false;
            state.updatePaymentMethodError = null;
        },
        // ***** Get Money Receipt SN *****
        // ******************************
        getPaymentMethodsRequest: (state, action: PayloadAction<string>) => {
            state.getSerialNoRequesting = true;
        },
        getSerialNoSuccess: (state, action: PayloadAction<IGetPaymentMethodsResponse>) => {
            state.getSerialNoRequesting = false;
            state.getSerialNoSuccess = true;
            state.paymentMethods = action.payload;
        },
        getSerialNoFailure: (state, action: PayloadAction<any>) => {
            state.getSerialNoRequesting = false;
            state.getSerialNoSuccess = false;
            state.getSerialNoFailure = true;
            state.getSerialNoError = action.payload;
        },
    }
});

export default SNSettingSlice.reducer;

export const {
    // Add Payment method
    addPaymentMethodRequest,
    createSerialNoSuccess,
    createSerialNoFailure,
    resetAddPaymentMethodRequest,
    // Delete Payment method
    deletePaymentMethodRequest,
    deletePaymentMethodSuccess,
    deletePaymentMethodFailure,
    resetDeletePaymentMethodRequest,
    // Update Payment method
    updatePaymentMethodRequest,
    updatePaymentMethodSuccess,
    updatePaymentMethodFailure,
    resetUpdatePaymentMethodRequest,
    // Get Money Receipt SN
    getPaymentMethodsRequest,
    getSerialNoSuccess,
    getSerialNoFailure,

} = SNSettingSlice.actions;