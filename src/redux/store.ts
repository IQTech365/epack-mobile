import {configureStore, AnyAction, Reducer} from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import {persistReducer, persistStore} from 'redux-persist';
import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Root Saga
import {rootSaga} from '../sagas';

//Slices
import OtpSlice from './slices/OtpSlice';
import SignupSlice from './slices/SignupSlice';
import CompanySlice from './slices/CompanySlice';
import EnquirySlice from './slices/EnquirySlice';
import OrderSlice from './slices/OrderSlice';
import QuotationSlice from './slices/QuotationSlice';
import ProfileSettingSlice from './slices/ProfileSettingSlice';
import { removeIsRegistrationComplete, removeLoginStatus, removeToken } from '../utils/storage';
import SNSettingSlice from './slices/SerialNoSettingSlice';
import  MyProfileSlice  from './slices/MyProfile';
import UserRoleManagementSlice from './slices/UserRoleManagementSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const appReducer = combineReducers({
  OTP: OtpSlice,
  Signup: SignupSlice,
  Company: CompanySlice,
  Enquiry: EnquirySlice,
  Order: OrderSlice,
  Quotation: QuotationSlice,
  Setting: ProfileSettingSlice,
  SNSetting: SNSettingSlice,
  Myprofile: MyProfileSlice,
  UserRole: UserRoleManagementSlice,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'OtpSlice/logout') {
    AsyncStorage.removeItem('persist:root');
    removeLoginStatus();
    removeToken();
    removeIsRegistrationComplete();
    state = {} as RootState;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

sagaMiddleware.run(rootSaga);
