import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import { SigninService } from '../service/SigninService';
import { ISigninRequest } from '../interface/signin/ISigninRequest';
import { ISigninResponse } from '../interface/signin/ISigninResponse';
import { signinFailure, signinSuccess, signinRequest } from '../redux/slices/SigninSlice';

export function* signinSaga(action: PayloadAction<ISigninRequest>) {
    try {
        const response: ISigninResponse = yield call(SigninService, action.payload);
        yield put(signinSuccess(response));
    } catch (error) {
        yield put(signinFailure(error));
    }
}

export function* watcherSigninSaga() {
    yield takeLatest(signinRequest.type, signinSaga);
}