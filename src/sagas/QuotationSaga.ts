import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as QuotationService from '../service/QuotationService';
import { IAddQuotationRequest } from '../interface/quotation/IAddQuotationRequest';
import { aaddQuotationSuccess, addQuotationFailure, addQuotationRequest, getQuotationsFailure, getQuotationsRequest, getQuotationsSuccess, getSingleQuotationFailure, getSingleQuotationRequest, getSingleQuotationSuccess } from '../redux/slices/QuotationSlice';
import { IAddQuotationResponse } from '../interface/quotation/IAddQuotationResponse';
import { IGetQuotationsResponse } from '../interface/quotation/IGetQuotationsResponse';
import { IGetQuotationRequest } from '../interface/quotation/IGetQuotationRequest';
import { IGetSingleQuotationResponse } from '../interface/quotation/IGetSingleQuotationResponse';

export function* addQuotationSaga(action: PayloadAction<IAddQuotationRequest>) {
    try {
        const response: IAddQuotationResponse = yield call(QuotationService.AddQuotationService, action.payload);
        console.log('addQuotationSaga-response----', JSON.stringify(response));
        yield put(aaddQuotationSuccess(response));
    } catch (error) {
        console.log('addQuotationSaga-error----', error);
        yield put(addQuotationFailure(error));
    }
}

export function* getQuotationsSaga(action: PayloadAction<IGetQuotationRequest>) {
    try {
        const response: IGetQuotationsResponse = yield call(QuotationService.GetQuotationsService, action.payload);
        console.log('getQuotationsSaga-response----', JSON.stringify(response));
        yield put(getQuotationsSuccess(response));
    } catch (error) {
        console.log('getQuotationsSaga-error----', error);
        yield put(getQuotationsFailure(error));
    }
}

export function* getSingleQuotationSaga(action: PayloadAction<string>) {
    try {
        const response: IGetSingleQuotationResponse = yield call(QuotationService.GetSingleQuotationService, action.payload);
        console.log('getSingleQuotationSaga-response----', JSON.stringify(response));
        yield put(getSingleQuotationSuccess(response));
    } catch (error) {
        console.log('getSingleQuotationSaga-error----', error);
        yield put(getSingleQuotationFailure(error));
    }
}


export function* watcherQuotationSaga() {
    yield takeLatest(addQuotationRequest.type, addQuotationSaga);
    yield takeLatest(getQuotationsRequest.type, getQuotationsSaga);
    yield takeLatest(getSingleQuotationRequest.type, getSingleQuotationSaga);
 
}