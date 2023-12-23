import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as CommonService from '../service/CommonService';
import { IOtpGetRequest } from '../interface/otp/IOtpGetRequest';
import {
    IAppSettingResponse,
  IPackingTypeResponse,
  ISubmoduleResponse,
  IVehicleAccessoryResponse,
  IVehicleColorResponse,
  IVehicleCompanyResponse,
  IVehicleModelResponse,
  IVehicleTypesResponse,
} from '../interface/common/common';
import {
    getAppSettingsFailure,
    getAppSettingsRequest,
    getAppSettingsSuccess,
  getPackingTypesFailure,
  getPackingTypesRequest,
  getPackingTypesSuccess,
  getSubmoduleFailure,
  getSubmoduleRequest,
  getSubmoduleSuccess,
  getVehicleAccessoriesFailure,
  getVehicleAccessoriesRequest,
  getVehicleAccessoriesSuccess,
  getVehicleColorFailure,
  getVehicleColorRequest,
  getVehicleColorSuccess,
  getVehicleCompanyFailure,
  getVehicleCompanyRequest,
  getVehicleCompanySuccess,
  getVehicleModelsFailure,
  getVehicleModelsRequest,
  getVehicleModelsSuccess,
  getVehicleTypesFailure,
  getVehicleTypesRequest,
  getVehicleTypesSuccess,
} from '../redux/slices/CommonSlice';

export function* getPackingTypesSaga(action: PayloadAction<Partial<IOtpGetRequest>>) {
    try {
        const response: IPackingTypeResponse = yield call(CommonService.GetPackingTypesService);
        console.log('getPackingTypesSaga-response----', JSON.stringify(response));
        yield put(getPackingTypesSuccess(response));
    } catch (error) {
        console.log('getPackingTypesSaga-error----', error);
        yield put(getPackingTypesFailure(JSON.stringify(error)));
    }
}

export function* getVehicleTypesSaga(action: PayloadAction<any>) {
    try {
        const response: IVehicleTypesResponse = yield call(CommonService.GetVehicleTypesService);
        console.log('getVehicleTypesSaga-response----', JSON.stringify(response));
        yield put(getVehicleTypesSuccess(response));
    } catch (error) {
        console.log('getVehicleTypesSaga-error----', error);
        yield put(getVehicleTypesFailure(JSON.stringify(error)));
    }
}

export function* getVehicleCompaniesSaga(action: PayloadAction<any>) {
    try {
        const response: IVehicleCompanyResponse = yield call(CommonService.GetVehicleCompaniesService);
        console.log('getVehicleCompaniesSaga-response----', JSON.stringify(response));
        yield put(getVehicleCompanySuccess(response));
    } catch (error) {
        console.log('getVehicleCompaniesSaga-error----', error);
        yield put(getVehicleCompanyFailure(JSON.stringify(error)));
    }
}

export function* getVehicleColorsSaga(action: PayloadAction<any>) {
    try {
        const response: IVehicleColorResponse = yield call(CommonService.GetVehicleColorsService);
        console.log('getVehicleColorsSaga-response----', JSON.stringify(response));
        yield put(getVehicleColorSuccess(response));
    } catch (error) {
        console.log('getVehicleColorsSaga-error----', error);
        yield put(getVehicleColorFailure(JSON.stringify(error)));
    }
}

export function* getVehicleAccessoriesSaga(action: PayloadAction<any>) {
    try {
        const response: IVehicleAccessoryResponse = yield call(CommonService.GetVehicleAccessoriesService);
        console.log('getVehicleAccessoriesSaga-response----', JSON.stringify(response));
        yield put(getVehicleAccessoriesSuccess(response));
    } catch (error) {
        console.log('getVehicleAccessoriesSaga-error----', error);
        yield put(getVehicleAccessoriesFailure(JSON.stringify(error)));
    }
}

export function* getVehicleModelsSaga(action: PayloadAction<any>) {
    try {
        const response: IVehicleModelResponse = yield call(CommonService.GetVehicleModelsService);
        console.log('getVehicleModelsSaga-response----', JSON.stringify(response));
        yield put(getVehicleModelsSuccess(response));
    } catch (error) {
        console.log('getVehicleModelsSaga-error----', error);
        yield put(getVehicleModelsFailure(JSON.stringify(error)));
    }
}

export function* getSubmodulesSaga(action: PayloadAction<any>) {
    try {
        const response: ISubmoduleResponse = yield call(CommonService.GetSubmodulesService);
        console.log('getSubmodulesSaga-response----', JSON.stringify(response));
        yield put(getSubmoduleSuccess(response));
    } catch (error) {
        console.log('getSubmodulesSaga-error----', error);
        yield put(getSubmoduleFailure(JSON.stringify(error)));
    }
}

export function* getAppSettingsSaga(action: PayloadAction<string>) {
    try {
        const response: IAppSettingResponse = yield call(CommonService.GetAppSettingsService, action.payload);
        console.log('getAppSettingsSaga-response----', JSON.stringify(response));
        yield put(getAppSettingsSuccess(response));
    } catch (error) {
        console.log('getAppSettingsSaga-error----', error);
        yield put(getAppSettingsFailure(JSON.stringify(error)));
    }
}

export function* watcherCommonSaga() {
    yield takeLatest(getPackingTypesRequest.type, getPackingTypesSaga);
    yield takeLatest(getVehicleTypesRequest.type, getVehicleTypesSaga);
    yield takeLatest(getVehicleCompanyRequest.type, getVehicleCompaniesSaga);
    yield takeLatest(getVehicleColorRequest.type, getVehicleColorsSaga);
    yield takeLatest(getVehicleAccessoriesRequest.type, getVehicleAccessoriesSaga);
    yield takeLatest(getVehicleModelsRequest.type, getVehicleModelsSaga);
    yield takeLatest(getSubmoduleRequest.type, getSubmodulesSaga);
    yield takeLatest(getAppSettingsRequest.type, getAppSettingsSaga);
}