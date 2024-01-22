import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ICreateSerialNoRequest, ICreateSerialNoResponse, IGetSerialNoRequest, IGetSerialNoResponse } from '../../interface/setting/serialNo/serialNo';

interface ISNSettingState {
    // ***** Create Serial No for Given Form Type e.g. Quotation, Bilty, Invoice, Car Condition *****
    createSerialNumberInfo: ICreateSerialNoResponse | null;
    createSerialNumberRequesting: boolean;
    createSerialNumberSuccess: boolean;
    createSerialNumberFailure: boolean;
    createSerialNumberError: any;
    // ***** Get Next Serial No for Given Form Type e.g. Quotation, Bilty, Invoice, Car Condition *****
    serialNo: IGetSerialNoResponse | null;
    getSerialNumberRequesting: boolean;
    getSerialNumberSuccess: boolean;
    getSerialNumberFailure: boolean;
    getSerialNumberError: any;

}

const initialState: ISNSettingState = {
    // ***** Create Serial No for Given Form Type e.g. Quotation, Bilty, Invoice, Car Condition *****
    createSerialNumberInfo: null,
    createSerialNumberRequesting: false,
    createSerialNumberSuccess: false,
    createSerialNumberFailure: false,
    createSerialNumberError: null,
    // ***** Get Serial No for Given Form Type e.g. Quotation, Bilty, Invoice, Car Condition *****
    serialNo: null,
    getSerialNumberRequesting: false,
    getSerialNumberSuccess: false,
    getSerialNumberFailure: false,
    getSerialNumberError: null,
}

export const SNSettingSlice = createSlice({
    name: 'SNSettingSlice',
    initialState: initialState,
    reducers: {
        // ***** Create Serial No for Given Form Type e.g. Quotation, Bilty, Invoice, Car Condition *****
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
        // ***** Get Serial No for Given Form Type e.g. Quotation, Bilty, Invoice, Car Condition *****
        getSerialNoRequest: (state, action: PayloadAction<IGetSerialNoRequest>) => {
            state.getSerialNumberRequesting = true;
        },
        getSerialNoSuccess: (state, action: PayloadAction<IGetSerialNoResponse>) => {
            state.getSerialNumberRequesting = false;
            state.getSerialNumberSuccess = true;
            state.serialNo = action.payload;
        },
        getSerialNoFailure: (state, action: PayloadAction<any>) => {
            state.getSerialNumberRequesting = false;
            state.getSerialNumberSuccess = false;
            state.getSerialNumberFailure = true;
            state.getSerialNumberError = action.payload;
        },
        resetGetSerialNoRequest: (state) => {
            state.getSerialNumberRequesting = false;
            state.getSerialNumberSuccess = false;
            state.getSerialNumberFailure = false;
            state.getSerialNumberError = null;
            state.serialNo = null;
        },
    }
});

export default SNSettingSlice.reducer;

export const {
    // ***** Create Serial No for Given Form Type e.g. Quotation, Bilty, Invoice, Car Condition *****
    createSerialNoRequest,
    createSerialNoSuccess,
    createSerialNoFailure,
    resetCreateSerialNoRequest,
    // ***** Get Serial No for Given Form Type e.g. Quotation, Bilty, Invoice, Car Condition *****
    getSerialNoRequest,
    getSerialNoSuccess,
    getSerialNoFailure,
    resetGetSerialNoRequest,

} = SNSettingSlice.actions;