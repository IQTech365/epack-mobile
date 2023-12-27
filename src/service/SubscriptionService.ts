import { AxiosResponse } from 'axios';
import {Api} from '../http/Api';
import { GET_SUBMODULE_FEATURES_ALL, GET_SUBMODULE_LIST, GET_SUBSCRIPTION_PLANS } from '../http/Endpoint';
import { ISubmoduleFeatureListResponse, ISubmoduleListResponse, ISubscriptionPlanListResponse } from '../interface/subscription/subscription';

// Image Upload
// export const GetCustomerListService = async (payload: ICustomerRequest): Promise<any> => {
//     const api = Api.getInstance();
//     return await api.post<ICustomerRequest, AxiosResponse<ICustomerListResponse>>(payload, GET_CUSTOMERS);
// }

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