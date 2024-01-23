import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICompanyRegistrationResponse} from '../../interface/companyRegistration/ICompanyRegistrationResponse';
import {ICompanyRegistrationRequest} from '../../interface/companyRegistration/ICompanyRegistrationRequest';
import { IGetCompaniesResponse } from '../../interface/companyRegistration/IGetCompaniesResponse';
import { ICompanyEditRequest, ICompanyEditResponse } from '../../interface/companyRegistration/ICompanyEditRequest';

interface ICompanyState {
  // Add Company
  addCompanyInfo: ICompanyRegistrationResponse | null;
  requesting: boolean;
  success: boolean;
  failure: boolean;
  error: any;
  // Get Companies
  companies: IGetCompaniesResponse | null;
  getCompaniesRequesting: boolean;
  getCompaniesSuccess: boolean;
  getCompaniesFailure: boolean;
  getCompaniesError: any;
  // Edit Company
  editCompanyInfo: ICompanyEditResponse | null;
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
  addCompanyInfo: null,
  requesting: false,
  success: false,
  failure: false,
  error: null,
  // Get Companies
  companies: null,
  getCompaniesRequesting: false,
  getCompaniesSuccess: false,
  getCompaniesFailure: false,
  getCompaniesError: null,
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
      state.addCompanyInfo = action.payload;
    },
    addCompanyFailure: (state, action: PayloadAction<any>) => {
      state.requesting = false;
      state.success = false;
      state.failure = true;
      state.error = action.payload;
    },
    resetAddCompanyRequest: (state) => {
      state.requesting = false;
      state.success = false;
      state.failure = false;
      state.error = null;
    },
    // Get Companies
    getCompaniesRequest: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.getCompaniesRequesting = true;
    },
    getCompaniesSuccess: (
      state,
      action: PayloadAction<IGetCompaniesResponse>,
    ) => {
      state.getCompaniesRequesting = false;
      state.getCompaniesSuccess = true;
      state.companies = action.payload;
    },
    getCompaniesFailure: (state, action: PayloadAction<any>) => {
      state.getCompaniesRequesting = false;
      state.getCompaniesSuccess = false;
      state.getCompaniesFailure = true;
      state.error = action.payload;
    },
    resetGetCompaniesRequest: (state) => {
      state.getCompaniesRequesting = false;
      state.getCompaniesSuccess = false;
      state.getCompaniesFailure = false;
      state.companies = null;
    },
    // Edit Company
    editCompanyRequest: (
      state,
      action: PayloadAction<ICompanyEditRequest>,
    ) => {
      state.editCompanyRequesting = true;
    },
    editCompanySuccess: (
      state,
      action: PayloadAction<ICompanyEditResponse>,
    ) => {
      state.editCompanyRequesting = false;
      state.editCompanySuccess = true;
      state.editCompanyInfo = action.payload;
    },
    editCompanyFailure: (state, action: PayloadAction<any>) => {
      state.editCompanyRequesting = false;
      state.editCompanySuccess = false;
      state.editCompanyFailure = true;
      state.editCompanyError = action.payload;
    },
    reseteditCompanyRequest:(
      state
    )=>{
      state.editCompanyRequesting = false;
      state.editCompanySuccess = false;
      state.editCompanyFailure = false;
      state.editCompanyError = null;
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
    resetUploadCompanyLogoRequest: (state) => {
      state.uploadLogoRequesting = false;
      state.uploadLogoSuccess = false;
      state.uploadLogoFailure = false;
      state.uploadLogoError = null;
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
    resetUploadSignatureRequest: (state) => {
      state.uploadSignatureRequesting = false;
      state.uploadSignatureSuccess = false;
      state.uploadSignatureFailure = false;
      state.uploadSignatureError = null;
    },
  },
});

export default CompanySlice.reducer;

export const {
  // Add Company
  addCompanyRequest,
  addCompanySuccess,
  addCompanyFailure,
  resetAddCompanyRequest,
  // Get Companies
  getCompaniesRequest,
  getCompaniesSuccess,
  getCompaniesFailure,
  resetGetCompaniesRequest,
  // Edit Company
  editCompanyRequest,
  editCompanySuccess,
  editCompanyFailure,
  reseteditCompanyRequest,
  // Delete Company
  deleteCompanyRequest,
  deleteCompanySuccess,
  deleteCompanyFailure,
  // Upload Company Logo
  uploadCompanyLogoRequest,
  uploadCompanyLogoSuccess,
  uploadCompanyLogoFailure,
  resetUploadCompanyLogoRequest,
  // Upload Signature
  uploadSignatureRequest,
  uploadSignatureSuccess,
  uploadSignatureFailure,
  resetUploadSignatureRequest,

} = CompanySlice.actions;
