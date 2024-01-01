import { AxiosResponse } from 'axios';
import {Api} from '../http/Api';
import { GET_SUBMODULE_FEATURES_ALL, GET_SUBMODULE_LIST, GET_SUBSCRIPTION_PLANS, GET_SUBSCRIPTION_PURCHASE_LIST, UPDATE_SUBSCRIPTION_INFO } from '../http/Endpoint';
import { IGetPurchasedSubscriptionListResponse, IGetPurchasedSubscriptionParams, IRazorPayOrderSuccessResponse, ISubmoduleFeatureListResponse, ISubmoduleListResponse, ISubscriptionPlanListResponse, IUpdateSubscriptionPayload, IUpdateSubscriptionRequest, IUpdateSubscriptionResponse } from '../interface/subscription/subscription';

// Subscription Plans
export const GetSubscriptionPlanListService = async (): Promise<ISubscriptionPlanListResponse> => {
    const api = Api.getInstance();
    return await api.get<ISubscriptionPlanListResponse>(GET_SUBSCRIPTION_PLANS);
}

// Submodule Features
export const GetSubmoduleFeaturesListService = async (): Promise<ISubmoduleFeatureListResponse> => {
    const api = Api.getInstance();
    return await api.get<ISubmoduleFeatureListResponse>(GET_SUBMODULE_FEATURES_ALL);
}

// Submodules
export const GetSubmoduleListService = async (): Promise<ISubmoduleListResponse> => {
    const api = Api.getInstance();
    return await api.get<ISubmoduleListResponse>(GET_SUBMODULE_LIST);
}

// Get Subscription purchase list
export const GetPurchasedSubscriptionListService = async (params:IGetPurchasedSubscriptionParams): Promise<IGetPurchasedSubscriptionListResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetPurchasedSubscriptionListResponse>(GET_SUBSCRIPTION_PURCHASE_LIST(params.authId, params.companyId));
}
// Update Subscription info with company_id
export const UpdateSubscriptionInfoService = async (req: IUpdateSubscriptionRequest): Promise<any> => {
    const api = Api.getInstance();
    const {params, payload} = req;
    const {authId, purchaseId} = params;
    return await api.post<IUpdateSubscriptionPayload, AxiosResponse<IUpdateSubscriptionResponse>>(payload, UPDATE_SUBSCRIPTION_INFO(authId, purchaseId));
}

// Create Order on Server before `payment` (RazorPay)
export const createRazorpayOrder = async (amount:number):Promise<IRazorPayOrderSuccessResponse> => {
    const api = Api.getInstance();
    return await api.createOrder(amount);
}