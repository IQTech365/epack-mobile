import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAddQuotationRequest} from '../../interface/quotation/IAddQuotationRequest';
import {IAddQuotationResponse} from '../../interface/quotation/IAddQuotationResponse';
import { IGetQuotationsResponse } from '../../interface/quotation/IGetQuotationsResponse';

interface IQuotationState {
  // Add Quotation
  addQuotationInfo: IAddQuotationResponse | null;
  addQuotationRequesting: boolean;
  addQuotationSuccess: boolean;
  addQuotationFailure: boolean;
  addQuotationError: any;
  // Get Quotations
  quotations: IGetQuotationsResponse | null;
  getQuotationsRequesting: boolean;
  getQuotationsSuccess: boolean;
  getQuotationsFailure: boolean;
  getQuotationsError: any;
}

const initialState: IQuotationState = {
  // Add Quotation
  addQuotationInfo: null,
  addQuotationRequesting: false,
  addQuotationSuccess: false,
  addQuotationFailure: false,
  addQuotationError: null,
  // Get Quotations
  quotations: null,
  getQuotationsRequesting: false,
  getQuotationsSuccess: false,
  getQuotationsFailure: false,
  getQuotationsError: null,
};

export const QuotationSlice = createSlice({
  name: 'QuotationSlice',
  initialState: initialState,
  reducers: {

    // Add Quotation
    addQuotationRequest: (
      state,
      action: PayloadAction<IAddQuotationRequest>,
    ) => {
      state.addQuotationRequesting = true;
    },
    aaddQuotationSuccess: (
      state,
      action: PayloadAction<IAddQuotationResponse>,
    ) => {
      state.addQuotationRequesting = false;
      state.addQuotationSuccess = true;
      state.addQuotationInfo = action.payload;
    },
    addQuotationFailure: (state, action: PayloadAction<any>) => {
      state.addQuotationRequesting = false;
      state.addQuotationSuccess = false;
      state.addQuotationFailure = true;
      state.addQuotationError = action.payload;
    },
    resetaddQuotationRequest: (state, action: PayloadAction) => {
      state.addQuotationRequesting = false;
      state.addQuotationSuccess = false;
      state.addQuotationFailure = false;
      state.addQuotationInfo = null;
      state.addQuotationError = null;
    },
    // Get Quotations
    getQuotationsRequest: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.getQuotationsRequesting = true;
    },
    getQuotationsSuccess: (state,action: PayloadAction<IGetQuotationsResponse>) => {
      state.getQuotationsRequesting = false;
      state.getQuotationsSuccess = true;
      state.quotations = action.payload;
    },
    getQuotationsFailure: (state, action: PayloadAction<any>) => {
      state.getQuotationsRequesting = false;
      state.getQuotationsSuccess = false;
      state.getQuotationsFailure = true;
      state.getQuotationsError = action.payload;
    },
    resetGetQuotationsRequest: (state) => {
      state.getQuotationsRequesting = false;
      state.getQuotationsSuccess = false;
      state.getQuotationsFailure = false;
      state.getQuotationsError = null;
    },
   },
});

export default QuotationSlice.reducer;

export const {

  // Add Quotation
  addQuotationRequest,
  aaddQuotationSuccess,
  addQuotationFailure,
  resetaddQuotationRequest,
  // Get Quotations
  getQuotationsRequest,
  getQuotationsSuccess,
  getQuotationsFailure,
  resetGetQuotationsRequest,

} = QuotationSlice.actions;
