import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IAddPurchaseRequest,
  IAddPurchaseResponse,
  IGetPurchasedSubscriptionListResponse,
  IGetPurchasedSubscriptionParams,
  ISubmoduleFeatureListResponse,
  ISubmoduleListResponse,
  ISubscriptionPlanListResponse,
  IUpdateSubscriptionParams,
  IUpdateSubscriptionRequest,
  IUpdateSubscriptionResponse,
} from '../../interface/subscription/subscription';

interface ISubscriptionState {
  // Subscription plans
  subscriptionPlans: ISubscriptionPlanListResponse | null;
  getSubscriptionPlansRequesting: boolean;
  getSubscriptionPlansRequestSuccess: boolean;
  getSubscriptionPlansRequestFailure: boolean;
  getSubscriptionPlansError: any;
  // Submodule Features
  submoduleFeatures: ISubmoduleFeatureListResponse | null;
  getSubmoduleFeaturesRequesting: boolean;
  getSubmoduleFeaturesRequestSuccess: boolean;
  getSubmoduleFeaturesRequestFailure: boolean;
  getSubmoduleFeaturesRequestError: any;
  // Submodule list
  submodules: ISubmoduleListResponse | null;
  getSubmodulesRequesting: boolean;
  getSubmodulesRequestSuccess: boolean;
  getSubmodulesRequestFailure: boolean;
  getSubmodulesRequestError: any;
  // Get Subscription purchase list
  purchasedSubscriptions: IGetPurchasedSubscriptionListResponse | null;
  getPurchasedSubscriptionsRequesting:boolean;
  getPurchasedSubscriptionsSuccess:boolean;
  getPurchasedSubscriptionsFailure:boolean;
  getPurchasedSubscriptionsError:any;

  // Update Subscription info with company_id
  updateSubscriptionInfo: IUpdateSubscriptionResponse | null;
  updateSubscriptionRequesting:boolean;
  updateSubscriptionSuccess:boolean;
  updateSubscriptionFailure:boolean;
  updateSubscriptionError:any;
  // Add Purchase
  addPurchaseInfo: IAddPurchaseResponse | null;
  addPurchaseRequesting: boolean;
  addPurchaseSuccess:boolean;
  addPurchaseFailure:boolean;
  addPurchaseError: any;
}

const initialState: ISubscriptionState = {
  // Subscription plans
  subscriptionPlans: null,
  getSubscriptionPlansRequesting: false,
  getSubscriptionPlansRequestSuccess: false,
  getSubscriptionPlansRequestFailure: false,
  getSubscriptionPlansError: null,
  // Submodule Features
  submoduleFeatures: null,
  getSubmoduleFeaturesRequesting: false,
  getSubmoduleFeaturesRequestSuccess: false,
  getSubmoduleFeaturesRequestFailure: false,
  getSubmoduleFeaturesRequestError: null,
  // Submodule list
  submodules: null,
  getSubmodulesRequesting: false,
  getSubmodulesRequestSuccess: false,
  getSubmodulesRequestFailure: false,
  getSubmodulesRequestError: null,
  // Get Subscription purchase list
  purchasedSubscriptions: null,
  getPurchasedSubscriptionsRequesting:false,
  getPurchasedSubscriptionsSuccess:false,
  getPurchasedSubscriptionsFailure:false,
  getPurchasedSubscriptionsError:null,
  // Update Subscription info with company_id
  updateSubscriptionInfo: null,
  updateSubscriptionRequesting:false,
  updateSubscriptionSuccess:false,
  updateSubscriptionFailure:false,
  updateSubscriptionError:null,
  // Add Purchase
  addPurchaseInfo: null,
  addPurchaseRequesting: false,
  addPurchaseSuccess:false,
  addPurchaseFailure:false,
  addPurchaseError: null,
};

