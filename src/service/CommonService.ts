import {Api} from '../http/Api';
import { GET_PACKING_TYPES, GET_VEHICLE_ACCESSORIES, GET_VEHICLE_COLORS, GET_VEHICLE_COMPANIES, GET_VEHICLE_MODELS, GET_VEHICLE_TYPES } from '../http/Endpoint';
import { IPackingTypeResponse, IVehicleAccessoryResponse, IVehicleColorResponse, IVehicleCompanyResponse, IVehicleModelResponse, IVehicleTypesResponse } from '../interface/common/common';

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

