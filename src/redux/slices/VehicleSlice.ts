import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddLorryResponse } from '../../interface/vehicle/IAddLorryResponse';
import { IAddLorryRequest } from '../../interface/vehicle/IAddLorryRequest';
import { IAddDriverResponse } from '../../interface/vehicle/IAddDriverResponse';
import { IAddDriverRequest } from '../../interface/vehicle/IAddDriverRequest';
import { IAddBranchResponse } from '../../interface/myProfile/IAddbranchResponse';


interface IVehicleState {
    // Get Branch
    // Branchs: IGetBranchsResponse | null;
    // getBranchsRequesting: boolean;
    // getBranchsSuccess: boolean;
    // getBranchsFailure: boolean;
    // getBranchsError: any;
    // Add Lorry
    addLorryInfo: IAddLorryResponse | null;
    addLorryRequesting: boolean;
    addLorrySuccess: boolean;
    addLorryFailure: boolean;
    addLorryError: any;

    // Get Driver
    // Franchises: IGetFranchiseResponse | null;
    // getFranchiseRequesting: boolean;
    // getFranchiseSuccess: boolean;
    // getFranchiseFailure: boolean;
    // getFranchiseError: any;

    // Add Driver
    addDriverInfo: IAddDriverResponse | null;
    addDriverRequesting: boolean;
    addDriveruccess: boolean;
    addDriverFailure: boolean;
    addDriverError: any;
}

const initialState: IVehicleState = {

    // Get Branch
    // Branchs: null,
    // getBranchsRequesting: false,
    // getBranchsSuccess: false,
    // getBranchsFailure: false,
    // getBranchsError: null,
    // Add Branch
    addLorryInfo: null,
    addLorryRequesting: false,
    addLorrySuccess: false,
    addLorryFailure: false,
    addLorryError: null,

     // Get Franchise
    //  Franchises: null,
    //  getFranchiseRequesting: false,
    //  getFranchiseSuccess: false,
    //  getFranchiseFailure: false,
    //  getFranchiseError: null,

     // Add Driver
     addDriverInfo:  null,
     addDriverRequesting: false,
     addDriveruccess: false,
     addDriverFailure: false,
     addDriverError: null,
};

export const VehicleSlice = createSlice({
    name: 'VehicleSlice',
    initialState: initialState,
    reducers: {
        // Get branch
        // getBranchsRequest: (state, action: PayloadAction<string>) => {
        //     state.getBranchsRequesting = true;
        // },
        // getBranchsSuccess: (state, action: PayloadAction<IGetBranchsResponse>) => {
        //     state.getBranchsRequesting = false;
        //     state.getBranchsSuccess = true;
        //     state.Branchs = action.payload;
        // },
        // getBranchFailure: (state, action: PayloadAction<any>) => {
        //     state.getBranchsRequesting = false;
        //     state.getBranchsSuccess = false;
        //     state.getBranchsFailure = true;
        //     state.getBranchsError = action.payload;
        // },

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
         // Get Franchise
        //  getFranchiseRequest: (state, action: PayloadAction<string>) => {
        //     state.getFranchiseRequesting = true;
        // },
        // getFranchiseSuccess: (state, action: PayloadAction<IGetFranchiseResponse>) => {
        //     state.getFranchiseRequesting = false;
        //     state.getFranchiseSuccess = true;
        //     state.Franchises = action.payload;
        // },
        // getFranchiseFailure: (state, action: PayloadAction<any>) => {
        //     state.getFranchiseRequesting = false;
        //     state.getFranchiseSuccess = false;
        //     state.getFranchiseFailure = true;
        //     state.getFranchiseError = action.payload;
        // },

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
    },
});

export default VehicleSlice.reducer;

export const {
    //Get branch
    // getBranchsRequest,
    // getBranchsSuccess,
    // getBranchFailure,
    //Add Lorry
    addLorryRequest,
    addLorrySuccess,
    addLorryFailure,
    restAddLorryRequest,

    //Get Franchise
    // getFranchiseRequest,
    // getFranchiseSuccess,
    // getFranchiseFailure,

    //Add Driver
    addDriverRequest,
    addDriverSuccess,
    addDriverFailure,
    restaddDriverRequest
} = VehicleSlice.actions;
