import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IOtpGetRequest} from '../../interface/otp/IOtpGetRequest';
import {IOtpGetResponse} from '../../interface/otp/IOtpGetResponse';
import { IOtpVerifyRequest } from '../../interface/otp/IOtpVerifyRequest';
import {IOtpVerifyResponse} from '../../interface/otp/IOtpVerifyResponse';

interface IOtpState {
  // Get OTP
  otpData: IOtpGetResponse | null;
  requesting: boolean;
  success: boolean;
  failure: boolean;
  error: any;
  // Verify OTP
  verifiedData: IOtpVerifyResponse | null;
  verifyOtpRequesting: boolean;
  verifyOtpSuccess: boolean;
  verifyOtpFailure: boolean;
  verifyOtpError: any;
}

const initialState: IOtpState = {
  // Get OTP
  otpData: null,
  requesting: false,
  success: false,
  failure: false,
  error: null,
  // Verify OTP
  verifiedData: null,
  verifyOtpRequesting: false,
  verifyOtpSuccess: false,
  verifyOtpFailure: false,
  verifyOtpError: null,
};

export const OtpSlice = createSlice({
  name: 'OtpSlice',
  initialState: initialState,
  reducers: {
    getOtpRequest: (state, action: PayloadAction<IOtpGetRequest>) => {
      state.requesting = true;
    },
    getOtpSuccess: (state, action: PayloadAction<IOtpGetResponse>) => {
      state.requesting = false;
      state.success = true;
      state.otpData = action.payload;
    },
    getOtpFailure: (state, action: PayloadAction<any>) => {
      state.requesting = false;
      state.success = false;
      state.failure = true;
      state.error = action.payload;
    },
    restGetOtpRequest: (state, action) => {
      state.requesting = false;
      state.success = false;
      state.failure = false;
      state.error = null;
    },
    verifyOtpRequest: (state, action: PayloadAction<IOtpVerifyRequest>) => {
      state.verifyOtpRequesting = true;
    },
    verifyOtpSuccess: (state, action: PayloadAction<IOtpVerifyResponse>) => {
      state.verifyOtpRequesting = false;
      state.verifyOtpSuccess = true;
      state.verifiedData = action.payload;
    },
    verifyOtpFailure: (state, action: PayloadAction<any>) => {
      state.verifyOtpRequesting = false;
      state.verifyOtpSuccess = false;
      state.verifyOtpFailure = true;
      state.verifyOtpError = action.payload;
    },
    restVerifyOtpRequest: (state, action) => {
      state.verifyOtpRequesting = false;
      state.verifyOtpSuccess = false;
      state.verifyOtpFailure = false;
      state.verifyOtpError = null;
    },
  },
});

export default OtpSlice.reducer;

export const {
  getOtpRequest,
  getOtpSuccess,
  getOtpFailure,
  verifyOtpRequest,
  verifyOtpSuccess,
  verifyOtpFailure,
  restVerifyOtpRequest,
} = OtpSlice.actions;
