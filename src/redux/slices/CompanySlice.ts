import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICompanyRegistrationResponse} from '../../interface/companyRegistration/ICompanyRegistrationResponse';
import {ICompanyRegistrationRequest} from '../../interface/companyRegistration/ICompanyRegistrationRequest';

interface ICompanyState {
  // Add Company
  companyInfo: ICompanyRegistrationResponse | null;
  requesting: boolean;
  success: boolean;
  failure: boolean;
  error: any;
  // Edit Company
  editCompanyInfo: ICompanyRegistrationResponse | null;
  editCompanyRequesting: boolean;
  editCompanySuccess: boolean;
  editCompanyFailure: boolean;
  editCompanyError: any;
  // Delete Company
  deleteCompanyInfo: ICompanyRegistrationResponse | null;
  deleteCompanyRequesting: boolean;
  deleteCompanySuccess: boolean;
  deleteCompanyFailure: boolean;
  deleteCompanyError: any;
  // Upload Company Logo
  uploadLogoInfo: any;
  uploadLogoRequesting: boolean;
  uploadLogoSuccess: boolean;
  uploadLogoFailure: boolean;
  uploadLogoError: any;
  // Upload Signature
  uploadSignatureInfo: any;
  uploadSignatureRequesting: boolean;
  uploadSignatureSuccess: boolean;
  uploadSignatureFailure: boolean;
  uploadSignatureError: any;
}

const initialState: ICompanyState = {
  // Add Company
  companyInfo: null,
  requesting: false,
  success: false,
  failure: false,
  error: null,
  // Edit Company
  editCompanyInfo: null,
  editCompanyRequesting: false,
  editCompanySuccess: false,
  editCompanyFailure: false,
  editCompanyError: null,
  // Delete Company
  deleteCompanyInfo: null,
  deleteCompanyRequesting: false,
  deleteCompanySuccess: false,
  deleteCompanyFailure: false,
  deleteCompanyError: null,
  // Upload Company Logo
  uploadLogoInfo: null,
  uploadLogoRequesting: false,
  uploadLogoSuccess: false,
  uploadLogoFailure: false,
  uploadLogoError: null,
  // Upload Signature
  uploadSignatureInfo: null,
  uploadSignatureRequesting: false,
  uploadSignatureSuccess: false,
  uploadSignatureFailure: false,
  uploadSignatureError: null,

};

export const CompanySlice = createSlice({
  name: 'CompanySlice',
  initialState: initialState,
  reducers: {
    // Add Company
    addCompanyRequest: (
      state,
      action: PayloadAction<ICompanyRegistrationRequest>,
    ) => {
      state.requesting = true;
    },
    addCompanySuccess: (
      state,
      action: PayloadAction<ICompanyRegistrationResponse>,
    ) => {
      state.requesting = false;
      state.success = true;
      state.companyInfo = action.payload;
    },
    addCompanyFailure: (state, action: PayloadAction<any>) => {
      state.requesting = false;
      state.success = false;
      state.failure = true;
      state.error = action.payload;
    },
    // Edit Company
    editCompanyRequest: (
      state,
      action: PayloadAction<ICompanyRegistrationRequest>,
    ) => {
      state.editCompanyRequesting = true;
    },
    editCompanySuccess: (
      state,
      action: PayloadAction<ICompanyRegistrationResponse>,
    ) => {
      state.editCompanyRequesting = false;
      state.editCompanySuccess = true;
      state.editCompanyInfo = action.payload;
    },
    editCompanyFailure: (state, action: PayloadAction<any>) => {
      state.editCompanyRequesting = false;
      state.deleteCompanySuccess = false;
      state.editCompanyFailure = true;
      state.editCompanyError = action.payload;
    },
    // Delete Company
    deleteCompanyRequest: (
      state,
      action: PayloadAction<ICompanyRegistrationRequest>,
    ) => {
      state.deleteCompanyRequesting = true;
    },
    deleteCompanySuccess: (
      state,
      action: PayloadAction<ICompanyRegistrationResponse>,
    ) => {
      state.deleteCompanyRequesting = false;
      state.deleteCompanySuccess = true;
      state.deleteCompanyInfo = action.payload;
    },
    deleteCompanyFailure: (state, action: PayloadAction<any>) => {
      state.deleteCompanyRequesting = false;
      state.deleteCompanySuccess = false;
      state.deleteCompanyFailure = true;
      state.deleteCompanyError = action.payload;
    },
    // Upload Company Logo
    uploadCompanyLogoRequest: (
      state,
      action: PayloadAction<any>,
    ) => {
      state.uploadLogoRequesting = true;
    },
    uploadCompanyLogoSuccess: (
      state,
      action: PayloadAction<any>,
    ) => {
      state.uploadLogoRequesting = false;
      state.uploadLogoSuccess = true;
      state.uploadLogoInfo = action.payload;
    },
    uploadCompanyLogoFailure: (state, action: PayloadAction<any>) => {
      state.uploadLogoRequesting = false;
      state.uploadLogoSuccess = false;
      state.uploadLogoFailure = true;
      state.uploadLogoError = action.payload;
    },
    // Upload Signature
    uploadSignatureRequest: (
      state,
      action: PayloadAction<any>,
    ) => {
      state.uploadSignatureRequesting = true;
    },
    uploadSignatureSuccess: (
      state,
      action: PayloadAction<any>,
    ) => {
      state.uploadSignatureRequesting = false;
      state.uploadSignatureSuccess = true;
      state.uploadSignatureInfo = action.payload;
    },
    uploadSignatureFailure: (state, action: PayloadAction<any>) => {
      state.uploadSignatureRequesting = false;
      state.uploadSignatureSuccess = false;
      state.uploadSignatureFailure = true;
      state.uploadSignatureError = action.payload;
    },
  },
});

export default CompanySlice.reducer;

export const {
  // Add Company
  addCompanyRequest,
  addCompanySuccess,
  addCompanyFailure,
  // Edit Company
  editCompanyRequest,
  editCompanySuccess,
  editCompanyFailure,
  // Delete Company
  deleteCompanyRequest,
  deleteCompanySuccess,
  deleteCompanyFailure,
  // Upload Company Logo
  uploadCompanyLogoRequest,
  uploadCompanyLogoSuccess,
  uploadCompanyLogoFailure,
  // Upload Signature
  uploadSignatureRequest,
  uploadSignatureSuccess,
  uploadSignatureFailure,

} = CompanySlice.actions;
