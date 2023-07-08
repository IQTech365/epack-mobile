import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import { SigninService } from '../service/SigninService';
import { signinFailure, signinSuccess, signinRequest } from '../redux/slices/SigninSlice';
import { ISignupRequest } from '../interface/signup/ISignupRequest';
import { ISignupResponse } from '../interface/signup/ISignupResponse';

export function* signupSaga(action: PayloadAction<ISignupRequest>) {
    try {
        const response: ISignupResponse = yield call(SigninService, action.payload);
        yield put(signinSuccess(response));
    } catch (error) {
        yield put(signinFailure(error));
    }
}

export function* watcherSignupSaga() {
    yield takeLatest(signinRequest.type, signupSaga);
}