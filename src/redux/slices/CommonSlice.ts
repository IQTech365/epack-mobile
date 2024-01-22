import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IPackingTypeResponse,
  IVehicleCompanyResponse,
  IVehicleColorResponse,
  IVehicleAccessoryResponse,
  IVehicleModelResponse,
  IVehicleTypesResponse,
  ISubmoduleResponse,
  IAppSettingResponse,
  ICustomersResponse,
  ICustomersRequest,
  IBannerListResponse,
  IDashboardDataResponse,
  IInsurancePercentageResponse,
  IFloorResponse,
  IDashboardPaylod,
} from '../../interface/common/common';

interface ICommonState {
  // Vehicle Type
  vehicleTypes: IVehicleTypesResponse | null;
  vehicleTypesRequesting:boolean;
  vehicleTypesRequestSuccess:boolean;
  vehicleTypesRequestFailure:boolean;
  vehicleTypesError:any;
  // Get PackingType
  packingTypes: IPackingTypeResponse | null;
  packingTypesRequesting: boolean;
  packingTypesRequestSuccess: boolean;
  packingTypesRequestFailure: boolean;
  error: any;
  // Vehicle Company
  vehicleCompanies: IVehicleCompanyResponse | null;
  vehicleCompaniesRequesting: boolean;
  vehicleCompaniesRequestSuccess: boolean;
  vehicleCompaniesRequestFailure: boolean;
  vehicleCompaniesError: any;
  // Vehicle Color
  vehicleColors: IVehicleColorResponse | null;
  vehicleColorsRequesting: boolean;
  vehicleColorsRequestSuccess: boolean;
  vehicleColorsRequestFailure: boolean;
  vehicleColorsError: any;
  // Vehicle Accessory
  vehicleAccessories: IVehicleAccessoryResponse | null;
  vehicleAccessoriesRequesting: boolean;
  vehicleAccessoriesRequestSuccess: boolean;
  vehicleAccessoriesRequestFailure: boolean;
  vehicleAccessoriesError: any;
  // Vehicle Model
  vehicleModels: IVehicleModelResponse | null;
  vehicleModelsRequesting: boolean;
  vehicleModelsRequestSuccess: boolean;
  vehicleModelsRequestFailure: boolean;
  vehicleModelsError: any;
  // SubModule
  submodules: ISubmoduleResponse | null;
  getSubmodulesRequesting:boolean;
  getSubmodulesSuccess:boolean;
  getSubmoduleFailure:boolean;
  getSubmoduleError:any;
  // App Serial No Settings
  appSettings: IAppSettingResponse | null;
  getAppSettingsRequesting: boolean;
  getAppSettingsSuccess:boolean;
  getAppSettingsFailure:boolean;
  getAppSettingsError:any;
  // Searched Customers
  customers: ICustomersResponse | null;
  getCustomersRequesting:boolean;
  getCustomersSuccess:boolean;
  getCustomersFailure:boolean;
  getCustomersError:any;
  // Upload Image
  uploadedImage:any;
  imageUploading:boolean;
  imageUploadSuccess:boolean;
  imageUploadFailure:boolean;
  imageUploadError:any;
  // Banners
  banners: IBannerListResponse | null;
  getBannersRequesting: boolean;
  getBannersSuccess: boolean;
  getBannersFailure: boolean;
  getBannersError: any;
  // Dashboard
  dashboard: IDashboardDataResponse | null;
  getDashboardDataRequesting: boolean;
  getDashboardDataSuccess:boolean;
  getDashboardDataFailure: boolean;
  getDashboardDataError: any;
  // Insurance Percentages
  insurancePercentages: IInsurancePercentageResponse | null;
  getInsurancePercentagesRequesting:boolean;
  getInsurancePercentagesSuccess:boolean;
  getInsurancePercentagesFailure:boolean;
  getInsurancePercentagesError: any;
  // Floors
  floors: IFloorResponse | null;
  getFloorsRequesting:boolean;
  getFloorsSuccess:boolean;
  getFloorsFailure:boolean;
  getFloorsError:any;
}

