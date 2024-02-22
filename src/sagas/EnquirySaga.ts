import { takeLatest, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import * as EnquiryService from '../service/EnquiryService';
import { IAddEnquiryRequest } from '../interface/enquiry/IAddEnquiryRequest';
import { IAddEnquiryResponse } from '../interface/enquiry/IAddEnquiryResponse';
import {
    addEnquiryFailure, addEnquiryRequest, addEnquirySuccess,
    addFollowupFailure,
    addFollowupRequest,
    addFollowupSuccess,
    addPackingMaterialFailure,
    addPackingMaterialRequest,
    addPackingMaterialSuccess,
    addSurveyFailure,
    addSurveyItemFailure,
    addSurveyItemRequest,
    addSurveyItemSuccess,
    addSurveyRequest,
    addSurveySuccess,
    getEnquiriesFailure,
    getEnquiriesRequest,
    getEnquiriesSuccess,
    getEnquiryFailure,
    getEnquiryRequest,
    getEnquirySuccess,
    getFollowupsFailure,
    getFollowupsRequest,
    getFollowupsSuccess,
    getPackingMaterialsFailure,
    getPackingMaterialsRequest,
    getPackingMaterialsSuccess,
    getSurveyItemListFailure,
    getSurveyItemListRequest,
    getSurveyItemListSuccess,
    getSurveyListFailure,
    getSurveyListRequest,
    getSurveyListSuccess,
    getSurveyListTemplateFailure,
    getSurveyListTemplateRequest,
    getSurveyListTemplateSuccess,
    updateAddressFailure,
    updateAddressRequest,
    updateAddressSuccess,
    updateContactDetailsFailure,
    updateContactDetailsRequest,
    updateContactDetailsSuccess,
    updateEnquiryStatusFailure,
    updateEnquiryStatusRequest,
    updateEnquiryStatusSuccess,
    updateShiftingInfoFailure,
    updateShiftingInfoRequest,
    updateShiftingInfoSuccess,
    updateSurveryItemListFailure,
    updateSurveryItemListRequest,
    updateSurveryItemListSuccess
} from '../redux/slices/EnquirySlice';
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
import { IAddSurveyItemRequest } from '../interface/enquiry/IAddSurveyItemRequest';
import { IGetSurveyItemListResponse, IGetSurvyeItemListRequestPayload } from '../interface/enquiry/IGetSurveyItemListResponse';
import { ISingleEnquiryResponse } from '../interface/enquiry/ISingleEnquiryResponse';
import { IAddPackingMaterialRequest } from '../interface/enquiry/IAddPackingMaterialRequest';
import { IAddPackingMaterialResponse } from '../interface/enquiry/IAddPackingMaterialResponse';
import { IGetPackingMaterialsRequest, IPackingMaterialsResponse } from '../interface/enquiry/IPackingMaterialsResponse';
import { ISurveyListTemlatePayload, ISurveyListTemplateResponse, IUpdateSurveyItemRequest, IUpdateSurveyItemResponse } from '../interface/enquiry/enquiry';

export function* addEnquirySaga(action: PayloadAction<IAddEnquiryRequest>) {
    try {
        const response: IAddEnquiryResponse = yield call(EnquiryService.AddEnquiryService, action.payload);
        yield put(addEnquirySuccess(response));
    } catch (error) {
        yield put(addEnquiryFailure(error));
    }
}

export function* getEnquiriesSaga(action: PayloadAction<string>) {
    try {
        const response: IGetEnquiriesResponse = yield call(EnquiryService.GetEnquiriesService, action.payload);
        yield put(getEnquiriesSuccess(response));
    } catch (error) {
        yield put(getEnquiriesFailure(error));
    }
}

export function* getEnquirySaga(action: PayloadAction<string>) {
    try {
        const response: ISingleEnquiryResponse = yield call(EnquiryService.GetEnquiryService, action.payload);
        yield put(getEnquirySuccess(response));
    } catch (error) {
        yield put(getEnquiryFailure(error));
    }
}

export function* addFollowupSaga(action: PayloadAction<IAddFollowupRequest>) {
    try {
        const response: IAddFollowupResponse = yield call(EnquiryService.AddFollowupService, action.payload);
        yield put(addFollowupSuccess(response));
    } catch (error) {
        yield put(addFollowupFailure(error));
    }
}

export function* getFollowupsSaga(action: PayloadAction<string>) {
    try {
        const response: IGetFollowupsResponse = yield call(EnquiryService.GetFollowupsService, action.payload);
        yield put(getFollowupsSuccess(response));
    } catch (error) {
        yield put(getFollowupsFailure(error));
    }
}

export function* addSurveySaga(action: PayloadAction<IAddSurveyRequest>) {
    try {
        const response: IAddSurveyResponse = yield call(EnquiryService.AddSurveyService, action.payload);
        yield put(addSurveySuccess(response));
    } catch (error) {
        yield put(addSurveyFailure(error));
    }
}

export function* getSurveyListSaga(action: PayloadAction<string>) {
    try {
        const response: IGetSurveyListResponse = yield call(EnquiryService.GetSurveyListService, action.payload);
        yield put(getSurveyListSuccess(response));
    } catch (error) {
        yield put(getSurveyListFailure(error));
    }
}

export function* addSurveyItemSaga(action: PayloadAction<IAddSurveyItemRequest>) {
    try {
        const response: IAddSurveyResponse = yield call(EnquiryService.AddSurveyItemService, action.payload);
        yield put(addSurveyItemSuccess(response));
    } catch (error) {
        yield put(addSurveyItemFailure(error));
    }
}

export function* getSurveyItemListSaga(action: PayloadAction<IGetSurvyeItemListRequestPayload>) {
    try {
        const response: IGetSurveyItemListResponse = yield call(EnquiryService.GetSurveyItemListService, action.payload);
        yield put(getSurveyItemListSuccess(response));
    } catch (error) {
        yield put(getSurveyItemListFailure(error));
    }
}

export function* updateEnquiryStatusSaga(action: PayloadAction<{ id: string, requestBody: IUpdateEnquiryStatusRequest }>) {
    const { id, requestBody } = action.payload;
    try {
        const response: IUpdateEnquiryStatusResponse = yield call(EnquiryService.UpdateEnquiryStatusService, id, requestBody);
        yield put(updateEnquiryStatusSuccess(response));
    } catch (error) {
        yield put(updateEnquiryStatusFailure(error));
    }
}

export function* updateAddressSaga(action: PayloadAction<{ id: string, requestBody: IPickupAddress | IDropAddress }>) {
    const { id, requestBody } = action.payload;
    try {
        const response: IUpdateAddressResponse = yield call(EnquiryService.UpdateAddressService, id, requestBody);
        yield put(updateAddressSuccess(response));
    } catch (error) {
        yield put(updateAddressFailure(error));
    }
}

export function* updateContactDetailsSaga(action: PayloadAction<{ id: string, requestBody: IUpdateIndividualContactDetailRequest | IUpdateCompanyContactDetailRequest }>) {
    const { id, requestBody } = action.payload;
    try {
        const response: IUpdateContactDetailResponse = yield call(EnquiryService.UpdateContactDetailsService, id, requestBody);
        yield put(updateContactDetailsSuccess(response));
    } catch (error) {
        yield put(updateContactDetailsFailure(error));
    }
}

export function* updateShiftingInfoSaga(action: PayloadAction<{ id: string, requestBody: IUpdateShiftingInfoRequest }>) {
    const { id, requestBody } = action.payload;
    try {
        const response: IUpdateShiftingInfoResponse = yield call(EnquiryService.UpdateShiftingInfoService, id, requestBody);
        yield put(updateShiftingInfoSuccess(response));
    } catch (error) {
        yield put(updateShiftingInfoFailure(error));
    }
}

export function* addPackingMaterialSaga(action: PayloadAction<IAddPackingMaterialRequest>) {
    try {
        const response: IAddPackingMaterialResponse = yield call(EnquiryService.AddPackingMaterialService, action.payload);
        yield put(addPackingMaterialSuccess(response));
    } catch (error) {
        yield put(addPackingMaterialFailure(error));
    }
}

export function* getPackingMaterialsSaga(action: PayloadAction<IGetPackingMaterialsRequest>) {
    try {
        const response: IPackingMaterialsResponse = yield call(EnquiryService.GetPackingMaterialsService, action.payload);
        yield put(getPackingMaterialsSuccess(response));
    } catch (error) {
        yield put(getPackingMaterialsFailure(error));
    }
}

export function* updateSurveyItemListSaga(action: PayloadAction<IUpdateSurveyItemRequest>) {
    try {
        const response: IUpdateSurveyItemResponse = yield call(EnquiryService.UpdateSurveyItemListService, action.payload);
        yield put(updateSurveryItemListSuccess(response));
    } catch (error) {
        yield put(updateSurveryItemListFailure(error));
    }
}

export function* getSurveyListItemTemplateSaga(action: PayloadAction<ISurveyListTemlatePayload>) {
    try {
        const response: ISurveyListTemplateResponse = yield call(EnquiryService.GetSurveyListItemTemplateService, action.payload);
        yield put(getSurveyListTemplateSuccess(response));
    } catch (error) {
        yield put(getSurveyListTemplateFailure(error));
    }
}

export function* watcherEnquirySaga() {
    yield takeLatest(addEnquiryRequest.type, addEnquirySaga);
    yield takeLatest(getEnquiriesRequest.type, getEnquiriesSaga);
    yield takeLatest(getEnquiryRequest.type, getEnquirySaga);
    yield takeLatest(addFollowupRequest.type, addFollowupSaga);
    yield takeLatest(getFollowupsRequest.type, getFollowupsSaga);
    yield takeLatest(addSurveyRequest.type, addSurveySaga);
    yield takeLatest(getSurveyListRequest.type, getSurveyListSaga);
    yield takeLatest(addSurveyItemRequest.type, addSurveyItemSaga);
    yield takeLatest(getSurveyItemListRequest.type, getSurveyItemListSaga);
    yield takeLatest(updateEnquiryStatusRequest.type, updateEnquiryStatusSaga);
    yield takeLatest(updateAddressRequest.type, updateAddressSaga);
    yield takeLatest(updateContactDetailsRequest.type, updateContactDetailsSaga);
    yield takeLatest(updateShiftingInfoRequest.type, updateShiftingInfoSaga);
    yield takeLatest(addPackingMaterialRequest.type, addPackingMaterialSaga);
    yield takeLatest(getPackingMaterialsRequest.type, getPackingMaterialsSaga);
    yield takeLatest(updateSurveryItemListRequest.type, updateSurveyItemListSaga);
    yield takeLatest(getSurveyListTemplateRequest.type, getSurveyListItemTemplateSaga);
}