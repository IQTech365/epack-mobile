import React, {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import {
  addLorryReducer,
  initialState,
  ACTION,
} from '../views/vehicle/components/ManageVehicleView/AddVehicleFormView/addLorryReducer2';

const useAddLorryFormContext = () => {
  const [state, dispatch] = useReducer(addLorryReducer, initialState);

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

  const setSubEntityId = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.SUB_ENTITY_ID,
        payload: text,
      });
    },
    [state.sub_entity_id],
  );

  const setLorryCompanyName = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LORRY_COMPANY_NAME,
        payload: text,
      });
    },
    [state.lorry_company_name],
  );

  const setLorryType = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LORRY_TYPE,
        payload: text,
      });
    },
    [state.lorry_type],
  );

  const setRegistrationNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.REG_NUMBER,
        payload: text,
      });
    },
    [state.reg_number],
  );

  const setVehicleModel = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.VEHICLE_MODEL,
        payload: text,
      });
    },
    [state.vehicle_model],
  );

  const setManufacturingYear = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.MANUFACTURING_YEAR,
        payload: text,
      });
    },
    [state.manufacturing_year],
  );

  const setVehicleChasisNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.VEHICLE_CHASIS_NO,
        payload: text,
      });
    },
    [state.vehicle_chasis_no],
  );

  const setVehicleEngineNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.VEHICLE_ENGINE_NO,
        payload: text,
      });
    },
    [state.vehicle_engine_no],
  );

  const setVehicleRCNumber = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.VEHICLE_RC_NO,
        payload: text,
      });
    },
    [state.vehicle_rc_no],
  );

  const setVehicleRCPhoto = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.VEHICLE_RC_PHOTO,
        payload: text,
      });
    },
    [state.vehicle_rc_photo],
  );

  const setPollutionCertificateNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.POLLUTION_CERTIFICATE_NO,
        payload: text,
      });
    },
    [state.pollution_certificate_no],
  );

  const setPollutionRenewalDate = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.POLLUTION_CERTIFICATE_RENEWWAL_DATE,
        payload: text,
      });
    },
    [state.pollution_certificate_renewal_date],
  );

  const setPollutionCertificatePhoto = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.POLLUTION_CERTIFICATE_PHOTO,
        payload: text,
      });
    },
    [state.pollution_certificate_photo],
  );

  const setPermitNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PERMIT_NO,
        payload: text,
      });
    },
    [state.permit_no],
  );

  const setPermitNoRenewalDate = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PERMIT_NO_RENEWAL_DATE,
        payload: text,
      });
    },
    [state.permit_no_renewal_date],
  );

  const setPermitPhoto = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PERMIT_PHOTO,
        payload: text,
      });
    },
    [state.permit_photo],
  );

  return {
    state,
    setEntity,
    setSubEntity,
    setSubEntityId,
    setLorryCompanyName,
    setLorryType,
    setRegistrationNo,
    setVehicleModel,
    setManufacturingYear,
    setVehicleChasisNo,
    setVehicleEngineNo,
    setVehicleRCNumber,
    setVehicleRCPhoto,
    setPollutionCertificateNo,
    setPollutionRenewalDate,
    setPollutionCertificatePhoto,
    setPermitNo,
    setPermitNoRenewalDate,
    setPermitPhoto,
  };
};

type UseAddLorryFormContextType = ReturnType<typeof useAddLorryFormContext>;

const initAddLorryFormContextState: UseAddLorryFormContextType = {
  state: initialState,
  setEntity: (text: string) => {},
  setSubEntity: (text: string) => {},
  setSubEntityId: (text: string) => {},
  setLorryCompanyName: (text: string) => {},
  setLorryType: (text: string) => {},
  setVehicleModel: (text: string) => {},
  setRegistrationNo: (text: string) => {},
  setManufacturingYear: (text: string) => {},
  setVehicleChasisNo: (text: string) => {},
  setVehicleEngineNo: (text: string) => {},
  setVehicleRCNumber: (text: string) => {},
  setVehicleRCPhoto: (text: string) => {},
  setPollutionCertificateNo: (text: string) => {},
  setPollutionRenewalDate: (text: string) => {},
  setPollutionCertificatePhoto: (text: string) => {},
  setPermitNo: (text: string) => {},
  setPermitNoRenewalDate: (text: string) => {},
  setPermitPhoto: (text: string) => {},
};

const AddLorryFormContext = createContext<UseAddLorryFormContextType>(
  initAddLorryFormContextState,
);

const useAddLorryFormContextHook = () => useContext(AddLorryFormContext);

const AddLorryFormContextProvider: React.FC<{children: ReactElement}> = ({
  children,
}) => {
  return (
    <AddLorryFormContext.Provider value={useAddLorryFormContext()}>
      {children}
    </AddLorryFormContext.Provider>
  );
};

export {useAddLorryFormContextHook, AddLorryFormContextProvider};
