import { AxiosResponse } from 'axios';
import {Api} from '../http/Api';
import { GET_APP_SETTINGS, GET_BANNERS, GET_DASHBOARD_DATA, GET_FLOOR_LIST, GET_INSURANCE_PERCENTAGE_LIST, GET_PACKING_TYPES, GET_SERIAL_NO_SUBMODULES, GET_VEHICLE_ACCESSORIES, GET_VEHICLE_COLORS, GET_VEHICLE_COMPANIES, GET_VEHICLE_MODELS, GET_VEHICLE_TYPES, IMAGE_UPLOAD, SEARCH_CUSTOMER } from '../http/Endpoint';
import { IAppSettingResponse, IBannerListResponse, ICustomersRequest, ICustomersResponse, IDashboardDataResponse, IFloorResponse, IInsurancePercentageResponse, IPackingTypeResponse, ISubmoduleResponse, IVehicleAccessoryResponse, IVehicleColorResponse, IVehicleCompanyResponse, IVehicleModelResponse, IVehicleTypesResponse } from '../interface/common/common';

export const GetPackingTypesService = async (): Promise<IPackingTypeResponse> => {
    const api = Api.getInstance();
    return await api.get<IPackingTypeResponse>(GET_PACKING_TYPES);
}

// Vehicle Types
export const GetVehicleTypesService = async (): Promise<IVehicleTypesResponse> => {
    const api = Api.getInstance();
    return await api.get<IVehicleTypesResponse>(GET_VEHICLE_TYPES);
}

// Vehicle Companies
export const GetVehicleCompaniesService = async (): Promise<IVehicleCompanyResponse> => {
    const api = Api.getInstance();
    return await api.get<IVehicleCompanyResponse>(GET_VEHICLE_COMPANIES);
}

// Vehicle Colors
export const GetVehicleColorsService = async (): Promise<IVehicleColorResponse> => {
    const api = Api.getInstance();
    return await api.get<IVehicleColorResponse>(GET_VEHICLE_COLORS);
}

// Vehicle Accessories
export const GetVehicleAccessoriesService = async (): Promise<IVehicleAccessoryResponse> => {
    const api = Api.getInstance();
    return await api.get<IVehicleAccessoryResponse>(GET_VEHICLE_ACCESSORIES);
}

// Vehicle Models
export const GetVehicleModelsService = async (): Promise<IVehicleModelResponse> => {
    const api = Api.getInstance();
    return await api.get<IVehicleModelResponse>(GET_VEHICLE_MODELS);
}

// Submodules
export const GetSubmodulesService = async (): Promise<ISubmoduleResponse> => {
    const api = Api.getInstance();
    return await api.get<ISubmoduleResponse>(GET_SERIAL_NO_SUBMODULES);
}

// Submodules
export const GetAppSettingsService = async (companyId:string): Promise<IAppSettingResponse> => {
    const api = Api.getInstance();
    return await api.get<IAppSettingResponse>(GET_APP_SETTINGS(companyId));
}

// Customers
export const GetCustomersService = async (payload:ICustomersRequest): Promise<ICustomersResponse> => {
    const api = Api.getInstance();
    return await api.get<ICustomersResponse>(SEARCH_CUSTOMER(payload.companyId, payload.searchKey));
}

// Image Upload
export const ImageUploadService = async (payload: any): Promise<any> => {
    const api = Api.getInstance();
    return await api.post<any, AxiosResponse<any>>(payload, IMAGE_UPLOAD);
}

// Banners
export const GetBannersService = async (): Promise<IBannerListResponse> => {
    const api = Api.getInstance();
    return await api.get<IBannerListResponse>(GET_BANNERS);
}

// Dashboard
export const GetDashboardService = async (): Promise<IDashboardDataResponse> => {
    const api = Api.getInstance();
    return await api.get<IDashboardDataResponse>(GET_DASHBOARD_DATA);
}

// Insurance Percentages
export const GetInsurancePercentageListService = async (): Promise<IInsurancePercentageResponse> => {
    const api = Api.getInstance();
    return await api.get<IInsurancePercentageResponse>(GET_INSURANCE_PERCENTAGE_LIST);
}

// Floors
export const GetFloorListService = async (): Promise<IFloorResponse> => {
    const api = Api.getInstance();
    return await api.get<IFloorResponse>(GET_FLOOR_LIST);
}