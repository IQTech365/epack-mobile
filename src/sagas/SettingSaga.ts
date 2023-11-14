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
import { addContactFailure, addContactRequest, addContactSuccess, addDocumentFailure, addDocumentRequest, addDocumentSuccess, addFooterContentFailure, addFooterContentRequest, addFooterContentSuccess, addPaymentMethodFailure, addPaymentMethodRequest, addPaymentMethodSuccess, getContactsFailure, getContactsRequest, getContactsSuccess, getDocumentsFailure, getDocumentsRequest, getDocumentsSuccess, getFooterContentsFailure, getFooterContentsRequest, getFooterContentsSuccess, getPaymentMethodsFailure, getPaymentMethodsRequest, getPaymentMethodsSuccess, getSubmodulesFailure, getSubmodulesRequest, getSubmodulesSuccess } from '../redux/slices/ProfileSettingSlice';
import { IGetFooterContentsResponse } from '../interface/setting/packerProfile/footerContent/IGetFooterContentsResponse';
import { IAddPaymentMethodRequest } from '../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodRequest';
import { IAddPaymentMethodResponse } from '../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodResponse';
import { IGetPaymentMethodsResponse } from '../interface/setting/packerProfile/paymentMethod/IGetPaymentMethodsResponse';
import { IAddContactDetailRequest } from '../interface/setting/packerProfile/contactDetail/IAddContactDetailRequest';
import { IAddContactDetailResponse } from '../interface/setting/packerProfile/contactDetail/IAddContactDetailResponse';
import { IGetContactDetailsResponse } from '../interface/setting/packerProfile/contactDetail/IGetContactDetailsResponse';
import { IAddDocumentRequest } from '../interface/setting/packerProfile/document/IAddDocumentRequest';
import { IAddDocumentResponse } from '../interface/setting/packerProfile/document/IAddDocumentResponse';
import { IGetDocumentsResponse } from '../interface/setting/packerProfile/document/IGetDocumentsResponse';
import { IAddUserRoleRequest, IAddUserRoleResponse, IRoleTypeResponse } from '../interface/setting/role/IUserRole';
import { addUserRoleFailure, addUserRoleRequest, addUserRoleSuccess, checkUsernameAvailabilityFailure, checkUsernameAvailabilityRequest, checkUsernameAvailabilitySuccess, getModulesFailure, getModulesRequest, getModulesSuccess, getRoleTypesFailure, getRoleTypesRequest, getRoleTypesSuccess } from '../redux/slices/UserRoleManagementSlice';
import { ISubmoduleResponse } from '../interface/setting/packerProfile/ISubmodule';
import { ICheckUsernameAvailablilityRequest, ICheckUsernameAvailablilityResponse } from '../interface/setting/role/ICheckUsername';
import { ICreateSerialNoRequest } from '../interface/setting/serialNo/ICreateSerialNoRequest';
import { ICreateSerialNoResponse } from '../interface/setting/serialNo/ICreateSerialNoResponse';
import { createSerialNoFailure, createSerialNoRequest, createSerialNoSuccess, getSerialNoFailure, getSerialNoRequest, getSerialNoSuccess } from '../redux/slices/SerialNoSettingSlice';
import { IGetModulesResponse } from '../interface/setting/role/IModule';

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

// export function* verifyOtpSaga(action: PayloadAction<IOtpVerifyRequest>) {
//     console.log('verifyOtpSaga--action--', JSON.stringify(action));
//     try {
//         const response: IOtpVerifyResponse = yield call(SettingService.VerifyOtpService, action.payload);
//         console.log('verifyOtpSaga-response----', JSON.stringify(response));
//         yield put(verifyOtpSuccess(response));
//     } catch (error) {
//         console.log('verifyOtpSaga-error----', JSON.stringify(error));
//         yield put(verifyOtpFailure(error));
//     }
// }