const initialState: ICommonState = {
  // Vehicle Type
  vehicleTypes: null,
  vehicleTypesRequesting:false,
  vehicleTypesRequestSuccess:false,
  vehicleTypesRequestFailure:false,
  vehicleTypesError:null,
  // Get PackingType
  packingTypes: null,
  packingTypesRequesting: false,
  packingTypesRequestSuccess: false,
  packingTypesRequestFailure: false,
  error: null,
  // Vehicle Company
  vehicleCompanies: null,
  vehicleCompaniesRequesting: false,
  vehicleCompaniesRequestSuccess: false,
  vehicleCompaniesRequestFailure: false,
  vehicleCompaniesError: null,
  // Vehicle Color
  vehicleColors: null,
  vehicleColorsRequesting: false,
  vehicleColorsRequestSuccess: false,
  vehicleColorsRequestFailure: false,
  vehicleColorsError: null,
  // Vehicle Accessory
  vehicleAccessories: null,
  vehicleAccessoriesRequesting: false,
  vehicleAccessoriesRequestSuccess: false,
  vehicleAccessoriesRequestFailure: false,
  vehicleAccessoriesError: null,
  // Vehicle Model
  vehicleModels: null,
  vehicleModelsRequesting: false,
  vehicleModelsRequestSuccess: false,
  vehicleModelsRequestFailure: false,
  vehicleModelsError: null,
  // SubModule
  submodules: null,
  getSubmodulesRequesting:false,
  getSubmodulesSuccess:false,
  getSubmoduleFailure:false,
  getSubmoduleError:null,
  // App Serial No Settings
  appSettings: null,
  getAppSettingsRequesting: false,
  getAppSettingsSuccess:false,
  getAppSettingsFailure:false,
  getAppSettingsError:null,
  // Searched Customers
  customers: null,
  getCustomersRequesting:false,
  getCustomersSuccess:false,
  getCustomersFailure:false,
  getCustomersError:null,
  // Upload Image
  uploadedImage:null,
  imageUploading:false,
  imageUploadSuccess:false,
  imageUploadFailure:false,
  imageUploadError:null,
  // Banners
  banners: null,
  getBannersRequesting: false,
  getBannersSuccess: false,
  getBannersFailure: false,
  getBannersError: null,
  // Dashboard
  dashboard: null,
  getDashboardDataRequesting: false,
  getDashboardDataSuccess:false,
  getDashboardDataFailure: false,
  getDashboardDataError: null,
  // Insurance Percentages
  insurancePercentages: null,
  getInsurancePercentagesRequesting:false,
  getInsurancePercentagesSuccess:false,
  getInsurancePercentagesFailure:false,
  getInsurancePercentagesError: null,
  // Floors
  floors: null,
  getFloorsRequesting:false,
  getFloorsSuccess:false,
  getFloorsFailure:false,
  getFloorsError:null,
};

