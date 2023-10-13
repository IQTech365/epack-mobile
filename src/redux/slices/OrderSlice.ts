import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IOrderDetailsResponse} from '../../interface/order/IOrderDetailsResponse';
import {ICreateCarConditionResponse} from '../../interface/order/ICreateCarConditionResponse';
import {ICreateBiltyResponse} from '../../interface/order/ICreateBiltyResponse';
import {ICreateInvoiceResponse} from '../../interface/order/ICreateInvoiceResponse';
import {ICreateCarConditionRequest} from '../../interface/order/ICreateCarConditionRequest';
import {ICreateBiltyRequest} from '../../interface/order/ICreateBiltyRequest';
import {ICreateInvoiceRequest} from '../../interface/order/ICreateInvoiceRequest';
import {ICreateMoneyReceiptResponse} from '../../interface/order/ICreateMoneyReceiptResponse';
import {ICreateMoneyReceiptRequest} from '../../interface/order/ICreateMoneyReceiptRequest';
import {IAddOrderResponse} from '../../interface/order/IAddOrderResponse';
import {IAddOrderRequest} from '../../interface/order/IAddOrderRequest';
import { IGetOrdersResponse } from '../../interface/order/IGetOrdersResponse';

interface IOrderState {
  // Add Order
  addOrderInfo: IAddOrderResponse | null;
  addOrderRequesting: boolean;
  addOrderSuccess: boolean;
  addOrderFailure: boolean;
  addOrderError: any;
  // Get Order List
  orders: IGetOrdersResponse | null;
  getOrdersRequesting: boolean;
  getOrdersSuccess: boolean;
  getOrdersFailure: boolean;
  getOrdersError: any;
  // Get Order Details
  orderDetailsInfo: IOrderDetailsResponse | null;
  getOrderDetailsRequesting: boolean;
  getOrderDetailsSuccess: boolean;
  getOrderDetailsFailure: boolean;
  getOrderDetailsError: any;
  // Create Money Receipt
  createMoneyReceiptInfo: ICreateMoneyReceiptResponse | null;
  createMoneyReceiptRequesting: boolean;
  createMoneyReceiptSuccess: boolean;
  createMoneyReceiptFailure: boolean;
  createMoneyReceiptError: any;
  // Create Car Condition
  createCarConditionInfo: ICreateCarConditionResponse | null;
  createCarConditionRequesting: boolean;
  createCarConditionSuccess: boolean;
  createCarConditionFailure: boolean;
  createCarConditionError: any;
  // Create Bilty
  createBiltyInfo: ICreateBiltyResponse | null;
  createBiltyRequesting: boolean;
  createBiltySuccess: boolean;
  createBiltyFailure: boolean;
  createBiltyError: any;
  // Create Invoice
  createInvoiceInfo: ICreateInvoiceResponse | null;
  createInvoiceRequesting: boolean;
  createInvoiceSuccess: boolean;
  createInvoiceFailure: boolean;
  createInvoiceError: any;
}

const initialState: IOrderState = {
  // Add Order
  addOrderInfo: null,
  addOrderRequesting: false,
  addOrderSuccess: false,
  addOrderFailure: false,
  addOrderError: null,
  // Get Order List
  orders: null,
  getOrdersRequesting: false,
  getOrdersSuccess: false,
  getOrdersFailure: false,
  getOrdersError: null,
  // Get Order Details
  orderDetailsInfo: null,
  getOrderDetailsRequesting: false,
  getOrderDetailsSuccess: false,
  getOrderDetailsFailure: false,
  getOrderDetailsError: null,
  // Create Money Receipt
  createMoneyReceiptInfo: null,
  createMoneyReceiptRequesting: false,
  createMoneyReceiptSuccess: false,
  createMoneyReceiptFailure: false,
  createMoneyReceiptError: null,
  // Create Car Condition
  createCarConditionInfo: null,
  createCarConditionRequesting: false,
  createCarConditionSuccess: false,
  createCarConditionFailure: false,
  createCarConditionError: null,
  // Create Bilty
  createBiltyInfo: null,
  createBiltyRequesting: false,
  createBiltySuccess: false,
  createBiltyFailure: false,
  createBiltyError: null,
  // Create Invoice
  createInvoiceInfo: null,
  createInvoiceRequesting: false,
  createInvoiceSuccess: false,
  createInvoiceFailure: false,
  createInvoiceError: null,
};

