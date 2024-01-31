import {takeLatest, put, call, takeEvery} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as SettingService from '../service/SettingService';
import { IAddFooterContentRequest } from '../interface/setting/packerProfile/footerContent/IAddFooterContentRequest';
import { IAddFooterContentResponse } from '../interface/setting/packerProfile/footerContent/IAddFooterContentResponse';
import { addContactFailure, addContactRequest, addContactSuccess, addDocumentFailure, addDocumentRequest, addDocumentSuccess, addFooterContentFailure, addFooterContentRequest, addFooterContentSuccess, addPaymentMethodFailure, addPaymentMethodRequest, addPaymentMethodSuccess, deleteContactFailure, deleteContactRequest, deleteContactSuccess, deleteFooterContentFailure, deleteFooterContentRequest, deleteFooterContentSuccess, getContactsFailure, getContactsRequest, getContactsSuccess, getDocumentsFailure, getDocumentsRequest, getDocumentsSuccess, getFooterContentsFailure, getFooterContentsRequest, getFooterContentsSuccess, getPaymentMethodsFailure, getPaymentMethodsRequest, getPaymentMethodsSuccess, getSubmodulesFailure, getSubmodulesRequest, getSubmodulesSuccess, getUnitTypeFailure, getUnitTypeRequest, getUnitTypeSuccess } from '../redux/slices/ProfileSettingSlice';
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
import { createSerialNoFailure, createSerialNoRequest, createSerialNoSuccess, getSerialNoFailure, getSerialNoRequest, getSerialNoSuccess } from '../redux/slices/SerialNoSettingSlice';
import { IGetModulesResponse } from '../interface/setting/role/IModule';
import { IGetUnitTypeResponse } from '../interface/setting/unitType/IGetunitTypeResponse';
import { ISaveDocumentTemplateIdPayload, ISaveDocumentTemplateIdResponse, ISavedDocumentTemplateIdResponse, ITemplateListResponse } from '../interface/setting/template/template';
import { getSavedDocumentTemplateIdListFailure, getSavedDocumentTemplateIdListRequest, getSavedDocumentTemplateIdListSuccess, getTemplateListFailure, getTemplateListRequest, getTemplateListSuccess, saveDocumentTemplateIdFailure, saveDocumentTemplateIdRequest, saveDocumentTemplateIdSuccess } from '../redux/slices/TemplateSettingSlice';
import { ICreateSerialNoRequest, ICreateSerialNoResponse, IGetSerialNoRequest, IGetSerialNoResponse } from '../interface/setting/serialNo/serialNo';
import { IDeleteContactResponse, IDeleteFooterContentResponse } from '../interface/setting/packerProfile/contact';

export function* addFooterContentSaga(action: PayloadAction<IAddFooterContentRequest>) {
    try {
        const response: IAddFooterContentResponse = yield call(SettingService.AddFooterContentService, action.payload);
        yield put(addFooterContentSuccess(response));
    } catch (error) {
        yield put(addFooterContentFailure(JSON.stringify(error)));
    }
}

export function* getFooterContentsSaga(action: PayloadAction<string>) {
    try {
        const response: IGetFooterContentsResponse = yield call(SettingService.GetFooterContentsService, action.payload);
        yield put(getFooterContentsSuccess(response));
    } catch (error) {
        yield put(getFooterContentsFailure(JSON.stringify(error)));
    }
}

export function* deleteFooterContentSaga(action: PayloadAction<string>) {
    try {
        const response: IDeleteFooterContentResponse = yield call(SettingService.DeleteFooterContentService, action.payload);
        yield put(deleteFooterContentSuccess(response));
    } catch (error) {
        yield put(deleteFooterContentFailure(JSON.stringify(error)));
    }
}


//payemntMethod
export function* addPaymentMethodSaga(action: PayloadAction<IAddPaymentMethodRequest>) {
    try {
        const response: IAddPaymentMethodResponse = yield call(SettingService.AddPaymentMethodService, action.payload);
        yield put(addPaymentMethodSuccess(response));
    } catch (error) {
        yield put(addPaymentMethodFailure(JSON.stringify(error)));
    }
}

export function* getPaymentMethodSaga(action: PayloadAction<IAddPaymentMethodRequest>) {
    try {
        const response: IGetPaymentMethodsResponse = yield call(SettingService.GetPaymentMethodService, action.payload);
        yield put(getPaymentMethodsSuccess(response));
    } catch (error) {
        yield put(getPaymentMethodsFailure(JSON.stringify(error)));
    }
}

//contact detail
export function* addContactDetailSaga(action: PayloadAction<IAddContactDetailRequest>) {
    try {
        const response: IAddContactDetailResponse = yield call(SettingService.AddContactDetailService, action.payload);
        yield put(addContactSuccess(response));
    } catch (error) {
        yield put(addContactFailure(JSON.stringify(error)));
    }
}

export function* getContactDetailsSaga(action: PayloadAction<string>) {
    try {
        const response: IGetContactDetailsResponse = yield call(SettingService.GetContactDetailsService, action.payload);
        yield put(getContactsSuccess(response));
    } catch (error) {
        yield put(getContactsFailure(JSON.stringify(error)));
    }
}

export function* deleteContactDetailSaga(action: PayloadAction<string>) {
    try {
        const response: IDeleteContactResponse = yield call(SettingService.DeleteContactDetailService, action.payload);
        yield put(deleteContactSuccess(response));
    } catch (error) {
        yield put(deleteContactFailure(JSON.stringify(error)));
    }
}

