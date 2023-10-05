import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

//Root Saga
import {rootSaga} from '../sagas';

//Slices
import OtpSlice from './slices/OtpSlice';
import SignupSlice from './slices/SignupSlice';
import CompanySlice from './slices/CompanySlice';
import EnquirySlice from './slices/EnquirySlice';
import OrderSlice from './slices/OrderSlice';
import QuotationSlice from './slices/QuotationSlice';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    OTP: OtpSlice,
    Signup: SignupSlice,
    Company: CompanySlice,
    Enquiry: EnquirySlice,
    Order: OrderSlice,
    Quotation: QuotationSlice,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);
