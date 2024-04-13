import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as CommonService from '../service/CommonService';
import {IOtpGetRequest} from '../interface/otp/IOtpGetRequest';
import {
  IAppSettingResponse,
  ICustomersRequest,
  ICustomersResponse,
  IDashboardPaylod,
  IPackingTypeResponse,
  ISubmoduleResponse,
  IVehicleAccessoryResponse,
  IVehicleColorResponse,
  IVehicleCompanyResponse,
  IVehicleModelResponse,
  IVehicleTypesResponse,
} from '../interface/common/common';
import {
  getAppSettingsFailure,
  getAppSettingsRequest,
  getAppSettingsSuccess,
  getBankListFailure,
  getBankListRequest,
  getBankListSuccess,
  getBannersFailure,
  getBannersRequest,
  getBannersSuccess,
  getCustomersFailure,
  getCustomersRequest,
  getCustomersSuccess,
  getDashboardDataFailure,
  getDashboardDataRequest,
  getDashboardDataSuccess,
  getFloorsFailure,
  getFloorsRequest,
  getFloorsSuccess,
  getInsurancePercentagesFailure,
  getInsurancePercentagesRequest,
  getInsurancePercentagesSuccess,
  getPackingTypesFailure,
  getPackingTypesRequest,
  getPackingTypesSuccess,
  getPendingRegisrationFailure,
  getPendingRegisrationRequest,
  getPendingRegisrationSuccess,
  getSubmoduleFailure,
  getSubmoduleRequest,
  getSubmoduleSuccess,
  getTodayFollowupsListFailure,
  getTodayFollowupsListRequest,
  getTodayFollowupsListSuccess,
  getTodayShiftingListFailure,
  getTodayShiftingListRequest,
  getTodayShiftingListSuccess,
  getTodaySurveyListFailure,
  getTodaySurveyListRequest,
  getTodaySurveyListSuccess,
  getVehicleAccessoriesFailure,
  getVehicleAccessoriesRequest,
  getVehicleAccessoriesSuccess,
  getVehicleColorFailure,
  getVehicleColorRequest,
  getVehicleColorSuccess,
  getVehicleCompanyFailure,
  getVehicleCompanyRequest,
  getVehicleCompanySuccess,
  getVehicleModelsFailure,
  getVehicleModelsRequest,
  getVehicleModelsSuccess,
  getVehicleTypesFailure,
  getVehicleTypesRequest,
  getVehicleTypesSuccess,
  imageUploadFailure,
  imageUploadRequest,
  imageUploadSuccess,
} from '../redux/slices/CommonSlice';

export function* getPackingTypesSaga(
  action: PayloadAction<Partial<IOtpGetRequest>>,
) {
  try {
    const response: IPackingTypeResponse = yield call(
      CommonService.GetPackingTypesService,
    );
    yield put(getPackingTypesSuccess(response));
  } catch (error) {
    yield put(getPackingTypesFailure(JSON.stringify(error)));
  }
}

export function* getVehicleTypesSaga(action: PayloadAction<any>) {
  try {
    const response: IVehicleTypesResponse = yield call(
      CommonService.GetVehicleTypesService,
    );
    yield put(getVehicleTypesSuccess(response));
  } catch (error) {
    yield put(getVehicleTypesFailure(JSON.stringify(error)));
  }
}

export function* getVehicleCompaniesSaga(action: PayloadAction<any>) {
  try {
    const response: IVehicleCompanyResponse = yield call(
      CommonService.GetVehicleCompaniesService,
    );
    yield put(getVehicleCompanySuccess(response));
  } catch (error) {
    yield put(getVehicleCompanyFailure(JSON.stringify(error)));
  }
}

export function* getVehicleColorsSaga(action: PayloadAction<any>) {
  try {
    const response: IVehicleColorResponse = yield call(
      CommonService.GetVehicleColorsService,
    );
    yield put(getVehicleColorSuccess(response));
  } catch (error) {
    yield put(getVehicleColorFailure(JSON.stringify(error)));
  }
}

export function* getVehicleAccessoriesSaga(action: PayloadAction<any>) {
  try {
    const response: IVehicleAccessoryResponse = yield call(
      CommonService.GetVehicleAccessoriesService,
    );
    yield put(getVehicleAccessoriesSuccess(response));
  } catch (error) {
    yield put(getVehicleAccessoriesFailure(JSON.stringify(error)));
  }
}

export function* getVehicleModelsSaga(action: PayloadAction<any>) {
  try {
    const response: IVehicleModelResponse = yield call(
      CommonService.GetVehicleModelsService,
    );
    yield put(getVehicleModelsSuccess(response));
  } catch (error) {
    yield put(getVehicleModelsFailure(JSON.stringify(error)));
  }
}

export function* getSubmodulesSaga(action: PayloadAction<any>) {
  try {
    const response: ISubmoduleResponse = yield call(
      CommonService.GetSubmodulesService,
    );
    yield put(getSubmoduleSuccess(response));
  } catch (error) {
    yield put(getSubmoduleFailure(JSON.stringify(error)));
  }
}

export function* getAppSettingsSaga(action: PayloadAction<string>) {
  try {
    const response: IAppSettingResponse = yield call(
      CommonService.GetAppSettingsService,
      action.payload,
    );

    yield put(getAppSettingsSuccess(response));
  } catch (error) {
    yield put(getAppSettingsFailure(JSON.stringify(error)));
  }
}

