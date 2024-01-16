import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAddQuotationRequest} from '../../interface/quotation/IAddQuotationRequest';
import {IAddQuotationResponse} from '../../interface/quotation/IAddQuotationResponse';
import { IGetQuotationRequest } from '../../interface/quotation/IGetQuotationRequest';
import { IGetQuotationsResponse } from '../../interface/quotation/IGetQuotationsResponse';
import { IGetSingleQuotationResponse } from '../../interface/quotation/IGetSingleQuotationResponse';
import { IHtmlTemplateRequest, IHtmlTemplateResponse } from '../../interface/order/templates/ITemplateResponse';
import { IUpdateQuotationRequest, IUpdateQuotationResponse } from '../../interface/quotation/quotation';

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
  // Get Quotation
  quotation: IGetSingleQuotationResponse | null;
  getQuotationRequesting: boolean;
  getQuotationSuccess: boolean;
  getQuotationFailure: boolean;
  getQuotationError: any;
  // Quotation Template
  quotationTemplateHtml: IHtmlTemplateResponse | null,
  getQuotationTemplateHtmlRequesting: boolean,
  getQuotationTemplateHtmlSuccess: boolean,
  getQuotationTemplateHtmlFailure: boolean,
  getQuotatiionTemplateHtmlError: any,
  // Update Quotation
  updateQuotationInfo: IUpdateQuotationResponse | null;
  updateQuotationRequesting: boolean;
  updateQuotationSuccess: boolean;
  updateQuotationFailure: boolean;
  updateQuotationError: any;
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
  // Get Quotation
  quotation: null,
  getQuotationRequesting: false,
  getQuotationSuccess: false,
  getQuotationFailure: false,
  getQuotationError: null,
  // Quotation Template
  quotationTemplateHtml: null,
  getQuotationTemplateHtmlRequesting: false,
  getQuotationTemplateHtmlSuccess: false,
  getQuotationTemplateHtmlFailure: false,
  getQuotatiionTemplateHtmlError: null,
   // Update Quotation
   updateQuotationInfo: null,
   updateQuotationRequesting: false,
   updateQuotationSuccess: false,
   updateQuotationFailure: false,
   updateQuotationError: null,
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
      action: PayloadAction<IGetQuotationRequest>,
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
    // Get Single Quotation
    getSingleQuotationRequest: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.getQuotationRequesting = true;
    },
    getSingleQuotationSuccess: (state,action: PayloadAction<IGetSingleQuotationResponse>) => {
      state.getQuotationRequesting = false;
      state.getQuotationSuccess = true;
      state.quotation = action.payload;
    },
    getSingleQuotationFailure: (state, action: PayloadAction<any>) => {
      state.getQuotationRequesting = false;
      state.getQuotationSuccess = false;
      state.getQuotationFailure = true;
      state.getQuotationError = action.payload;
    },
    resetGetSingleQuotationRequest: (state) => {
      state.getQuotationRequesting = false;
      state.getQuotationSuccess = false;
      state.getQuotationFailure = false;
      state.getQuotationError = null;
    },
    // Quotation Tempalte Html
    getQuotationHtmlRequest: (state, action:PayloadAction<IHtmlTemplateRequest>) => {
      state.getQuotationTemplateHtmlRequesting = true;
    },
    getQuotationHtmlSuccess: (state, action:PayloadAction<IHtmlTemplateResponse>) => {
      state.getQuotationTemplateHtmlRequesting = false;
      state.getQuotationTemplateHtmlSuccess = true;
      state.getQuotationTemplateHtmlFailure = false;
      state.getQuotatiionTemplateHtmlError = null;
      state.quotationTemplateHtml = action.payload;
    },
    getQuotationHtmlFailure: (state, action:PayloadAction<any>) => {
      state.getQuotationTemplateHtmlRequesting = false;
      state.getQuotationTemplateHtmlSuccess = false;
      state.getQuotationTemplateHtmlFailure = true;
      state.getQuotatiionTemplateHtmlError = action.payload;
    },
    resetGetQuotationHtmlRequest: (state) => {
      state.getQuotationTemplateHtmlRequesting = false;
      state.getQuotationTemplateHtmlSuccess = false;
      state.getQuotationTemplateHtmlFailure = false;
      state.getQuotatiionTemplateHtmlError = null;
    },
    clearQuotationHtmlDocument: (state) => {
      state.quotationTemplateHtml = null;
    },
    // Update Quotation
    updateQuotationRequest: (
      state,
      action: PayloadAction<IUpdateQuotationRequest>,
    ) => {
      state.updateQuotationRequesting = true;
    },
    updateQuotationSuccess: (
      state,
      action: PayloadAction<IUpdateQuotationResponse>,
    ) => {
      state.updateQuotationRequesting = false;
      state.updateQuotationSuccess = true;
      state.updateQuotationInfo = action.payload;
    },
    updateQuotationFailure: (state, action: PayloadAction<any>) => {
      state.updateQuotationRequesting = false;
      state.updateQuotationSuccess = false;
      state.updateQuotationFailure = true;
      state.updateQuotationError = action.payload;
    },
    resetUpdateQuotationRequest: (state, action: PayloadAction) => {
      state.updateQuotationRequesting = false;
      state.updateQuotationSuccess = false;
      state.updateQuotationFailure = false;
      state.updateQuotationInfo = null;
      state.updateQuotationError = null;
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
  // Get Single Quotation
  getSingleQuotationRequest,
  getSingleQuotationSuccess,
  getSingleQuotationFailure,
  resetGetSingleQuotationRequest,
  // Quotation Template Html
  getQuotationHtmlRequest,
  getQuotationHtmlSuccess,
  getQuotationHtmlFailure,
  resetGetQuotationHtmlRequest,
  clearQuotationHtmlDocument,
  // Update Quotation
  updateQuotationRequest,
  updateQuotationSuccess,
  updateQuotationFailure,
  resetUpdateQuotationRequest,

} = QuotationSlice.actions;
