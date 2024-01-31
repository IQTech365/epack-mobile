import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as SubscriptionService from '../service/SubscriptionService';
import { IAddPurchaseRequest, IAddPurchaseResponse, IGetPurchasedSubscriptionListResponse, IGetPurchasedSubscriptionParams, IRazorPayCreateOrderPayload, IRazorPayOrderResponse, ISubmoduleFeatureListResponse, ISubmoduleListResponse, ISubscriptionPlanListResponse, IUpdateSubscriptionRequest, IUpdateSubscriptionResponse } from '../interface/subscription/subscription';
import { addPurchaseFailure, addPurchaseRequest, addPurchaseSuccess, createRazorpayFailure, createRazorpayRequest, createRazorpaySuccess, getPurchasedSubscriptionFailure, getPurchasedSubscriptionRequest, getPurchasedSubscriptionSuccess, getSubmoduleFeaturesFailure, getSubmoduleFeaturesRequest, getSubmoduleFeaturesSuccess, getSubmodulesFailure, getSubmodulesRequest, getSubmodulesSuccess, getSubscriptionPlansFailure, getSubscriptionPlansRequest, getSubscriptionPlansSuccess, updateSubscriptionFailure, updateSubscriptionRequest, updateSubscriptionSuccess } from '../redux/slices/SubscriptionSlice';

export function* getSubscriptionPlanListSaga(action: PayloadAction<any>) {
  try {
    const response: ISubscriptionPlanListResponse = yield call(SubscriptionService.GetSubscriptionPlanListService);
    yield put(getSubscriptionPlansSuccess(response));
  } catch (error) {
    yield put(getSubscriptionPlansFailure(JSON.stringify(error)));
  }
}

export function* getSubmoduleFeatureListSaga(action: PayloadAction<any>) {
  try {
    const response: ISubmoduleFeatureListResponse = yield call(SubscriptionService.GetSubmoduleFeaturesListService);
    yield put(getSubmoduleFeaturesSuccess(response));
  } catch (error) {
    yield put(getSubmoduleFeaturesFailure(JSON.stringify(error)));
  }
}

export function* getSubmoduleListSaga(action: PayloadAction<any>) {
  try {
    const response: ISubmoduleListResponse = yield call(SubscriptionService.GetSubmoduleListService);
    yield put(getSubmodulesSuccess(response));
  } catch (error) {
    yield put(getSubmodulesFailure(JSON.stringify(error)));
  }
}

export function* getPurchasedSubscriptionListSaga(action: PayloadAction<IGetPurchasedSubscriptionParams>) {
  try {
    const response: IGetPurchasedSubscriptionListResponse = yield call(SubscriptionService.GetPurchasedSubscriptionListService, action.payload);
    yield put(getPurchasedSubscriptionSuccess(response));
  } catch (error) {
    yield put(getPurchasedSubscriptionFailure(JSON.stringify(error)));
  }
}

export function* updateSubscriptionSaga(action: PayloadAction<IUpdateSubscriptionRequest>) {
  try {
    const response: IUpdateSubscriptionResponse = yield call(SubscriptionService.UpdateSubscriptionInfoService, action.payload);
    yield put(updateSubscriptionSuccess(response));
  } catch (error) {
    yield put(updateSubscriptionFailure(JSON.stringify(error)));
  }
}

export function* addPurchaseSaga(action: PayloadAction<IAddPurchaseRequest>) {
  try {
    const response: IAddPurchaseResponse = yield call(SubscriptionService.AddPurchaseService, action.payload);
    yield put(addPurchaseSuccess(response));
  } catch (error) {
    yield put(addPurchaseFailure(JSON.stringify(error)));
  }
}

export function* createRazorpayOrderSaga(action: PayloadAction<IRazorPayCreateOrderPayload>) {
  try {
    const response: IRazorPayOrderResponse = yield call(SubscriptionService.createRazorpayOrder, action.payload);
    yield put(createRazorpaySuccess(response));
  } catch (error) {
    yield put(createRazorpayFailure(JSON.stringify(error)));
  }
}

export function* watcherSubscriptionSaga() {
  yield takeLatest(getSubscriptionPlansRequest.type, getSubscriptionPlanListSaga);
  yield takeLatest(getSubmoduleFeaturesRequest.type, getSubmoduleFeatureListSaga);
  yield takeLatest(getSubmodulesRequest.type, getSubmoduleListSaga);
  yield takeLatest(getPurchasedSubscriptionRequest.type, getPurchasedSubscriptionListSaga);
  yield takeLatest(updateSubscriptionRequest.type, updateSubscriptionSaga);
  yield takeLatest(addPurchaseRequest.type, addPurchaseSaga);
  yield takeLatest(createRazorpayRequest.type, createRazorpayOrderSaga);
}
