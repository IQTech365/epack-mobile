import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as OrderService from '../service/OrderService';
import { addOrderFailure, addOrderRequest, addOrderSuccess } from '../redux/slices/OrderSlice';
import { IAddOrderRequest } from '../interface/order/IAddOrderRequest';
import { IAddOrderResponse } from '../interface/order/IAddOrderResponse';

export function* addOrderSaga(action: PayloadAction<IAddOrderRequest>) {
    console.log('addOrderSaga--action--', JSON.stringify(action));
    try {
        const response: IAddOrderResponse = yield call(OrderService.AddOrderService, action.payload);
        console.log('addOrderSaga-response----', JSON.stringify(response));
        yield put(addOrderSuccess(response));
    } catch (error) {
        console.log('addOrderSaga-error----', error);
        yield put(addOrderFailure(error));
    }
}

// export function* verifyOtpSaga(action: PayloadAction<IOtpVerifyRequest>) {
//     try {
//         const response: IOtpVerifyResponse = yield call(OtpService.VerifyOtpService, action.payload);
//         console.log('verifyOtpSaga-response----', JSON.stringify(response));
//         yield put(verifyOtpSuccess(response));
//     } catch (error) {
//         console.log('verifyOtpSaga-error----', JSON.stringify(error));
//         yield put(verifyOtpFailure(error));
//     }
// }

export function* watcherOrderSaga() {
    yield takeLatest(addOrderRequest.type, addOrderSaga);
    // yield takeLatest(verifyOtpRequest.type, verifyOtpSaga);
}