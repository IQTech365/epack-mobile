import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as OtpService from '../service/OtpService';
import {
  getOtpSuccess,
  getOtpFailure,
  getOtpRequest,
  verifyOtpSuccess,
  verifyOtpFailure,
  verifyOtpRequest,
} from '../redux/slices/OtpSlice';
import {IOtpGetRequest} from '../interface/otp/IOtpGetRequest';
import {IOtpGetResponse} from '../interface/otp/IOtpGetResponse';
import {IOtpVerifyRequest} from '../interface/otp/IOtpVerifyRequest';
import {IOtpVerifyResponse} from '../interface/otp/IOtpVerifyResponse';

export function* getOtpSaga(action: PayloadAction<Partial<IOtpGetRequest>>) {
  try {
    const response: IOtpGetResponse = yield call(
      OtpService.GetOtpService,
      action.payload,
    );
    console.log('response----', JSON.stringify(response));

    yield put(getOtpSuccess(response));
  } catch (error) {
    console.log('error----', JSON.stringify(error));
    yield put(getOtpFailure(JSON.stringify(error)));
  }
}

export function* verifyOtpSaga(action: PayloadAction<IOtpVerifyRequest>) {
  try {
    const response: IOtpVerifyResponse = yield call(
      OtpService.VerifyOtpService,
      action.payload,
    );
    yield put(verifyOtpSuccess(response));
  } catch (error) {
    yield put(verifyOtpFailure(error));
  }
}

export function* watcherOtpSaga() {
  yield takeLatest(getOtpRequest.type, getOtpSaga);
  yield takeLatest(verifyOtpRequest.type, verifyOtpSaga);
}