//payemntMethod
export function* addPaymentMethodSaga(action: PayloadAction<IAddPaymentMethodRequest>) {
    console.log('addPaymentmethodSaga--action--', JSON.stringify(action));
    try {
        const response: IAddPaymentMethodResponse = yield call(SettingService.AddPaymentMethodService, action.payload);
        console.log('addPaymentmethodSaga-response----', JSON.stringify(response));
        yield put(addPaymentMethodSuccess(response));
    } catch (error) {
        console.log('addPaymentmethodSaga-error----', error);
        yield put(addPaymentMethodFailure(JSON.stringify(error)));
    }
}

export function* getPaymentMethodSaga(action: PayloadAction<IAddPaymentMethodRequest>) {
    console.log('getPaymentMethodSaga--action--', JSON.stringify(action));
    try {
        const response: IGetPaymentMethodsResponse = yield call(SettingService.GetPaymentMethodService, action.payload);
        console.log('getPaymentMethodSaga-response----', JSON.stringify(response));
        yield put(getPaymentMethodsSuccess(response));
    } catch (error) {
        console.log('getPaymentMethodSaga-error----', error);
        yield put(getPaymentMethodsFailure(JSON.stringify(error)));
    }
}

//contact detail
export function* addContactDetailSaga(action: PayloadAction<IAddContactDetailRequest>) {
    console.log('addContactDetailSaga--action--', JSON.stringify(action));
    try {
        const response: IAddContactDetailResponse = yield call(SettingService.AddContactDetailService, action.payload);
        console.log('addContactDetailSaga-response----', JSON.stringify(response));
        yield put(addContactSuccess(response));
    } catch (error) {
        console.log('addContactDetailSaga-error----', error);
        yield put(addContactFailure(JSON.stringify(error)));
    }
}

export function* getContactDetailsSaga(action: PayloadAction<string>) {
    console.log('getContactDetailsSaga--action--', JSON.stringify(action));
    try {
        const response: IGetContactDetailsResponse = yield call(SettingService.GetContactDetailsService, action.payload);
        console.log('getContactDetailsSaga-response----', JSON.stringify(response));
        yield put(getContactsSuccess(response));
    } catch (error) {
        console.log('getContactDetailsSaga-error----', error);
        yield put(getContactsFailure(JSON.stringify(error)));
    }
}

export function* addCompanyDocumentSaga(action: PayloadAction<IAddDocumentRequest>) {
    console.log('addCompanyDocumentSaga--action--', JSON.stringify(action));
    try {
        const response: IAddDocumentResponse = yield call(SettingService.AddCompanyDocumentService, action.payload);
        console.log('addCompanyDocumentSaga-response----', JSON.stringify(response));
        yield put(addDocumentSuccess(response));
    } catch (error) {
        console.log('addCompanyDocumentSaga-error----', error);
        yield put(addDocumentFailure(JSON.stringify(error)));
    }
}

export function* getCompanyDocumentsSaga(action: PayloadAction<string>) {
    console.log('getCompanyDocumentsSaga--action--', JSON.stringify(action));
    try {
        const response: IGetDocumentsResponse = yield call(SettingService.GetCompanyDocumentsService, action.payload);
        console.log('getCompanyDocumentsSaga-response----', JSON.stringify(response));
        yield put(getDocumentsSuccess(response));
    } catch (error) {
        console.log('getCompanyDocumentsSaga-error----', error);
        yield put(getDocumentsFailure(JSON.stringify(error)));
    }
}

export function* addUserRoleSaga(action: PayloadAction<IAddUserRoleRequest>) {
    try {
        const response: IAddUserRoleResponse = yield call(SettingService.AddUserRoleService, action.payload);
        console.log('addUserRoleSaga-response----', JSON.stringify(response));
        yield put(addUserRoleSuccess(response));
    } catch (error) {
        console.log('addUserRoleSaga-error----', error);
        yield put(addUserRoleFailure(JSON.stringify(error)));
    }
}

