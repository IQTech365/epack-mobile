import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

//Root Saga
import {rootSaga} from '../sagas';

//Slices
import OtpSlice from './slices/OtpSlice';
import SignupSlice from './slices/SignupSlice';
import CompanySlice from './slices/CompanySlice';
import EnquirySlice from './slices/EnquirySlice';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
    reducer: {
        OTP: OtpSlice,
        Signup: SignupSlice,
        Company: CompanySlice,
        Enquiry: EnquirySlice,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(middleware);
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);
