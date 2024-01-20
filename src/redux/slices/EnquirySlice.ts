import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICompanyRegistrationResponse } from '../../interface/companyRegistration/ICompanyRegistrationResponse';
import { IAddEnquiryResponse } from '../../interface/enquiry/IAddEnquiryResponse';
import { IAddEnquiryRequest } from '../../interface/enquiry/IAddEnquiryRequest';
import { IAddFollowupResponse } from '../../interface/enquiry/IAddFollowupResponse';
import { IGetEnquiriesResponse } from '../../interface/enquiry/IGetEnquiriesResponse';
import { IGetFollowupsResponse } from '../../interface/enquiry/IGetFollowupsResponse';
import { IAddFollowupRequest } from '../../interface/enquiry/IAddFollowupRequest';
import { IAddSurveyResponse } from '../../interface/enquiry/IAddSurveyResponse';
import { IAddSurveyRequest } from '../../interface/enquiry/IAddSurveyRequest';
import { IGetSurveyListResponse } from '../../interface/enquiry/IGetSurveyListResponse';
import { IUpdateEnquiryStatusResponse } from '../../interface/enquiry/IUpdateEnquiryStatusResponse';
import { IUpdateEnquiryRequest } from '../../interface/enquiry/IupdateEnquiryRequest';
import { IUpdateAddressResponse } from '../../interface/order/IUpdateAddressResponse';
import { IDropAddress, IPickupAddress } from '../../interface/order/IUpdateAddressRequest';
import { IUpdateCompanyContactDetailRequest, IUpdateContactDetailResponse, IUpdateIndividualContactDetailRequest } from '../../interface/order/IUpdateContactDetails';
import { IUpdateShiftingInfoRequest, IUpdateShiftingInfoResponse } from '../../interface/enquiry/IUpdateShiftingInfo';
import { IUpdateEnquiryStatusRequest } from '../../interface/enquiry/IUpdateEnquiryStatusRequest';
import { IAddSurveyItemRequest } from '../../interface/enquiry/IAddSurveyItemRequest';
import { IGetSurveyItemListResponse, IGetSurvyeItemListRequestPayload } from '../../interface/enquiry/IGetSurveyItemListResponse';
import { ISingleEnquiryResponse } from '../../interface/enquiry/ISingleEnquiryResponse';
import { IAddPackingMaterialResponse } from '../../interface/enquiry/IAddPackingMaterialResponse';
import { IAddPackingMaterialRequest } from '../../interface/enquiry/IAddPackingMaterialRequest';
import { IGetPackingMaterialsRequest, IPackingMaterialsResponse } from '../../interface/enquiry/IPackingMaterialsResponse';
import { IUpdateSurveyItemRequest, IUpdateSurveyItemResponse } from '../../interface/enquiry/enquiry';

