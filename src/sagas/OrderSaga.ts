import {takeLatest, put, call} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import * as OrderService from '../service/OrderService';
import {
  addOrderFailure,
  addOrderRequest,
  addOrderSuccess,
  createBiltyFailure,
  createBiltyRequest,
  createBiltySuccess,
  createCarConditionFailure,
  createCarConditionRequest,
  createCarConditionSuccess,
  createInvoiceFailure,
  createInvoiceRequest,
  createInvoiceSuccess,
  createMoneyReceiptFailure,
  createMoneyReceiptRequest,
  createMoneyReceiptSuccess,
  createNocDocFailure,
  createNocDocRequest,
  createNocDocSuccess,
  createPackingMaterialsFailure,
  createPackingMaterialsRequest,
  createPackingMaterialsSuccess,
  deletePackingMaterialItemFailure,
  deletePackingMaterialItemRequest,
  deletePackingMaterialItemSuccess,
  editMoneyReceiptListFailure,
  editMoneyReceiptListRequest,
  editMoneyReceiptListSuccess,
  getApprovedOrdersFailure,
  getApprovedOrdersRequest,
  getApprovedOrdersSuccess,
  getBiltyHtmlFailure,
  getBiltyHtmlRequest,
  getBiltyHtmlSuccess,
  getBiltyListFailure,
  getBiltyListRequest,
  getBiltyListSuccess,
  getCarConditionHtmlFailure,
  getCarConditionHtmlRequest,
  getCarConditionHtmlSuccess,
  getCarConditionListFailure,
  getCarConditionListRequest,
  getCarConditionListSuccess,
  getInvoiceHtmlFailure,
  getInvoiceHtmlRequest,
  getInvoiceHtmlSuccess,
  getInvoiceListFailure,
  getInvoiceListRequest,
  getInvoiceListSuccess,
  getMoneyReceiptHtmlFailure,
  getMoneyReceiptHtmlRequest,
  getMoneyReceiptHtmlSuccess,
  getMoneyReceiptListFailure,
  getMoneyReceiptListRequest,
  getMoneyReceiptListSuccess,
  getNocDocFailure,
  getNocDocRequest,
  getNocDocSuccess,
  getNocFormTemplateFailure,
  getNocFormTemplateRequest,
  getNocFormTemplateSuccess,
  getOrderFailure,
  getOrderRequest,
  getOrderSuccess,
  getOrdersFailure,
  getOrdersRequest,
  getOrdersSuccess,
  getPackingListTemplateFailure,
  getPackingListTemplateRequest,
  getPackingListTemplateSuccess,
  getPackingMaterialsFailure,
  getPackingMaterialsRequest,
  getPackingMaterialsSuccess,
  updateBiltyFailure,
  updateBiltyRequest,
  updateBiltySuccess,
  updateCarConditionFailure,
  updateCarConditionRequest,
  updateCarConditionSuccess,
  updateInvoiceFailure,
  updateInvoiceRequest,
  updateInvoiceSuccess,
  updateNocFormRequest,
  updateNocFormSuccess,
  updatePackingListFailure,
  updatePackingListRequest,
  updatePackingListSuccess,
} from '../redux/slices/OrderSlice';
import {IAddOrderRequest} from '../interface/order/IAddOrderRequest';
import {IAddOrderResponse} from '../interface/order/IAddOrderResponse';
import {ICreateMoneyReceiptRequest} from '../interface/order/ICreateMoneyReceiptRequest';
import {ICreateMoneyReceiptResponse} from '../interface/order/ICreateMoneyReceiptResponse';
import { ICreateCarConditionRequest } from '../interface/order/ICreateCarConditionRequest';
import { ICreateBiltyRequest } from '../interface/order/ICreateBiltyRequest';
import { ICreateBiltyResponse, IUpdateBiltyResponse } from '../interface/order/ICreateBiltyResponse';
import { IGetOrdersResponse } from '../interface/order/IGetOrdersResponse';
import { IGetMoneyReceiptsResponse } from '../interface/order/IGetMoneyReceiptsResponse';
import { IGetCarConditionListResponse } from '../interface/order/IGetCarConditionListResponse';
import { IGetBiltyListResponse, IUpdateBiltyPayload } from '../interface/order/IGetBiltyListResponse';
import { IGetOrdersRequest } from '../interface/order/IGetOrdersRequest';
import { ISingleOrderRequest } from '../interface/order/ISingleOrderRequest';
import { ISingleEnquiryResponse } from '../interface/enquiry/ISingleEnquiryResponse';
import { IHtmlTemplateRequest, IHtmlTemplateResponse } from '../interface/order/templates/ITemplateResponse';
import {  ICreatePackingMaterialRequest, ICreatePackingMaterialResponse, IDeletePackingListItemResponse, IGetPackingListRequest, IPackingListResponse, IUpdatePackingListRequest, IUpdatePackingListResponse } from '../interface/order/IPackingMaterialResponse';
import { ICreateInvoiceRequest } from '../interface/order/ICreateInvoiceRequest';
import { ICreateInvoiceResponse } from '../interface/order/ICreateInvoiceResponse';
import { IGetInvoiceListResponse } from '../interface/order/IGetInvoiceListResponse';
import { IPackingListTemplatePayload, IPackingListTemplateResponse } from '../interface/order/IPackingListTemplate';
import { IUpdateInvoicePayload, IUpdateInvoiceResponse } from '../interface/order/IUpdateInvoiceResponse';
import { IUpdateCarConditionPayload, IUpdateCarConditionResponse } from '../interface/order/IUpdateCarConditionResponse';
import { IGetNocListResponse, INocFormTemplatePayload, INocPayload, INocTemplateResponse, IUpdateNocFormPayloadRequest, IUpdateNocFormResponse } from '../interface/order/IGetNocListResponse';
import { ICreateNocFormRequest } from '../interface/order/ICreateNocFormRequest';
import { ICreateNocFormResponse } from '../interface/order/ICreateNocFormResponse';

