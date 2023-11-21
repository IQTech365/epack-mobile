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
  editMoneyReceiptListFailure,
  editMoneyReceiptListRequest,
  editMoneyReceiptListSuccess,
  getApprovedOrdersFailure,
  getApprovedOrdersRequest,
  getApprovedOrdersSuccess,
  getBiltyListFailure,
  getBiltyListRequest,
  getBiltyListSuccess,
  getCarConditionListFailure,
  getCarConditionListRequest,
  getCarConditionListSuccess,
  getMoneyReceiptListFailure,
  getMoneyReceiptListRequest,
  getMoneyReceiptListSuccess,
  getOrderFailure,
  getOrderRequest,
  getOrderSuccess,
  getOrdersFailure,
  getOrdersRequest,
  getOrdersSuccess,
} from '../redux/slices/OrderSlice';
import {IAddOrderRequest} from '../interface/order/IAddOrderRequest';
import {IAddOrderResponse} from '../interface/order/IAddOrderResponse';
import {ICreateMoneyReceiptRequest} from '../interface/order/ICreateMoneyReceiptRequest';
import {ICreateMoneyReceiptResponse} from '../interface/order/ICreateMoneyReceiptResponse';
import { ICreateCarConditionRequest } from '../interface/order/ICreateCarConditionRequest';
import { ICreateBiltyRequest } from '../interface/order/ICreateBiltyRequest';
import { ICreateBiltyResponse } from '../interface/order/ICreateBiltyResponse';
import { IGetOrdersResponse } from '../interface/order/IGetOrdersResponse';
import { IGetMoneyReceiptsResponse } from '../interface/order/IGetMoneyReceiptsResponse';
import { IGetCarConditionListResponse } from '../interface/order/IGetCarConditionListResponse';
import { IGetBiltyListResponse } from '../interface/order/IGetBiltyListResponse';
import { IGetOrdersRequest } from '../interface/order/IGetOrdersRequest';
import { ISingleOrderRequest } from '../interface/order/ISingleOrderRequest';
import { ISingleEnquiryResponse } from '../interface/enquiry/ISingleEnquiryResponse';

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

export function* getOrderListSaga(action: PayloadAction<Partial<IGetOrdersRequest>>) {
  try {
      const response: IGetOrdersResponse = yield call(OrderService.GetOrdersService, action.payload);
      console.log('getOrderListSaga-response----', JSON.stringify(response));
      yield put(getOrdersSuccess(response));
  } catch (error) {
      console.log('getOrderListSaga-error----', JSON.stringify(error));
      yield put(getOrdersFailure(error));
  }
}

export function* getOrderSaga(action: PayloadAction<ISingleOrderRequest>) {
  try {
      const response: ISingleEnquiryResponse = yield call(OrderService.GetOrderService, action.payload);
      console.log('getOrderSaga-response----', JSON.stringify(response));
      yield put(getOrderSuccess(response));
  } catch (error) {
      console.log('getOrderSaga-error----', JSON.stringify(error));
      yield put(getOrderFailure(error));
  }
}

export function* getApprovedOrderListSaga(action: PayloadAction<IGetOrdersRequest>) {
  try {
      const response: IGetOrdersResponse = yield call(OrderService.GetOrdersService, action.payload);
      console.log('getApprovedOrderListSaga-response----', JSON.stringify(response));
      yield put(getApprovedOrdersSuccess(response));
  } catch (error) {
      console.log('getApprovedOrderListSaga-error----', JSON.stringify(error));
      yield put(getApprovedOrdersFailure(error));
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

export function* getMoneyReceiptListSaga(action: PayloadAction<string>) {
  try {
      const response: IGetMoneyReceiptsResponse = yield call(OrderService.GetMoneyReceiptListService, action.payload);
      console.log('getMoneyReceiptListSaga-response----', JSON.stringify(response));
      yield put(getMoneyReceiptListSuccess(response));
  } catch (error) {
      console.log('getMoneyReceiptListSaga-error----', JSON.stringify(error));
      yield put(getMoneyReceiptListFailure(error));
  }
}

export function* editMoneyReceiptSaga(action: PayloadAction<{id:string, requestBody:any}>) {
  const { id, requestBody } = action.payload;
  try {
      const response: IGetMoneyReceiptsResponse = yield call(OrderService.EditMoneyReceiptListService, id, requestBody);
      console.log('editMoneyReceiptSaga-response----', JSON.stringify(response));
      yield put(editMoneyReceiptListSuccess(response));
  } catch (error) {
      console.log('editMoneyReceiptSaga-error----', JSON.stringify(error));
      yield put(editMoneyReceiptListFailure(error));
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

  export function* getCarConditionListSaga(action: PayloadAction<string>) {
    try {
        const response: IGetCarConditionListResponse = yield call(OrderService.GetCarConditionListService, action.payload);
        console.log('getCarConditionListSaga-response----', JSON.stringify(response));
        yield put(getCarConditionListSuccess(response));
    } catch (error) {
        console.log('getCarConditionListSaga-error----', JSON.stringify(error));
        yield put(getCarConditionListFailure(error));
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

  export function* getBiltyListSaga(action: PayloadAction<string>) {
    try {
        const response: IGetBiltyListResponse = yield call(OrderService.GetBiltyListService, action.payload);
        console.log('getBiltyListSaga-response----', JSON.stringify(response));
        yield put(getBiltyListSuccess(response));
    } catch (error) {
        console.log('getBiltyListSaga-error----', JSON.stringify(error));
        yield put(getBiltyListFailure(error));
    }
  }
  

export function* watcherOrderSaga() {
  yield takeLatest(addOrderRequest.type, addOrderSaga);
  yield takeLatest(getOrdersRequest.type, getOrderListSaga);
  yield takeLatest(getOrderRequest.type, getOrderSaga);
  yield takeLatest(createMoneyReceiptRequest.type, createMoneyReceiptSaga);
  yield takeLatest(getMoneyReceiptListRequest.type, getMoneyReceiptListSaga);
  yield takeLatest(editMoneyReceiptListRequest.type, editMoneyReceiptSaga);
  yield takeLatest(createCarConditionRequest.type, createCarConditionSaga);
  yield takeLatest(getCarConditionListRequest.type, getCarConditionListSaga);
  yield takeLatest(createBiltyRequest.type, createBiltySaga);
  yield takeLatest(getBiltyListRequest.type, getBiltyListSaga);
  yield takeLatest(getApprovedOrdersRequest.type, getApprovedOrderListSaga);
}
