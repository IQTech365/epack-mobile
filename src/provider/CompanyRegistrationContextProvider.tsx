import React, {
  createContext,
  ReactElement,
  useReducer,
  useCallback,
  useContext,
} from 'react';
import {
  registrationReducer,
  initialState,
  ACTION,
} from '../views/company/registrationReducer';

const useCompanyRegistrationContext = () => {
  const [state, dispatch] = useReducer(registrationReducer, initialState);

  const setCompanyName = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.COMPANY_NAME,
        payload: text,
      }),
    [state.company_name],
  );

  const setContactPerson = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.CONTACT_PERSON,
        payload: text,
      }),
    [state.contact_person],
  );

  const setMobile = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.MOBILE,
        payload: text,
      }),
    [state.mobile],
  );

  const setEmail = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.EMAIL,
        payload: text,
      }),
    [state.email],
  );

  const setPincode2 = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.PINCODE,
        payload: text,
      }),
    [state.pincode],
  );

  const setState = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.STATE,
        payload: text,
      }),
    [state.state],
  );

  const setCity = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.CITY,
        payload: text,
      }),
    [state.city],
  );

  const setAddress = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.ADDRESS,
        payload: text,
      }),
    [state.address],
  );

  const setIbaApprovalStatus = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.IBA_APPROVAL_STATUS,
        payload: text,
      }),
    [state.iba_approval_status],
  );

  const setIbaCode = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.IBA_APPROVAL_CODE,
        payload: text,
      }),
    [state.iba_approval_code],
  );

  const setIbaExpiryDate = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.IBA_EXPIRY_DATE,
        payload: text,
      }),
    [state.iba_expiry_date],
  );

  const setCompanyType = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.COMPANY_TYPE,
        payload: text,
      }),
    [state.company_type],
  );

  const setDocument = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.GOVT_DOCUMENT,
        payload: text,
      }),
    [state.govt_document],
  );

  const setCompanyLogo = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.COMPANY_LOGO_URL,
        payload: text,
      }),
    [state.company_logo_url],
  );

  const setCompanySignature = useCallback(
    (text: string) =>
      dispatch({
        type: ACTION.COMPANY_SIGNATURE_URL,
        payload: text,
      }),
    [state.company_signature_url],
  );

  return {
    state,
    setCompanyName,
    setContactPerson,
    setMobile,
    setEmail,
    setPincode2,
    setState,
    setCity,
    setIbaApprovalStatus,
    setIbaCode,
    setIbaExpiryDate,
    setAddress,
    setCompanyType,
    setDocument,
    setCompanyLogo,
    setCompanySignature,
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
  setPincode2: (text: string) => {},
  setState: (text: string) => {},
  setCity: (text: string) => {},
  setIbaApprovalStatus: (text: string) => {},
  setIbaCode: (text: string) => {},
  setIbaExpiryDate: (text: string) => {},
  setAddress: (text: string) => {},
  setCompanyType: (text: string) => {},
  setDocument: (text: string) => {},
  setCompanyLogo: (text: string) => {},
  setCompanySignature: (text: string) => {},
};

const CompanyRegistrationContext =
  createContext<UseCompanyRegistrationContextType>(
    initCompanyRegistrationContextState,
  );

const useCompanyRegistrationContextHook = () =>
  useContext(CompanyRegistrationContext);

const CompanyRegistrationContextProvider: React.FC<{
  children: ReactElement;
}> = ({children}) => {
  return (
    <CompanyRegistrationContext.Provider
      value={useCompanyRegistrationContext()}>
      {children}
    </CompanyRegistrationContext.Provider>
  );
};

export {useCompanyRegistrationContextHook, CompanyRegistrationContextProvider};
