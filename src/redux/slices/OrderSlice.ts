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
import {IGetOrdersResponse} from '../../interface/order/IGetOrdersResponse';
import {IGetMoneyReceiptsResponse} from '../../interface/order/IGetMoneyReceiptsResponse';
import {IGetCarConditionListResponse} from '../../interface/order/IGetCarConditionListResponse';
import {IGetBiltyListResponse} from '../../interface/order/IGetBiltyListResponse';
import {IGetOrdersRequest} from '../../interface/order/IGetOrdersRequest';
import {ISingleEnquiryResponse} from '../../interface/enquiry/ISingleEnquiryResponse';
import {ISingleOrderRequest} from '../../interface/order/ISingleOrderRequest';
import {
  IHtmlTemplateRequest,
  IHtmlTemplateResponse,
} from '../../interface/order/templates/ITemplateResponse';
import { ICreatePackingMaterialRequest, ICreatePackingMaterialResponse, IDeletePackingListItemResponse, IGetPackingListRequest, IPackingListResponse, IUpdatePackingListPayload, IUpdatePackingListRequest, IUpdatePackingListResponse } from '../../interface/order/IPackingMaterialResponse';
import { IGetInvoiceListResponse } from '../../interface/order/IGetInvoiceListResponse';
import { IPackingListTemplateResponse, IPackingListTemplatePayload } from '../../interface/order/IPackingListTemplate';

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
  // Get Order
  order: ISingleEnquiryResponse | null;
  getOrderRequesting: boolean;
  getOrderSuccess: boolean;
  getOrderFailure: boolean;
  getOrderError: any;

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
  // Edit Money Receipt
  moneyReceiptData: IGetMoneyReceiptsResponse | null;
  editMoneyReceiptListRequesting: boolean;
  editMoneyReceiptListSuccess: boolean;
  editMoneyReceiptListFailure: boolean;
  editMoneyReceiptListError: any;
  // Money Receipt Template Html
  moneyReceiptTemplateHtml: IHtmlTemplateResponse | null;
  getMoneyReceiptTemplateHtmlRequesting: boolean;
  getMoneyReceiptTemplateHtmlSuccess: boolean;
  getMoneyReceiptTemplateHtmlFailure: boolean;
  getMoneyReceiptTemplateHtmlError: any;
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
  // CarCondition Template Html
  carConditionTemplateHtml: IHtmlTemplateResponse | null;
  getCarConditionHtmlRequesting: boolean;
  getCarConditionHtmlSuccess: boolean;
  getCarConditionHtmlFailure: boolean;
  getCarConditionTemplateHtmlError: any;
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
  // Bilty Template Html
  biltyTemplateHtml: IHtmlTemplateResponse | null;
  getBiltyHtmlRequesting: boolean;
  getBiltyHtmlSuccess: boolean;
  getBiltyHtmlFailure: boolean;
  getBiltyTemplateHtmlError: any;
  // Create Invoice
  createInvoiceInfo: ICreateInvoiceResponse | null;
  createInvoiceRequesting: boolean;
  createInvoiceSuccess: boolean;
  createInvoiceFailure: boolean;
  createInvoiceError: any;
  // Invoice List
  invoices: IGetInvoiceListResponse | null;
  getInvoicesRequesting: boolean;
  getInvoicesSuccess: boolean;
  getInvoicesFailure:boolean;
  getInvoiceError: any;
  // Invoice Template Html
  invoiceTemplateHtml: IHtmlTemplateResponse | null;
  getInvoiceHtmlRequesting: boolean;
  getInvoiceHtmlSuccess: boolean;
  getInvoiceHtmlFailure: boolean;
  getInvoiceTemplateHtmlError: any;
  // Create Packing Material
  createPackingMaterialInfo: ICreatePackingMaterialResponse | null;
  createPackingMaterialRequesting:boolean;
  createPackingMaterialSuccess:boolean;
  createPackingMaterialFailure:boolean;
  createPackingMaterialError:any;
  // Packing Materials
  packingMaterials: IPackingListResponse | null;
  getPackingMaterialsRequesting: boolean;
  getPackingMaterialSuccess:boolean;
  getPackingMaterialFailure:boolean;
  getPackingMaterialError: any;
  // Delete Packing Item
  deletePackingItemInfo: IDeletePackingListItemResponse | null;
  deletePackingItemRequesting:boolean;
  deletePackingItemSuccess:boolean;
  deletePackingItemFailure:boolean;
  deletePackingItemError:any;
  // Packing List Template
  packingListTemplate:IPackingListTemplateResponse | null;
  packingListTemplateRequesting: boolean;
  packingListTemplateSuccess:boolean;
  packingListTemplateFailure:boolean;
  packingListTemplateError:any;
  // Update Packing List
  updatePackingListUpdateInfo: IUpdatePackingListResponse | null;
  updatePackingListUpdateRequesting: boolean;
  updatePackingListSuccess:boolean;
  updatePackingListFailure:boolean;
  updatePackingListError:any;
}