export const SubscriptionSlice = createSlice({
  name: 'SubscriptionSlice',
  initialState: initialState,
  reducers: {
    // Subscription plans
    getSubscriptionPlansRequest: state => {
      state.getSubscriptionPlansRequesting = true;
    },
    getSubscriptionPlansSuccess: (
      state,
      action: PayloadAction<ISubscriptionPlanListResponse>,
    ) => {
      state.getSubscriptionPlansRequesting = false;
      state.getSubscriptionPlansRequestSuccess = true;
      state.subscriptionPlans = action.payload;
    },
    getSubscriptionPlansFailure: (state, action: PayloadAction<any>) => {
      state.getSubscriptionPlansRequesting = false;
      state.getSubscriptionPlansRequestSuccess = false;
      state.getSubscriptionPlansRequestFailure = true;
      state.getSubscriptionPlansError = action.payload;
    },
    // Submodule Features
    getSubmoduleFeaturesRequest: state => {
      state.getSubmoduleFeaturesRequesting = true;
    },
    getSubmoduleFeaturesSuccess: (
      state,
      action: PayloadAction<ISubmoduleFeatureListResponse>,
    ) => {
      state.getSubmoduleFeaturesRequesting = false;
      state.getSubmoduleFeaturesRequestSuccess = true;
      state.submoduleFeatures = action.payload;
    },
    getSubmoduleFeaturesFailure: (state, action: PayloadAction<any>) => {
      state.getSubmoduleFeaturesRequesting = false;
      state.getSubmoduleFeaturesRequestSuccess = false;
      state.getSubmoduleFeaturesRequestFailure = true;
      state.getSubmoduleFeaturesRequestError = action.payload;
    },
    // Submodule
    getSubmodulesRequest: state => {
      state.getSubmodulesRequesting = true;
    },
    getSubmodulesSuccess: (
      state,
      action: PayloadAction<ISubmoduleListResponse>,
    ) => {
      state.getSubmodulesRequesting = false;
      state.getSubmodulesRequestSuccess = true;
      state.submodules = action.payload;
    },
    getSubmodulesFailure: (state, action: PayloadAction<any>) => {
      state.getSubmodulesRequesting = false;
      state.getSubmodulesRequestSuccess = false;
      state.getSubmodulesRequestFailure = true;
      state.getSubmodulesRequestError = action.payload;
    },
    // Get Subscription purchase list
    getPurchasedSubscriptionRequest: (state, action: PayloadAction<IGetPurchasedSubscriptionParams>) => {
      state.getPurchasedSubscriptionsRequesting = true;
    },
    getPurchasedSubscriptionSuccess: (
      state,
      action: PayloadAction<IGetPurchasedSubscriptionListResponse>,
    ) => {
      state.getPurchasedSubscriptionsRequesting = false;
      state.getPurchasedSubscriptionsSuccess = true;
      state.purchasedSubscriptions = action.payload;
    },
    getPurchasedSubscriptionFailure: (state, action: PayloadAction<any>) => {
      state.getPurchasedSubscriptionsRequesting = false;
      state.getPurchasedSubscriptionsSuccess = false;
      state.getPurchasedSubscriptionsFailure = true;
      state.getPurchasedSubscriptionsError = action.payload;
    },
    resetGetPurchasedSubscriptionRequest: (state, action: PayloadAction<any>) => {
      state.getPurchasedSubscriptionsRequesting = false;
      state.getPurchasedSubscriptionsSuccess = false;
      state.getPurchasedSubscriptionsFailure = true;
      state.getPurchasedSubscriptionsError = null;
      state.purchasedSubscriptions = null;
    },
    // Update Subscription info with company_id
    updateSubscriptionRequest: (state, action: PayloadAction<IUpdateSubscriptionRequest>) => {
      state.updateSubscriptionRequesting = true;
    },
    updateSubscriptionSuccess: (
      state,
      action: PayloadAction<IUpdateSubscriptionResponse>,
    ) => {
      state.updateSubscriptionRequesting = false;
      state.updateSubscriptionSuccess = true;
      state.updateSubscriptionInfo = action.payload;
    },
    updateSubscriptionFailure: (state, action: PayloadAction<any>) => {
      state.updateSubscriptionRequesting = false;
      state.updateSubscriptionSuccess = false;
      state.updateSubscriptionFailure = true;
      state.updateSubscriptionError = action.payload;
    },
    resetUpdateSubscriptionRequest: (state) => {
      state.updateSubscriptionRequesting = false;
      state.updateSubscriptionSuccess = false;
      state.updateSubscriptionFailure = false;
      state.updateSubscriptionError = null;
      state.updateSubscriptionInfo = null;
    },
    // Add Purchase
    addPurchaseRequest: (state, action: PayloadAction<IAddPurchaseRequest>) => {
      state.addPurchaseRequesting = true;
    },
    addPurchaseSuccess: (
      state,
      action: PayloadAction<IAddPurchaseResponse>,
    ) => {
      state.addPurchaseRequesting = false;
      state.addPurchaseSuccess = true;
      state.addPurchaseInfo = action.payload;
    },
    addPurchaseFailure: (state, action: PayloadAction<any>) => {
      state.addPurchaseRequesting = false;
      state.addPurchaseSuccess = false;
      state.addPurchaseFailure = true;
      state.addPurchaseError = action.payload;
    },
    resetAddPurchaseRequest: (state) => {
      state.addPurchaseRequesting = false;
      state.addPurchaseSuccess = false;
      state.addPurchaseFailure = false;
      state.addPurchaseError = null;
      // state.addPurchaseInfo = null;
    },
  },
});

export default SubscriptionSlice.reducer;

export const {
  // Customers
  getSubscriptionPlansRequest,
  getSubscriptionPlansSuccess,
  getSubscriptionPlansFailure,
  // Submodule Features
  getSubmoduleFeaturesRequest,
  getSubmoduleFeaturesSuccess,
  getSubmoduleFeaturesFailure,
  // Submodules
  getSubmodulesRequest,
  getSubmodulesSuccess,
  getSubmodulesFailure,
  // Get Subscription purchase list
  getPurchasedSubscriptionRequest,
  getPurchasedSubscriptionSuccess,
  getPurchasedSubscriptionFailure,
  resetGetPurchasedSubscriptionRequest,
  // Update Subscription info with company_id
  updateSubscriptionRequest,
  updateSubscriptionSuccess,
  updateSubscriptionFailure,
  resetUpdateSubscriptionRequest,
  // Add Purchase
  addPurchaseRequest,
  addPurchaseSuccess,
  addPurchaseFailure,
  resetAddPurchaseRequest,
} = SubscriptionSlice.actions;
