import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IAddContactDetailRequest } from '../../interface/setting/packerProfile/contactDetail/IAddContactDetailRequest';
import { IAddContactDetailResponse } from '../../interface/setting/packerProfile/contactDetail/IAddContactDetailResponse';
import { IGetContactDetailsResponse } from '../../interface/setting/packerProfile/contactDetail/IGetContactDetailsResponse';
import { IAddDocumentRequest } from '../../interface/setting/packerProfile/document/IAddDocumentRequest';
import { IAddDocumentResponse } from '../../interface/setting/packerProfile/document/IAddDocumentResponse';
import { IGetDocumentsResponse } from '../../interface/setting/packerProfile/document/IGetDocumentsResponse';
import { IAddFooterContentRequest } from '../../interface/setting/packerProfile/footerContent/IAddFooterContentRequest';
import { IAddFooterContentResponse } from '../../interface/setting/packerProfile/footerContent/IAddFooterContentResponse';
import { IGetFooterContentsResponse } from '../../interface/setting/packerProfile/footerContent/IGetFooterContentsResponse';
import { IAddPaymentMethodRequest } from '../../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodRequest';
import { IAddPaymentMethodResponse } from '../../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodResponse';
import { IGetPaymentMethodsResponse } from '../../interface/setting/packerProfile/paymentMethod/IGetPaymentMethodsResponse';

interface ISettingState {
    // Add Payment Method
    addPaymentMethodInfo: IAddPaymentMethodResponse | null;
    addPaymentMethodRequesting: boolean;
    addPaymentMethodSuccess: boolean;
    addPaymentMethodFailure: boolean;
    addPaymentMethodError: any;
    // Delete Payment Method
    deletePaymentMethodInfo: any;
    deletePaymentMethodRequesting: boolean;
    deletePaymentMethodSuccess: boolean;
    deletePaymentMethodFailure: boolean;
    deletePaymentMethodError: any;
    // Update Payment Method
    updatePaymentMethodInfo: any;
    updatePaymentMethodRequesting: boolean;
    updatePaymentMethodSuccess: boolean;
    updatePaymentMethodFailure: boolean;
    updatePaymentMethodError: any;
    // Get Payment Methods
    paymentMethods: IGetPaymentMethodsResponse | null;
    getPaymentMethodsRequesting: boolean;
    getPaymentMethodsSuccess: boolean;
    getPaymentMethodsFailure: boolean;
    getPaymentMethodsError: any;

    // ****************************************************************************

    // Add  Footer Content
    addFooterContentInfo: IAddFooterContentResponse | null;
    addFooterContentRequesting: boolean;
    addFooterContentSuccess: boolean;
    addFooterContentFailure: boolean;
    addFooterContentError: any;
    // Delete  Footer Content
    deleteFooterContentInfo: any;
    deleteFooterContentRequesting: boolean;
    deleteFooterContentSuccess: boolean;
    deleteFooterContentFailure: boolean;
    deleteFooterContentError: any;
    // Update  Footer Content
    updateFooterContentInfo: any;
    updateFooterContentRequesting: boolean;
    updateFooterContentSuccess: boolean;
    updateFooterContentFailure: boolean;
    updateFooterContentError: any;
    // Get Footer Contents
    footerContents: IGetFooterContentsResponse | null;
    getFooterContentsRequesting: boolean;
    getFooterContentsSuccess: boolean;
    getFooterContentsFailure: boolean;
    getFooterContentsError: any;

    // ****************************************************************************

    // Add  Document
    addDocumentInfo: IAddDocumentResponse | null;
    addDocumentRequesting: boolean;
    addDocumentSuccess: boolean;
    addDocumentFailure: boolean;
    addDocumentError: any;
    // Delete  Document
    deleteDocumentInfo: any;
    deleteDocumentRequesting: boolean;
    deleteDocumentSuccess: boolean;
    deleteDocumentFailure: boolean;
    deleteDocumentError: any;
    // Update  Document
    updateDocumentInfo: any;
    updateDocumentRequesting: boolean;
    updateDocumentSuccess: boolean;
    updateDocumentFailure: boolean;
    updateDocumentError: any;
    // Get Documents
    documents: IGetDocumentsResponse | null;
    getDocumentsRequesting: boolean;
    getDocumentsSuccess: boolean;
    getDocumentsFailure: boolean;
    getDocumentsError: any;

