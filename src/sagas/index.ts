import {all, fork} from 'redux-saga/effects';
//watcher Sagas
import {watcherOtpSaga} from './OtpSaga';
import {watcherCompanySaga} from './CompanySaga';
import {watcherEnquirySaga} from './EnquirySaga';
import {watcherOrderSaga} from './OrderSaga';
import { watcherQuotationSaga } from './QuotationSaga';
import { watcherSettingSaga } from './SettingSaga';
import { watcherMyprofileSaga } from './MyprofileSaga';
import { watcherVehicleSaga } from './VehicleSaga';
import {watcherCommonSaga} from './CommonSaga';

export function* rootSaga() {
  yield all([
    fork(watcherOtpSaga),
    fork(watcherCompanySaga),
    fork(watcherEnquirySaga),
    fork(watcherOrderSaga),
    fork(watcherQuotationSaga),
    fork(watcherSettingSaga),
    fork(watcherMyprofileSaga),
    fork(watcherVehicleSaga),
    fork(watcherCommonSaga),
  ]);
}