export const OrderSlice = createSlice({
  name: 'OrderSlice',
  initialState: initialState,
  reducers: {
    // Add Order
    addOrderRequest: (state, action: PayloadAction<IAddOrderRequest>) => {
      state.addOrderRequesting = true;
    },
    addOrderSuccess: (state, action: PayloadAction<IAddOrderResponse>) => {
      state.addOrderRequesting = false;
      state.addOrderSuccess = true;
      state.addOrderInfo = action.payload;
    },
    addOrderFailure: (state, action: PayloadAction<any>) => {
      state.addOrderRequesting = false;
      state.addOrderSuccess = false;
      state.addOrderFailure = true;
      state.addOrderError = action.payload;
    },
    resetAddOrderRequest: (state) => {
      state.addOrderRequesting = false;
      state.addOrderSuccess = false;
      state.addOrderFailure = false;
      state.addOrderError = null;
    },
    // Get Order List
    getOrdersRequest: (state, action: PayloadAction<string>) => {
      state.getOrdersRequesting = true;
    },
    getOrdersSuccess: (state, action: PayloadAction<IGetOrdersResponse>) => {
      state.getOrdersRequesting = false;
      state.getOrdersSuccess = true;
      state.orders = action.payload;
    },
    getOrdersFailure: (state, action: PayloadAction<any>) => {
      state.getOrdersRequesting = false;
      state.getOrdersSuccess = false;
      state.getOrdersFailure = true;
      state.getOrdersError = action.payload;
    },
    // Get Order Details
    getOrderDetailsRequest: (state, action: PayloadAction<string>) => {
      state.getOrderDetailsRequesting = true;
    },
    getOrderDetailsSuccess: (
      state,
      action: PayloadAction<IOrderDetailsResponse>,
    ) => {
      state.getOrderDetailsRequesting = false;
      state.getOrderDetailsSuccess = true;
      state.orderDetailsInfo = action.payload;
    },
    getOrderDetailsFailure: (state, action: PayloadAction<any>) => {
      state.getOrderDetailsRequesting = false;
      state.getOrderDetailsSuccess = false;
      state.getOrderDetailsFailure = true;
      state.getOrderDetailsError = action.payload;
    },
    // Create Money Receipt
    createMoneyReceiptRequest: (
      state,
      action: PayloadAction<ICreateMoneyReceiptRequest>,
    ) => {
      state.createMoneyReceiptRequesting = true;
    },
    createMoneyReceiptSuccess: (
      state,
      action: PayloadAction<ICreateMoneyReceiptResponse>,
    ) => {
      state.createMoneyReceiptRequesting = false;
      state.createMoneyReceiptSuccess = true;
      state.createMoneyReceiptInfo = action.payload;
    },
    createMoneyReceiptFailure: (state, action: PayloadAction<any>) => {
      state.createMoneyReceiptRequesting = false;
      state.createMoneyReceiptSuccess = false;
      state.createMoneyReceiptFailure = true;
      state.createMoneyReceiptError = action.payload;
    },
    // Create Car Condition
    createCarConditionRequest: (
      state,
      action: PayloadAction<ICreateCarConditionRequest>,
    ) => {
      state.createCarConditionRequesting = true;
    },
    createCarConditionSuccess: (
      state,
      action: PayloadAction<ICreateCarConditionResponse>,
    ) => {
      state.createCarConditionRequesting = false;
      state.createCarConditionSuccess = true;
      state.createCarConditionInfo = action.payload;
    },
    createCarConditionFailure: (state, action: PayloadAction<any>) => {
      state.createCarConditionRequesting = false;
      state.createCarConditionSuccess = false;
      state.createCarConditionFailure = true;
      state.createCarConditionError = action.payload;
    },
    // Create Bilty
    createBiltyRequest: (state, action: PayloadAction<ICreateBiltyRequest>) => {
      state.createBiltyRequesting = true;
    },
    createBiltySuccess: (
      state,
      action: PayloadAction<ICreateBiltyResponse>,
    ) => {
      state.createBiltyRequesting = false;
      state.createBiltySuccess = true;
      state.createBiltyInfo = action.payload;
    },
    createBiltyFailure: (state, action: PayloadAction<any>) => {
      state.createBiltyRequesting = false;
      state.createBiltySuccess = false;
      state.createBiltyFailure = true;
      state.createBiltyError = action.payload;
    },
    // Create Invoice
    createInvoiceRequest: (
      state,
      action: PayloadAction<ICreateInvoiceRequest>,
    ) => {
      state.createInvoiceRequesting = true;
    },
    createInvoiceSuccess: (
      state,
      action: PayloadAction<ICreateInvoiceResponse>,
    ) => {
      state.createInvoiceRequesting = false;
      state.createInvoiceSuccess = true;
      state.createInvoiceInfo = action.payload;
    },
    createInvoiceFailure: (state, action: PayloadAction<any>) => {
      state.createInvoiceRequesting = false;
      state.createInvoiceSuccess = false;
      state.createInvoiceFailure = true;
      state.createInvoiceError = action.payload;
    },
  },
});

export default OrderSlice.reducer;

export const {
  // Add Order
  addOrderRequest,
  addOrderSuccess,
  addOrderFailure,
  resetAddOrderRequest,
  // Get Order List
  getOrdersRequest,
  getOrdersSuccess,
  getOrdersFailure,
  // Get Order Details
  getOrderDetailsRequest,
  getOrderDetailsSuccess,
  getOrderDetailsFailure,
  // Create MoneyReceipt
  createMoneyReceiptRequest,
  createMoneyReceiptSuccess,
  createMoneyReceiptFailure,
  // Create Car Condition
  createCarConditionRequest,
  createCarConditionSuccess,
  createCarConditionFailure,
  // Create Bilty
  createBiltyRequest,
  createBiltySuccess,
  createBiltyFailure,
  // Create Invoice
  createInvoiceRequest,
  createInvoiceSuccess,
  createInvoiceFailure,
} = OrderSlice.actions;
