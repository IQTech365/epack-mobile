import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as EnquiryService from '../service/EnquiryService';
import { IAddEnquiryRequest } from '../interface/enquiry/IAddEnquiryRequest';
import { IAddEnquiryResponse } from '../interface/enquiry/IAddEnquiryResponse';
import { addEnquiryFailure, addEnquiryRequest, addEnquirySuccess, addFollowupFailure, addFollowupRequest, addFollowupSuccess, addSurveyFailure, addSurveyRequest, addSurveySuccess, getEnquiriesFailure, getEnquiriesRequest, getEnquiriesSuccess, getFollowupsFailure, getFollowupsRequest, getFollowupsSuccess, getSurveyListFailure, getSurveyListRequest, getSurveyListSuccess, updateAddressFailure, updateAddressRequest, updateAddressSuccess, updateContactDetailsFailure, updateContactDetailsRequest, updateContactDetailsSuccess, updateEnquiryStatusFailure, updateEnquiryStatusRequest, updateEnquiryStatusSuccess, updateShiftingInfoFailure, updateShiftingInfoRequest, updateShiftingInfoSuccess } from '../redux/slices/EnquirySlice';
import { IGetEnquiriesResponse } from '../interface/enquiry/IGetEnquiriesResponse';
import { IAddFollowupRequest } from '../interface/enquiry/IAddFollowupRequest';
import { IAddFollowupResponse } from '../interface/enquiry/IAddFollowupResponse';
import { IGetFollowupsResponse } from '../interface/enquiry/IGetFollowupsResponse';
import { IAddSurveyRequest } from '../interface/enquiry/IAddSurveyRequest';
import { IAddSurveyResponse } from '../interface/enquiry/IAddSurveyResponse';
import { IGetSurveyListResponse } from '../interface/enquiry/IGetSurveyListResponse';
import { IUpdateEnquiryStatusResponse } from '../interface/enquiry/IUpdateEnquiryStatusResponse';
import { IUpdateEnquiryRequest } from '../interface/enquiry/IupdateEnquiryRequest';
import { IDropAddress, IPickupAddress } from '../interface/order/IUpdateAddressRequest';
import { IUpdateAddressResponse } from '../interface/order/IUpdateAddressResponse';
import { IUpdateCompanyContactDetailRequest, IUpdateContactDetailResponse, IUpdateIndividualContactDetailRequest } from '../interface/order/IUpdateContactDetails';
import { IUpdateShiftingInfoRequest, IUpdateShiftingInfoResponse } from '../interface/enquiry/IUpdateShiftingInfo';
import { IUpdateEnquiryStatusRequest } from '../interface/enquiry/IUpdateEnquiryStatusRequest';

export function* addEnquirySaga(action: PayloadAction<IAddEnquiryRequest>) {
    try {
        const response: IAddEnquiryResponse = yield call(EnquiryService.AddEnquiryService, action.payload);
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

export function* addSurveySaga(action: PayloadAction<IAddSurveyRequest>) {
    try {
        const response: IAddSurveyResponse = yield call(EnquiryService.AddSurveyService, action.payload);
        console.log('addSurveySaga-response----', JSON.stringify(response));
        yield put(addSurveySuccess(response));
    } catch (error) {
        console.log('addSurveySaga-error----', JSON.stringify(error));
        yield put(addSurveyFailure(error));
    }
}

export function* getSurveyListSaga(action: PayloadAction<string>) {
    try {
        const response: IGetSurveyListResponse = yield call(EnquiryService.GetSurveyListService, action.payload);
        console.log('IGetSurveyListResponse-response----', JSON.stringify(response));
        yield put(getSurveyListSuccess(response));
    } catch (error) {
        console.log('IGetSurveyListResponse-error----', JSON.stringify(error));
        yield put(getSurveyListFailure(error));
    }
}

export function* updateEnquiryStatusSaga(action: PayloadAction<{id:string, requestBody:IUpdateEnquiryStatusRequest}>) {
    const { id, requestBody } = action.payload;
    try {
        const response: IUpdateEnquiryStatusResponse = yield call(EnquiryService.UpdateEnquiryStatusService, id, requestBody);
        console.log('updateEnquiryStatusSaga-response----', JSON.stringify(response));
        yield put(updateEnquiryStatusSuccess(response));
    } catch (error) {
        console.log('updateEnquiryStatusSaga-error----', JSON.stringify(error));
        yield put(updateEnquiryStatusFailure(error));
    }
}

export function* updateAddressSaga(action: PayloadAction<{id:string, requestBody:IPickupAddress | IDropAddress}>) {
    const { id, requestBody } = action.payload;
    try {
        const response: IUpdateAddressResponse = yield call(EnquiryService.UpdateAddressService, id, requestBody);
        console.log('updateAddressSaga-response----', JSON.stringify(response));
        yield put(updateAddressSuccess(response));
    } catch (error) {
        console.log('updateAddressSaga-error----', JSON.stringify(error));
        yield put(updateAddressFailure(error));
    }
}

export function* updateContactDetailsSaga(action: PayloadAction<{id:string, requestBody:IUpdateIndividualContactDetailRequest | IUpdateCompanyContactDetailRequest}>) {
    const { id, requestBody } = action.payload;
    try {
        const response: IUpdateContactDetailResponse = yield call(EnquiryService.UpdateContactDetailsService, id, requestBody);
        console.log('updateContactDetailsSaga-response----', JSON.stringify(response));
        yield put(updateContactDetailsSuccess(response));
    } catch (error) {
        console.log('updateContactDetailsSaga-error----', JSON.stringify(error));
        yield put(updateContactDetailsFailure(error));
    }
}

export function* updateShiftingInfoSaga(action: PayloadAction<{id:string, requestBody:IUpdateShiftingInfoRequest}>) {
    const { id, requestBody } = action.payload;
    try {
        const response: IUpdateShiftingInfoResponse = yield call(EnquiryService.UpdateShiftingInfoService, id, requestBody);
        console.log('updateShiftingInfoSaga-response----', JSON.stringify(response));
        yield put(updateShiftingInfoSuccess(response));
    } catch (error) {
        console.log('updateShiftingInfoSaga-error----', JSON.stringify(error));
        yield put(updateShiftingInfoFailure(error));
    }
}

export function* watcherEnquirySaga() {
    yield takeLatest(addEnquiryRequest.type, addEnquirySaga);
    yield takeLatest(getEnquiriesRequest.type, getEnquiriesSaga);
    yield takeLatest(addFollowupRequest.type, addFollowupSaga);
    yield takeLatest(getFollowupsRequest.type, getFollowupsSaga);
    yield takeLatest(addSurveyRequest.type, addSurveySaga);
    yield takeLatest(getSurveyListRequest.type, getSurveyListSaga);
    yield takeLatest(updateEnquiryStatusRequest.type, updateEnquiryStatusSaga);
    yield takeLatest(updateAddressRequest.type, updateAddressSaga);
    yield takeLatest(updateContactDetailsRequest.type, updateContactDetailsSaga);
    yield takeLatest(updateShiftingInfoRequest.type, updateShiftingInfoSaga);
}