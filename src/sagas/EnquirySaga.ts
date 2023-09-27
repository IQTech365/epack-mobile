import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as EnquiryService from '../service/EnquiryService';
import { IAddEnquiryRequest } from '../interface/enquiry/IAddEnquiryRequest';
import { IAddEnquiryResponse } from '../interface/enquiry/IAddEnquiryResponse';
import { addEnquiryFailure, addEnquiryRequest, addEnquirySuccess, addFollowupFailure, addFollowupRequest, addFollowupSuccess, getEnquiriesFailure, getEnquiriesRequest, getEnquiriesSuccess, getFollowupsFailure, getFollowupsRequest, getFollowupsSuccess } from '../redux/slices/EnquirySlice';
import { IGetEnquiriesResponse } from '../interface/enquiry/IGetEnquiriesResponse';
import { IAddFollowupRequest } from '../interface/enquiry/IAddFollowupRequest';
import { IAddFollowupResponse } from '../interface/enquiry/IAddFollowupResponse';
import { IGetFollowupsResponse } from '../interface/enquiry/IGetFollowupsResponse';

export function* addEnquirySaga(action: PayloadAction<IAddEnquiryRequest>) {
    try {
        const response: IAddEnquiryResponse = yield call(EnquiryService.AddEnquiryService, action.payload);
        console.log('addEnquirySaga-response----', JSON.stringify(response));
        yield put(addEnquirySuccess(response));
    } catch (error) {
        console.log('addEnquirySaga-error----', error);
        yield put(addEnquiryFailure(error));
    }
}

export function* getEnquiriesSaga(action: PayloadAction<string>) {
    try {
        const response: IGetEnquiriesResponse = yield call(EnquiryService.GetEnquiriesService, action.payload);
        console.log('getEnquiriesSaga-response----', JSON.stringify(response));
        yield put(getEnquiriesSuccess(response));
    } catch (error) {
        console.log('getEnquiriesSaga-error----', JSON.stringify(error));
        yield put(getEnquiriesFailure(error));
    }
}

export function* addFollowupSaga(action: PayloadAction<IAddFollowupRequest>) {
    try {
        const response: IAddFollowupResponse = yield call(EnquiryService.AddFollowupService, action.payload);
        console.log('addFollowupSaga-response----', JSON.stringify(response));
        yield put(addFollowupSuccess(response));
    } catch (error) {
        console.log('addFollowupSaga-error----', JSON.stringify(error));
        yield put(addFollowupFailure(error));
    }
}

export function* getFollowupsSaga(action: PayloadAction<string>) {
    try {
        const response: IGetFollowupsResponse = yield call(EnquiryService.GetFollowupsService, action.payload);
        console.log('getFollowupsSaga-response----', JSON.stringify(response));
        yield put(getFollowupsSuccess(response));
    } catch (error) {
        console.log('getFollowupsSaga-error----', JSON.stringify(error));
        yield put(getFollowupsFailure(error));
    }
}

export function* watcherEnquirySaga() {
    yield takeLatest(addEnquiryRequest.type, addEnquirySaga);
    yield takeLatest(getEnquiriesRequest.type, getEnquiriesSaga);
    yield takeLatest(addFollowupRequest.type, addFollowupSaga);
    yield takeLatest(getFollowupsRequest.type, getFollowupsSaga);
}