export function* getCustomersSaga(action: PayloadAction<ICustomersRequest>) {
  try {
    const response: ICustomersResponse = yield call(
      CommonService.GetCustomersService,
      action.payload,
    );
    yield put(getCustomersSuccess(response));
  } catch (error) {
    yield put(getCustomersFailure(JSON.stringify(error)));
  }
}

export function* imageUploadSaga(action: PayloadAction<any>) {
  try {
    //@ts-ignore
    const response: any = yield call(
      CommonService.ImageUploadService,
      action.payload,
    );
    yield put(imageUploadSuccess(response));
  } catch (error) {
    yield put(imageUploadFailure(error));
  }
}

export function* getBannersSaga(action: PayloadAction<any>) {
  try {
    //@ts-ignore
    const response: any = yield call(CommonService.GetBannersService);
    yield put(getBannersSuccess(response));
  } catch (error) {
    yield put(getBannersFailure(error));
  }
}

export function* getDashboardSaga(action: PayloadAction<IDashboardPaylod>) {
  try {
    //@ts-ignore
    const response: any = yield call(
      CommonService.GetDashboardService,
      action.payload,
    );
    yield put(getDashboardDataSuccess(response));
  } catch (error) {
    yield put(getDashboardDataFailure(error));
  }
}

export function* getInsurancePercentageListSaga(action: PayloadAction<any>) {
  try {
    //@ts-ignore
    const response: any = yield call(
      CommonService.GetInsurancePercentageListService,
    );
    yield put(getInsurancePercentagesSuccess(response));
  } catch (error) {
    yield put(getInsurancePercentagesFailure(error));
  }
}

export function* getFloorListSaga(action: PayloadAction<any>) {
  try {
    //@ts-ignore
    const response: any = yield call(CommonService.GetFloorListService);
    yield put(getFloorsSuccess(response));
  } catch (error) {
    yield put(getFloorsFailure(error));
  }
}

export function* getPendingRegistrationSaga(action: PayloadAction<string>) {
  try {
    //@ts-ignore
    const response: any = yield call(
      CommonService.GetPendingRegistrationService,
      action.payload,
    );
    yield put(getPendingRegisrationSuccess(response));
  } catch (error) {
    yield put(getPendingRegisrationFailure(error));
  }
}

export function* getBankListSaga(action: PayloadAction<string>) {
  try {
    //@ts-ignore
    const response: any = yield call(CommonService.GetBankListService);
    yield put(getBankListSuccess(response));
  } catch (error) {
    yield put(getBankListFailure(error));
  }
}
export function* getTodayFollowupsSaga(action: PayloadAction<string>) {
  try {
    //@ts-ignore
    const response: any = yield call(
      CommonService.GetTodayFollowups,
      action.payload,
    );
    yield put(getTodayFollowupsListSuccess(response));
  } catch (error) {
    yield put(getTodayFollowupsListFailure(error));
  }
}

export function* getTodaySurveySaga(action: PayloadAction<string>) {
  try {
    //@ts-ignore
    const response: any = yield call(
      CommonService.GetTodaySurvey,
      action.payload,
    );
    yield put(getTodaySurveyListSuccess(response));
  } catch (error) {
    yield put(getTodaySurveyListFailure(error));
  }
}

export function* getTodayShiftingSaga(action: PayloadAction<string>) {
  try {
    //@ts-ignore
    const response: any = yield call(
      CommonService.GetTodayShiftings,
      action.payload,
    );
    yield put(getTodayShiftingListSuccess(response));
  } catch (error) {
    yield put(getTodayShiftingListFailure(error));
  }
}

export function* watcherCommonSaga() {
  yield takeLatest(getPackingTypesRequest.type, getPackingTypesSaga);
  yield takeLatest(getVehicleTypesRequest.type, getVehicleTypesSaga);
  yield takeLatest(getVehicleCompanyRequest.type, getVehicleCompaniesSaga);
  yield takeLatest(getVehicleColorRequest.type, getVehicleColorsSaga);
  yield takeLatest(
    getVehicleAccessoriesRequest.type,
    getVehicleAccessoriesSaga,
  );
  yield takeLatest(getVehicleModelsRequest.type, getVehicleModelsSaga);
  yield takeLatest(getSubmoduleRequest.type, getSubmodulesSaga);
  yield takeLatest(getAppSettingsRequest.type, getAppSettingsSaga);
  yield takeLatest(getCustomersRequest.type, getCustomersSaga);
  yield takeLatest(imageUploadRequest.type, imageUploadSaga);
  yield takeLatest(getBannersRequest.type, getBannersSaga);
  yield takeLatest(getDashboardDataRequest.type, getDashboardSaga);
  yield takeLatest(
    getInsurancePercentagesRequest.type,
    getInsurancePercentageListSaga,
  );
  yield takeLatest(getFloorsRequest.type, getFloorListSaga);
  yield takeLatest(
    getPendingRegisrationRequest.type,
    getPendingRegistrationSaga,
  );
  yield takeLatest(getBankListRequest.type, getBankListSaga);
  yield takeLatest(getTodayFollowupsListRequest.type, getTodayFollowupsSaga);
  yield takeLatest(getTodaySurveyListRequest.type, getTodaySurveySaga);
  yield takeLatest(getTodayShiftingListRequest.type, getTodayShiftingSaga);
}
