import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISavedDocumentTemplateIdResponse, ISaveDocumentTemplateIdPayload, ISaveDocumentTemplateIdResponse, ITemplateListResponse} from '../../interface/setting/template/template';

interface ITemplateSettingState {
  // Get Template List
  templates: ITemplateListResponse | null;
  getTemplatesRequesting: boolean;
  getTemplatesSuccess: boolean;
  getTemplatesFailure: boolean;
  getTemplatesError: any;
  // Save Document Template ID
  templateIdSaveInfo: ISaveDocumentTemplateIdResponse | null;
  saveDocTemplateIdRequesting: boolean;
  saveDocTemplateIdSuccess: boolean;
  saveDocTemplateIdFailure: boolean;
  saveDocTemplateIdError: any;
  // Get Saved Document Template ID List
  savedDocumentTemplateIds: ISavedDocumentTemplateIdResponse | null;
  getSavedDocumentTemplateIdListRequesting: boolean;
  getSavedDocumentTemplateIdListSuccess: boolean;
  getSavedDocumentTemplateIdListFailure: boolean;
  getSavedDocumentTemplateIdListError: any;
}

const initialState: ITemplateSettingState = {
  // Get Template List
  templates: null,
  getTemplatesRequesting: false,
  getTemplatesSuccess: false,
  getTemplatesFailure: false,
  getTemplatesError: null,
  // Save Document Template ID
  templateIdSaveInfo: null,
  saveDocTemplateIdRequesting: false,
  saveDocTemplateIdSuccess: false,
  saveDocTemplateIdFailure: false,
  saveDocTemplateIdError: null,
  // Get Saved Document Template ID List
  savedDocumentTemplateIds: null,
  getSavedDocumentTemplateIdListRequesting: false,
  getSavedDocumentTemplateIdListSuccess: false,
  getSavedDocumentTemplateIdListFailure: false,
  getSavedDocumentTemplateIdListError: null,
};

export const TemplateSettingSlice = createSlice({
  name: 'TemplateSettingSlice',
  initialState: initialState,
  reducers: {
    // Get Template List
    getTemplateListRequest: (state) => {
      state.getTemplatesRequesting = true;
    },
    getTemplateListSuccess: (
      state,
      action: PayloadAction<ITemplateListResponse>,
    ) => {
      state.getTemplatesRequesting = false;
      state.getTemplatesSuccess = true;
      state.templates = action.payload;
    },
    getTemplateListFailure: (state, action: PayloadAction<any>) => {
      state.getTemplatesRequesting = false;
      state.getTemplatesSuccess = false;
      state.getTemplatesFailure = true;
      state.getTemplatesError = action.payload;
    },
    // Save Document Template Id
    saveDocumentTemplateIdRequest: (state, action: PayloadAction<ISaveDocumentTemplateIdPayload>) => {
      state.saveDocTemplateIdRequesting = true;
    },
    saveDocumentTemplateIdSuccess: (
      state,
      action: PayloadAction<ISaveDocumentTemplateIdResponse>,
    ) => {
      state.saveDocTemplateIdRequesting = false;
      state.saveDocTemplateIdSuccess = true;
      state.templateIdSaveInfo = action.payload;
    },
    saveDocumentTemplateIdFailure: (state, action: PayloadAction<any>) => {
      state.saveDocTemplateIdRequesting = false;
      state.saveDocTemplateIdSuccess = false;
      state.saveDocTemplateIdFailure = true;
      state.saveDocTemplateIdError = action.payload;
    },
    resetSaveDocumentTemplateIdRequest: (state) => {
      state.saveDocTemplateIdRequesting = false;
      state.saveDocTemplateIdSuccess = false;
      state.saveDocTemplateIdFailure = false;
      state.saveDocTemplateIdError = null;
      state.templateIdSaveInfo = null;
    },
    // Get Saved Document Template ID List
    getSavedDocumentTemplateIdListRequest: (state, action:PayloadAction<string>) => {
      state.getSavedDocumentTemplateIdListRequesting = true;
    },
    getSavedDocumentTemplateIdListSuccess: (
      state,
      action: PayloadAction<ISavedDocumentTemplateIdResponse>,
    ) => {
      state.getSavedDocumentTemplateIdListRequesting = false;
      state.getSavedDocumentTemplateIdListSuccess = true;
      state.savedDocumentTemplateIds = action.payload;
    },
    getSavedDocumentTemplateIdListFailure: (state, action: PayloadAction<any>) => {
      state.getSavedDocumentTemplateIdListRequesting = false;
      state.getSavedDocumentTemplateIdListSuccess = false;
      state.getSavedDocumentTemplateIdListFailure = true;
      state.getSavedDocumentTemplateIdListError = action.payload;
    },
  },
});

export default TemplateSettingSlice.reducer;

export const {
  // Get Template List
  getTemplateListRequest,
  getTemplateListSuccess,
  getTemplateListFailure,
  // Save Document Template Id
  saveDocumentTemplateIdRequest,
  saveDocumentTemplateIdSuccess,
  saveDocumentTemplateIdFailure,
  resetSaveDocumentTemplateIdRequest,
  // Get Saved Document Template ID List
  getSavedDocumentTemplateIdListRequest,
  getSavedDocumentTemplateIdListSuccess,
  getSavedDocumentTemplateIdListFailure,
} = TemplateSettingSlice.actions;
