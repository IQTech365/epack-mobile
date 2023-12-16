import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  IPackingTypeResponse,
  IVehicleCompanyResponse,
  IVehicleColorResponse,
  IVehicleAccessoryResponse,
  IVehicleModelResponse,
} from '../../interface/common/common';

interface ICommonState {
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
}

const initialState: ICommonState = {
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
};

export const CommonSlice = createSlice({
  name: 'CommonSlice',
  initialState: initialState,
  reducers: {
    // Get PackingType
    getPackingTypesRequest: state => {
      state.packingTypesRequesting = true;
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
    // Vehicle Accessory
    // Vehicle Model
  },
});

export default CommonSlice.reducer;

export const {
  // Get PackingType
  getPackingTypesRequest,
  getPackingTypesSuccess,
  getPackingTypesFailure,
  // Vehicle Company
  // Vehicle Color
  // Vehicle Accessory
  // Vehicle Model
} = CommonSlice.actions;
