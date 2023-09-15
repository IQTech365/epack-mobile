import React, {
  createContext,
  ReactElement,
  useReducer,
  useCallback,
  useContext,
} from 'react';
import {
  companyRegistrationReducer,
  initialState,
  ICompanyRegistrationState,
  COMPANY_REGISTRATION_ACTION,
  IDocumentSerialNo,
  IDocumentTemplate,
} from '../views/company/registrationReducer';

const useCompanyRegistrationContext = () => {
  const [state, dispatch] = useReducer(
    companyRegistrationReducer,
    initialState,
  );

  const setCompanyName = useCallback(
    (text: string) =>   dispatch({
      type: COMPANY_REGISTRATION_ACTION.COMPANY_NAME,
      payload: text,
    }),
    [state.companyName],
  );

  const setContactPerson = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.CONTACT_PERSON,
        payload: text,
      }),
    [],
  );

  const setMobile = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.MOBILE,
        payload: text,
      }),
    [],
  );

  const setEmail = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.EMAIL,
        payload: text,
      }),
    [],
  );

  const setPincode = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.PIN_CODE,
        payload: text,
      }),
    [],
  );

  const setState = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.STATE,
        payload: text,
      }),
    [],
  );

  const setCity = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.CITY,
        payload: text,
      }),
    [],
  );

  const setAddress = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.ADDRESS,
        payload: text,
      }),
    [],
  );

  const setIbaApprovalCode = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.IBA_APPROVAL_CODE,
        payload: text,
      }),
    [],
  );

  const setIbaApprovalTillDate = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.IBA_CODE_VALID_TILL,
        payload: text,
      }),
    [],
  );

  const setCompanyType = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.COMPANY_TYPE,
        payload: text,
      }),
    [],
  );

  const setDocument = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.DOCUMENT,
        payload: text,
      }),
    [],
  );

  const setCompanyLogo = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.COMPANY_LOGO,
        payload: text,
      }),
    [],
  );

  const setOwnerSignature = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.OWNER_SIGNATURE,
        payload: text,
      }),
    [],
  );

  const setShiftingLuggage = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.SHIFTING_LUGGAGE,
        payload: text,
      }),
    [],
  );

  const setDocumentSerialNumber = useCallback(
    (document: IDocumentSerialNo) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.DOCUMENT_SERIAL_NUMBERS,
        payload: document as IDocumentSerialNo,
      }),
    [],
  );

  const setDocumentTemplates = useCallback(
    (document: IDocumentTemplate) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.DOCUMENT_TEMPLATES,
        payload: document as IDocumentTemplate,
      }),
    [],
  );

  // Errors
  const setCompanyNameError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.COMPANY_NAME_ERROR,
        payload: text,
      }),
    [],
  );

  const setContactPersonError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.CONTACT_PERSON_ERROR,
        payload: text,
      }),
    [],
  );

  const setMobileError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.MOBILE_ERROR,
        payload: text,
      }),
    [],
  );

  const setEmailError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.EMAIL_ERROR,
        payload: text,
      }),
    [],
  );

  const setPincodeError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.PINCODE_ERROR,
        payload: text,
      }),
    [],
  );

  const setStateError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.STATE_ERROR,
        payload: text,
      }),
    [],
  );

  const setCityError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.CITY_ERROR,
        payload: text,
      }),
    [],
  );

  const setAddressError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.ADDRESS_ERROR,
        payload: text,
      }),
    [],
  );

  const setIbaApprovalCodeError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.IBA_APPROVAL_CODE_ERROR,
        payload: text,
      }),
    [],
  );

  const setIbaApprovalTillDateError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.IBA_CODE_VALID_TILL_ERROR,
        payload: text,
      }),
    [],
  );

  const setCompanyTypeError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.COMPANY_TYPE_ERROR,
        payload: text,
      }),
    [],
  );

  const setDocumentError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.DOCUMENT_ERROR,
        payload: text,
      }),
    [],
  );

  const setCompanyLogoError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.COMPANY_LOGO_ERROR,
        payload: text,
      }),
    [],
  );

  const setOwnerSignatureError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.OWNER_SIGNATURE_ERROR,
        payload: text,
      }),
    [],
  );

  const setShiftingLuggageError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.SHIFTING_LUGGAGE_ERROR,
        payload: text,
      }),
    [],
  );

  const setDocumentSerialNumberError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.DOCUMENT_SERIAL_NUMBERS_ERROR,
        payload: text,
      }),
    [],
  );

  const setDocumentTemplatesError = useCallback(
    (text: string) =>
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.DOCUMENT_TEMPLATES_ERROR,
        payload: text,
      }),
    [],
  );

  return {
    state,
    setCompanyName,
    setContactPerson,
    setMobile,
    setEmail,
    setPincode,
    setState,
    setCity,
    setIbaApprovalCode,
    setIbaApprovalTillDate,
    setAddress,
    setCompanyType,
    setDocument,
    setCompanyLogo,
    setOwnerSignature,
    setShiftingLuggage,
    setDocumentSerialNumber,
    setDocumentTemplates,
    // Errors
    setCompanyNameError,
    setContactPersonError,
    setMobileError,
    setEmailError,
    setPincodeError,
    setStateError,
    setCityError,
    setIbaApprovalCodeError,
    setIbaApprovalTillDateError,
    setAddressError,
    setCompanyTypeError,
    setDocumentError,
    setCompanyLogoError,
    setOwnerSignatureError,
    setShiftingLuggageError,
    setDocumentSerialNumberError,
    setDocumentTemplatesError,
  };
};