export function* addOrderSaga(action: PayloadAction<IAddOrderRequest>) {
  try {
    const response: IAddOrderResponse = yield call(
      OrderService.AddOrderService,
      action.payload,
    );
    yield put(addOrderSuccess(response));
  } catch (error) {
    yield put(addOrderFailure(error));
  }
}

export function* getOrderListSaga(action: PayloadAction<Partial<IGetOrdersRequest>>) {
  try {
      const response: IGetOrdersResponse = yield call(OrderService.GetOrdersService, action.payload);
      yield put(getOrdersSuccess(response));
  } catch (error) {
      yield put(getOrdersFailure(error));
  }
}

export function* createPackingListSaga(action: PayloadAction<ICreatePackingMaterialRequest>) {
  try {
      const response: ICreatePackingMaterialResponse = yield call(OrderService.CreatePackingListService, action.payload);
      yield put(createPackingMaterialsSuccess(response));
  } catch (error) {
      yield put(createPackingMaterialsFailure(error));
  }
}

export function* getOrderSaga(action: PayloadAction<ISingleOrderRequest>) {
  try {
      const response: ISingleEnquiryResponse = yield call(OrderService.GetOrderService, action.payload);
      yield put(getOrderSuccess(response));
  } catch (error) {
      yield put(getOrderFailure(error));
  }
}

export function* getApprovedOrderListSaga(action: PayloadAction<IGetOrdersRequest>) {
  try {
      const response: IGetOrdersResponse = yield call(OrderService.GetOrdersService, action.payload);
      yield put(getApprovedOrdersSuccess(response));
  } catch (error) {
      yield put(getApprovedOrdersFailure(error));
  }
}

export function* createMoneyReceiptSaga(
  action: PayloadAction<ICreateMoneyReceiptRequest>,
) {
  try {
    const response: ICreateMoneyReceiptResponse = yield call(
      OrderService.CreateMoneyReceiptService,
      action.payload,
    );
    yield put(createMoneyReceiptSuccess(response));
  } catch (error) {
    yield put(createMoneyReceiptFailure(error));
  }
}

export function* getMoneyReceiptListSaga(action: PayloadAction<string>) {
  try {
      const response: IGetMoneyReceiptsResponse = yield call(OrderService.GetMoneyReceiptListService, action.payload);
      yield put(getMoneyReceiptListSuccess(response));
  } catch (error) {
      yield put(getMoneyReceiptListFailure(error));
  }
}

export function* editMoneyReceiptSaga(action: PayloadAction<{id:string, requestBody:any}>) {
  const { id, requestBody } = action.payload;
  try {
      const response: IGetMoneyReceiptsResponse = yield call(OrderService.EditMoneyReceiptListService, id, requestBody);
      yield put(editMoneyReceiptListSuccess(response));
  } catch (error) {
      yield put(editMoneyReceiptListFailure(error));
  }
}