export function* addCompanyDocumentSaga(action: PayloadAction<IAddDocumentRequest>) {
    try {
        const response: IAddDocumentResponse = yield call(SettingService.AddCompanyDocumentService, action.payload);
        yield put(addDocumentSuccess(response));
    } catch (error) {
        yield put(addDocumentFailure(JSON.stringify(error)));
    }
}

export function* getCompanyDocumentsSaga(action: PayloadAction<string>) {
    try {
        const response: IGetDocumentsResponse = yield call(SettingService.GetCompanyDocumentsService, action.payload);
        yield put(getDocumentsSuccess(response));
    } catch (error) {
        yield put(getDocumentsFailure(JSON.stringify(error)));
    }
}

export function* addUserRoleSaga(action: PayloadAction<IAddUserRoleRequest>) {
    try {
        const response: IAddUserRoleResponse = yield call(SettingService.AddUserRoleService, action.payload);
        yield put(addUserRoleSuccess(response));
    } catch (error) {
        yield put(addUserRoleFailure(JSON.stringify(error)));
    }
}

export function* checkUsernameAvailabilitySaga(action: PayloadAction<ICheckUsernameAvailablilityRequest>) {
    try {
        const response: ICheckUsernameAvailablilityResponse = yield call(SettingService.CheckUsernameAvailabilityService, action.payload);
        yield put(checkUsernameAvailabilitySuccess(response));
    } catch (error) {
        yield put(checkUsernameAvailabilityFailure(JSON.stringify(error)));
    }
}

export function* getRoleTypesSaga(action: PayloadAction) {
    try {
        const response: IRoleTypeResponse = yield call(SettingService.GetRoleTypesService);
        yield put(getRoleTypesSuccess(response));
    } catch (error) {
        yield put(getRoleTypesFailure(JSON.stringify(error)));
    }
}

export function* getSubmodulesSaga(action: PayloadAction) {
    try {
        const response: ISubmoduleResponse = yield call(SettingService.GetSubmodulesService);
        yield put(getSubmodulesSuccess(response));
    } catch (error) {
        yield put(getSubmodulesFailure(JSON.stringify(error)));
    }
}

export function* createSerialNoSaga(action: PayloadAction<ICreateSerialNoRequest>) {
    try {
        const response: ICreateSerialNoResponse = yield call(SettingService.CreateSerialNoService, action.payload);
        yield put(createSerialNoSuccess(response));
    } catch (error) {
        yield put(createSerialNoFailure(JSON.stringify(error)));
    }
}

export function* getSerialNoSaga(action: PayloadAction<IGetSerialNoRequest>) {
    try {
        const response: IGetSerialNoResponse = yield call(SettingService.GetSerialNoService, action.payload);
        yield put(getSerialNoSuccess(response));
    } catch (error) {
        yield put(getSerialNoFailure(JSON.stringify(error)));
    }
}

export function* getModulesSaga(action: PayloadAction) {
    try {
        const response: IGetModulesResponse = yield call(SettingService.GetModulesService);
        yield put(getModulesSuccess(response));
    } catch (error) {
        yield put(getModulesFailure(JSON.stringify(error)));
    }
}

export function* getUnitTypeSaga(action: PayloadAction) {
    try {
        const response: IGetUnitTypeResponse = yield call(SettingService.GetUnitTypeService);
        yield put(getUnitTypeSuccess(response));
    } catch (error) {
        yield put(getUnitTypeFailure(JSON.stringify(error)));
    }
}

export function* getTemplateListSaga(action: PayloadAction) {
    try {
        const response: ITemplateListResponse = yield call(SettingService.GetTemplateListService);
        yield put(getTemplateListSuccess(response));
    } catch (error) {
        yield put(getTemplateListFailure(JSON.stringify(error)));
    }
}

export function* saveDocumentTemplateIdSaga(action: PayloadAction<ISaveDocumentTemplateIdPayload>) {
    try {
        const response: ISaveDocumentTemplateIdResponse = yield call(SettingService.SaveDocumentTemplateIdService, action.payload);
        yield put(saveDocumentTemplateIdSuccess(response));
    } catch (error) {
        yield put(saveDocumentTemplateIdFailure(JSON.stringify(error)));
    }
}

export function* getSavedDocumentTemplateIdListSaga(action: PayloadAction<string>) {
    try {
        const response: ISavedDocumentTemplateIdResponse = yield call(SettingService.GetSavedTemplateIdListService, action.payload);
        yield put(getSavedDocumentTemplateIdListSuccess(response));
    } catch (error) {
        yield put(getSavedDocumentTemplateIdListFailure(JSON.stringify(error)));
    }
}

export function* watcherSettingSaga() {
    yield takeLatest(addFooterContentRequest.type, addFooterContentSaga);
    yield takeLatest(getFooterContentsRequest.type, getFooterContentsSaga);
    yield takeLatest(deleteFooterContentRequest.type, deleteFooterContentSaga);
    yield takeLatest(addPaymentMethodRequest.type, addPaymentMethodSaga);
    yield takeLatest(getPaymentMethodsRequest.type, getPaymentMethodSaga);
    yield takeLatest(addContactRequest.type, addContactDetailSaga);
    yield takeLatest(deleteContactRequest.type, deleteContactDetailSaga);
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
    yield takeLatest(getUnitTypeRequest.type, getUnitTypeSaga);
    yield takeLatest(getTemplateListRequest.type, getTemplateListSaga);
    yield takeEvery(saveDocumentTemplateIdRequest.type, saveDocumentTemplateIdSaga);
    yield takeLatest(getSavedDocumentTemplateIdListRequest.type, getSavedDocumentTemplateIdListSaga);
}