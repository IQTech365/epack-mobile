import { AxiosResponse } from 'axios';
import {Api} from '../http/Api';
import { GET_ALL_DOCUMENTS_COUNT, GET_APP_SETTINGS, GET_BANKS, GET_BANK_LIST, GET_BANNERS, GET_DASHBOARD_DATA, GET_FLOOR_LIST, GET_IMPORTANT_LINKS, GET_INSURANCE_PERCENTAGE_LIST, GET_PACKING_TYPES, GET_PENDING_REGISTRATION, GET_SERIAL_NO_SUBMODULES, GET_SURVEY_CATEGORY, GET_SURVEY_MATERIAL, GET_TODAY_FOLLOWUPS, GET_TODAY_SHIFTING, GET_TODAY_SURVEY, GET_VEHICLE_ACCESSORIES, GET_VEHICLE_COLORS, GET_VEHICLE_COMPANIES, GET_VEHICLE_INSURANCE_COMPANY, GET_VEHICLE_MODELS, GET_VEHICLE_TYPES, IMAGE_UPLOAD, SEARCH_CUSTOMER, UPDATE_BILTY } from '../http/Endpoint';
import { IAllDocumentCountResponse, IAppSettingResponse, IBannerListResponse, ICustomersRequest, ICustomersResponse, IDashboardDataResponse, IDashboardPaylod, IFloorResponse, IGetBankListResponse, IImportantLinkResponse, IInsurancePercentageResponse, IPackingTypeResponse, IPendingRegistrationResponse, ISubmoduleResponse, ISurveyCategoryResponse, ISurveyMaterialResponse, ITodayFollowpsResponse, ITodayShiftingResponse, ITodaySurveyResponse, IVehicleAccessoryResponse, IVehicleColorResponse, IVehicleCompanyResponse, IVehicleInsuranceCompanyResponse, IVehicleModelResponse, IVehicleTypesResponse } from '../interface/common/common';
import { IUpdateBiltyResponse } from '../interface/order/ICreateBiltyResponse';

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

// Vehicle Insurance Company

export const GetVehicleInsuranceCompanyService = async (): Promise<IVehicleInsuranceCompanyResponse> => {
    const api = Api.getInstance();
    return await api.get<IVehicleInsuranceCompanyResponse>(GET_VEHICLE_INSURANCE_COMPANY);
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
export const GetDashboardService = async (payload:IDashboardPaylod): Promise<IDashboardDataResponse> => {
    const api = Api.getInstance();
    return await api.post<IDashboardPaylod, AxiosResponse<IDashboardDataResponse>>(payload, GET_DASHBOARD_DATA);
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

// Floors
export const GetPendingRegistrationService = async (payload:string): Promise<IPendingRegistrationResponse> => {
    const api = Api.getInstance();
    return await api.get<IPendingRegistrationResponse>(GET_PENDING_REGISTRATION(payload));
}

// Floors
export const GetBankListService = async (payload:string): Promise<IGetBankListResponse> => {
    const api = Api.getInstance();
    return await api.get<IGetBankListResponse>(GET_BANK_LIST);
}

// Today followup
export const GetTodayFollowups = async(payload:string): Promise<ITodayFollowpsResponse> =>{
    const api = Api.getInstance();
    return await api.get<ITodayFollowpsResponse>(GET_TODAY_FOLLOWUPS(payload));
}

// Today Survey

export const GetTodaySurvey = async(payload:string): Promise<ITodaySurveyResponse> =>{
    const api = Api.getInstance();
    return await api.get<ITodaySurveyResponse>(GET_TODAY_SURVEY(payload));
}

// Today Shifting

export const GetTodayShiftings = async(payload:string): Promise<ITodayShiftingResponse> =>{
    const api = Api.getInstance();
    return await api.get<ITodayShiftingResponse>(GET_TODAY_SHIFTING(payload));
}

// All Doc Count
export const GetAllDocCountService = async (payload:string): Promise<IAllDocumentCountResponse> => {
    const api = Api.getInstance();
    return await api.get<IAllDocumentCountResponse>(GET_ALL_DOCUMENTS_COUNT(payload));
}

// Important Links
export const GetImportantLinksService = async (): Promise<IImportantLinkResponse> => {
    const api = Api.getInstance();
    return await api.get<IImportantLinkResponse>(GET_IMPORTANT_LINKS);
}
// 
export const GetSurveyMaterialService = async (): Promise<ISurveyMaterialResponse> => {
    const api = Api.getInstance();
    return await api.get<ISurveyMaterialResponse>(GET_SURVEY_MATERIAL);
}

// 
export const GetSurveyCategoryService = async (): Promise<ISurveyCategoryResponse> => {
    const api = Api.getInstance();
    return await api.get<ISurveyCategoryResponse>(GET_SURVEY_CATEGORY);
}

