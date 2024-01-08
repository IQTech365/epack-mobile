import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ITemplateListResponse} from '../../interface/setting/template/template';

interface ITemplateSettingState {
  // Get Template List
  templates: ITemplateListResponse | null;
  getTemplatesRequesting: boolean;
  getTemplatesSuccess: boolean;
  getTemplatesFailure: boolean;
  getTemplatesError: any;
}

const initialState: ITemplateSettingState = {
  templates: null,
  getTemplatesRequesting: false,
  getTemplatesSuccess: false,
  getTemplatesFailure: false,
  getTemplatesError: null,
};

export const TemplateSettingSlice = createSlice({
  name: 'TemplateSettingSlice',
  initialState: initialState,
  reducers: {
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
  },
});

export default TemplateSettingSlice.reducer;

export const {
  // Get Template List
  getTemplateListRequest,
  getTemplateListSuccess,
  getTemplateListFailure,
} = TemplateSettingSlice.actions;
