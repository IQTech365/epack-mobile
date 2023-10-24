import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddBranchRequest } from '../../interface/myProfile/IAddBranchRequest';
import { IAddBranchResponse } from '../../interface/myProfile/IAddbranchResponse';
import { IGetBranchsResponse } from '../../interface/myProfile/IGetBranchResponse';
import { IGetFranchiseResponse } from '../../interface/myProfile/IGetFranchiseResponse';
import { IAddFranchiseResponse } from '../../interface/myProfile/IAddFranchiseResponse';
import { IAddFranchiseRequest } from '../../interface/myProfile/IAddFranchiseRequest';

interface IMyProfileState {
    // Get Branch
    Branchs: IGetBranchsResponse | null;
    getBranchsRequesting: boolean;
    getBranchsSuccess: boolean;
    getBranchsFailure: boolean;
    getBranchsError: any;
    // Add Branch
    addBranchInfo: IAddBranchResponse | null;
    addBranchRequesting: boolean;
    addBranchSuccess: boolean;
    addBranchFailure: boolean;
    addBranchError: any;

    // Get Franchise
    Franchises: IGetFranchiseResponse | null;
    getFranchiseRequesting: boolean;
    getFranchiseSuccess: boolean;
    getFranchiseFailure: boolean;
    getFranchiseError: any;
    // Add Franchise
    addFranchiseInfo: IAddFranchiseResponse | null;
    addFranchiseRequesting: boolean;
    addFranchiseuccess: boolean;
    addFranchiseFailure: boolean;
    addFranchiseError: any;
}

const initialState: IMyProfileState = {

    // Get Branch
    Branchs: null,
    getBranchsRequesting: false,
    getBranchsSuccess: false,
    getBranchsFailure: false,
    getBranchsError: null,
    // Add Branch
    addBranchInfo: null,
    addBranchRequesting: false,
    addBranchSuccess: false,
    addBranchFailure: false,
    addBranchError: null,

     // Get Franchise
     Franchises: null,
     getFranchiseRequesting: false,
     getFranchiseSuccess: false,
     getFranchiseFailure: false,
     getFranchiseError: null,

     // Add Franchise
     addFranchiseInfo:  null,
     addFranchiseRequesting: false,
     addFranchiseuccess: false,
     addFranchiseFailure: false,
     addFranchiseError: null,
};

export const MyProfileSlice = createSlice({
    name: 'MyProfileSlice',
    initialState: initialState,
    reducers: {
        // Get branch
        getBranchsRequest: (state, action: PayloadAction<string>) => {
            state.getBranchsRequesting = true;
        },
        getBranchsSuccess: (state, action: PayloadAction<IGetBranchsResponse>) => {
            state.getBranchsRequesting = false;
            state.getBranchsSuccess = true;
            state.Branchs = action.payload;
        },
        getBranchFailure: (state, action: PayloadAction<any>) => {
            state.getBranchsRequesting = false;
            state.getBranchsSuccess = false;
            state.getBranchsFailure = true;
            state.getBranchsError = action.payload;
        },

        // Add Branch
        addBranchRequest: (state, action: PayloadAction<IAddBranchRequest>) => {
            state.addBranchRequesting = true;
        },
        addBranchSuccess: (state, action: PayloadAction<IAddBranchResponse>) => {
            state.addBranchRequesting = false;
            state.addBranchSuccess = true;
            state.addBranchInfo = action.payload;
        },
        addBranchFailure: (state, action: PayloadAction<any>) => {
            state.addBranchRequesting = false;
            state.addBranchSuccess = false;
            state.addBranchFailure = true;
            state.addBranchError = action.payload;
        },
        restAddBranchRequest: (state, action: PayloadAction) => {
            state.addBranchRequesting = false;
            state.addBranchSuccess = false;
            state.addBranchFailure = false;
            state.addBranchError = null;
        },
         // Get Franchise
         getFranchiseRequest: (state, action: PayloadAction<string>) => {
            state.getFranchiseRequesting = true;
        },
        getFranchiseSuccess: (state, action: PayloadAction<IGetFranchiseResponse>) => {
            state.getFranchiseRequesting = false;
            state.getFranchiseSuccess = true;
            state.Franchises = action.payload;
        },
        getFranchiseFailure: (state, action: PayloadAction<any>) => {
            state.getFranchiseRequesting = false;
            state.getFranchiseSuccess = false;
            state.getFranchiseFailure = true;
            state.getFranchiseError = action.payload;
        },

        // Add Franchise
        addFranchiseRequest: (state, action: PayloadAction<IAddFranchiseRequest>) => {
            state.addFranchiseRequesting = true;
        },
        addFranchiseSuccess: (state, action: PayloadAction<IAddBranchResponse>) => {
            state.addFranchiseRequesting = false;
            state.addFranchiseuccess = true;
            state.addFranchiseInfo = action.payload;
        },
        addFranchiseFailure: (state, action: PayloadAction<any>) => {
            state.addFranchiseRequesting = false;
            state.addFranchiseuccess = false;
            state.addFranchiseFailure = true;
            state.addFranchiseError = action.payload;
        },
        restAddFranchiseRequest: (state, action: PayloadAction) => {
            state.addFranchiseRequesting = false;
            state.addFranchiseuccess = false;
            state.addFranchiseFailure = false;
            state.addFranchiseError = null;
        },
    },
});

export default MyProfileSlice.reducer;

export const {
    //Get branch
    getBranchsRequest,
    getBranchsSuccess,
    getBranchFailure,
    //Add Branch
    addBranchRequest,
    addBranchSuccess,
    addBranchFailure,
    restAddBranchRequest,

    //Get Franchise
    getFranchiseRequest,
    getFranchiseSuccess,
    getFranchiseFailure,

    //Add Franchise
    addFranchiseRequest,
    addFranchiseSuccess,
    addFranchiseFailure,
    restAddFranchiseRequest
} = MyProfileSlice.actions;