export const CommonSlice = createSlice({
  name: 'CommonSlice',
  initialState: initialState,
  reducers: {
    // Vehilce Types
    getVehicleTypesRequest: state => {
      state.packingTypesRequesting = true;
    },
    getVehicleTypesSuccess: (
      state,
      action: PayloadAction<IVehicleTypesResponse>,
    ) => {
      state.vehicleTypesRequesting = false;
      state.vehicleTypesRequestSuccess = true;
      state.vehicleTypes = action.payload;
    },
    getVehicleTypesFailure: (state, action: PayloadAction<any>) => {
      state.vehicleTypesRequesting = false;
      state.vehicleTypesRequestSuccess = false;
      state.vehicleTypesRequestFailure = true;
      state.vehicleTypesError = action.payload;
    },
    // Get PackingType
    getPackingTypesRequest: state => {
      state.vehicleTypesRequesting = true;
    },
    getPackingTypesSuccess: (
      state,
      action: PayloadAction<IPackingTypeResponse>,
    ) => {
      state.packingTypesRequesting = false;
      state.packingTypesRequestSuccess = true;
      state.packingTypes = action.payload;
    },
    getPackingTypesFailure: (state, action: PayloadAction<any>) => {
      state.packingTypesRequesting = false;
      state.packingTypesRequestSuccess = false;
      state.packingTypesRequestFailure = true;
      state.error = action.payload;
    },
    // Vehicle Company
    getVehicleCompanyRequest: state => {
      state.vehicleCompaniesRequesting = true;
    },
    getVehicleCompanySuccess: (
      state,
      action: PayloadAction<IVehicleCompanyResponse>,
    ) => {
      state.vehicleCompaniesRequesting = false;
      state.vehicleCompaniesRequestSuccess = true;
      state.vehicleCompanies = action.payload;
    },
    getVehicleCompanyFailure: (state, action: PayloadAction<any>) => {
      state.vehicleCompaniesRequesting = false;
      state.vehicleCompaniesRequestSuccess = false;
      state.vehicleCompaniesRequestFailure = true;
      state.vehicleCompaniesError = action.payload;
    },
    // Vehicle Color
    getVehicleColorRequest: state => {
      state.vehicleColorsRequesting = true;
    },
    getVehicleColorSuccess: (
      state,
      action: PayloadAction<IVehicleColorResponse>,
    ) => {
      state.vehicleColorsRequesting = false;
      state.vehicleColorsRequestSuccess = true;
      state.vehicleColors = action.payload;
    },
    getVehicleColorFailure: (state, action: PayloadAction<any>) => {
      state.vehicleColorsRequesting = false;
      state.vehicleColorsRequestSuccess = false;
      state.vehicleColorsRequestFailure = true;
      state.vehicleColorsError = action.payload;
    },
    // Vehicle Accessory
    getVehicleAccessoriesRequest: state => {
      state.vehicleAccessoriesRequesting = true;
    },
    getVehicleAccessoriesSuccess: (
      state,
      action: PayloadAction<IVehicleAccessoryResponse>,
    ) => {
      state.vehicleAccessoriesRequesting = false;
      state.vehicleAccessoriesRequestSuccess = true;
      state.vehicleAccessories = action.payload;
    },
    getVehicleAccessoriesFailure: (state, action: PayloadAction<any>) => {
      state.vehicleAccessoriesRequesting = false;
      state.vehicleAccessoriesRequestSuccess = false;
      state.vehicleAccessoriesRequestFailure = true;
      state.vehicleAccessoriesError = action.payload;
    },
    // Vehicle Model
    getVehicleModelsRequest: state => {
      state.vehicleModelsRequesting = true;
    },
    getVehicleModelsSuccess: (
      state,
      action: PayloadAction<IVehicleModelResponse>,
    ) => {
      state.vehicleModelsRequesting = false;
      state.vehicleModelsRequestSuccess = true;
      state.vehicleModels = action.payload;
    },
    getVehicleModelsFailure: (state, action: PayloadAction<any>) => {
      state.vehicleModelsRequesting = false;
      state.vehicleModelsRequestSuccess = false;
      state.vehicleModelsRequestFailure = true;
      state.vehicleModelsError = action.payload;
    },
    // Submodule
    getSubmoduleRequest: state => {
      state.getSubmodulesRequesting = true;
    },
    getSubmoduleSuccess: (
      state,
      action: PayloadAction<ISubmoduleResponse>,
    ) => {
      state.getSubmodulesRequesting = false;
      state.getSubmodulesSuccess = true;
      state.submodules = action.payload;
    },
    getSubmoduleFailure: (state, action: PayloadAction<any>) => {
      state.getSubmodulesRequesting = false;
      state.getSubmodulesSuccess = false;
      state.getSubmoduleFailure = true;
      state.getSubmoduleError = action.payload;
    },
    // App Serial No Settings
    getAppSettingsRequest: (state, action: PayloadAction<string>) => {
      state.getAppSettingsRequesting = true;
    },
    getAppSettingsSuccess: (
      state,
      action: PayloadAction<IAppSettingResponse>,
    ) => {
      state.getAppSettingsRequesting = false;
      state.getAppSettingsSuccess = true;
      state.appSettings = action.payload;
    },
    getAppSettingsFailure: (state, action: PayloadAction<any>) => {
      state.getAppSettingsRequesting = false;
      state.getAppSettingsSuccess = false;
      state.getAppSettingsFailure = true;
      state.getAppSettingsError = action.payload;
    },
    // Customers
    getCustomersRequest: (state, action: PayloadAction<ICustomersRequest>) => {
      state.getCustomersRequesting = true;
    },
    getCustomersSuccess: (
      state,
      action: PayloadAction<ICustomersResponse>,
    ) => {
      state.getCustomersRequesting = false;
      state.getCustomersSuccess = true;
      state.customers = action.payload;
    },
    getCustomersFailure: (state, action: PayloadAction<any>) => {
      state.getCustomersRequesting = false;
      state.getCustomersSuccess = false;
      state.getCustomersFailure = true;
      state.getCustomersError = action.payload;
    },
    resetGetCustomersRequest: (state) => {
      state.getCustomersRequesting = false;
      state.getCustomersSuccess = false;
      state.getCustomersFailure = false;
      state.getCustomersError = null;
      state.customers = null;
    },
    // Image Upload
    imageUploadRequest: (state, action: PayloadAction<any>) => {
      state.imageUploading = true;
    },
    imageUploadSuccess: (
      state,
      action: PayloadAction<any>,
    ) => {
      state.imageUploading = false;
      state.imageUploadSuccess = true;
      state.uploadedImage = action.payload;
    },
    imageUploadFailure: (state, action: PayloadAction<any>) => {
      state.imageUploading = false;
      state.imageUploadSuccess = false;
      state.imageUploadFailure = true;
      state.imageUploadError = action.payload;
    },
    resetImageUploadRequest: (state) => {
      state.imageUploading = false;
      state.imageUploadSuccess = false;
      state.imageUploadFailure = false;
      state.imageUploadError = null;
      state.uploadedImage = null;
    },
    // Banners
    getBannersRequest: (state) => {
      state.getBannersRequesting = true;
    },
    getBannersSuccess: (
      state,
      action: PayloadAction<IBannerListResponse>,
    ) => {
      state.getBannersRequesting = false;
      state.getBannersSuccess = true;
      state.banners = action.payload;
    },
    getBannersFailure: (state, action: PayloadAction<any>) => {
      state.getBannersRequesting = false;
      state.getBannersSuccess = false;
      state.getBannersFailure = true;
      state.getBannersError = action.payload;
    },
    // Dashbaord
    getDashboardDataRequest: (state, action: PayloadAction<IDashboardPaylod>) => {
      state.getDashboardDataRequesting = true;
    },
    getDashboardDataSuccess: (
      state,
      action: PayloadAction<IDashboardDataResponse>,
    ) => {
      state.getDashboardDataRequesting = false;
      state.getDashboardDataSuccess = true;
      state.dashboard = action.payload;
    },
    getDashboardDataFailure: (state, action: PayloadAction<any>) => {
      state.getDashboardDataRequesting = false;
      state.getDashboardDataSuccess = false;
      state.getDashboardDataFailure = true;
      state.getDashboardDataError = action.payload;
    },
    // Insurance Percentages
    getInsurancePercentagesRequest: state => {
      state.getInsurancePercentagesRequesting = true;
    },
    getInsurancePercentagesSuccess: (
      state,
      action: PayloadAction<IInsurancePercentageResponse>,
    ) => {
      state.getInsurancePercentagesRequesting = false;
      state.getInsurancePercentagesSuccess = true;
      state.insurancePercentages = action.payload;
    },
    getInsurancePercentagesFailure: (state, action: PayloadAction<any>) => {
      state.getInsurancePercentagesRequesting = false;
      state.getInsurancePercentagesSuccess = false;
      state.getInsurancePercentagesFailure = true;
      state.getInsurancePercentagesError = action.payload;
    },
    // Floors
    getFloorsRequest: state => {
      state.getFloorsRequesting = true;
    },
    getFloorsSuccess: (
      state,
      action: PayloadAction<IFloorResponse>,
    ) => {
      state.getFloorsRequesting = false;
      state.getFloorsSuccess = true;
      state.floors = action.payload;
    },
    getFloorsFailure: (state, action: PayloadAction<any>) => {
      state.getFloorsRequesting = false;
      state.getFloorsSuccess = false;
      state.getFloorsFailure = true;
      state.getFloorsError = action.payload;
    },
  },
});

