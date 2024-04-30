// Subscription Plans
export interface ISubscriptionFeature {
  featureId: string;
  featureName: string;
  moduleId: string;
  moduleName: string;
  subModuleId: string;
  subModuleName: string;
  qty: string;
}

export interface IPlan {
  duration: string;
  amount: string;
}

export interface ISubscriptionPlan {
  _id: string;
  subscriptionType: string;
  plans: IPlan[];
  duration: string;
  amount: number;
  isActive: boolean;
  isDeleted: boolean;
  list: ISubscriptionFeature[];
  created: string;
  __v: number;
  planFeatures: IPlanFeature[];
}

export interface ISubmoduleFeatureWithActions {
  moduleFeature: string;
  actions: string[];
}

export interface IPlanFeature {
  moduleName: string;
  moduleFeatures: ISubmoduleFeatureWithActions[];
}

export interface ISubscriptionPlanListResponse {
  data: ISubscriptionPlan[];
  status: number;
  error: boolean;
}

// Submodule Features
export interface ISubmoduleFeature {
  _id: string;
  submoduleId: string;
  feature: string;
  isActive: boolean;
  isDeleted: boolean;
  submoduleName: string;
  moduleName: string;
}

export interface ISubmoduleFeatureListResponse {
  data: ISubmoduleFeature[];
  status: number;
  error: boolean;
}

// Submodules
export interface ISubmodule {
  _id: string;
  moduleId: string;
  subModuleName: string;
  availableOnDocument: false;
  isActive: false;
  isDeleted: false;
  moduleName: string;
}

export interface ISubmoduleListResponse {
  data: ISubmodule[];
  status: number;
  error: boolean;
}

// Get Subscription purchase list
export interface IGetPurchasedSubscriptionParams {
  authId: string;
  companyId: string;
}

export interface IList {
  featureId: string;
  moduleId: string;
  subModuleId: string;
  qty: string;
}

export interface ISubscription {
  _id: string;
  subscriptionType: string;
  plans: IPlan[];
  isActive: boolean;
  isDeleted: boolean;
  list: IList[];
  created: string;
  __v: number;
}

export interface IPurchasedSubscription {
  _id: string;
  subscriptionId: string;
  authId: string;
  purchaseOrderId: string;
  subscriptionPlan: string;
  expiryDate: string;
  amountPaid: string;
  discountAmount: string;
  couponCode: string;
  status: string;
  createdDate: string;
  __v: number;
  companyId: string;
  subscription: ISubscription[];
}
export interface IGetPurchasedSubscriptionListResponse {
  data: IPurchasedSubscription[];
  status: number;
  error: boolean;
}

// Update Subscription info with company_id
export interface IUpdateSubscriptionParams {
  authId: string;
  purchaseId: string;
}
export interface IUpdateSubscriptionPayload {
  companyId: string;
}
export interface IUpdateSubscriptionRequest {
  params: IUpdateSubscriptionParams;
  payload: IUpdateSubscriptionPayload;
}
export interface IUpdateSubscriptionResponse {
  data: any;
  status: number;
  error: boolean;
}

// Razorpay Order
export interface IRazorPayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  offer_id: any;
  status: string;
  attempts: string;
  notes: any[];
  created_at: any;
}

export interface IRazorPayCreateOrderPayload {
  amount: number;
  currency: string;
}

export interface IRazorPayOrderResponse {
  data: IRazorPayOrder;
  status: number;
  error: boolean;
}

// Add Purchase
export interface IAddPurchaseRequest {
  purchaseOrderId: string;
  subscriptionId: string;
  authId: string;
  subscriptionPlan: string;
  amountPaid: string;
  expiryDate?: string;
  discountAmount: string;
  couponCode: string;
  status: string;
  companyId?: string;
}

// Add Purchase Result Data
export interface IAddPurchaseResultData {
  subscriptionId: string;
  authId: string;
  purchaseOrderId: string;
  subscriptionPlan: string;
  expiryDate: string;
  amountPaid: string;
  discountAmount: string;
  couponCode: string;
  status: string;
  _id: string;
  createdDate: string;
  __v: number;
}

export interface IPurchase {
  purchase: IAddPurchaseResultData;
}

export interface IAddPurchaseResponse {
  data: IPurchase;
  status: number;
  error: boolean;
}