interface IEnquiryState {
  // Get Enquiries
  enquiries: IGetEnquiriesResponse | null;
  getEnquiriesRequesting: boolean;
  getEnquiriesSuccess: boolean;
  getEnquiriesFailure: boolean;
  getEnquiriesError: any;
  // Get Enquiry
  enquiry: ISingleEnquiryResponse | null;
  getEnquiryRequesting: boolean;
  getEnquirySuccess: boolean;
  getEnquiryFailure: boolean;
  getEnquiryError: any;
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
  // Get Survey List
  surveyList: IGetSurveyListResponse | null;
  getSurveyListRequesting: boolean;
  getSurveyListSuccess: boolean;
  getSurveyListFailure: boolean;
  getSurveyListError: any;
  // Add Survey Item
  addSurveyItemInfo: IAddSurveyResponse | null;
  addSurveyItemRequesting: boolean;
  addSurveyItemSuccess: boolean;
  addSurveyItemFailure: boolean;
  addSurveyItemError: any;
  // Get Survey Item List
  surveyItemList: IGetSurveyItemListResponse | null;
  getSurveyItemListRequesting: boolean;
  getSurveyItemListSuccess: boolean;
  getSurveyItemListFailure: boolean;
  getSurveyItemListError: any;
  // Update Enquiry Status
  updateEnquiryStatusInfo: IUpdateEnquiryStatusResponse | null,
  updateEnquiryStatusRequesting: boolean,
  updateEnquiryStatusSuccess: boolean,
  updateEnquiryStatusFailure: boolean,
  updateEnquiryStatusError: any,
  // Update Address - states to update enquiry, order pickup and drop address
  updateAddressInfo: IUpdateAddressResponse | null;
  updateAddressRequesting: boolean;
  updateAddressSuccess: boolean;
  updateAddressFailure: boolean;
  updateAddressError: any;
  // Update Contact Details - states to update enquiry, order contact details
  updateContactDetailInfo: IUpdateContactDetailResponse | null;
  updateContactDetailRequesting: boolean;
  updateContactDetailSuccess: boolean;
  updateContactDetailFailure: boolean;
  updateContactDetailError: any;
  // Update Shifting Info for enqiry and order
  updateShiftingInfo: IUpdateShiftingInfoResponse | null;
  updateShiftingInfoRequesting: boolean;
  updateShiftingInfoSuccess: boolean;
  updateShiftingInfoFailure: boolean;
  updateShiftingInfoError: any;
   // Add Packing Materials
   addPackingMaterialsInfo: IAddPackingMaterialResponse | null;
   addPackingMaterialsRequesting: boolean;
   addPackingMaterialsSuccess: boolean;
   addPackingMaterialsFailure: boolean;
   addPackingMaterialsError: any;
   // Get Packing Materials
   packingMaterials: IPackingMaterialsResponse | null;
   getPackingMaterialsRequesting: boolean;
   getPackingMaterialsSuccess: boolean;
   getPackingMaterialsFailure: boolean;
   getPackingMaterialsError: any;
   // Update Survey Item List
   updateSurveyItemInfo: IUpdateSurveyItemResponse | null;
   updateSurveyItemRequesting: boolean;
   updateSurveyItemSuccess:boolean;
   updateSurveyItemFailure:boolean;
   updateSurveyItemError: any;
}

