import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as OtpService from '../service/OtpService';
import { 
    getOtpSuccess, 
    getOtpFailure, 
    getOtpRequest, 
    verifyOtpSuccess, 
    verifyOtpFailure, 
    verifyOtpRequest
 } from '../redux/slices/OtpSlice';
import { IOtpGetRequest } from '../interface/otp/IOtpGetRequest';
import { IOtpGetResponse } from '../interface/otp/IOtpGetResponse';
import { IOtpVerifyRequest } from '../interface/otp/IOtpVerifyRequest';
import { IOtpVerifyResponse } from '../interface/otp/IOtpVerifyResponse';

export function* getOtpSaga(action: PayloadAction<IOtpGetRequest>) {
    console.log('getOtpSaga--action--', JSON.stringify(action));
    try {
        const response: IOtpGetResponse = yield call(OtpService.GetOtpService, action.payload);
        console.log('getOtpSaga-response----', JSON.stringify(response));
        yield put(getOtpSuccess(response));
    } catch (error) {
        console.log('getOtpSaga-error----', error);
        yield put(getOtpFailure(error));
    }
}

export function* verifyOtpSaga(action: PayloadAction<IOtpVerifyRequest>) {
    try {
        const response: IOtpVerifyResponse = yield call(OtpService.VerifyOtpService, action.payload);
        console.log('verifyOtpSaga-response----', JSON.stringify(response));
        yield put(verifyOtpSuccess(response));
    } catch (error) {
        console.log('verifyOtpSaga-error----', JSON.stringify(error));
        yield put(verifyOtpFailure(error));
    }
}

export function* watcherOtpSaga() {
    yield takeLatest(getOtpRequest.type, getOtpSaga);
    yield takeLatest(verifyOtpRequest.type, verifyOtpSaga);
}