    // ****************************************************************************

    // Add  Signature
    addSignatureInfo: any;
    addSignatureRequesting: boolean;
    addSignatureSuccess: boolean;
    addSignatureFailure: boolean;
    addSignatureError: any;
    // Delete  Signature
    deleteSignatureInfo: any;
    deleteSignatureRequesting: boolean;
    deleteSignatureSuccess: boolean;
    deleteSignatureFailure: boolean;
    deleteSignatureError: any;
    // Get Signatures
    signatures: any;
    getSignaturesRequesting: boolean;
    getSignaturesSuccess: boolean;
    getSignaturesFailure: boolean;
    getSignaturesError: any;

    // ****************************************************************************

    // Add  Contact
    addContactInfo: any;
    addContactRequesting: boolean;
    addContactSuccess: boolean;
    addContactFailure: boolean;
    addContactError: any;
    // Delete  Contact
    deleteContactInfo: any;
    deleteContactRequesting: boolean;
    deleteContactSuccess: boolean;
    deleteContactFailure: boolean;
    deleteContactError: any;
    // Update  Contact
    updateContactInfo: any;
    updateContactRequesting: boolean;
    updateContactSuccess: boolean;
    updateContactFailure: boolean;
    updateContactError: any;
    // Get Contacts
    contacts: any;
    getContactsRequesting: boolean;
    getContactsSuccess: boolean;
    getContactsFailure: boolean;
    getContactsError: any;
}

const initialState: ISettingState = {
    // Add Payment Method
    addPaymentMethodInfo: null,
    addPaymentMethodRequesting: false,
    addPaymentMethodSuccess: false,
    addPaymentMethodFailure: false,
    addPaymentMethodError: null,
    // Delete Payment Method
    deletePaymentMethodInfo: null,
    deletePaymentMethodRequesting: false,
    deletePaymentMethodSuccess: false,
    deletePaymentMethodFailure: false,
    deletePaymentMethodError: null,
    // Update Payment Method
    updatePaymentMethodInfo: null,
    updatePaymentMethodRequesting: false,
    updatePaymentMethodSuccess: false,
    updatePaymentMethodFailure: false,
    updatePaymentMethodError: false,
    // Get Payment Methods
    paymentMethods: null,
    getPaymentMethodsRequesting: false,
    getPaymentMethodsSuccess: false,
    getPaymentMethodsFailure: false,
    getPaymentMethodsError: null,

    // ****************************************************************************

    // Add  Footer Content
    addFooterContentInfo: null,
    addFooterContentRequesting: false,
    addFooterContentSuccess: false,
    addFooterContentFailure: false,
    addFooterContentError: null,
    // Delete  Footer Content
    deleteFooterContentInfo: null,
    deleteFooterContentRequesting: false,
    deleteFooterContentSuccess: false,
    deleteFooterContentFailure: false,
    deleteFooterContentError: null,
    // Update  Footer Content
    updateFooterContentInfo: null,
    updateFooterContentRequesting: false,
    updateFooterContentSuccess: false,
    updateFooterContentFailure: false,
    updateFooterContentError: null,
    // Get Footer Contents
    footerContents: null,
    getFooterContentsRequesting: false,
    getFooterContentsSuccess: false,
    getFooterContentsFailure: false,
    getFooterContentsError: null,

    // ****************************************************************************

    // Add  Document
    addDocumentInfo: null,
    addDocumentRequesting: false,
    addDocumentSuccess: false,
    addDocumentFailure: false,
    addDocumentError: null,
    // Delete  Document
    deleteDocumentInfo: null,
    deleteDocumentRequesting: false,
    deleteDocumentSuccess: false,
    deleteDocumentFailure: false,
    deleteDocumentError: false,
    // Update  Document
    updateDocumentInfo: null,
    updateDocumentRequesting: false,
    updateDocumentSuccess: false,
    updateDocumentFailure: false,
    updateDocumentError: null,
    // Get Documents
    documents: null,
    getDocumentsRequesting: false,
    getDocumentsSuccess: false,
    getDocumentsFailure: false,
    getDocumentsError: null,

    // ****************************************************************************

    // Add  Signature
    addSignatureInfo: null,
    addSignatureRequesting: false,
    addSignatureSuccess: false,
    addSignatureFailure: false,
    addSignatureError: null,
    // Delete  Signature
    deleteSignatureInfo: null,
    deleteSignatureRequesting: false,
    deleteSignatureSuccess: false,
    deleteSignatureFailure: false,
    deleteSignatureError: null,
    // Get Signatures
    signatures: null,
    getSignaturesRequesting: false,
    getSignaturesSuccess: false,
    getSignaturesFailure: false,
    getSignaturesError: null,

    // ****************************************************************************

    // Add  Contact
    addContactInfo: null,
    addContactRequesting: false,
    addContactSuccess: false,
    addContactFailure: false,
    addContactError: null,
    // Delete  Contact
    deleteContactInfo: null,
    deleteContactRequesting: false,
    deleteContactSuccess: false,
    deleteContactFailure: false,
    deleteContactError: null,
    // Update  Contact
    updateContactInfo: null,
    updateContactRequesting: false,
    updateContactSuccess: false,
    updateContactFailure: false,
    updateContactError: null,
    // Get Contacts
    contacts: null,
    getContactsRequesting: false,
    getContactsSuccess: false,
    getContactsFailure: false,
    getContactsError: null,
}

