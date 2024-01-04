import React, {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import {
  addOrderReducer,
  initialState,
  ACTION,
} from '../views/order/addOrder/addOrderReducer2';

const useOrderFormContext = () => {
  const [state, dispatch] = useReducer(addOrderReducer, initialState);

  const setBillingType = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.SHIFTING_TYPE,
        payload: text,
      });
    },
    [state.shifting_type],
  );

  const setDateOfMoving = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DATE_OF_MOVING,
        payload: text,
      });
    },
    [state.date_of_moving],
  );

  const setOrderAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.ORDER_AMOUNT,
        payload: text,
      });
    },
    [state.order_amount],
  );

  const setTokenAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.TOKEN_AMOUNT,
        payload: text,
      });
    },
    [state.token_amount],
  );

  const setShiftingLuggages = useCallback(
    (list: string[]) => {
      dispatch({
        type: ACTION.SHIFTING_LUGGAGE,
        payload: list,
      });
    },
    [state.shifting_luggages],
  );

  const setBillingBy = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.BILLING_BY,
        payload: text,
      });
    },
    [state.billing_by],
  );

  const setPartyName = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PARTY_NAME,
        payload: text,
      });
    },
    [state.party_name],
  );

  const setPartyMobileNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PARTY_MOBILE_NO,
        payload: text,
      });
    },
    [state.party_mobile_no],
  );

  const setCompanyName = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.COMPANY_NAME,
        payload: text,
      });
    },
    [state.company_name],
  );

  const setApprovalAuthority = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.APPROVAL_AUTHORITY,
        payload: text,
      });
    },
    [state.approval_authority],
  );

  const setAuthorityPersonName = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.AUTHORITY_PERSON_NAME,
        payload: text,
      });
    },
    [state.authority_person_name],
  );

  const setAuthorityMobileNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.AUTHORITY_MOBILE_NUMBER,
        payload: text,
      });
    },
    [state.authority_mobile_no],
  );

  const setCompanyGST = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.COMPANY_GST,
        payload: text,
      });
    },
    [state.company_gst],
  );

  const setEmployeeName = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.EMPLOYEE_NAME,
        payload: text,
      });
    },
    [state.employee_name],
  );

  const setEmployeeDesignation = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.EMPLOYEE_DESIGNATION,
        payload: text,
      });
    },
    [state.employee_designation],
  );

  const setEmployeeMobileNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.EMPLOYEE_MOBILE_NUMBER,
        payload: text,
      });
    },
    [state.employee_mobile_no],
  );

  const setCompanyAddress = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.COMPANY_ADDRESS,
        payload: text,
      });
    },
    [state.company_address],
  );

  const setCompanyPincode = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.COMPANY_PINCODE,
        payload: text,
      });
    },
    [state.company_pincode],
  );

  const setCompanyState = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.COMPANY_STATE,
        payload: text,
      });
    },
    [state.company_state],
  );

  const setCompanyCity = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.COMPANY_CITY,
        payload: text,
      });
    },
    [state.company_city],
  );

  const setPickupPincode = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.P_PINCODE,
        payload: text,
      });
    },
    [state.p_pincode],
  );

  const setPickupCity = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.P_CITY,
        payload: text,
      });
    },
    [state.p_city],
  );

  const setPickupState = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.P_STATE,
        payload: text,
      });
    },
    [state.p_state],
  );

  const setPickupAddress = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.P_ADDRESS,
        payload: text,
      });
    },
    [state.p_address],
  );

  const setPickupCurrentFloor = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.P_CURRENT_FLOOR,
        payload: text,
      });
    },
    [state.p_current_floor],
  );

  const setPickupLiftStatus = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.P_LIFT_STATUS,
        payload: text,
      });
    },
    [state.p_lift_status],
  );

  const setDropPincode = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.D_PINCODE,
        payload: text,
      });
    },
    [state.d_pincode],
  );

  const setDropCity = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.D_CITY,
        payload: text,
      });
    },
    [state.d_city],
  );

  const setDropState = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.D_STATE,
        payload: text,
      });
    },
    [state.d_state],
  );

  const setDropAddress = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.D_ADDRESS,
        payload: text,
      });
    },
    [state.d_address],
  );

  const setDropCurrentFloor = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.D_CURRENT_FLOOR,
        payload: text,
      });
    },
    [state.d_lift_status],
  );

  const setDropLiftStatus = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.D_LIFT_STATUS,
        payload: text,
      });
    },
    [state.d_lift_status],
  );

  return {
    state,
    setBillingType,
    setDateOfMoving,
    setOrderAmount,
    setTokenAmount,
    setShiftingLuggages,
    setBillingBy,
    setPartyName,
    setPartyMobileNo,
    setCompanyName,
    setApprovalAuthority,
    setAuthorityPersonName,
    setAuthorityMobileNo,
    setCompanyGST,
    setEmployeeName,
    setEmployeeMobileNo,
    setEmployeeDesignation,
    setCompanyAddress,
    setCompanyState,
    setCompanyPincode,
    setCompanyCity,
    setPickupPincode,
    setPickupState,
    setPickupCity,
    setPickupAddress,
    setPickupCurrentFloor,
    setPickupLiftStatus,
    setDropPincode,
    setDropState,
    setDropCity,
    setDropAddress,
    setDropCurrentFloor,
    setDropLiftStatus,
  };
};

type UsOrderFormContextType = ReturnType<typeof useOrderFormContext>;

const initOrderFormContextState: UsOrderFormContextType = {
  state: initialState,
  setBillingType: (text: string) => {},
  setDateOfMoving: (text: string) => {},
  setOrderAmount: (text: string) => {},
  setTokenAmount: (text: string) => {},
  setShiftingLuggages: (list: string[]) => {},
  setBillingBy: (text: string) => {},
  setPartyName: (text: string) => {},
  setPartyMobileNo: (text: string) => {},
  setCompanyName: (text: string) => {},
  setApprovalAuthority: (text: string) => {},
  setAuthorityPersonName: (text: string) => {},
  setAuthorityMobileNo: (text: string) => {},
  setCompanyGST: (text: string) => {},
  setEmployeeName: (text: string) => {},
  setEmployeeMobileNo: (text: string) => {},
  setEmployeeDesignation: (text: string) => {},
  setCompanyAddress: (text: string) => {},
  setCompanyState: (text: string) => {},
  setCompanyPincode: (text: string) => {},
  setCompanyCity: (text: string) => {},
  setPickupPincode: (text: string) => {},
  setPickupState: (text: string) => {},
  setPickupCity: (text: string) => {},
  setPickupAddress: (text: string) => {},
  setPickupCurrentFloor: (text: string) => {},
  setPickupLiftStatus: (text: string) => {},
  setDropPincode: (text: string) => {},
  setDropState: (text: string) => {},
  setDropCity: (text: string) => {},
  setDropAddress: (text: string) => {},
  setDropCurrentFloor: (text: string) => {},
  setDropLiftStatus: (text: string) => {},
};

const OrderFormContext = createContext<UsOrderFormContextType>(
  initOrderFormContextState,
);

const useOrderFormContextHook = () => useContext(OrderFormContext);

const OrderFormContextProvider: React.FC<{children: ReactElement}> = ({
  children,
}) => {
  return (
    <OrderFormContext.Provider value={useOrderFormContext()}>
      {children}
    </OrderFormContext.Provider>
  );
};

export {useOrderFormContextHook, OrderFormContextProvider};
