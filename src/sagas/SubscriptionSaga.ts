import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as SubscriptionService from '../service/SubscriptionService';
import { ISubmoduleFeatureListResponse, ISubmoduleListResponse, ISubscriptionPlanListResponse } from '../interface/subscription/subscription';
import { getSubmoduleFeaturesFailure, getSubmoduleFeaturesRequest, getSubmoduleFeaturesSuccess, getSubmodulesFailure, getSubmodulesRequest, getSubmodulesSuccess, getSubscriptionPlansFailure, getSubscriptionPlansRequest, getSubscriptionPlansSuccess } from '../redux/slices/SubscriptionSlice';

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

export function* watcherSubscriptionSaga() {
  yield takeLatest(getSubscriptionPlansRequest.type, getSubscriptionPlanListSaga);
  yield takeLatest(getSubmoduleFeaturesRequest.type, getSubmoduleFeatureListSaga);
  yield takeLatest(getSubmodulesRequest.type, getSubmoduleListSaga);
}
