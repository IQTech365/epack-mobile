import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ICustomerListResponse, ICustomerRequest } from '../../interface/customer/customer';

interface ICommonState {
  // Customers
  customers: ICustomerListResponse | null;
  getCustomersRequesting:boolean;
  getCustomersRequestSuccess:boolean;
  getCustomersRequestFailure:boolean;
  getCustomersError:any;
}

const initialState: ICommonState = {
  // Customers
  customers: null,
  getCustomersRequesting:false,
  getCustomersRequestSuccess:false,
  getCustomersRequestFailure:false,
  getCustomersError:null,
};

export const CustomerSlice = createSlice({
  name: 'CustomerSlice',
  initialState: initialState,
  reducers: {
    // Customers
    getCustomersRequest: (state, action: PayloadAction<ICustomerRequest>) => {
      state.getCustomersRequesting = true;
    },
    getCustomersSuccess: (
      state,
      action: PayloadAction<ICustomerListResponse>,
    ) => {
      state.getCustomersRequesting = false;
      state.getCustomersRequestSuccess = true;
      state.customers = action.payload;
    },
    getCustomersFailure: (state, action: PayloadAction<any>) => {
      state.getCustomersRequesting = false;
      state.getCustomersRequestSuccess = false;
      state.getCustomersRequestFailure = true;
      state.getCustomersError = action.payload;
    },
  },
});

export default CustomerSlice.reducer;

export const {
  // Customers
  getCustomersRequest,
  getCustomersSuccess,
  getCustomersFailure,
} = CustomerSlice.actions;