export default CommonSlice.reducer;

export const {
  // Vehicle Types
  getVehicleTypesRequest,
  getVehicleTypesSuccess,
  getVehicleTypesFailure,
  // Get PackingType
  getPackingTypesRequest,
  getPackingTypesSuccess,
  getPackingTypesFailure,
  // Vehicle Company
  getVehicleCompanyRequest,
  getVehicleCompanySuccess,
  getVehicleCompanyFailure,
  // Vehicle Color
  getVehicleColorRequest,
  getVehicleColorSuccess,
  getVehicleColorFailure,
  // Vehicle Accessory
  getVehicleAccessoriesRequest,
  getVehicleAccessoriesSuccess,
  getVehicleAccessoriesFailure,
  // Vehicle Model
  getVehicleModelsRequest,
  getVehicleModelsSuccess,
  getVehicleModelsFailure,
  // Submodule
  getSubmoduleRequest,
  getSubmoduleSuccess,
  getSubmoduleFailure,
  // App Serial No Settings
  getAppSettingsRequest,
  getAppSettingsSuccess,
  getAppSettingsFailure,
  // Customers
  getCustomersRequest,
  getCustomersSuccess,
  getCustomersFailure,
  resetGetCustomersRequest,
  // Image Upload
  imageUploadRequest,
  imageUploadSuccess,
  imageUploadFailure,
  resetImageUploadRequest,
  // Banners
  getBannersRequest,
  getBannersSuccess,
  getBannersFailure,
  // Dashboard
  getDashboardDataRequest,
  getDashboardDataSuccess,
  getDashboardDataFailure,
  // Insurance Percentages
  getInsurancePercentagesRequest,
  getInsurancePercentagesSuccess,
  getInsurancePercentagesFailure,
  // Floors
  getFloorsRequest,
  getFloorsSuccess,
  getFloorsFailure,
} = CommonSlice.actions;