export function* createCarConditionSaga(
    action: PayloadAction<ICreateCarConditionRequest>,
  ) {
    try {
      const response: ICreateMoneyReceiptResponse = yield call(
        OrderService.CreateCarConditionService,
        action.payload,
      );
      yield put(createCarConditionSuccess(response));
    } catch (error) {
      yield put(createCarConditionFailure(error));
    }
  }

  export function* getCarConditionListSaga(action: PayloadAction<string>) {
    try {
        const response: IGetCarConditionListResponse = yield call(OrderService.GetCarConditionListService, action.payload);
        yield put(getCarConditionListSuccess(response));
    } catch (error) {
        yield put(getCarConditionListFailure(error));
    }
  }

  export function* getPackingListSaga(action: PayloadAction<IGetPackingListRequest>) {
    try {
        const response: IPackingListResponse = yield call(OrderService.GetPackingListService, action.payload);
        yield put(getPackingMaterialsSuccess(response));
    } catch (error) {
        yield put(getPackingMaterialsFailure(error));
    }
  }

  export function* getPackingListTemplateSaga(action: PayloadAction<IPackingListTemplatePayload>) {
    try {
        const response: IPackingListTemplateResponse = yield call(OrderService.GetPackingListTemplateService, action.payload);
        yield put(getPackingListTemplateSuccess(response));
    } catch (error) {
        yield put(getPackingListTemplateFailure(error));
    }
  }

  export function* deletePackingListItemSaga(action: PayloadAction<string>) {
    try {
        const response: IDeletePackingListItemResponse = yield call(OrderService.DeletePackingListItemService, action.payload);
        yield put(deletePackingMaterialItemSuccess(response));
    } catch (error) {
        yield put(deletePackingMaterialItemFailure(error));
    }
  }

  export function* createBiltySaga(
    action: PayloadAction<ICreateBiltyRequest>,
  ) {
    try {
      const response: ICreateBiltyResponse = yield call(
        OrderService.CreateBiltyService,
        action.payload,
      );
      yield put(createBiltySuccess(response));
    } catch (error) {
      yield put(createBiltyFailure(error));
    }
  }

  export function* getBiltyListSaga(action: PayloadAction<string>) {
    try {
        const response: IGetBiltyListResponse = yield call(OrderService.GetBiltyListService, action.payload);
        yield put(getBiltyListSuccess(response));
    } catch (error) {
        yield put(getBiltyListFailure(error));
    }
  }

  export function* updateBiltySaga(action: PayloadAction<IUpdateBiltyPayload>) {
    try {
        const response: IUpdateBiltyResponse = yield call(OrderService.UpdateBiltyService, action.payload);
        yield put(updateBiltySuccess(response));
    } catch (error) {
        yield put(updateBiltyFailure(error));
    }
  }

  export function* getMoneyReceiptTemplateHtmlSaga(action: PayloadAction<IHtmlTemplateRequest>) {
    try {
        const response: IHtmlTemplateResponse = yield call(OrderService.GetMoneyReceiptTemplateHtmlService, action.payload);
        yield put(getMoneyReceiptHtmlSuccess(response));
    } catch (error) {
        yield put(getMoneyReceiptHtmlFailure(error));
    }
  }

  export function* getBiltyTemplateHtmlSaga(action: PayloadAction<IHtmlTemplateRequest>) {
    try {
        const response: IHtmlTemplateResponse = yield call(OrderService.GetBiltyTemplateHtmlService, action.payload);
        yield put(getBiltyHtmlSuccess(response));
    } catch (error) {
        yield put(getBiltyHtmlFailure(error));
    }
  }

  export function* getCarConditionTemplateHtmlSaga(action: PayloadAction<IHtmlTemplateRequest>) {
    try {
        const response: IHtmlTemplateResponse = yield call(OrderService.GetCarConditionTemplateHtmlService, action.payload);
        yield put(getCarConditionHtmlSuccess(response));
    } catch (error) {
        yield put(getCarConditionHtmlFailure(error));
    }
  }

  export function* createInvoiceSaga(action: PayloadAction<ICreateInvoiceRequest>) {
    try {
        const response: ICreateInvoiceResponse = yield call(OrderService.CreateInvoiceService, action.payload);
        yield put(createInvoiceSuccess(response));
    } catch (error) {
        yield put(createInvoiceFailure(error));
    }
  }

  export function* updateInvoiceSaga(action: PayloadAction<IUpdateInvoicePayload>) {
    try {
        const response: IUpdateInvoiceResponse = yield call(OrderService.UpdateInvoiceService, action.payload);
        yield put(updateInvoiceSuccess(response));
    } catch (error) {
        yield put(updateInvoiceFailure(error));
    }
  }

  export function* getInvoiceListSaga(action: PayloadAction<string>) {
    try {
        const response: IGetInvoiceListResponse = yield call(OrderService.GetInvoiceListService, action.payload);
        yield put(getInvoiceListSuccess(response));
    } catch (error) {
        yield put(getInvoiceListFailure(error));
    }
  }

  export function* getInvoiceTemplateHtmlSaga(action: PayloadAction<IHtmlTemplateRequest>) {
    try {
        const response: IHtmlTemplateResponse = yield call(OrderService.GetInvoiceTemplateHtmlService, action.payload);
        yield put(getInvoiceHtmlSuccess(response));
    } catch (error) {
        yield put(getInvoiceHtmlFailure(error));
    }
  }

  export function* updatePackingListSaga(action: PayloadAction<IUpdatePackingListRequest>) {
    try {
        const response: IUpdatePackingListResponse = yield call(OrderService.UpdatePackingListService, action.payload);
        yield put(updatePackingListSuccess(response));
    } catch (error) {
        yield put(updatePackingListFailure(error));
    }
  }

  export function* updateCarConditionSaga(action: PayloadAction<IUpdateCarConditionPayload>) {
   
    try {
        const response: IUpdateCarConditionResponse = yield call(OrderService.UpdateCarConditionService, action.payload);
        yield put(updateCarConditionSuccess(response));
    } catch (error) {
        yield put(updateCarConditionFailure(error));
    }
  }

  export function* createNocDocSaga(
    action: PayloadAction<ICreateNocFormRequest>,
  ) {
    try {
      const response: ICreateNocFormResponse = yield call(
        OrderService.CreateNocService,
        action.payload,
      );
      yield put(createNocDocSuccess(response));
    } catch (error) {
      yield put(createNocDocFailure(error));
    }
  }

  export function* getNocDocListSaga(action: PayloadAction<INocPayload>) {
    try {
        const response: IGetNocListResponse = yield call(OrderService.GetNocService, action.payload);
        console.log("response",response)
        yield put(getNocDocSuccess(response));
    } catch (error) {
        yield put(getNocDocFailure(error));
    }
  }

  //  Noc Template

  export function* getNocFormTemplateSaga(action: PayloadAction<INocFormTemplatePayload>) {
    try {
        const response: INocTemplateResponse = yield call(OrderService.GetNocDocTemplateService, action.payload);
        yield put(getNocFormTemplateSuccess(response));
    } catch (error) {
        yield put(getNocFormTemplateFailure(error));
    }
  }
  // Noc update

  export function* updateNocFormSaga(action: PayloadAction<IUpdateNocFormPayloadRequest>) {
   
    try {
        const response: IUpdateNocFormResponse = yield call(OrderService.UpdateNocFormService, action.payload);
        console.log("response1111",response)
        yield put(updateNocFormSuccess(response));
    } catch (error) {
        yield put(updateCarConditionFailure(error));
    }
  }