const initialState: IEnquiryState = {
  // Get Enquiries
  enquiries: null,
  getEnquiriesRequesting: false,
  getEnquiriesSuccess: false,
  getEnquiriesFailure: false,
  getEnquiriesError: null,
  // Get Enquiry
  enquiry: null,
  getEnquiryRequesting: false,
  getEnquirySuccess: false,
  getEnquiryFailure: false,
  getEnquiryError: null,
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
  // Get Survey List
  surveyList: null,
  getSurveyListRequesting: false,
  getSurveyListSuccess: false,
  getSurveyListFailure: false,
  getSurveyListError: null,
  // Add Survey Item
  addSurveyItemInfo: null,
  addSurveyItemRequesting: false,
  addSurveyItemSuccess: false,
  addSurveyItemFailure: false,
  addSurveyItemError: null,
  // Get Survey Item List
  surveyItemList: null,
  getSurveyItemListRequesting: false,
  getSurveyItemListSuccess: false,
  getSurveyItemListFailure: false,
  getSurveyItemListError: false,
  // Update Enquiry Status
  updateEnquiryStatusInfo: null,
  updateEnquiryStatusRequesting: false,
  updateEnquiryStatusSuccess: false,
  updateEnquiryStatusFailure: false,
  updateEnquiryStatusError: null,
  // Update Address - states to update enquiries & order's pickup and drop address
  updateAddressInfo: null,
  updateAddressRequesting: false,
  updateAddressSuccess: false,
  updateAddressFailure: false,
  updateAddressError: null,
  // Update Contact Details - states to update enquiry, order contact details
  updateContactDetailInfo: null,
  updateContactDetailRequesting: false,
  updateContactDetailSuccess: false,
  updateContactDetailFailure: false,
  updateContactDetailError: null,
  // Update Shifting Info for enqiry and order
  updateShiftingInfo: null,
  updateShiftingInfoRequesting: false,
  updateShiftingInfoSuccess: false,
  updateShiftingInfoFailure: false,
  updateShiftingInfoError: null,
  // Add Packing Materials
  addPackingMaterialsInfo: null,
  addPackingMaterialsRequesting: false,
  addPackingMaterialsSuccess: false,
  addPackingMaterialsFailure: false,
  addPackingMaterialsError: null,
   // Get Packing Materials
   packingMaterials: null,
   getPackingMaterialsRequesting: false,
   getPackingMaterialsSuccess: false,
   getPackingMaterialsFailure: false,
   getPackingMaterialsError: null,
    // Update Survey Item List
    updateSurveyItemInfo: null,
    updateSurveyItemRequesting: false,
    updateSurveyItemSuccess:false,
    updateSurveyItemFailure:false,
    updateSurveyItemError: null,
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
    // Get Enquiries
    getEnquiryRequest: (state, action: PayloadAction<string>) => {
      state.getEnquiryRequesting = true;
    },
    getEnquirySuccess: (state, action: PayloadAction<ISingleEnquiryResponse>) => {
      state.getEnquiryRequesting = false;
      state.getEnquirySuccess = true;
      state.enquiry = action.payload;
    },
    getEnquiryFailure: (state, action: PayloadAction<any>) => {
      state.getEnquiryRequesting = false;
      state.getEnquirySuccess = false;
      state.getEnquiryFailure = true;
      state.getEnquiryError = action.payload;
    },
    resetEnquiryRequest: (state) => {
      state.getEnquiryRequesting = false;
      state.getEnquirySuccess = false;
      state.getEnquiryFailure = false;
      state.getEnquiryError = null;
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
    resetAddSurveyRequest: (state, action: PayloadAction) => {
      state.addSurveyRequesting = false;
      state.addSurveySuccess = false;
      state.addSurveyFailure = false;
      state.addSurveyError = null;
      state.addSurveyInfo = null;
    },
    // Get Survey List
    getSurveyListRequest: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.getSurveyListRequesting = true;
    },
    getSurveyListSuccess: (
      state,
      action: PayloadAction<IGetSurveyListResponse>,
    ) => {
      state.getSurveyListRequesting = false;
      state.getSurveyListSuccess = true;
      state.surveyList = action.payload;
    },
    getSurveyListFailure: (state, action: PayloadAction<any>) => {
      state.getSurveyListRequesting = false;
      state.getSurveyListSuccess = false;
      state.getSurveyListFailure = true;
      state.getSurveyListError = action.payload;
    },
    // Add Survey Item
    addSurveyItemRequest: (
      state,
      action: PayloadAction<IAddSurveyItemRequest>,
    ) => {
      state.addSurveyItemRequesting = true;
    },
    addSurveyItemSuccess: (
      state,
      action: PayloadAction<IAddSurveyResponse>,
    ) => {
      state.addSurveyItemRequesting = false;
      state.addSurveyItemSuccess = true;
      state.addSurveyItemInfo = action.payload;
    },
    addSurveyItemFailure: (state, action: PayloadAction<any>) => {
      state.addSurveyItemRequesting = false;
      state.addSurveyItemSuccess = false;
      state.addSurveyItemFailure = true;
      state.addSurveyItemError = action.payload;
    },
    resetAddSurveyItemRequest: (state, action: PayloadAction) => {
      state.addSurveyItemRequesting = false;
      state.addSurveyItemSuccess = false;
      state.addSurveyItemFailure = false;
      state.addSurveyItemError = null;
      state.addSurveyInfo = null;
    },
    // Get Survey List
    getSurveyItemListRequest: (
      state,
      action: PayloadAction<IGetSurvyeItemListRequestPayload>,
    ) => {
      state.getSurveyItemListRequesting = true;
    },
    getSurveyItemListSuccess: (
      state,
      action: PayloadAction<IGetSurveyItemListResponse>,
    ) => {
      state.getSurveyItemListRequesting = false;
      state.getSurveyItemListSuccess = true;
      state.surveyItemList = action.payload;
    },
    getSurveyItemListFailure: (state, action: PayloadAction<any>) => {
      state.getSurveyItemListRequesting = false;
      state.getSurveyItemListSuccess = false;
      state.getSurveyItemListFailure = true;
      state.getSurveyItemListError = action.payload;
    },
    // Update Enquiry Status
    updateEnquiryStatusRequest: (
      state,
      action: PayloadAction<{ id: string, requestBody: IUpdateEnquiryStatusRequest }>,
    ) => {
      state.updateEnquiryStatusRequesting = true;
    },
    updateEnquiryStatusSuccess: (
      state,
      action: PayloadAction<IUpdateEnquiryStatusResponse>,
    ) => {
      state.updateEnquiryStatusRequesting = false;
      state.updateEnquiryStatusSuccess = true;
      state.updateEnquiryStatusInfo = action.payload;
    },
    updateEnquiryStatusFailure: (state, action: PayloadAction<any>) => {
      state.updateEnquiryStatusRequesting = false;
      state.updateEnquiryStatusSuccess = false;
      state.updateEnquiryStatusFailure = true;
      state.updateEnquiryStatusError = action.payload;
    },
    resetUpdateEnquiryStatusRequest: (state) => {
      state.updateEnquiryStatusRequesting = false;
      state.updateEnquiryStatusSuccess = false;
      state.updateEnquiryStatusFailure = false;
      state.updateEnquiryStatusError = null;
      state.updateEnquiryStatusInfo = null;
    },
    // Update Address
    updateAddressRequest: (
      state,
      action: PayloadAction<{ id: string, requestBody: IPickupAddress | IDropAddress }>,
    ) => {
      state.updateAddressRequesting = true;
    },
    updateAddressSuccess: (
      state,
      action: PayloadAction<IUpdateAddressResponse>,
    ) => {
      state.updateAddressRequesting = false;
      state.updateAddressSuccess = true;
      state.updateAddressInfo = action.payload;
    },
    updateAddressFailure: (state, action: PayloadAction<any>) => {
      state.updateAddressRequesting = false;
      state.updateAddressSuccess = false;
      state.updateAddressFailure = true;
      state.updateAddressError = action.payload;
    },
    resetUpdateAddressRequest: (state) => {
      state.updateAddressRequesting = false;
      state.updateAddressSuccess = false;
      state.updateAddressFailure = false;
      state.updateAddressError = null;
      state.updateAddressInfo = null;
    },
    // Update Contact Details
    updateContactDetailsRequest: (
      state,
      action: PayloadAction<{ id: string, requestBody: IUpdateIndividualContactDetailRequest | IUpdateCompanyContactDetailRequest }>,
    ) => {
      state.updateContactDetailRequesting = true;
    },
    updateContactDetailsSuccess: (
      state,
      action: PayloadAction<IUpdateContactDetailResponse>,
    ) => {
      state.updateContactDetailRequesting = false;
      state.updateContactDetailSuccess = true;
      state.updateContactDetailInfo = action.payload;
    },
    updateContactDetailsFailure: (state, action: PayloadAction<any>) => {
      state.updateContactDetailRequesting = false;
      state.updateContactDetailSuccess = false;
      state.updateContactDetailFailure = true;
      state.updateContactDetailError = action.payload;
    },
    resetUpdateContactDetailsRequest: (state) => {
      state.updateContactDetailRequesting = false;
      state.updateContactDetailSuccess = false;
      state.updateContactDetailFailure = false;
      state.updateContactDetailError = null;
      state.updateContactDetailInfo = null;
    },
    // Update Shifting Info
    updateShiftingInfoRequest: (
      state,
      action: PayloadAction<{ id: string, requestBody: IUpdateShiftingInfoRequest }>,
    ) => {
      state.updateShiftingInfoRequesting = true;
    },
    updateShiftingInfoSuccess: (
      state,
      action: PayloadAction<IUpdateShiftingInfoResponse>,
    ) => {
      state.updateShiftingInfoRequesting = false;
      state.updateShiftingInfoSuccess = true;
      state.updateShiftingInfo = action.payload;
    },
    updateShiftingInfoFailure: (state, action: PayloadAction<any>) => {
      state.updateShiftingInfoRequesting = false;
      state.updateShiftingInfoSuccess = false;
      state.updateShiftingInfoFailure = true;
      state.updateShiftingInfoError = action.payload;
    },
    resetUpdateShiftingInfoRequest: (state) => {
      state.updateShiftingInfoRequesting = false;
      state.updateShiftingInfoSuccess = false;
      state.updateShiftingInfoFailure = false;
      state.updateShiftingInfoError = null;
      state.updateShiftingInfo = null;
    },
      // Add Packing Material
      addPackingMaterialRequest: (state, action: PayloadAction<IAddPackingMaterialRequest>) => {
        state.addPackingMaterialsRequesting = true;
      },
      addPackingMaterialSuccess: (state, action: PayloadAction<IAddPackingMaterialResponse>) => {
        state.addPackingMaterialsRequesting = false;
        state.addPackingMaterialsSuccess = true;
        state.addPackingMaterialsInfo = action.payload;
      },
      addPackingMaterialFailure: (state, action: PayloadAction<any>) => {
        state.addPackingMaterialsRequesting = false;
        state.addPackingMaterialsSuccess = false;
        state.addPackingMaterialsFailure = true;
        state.addPackingMaterialsError = action.payload;
      },
      resetPackingMaterialRequest: (state, action: PayloadAction) => {
        state.addPackingMaterialsRequesting = false;
        state.addPackingMaterialsSuccess = false;
        state.addPackingMaterialsFailure = false;
        state.addPackingMaterialsInfo = null;
        state.addPackingMaterialsError = null;
      },
      // Get Packing Materials
      getPackingMaterialsRequest: (state, action: PayloadAction<IGetPackingMaterialsRequest>) => {
        state.getPackingMaterialsRequesting = true;
      },
      getPackingMaterialsSuccess: (state, action: PayloadAction<IPackingMaterialsResponse>) => {
        state.getPackingMaterialsRequesting = false;
        state.getPackingMaterialsSuccess = true;
        state.packingMaterials = action.payload;
      },
      getPackingMaterialsFailure: (state, action: PayloadAction<any>) => {
        state.getPackingMaterialsRequesting = false;
        state.getPackingMaterialsFailure = true;
        state.getPackingMaterialsError = action.payload;
      },
      resetGetPackingMaterialsRequest: (state) => {
        state.getPackingMaterialsRequesting = false;
        state.getPackingMaterialsSuccess = false;
        state.getPackingMaterialsFailure = false;
        state.getPackingMaterialsError = null;
      },
      // Update Survey Item List
      updateSurveryItemListRequest: (state, action: PayloadAction<IUpdateSurveyItemRequest>) => {
        state.updateSurveyItemRequesting = true;
      },
      updateSurveryItemListSuccess: (state, action: PayloadAction<IUpdateSurveyItemResponse>) => {
        state.updateSurveyItemRequesting = false;
        state.updateSurveyItemSuccess = true;
        state.updateSurveyItemInfo = action.payload;
      },
      updateSurveryItemListFailure: (state, action: PayloadAction<any>) => {
        state.updateSurveyItemRequesting = false;
        state.updateSurveyItemFailure = true;
        state.updateSurveyItemError = action.payload;
      },
      resetUpdateSurveryItemListRequest: (state) => {
        state.updateSurveyItemRequesting = false;
        state.updateSurveyItemSuccess = false;
        state.updateSurveyItemFailure = false;
        state.updateSurveyItemError = null;
        state.updateSurveyItemInfo = null;
      }
  },
});

