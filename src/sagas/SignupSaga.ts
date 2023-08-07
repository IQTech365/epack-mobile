import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {SigninService} from '../service/OtpService';
import {
  signupFailure,
  signupSuccess,
  signupRequest,
} from '../redux/slices/SignupSlice';
import {ISignupRequest} from '../interface/signup/ISignupRequest';
import {ISignupResponse} from '../interface/signup/ISignupResponse';

export function* signupSaga(action: PayloadAction<ISignupRequest>) {
  try {
    const response: ISignupResponse = yield call(SigninService, action.payload);
    yield put(signupSuccess(response));
  } catch (error) {
    yield put(signupFailure(error));
  }
}

export function* watcherSignupSaga() {
  yield takeLatest(signupRequest.type, signupSaga);
}
