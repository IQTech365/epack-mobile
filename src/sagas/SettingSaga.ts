import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as SettingService from '../service/SettingService';
import { 
    verifyOtpSuccess, 
    verifyOtpFailure, 
 } from '../redux/slices/OtpSlice';
import { IOtpVerifyRequest } from '../interface/otp/IOtpVerifyRequest';
import { IOtpVerifyResponse } from '../interface/otp/IOtpVerifyResponse';
import { IAddFooterContentRequest } from '../interface/setting/packerProfile/footerContent/IAddFooterContentRequest';
import { IAddFooterContentResponse } from '../interface/setting/packerProfile/footerContent/IAddFooterContentResponse';
import { addFooterContentFailure, addFooterContentRequest, addFooterContentSuccess, getFooterContentsFailure, getFooterContentsRequest, getFooterContentsSuccess } from '../redux/slices/SettingSlice';
import { IGetFooterContentsResponse } from '../interface/setting/packerProfile/footerContent/IGetFooterContentsResponse';

export function* addFooterContentSaga(action: PayloadAction<IAddFooterContentRequest>) {
    console.log('addFooterContentSaga--action--', JSON.stringify(action));
    try {
        const response: IAddFooterContentResponse = yield call(SettingService.AddFooterContentService, action.payload);
        console.log('addFooterContentSaga-response----', JSON.stringify(response));
        yield put(addFooterContentSuccess(response));
    } catch (error) {
        console.log('addFooterContentSaga-error----', error);
        yield put(addFooterContentFailure(JSON.stringify(error)));
    }
}

export function* getFooterContentsSaga(action: PayloadAction<string>) {
    console.log('getFooterContentsSaga--action--', JSON.stringify(action));
    try {
        const response: IGetFooterContentsResponse = yield call(SettingService.GetFooterContentsService, action.payload);
        console.log('getFooterContentsSaga-response----', JSON.stringify(response));
        yield put(getFooterContentsSuccess(response));
    } catch (error) {
        console.log('getFooterContentsSaga-error----', error);
        yield put(getFooterContentsFailure(JSON.stringify(error)));
    }
}

export function* verifyOtpSaga(action: PayloadAction<IOtpVerifyRequest>) {
    console.log('verifyOtpSaga--action--', JSON.stringify(action));
    try {
        const response: IOtpVerifyResponse = yield call(SettingService.VerifyOtpService, action.payload);
        console.log('verifyOtpSaga-response----', JSON.stringify(response));
        yield put(verifyOtpSuccess(response));
    } catch (error) {
        console.log('verifyOtpSaga-error----', JSON.stringify(error));
        yield put(verifyOtpFailure(error));
    }
}

export function* watcherSettingSaga() {
    yield takeLatest(addFooterContentRequest.type, addFooterContentSaga);
    yield takeLatest(getFooterContentsRequest.type, getFooterContentsSaga);
    // yield takeLatest(verifyOtpRequest.type, verifyOtpSaga);
}