export const SettingSlice = createSlice({
    name: 'SettingSlice',
    initialState: initialState,
    reducers: {
        // ***** Add Payment Method *****
        // ******************************
        addPaymentMethodRequest: (state, action: PayloadAction<IAddPaymentMethodRequest>) => {
            state.addPaymentMethodRequesting = true;
        },
        addPaymentMethodSuccess: (state, action: PayloadAction<IAddPaymentMethodResponse>) => {
            state.addPaymentMethodRequesting = false;
            state.addPaymentMethodSuccess = true;
            state.addPaymentMethodInfo = action.payload;
        },
        addPaymentMethodFailure: (state, action: PayloadAction<any>) => {
            state.addPaymentMethodRequesting = false;
            state.addPaymentMethodSuccess = false;
            state.addPaymentMethodFailure = true;
            state.addPaymentMethodError = action.payload;
        },
        resetAddPaymentMethodRequest: (state) => {
            state.addPaymentMethodRequesting = false;
            state.addPaymentMethodSuccess = false;
            state.addPaymentMethodFailure = false;
            state.addPaymentMethodError = null;
        },
        // ***** Delete Payment Method *****
        // ******************************
        deletePaymentMethodRequest: (state, action: PayloadAction<IAddPaymentMethodRequest>) => {
            state.deletePaymentMethodRequesting = true;
        },
        deletePaymentMethodSuccess: (state, action: PayloadAction<IAddPaymentMethodResponse>) => {
            state.deletePaymentMethodRequesting = false;
            state.deletePaymentMethodSuccess = true;
            state.deletePaymentMethodInfo = action.payload;
        },
        deletePaymentMethodFailure: (state, action: PayloadAction<any>) => {
            state.deletePaymentMethodRequesting = false;
            state.deletePaymentMethodSuccess = false;
            state.deletePaymentMethodFailure = true;
            state.deletePaymentMethodError = action.payload;
        },
        resetDeletePaymentMethodRequest: (state) => {
            state.deletePaymentMethodRequesting = false;
            state.deletePaymentMethodSuccess = false;
            state.deletePaymentMethodFailure = false;
            state.deletePaymentMethodError = null;
        },
        // ***** Update Payment Method *****
        // ******************************
        updatePaymentMethodRequest: (state, action: PayloadAction<IAddPaymentMethodRequest>) => {
            state.updatePaymentMethodRequesting = true;
        },
        updatePaymentMethodSuccess: (state, action: PayloadAction<IAddPaymentMethodResponse>) => {
            state.updatePaymentMethodRequesting = false;
            state.updatePaymentMethodSuccess = true;
            state.updatePaymentMethodInfo = action.payload;
        },
        updatePaymentMethodFailure: (state, action: PayloadAction<any>) => {
            state.updatePaymentMethodRequesting = false;
            state.updatePaymentMethodSuccess = false;
            state.updatePaymentMethodFailure = true;
            state.updatePaymentMethodError = action.payload;
        },
        resetUpdatePaymentMethodRequest: (state) => {
            state.updatePaymentMethodRequesting = false;
            state.updatePaymentMethodSuccess = false;
            state.updatePaymentMethodFailure = false;
            state.updatePaymentMethodError = null;
        },
        // ***** Get Payment Methods *****
        // ******************************
        getPaymentMethodsRequest: (state, action: PayloadAction<string>) => {
            state.getPaymentMethodsRequesting = true;
        },
        getPaymentMethodsSuccess: (state, action: PayloadAction<IGetPaymentMethodsResponse>) => {
            state.getPaymentMethodsRequesting = false;
            state.getPaymentMethodsSuccess = true;
            state.paymentMethods = action.payload;
        },
        getPaymentMethodsFailure: (state, action: PayloadAction<any>) => {
            state.getPaymentMethodsRequesting = false;
            state.getPaymentMethodsSuccess = false;
            state.getPaymentMethodsFailure = true;
            state.getPaymentMethodsError = action.payload;
        },
        // ***** Add Footer Content *****
        // ******************************
        addFooterContentRequest: (state, action: PayloadAction<IAddFooterContentRequest>) => {
            state.addFooterContentRequesting = true;
        },
        addFooterContentSuccess: (state, action: PayloadAction<IAddFooterContentResponse>) => {
            state.addFooterContentRequesting = false;
            state.addFooterContentSuccess = true;
            state.addFooterContentInfo = action.payload;
        },
        addFooterContentFailure: (state, action: PayloadAction<any>) => {
            state.addFooterContentRequesting = false;
            state.addFooterContentSuccess = false;
            state.addFooterContentFailure = true;
            state.addFooterContentError = action.payload;
        },
        resetFooterContentRequest: (state) => {
            state.addFooterContentRequesting = false;
            state.addFooterContentSuccess = false;
            state.addFooterContentFailure = false;
            state.addFooterContentError = null;
        },
        // ***** Delete Footer Content *****
        // ******************************
        deleteFooterContentRequest: (state, action: PayloadAction<IAddPaymentMethodRequest>) => {
            state.deleteFooterContentRequesting = true;
        },
        deleteFooterContentSuccess: (state, action: PayloadAction<IAddPaymentMethodResponse>) => {
            state.deleteFooterContentRequesting = false;
            state.deleteFooterContentSuccess = true;
            state.deletePaymentMethodInfo = action.payload;
        },
        deleteFooterContentFailure: (state, action: PayloadAction<any>) => {
            state.deleteFooterContentRequesting = false;
            state.deleteFooterContentSuccess = false;
            state.deleteFooterContentFailure = true;
            state.deleteFooterContentError = action.payload;
        },
        resetDeleteFooterContentRequest: (state) => {
            state.deleteFooterContentRequesting = false;
            state.deleteFooterContentSuccess = false;
            state.deleteFooterContentFailure = false;
            state.deleteFooterContentError = null;
        },
        // ***** Update Footer Content *****
        // ******************************
        updateFooterContentRequest: (state, action: PayloadAction<IAddPaymentMethodRequest>) => {
            state.updateFooterContentRequesting = true;
        },
        updateFooterContentSuccess: (state, action: PayloadAction<IAddPaymentMethodResponse>) => {
            state.updateFooterContentRequesting = false;
            state.updateFooterContentSuccess = true;
            state.updatePaymentMethodInfo = action.payload;
        },
        updateFooterContentFailure: (state, action: PayloadAction<any>) => {
            state.updateFooterContentRequesting = false;
            state.updateFooterContentSuccess = false;
            state.updateFooterContentFailure = true;
            state.updateFooterContentError = action.payload;
        },
        resetUpdateFooterContentRequest: (state) => {
            state.updateFooterContentRequesting = false;
            state.updateFooterContentSuccess = false;
            state.updateFooterContentFailure = false;
            state.updateFooterContentError = null;
        },
        // ***** Get Footer Contents *****
        // ******************************
        getFooterContentsRequest: (state, action: PayloadAction<string>) => {
            state.getFooterContentsRequesting = true;
        },
        getFooterContentsSuccess: (state, action: PayloadAction<IGetFooterContentsResponse>) => {
            state.getFooterContentsRequesting = false;
            state.getFooterContentsSuccess = true;
            state.footerContents = action.payload;
        },
        getFooterContentsFailure: (state, action: PayloadAction<any>) => {
            state.getFooterContentsRequesting = false;
            state.getFooterContentsSuccess = false;
            state.getFooterContentsFailure = true;
            state.getFooterContentsError = action.payload;
        },
        // ***** Add Document *****
        // ******************************
        addDocumentRequest: (state, action: PayloadAction<IAddDocumentRequest>) => {
            state.addDocumentRequesting = true;
        },
        addDocumentSuccess: (state, action: PayloadAction<IAddDocumentResponse>) => {
            state.addDocumentRequesting = false;
            state.addDocumentSuccess = true;
            state.addDocumentInfo = action.payload;
        },
        addDocumentFailure: (state, action: PayloadAction<any>) => {
            state.addDocumentRequesting = false;
            state.addDocumentSuccess = false;
            state.addDocumentFailure = true;
            state.addDocumentError = action.payload;
        },
        resetAddDocumentRequest: (state) => {
            state.addDocumentRequesting = false;
            state.addDocumentSuccess = false;
            state.addDocumentFailure = false;
            state.addDocumentError = null;
        },
        // ***** Delete Document *****
        // ******************************
        deleteDocumentRequest: (state, action: PayloadAction<IAddPaymentMethodRequest>) => {
            state.deleteDocumentRequesting = true;
        },
        deleteDocumentSuccess: (state, action: PayloadAction<IAddPaymentMethodResponse>) => {
            state.deleteDocumentRequesting = false;
            state.deleteDocumentSuccess = true;
            state.deleteDocumentInfo = action.payload;
        },
        deleteDocumentFailure: (state, action: PayloadAction<any>) => {
            state.deleteDocumentRequesting = false;
            state.deleteDocumentSuccess = false;
            state.deleteDocumentFailure = true;
            state.deleteDocumentError = action.payload;
        },
        resetDeleteDocumentRequest: (state) => {
            state.deleteDocumentRequesting = false;
            state.deleteDocumentSuccess = false;
            state.deleteDocumentFailure = false;
            state.deleteDocumentError = null;
        },
        // ***** Update Document *****
        // ******************************
        updateDocumentRequest: (state, action: PayloadAction<IAddPaymentMethodRequest>) => {
            state.updateDocumentRequesting = true;
        },
        updateDocumentSuccess: (state, action: PayloadAction<IAddPaymentMethodResponse>) => {
            state.updateDocumentRequesting = false;
            state.updateDocumentSuccess = true;
            state.updateDocumentInfo = action.payload;
        },
        updateDocumentFailure: (state, action: PayloadAction<any>) => {
            state.updateDocumentRequesting = false;
            state.updateDocumentSuccess = false;
            state.updateDocumentFailure = true;
            state.updateDocumentError = action.payload;
        },
        resetUpdateDocumentRequest: (state) => {
            state.updateDocumentRequesting = false;
            state.updateDocumentSuccess = false;
            state.updateDocumentFailure = false;
            state.updateDocumentError = null;
        },
        // ***** Get Documents *****
        // ******************************
        getDocumentsRequest: (state, action: PayloadAction<string>) => {
            state.getDocumentsRequesting = true;
        },
        getDocumentsSuccess: (state, action: PayloadAction<IGetDocumentsResponse>) => {
            state.getDocumentsRequesting = false;
            state.getDocumentsSuccess = true;
            state.documents = action.payload;
        },
        getDocumentsFailure: (state, action: PayloadAction<any>) => {
            state.getDocumentsRequesting = false;
            state.getDocumentsSuccess = false;
            state.getDocumentsFailure = true;
            state.getDocumentsError = action.payload;
        },
        // ***** Add Signature *****
        // ******************************
        addSignatureRequest: (state, action: PayloadAction<IAddDocumentRequest>) => {
            state.addSignatureRequesting = true;
        },
        addSignatureSuccess: (state, action: PayloadAction<IAddDocumentResponse>) => {
            state.addSignatureRequesting = false;
            state.addSignatureSuccess = true;
            state.addSignatureInfo = action.payload;
        },
        addSignatureFailure: (state, action: PayloadAction<any>) => {
            state.addSignatureRequesting = false;
            state.addSignatureSuccess = false;
            state.addSignatureFailure = true;
            state.addSignatureError = action.payload;
        },
        resetAddSignatureRequest: (state) => {
            state.addSignatureRequesting = false;
            state.addSignatureSuccess = false;
            state.addSignatureFailure = false;
            state.addSignatureError = null;
        },
        // ***** Delete Signature *****
        // ******************************
        deleteSignatureRequest: (state, action: PayloadAction<IAddPaymentMethodRequest>) => {
            state.deleteSignatureRequesting = true;
        },
        deleteSignatureSuccess: (state, action: PayloadAction<IAddPaymentMethodResponse>) => {
            state.deleteSignatureRequesting = false;
            state.deleteSignatureSuccess = true;
            state.deleteSignatureInfo = action.payload;
        },
        deleteSignatureFailure: (state, action: PayloadAction<any>) => {
            state.deleteSignatureRequesting = false;
            state.deleteSignatureSuccess = false;
            state.deleteSignatureFailure = true;
            state.deleteSignatureError = action.payload;
        },
        resetDeleteSignatureRequest: (state) => {
            state.deleteSignatureRequesting = false;
            state.deleteSignatureSuccess = false;
            state.deleteSignatureFailure = false;
            state.deleteSignatureError = null;
        },
        // ***** Get Signatures *****
        // ******************************
        getSignaturesRequest: (state, action: PayloadAction<string>) => {
            state.getSignaturesRequesting = true;
        },
        getSignaturesSuccess: (state, action: PayloadAction<IGetDocumentsResponse>) => {
            state.getSignaturesRequesting = false;
            state.getSignaturesSuccess = true;
            state.signatures = action.payload;
        },
        getSignaturesFailure: (state, action: PayloadAction<any>) => {
            state.getSignaturesRequesting = false;
            state.getSignaturesSuccess = false;
            state.getSignaturesFailure = true;
            state.getSignaturesError = action.payload;
        },
        // ***** Add Contact *****
        // ******************************
        addContactRequest: (state, action: PayloadAction<IAddContactDetailRequest>) => {
            state.addContactRequesting = true;
        },
        addContactSuccess: (state, action: PayloadAction<IAddContactDetailResponse>) => {
            state.addContactRequesting = false;
            state.addContactSuccess = true;
            state.addContactInfo = action.payload;
        },
        addContactFailure: (state, action: PayloadAction<any>) => {
            state.addContactRequesting = false;
            state.addContactSuccess = false;
            state.addContactFailure = true;
            state.addContactError = action.payload;
        },
        resetAddContactRequest: (state) => {
            state.addContactRequesting = false;
            state.addContactSuccess = false;
            state.addContactFailure = false;
            state.addContactError = null;
        },
        // ***** Delete Contact *****
        // ******************************
        deleteContactRequest: (state, action: PayloadAction<IAddPaymentMethodRequest>) => {
            state.deleteContactRequesting = true;
        },
        deleteContactSuccess: (state, action: PayloadAction<IAddPaymentMethodResponse>) => {
            state.deleteContactRequesting = false;
            state.deleteContactSuccess = true;
            state.deleteContactInfo = action.payload;
        },
        deleteContactFailure: (state, action: PayloadAction<any>) => {
            state.deleteContactRequesting = false;
            state.deleteContactSuccess = false;
            state.deleteContactFailure = true;
            state.deleteContactError = action.payload;
        },
        resetDeleteContactRequest: (state) => {
            state.deleteContactRequesting = false;
            state.deleteContactSuccess = false;
            state.deleteContactFailure = false;
            state.deleteContactError = null;
        },
        // ***** Update Contact *****
        // ******************************
        updateContactRequest: (state, action: PayloadAction<IAddPaymentMethodRequest>) => {
            state.updateContactRequesting = true;
        },
        updateContactSuccess: (state, action: PayloadAction<IAddPaymentMethodResponse>) => {
            state.updateContactRequesting = false;
            state.updateContactSuccess = true;
            state.updateContactInfo = action.payload;
        },
        updateContactFailure: (state, action: PayloadAction<any>) => {
            state.updateContactRequesting = false;
            state.updateContactSuccess = false;
            state.updateContactFailure = true;
            state.updateContactError = action.payload;
        },
        resetUpdateContactRequest: (state) => {
            state.updateContactRequesting = false;
            state.updateContactSuccess = false;
            state.updateContactFailure = false;
            state.updateContactError = null;
        },
        // ***** Get Contacts *****
        // ******************************
        getContactsRequest: (state, action: PayloadAction<string>) => {
            state.getContactsRequesting = true;
        },
        getContactsSuccess: (state, action: PayloadAction<IGetContactDetailsResponse>) => {
            state.getContactsRequesting = false;
            state.getContactsSuccess = true;
            state.contacts = action.payload;
        },
        getContactsFailure: (state, action: PayloadAction<any>) => {
            state.getContactsRequesting = false;
            state.getContactsSuccess = false;
            state.getContactsFailure = true;
            state.getContactsError = action.payload;
        },
    }
});

