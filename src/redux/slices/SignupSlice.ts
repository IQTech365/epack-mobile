import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ISigninRequest } from '../../interface/signin/ISigninRequest';
import { ISigninResponse } from '../../interface/signin/ISigninResponse';

interface ISignupState {
    user: ISigninResponse | null;
    requesting: boolean;
    success: boolean;
    failure: boolean;
    error: any;
}

const initialState: ISignupState = {
    user: null,
    requesting: false,
    success: false,
    failure: false,
    error: null,
}

export const SignupSlice = createSlice({
    name: 'SignupSlice',
    initialState: initialState,
    reducers: {
        signupRequest: (state, action: PayloadAction<ISigninRequest>) => {
            state.requesting = true;
        },
        signupSuccess: (state, action: PayloadAction<ISigninResponse>) => {
            state.requesting = false;
            state.success = true;
            state.user = action.payload;
        },
        signupFailure: (state, action: PayloadAction<any>) => {
            state.requesting = false;
            state.success = false;
            state.failure = true;
            state.error = action.payload;
        }
    }
});

export default SignupSlice.reducer;

export const {signupRequest, signupSuccess, signupFailure} = SignupSlice.actions;