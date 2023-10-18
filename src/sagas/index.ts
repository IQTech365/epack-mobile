import {all, fork} from 'redux-saga/effects';
//watcher Sagas
import {watcherOtpSaga} from './OtpSaga';
import {watcherCompanySaga} from './CompanySaga';
import {watcherEnquirySaga} from './EnquirySaga';
import {watcherOrderSaga} from './OrderSaga';
import { watcherQuotationSaga } from './QuotationSaga';
import { watcherSettingSaga } from './SettingSaga';

export function* rootSaga() {
  yield all([
    fork(watcherOtpSaga),
    fork(watcherCompanySaga),
    fork(watcherEnquirySaga),
    fork(watcherOrderSaga),
    fork(watcherQuotationSaga),
    fork(watcherSettingSaga),
  ]);
}
