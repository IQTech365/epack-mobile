import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ICompanyRegistrationResponse} from '../../interface/companyRegistration/ICompanyRegistrationResponse';
import {IAddEnquiryResponse} from '../../interface/enquiry/IAddEnquiryResponse';
import {IAddEnquiryRequest} from '../../interface/enquiry/IAddEnquiryRequest';
import {IAddFollowupResponse} from '../../interface/enquiry/IAddFollowupResponse';
import {IGetEnquiriesResponse} from '../../interface/enquiry/IGetEnquiriesResponse';
import { IGetFollowupsResponse } from '../../interface/enquiry/IGetFollowupsResponse';
import { IAddFollowupRequest } from '../../interface/enquiry/IAddFollowupRequest';
import { IAddSurveyResponse } from '../../interface/enquiry/IAddSurveyResponse';
import { IAddSurveyRequest } from '../../interface/enquiry/IAddSurveyRequest';

interface IEnquiryState {
  // Get Enquiries
  enquiries: IGetEnquiriesResponse | null;
  getEnquiriesRequesting: boolean;
  getEnquiriesSuccess: boolean;
  getEnquiriesFailure: boolean;
  getEnquiriesError: any;
  // Add Enquiry
  addEnquiryInfo: IAddEnquiryResponse | null;
  addEnquiryRequesting: boolean;
  addEnquirySuccess: boolean;
  addEnquiryFailure: boolean;
  addEnquiryError: any;
  // Edit Enquiry
  editEnquiryInfo: IAddEnquiryResponse | null;
  editEnquiryRequesting: boolean;
  editEnquirySuccess: boolean;
  editEnquiryFailure: boolean;
  editEnquiryError: any;
  // Delete Enquiry
  deleteEnquiryInfo: ICompanyRegistrationResponse | null;
  deleteEnquiryRequesting: boolean;
  deleteEnquirySuccess: boolean;
  deleteEnquiryFailure: boolean;
  deleteEnquiryError: any;
  // Add Followup
  addFollowupInfo: IAddFollowupResponse | null;
  addFollowupRequesting: boolean;
  addFollowupSuccess: boolean;
  addFollowupFailure: boolean;
  addFollowupError: any;
  // Get Followups
  followups: IGetFollowupsResponse | null;
  getFollowupsRequesting: boolean;
  getFollowupsSuccess: boolean;
  getFollowupsFailure: boolean;
  getFollowupsError: any;
  // Add Survey
  addSurveyInfo: IAddSurveyResponse | null;
  addSurveyRequesting: boolean;
  addSurveySuccess: boolean;
  addSurveyFailure: boolean;
  addSurveyError: any;
}

const initialState: IEnquiryState = {
  // Get Enquiries
  enquiries: null,
  getEnquiriesRequesting: false,
  getEnquiriesSuccess: false,
  getEnquiriesFailure: false,
  getEnquiriesError: null,
  // Add Enquiry
  addEnquiryInfo: null,
  addEnquiryRequesting: false,
  addEnquirySuccess: false,
  addEnquiryFailure: false,
  addEnquiryError: null,
  // Edit Enquiry
  editEnquiryInfo: null,
  editEnquiryRequesting: false,
  editEnquirySuccess: false,
  editEnquiryFailure: false,
  editEnquiryError: null,
  // Delete Enquiry
  deleteEnquiryInfo: null,
  deleteEnquiryRequesting: false,
  deleteEnquirySuccess: false,
  deleteEnquiryFailure: false,
  deleteEnquiryError: null,
  // Add Followup
  addFollowupInfo: null,
  addFollowupRequesting: false,
  addFollowupSuccess: false,
  addFollowupFailure: false,
  addFollowupError: null,
  // Get Followups
  followups: null,
  getFollowupsRequesting: false,
  getFollowupsSuccess: false,
  getFollowupsFailure: false,
  getFollowupsError: null,
  // Add Survey
  addSurveyInfo: null,
  addSurveyRequesting: false,
  addSurveySuccess: false,
  addSurveyFailure: false,
  addSurveyError: null,
};

