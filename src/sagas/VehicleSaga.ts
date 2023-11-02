import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as VehicleService from '../service/VehicleService';
import { addDriverFailure, addDriverRequest, addDriverSuccess, addLorryFailure, addLorryRequest, addLorrySuccess } from '../redux/slices/VehicleSlice';
import { IAddLorryRequest } from '../interface/vehicle/IAddLorryRequest';
import { IAddLorryResponse } from '../interface/vehicle/IAddLorryResponse';
import { IAddDriverRequest } from '../interface/vehicle/IAddDriverRequest';
import { IAddDriverResponse } from '../interface/vehicle/IAddDriverResponse';

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

// export function* getBranchSaga(action: PayloadAction<string>) {
//     console.log('getBranchSaga--action--', JSON.stringify(action));
//     try {
//         const response: IGetBranchsResponse = yield call(MyProfileService.GetBranchService, action.payload);
//         console.log('getBranchSaga-response----', JSON.stringify(response));
//         yield put(getBranchsSuccess(response));
//     } catch (error) {
//         console.log('getBranchSaga-error----', error);
//         yield put(getBranchFailure(JSON.stringify(error)));
//     }
// }

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

// export function* getFranchiseSaga(action: PayloadAction<string>) {
//     console.log('getFranchiseSaga--action--', JSON.stringify(action));
//     try {
//         const response: IGetFranchiseResponse = yield call(MyProfileService.GetFranchiseService, action.payload);
//         console.log('getFranchiseSaga-response----', JSON.stringify(response));
//         yield put(getFranchiseSuccess(response));
//     } catch (error) {
//         console.log('getFranchiseSaga-error----', error);
//         yield put(getFranchiseFailure(JSON.stringify(error)));
//     }
// }
export function* watcherVehicleSaga() {
    yield takeLatest(addLorryRequest.type, addLorrySaga);
    // yield takeLatest(getBranchsRequest.type, getBranchSaga);
    yield takeLatest(addDriverRequest.type, addDriverSaga);
    // yield takeLatest(getFranchiseRequest.type, getFranchiseSaga);
}