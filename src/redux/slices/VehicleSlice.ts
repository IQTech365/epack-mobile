import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddLorryResponse } from '../../interface/vehicle/IAddLorryResponse';
import { IAddLorryRequest } from '../../interface/vehicle/IAddLorryRequest';
import { IAddDriverResponse } from '../../interface/vehicle/IAddDriverResponse';
import { IAddDriverRequest } from '../../interface/vehicle/IAddDriverRequest';
import { IAddBranchResponse } from '../../interface/myProfile/IAddbranchResponse';
import { IGetLorryResponse } from '../../interface/vehicle/IGetLorryResponse';
import { IGetDriverResponse } from '../../interface/vehicle/IGetDriverReuest';
import { IGetVehicleSizeResponse } from '../../interface/vehicle/IGetVehicleSizeResponse';


interface IVehicleState {
    // Get Lorry
    lorryData: IGetLorryResponse | null;
    getLorryRequesting: boolean;
    getLorrySuccess: boolean;
    getLorryFailure: boolean;
    getLorryError: any;

    // Add Lorry
    addLorryInfo: IAddLorryResponse | null;
    addLorryRequesting: boolean;
    addLorrySuccess: boolean;
    addLorryFailure: boolean;
    addLorryError: any;

    // Get Driver
    Drivers: IGetDriverResponse | null;
    getDriversRequesting: boolean;
    getDriversSuccess: boolean;
    getDriversFailure: boolean;
    getDriversError: any;

    // Add Driver
    addDriverInfo: IAddDriverResponse | null;
    addDriverRequesting: boolean;
    addDriveruccess: boolean;
    addDriverFailure: boolean;
    addDriverError: any;

    // Get Vehicle size
    vehicleSizeData: IGetVehicleSizeResponse | null;
    getVehicleSizeRequesting: boolean;
    getVehicleSizeSuccess: boolean;
    getVehicleSizeFailure: boolean;
    getVehicleSizeError: any;
}

const initialState: IVehicleState = {

    // Get lorry
    lorryData: null,
    getLorryRequesting: false,
    getLorrySuccess: false,
    getLorryFailure: false,
    getLorryError: null,

    // Add lorry
    addLorryInfo: null,
    addLorryRequesting: false,
    addLorrySuccess: false,
    addLorryFailure: false,
    addLorryError: null,

    // Get Driver
    Drivers: null,
    getDriversRequesting: false,
    getDriversSuccess: false,
    getDriversFailure: false,
    getDriversError: null,

    // Add Driver
    addDriverInfo: null,
    addDriverRequesting: false,
    addDriveruccess: false,
    addDriverFailure: false,
    addDriverError: null,

    // Get Vehicle size
    vehicleSizeData: null,
    getVehicleSizeRequesting: false,
    getVehicleSizeSuccess: false,
    getVehicleSizeFailure: false,
    getVehicleSizeError: null,
};

export const VehicleSlice = createSlice({
    name: 'VehicleSlice',
    initialState: initialState,
    reducers: {
        // Get Lorry
        getLorryRequest: (state, action: PayloadAction<string>) => {
            state.getLorryRequesting = true;
        },
        getLorrySuccess: (state, action: PayloadAction<IGetLorryResponse>) => {
            state.getLorryRequesting = false;
            state.getLorrySuccess = true;
            state.lorryData = action.payload;
        },
        getLorryFailure: (state, action: PayloadAction<any>) => {
            state.getLorryRequesting = false;
            state.getLorrySuccess = false;
            state.getLorryFailure = true;
            state.getLorryError = action.payload;
        },

        // Add Lorry
        addLorryRequest: (state, action: PayloadAction<IAddLorryRequest>) => {
            state.addLorryRequesting = true;
        },
        addLorrySuccess: (state, action: PayloadAction<IAddLorryResponse>) => {
            state.addLorryRequesting = false;
            state.addLorrySuccess = true;
            state.addLorryInfo = action.payload;
        },
        addLorryFailure: (state, action: PayloadAction<any>) => {
            state.addLorryRequesting = false;
            state.addLorrySuccess = false;
            state.addLorryFailure = true;
            state.addLorryError = action.payload;
        },
        restAddLorryRequest: (state, action: PayloadAction) => {
            state.addLorryRequesting = false;
            state.addLorrySuccess = false;
            state.addLorryFailure = false;
            state.addLorryError = null;
        },
        // Get Drivers
        getDriverRequest: (state, action: PayloadAction<string>) => {
            state.getDriversRequesting = true;
        },
        getDriverSuccess: (state, action: PayloadAction<IGetDriverResponse>) => {
            state.getDriversRequesting = false;
            state.getDriversSuccess = true;
            state.Drivers = action.payload;
        },
        getDriverFailure: (state, action: PayloadAction<any>) => {
            state.getDriversRequesting = false;
            state.getDriversSuccess = false;
            state.getDriversFailure = true;
            state.getDriversError = action.payload;
        },

        // Add Driver
        addDriverRequest: (state, action: PayloadAction<IAddDriverRequest>) => {
            state.addDriverRequesting = true;
        },
        addDriverSuccess: (state, action: PayloadAction<IAddBranchResponse>) => {
            state.addDriverRequesting = false;
            state.addDriveruccess = true;
            state.addDriverInfo = action.payload;
        },
        addDriverFailure: (state, action: PayloadAction<any>) => {
            state.addDriverRequesting = false;
            state.addDriveruccess = false;
            state.addDriverFailure = true;
            state.addDriverError = action.payload;
        },
        restaddDriverRequest: (state, action: PayloadAction) => {
            state.addDriverRequesting = false;
            state.addDriveruccess = false;
            state.addDriverFailure = false;
            state.addDriverError = null;
        },
        // Get Vehicle Size
        getVehicleSizeRequest: (state) => {
            state.getVehicleSizeRequesting = true;
        },
        getVehicleSizeSuccess: (state, action: PayloadAction<IGetVehicleSizeResponse>) => {
            state.getVehicleSizeRequesting = false;
            state.getVehicleSizeSuccess = true;
            state.vehicleSizeData = action.payload;
        },
        getVehicleSizeFailure: (state, action: PayloadAction<any>) => {
            state.getVehicleSizeRequesting = false;
            state.getVehicleSizeSuccess = false;
            state.getVehicleSizeFailure = true;
            state.getVehicleSizeError = action.payload;
        },
    },
});

export default VehicleSlice.reducer;

export const {
    //Get Lorry
    getLorryRequest,
    getLorrySuccess,
    getLorryFailure,
    //Add Lorry
    addLorryRequest,
    addLorrySuccess,
    addLorryFailure,
    restAddLorryRequest,

    //Get Driver
    getDriverRequest,
    getDriverSuccess,
    getDriverFailure,

    //Add Driver
    addDriverRequest,
    addDriverSuccess,
    addDriverFailure,
    restaddDriverRequest,

    //Get Vehicle Size
    getVehicleSizeRequest,
    getVehicleSizeSuccess,
    getVehicleSizeFailure

} = VehicleSlice.actions;
