import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ISigninRequest } from '../../interface/signin/ISigninRequest';
import { ISigninResponse } from '../../interface/signin/ISigninResponse';

interface ISigninState {
    user: ISigninResponse | null;
    requesting: boolean;
    success: boolean;
    failure: boolean;
    error: any;
}

const initialState: ISigninState = {
    user: null,
    requesting: false,
    success: false,
    failure: false,
    error: null,
}

export const SigninSlice = createSlice({
    name: 'SigninSlice',
    initialState: initialState,
    reducers: {
        signinRequest: (state, action: PayloadAction<ISigninRequest>) => {
            state.requesting = true;
        },
        signinSuccess: (state, action: PayloadAction<ISigninResponse>) => {
            state.requesting = false;
            state.success = true;
            state.user = action.payload;
        },
        signinFailure: (state, action: PayloadAction<any>) => {
            state.requesting = false;
            state.success = false;
            state.failure = true;
            state.error = action.payload;
        }
    }
});

export default SigninSlice.reducer;

export const {signinRequest, signinSuccess, signinFailure} = SigninSlice.actions;