export function* checkUsernameAvailabilitySaga(action: PayloadAction<ICheckUsernameAvailablilityRequest>) {
    try {
        const response: ICheckUsernameAvailablilityResponse = yield call(SettingService.CheckUsernameAvailabilityService, action.payload);
        console.log('checkUsernameAvailabilitySaga-response----', JSON.stringify(response));
        yield put(checkUsernameAvailabilitySuccess(response));
    } catch (error) {
        console.log('checkUsernameAvailabilitySaga-error----', error);
        yield put(checkUsernameAvailabilityFailure(JSON.stringify(error)));
    }
}

export function* getRoleTypesSaga(action: PayloadAction) {
    try {
        const response: IRoleTypeResponse = yield call(SettingService.GetRoleTypesService);
        console.log('getRoleTypesSaga-response----', JSON.stringify(response));
        yield put(getRoleTypesSuccess(response));
    } catch (error) {
        console.log('getRoleTypesSaga-error----', error);
        yield put(getRoleTypesFailure(JSON.stringify(error)));
    }
}

export function* getSubmodulesSaga(action: PayloadAction) {
    try {
        const response: ISubmoduleResponse = yield call(SettingService.GetSubmodulesService);
        console.log('getSubmodulesSaga-response----', JSON.stringify(response));
        yield put(getSubmodulesSuccess(response));
    } catch (error) {
        console.log('getSubmodulesSaga-error----', error);
        yield put(getSubmodulesFailure(JSON.stringify(error)));
    }
}

export function* createSerialNoSaga(action: PayloadAction<ICreateSerialNoRequest>) {
    try {
        const response: ICreateSerialNoResponse = yield call(SettingService.CreateSerialNoService, action.payload);
        console.log('createSerialNoSaga-response----', JSON.stringify(response));
        yield put(createSerialNoSuccess(response));
    } catch (error) {
        console.log('createSerialNoSaga-error----', error);
        yield put(createSerialNoFailure(JSON.stringify(error)));
    }
}

export function* getSerialNoSaga(action: PayloadAction<string>) {
    try {
        const response: IGetPaymentMethodsResponse = yield call(SettingService.GetSerialNoService, action.payload);
        console.log('getSerialNoSaga-response----', JSON.stringify(response));
        yield put(getSerialNoSuccess(response));
    } catch (error) {
        console.log('getSerialNoSaga-error----', error);
        yield put(getSerialNoFailure(JSON.stringify(error)));
    }
}

export function* getModulesSaga(action: PayloadAction) {
    try {
        const response: IGetModulesResponse = yield call(SettingService.GetModulesService);
        console.log('getModulesSaga-response----', JSON.stringify(response));
        yield put(getModulesSuccess(response));
    } catch (error) {
        console.log('getModulesSaga-error----', error);
        yield put(getModulesFailure(JSON.stringify(error)));
    }
}

export function* watcherSettingSaga() {
    yield takeLatest(addFooterContentRequest.type, addFooterContentSaga);
    yield takeLatest(getFooterContentsRequest.type, getFooterContentsSaga);
    yield takeLatest(addPaymentMethodRequest.type, addPaymentMethodSaga);
    yield takeLatest(getPaymentMethodsRequest.type, getPaymentMethodSaga);
    yield takeLatest(addContactRequest.type, addContactDetailSaga);
    yield takeLatest(getContactsRequest.type, getContactDetailsSaga);
    yield takeLatest(addDocumentRequest.type, addCompanyDocumentSaga);
    yield takeLatest(getDocumentsRequest.type, getCompanyDocumentsSaga);
    yield takeLatest(addUserRoleRequest.type, addUserRoleSaga);
    yield takeLatest(getRoleTypesRequest.type, getRoleTypesSaga);
    yield takeLatest(getSubmodulesRequest.type, getSubmodulesSaga);
    yield takeLatest(checkUsernameAvailabilityRequest.type, checkUsernameAvailabilitySaga);
    yield takeLatest(createSerialNoRequest.type, createSerialNoSaga);
    yield takeLatest(getModulesRequest.type, getModulesSaga);
    yield takeLatest(getSerialNoRequest.type, getSerialNoSaga);
}