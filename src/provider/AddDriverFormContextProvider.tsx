import React, {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import {
  addDriverReducer,
  initialState,
  ACTION,
} from '../views/vehicle/components/ManageDriverView/AddDriverFormView/addDriverReducer2';

const useAddDriverFormContext = () => {
  const [state, dispatch] = useReducer(addDriverReducer, initialState);

  const setEntity = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.ENTITY,
        payload: text,
      });
    },
    [state.entity],
  );

  const setSubEntity = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.SUB_ENTITY,
        payload: text,
      });
    },
    [state.sub_entity],
  );

  const setDriverName = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DRIVER_NAME,
        payload: text,
      });
    },
    [state.driver_name],
  );

  const setDriverPhoto = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DRIVER_PHOTO,
        payload: text,
      });
    },
    [state.driver_photo],
  );

  const setDriverPhotoFile = useCallback(
    (file: any) => {
      dispatch({
        type: ACTION.DRIVER_PHOTO_FILE,
        payload: file,
      });
    },
    [state.driver_photo_file],
  );

  const setDriverMobileNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DRIVER_MOBILE_NO,
        payload: text,
      });
    },
    [state.driver_mobile_no],
  );

  const setDriverLicenseNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DRIVER_LICENSE_NO,
        payload: text,
      });
    },
    [state.driver_license_no],
  );

  const setLicensePhoto = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LICENSE_PHOTO,
        payload: text,
      });
    },
    [state.license_photo],
  );

  const setLicensePhotoFile = useCallback(
    (file: any) => {
      dispatch({
        type: ACTION.LICENSE_PHOTO_FILE,
        payload: file,
      });
    },
    [state.license_photo_file],
  );

  const setAadharCardNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.AADHAR_CARD_NO,
        payload: text,
      });
    },
    [state.aadhar_card_no],
  );

  const setAadharFrontPhoto = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.AADHAR_FRONT_PHOTO,
        payload: text,
      });
    },
    [state.aadhar_front_photo],
  );

  const setAadharFrontPhotoFile = useCallback(
    (file: any) => {
      dispatch({
        type: ACTION.AADHAR_FRONT_PHOTO_FILE,
        payload: file,
      });
    },
    [state.aadhar_front_photo_file],
  );

  const setAaadharBackPhoto = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.AADHAR_BACK_PHOTO,
        payload: text,
      });
    },
    [state.aadhar_back_photo],
  );

  const setAaadharBackPhotoFile = useCallback(
    (file: any) => {
      dispatch({
        type: ACTION.AADHAR_BACK_PHOTO_FILE,
        payload: file,
      });
    },
    [state.aadhar_back_photo_file],
  );

  const setPermanentAddPincode = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PERMANENT_ADD_PINCODE,
        payload: text,
      });
    },
    [state.permanent_add_pincode],
  );

  const setPermanentAddState = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PERMANENT_ADD_STATE,
        payload: text,
      });
    },
    [state.permanent_add_state],
  );

  const setPermanentAddCity = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PERMANENT_ADD_CITY,
        payload: text,
      });
    },
    [state.permanent_add_city],
  );

  const setPermanentAddLocality = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PERMANENT_ADD_LOCALITY,
        payload: text,
      });
    },
    [state.permanent_add_locality],
  );

  const setPermanentAddress = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PERMANENT_ADD_ADDRESS,
        payload: text,
      });
    },
    [state.permanent_add_address],
  );

  const setIsCurrentAddSameAsPermanent = useCallback(
    (value: boolean) => {
      dispatch({
        type: ACTION.IS_CURRENT_ADD_SAME_AS_PERMANENT,
        payload: value,
      });
    },
    [state.is_current_add_same_as_permanent],
  );

  const setCurrentAddPincode = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CURRENT_ADD_PINCODE,
        payload: text,
      });
    },
    [state.current_add_pincode],
  );

  const setCurrentAddState = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CURRENT_ADD_STATE,
        payload: text,
      });
    },
    [state.current_add_state],
  );

  const setCurrentAddCity = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CURRENT_ADD_CITY,
        payload: text,
      });
    },
    [state.current_add_city],
  );

  const setCurrentAddLocality = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CURRENT_ADD_LOCALITY,
        payload: text,
      });
    },
    [state.current_add_locality],
  );

  const setCurrentAddress = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CURRENT_ADD_ADDRESS,
        payload: text,
      });
    },
    [state.current_add_address],
  );

  return {
    state,
    setEntity,
    setSubEntity,
    setDriverName,
    setDriverPhoto,
    setDriverPhotoFile,
    setDriverMobileNo,
    setDriverLicenseNo,
    setLicensePhoto,
    setLicensePhotoFile,
    setAadharCardNo,
    setAadharFrontPhoto,
    setAadharFrontPhotoFile,
    setAaadharBackPhoto,
    setAaadharBackPhotoFile,
    setPermanentAddPincode,
    setPermanentAddState,
    setPermanentAddCity,
    setPermanentAddLocality,
    setPermanentAddress,
    setIsCurrentAddSameAsPermanent,
    setCurrentAddPincode,
    setCurrentAddState,
    setCurrentAddCity,
    setCurrentAddLocality,
    setCurrentAddress,
  };
};

type UseAddDriverFormContextType = ReturnType<typeof useAddDriverFormContext>;

const initAddDriverFormContextState: UseAddDriverFormContextType = {
  state: initialState,
  setEntity: (text: string) => {},
  setSubEntity: (text: string) => {},
  setDriverName: (text: string) => {},
  setDriverPhoto: (text: string) => {},
  setDriverPhotoFile: (file:any) => {},
  setDriverMobileNo: (text: string) => {},
  setDriverLicenseNo: (text: string) => {},
  setLicensePhoto: (text: string) => {},
  setLicensePhotoFile: (file:any) => {},
  setAadharCardNo: (text: string) => {},
  setAadharFrontPhoto: (text: string) => {},
  setAadharFrontPhotoFile: (file:any) => {},
  setAaadharBackPhoto: (text: string) => {},
  setAaadharBackPhotoFile: (file:any) => {},
  setPermanentAddPincode: (text: string) => {},
  setPermanentAddState: (text: string) => {},
  setPermanentAddCity: (text: string) => {},
  setPermanentAddLocality: (text: string) => {},
  setPermanentAddress: (text: string) => {},
  setIsCurrentAddSameAsPermanent: (value: boolean) => {},
  setCurrentAddPincode: (text: string) => {},
  setCurrentAddState: (text: string) => {},
  setCurrentAddCity: (text: string) => {},
  setCurrentAddLocality: (text: string) => {},
  setCurrentAddress: (text: string) => {},
};

const AddDriverFormContext = createContext<UseAddDriverFormContextType>(
  initAddDriverFormContextState,
);

const useAddDriverFormContextHook = () => useContext(AddDriverFormContext);

const AddDriverFormContextProvider: React.FC<{children: ReactElement}> = ({
  children,
}) => {
  return (
    <AddDriverFormContext.Provider value={useAddDriverFormContext()}>
      {children}
    </AddDriverFormContext.Provider>
  );
};

export {useAddDriverFormContextHook, AddDriverFormContextProvider};
