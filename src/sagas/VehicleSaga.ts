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
import { IGetVehicleSizeResponse } from '../interface/vehicle/IGetVehicleSizeResponse';

export function* addLorrySaga(action: PayloadAction<IAddLorryRequest>) {
    try {
        const response: IAddLorryResponse = yield call(VehicleService.AddLorryService, action.payload);
        yield put(addLorrySuccess(response));
    } catch (error) {
        yield put(addLorryFailure(JSON.stringify(error)));
    }
}

export function* getLorrySaga(action: PayloadAction<string>) {
    try {
        const response: IGetLorryResponse = yield call(VehicleService.GetLorryService, action.payload);
        yield put(getLorrySuccess(response));
    } catch (error) {
        yield put(getLorryFailure(JSON.stringify(error)));
    }
}

export function* addDriverSaga(action: PayloadAction<IAddDriverRequest>) {
    try {
        const response: IAddDriverResponse = yield call(VehicleService.addDriverService, action.payload);
        yield put(addDriverSuccess(response));
    } catch (error) {
        yield put(addDriverFailure(JSON.stringify(error)));
    }
}

export function* getDriverSaga(action: PayloadAction<string>) {
    try {
        const response: IGetDriverResponse = yield call(VehicleService.GetDriverService, action.payload);
        yield put(getDriverSuccess(response));
    } catch (error) {
        yield put(getDriverFailure(JSON.stringify(error)));
    }
}

export function* getVehicleSizeSaga(action: PayloadAction<string>) {
    try {
        const response: IGetVehicleSizeResponse = yield call(VehicleService.GetVehicleSizeService);
        yield put(getVehicleSizeSuccess(response));
    } catch (error) {
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