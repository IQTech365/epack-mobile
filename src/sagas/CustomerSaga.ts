import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as CustomerService from '../service/CustomerService';
import { ICustomerListResponse, ICustomerRequest } from '../interface/customer/customer';
import { getCustomersFailure, getCustomersRequest, getCustomersSuccess } from '../redux/slices/CustomerSlice';

export function* getCustomerListSaga(action: PayloadAction<ICustomerRequest>) {
  try {
    const response: ICustomerListResponse = yield call(CustomerService.GetCustomerListService, action.payload);
    console.log('getCustomerListSaga-response----', JSON.stringify(response));
    yield put(getCustomersSuccess(response));
  } catch (error) {
    console.log('getCustomerListSaga-error----', error);
    yield put(getCustomersFailure(JSON.stringify(error)));
  }
}

export function* watcherCustomerSaga() {
  yield takeLatest(getCustomersRequest.type, getCustomerListSaga);
}
