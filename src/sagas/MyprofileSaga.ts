import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as MyProfileService from '../service/MyprofileService';
import { addBranchFailure, addBranchRequest, addBranchSuccess, getBranchFailure, getBranchsRequest, getBranchsSuccess } from '../redux/slices/MyProfile';
import { IAddBranchRequest } from '../interface/myProfile/IAddBranchRequest';
import { IAddBranchResponse } from '../interface/myProfile/IAddbranchResponse';
import { IGetBranchsResponse } from '../interface/myProfile/IGetBranchResponse';

export function* addBranchSaga(action: PayloadAction<IAddBranchRequest>) {
    console.log('addBranchSaga--action--', JSON.stringify(action));
    try {
        const response: IAddBranchResponse = yield call(MyProfileService.AddBranchchService, action.payload);
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

export function* watcherMyprofileSaga() {
    yield takeLatest(addBranchRequest.type, addBranchSaga);
    yield takeLatest(getBranchsRequest.type, getBranchSaga);
}