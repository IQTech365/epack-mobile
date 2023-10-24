import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as MyProfileService from '../service/MyprofileService';
import { addBranchFailure, addBranchRequest, addBranchSuccess, addFranchiseFailure, addFranchiseRequest, addFranchiseSuccess, getBranchFailure, getBranchsRequest, getBranchsSuccess, getFranchiseFailure, getFranchiseRequest, getFranchiseSuccess } from '../redux/slices/MyProfile';
import { IAddBranchRequest } from '../interface/myProfile/IAddBranchRequest';
import { IAddBranchResponse } from '../interface/myProfile/IAddbranchResponse';
import { IGetBranchsResponse } from '../interface/myProfile/IGetBranchResponse';
import { IAddFranchiseRequest } from '../interface/myProfile/IAddFranchiseRequest';
import { IAddFranchiseResponse } from '../interface/myProfile/IAddFranchiseResponse';
import { IGetFranchiseResponse } from '../interface/myProfile/IGetFranchiseResponse';

export function* addBranchSaga(action: PayloadAction<IAddBranchRequest>) {
    console.log('addBranchSaga--action--', JSON.stringify(action));
    try {
        const response: IAddBranchResponse = yield call(MyProfileService.AddBranchService, action.payload);
        console.log('addBranchSaga-response----', JSON.stringify(response));
        yield put(addBranchSuccess(response));
    } catch (error) {
        console.log('addBranchSaga-error----', error);
        yield put(addBranchFailure(JSON.stringify(error)));
    }
}

export function* getBranchSaga(action: PayloadAction<string>) {
    console.log('getBranchSaga--action--', JSON.stringify(action));
    try {
        const response: IGetBranchsResponse = yield call(MyProfileService.GetBranchService, action.payload);
        console.log('getBranchSaga-response----', JSON.stringify(response));
        yield put(getBranchsSuccess(response));
    } catch (error) {
        console.log('getBranchSaga-error----', error);
        yield put(getBranchFailure(JSON.stringify(error)));
    }
}

export function* addFranchiseSaga(action: PayloadAction<IAddFranchiseRequest>) {
    console.log('addFranchiseSaga--action--', JSON.stringify(action));
    try {
        const response: IAddFranchiseResponse = yield call(MyProfileService.AddFranchiseService, action.payload);
        console.log('addFranchiseSaga-response----', JSON.stringify(response));
        yield put(addFranchiseSuccess(response));
    } catch (error) {
        console.log('addFranchiseSaga-error----', error);
        yield put(addFranchiseFailure(JSON.stringify(error)));
    }
}

export function* getFranchiseSaga(action: PayloadAction<string>) {
    console.log('getFranchiseSaga--action--', JSON.stringify(action));
    try {
        const response: IGetFranchiseResponse = yield call(MyProfileService.GetFranchiseService, action.payload);
        console.log('getFranchiseSaga-response----', JSON.stringify(response));
        yield put(getFranchiseSuccess(response));
    } catch (error) {
        console.log('getFranchiseSaga-error----', error);
        yield put(getFranchiseFailure(JSON.stringify(error)));
    }
}
export function* watcherMyprofileSaga() {
    yield takeLatest(addBranchRequest.type, addBranchSaga);
    yield takeLatest(getBranchsRequest.type, getBranchSaga);
    yield takeLatest(addFranchiseRequest.type, addFranchiseSaga);
    yield takeLatest(getFranchiseRequest.type, getFranchiseSaga);
}