export default SettingSlice.reducer;

export const {
    // Add Payment method
    addPaymentMethodRequest,
    addPaymentMethodSuccess,
    addPaymentMethodFailure,
    resetAddPaymentMethodRequest,
    // Delete Payment method
    deletePaymentMethodRequest,
    deletePaymentMethodSuccess,
    deletePaymentMethodFailure,
    resetDeletePaymentMethodRequest,
    // Update Payment method
    updatePaymentMethodRequest,
    updatePaymentMethodSuccess,
    updatePaymentMethodFailure,
    resetUpdatePaymentMethodRequest,
    // Get Payment Methods
    getPaymentMethodsRequest,
    getPaymentMethodsSuccess,
    getPaymentMethodsFailure,

    // Add Footer Content
    addFooterContentRequest,
    addFooterContentSuccess,
    addFooterContentFailure,
    resetFooterContentRequest,
    // Delete Footer Content
    deleteFooterContentRequest,
    deleteFooterContentSuccess,
    deleteFooterContentFailure,
    resetDeleteFooterContentRequest,
    // Update Footer  Content
    updateFooterContentRequest,
    updateFooterContentSuccess,
    updateFooterContentFailure,
    resetUpdateFooterContentRequest,
    // Get Footer Contents
    getFooterContentsRequest,
    getFooterContentsSuccess,
    getFooterContentsFailure,

    // Add Document
    addDocumentRequest,
    addDocumentSuccess,
    addDocumentFailure,
    resetAddDocumentRequest,
    // Delete Document
    deleteDocumentRequest,
    deleteDocumentSuccess,
    deleteDocumentFailure,
    resetDeleteDocumentRequest,
    // Update Document
    updateDocumentRequest,
    updateDocumentSuccess,
    updateDocumentFailure,
    resetUpdateDocumentRequest,
    // Get Documents
    getDocumentsRequest,
    getDocumentsSuccess,
    getDocumentsFailure,

    // Add Signature
    addSignatureRequest,
    addSignatureSuccess,
    addSignatureFailure,
    resetAddSignatureRequest,
    // Delete Signature
    deleteSignatureRequest,
    deleteSignatureSuccess,
    deleteSignatureFailure,
    resetDeleteSignatureRequest,
    // Get Signatures
    getSignaturesRequest,
    getSignaturesSuccess,
    getSignaturesFailure,

    // Add Contact
    addContactRequest,
    addContactSuccess,
    addContactFailure,
    resetAddContactRequest,
    // Delete Contact
    deleteContactRequest,
    deleteContactSuccess,
    deleteContactFailure,
    resetDeleteContactRequest,
    // Update Contact
    updateContactRequest,
    updateContactSuccess,
    updateContactFailure,
    resetUpdateContactRequest,
    // Get Contacts
    getContactsRequest,
    getContactsSuccess,
    getContactsFailure,

} = SettingSlice.actions;