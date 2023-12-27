// Subscription Plans
export interface ISubscriptionFeature {
  featureId: string;
  featureName:string;
  moduleId: string;
  moduleName:string;
  subModuleId: string;
  subModuleName:string;
  qty: string;
}

export interface ISubscriptionPlan {
  _id: string;
  subscriptionType: string;
  duration: string;
  amount: number;
  isActive: boolean;
  isDeleted: boolean;
  list: ISubscriptionFeature[];
  created: string;
  __v: number;
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
