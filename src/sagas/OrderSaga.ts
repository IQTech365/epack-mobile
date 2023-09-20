import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as OrderService from '../service/OrderService';
import {
  addOrderFailure,
  addOrderRequest,
  addOrderSuccess,
  createBiltyFailure,
  createBiltyRequest,
  createBiltySuccess,
  createCarConditionFailure,
  createCarConditionRequest,
  createCarConditionSuccess,
  createMoneyReceiptFailure,
  createMoneyReceiptRequest,
  createMoneyReceiptSuccess,
} from '../redux/slices/OrderSlice';
import {IAddOrderRequest} from '../interface/order/IAddOrderRequest';
import {IAddOrderResponse} from '../interface/order/IAddOrderResponse';
import {ICreateMoneyReceiptRequest} from '../interface/order/ICreateMoneyReceiptRequest';
import {ICreateMoneyReceiptResponse} from '../interface/order/ICreateMoneyReceiptResponse';
import { ICreateCarConditionRequest } from '../interface/order/ICreateCarConditionRequest';
import { ICreateBiltyRequest } from '../interface/order/ICreateBiltyRequest';
import { ICreateBiltyResponse } from '../interface/order/ICreateBiltyResponse';

export function* addOrderSaga(action: PayloadAction<IAddOrderRequest>) {
  console.log('addOrderSaga--action--', JSON.stringify(action));
  try {
    const response: IAddOrderResponse = yield call(
      OrderService.AddOrderService,
      action.payload,
    );
    console.log('addOrderSaga-response----', JSON.stringify(response));
    yield put(addOrderSuccess(response));
  } catch (error) {
    console.log('addOrderSaga-error----', error);
    yield put(addOrderFailure(error));
  }
}

export function* createMoneyReceiptSaga(
  action: PayloadAction<ICreateMoneyReceiptRequest>,
) {
  try {
    const response: ICreateMoneyReceiptResponse = yield call(
      OrderService.CreateMoneyReceiptService,
      action.payload,
    );
    console.log(
      'createMoneyReceiptSaga-response----',
      JSON.stringify(response),
    );
    yield put(createMoneyReceiptSuccess(response));
  } catch (error) {
    console.log('createMoneyReceiptSaga-error----', JSON.stringify(error));
    yield put(createMoneyReceiptFailure(error));
  }
}

export function* createCarConditionSaga(
    action: PayloadAction<ICreateCarConditionRequest>,
  ) {
    try {
      const response: ICreateMoneyReceiptResponse = yield call(
        OrderService.CreateCarConditionService,
        action.payload,
      );
      console.log(
        'createCarConditionSaga-response----',
        JSON.stringify(response),
      );
      yield put(createCarConditionSuccess(response));
    } catch (error) {
      console.log('createCarConditionSaga-error----', JSON.stringify(error));
      yield put(createCarConditionFailure(error));
    }
  }

  export function* createBiltySaga(
    action: PayloadAction<ICreateBiltyRequest>,
  ) {
    try {
      const response: ICreateBiltyResponse = yield call(
        OrderService.CreateBiltyService,
        action.payload,
      );
      console.log(
        'createBiltySaga-response----',
        JSON.stringify(response),
      );
      yield put(createBiltySuccess(response));
    } catch (error) {
      console.log('createBiltySaga-error----', JSON.stringify(error));
      yield put(createBiltyFailure(error));
    }
  }
  

export function* watcherOrderSaga() {
  yield takeLatest(addOrderRequest.type, addOrderSaga);
  yield takeLatest(createMoneyReceiptRequest.type, createMoneyReceiptSaga);
  yield takeLatest(createCarConditionRequest.type, createCarConditionSaga);
  yield takeLatest(createBiltyRequest.type, createBiltySaga);
}
