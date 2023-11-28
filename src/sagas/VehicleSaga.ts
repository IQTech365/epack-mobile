import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as VehicleService from '../service/VehicleService';
import { addDriverFailure, addDriverRequest, addDriverSuccess, addLorryFailure, addLorryRequest, addLorrySuccess, getDriverFailure, getDriverRequest, getDriverSuccess, getLorryFailure, getLorryRequest, getLorrySuccess, getVehicleSizeFailure, getVehicleSizeRequest, getVehicleSizeSuccess } from '../redux/slices/VehicleSlice';
import { IAddLorryRequest } from '../interface/vehicle/IAddLorryRequest';
import { IAddLorryResponse } from '../interface/vehicle/IAddLorryResponse';
import { IAddDriverRequest } from '../interface/vehicle/IAddDriverRequest';
import { IAddDriverResponse } from '../interface/vehicle/IAddDriverResponse';
import { IGetLorryResponse } from '../interface/vehicle/IGetLorryResponse';
import { IGetDriverResponse } from '../interface/vehicle/IGetDriverReuest';

export function* addLorrySaga(action: PayloadAction<IAddLorryRequest>) {
    console.log('addLorrySaga--action--', JSON.stringify(action));
    try {
        const response: IAddLorryResponse = yield call(VehicleService.AddLorryService, action.payload);
        console.log('addLorrySaga-response----', JSON.stringify(response));
        yield put(addLorrySuccess(response));
    } catch (error) {
        console.log('addLorrySaga-error----', error);
        yield put(addLorryFailure(JSON.stringify(error)));
    }
}

export function* getLorrySaga(action: PayloadAction<string>) {
    console.log('getLorrySaga--action--', JSON.stringify(action));
    try {
        const response: IGetLorryResponse = yield call(VehicleService.GetLorryService, action.payload);
        console.log('getLorrySaga-response----', JSON.stringify(response));
        yield put(getLorrySuccess(response));
    } catch (error) {
        console.log('getLorrySaga-error----', error);
        yield put(getLorryFailure(JSON.stringify(error)));
    }
}

export function* addDriverSaga(action: PayloadAction<IAddDriverRequest>) {
    console.log('addDriverSaga--action--', JSON.stringify(action));
    try {
        const response: IAddDriverResponse = yield call(VehicleService.addDriverService, action.payload);
        console.log('addDriverSaga-response----', JSON.stringify(response));
        yield put(addDriverSuccess(response));
    } catch (error) {
        console.log('addDriverSaga-error----', error);
        yield put(addDriverFailure(JSON.stringify(error)));
    }
}

export function* getDriverSaga(action: PayloadAction<string>) {
    console.log('getDriverSaga--action--', JSON.stringify(action));
    try {
        const response: IGetDriverResponse = yield call(VehicleService.GetDriverService, action.payload);
        console.log('getDriverSaga-response----', JSON.stringify(response));
        yield put(getDriverSuccess(response));
    } catch (error) {
        console.log('getDriverSaga-error----', error);
        yield put(getDriverFailure(JSON.stringify(error)));
    }
}

export function* getVehicleSizeSaga(action: PayloadAction<string>) {
    try {
        const response: IGetDriverResponse = yield call(VehicleService.GetVehicleSizeService);
        console.log('getVehicleSizeSaga-response----', JSON.stringify(response));
        yield put(getVehicleSizeSuccess(response));
    } catch (error) {
        console.log('getVehicleSizeSaga-error----', error);
        yield put(getVehicleSizeFailure(JSON.stringify(error)));
    }
}

export function* watcherVehicleSaga() {
    yield takeLatest(addLorryRequest.type, addLorrySaga);
    yield takeLatest(getLorryRequest.type, getLorrySaga);
    yield takeLatest(addDriverRequest.type, addDriverSaga);
    yield takeLatest(getDriverRequest.type, getDriverSaga);
    yield takeLatest(getVehicleSizeRequest.type, getVehicleSizeSaga);
}