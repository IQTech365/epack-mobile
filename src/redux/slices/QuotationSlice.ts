import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAddQuotationRequest} from '../../interface/quotation/IAddQuotationRequest';
import {IAddQuotationResponse} from '../../interface/quotation/IAddQuotationResponse';

interface IQuotationState {
  // Add Quotation
  addQuotationInfo: IAddQuotationResponse | null;
  addQuotationRequesting: boolean;
  addQuotationSuccess: boolean;
  addQuotationFailure: boolean;
  addQuotationError: any;
}

const initialState: IQuotationState = {
  // Add Quotation
  addQuotationInfo: null,
  addQuotationRequesting: false,
  addQuotationSuccess: false,
  addQuotationFailure: false,
  addQuotationError: null,
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
   },
});

export default QuotationSlice.reducer;

export const {

  // Add Quotation
  addQuotationRequest,
  aaddQuotationSuccess,
  addQuotationFailure,
  resetaddQuotationRequest,

} = QuotationSlice.actions;