const initialState: IOrderState = {
  // Add Order
  addOrderInfo: null,
  addOrderRequesting: false,
  addOrderSuccess: false,
  addOrderFailure: false,
  addOrderError: null,
  // Get Order
  order: null,
  getOrderRequesting: false,
  getOrderSuccess: false,
  getOrderFailure: false,
  getOrderError: null,
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

  // Edit Money Receipt
  moneyReceiptData: null,
  editMoneyReceiptListRequesting: false,
  editMoneyReceiptListSuccess: false,
  editMoneyReceiptListFailure: false,
  editMoneyReceiptListError: false,
  // Money Receipt Template Html
  moneyReceiptTemplateHtml: null,
  getMoneyReceiptTemplateHtmlRequesting: false,
  getMoneyReceiptTemplateHtmlSuccess: false,
  getMoneyReceiptTemplateHtmlFailure: false,
  getMoneyReceiptTemplateHtmlError: null,
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
  // CarCondition Template Html
  carConditionTemplateHtml: null,
  getCarConditionHtmlRequesting: false,
  getCarConditionHtmlSuccess: false,
  getCarConditionHtmlFailure: false,
  getCarConditionTemplateHtmlError: null,
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
  // Bilty Template Html
  biltyTemplateHtml: null,
  getBiltyHtmlRequesting: false,
  getBiltyHtmlSuccess: false,
  getBiltyHtmlFailure: false,
  getBiltyTemplateHtmlError: null,
  // Create Invoice
  createInvoiceInfo: null,
  createInvoiceRequesting: false,
  createInvoiceSuccess: false,
  createInvoiceFailure: false,
  createInvoiceError: null,
  // Invoice List
  invoices: null,
  getInvoicesRequesting: false,
  getInvoicesSuccess: false,
  getInvoicesFailure:false,
  getInvoiceError: null,
  // Invoice Template Html
  invoiceTemplateHtml: null,
  getInvoiceHtmlRequesting: false,
  getInvoiceHtmlSuccess: false,
  getInvoiceHtmlFailure: false,
  getInvoiceTemplateHtmlError: null,
  // Create Packing Material
  createPackingMaterialInfo: null,
  createPackingMaterialRequesting:false,
  createPackingMaterialSuccess:false,
  createPackingMaterialFailure:false,
  createPackingMaterialError:null,
  // Packing Materials
  packingMaterials: null,
  getPackingMaterialsRequesting: false,
  getPackingMaterialSuccess:false,
  getPackingMaterialFailure:false,
  getPackingMaterialError: null,
  // Delete Packing Item
  deletePackingItemInfo: null,
  deletePackingItemRequesting:false,
  deletePackingItemSuccess:false,
  deletePackingItemFailure:false,
  deletePackingItemError:null,
  // Packing List Template
  packingListTemplate: null,
  packingListTemplateRequesting: false,
  packingListTemplateSuccess:false,
  packingListTemplateFailure:false,
  packingListTemplateError:null,
  // Update Packing List
  updatePackingListUpdateInfo: null,
  updatePackingListUpdateRequesting:false,
  updatePackingListSuccess:false,
  updatePackingListFailure:false,
  updatePackingListError:null,
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
    resetAddOrderRequest: state => {
      state.addOrderRequesting = false;
      state.addOrderSuccess = false;
      state.addOrderFailure = false;
      state.addOrderError = null;
    },
    // Get Order List
    getOrdersRequest: (
      state,
      action: PayloadAction<Partial<IGetOrdersRequest>>,
    ) => {
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
    // Get Order
    getOrderRequest: (state, action: PayloadAction<ISingleOrderRequest>) => {
      state.getOrderRequesting = true;
    },
    getOrderSuccess: (state, action: PayloadAction<ISingleEnquiryResponse>) => {
      state.getOrderRequesting = false;
      state.getOrderSuccess = true;
      state.order = action.payload;
    },
    getOrderFailure: (state, action: PayloadAction<any>) => {
      state.getOrderRequesting = false;
      state.getOrderSuccess = false;
      state.getOrderFailure = true;
      state.getOrderError = action.payload;
    },
    resetOrderRequest: state => {
      state.getOrderRequesting = false;
      state.getOrderSuccess = false;
      state.getOrderFailure = false;
      state.getOrderError = null;
    },
    // Get Approved Order List
    getApprovedOrdersRequest: (
      state,
      action: PayloadAction<IGetOrdersRequest>,
    ) => {
      state.getApprovedOrdersRequesting = true;
    },
    getApprovedOrdersSuccess: (
      state,
      action: PayloadAction<IGetOrdersResponse>,
    ) => {
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
    resetCreateMoneyReceiptRequest: state => {
      state.createMoneyReceiptRequesting = false;
      state.createMoneyReceiptSuccess = false;
      state.createMoneyReceiptFailure = false;
      state.createMoneyReceiptError = null;
    },
    // Get Money Receipt List
    getMoneyReceiptListRequest: (state, action: PayloadAction<string>) => {
      state.getMoneyReceiptListRequesting = true;
    },
    getMoneyReceiptListSuccess: (
      state,
      action: PayloadAction<IGetMoneyReceiptsResponse>,
    ) => {
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
    // Edit Money Receipt List
    editMoneyReceiptListRequest: (
      state,
      action: PayloadAction<{id: string; requestBody: any}>,
    ) => {
      state.editMoneyReceiptListRequesting = true;
    },
    editMoneyReceiptListSuccess: (
      state,
      action: PayloadAction<IGetMoneyReceiptsResponse>,
    ) => {
      state.editMoneyReceiptListRequesting = false;
      state.editMoneyReceiptListSuccess = true;
      state.moneyReceiptData = action.payload;
    },
    editMoneyReceiptListFailure: (state, action: PayloadAction<any>) => {
      state.editMoneyReceiptListRequesting = false;
      state.editMoneyReceiptListSuccess = false;
      state.editMoneyReceiptListFailure = true;
      state.editMoneyReceiptListError = action.payload;
    },
    // Money Receipt Template Html
    getMoneyReceiptHtmlRequest: (
      state,
      action: PayloadAction<IHtmlTemplateRequest>,
    ) => {
      state.getMoneyReceiptTemplateHtmlRequesting = true;
    },
    getMoneyReceiptHtmlSuccess: (
      state,
      action: PayloadAction<IHtmlTemplateResponse>,
    ) => {
      state.getMoneyReceiptTemplateHtmlRequesting = false;
      state.getMoneyReceiptTemplateHtmlSuccess = true;
      state.getMoneyReceiptTemplateHtmlFailure = false;
      state.getMoneyReceiptTemplateHtmlError = null;
      state.moneyReceiptTemplateHtml = action.payload;
    },
    getMoneyReceiptHtmlFailure: (state, action: PayloadAction<any>) => {
      state.getMoneyReceiptTemplateHtmlRequesting = false;
      state.getMoneyReceiptTemplateHtmlSuccess = false;
      state.getMoneyReceiptTemplateHtmlFailure = true;
      state.getMoneyReceiptTemplateHtmlError = action.payload;
    },
    resetGetMoneyReceiptHtmlRequest: state => {
      state.getMoneyReceiptTemplateHtmlRequesting = false;
      state.getMoneyReceiptTemplateHtmlSuccess = false;
      state.getMoneyReceiptTemplateHtmlFailure = false;
      state.getMoneyReceiptTemplateHtmlError = null;
    },
    clearMoneyReceiptHtmlDocument: state => {
      state.moneyReceiptTemplateHtml = null;
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
    resetCreateCarConditionRequest: state => {
      state.createCarConditionRequesting = false;
      state.createCarConditionSuccess = false;
      state.createCarConditionFailure = false;
      state.createCarConditionError = null;
    },
    // Get Car Condition List
    getCarConditionListRequest: (state, action: PayloadAction<string>) => {
      state.getCarConditionListRequesting = true;
    },
    getCarConditionListSuccess: (
      state,
      action: PayloadAction<IGetCarConditionListResponse>,
    ) => {
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
    // CarCondition Template Html
    getCarConditionHtmlRequest: (
      state,
      action: PayloadAction<IHtmlTemplateRequest>,
    ) => {
      state.getCarConditionHtmlRequesting = true;
    },
    getCarConditionHtmlSuccess: (
      state,
      action: PayloadAction<IHtmlTemplateResponse>,
    ) => {
      state.getCarConditionHtmlRequesting = false;
      state.getCarConditionHtmlSuccess = true;
      state.getCarConditionHtmlFailure = false;
      state.getBiltyTemplateHtmlError = null;
      state.carConditionTemplateHtml = action.payload;
    },
    getCarConditionHtmlFailure: (state, action: PayloadAction<any>) => {
      state.getCarConditionHtmlRequesting = false;
      state.getCarConditionHtmlSuccess = false;
      state.getCarConditionHtmlFailure = true;
      state.getCarConditionTemplateHtmlError = action.payload;
    },
    resetGetCarConditionHtmlRequest: state => {
      state.getCarConditionHtmlRequesting = false;
      state.getCarConditionHtmlSuccess = false;
      state.getCarConditionHtmlFailure = false;
      state.getCarConditionTemplateHtmlError = null;
      state.carConditionTemplateHtml = null;
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
    resetCreateBiltyRequest: state => {
      state.createBiltyRequesting = false;
      state.createBiltySuccess = false;
      state.createBiltyFailure = false;
      state.createBiltyError = null;
    },
    // Get Bilty List
    getBiltyListRequest: (state, action: PayloadAction<string>) => {
      state.getBiltyListRequesting = true;
    },
    getBiltyListSuccess: (
      state,
      action: PayloadAction<IGetBiltyListResponse>,
    ) => {
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
    // Bilty Template Html
    getBiltyHtmlRequest: (
      state,
      action: PayloadAction<IHtmlTemplateRequest>,
    ) => {
      state.getBiltyHtmlRequesting = true;
    },
    getBiltyHtmlSuccess: (
      state,
      action: PayloadAction<IHtmlTemplateResponse>,
    ) => {
      state.getBiltyHtmlRequesting = false;
      state.getBiltyHtmlSuccess = true;
      state.getBiltyHtmlFailure = false;
      state.getBiltyTemplateHtmlError = null;
      state.biltyTemplateHtml = action.payload;
    },
    getBiltyHtmlFailure: (state, action: PayloadAction<any>) => {
      state.getBiltyHtmlRequesting = false;
      state.getBiltyHtmlSuccess = false;
      state.getBiltyHtmlFailure = true;
      state.getBiltyTemplateHtmlError = action.payload;
    },
    resetGetBiltyHtmlRequest: state => {
      state.getBiltyHtmlRequesting = false;
      state.getBiltyHtmlSuccess = false;
      state.getBiltyHtmlFailure = false;
      state.getBiltyTemplateHtmlError = null;
      state.biltyTemplateHtml = null;
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
    resetCreateInvoiceRequest: (state) => {
      state.createInvoiceRequesting = false;
      state.createInvoiceSuccess = false;
      state.createInvoiceFailure = false;
      state.createInvoiceError = null;
      state.createInvoiceInfo = null;
    },
    // Get Invoice List
    getInvoiceListRequest: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.getInvoicesRequesting = true;
    },
    getInvoiceListSuccess: (
      state,
      action: PayloadAction<IGetInvoiceListResponse>,
    ) => {
      state.getInvoicesRequesting = false;
      state.getInvoicesSuccess = true;
      state.invoices = action.payload;
    },
    getInvoiceListFailure: (state, action: PayloadAction<any>) => {
      state.getInvoicesRequesting = false;
      state.getInvoicesSuccess = false;
      state.getInvoicesFailure = true;
      state.getInvoiceError = action.payload;
    },
    // Invoice Template Html
    getInvoiceHtmlRequest: (
      state,
      action: PayloadAction<IHtmlTemplateRequest>,
    ) => {
      state.getInvoiceHtmlRequesting = true;
    },
    getInvoiceHtmlSuccess: (
      state,
      action: PayloadAction<IHtmlTemplateResponse>,
    ) => {
      state.getInvoiceHtmlRequesting = false;
      state.getInvoiceHtmlSuccess = true;
      state.getInvoiceHtmlFailure = false;
      state.getInvoiceTemplateHtmlError = null;
      state.invoiceTemplateHtml = action.payload;
    },
    getInvoiceHtmlFailure: (state, action: PayloadAction<any>) => {
      state.getInvoiceHtmlRequesting = false;
      state.getInvoiceHtmlSuccess = false;
      state.getInvoiceHtmlFailure = true;
      state.getInvoiceTemplateHtmlError = action.payload;
    },
    resetGetInvoiceHtmlRequest: state => {
      state.getInvoiceHtmlRequesting = false;
      state.getInvoiceHtmlSuccess = false;
      state.getInvoiceHtmlFailure = false;
      state.getInvoiceTemplateHtmlError = null;
      state.invoiceTemplateHtml = null;
    },
     // Create Packing Material
     createPackingMaterialsRequest: (
      state,
      action: PayloadAction<ICreatePackingMaterialRequest>,
    ) => {
      state.createPackingMaterialRequesting = true;
    },
    createPackingMaterialsSuccess: (
      state,
      action: PayloadAction<ICreatePackingMaterialResponse>,
    ) => {
      state.createPackingMaterialRequesting = false;
      state.createPackingMaterialSuccess = true;
      state.createPackingMaterialInfo = action.payload;
    },
    createPackingMaterialsFailure: (state, action: PayloadAction<any>) => {
      state.createPackingMaterialRequesting = false;
      state.createPackingMaterialSuccess = false;
      state.createPackingMaterialFailure = true;
      state.createPackingMaterialError = action.payload;
    },
    resetCreatePackingMaterialsRequest: (state) => {
      state.createPackingMaterialRequesting = false;
      state.createPackingMaterialSuccess = false;
      state.createPackingMaterialFailure = false;
      state.createPackingMaterialError = null;
    },
    // Get Packing Materials
    getPackingMaterialsRequest: (
      state,
      action: PayloadAction<IGetPackingListRequest>,
    ) => {
      state.getPackingMaterialsRequesting = true;
    },
    getPackingMaterialsSuccess: (
      state,
      action: PayloadAction<IPackingListResponse>,
    ) => {
      state.getPackingMaterialsRequesting = false;
      state.getPackingMaterialSuccess = true;
      state.packingMaterials = action.payload;
    },
    getPackingMaterialsFailure: (state, action: PayloadAction<any>) => {
      state.getPackingMaterialsRequesting = false;
      state.getPackingMaterialSuccess = false;
      state.getPackingMaterialFailure = true;
      state.getPackingMaterialError = action.payload;
    },
    // Delete Packing Material Item
    deletePackingMaterialItemRequest: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.deletePackingItemRequesting = true;
    },
    deletePackingMaterialItemSuccess: (
      state,
      action: PayloadAction<IDeletePackingListItemResponse>,
    ) => {
      state.deletePackingItemRequesting = false;
      state.deletePackingItemSuccess = true;
      state.deletePackingItemInfo = action.payload;
    },
    deletePackingMaterialItemFailure: (state, action: PayloadAction<any>) => {
      state.deletePackingItemRequesting = false;
      state.deletePackingItemSuccess = false;
      state.deletePackingItemFailure = true;
      state.deletePackingItemError = action.payload;
    },
    resetDeletePackingMaterialItemRequest: (state, action: PayloadAction<any>) => {
      state.deletePackingItemRequesting = false;
      state.deletePackingItemSuccess = false;
      state.deletePackingItemFailure = false;
      state.deletePackingItemError = null;
    },
    // Packing List Template
    getPackingListTemplateRequest: (state, action:PayloadAction<IPackingListTemplatePayload>) => {
      state.packingListTemplateRequesting = true;
    },
    getPackingListTemplateSuccess: (state, action:PayloadAction<IPackingListTemplateResponse>) => {
      state.packingListTemplateRequesting = false;
      state.packingListTemplateSuccess = true;
      state.packingListTemplate = action.payload;
    },
    getPackingListTemplateFailure: (state, action:PayloadAction<any>) => {
      state.packingListTemplateRequesting = false;
      state.packingListTemplateSuccess = false;
      state.packingListTemplateFailure = true;
      state.packingListTemplateError = action.payload;
    },
    resetGetPackingListTemplateRequest: (state) => {
      state.packingListTemplateRequesting = false;
      state.packingListTemplateSuccess = false;
      state.packingListTemplateFailure = false;
      state.packingListTemplate = null;
      state.packingListTemplateError = null;
    },
    // Update Packing List
    updatePackingListRequest: (state, action:PayloadAction<IUpdatePackingListRequest>) => {
      state.updatePackingListUpdateRequesting = true;
    },
    updatePackingListSuccess:(state, action:PayloadAction<IUpdatePackingListResponse>) => {
      state.updatePackingListUpdateRequesting = false;
      state.updatePackingListSuccess = true;
      state.updatePackingListFailure = false;
      state.updatePackingListUpdateInfo = action.payload;
    },
    updatePackingListFailure:(state, action:PayloadAction<any>) => {
      state.updatePackingListUpdateRequesting = false;
      state.updatePackingListSuccess = false;
      state.updatePackingListFailure = true;
      state.updatePackingListError = action.payload;
    },
    resetUpdatePackingListRequest:(state) => {
      state.updatePackingListUpdateRequesting = false;
      state.updatePackingListSuccess = false;
      state.updatePackingListFailure = false;
      state.updatePackingListError = null;
    }
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
  // Get Order
  getOrderRequest,
  getOrderSuccess,
  getOrderFailure,
  resetOrderRequest,
  // Get Approved Order Lists
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
  // Edit Money Receipt
  editMoneyReceiptListRequest,
  editMoneyReceiptListSuccess,
  editMoneyReceiptListFailure,
  // Money Receipt Template Html
  getMoneyReceiptHtmlRequest,
  getMoneyReceiptHtmlSuccess,
  getMoneyReceiptHtmlFailure,
  resetGetMoneyReceiptHtmlRequest,
  clearMoneyReceiptHtmlDocument,
  // Create Car Condition
  createCarConditionRequest,
  createCarConditionSuccess,
  createCarConditionFailure,
  resetCreateCarConditionRequest,
  // Get Car Condition List
  getCarConditionListRequest,
  getCarConditionListSuccess,
  getCarConditionListFailure,
  // CarCondition Html
  getCarConditionHtmlRequest,
  getCarConditionHtmlSuccess,
  getCarConditionHtmlFailure,
  resetGetCarConditionHtmlRequest,
  // Create Bilty
  createBiltyRequest,
  createBiltySuccess,
  createBiltyFailure,
  resetCreateBiltyRequest,
  // Get Bilty List
  getBiltyListRequest,
  getBiltyListSuccess,
  getBiltyListFailure,
  // Bilty Html
  getBiltyHtmlRequest,
  getBiltyHtmlSuccess,
  getBiltyHtmlFailure,
  resetGetBiltyHtmlRequest,
  // Create Invoice
  createInvoiceRequest,
  createInvoiceSuccess,
  createInvoiceFailure,
  resetCreateInvoiceRequest,
  // Get Invoice List
  getInvoiceListRequest,
  getInvoiceListSuccess,
  getInvoiceListFailure,
  // Invoice Html Template
  getInvoiceHtmlRequest,
  getInvoiceHtmlSuccess,
  getInvoiceHtmlFailure,
  resetGetInvoiceHtmlRequest,
  // Create Packing Material
  createPackingMaterialsRequest,
  createPackingMaterialsSuccess,
  createPackingMaterialsFailure,
  resetCreatePackingMaterialsRequest,
  // Get Packing Materials
  getPackingMaterialsRequest,
  getPackingMaterialsSuccess,
  getPackingMaterialsFailure,
  // Delete Packing Material Item
  deletePackingMaterialItemRequest,
  deletePackingMaterialItemSuccess,
  deletePackingMaterialItemFailure,
  resetDeletePackingMaterialItemRequest,
  // Packing List Template
  getPackingListTemplateRequest,
  getPackingListTemplateSuccess,
  getPackingListTemplateFailure,
  resetGetPackingListTemplateRequest,
  // Update Packing List
  updatePackingListRequest,
  updatePackingListSuccess,
  updatePackingListFailure,
  resetUpdatePackingListRequest,
} = OrderSlice.actions;
