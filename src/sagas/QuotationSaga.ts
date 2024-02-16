import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as QuotationService from '../service/QuotationService';
import { IAddQuotationRequest } from '../interface/quotation/IAddQuotationRequest';
import { aaddQuotationSuccess, addQuotationFailure, addQuotationRequest, getQuotationHtmlFailure, getQuotationHtmlRequest, getQuotationHtmlSuccess, getQuotationsByEnquiryIdFailure, getQuotationsByEnquiryIdRequest, getQuotationsByEnquiryIdSuccess, getQuotationsFailure, getQuotationsRequest, getQuotationsSuccess, getSingleQuotationFailure, getSingleQuotationRequest, getSingleQuotationSuccess, updateQuotationFailure, updateQuotationRequest, updateQuotationSuccess } from '../redux/slices/QuotationSlice';
import { IAddQuotationResponse } from '../interface/quotation/IAddQuotationResponse';
import { IGetQuotationsResponse } from '../interface/quotation/IGetQuotationsResponse';
import { IGetQuotationRequest } from '../interface/quotation/IGetQuotationRequest';
import { IGetSingleQuotationResponse } from '../interface/quotation/IGetSingleQuotationResponse';
import { IHtmlTemplateRequest, IHtmlTemplateResponse } from '../interface/order/templates/ITemplateResponse';
import { IQuotationResponse, IUpdateQuotationRequest, IUpdateQuotationResponse } from '../interface/quotation/quotation';

export function* addQuotationSaga(action: PayloadAction<IAddQuotationRequest>) {
    try {
        const response: IAddQuotationResponse = yield call(QuotationService.AddQuotationService, action.payload);
        yield put(aaddQuotationSuccess(response));
    } catch (error) {
        yield put(addQuotationFailure(error));
    }
}

export function* updateQuotationSaga(action: PayloadAction<IUpdateQuotationRequest>) {
    try {
        const response: IUpdateQuotationResponse = yield call(QuotationService.UpdateQuotationService, action.payload);
        yield put(updateQuotationSuccess(response));
    } catch (error) {
        yield put(updateQuotationFailure(error));
    }
}

export function* getQuotationsSaga(action: PayloadAction<IGetQuotationRequest>) {
    try {
        const response: IGetQuotationsResponse = yield call(QuotationService.GetQuotationsService, action.payload);
        yield put(getQuotationsSuccess(response));
    } catch (error) {
        yield put(getQuotationsFailure(error));
    }
}

export function* getQuotationsByEnquiryIdSaga(action: PayloadAction<string>) {
    try {
        const response: IQuotationResponse = yield call(QuotationService.GetQuotationsByEnquiryIdService, action.payload);
        yield put(getQuotationsByEnquiryIdSuccess(response));
    } catch (error) {
        yield put(getQuotationsByEnquiryIdFailure(error));
    }
}

export function* getSingleQuotationSaga(action: PayloadAction<string>) {
    try {
        const response: IGetSingleQuotationResponse = yield call(QuotationService.GetSingleQuotationService, action.payload);
        yield put(getSingleQuotationSuccess(response));
    } catch (error) {
        yield put(getSingleQuotationFailure(error));
    }
}

export function* getQuotationTemplateHtmlSaga(action: PayloadAction<IHtmlTemplateRequest>) {
    try {
        const response: IHtmlTemplateResponse = yield call(QuotationService.GetQuotationTemplateHtmlService, action.payload);
        console.log('getQuotationTemplateHtmlSaga-response-', JSON.stringify(response));
        yield put(getQuotationHtmlSuccess(response));
    } catch (error) {
        console.log('getQuotationTemplateHtmlSaga-error-', JSON.stringify(error));
        yield put(getQuotationHtmlFailure(error));
    }
  }


export function* watcherQuotationSaga() {
    yield takeLatest(addQuotationRequest.type, addQuotationSaga);
    yield takeLatest(getQuotationsRequest.type, getQuotationsSaga);
    yield takeLatest(getQuotationsByEnquiryIdRequest.type, getQuotationsByEnquiryIdSaga);
    yield takeLatest(getSingleQuotationRequest.type, getSingleQuotationSaga);
    yield takeLatest(getQuotationHtmlRequest.type, getQuotationTemplateHtmlSaga);
    yield takeLatest(updateQuotationRequest.type, updateQuotationSaga);
}