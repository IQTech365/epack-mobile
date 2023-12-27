import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  ISubmoduleFeatureListResponse,
  ISubmoduleListResponse,
  ISubscriptionPlanListResponse,
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
} = SubscriptionSlice.actions;
