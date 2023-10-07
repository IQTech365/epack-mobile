import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as QuotationService from '../service/QuotationService';
import { IAddQuotationRequest } from '../interface/quotation/IAddQuotationRequest';
import { aaddQuotationSuccess, addQuotationFailure, addQuotationRequest, getQuotationsFailure, getQuotationsRequest, getQuotationsSuccess } from '../redux/slices/QuotationSlice';
import { IAddQuotationResponse } from '../interface/quotation/IAddQuotationResponse';
import { IGetQuotationsResponse } from '../interface/quotation/IGetQuotationsResponse';

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

export function* getQuotationsSaga(action: PayloadAction<string>) {
    try {
        const response: IGetQuotationsResponse = yield call(QuotationService.GetQuotationsService, action.payload);
        console.log('getQuotationsSaga-response----', JSON.stringify(response));
        yield put(getQuotationsSuccess(response));
    } catch (error) {
        console.log('getQuotationsSaga-error----', error);
        yield put(getQuotationsFailure(error));
    }
}


export function* watcherQuotationSaga() {
    yield takeLatest(addQuotationRequest.type, addQuotationSaga);
    yield takeLatest(getQuotationsRequest.type, getQuotationsSaga);
 
}