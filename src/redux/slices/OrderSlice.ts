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
import { IGetMoneyReceiptsResponse } from '../../interface/order/IGetMoneyReceiptsResponse';
import { IGetCarConditionListResponse } from '../../interface/order/IGetCarConditionListResponse';
import { IGetBiltyListResponse } from '../../interface/order/IGetBiltyListResponse';
import { IGetOrdersRequest } from '../../interface/order/IGetOrdersRequest';

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

    // Get Approved Order List
    approvedOrders: IGetOrdersResponse | null;
    getApprovedOrdersRequesting: boolean;
    getApprovedOrdersSuccess: boolean;
    getApprovedOrdersFailure: boolean;
    getApprovedOrdersError: any;

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
  // Get Money Receipt List
  moneyReceiptList: IGetMoneyReceiptsResponse | null;
  getMoneyReceiptListRequesting: boolean;
  getMoneyReceiptListSuccess: boolean;
  getMoneyReceiptListFailure: boolean;
  getMoneyReceiptListError: any;
  // Create Car Condition
  createCarConditionInfo: ICreateCarConditionResponse | null;
  createCarConditionRequesting: boolean;
  createCarConditionSuccess: boolean;
  createCarConditionFailure: boolean;
  createCarConditionError: any;
  // Get Car Condition List
  carConditionList: IGetCarConditionListResponse | null;
  getCarConditionListRequesting: boolean;
  getCarConditionListSuccess: boolean;
  getCarConditionListFailure: boolean;
  getCarConditionListError: any;
  // Create Bilty
  createBiltyInfo: ICreateBiltyResponse | null;
  createBiltyRequesting: boolean;
  createBiltySuccess: boolean;
  createBiltyFailure: boolean;
  createBiltyError: any;
  // Get Bilty List
  biltyList: IGetBiltyListResponse | null;
  getBiltyListRequesting: boolean;
  getBiltyListSuccess: boolean;
  getBiltyListFailure: boolean;
  getBiltyListError: any;
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
// Get Approved Order List
  approvedOrders: null,
  getApprovedOrdersRequesting: false,
  getApprovedOrdersSuccess: false,
  getApprovedOrdersFailure: false,
  getApprovedOrdersError: null,
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
  // Get Money Receipt List
  moneyReceiptList: null,
  getMoneyReceiptListRequesting: false,
  getMoneyReceiptListSuccess: false,
  getMoneyReceiptListFailure: false,
  getMoneyReceiptListError: null,
  // Create Car Condition
  createCarConditionInfo: null,
  createCarConditionRequesting: false,
  createCarConditionSuccess: false,
  createCarConditionFailure: false,
  createCarConditionError: null,
  // Get Car Condition List
  carConditionList: null,
  getCarConditionListRequesting: false,
  getCarConditionListSuccess: false,
  getCarConditionListFailure: false,
  getCarConditionListError: null,
  // Create Bilty
  createBiltyInfo: null,
  createBiltyRequesting: false,
  createBiltySuccess: false,
  createBiltyFailure: false,
  createBiltyError: null,
  // Get Bilty List
  biltyList: null,
  getBiltyListRequesting: false,
  getBiltyListSuccess: false,
  getBiltyListFailure: false,
  getBiltyListError: null,
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
    getOrdersRequest: (state, action: PayloadAction<Partial<IGetOrdersRequest>>) => {
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

    // Get Approved Order List
    getApprovedOrdersRequest: (state, action: PayloadAction<IGetOrdersRequest>) => {
      state.getApprovedOrdersRequesting = true;
    },
    getApprovedOrdersSuccess: (state, action: PayloadAction<IGetOrdersResponse>) => {
      state.getApprovedOrdersRequesting = false;
      state.getApprovedOrdersSuccess = true;
      state.approvedOrders = action.payload;
    },
    getApprovedOrdersFailure: (state, action: PayloadAction<any>) => {
      state.getApprovedOrdersRequesting = false;
      state.getApprovedOrdersSuccess = false;
      state.getApprovedOrdersFailure = true;
      state.getApprovedOrdersError = action.payload;
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
    resetCreateMoneyReceiptRequest: (state) => {
      state.createMoneyReceiptRequesting = false;
      state.createMoneyReceiptSuccess = false;
      state.createMoneyReceiptFailure = false;
      state.createMoneyReceiptError = null;
    },
    // Get Money Receipt List
    getMoneyReceiptListRequest: (state, action: PayloadAction<string>) => {
      state.getMoneyReceiptListRequesting = true;
    },
    getMoneyReceiptListSuccess: (state, action: PayloadAction<IGetMoneyReceiptsResponse>) => {
      state.getMoneyReceiptListRequesting = false;
      state.getMoneyReceiptListSuccess = true;
      state.moneyReceiptList = action.payload;
    },
    getMoneyReceiptListFailure: (state, action: PayloadAction<any>) => {
      state.getMoneyReceiptListRequesting = false;
      state.getMoneyReceiptListSuccess = false;
      state.getMoneyReceiptListFailure = true;
      state.getMoneyReceiptListError = action.payload;
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
    resetCreateCarConditionRequest: (state) => {
      state.createCarConditionRequesting = false;
      state.createCarConditionSuccess = false;
      state.createCarConditionFailure = false;
      state.createCarConditionError = null;
    },
    // Get Car Condition List
    getCarConditionListRequest: (state, action: PayloadAction<string>) => {
      state.getCarConditionListRequesting = true;
    },
    getCarConditionListSuccess: (state, action: PayloadAction<IGetCarConditionListResponse>) => {
      state.getCarConditionListRequesting = false;
      state.getCarConditionListSuccess = true;
      state.carConditionList = action.payload;
    },
    getCarConditionListFailure: (state, action: PayloadAction<any>) => {
      state.getCarConditionListRequesting = false;
      state.getCarConditionListSuccess = false;
      state.getCarConditionListFailure = true;
      state.getCarConditionListError = action.payload;
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
    resetCreateBiltyRequest: (state) => {
      state.createBiltyRequesting = false;
      state.createBiltySuccess = false;
      state.createBiltyFailure = false;
      state.createBiltyError = null;
    },
    // Get Bilty List
    getBiltyListRequest: (state, action: PayloadAction<string>) => {
      state.getBiltyListRequesting = true;
    },
    getBiltyListSuccess: (state, action: PayloadAction<IGetBiltyListResponse>) => {
      state.getBiltyListRequesting = false;
      state.getBiltyListSuccess = true;
      state.biltyList = action.payload;
    },
    getBiltyListFailure: (state, action: PayloadAction<any>) => {
      state.getBiltyListRequesting = false;
      state.getBiltyListSuccess = false;
      state.getBiltyListFailure = true;
      state.getBiltyListError = action.payload;
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
    resetCreateInvoiceRequest: (state, action: PayloadAction<any>) => {
      state.createInvoiceRequesting = false;
      state.createInvoiceSuccess = false;
      state.createInvoiceFailure = false;
      state.createInvoiceError = null;
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
  // Get Approved Order List
  getApprovedOrdersRequest,
  getApprovedOrdersSuccess,
  getApprovedOrdersFailure,
  // Get Order Details
  getOrderDetailsRequest,
  getOrderDetailsSuccess,
  getOrderDetailsFailure,
  // Create MoneyReceipt
  createMoneyReceiptRequest,
  createMoneyReceiptSuccess,
  createMoneyReceiptFailure,
  resetCreateMoneyReceiptRequest,
  // Get Money Receipt List
  getMoneyReceiptListRequest,
  getMoneyReceiptListSuccess,
  getMoneyReceiptListFailure,
  // Create Car Condition
  createCarConditionRequest,
  createCarConditionSuccess,
  createCarConditionFailure,
  resetCreateCarConditionRequest,
  // Get Car Condition List
  getCarConditionListRequest,
  getCarConditionListSuccess,
  getCarConditionListFailure,
  // Create Bilty
  createBiltyRequest,
  createBiltySuccess,
  createBiltyFailure,
  resetCreateBiltyRequest,
  // Get Bilty List
  getBiltyListRequest,
  getBiltyListSuccess,
  getBiltyListFailure,
  // Create Invoice
  createInvoiceRequest,
  createInvoiceSuccess,
  createInvoiceFailure,
} = OrderSlice.actions;
