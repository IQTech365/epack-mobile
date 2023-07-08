import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

//Root Saga
import {rootSaga} from '../sagas';

//Slices
import SigninSlice from './slices/SigninSlice';
import SignupSlice from './slices/SignupSlice';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
    reducer: {
        Signin: SigninSlice,
        Signup: SignupSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(middleware);
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);
