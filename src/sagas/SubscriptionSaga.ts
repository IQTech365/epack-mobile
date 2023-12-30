import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as SubscriptionService from '../service/SubscriptionService';
import { IGetPurchasedSubscriptionListResponse, IGetPurchasedSubscriptionParams, ISubmoduleFeatureListResponse, ISubmoduleListResponse, ISubscriptionPlanListResponse, IUpdateSubscriptionRequest, IUpdateSubscriptionResponse } from '../interface/subscription/subscription';
import { getPurchasedSubscriptionFailure, getPurchasedSubscriptionRequest, getPurchasedSubscriptionSuccess, getSubmoduleFeaturesFailure, getSubmoduleFeaturesRequest, getSubmoduleFeaturesSuccess, getSubmodulesFailure, getSubmodulesRequest, getSubmodulesSuccess, getSubscriptionPlansFailure, getSubscriptionPlansRequest, getSubscriptionPlansSuccess, updateSubscriptionFailure, updateSubscriptionRequest, updateSubscriptionSuccess } from '../redux/slices/SubscriptionSlice';

export function* getSubscriptionPlanListSaga(action: PayloadAction<any>) {
  try {
    const response: ISubscriptionPlanListResponse = yield call(SubscriptionService.GetSubscriptionPlanListService);
    console.log('getSubscriptionPlanListSaga-response----', JSON.stringify(response));
    yield put(getSubscriptionPlansSuccess(response));
  } catch (error) {
    console.log('getSubscriptionPlanListSaga-error----', error);
    yield put(getSubscriptionPlansFailure(JSON.stringify(error)));
  }
}

export function* getSubmoduleFeatureListSaga(action: PayloadAction<any>) {
  try {
    const response: ISubmoduleFeatureListResponse = yield call(SubscriptionService.GetSubmoduleFeaturesListService);
    console.log('getSubmoduleFeatureListSaga-response----', JSON.stringify(response));
    yield put(getSubmoduleFeaturesSuccess(response));
  } catch (error) {
    console.log('getSubmoduleFeatureListSaga-error----', error);
    yield put(getSubmoduleFeaturesFailure(JSON.stringify(error)));
  }
}

export function* getSubmoduleListSaga(action: PayloadAction<any>) {
  try {
    const response: ISubmoduleListResponse = yield call(SubscriptionService.GetSubmoduleListService);
    console.log('getSubmoduleListSaga-response----', JSON.stringify(response));
    yield put(getSubmodulesSuccess(response));
  } catch (error) {
    console.log('getSubmoduleListSaga-error----', error);
    yield put(getSubmodulesFailure(JSON.stringify(error)));
  }
}

export function* getPurchasedSubscriptionListSaga(action: PayloadAction<IGetPurchasedSubscriptionParams>) {
  try {
    const response: IGetPurchasedSubscriptionListResponse = yield call(SubscriptionService.GetPurchasedSubscriptionListService, action.payload);
    console.log('getPurchasedSubscriptionListSaga-response----', JSON.stringify(response));
    yield put(getPurchasedSubscriptionSuccess(response));
  } catch (error) {
    console.log('getPurchasedSubscriptionListSaga-error----', error);
    yield put(getPurchasedSubscriptionFailure(JSON.stringify(error)));
  }
}

export function* updateSubscriptionSaga(action: PayloadAction<IUpdateSubscriptionRequest>) {
  try {
    const response: IUpdateSubscriptionResponse = yield call(SubscriptionService.UpdateSubscriptionInfoService, action.payload);
    console.log('updateSubscriptionSaga-response----', JSON.stringify(response));
    yield put(updateSubscriptionSuccess(response));
  } catch (error) {
    console.log('updateSubscriptionSaga-error----', error);
    yield put(updateSubscriptionFailure(JSON.stringify(error)));
  }
}

export function* watcherSubscriptionSaga() {
  yield takeLatest(getSubscriptionPlansRequest.type, getSubscriptionPlanListSaga);
  yield takeLatest(getSubmoduleFeaturesRequest.type, getSubmoduleFeatureListSaga);
  yield takeLatest(getSubmodulesRequest.type, getSubmoduleListSaga);
  yield takeLatest(getPurchasedSubscriptionRequest.type, getPurchasedSubscriptionListSaga);
  yield takeLatest(updateSubscriptionRequest.type, updateSubscriptionSaga);
}
