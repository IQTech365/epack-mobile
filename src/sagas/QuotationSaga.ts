import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as QuotationService from '../service/QuotationService';
import { IAddQuotationRequest } from '../interface/quotation/IAddQuotationRequest';
import { aaddQuotationSuccess, addQuotationFailure, addQuotationRequest } from '../redux/slices/QuotationSlice';
import { IAddQuotationResponse } from '../interface/quotation/IAddQuotationResponse';

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


export function* watcherQuotationSaga() {
    yield takeLatest(addQuotationRequest.type, addQuotationSaga);
 
}