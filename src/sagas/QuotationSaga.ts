import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as QuotationService from '../service/QuotationService';
import { IAddQuotationRequest } from '../interface/quotation/IAddQuotationRequest';
import { aaddQuotationSuccess, addQuotationFailure, addQuotationRequest, getQuotationHtmlFailure, getQuotationHtmlRequest, getQuotationHtmlSuccess, getQuotationsFailure, getQuotationsRequest, getQuotationsSuccess, getSingleQuotationFailure, getSingleQuotationRequest, getSingleQuotationSuccess, updateQuotationFailure, updateQuotationRequest, updateQuotationSuccess } from '../redux/slices/QuotationSlice';
import { IAddQuotationResponse } from '../interface/quotation/IAddQuotationResponse';
import { IGetQuotationsResponse } from '../interface/quotation/IGetQuotationsResponse';
import { IGetQuotationRequest } from '../interface/quotation/IGetQuotationRequest';
import { IGetSingleQuotationResponse } from '../interface/quotation/IGetSingleQuotationResponse';
import { IHtmlTemplateRequest, IHtmlTemplateResponse } from '../interface/order/templates/ITemplateResponse';
import { IUpdateQuotationRequest, IUpdateQuotationResponse } from '../interface/quotation/quotation';

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

export function* updateQuotationSaga(action: PayloadAction<IUpdateQuotationRequest>) {
    try {
        const response: IUpdateQuotationResponse = yield call(QuotationService.UpdateQuotationService, action.payload);
        console.log('updateQuotationSaga-response----', JSON.stringify(response));
        yield put(updateQuotationSuccess(response));
    } catch (error) {
        console.log('updateQuotationSaga-error----', error);
        yield put(updateQuotationFailure(error));
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

export function* getQuotationTemplateHtmlSaga(action: PayloadAction<IHtmlTemplateRequest>) {
    try {
        const {templateId, docId} = action.payload;
        const response: IHtmlTemplateResponse = yield call(QuotationService.GetQuotationTemplateHtmlService, templateId, docId);
        console.log('getQuotationTemplateHtmlSaga-response----', JSON.stringify(response));
        yield put(getQuotationHtmlSuccess(response));
    } catch (error) {
        console.log('getQuotationTemplateHtmlSaga-error----', JSON.stringify(error));
        yield put(getQuotationHtmlFailure(error));
    }
  }


export function* watcherQuotationSaga() {
    yield takeLatest(addQuotationRequest.type, addQuotationSaga);
    yield takeLatest(getQuotationsRequest.type, getQuotationsSaga);
    yield takeLatest(getSingleQuotationRequest.type, getSingleQuotationSaga);
    yield takeLatest(getQuotationHtmlRequest.type, getQuotationTemplateHtmlSaga);
    yield takeLatest(updateQuotationRequest.type, updateQuotationSaga);
}