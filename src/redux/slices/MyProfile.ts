import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddBranchRequest } from '../../interface/myProfile/IAddBranchRequest';
import { IAddBranchResponse } from '../../interface/myProfile/IAddbranchResponse';
import { IGetBranchsResponse } from '../../interface/myProfile/IGetBranchResponse';

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
    addBranchError: null
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
    restAddBranchRequest
} = MyProfileSlice.actions;
