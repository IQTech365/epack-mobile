import {all, fork} from 'redux-saga/effects';
//watcher Sagas
import { watcherSigninSaga } from './SigninSaga';
import { watcherSignupSaga } from './SignupSaga';

export function* rootSaga() {
    yield all([
        fork(watcherSigninSaga),
        fork(watcherSignupSaga),
    ])
}