export const EnquirySlice = createSlice({
  name: 'EnquirySlice',
  initialState: initialState,
  reducers: {
    // Get Enquiries
    getEnquiriesRequest: (state, action: PayloadAction<string>) => {
      state.getEnquiriesRequesting = true;
    },
    getEnquiriesSuccess: (state, action: PayloadAction<IGetEnquiriesResponse>) => {
      state.getEnquiriesRequesting = false;
      state.getEnquiriesSuccess = true;
      state.enquiries = action.payload;
    },
    getEnquiriesFailure: (state, action: PayloadAction<any>) => {
      state.getEnquiriesRequesting = false;
      state.getEnquiriesSuccess = false;
      state.getEnquiriesFailure = true;
      state.getEnquiriesError = action.payload;
    },
    // Add Enquiry
    addEnquiryRequest: (state, action: PayloadAction<IAddEnquiryRequest>) => {
      state.addEnquiryRequesting = true;
    },
    addEnquirySuccess: (state, action: PayloadAction<IAddEnquiryResponse>) => {
      state.addEnquiryRequesting = false;
      state.addEnquirySuccess = true;
      state.addEnquiryInfo = action.payload;
    },
    addEnquiryFailure: (state, action: PayloadAction<any>) => {
      state.addEnquiryRequesting = false;
      state.addEnquirySuccess = false;
      state.addEnquiryFailure = true;
      state.addEnquiryError = action.payload;
    },
    resetAddEnquiryRequest: (state, action: PayloadAction) => {
      state.addEnquiryRequesting = false;
      state.addEnquirySuccess = false;
      state.addEnquiryFailure = false;
      state.addEnquiryInfo = null;
      state.addEnquiryError = null;
    },
    // Edit Enquiry
    editEnquiryRequest: (
      state,
      action: PayloadAction<IAddEnquiryRequest>,
    ) => {
      state.editEnquiryRequesting = true;
    },
    editEnquirySuccess: (
      state,
      action: PayloadAction<IAddEnquiryResponse>,
    ) => {
      state.editEnquiryRequesting = false;
      state.editEnquirySuccess = true;
      state.editEnquiryInfo = action.payload;
    },
    editEnquiryFailure: (state, action: PayloadAction<any>) => {
      state.editEnquiryRequesting = false;
      state.deleteEnquirySuccess = false;
      state.editEnquiryFailure = true;
      state.editEnquiryError = action.payload;
    },
    // Delete Enquiry
    deleteEnquiryRequest: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.deleteEnquiryRequesting = true;
    },
    deleteEnquirySuccess: (
      state,
      action: PayloadAction<ICompanyRegistrationResponse>,
    ) => {
      state.deleteEnquiryRequesting = false;
      state.deleteEnquirySuccess = true;
      state.deleteEnquiryInfo = action.payload;
    },
    deleteEnquiryFailure: (state, action: PayloadAction<any>) => {
      state.deleteEnquiryRequesting = false;
      state.deleteEnquirySuccess = false;
      state.deleteEnquiryFailure = true;
      state.deleteEnquiryError = action.payload;
    },
    // Add Followup
    addFollowupRequest: (
      state,
      action: PayloadAction<IAddFollowupRequest>,
    ) => {
      state.addFollowupRequesting = true;
    },
    addFollowupSuccess: (
      state,
      action: PayloadAction<IAddFollowupResponse>,
    ) => {
      state.addFollowupRequesting = false;
      state.addFollowupSuccess = true;
      state.addFollowupInfo = action.payload;
    },
    addFollowupFailure: (state, action: PayloadAction<any>) => {
      state.addFollowupRequesting = false;
      state.addFollowupSuccess = false;
      state.addFollowupFailure = true;
      state.addFollowupError = action.payload;
    },
    resetAddFollowupRequest: (state, action: PayloadAction) => {
      state.addFollowupRequesting = false;
      state.addFollowupSuccess = false;
      state.addFollowupFailure = false;
      state.addFollowupError = null;
      state.addEnquiryInfo = null;
    },
    // Get Followups
    getFollowupsRequest: (state, action: PayloadAction<string>) => {
      state.getFollowupsRequesting = true;
    },
    getFollowupsSuccess: (state, action: PayloadAction<IGetFollowupsResponse>) => {
      state.getFollowupsRequesting = false;
      state.getFollowupsSuccess = true;
      state.followups = action.payload;
    },
    getFollowupsFailure: (state, action: PayloadAction<any>) => {
      state.getFollowupsRequesting = false;
      state.getFollowupsSuccess = false;
      state.getFollowupsFailure = true;
      state.getFollowupsError = action.payload;
    },
    // Add Survey
    addSurveyRequest: (
      state,
      action: PayloadAction<IAddSurveyRequest>,
    ) => {
      state.addSurveyRequesting = true;
    },
    addSurveySuccess: (
      state,
      action: PayloadAction<IAddSurveyResponse>,
    ) => {
      state.addSurveyRequesting = false;
      state.addSurveySuccess = true;
      state.addSurveyInfo = action.payload;
    },
    addSurveyFailure: (state, action: PayloadAction<any>) => {
      state.addSurveyRequesting = false;
      state.addSurveySuccess = false;
      state.addSurveyFailure = true;
      state.addSurveyError = action.payload;
    },
  },
});

export default EnquirySlice.reducer;

export const {
  // Get Enquiries
  getEnquiriesRequest,
  getEnquiriesSuccess,
  getEnquiriesFailure,
  // Add Enquiry
  addEnquiryRequest,
  addEnquirySuccess,
  addEnquiryFailure,
  resetAddEnquiryRequest,
  // Edit Enquiry
  editEnquiryRequest,
  editEnquirySuccess,
  editEnquiryFailure,
  // Delete Enquiry
  deleteEnquiryRequest,
  deleteEnquirySuccess,
  deleteEnquiryFailure,
  // Add Followup
  addFollowupRequest,
  addFollowupSuccess,
  addFollowupFailure,
  resetAddFollowupRequest,
  // Get Followups
  getFollowupsRequest,
  getFollowupsSuccess,
  getFollowupsFailure,
  // Add Survey
  addSurveyRequest,
  addSurveySuccess,
  addSurveyFailure,
} = EnquirySlice.actions;
