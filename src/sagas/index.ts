import {all, fork} from 'redux-saga/effects';
//watcher Sagas
import { watcherOtpSaga } from './OtpSaga';
import { watcherSignupSaga } from './SignupSaga';

export function* rootSaga() {
    yield all([
        fork(watcherOtpSaga),
        fork(watcherSignupSaga),
    ])
}