type UseCompanyRegistrationContextType = ReturnType<
  typeof useCompanyRegistrationContext
>;

const initCompanyRegistrationContextState: UseCompanyRegistrationContextType = {
  state: initialState,
  setCompanyName: (text: string) => {},
  setContactPerson: (text: string) => {},
  setMobile: (text: string) => {},
  setEmail: (text: string) => {},
  setPincode: (text: string) => {},
  setState: (text: string) => {},
  setCity: (text: string) => {},
  setIbaApprovalCode: (text: string) => {},
  setIbaApprovalTillDate: (text: string) => {},
  setAddress: (text: string) => {},
  setCompanyType: (text: string) => {},
  setDocument: (text: string) => {},
  setCompanyLogo: (text: string) => {},
  setOwnerSignature: (text: string) => {},
  setShiftingLuggage: (text: string) => {},
  setDocumentSerialNumber: (document: IDocumentSerialNo) => {},
  setDocumentTemplates: (document: IDocumentTemplate) => {},
  // Errors
  setCompanyNameError: (text: string) => {},
  setContactPersonError: (text: string) => {},
  setMobileError: (text: string) => {},
  setEmailError: (text: string) => {},
  setPincodeError: (text: string) => {},
  setStateError: (text: string) => {},
  setCityError: (text: string) => {},
  setIbaApprovalCodeError: (text: string) => {},
  setIbaApprovalTillDateError: (text: string) => {},
  setAddressError: (text: string) => {},
  setCompanyTypeError: (text: string) => {},
  setDocumentError: (text: string) => {},
  setCompanyLogoError: (text: string) => {},
  setOwnerSignatureError: (text: string) => {},
  setShiftingLuggageError: (text: string) => {},
  setDocumentSerialNumberError: (text: string) => {},
  setDocumentTemplatesError: (text: string) => {},
};

const CompanyRegistrationContext = createContext<UseCompanyRegistrationContextType>(initCompanyRegistrationContextState);

const useCompanyRegistrationContextHook = () => useContext(CompanyRegistrationContext);

const CompanyRegistrationContextProvider: React.FC<{
  children: ReactElement;
}> = ({children}) => {
  return (
    <CompanyRegistrationContext.Provider value={useCompanyRegistrationContext()}>
      {children}
    </CompanyRegistrationContext.Provider>
  );
};

export {useCompanyRegistrationContextHook, CompanyRegistrationContextProvider};
