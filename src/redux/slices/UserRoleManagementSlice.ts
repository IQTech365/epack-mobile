import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ICheckUsernameAvailablilityRequest, ICheckUsernameAvailablilityResponse } from '../../interface/setting/role/ICheckUsername';
import { IGetModulesResponse } from '../../interface/setting/role/IModule';
import { IAddUserRoleRequest, IAddUserRoleResponse, IRoleTypeResponse } from '../../interface/setting/role/IUserRole';

interface IUserRoleManagementState {
    // Add User Role
    addUserRoleNInfo: IAddUserRoleResponse | null;
    addUserRoleRequesting: boolean;
    addUserRoleSuccess: boolean;
    addUserRoleFailure: boolean;
    addUserRoleError: any;
    // Check Username
    checkUsernameAvailabilityInfo: ICheckUsernameAvailablilityResponse | null;
    checkUsernameAvailabilityRequesting: boolean;
    checkUsernameAvailabilitySuccess: boolean;
    checkUsernameAvailabilityFailure: boolean;
    checkUsernameAvailabilityError: any;
    // Get Role Types
    roleTypes: IRoleTypeResponse | null;
    getRoleTypesRequesting: boolean;
    getRoleTypeSuccess: boolean;
    getRoleTypeFailure: boolean;
    getRoleTypeError: any;
    // Get Modules
    modules: IGetModulesResponse | null;
    getModulesRequesting: boolean;
    getModulesSuccess: boolean;
    getModulesFailure: boolean;
    getModulesError: any;
}

const initialState: IUserRoleManagementState = {
    addUserRoleNInfo: null,
    addUserRoleRequesting: false,
    addUserRoleSuccess: false,
    addUserRoleFailure: false,
    addUserRoleError: null,
    // Check Username
    checkUsernameAvailabilityInfo: null,
    checkUsernameAvailabilityRequesting: false,
    checkUsernameAvailabilitySuccess: false,
    checkUsernameAvailabilityFailure: false,
    checkUsernameAvailabilityError: null,
    // Get Role Types
    roleTypes: null,
    getRoleTypesRequesting: false,
    getRoleTypeSuccess: false,
    getRoleTypeFailure: false,
    getRoleTypeError: null,
    // Get Modules
    modules: null,
    getModulesRequesting: false,
    getModulesSuccess: false,
    getModulesFailure: false,
    getModulesError: null,
   
}

export const UserRoleManagementSlice = createSlice({
    name: 'UserRoleManagementSlice',
    initialState: initialState,
    reducers: {
        addUserRoleRequest: (state, action: PayloadAction<IAddUserRoleRequest>) => {
            state.addUserRoleRequesting = true;
        },
        addUserRoleSuccess: (state, action: PayloadAction<IAddUserRoleResponse>) => {
            state.addUserRoleRequesting = false;
            state.addUserRoleSuccess = true;
            state.addUserRoleNInfo = action.payload;
        },
        addUserRoleFailure: (state, action: PayloadAction<any>) => {
            state.addUserRoleRequesting = false;
            state.addUserRoleSuccess = false;
            state.addUserRoleFailure = true;
            state.addUserRoleError = action.payload;
        },
        resetAddUserRoleRequest: (state) => {
            state.addUserRoleRequesting = false;
            state.addUserRoleSuccess = false;
            state.addUserRoleFailure = false;
            state.addUserRoleError = null;
        },
        // Check Username Availability
        checkUsernameAvailabilityRequest: (state, action: PayloadAction<ICheckUsernameAvailablilityRequest>) => {
            state.checkUsernameAvailabilityRequesting = true;
        },
        checkUsernameAvailabilitySuccess: (state, action: PayloadAction<ICheckUsernameAvailablilityResponse>) => {
            state.checkUsernameAvailabilityRequesting = false;
            state.checkUsernameAvailabilitySuccess = true;
            state.checkUsernameAvailabilityInfo = action.payload;
        },
        checkUsernameAvailabilityFailure: (state, action: PayloadAction<any>) => {
            state.checkUsernameAvailabilityRequesting = false;
            state.checkUsernameAvailabilitySuccess = false;
            state.checkUsernameAvailabilityFailure = true;
            state.checkUsernameAvailabilityError = action.payload;
        },
        resetCheckUsernameAvailabilityRequest: (state) => {
            state.checkUsernameAvailabilityRequesting = false;
            state.checkUsernameAvailabilitySuccess = false;
            state.checkUsernameAvailabilityFailure = false;
            state.checkUsernameAvailabilityError = null;
        },
        // Get Role Types
        // Check Username Availability
        getRoleTypesRequest: (state,) => {
            state.getRoleTypesRequesting = true;
        },
        getRoleTypesSuccess: (state, action: PayloadAction<IRoleTypeResponse>) => {
            state.getRoleTypesRequesting = false;
            state.getRoleTypeSuccess = true;
            state.roleTypes = action.payload;
        },
        getRoleTypesFailure: (state, action: PayloadAction<any>) => {
            state.getRoleTypesRequesting = false;
            state.getRoleTypeSuccess = false;
            state.getRoleTypeFailure = true;
            state.getRoleTypeError = action.payload;
        },
        resetGetRoleTypesRequest: (state) => {
            state.getRoleTypesRequesting = false;
            state.getRoleTypeSuccess = false;
            state.getRoleTypeFailure = false;
            state.getRoleTypeError = null;
        },
        // Get Modules
        getModulesRequest: (state) => {
            state.getModulesRequesting = true;
        },
        getModulesSuccess: (state, action: PayloadAction<IGetModulesResponse>) => {
            state.getModulesRequesting = false;
            state.getModulesSuccess = true;
            state.modules = action.payload;
        },
        getModulesFailure: (state, action: PayloadAction<any>) => {
            state.getModulesRequesting = false;
            state.getModulesSuccess = false;
            state.getModulesFailure = true;
            state.getModulesError = action.payload;
        },
    }
});

export default UserRoleManagementSlice.reducer;

export const {
    // Add Payment method
    addUserRoleRequest,
    addUserRoleSuccess,
    addUserRoleFailure,
    resetAddUserRoleRequest,
    // Check Username
    checkUsernameAvailabilityRequest,
    checkUsernameAvailabilitySuccess,
    checkUsernameAvailabilityFailure,
    resetCheckUsernameAvailabilityRequest,
    // Get Role Types
    getRoleTypesRequest,
    getRoleTypesSuccess,
    getRoleTypesFailure,
    resetGetRoleTypesRequest,
    // Get Modules
    getModulesRequest,
    getModulesSuccess,
    getModulesFailure,
} = UserRoleManagementSlice.actions;