export default EnquirySlice.reducer;

export const {
  // Get Enquiries
  getEnquiriesRequest,
  getEnquiriesSuccess,
  getEnquiriesFailure,
  // Get Enquiry
  getEnquiryRequest,
  getEnquirySuccess,
  getEnquiryFailure,
  resetEnquiryRequest,
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
  resetAddSurveyRequest,
  // Get Survey List
  getSurveyListRequest,
  getSurveyListSuccess,
  getSurveyListFailure,
  //Add Survey Item
  addSurveyItemRequest,
  addSurveyItemSuccess,
  addSurveyItemFailure,
  resetAddSurveyItemRequest,
  // Get Survey Item List
  getSurveyItemListRequest,
  getSurveyItemListSuccess,
  getSurveyItemListFailure,
  // Update Enquiry Status
  updateEnquiryStatusRequest,
  updateEnquiryStatusSuccess,
  updateEnquiryStatusFailure,
  resetUpdateEnquiryStatusRequest,
  // Update Address
  updateAddressRequest,
  updateAddressSuccess,
  updateAddressFailure,
  resetUpdateAddressRequest,
  // Update Contact Details
  updateContactDetailsRequest,
  updateContactDetailsSuccess,
  updateContactDetailsFailure,
  resetUpdateContactDetailsRequest,
  // Update shifting Info
  updateShiftingInfoRequest,
  updateShiftingInfoSuccess,
  updateShiftingInfoFailure,
  resetUpdateShiftingInfoRequest,
   // Add Packing Material
   addPackingMaterialRequest,
   addPackingMaterialSuccess,
   addPackingMaterialFailure,
   resetPackingMaterialRequest,
   // Get Packing Materials
   getPackingMaterialsRequest,
   getPackingMaterialsSuccess,
   getPackingMaterialsFailure,
   resetGetPackingMaterialsRequest,
   // Update Survey Item List
   updateSurveryItemListRequest,
   updateSurveryItemListSuccess,
   updateSurveryItemListFailure,
   resetUpdateSurveryItemListRequest,
} = EnquirySlice.actions;
