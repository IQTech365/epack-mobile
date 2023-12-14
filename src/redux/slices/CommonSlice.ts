import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IPackingTypeResponse} from '../../interface/common/common';

interface ICommonState {
  // Get PackingType
  packingTypes: IPackingTypeResponse | null;
  packingTypesRequesting: boolean;
  packingTypesRequestSuccess: boolean;
  packingTypesRequestFailure: boolean;
  error: any;
}

const initialState: ICommonState = {
  // Get PackingType
  packingTypes: null,
  packingTypesRequesting: false,
  packingTypesRequestSuccess: false,
  packingTypesRequestFailure: false,
  error: null,
};

export const CommonSlice = createSlice({
  name: 'CommonSlice',
  initialState: initialState,
  reducers: {
    // Get PackingType
    getPackingTypesRequest: state => {
      state.packingTypesRequesting = true;
    },
    getPackingTypesSuccess: (state, action: PayloadAction<IPackingTypeResponse>) => {
      state.packingTypesRequesting = false;
      state.packingTypesRequestSuccess = true;
      state.packingTypes = action.payload;
    },
    getPackingTypesFailure: (state, action: PayloadAction<any>) => {
      state.packingTypesRequesting = false;
      state.packingTypesRequestSuccess = false;
      state.packingTypesRequestFailure = true;
      state.error = action.payload;
    },
  },
});

export default CommonSlice.reducer;

export const {
  // Get PackingType
  getPackingTypesRequest,
  getPackingTypesSuccess,
  getPackingTypesFailure,
} = CommonSlice.actions;
