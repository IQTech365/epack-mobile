import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as CommonService from '../service/CommonService';
import { IOtpGetRequest } from '../interface/otp/IOtpGetRequest';
import { IPackingTypeResponse } from '../interface/common/common';
import { getPackingTypesFailure, getPackingTypesRequest, getPackingTypesSuccess } from '../redux/slices/CommonSlice';

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

export function* watcherCommonSaga() {
    yield takeLatest(getPackingTypesRequest.type, getPackingTypesSaga);
}