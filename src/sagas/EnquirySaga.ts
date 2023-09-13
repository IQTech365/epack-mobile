import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as EnquiryService from '../service/EnquiryService';
import { IAddEnquiryRequest } from '../interface/enquiry/IAddEnquiryRequest';
import { IAddEnquiryResponse } from '../interface/enquiry/IAddEnquiryResponse';
import { addEnquiryFailure, addEnquiryRequest, addEnquirySuccess } from '../redux/slices/EnquirySlice';

export function* addEnquirySaga(action: PayloadAction<IAddEnquiryRequest>) {
    console.log('addEnquirySaga--action--', JSON.stringify(action));
    try {
        const response: IAddEnquiryResponse = yield call(EnquiryService.AddEnquiryService, action.payload);
        console.log('addEnquirySaga-response----', JSON.stringify(response));
        yield put(addEnquirySuccess(response));
    } catch (error) {
        console.log('addEnquirySaga-error----', error);
        yield put(addEnquiryFailure(error));
    }
}

// export function* verifyOtpSaga(action: PayloadAction<IOtpVerifyRequest>) {
//     try {
//         const response: IOtpVerifyResponse = yield call(OtpService.VerifyOtpService, action.payload);
//         console.log('verifyOtpSaga-response----', JSON.stringify(response));
//         yield put(verifyOtpSuccess(response));
//     } catch (error) {
//         console.log('verifyOtpSaga-error----', JSON.stringify(error));
//         yield put(verifyOtpFailure(error));
//     }
// }

export function* watcherOtpSaga() {
    yield takeLatest(addEnquiryRequest.type, addEnquirySaga);
    // yield takeLatest(verifyOtpRequest.type, verifyOtpSaga);
}