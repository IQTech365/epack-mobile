import {all, fork} from 'redux-saga/effects';
//watcher Sagas
import { watcherOtpSaga } from './OtpSaga';

export function* rootSaga() {
    yield all([
        fork(watcherOtpSaga),
    ])
}