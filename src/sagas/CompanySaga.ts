import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as CompanyService from '../service/CompanyService';
import { ICompanyRegistrationResponse } from '../interface/companyRegistration/ICompanyRegistrationResponse';
import {
  addCompanyFailure,
  addCompanyRequest,
  addCompanySuccess,
  getCompaniesFailure,
  getCompaniesRequest,
  getCompaniesSuccess,
  uploadCompanyLogoFailure,
  uploadCompanyLogoRequest,
  uploadCompanyLogoSuccess,
  uploadSignatureRequest,
} from '../redux/slices/CompanySlice';
import { ICompanyRegistrationRequest } from '../interface/companyRegistration/ICompanyRegistrationRequest';
import { IGetCompaniesResponse } from '../interface/companyRegistration/IGetCompaniesResponse';

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

export function* getCompaniesSaga(action: PayloadAction<string>) {
    try {
        const response: IGetCompaniesResponse = yield call(CompanyService.GetCompaniesService, action.payload);
        console.log('getCompaniesSaga-response----', JSON.stringify(response));
        yield put(getCompaniesSuccess(response));
    } catch (error) {
        console.log('getCompaniesSaga-error----', error);
        yield put(getCompaniesFailure(error));
    }
}

export function* uploadCompanyLogoSaga(action: PayloadAction<any>) {
    try {
        //@ts-ignore
        const response: any = yield call(CompanyService.UploadCompanyLogoService, action.payload);
        console.log('uploadCompanyLogoSaga-response----', JSON.stringify(response));
        yield put(uploadCompanyLogoSuccess(response));
    } catch (error) {
        console.log('uploadCompanyLogoSaga-error----', error);
        yield put(uploadCompanyLogoFailure(error));
    }
}

export function* uploadSignatureSaga(action: PayloadAction<any>) {
    try {
        //@ts-ignore
        const response: any = yield call(CompanyService.UploadSignatureService, action.payload);
        console.log('uploadSignatureSaga-response----', JSON.stringify(response));
        yield put(uploadCompanyLogoSuccess(response));
    } catch (error) {
        console.log('uploadSignatureSaga-error----', JSON.stringify(error));
        yield put(uploadCompanyLogoFailure(error));
    }
}

export function* watcherCompanySaga() {
    yield takeLatest(addCompanyRequest.type, addCompanySaga);
    yield takeLatest(getCompaniesRequest.type, getCompaniesSaga);
    yield takeLatest(uploadCompanyLogoRequest.type, uploadCompanyLogoSaga);
    yield takeLatest(uploadSignatureRequest.type, uploadSignatureSaga);
}