export function* watcherOrderSaga() {
  yield takeLatest(addOrderRequest.type, addOrderSaga);
  yield takeLatest(getOrdersRequest.type, getOrderListSaga);
  yield takeLatest(getOrderRequest.type, getOrderSaga);
  yield takeLatest(createMoneyReceiptRequest.type, createMoneyReceiptSaga);
  yield takeLatest(getMoneyReceiptListRequest.type, getMoneyReceiptListSaga);
  yield takeLatest(editMoneyReceiptListRequest.type, editMoneyReceiptSaga);
  yield takeLatest(createCarConditionRequest.type, createCarConditionSaga);
  yield takeLatest(getCarConditionListRequest.type, getCarConditionListSaga);
  yield takeLatest(createBiltyRequest.type, createBiltySaga);
  yield takeLatest(getBiltyListRequest.type, getBiltyListSaga);
  yield takeLatest(updateBiltyRequest.type, updateBiltySaga);
  yield takeLatest(getApprovedOrdersRequest.type, getApprovedOrderListSaga);
  yield takeLatest(getMoneyReceiptHtmlRequest.type, getMoneyReceiptTemplateHtmlSaga);
  yield takeLatest(getBiltyHtmlRequest.type, getBiltyTemplateHtmlSaga);
  yield takeLatest(getCarConditionHtmlRequest.type, getCarConditionTemplateHtmlSaga);
  yield takeLatest(createPackingMaterialsRequest.type, createPackingListSaga);
  yield takeLatest(getPackingMaterialsRequest.type, getPackingListSaga);
  yield takeLatest(deletePackingMaterialItemRequest.type, deletePackingListItemSaga);
  yield takeLatest(createInvoiceRequest.type, createInvoiceSaga);
  yield takeLatest(updateInvoiceRequest.type, updateInvoiceSaga);
  yield takeLatest(getInvoiceListRequest.type, getInvoiceListSaga);
  yield takeLatest(getInvoiceHtmlRequest.type, getInvoiceTemplateHtmlSaga);
  yield takeLatest(getPackingListTemplateRequest.type, getPackingListTemplateSaga);
  yield takeLatest(updatePackingListRequest.type, updatePackingListSaga);
  yield takeLatest(updateCarConditionRequest.type, updateCarConditionSaga);
  yield takeLatest(createNocDocRequest.type, createNocDocSaga);
  yield takeLatest(getNocDocRequest.type, getNocDocListSaga);
  yield takeLatest(getNocFormTemplateRequest.type, getNocFormTemplateSaga)
  yield takeLatest(updateNocFormRequest.type, updateNocFormSaga)



}
