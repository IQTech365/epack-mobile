import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as CompanyService from '../service/CompanyService';
import { 
    getOtpSuccess, 
    getOtpFailure, 
    getOtpRequest, 
    verifyOtpSuccess, 
    verifyOtpFailure, 
    verifyOtpRequest
 } from '../redux/slices/OtpSlice';
import { IOtpGetRequest } from '../interface/otp/IOtpGetRequest';
import { IOtpGetResponse } from '../interface/otp/IOtpGetResponse';
import { IOtpVerifyRequest } from '../interface/otp/IOtpVerifyRequest';
import { IOtpVerifyResponse } from '../interface/otp/IOtpVerifyResponse';
import { ICompanyRegistrationResponse } from '../interface/companyRegistration/ICompanyRegistrationResponse';
import { addCompanyFailure, addCompanySuccess } from '../redux/slices/CompanySlice';
import { ICompanyRegistrationRequest } from '../interface/companyRegistration/ICompanyRegistrationRequest';

export function* addCompanySaga(action: PayloadAction<ICompanyRegistrationRequest>) {
    console.log('addCompanySaga--action--', JSON.stringify(action));
    try {
        const response: ICompanyRegistrationResponse = yield call(CompanyService.AddCompanyService, action.payload);
        console.log('addCompanySaga-response----', JSON.stringify(response));
        yield put(addCompanySuccess(response));
    } catch (error) {
        console.log('addCompanySaga-error----', error);
        yield put(addCompanyFailure(error));
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
    yield takeLatest(getOtpRequest.type, addCompanySaga);
    // yield takeLatest(verifyOtpRequest.type, verifyOtpSaga);
}