import React, {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import {
  invoiceReducer,
  initialState,
  ACTION,
} from '../views/order/orderDetails/components/InvoiceFormView/InvoiceReducer2';

const useInvoiceFormContext = () => {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);

  const setBillingType = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.BILING_TYPE,
        payload: text,
      });
    },
    [state.billing_type],
  );

  const setSameAsClientAddress = useCallback(
    (value: boolean) => {
      dispatch({
        type: ACTION.SAME_AS_CLIENT_ADDRESS,
        payload: value,
      });
    },
    [state.same_as_client_address],
  );

  const setLoadType = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.FREIGHT_LOAD_TYPE,
        payload: text,
      });
    },
    [state.freight_load_type],
  );

  const setFreightCharges = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.FREIGHT_CHARGES,
        payload: text,
      });
    },
    [state.freight_charges],
  );

  const setFreightHSN = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.FREIGHT_HSN,
        payload: text,
      });
    },
    [state.freight_hsn],
  );

  // ****** Pickup Charges *********
  const setPickupCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PICKUP_CHARGE,
        payload: text,
      });
    },
    [state.pickup_charge],
  );

  const setPickupChargeAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PICKUP_CHARGE_AMOUNT,
        payload: text,
      });
    },
    [state.pickup_charge_amount],
  );

  const setPickupChargeHSN = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PICKUP_CHARGE_HSN,
        payload: text,
      });
    },
    [state.pickup_charge_hsn],
  );

  // ****** Door Delivery Charges *********
  const setDoorDeliveryCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DOOR_DELIVERY_CHARGE,
        payload: text,
      });
    },
    [state.door_delivery_charge],
  );

  const setDoorDeliveryAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DOOR_DELIVERY_AMOUNT,
        payload: text,
      });
    },
    [state.door_delivery_amount],
  );

  const setDoorDeliveryHSN = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PICKUP_CHARGE_HSN,
        payload: text,
      });
    },
    [state.door_delivery_hsn],
  );

  return {
    state,
    setBillingType,
    setLoadType,
    setSameAsClientAddress,
    setFreightCharges,
    setFreightHSN,
    // Pickup Charge
    setPickupCharge,
    setPickupChargeAmount,
    setPickupChargeHSN,
    // Door Delivery Charge
    setDoorDeliveryCharge,
    setDoorDeliveryAmount,
    setDoorDeliveryHSN,
  };
};

type UseInvoiceFormContextType = ReturnType<typeof useInvoiceFormContext>;

const initInvoiceFormContextState: UseInvoiceFormContextType = {
  state: initialState,
  setBillingType: (text: string) => {},
  setLoadType: (text: string) => {},
  setSameAsClientAddress: (value: boolean) => {},
  setFreightCharges: (text: string) => {},
  setFreightHSN: (text: string) => {},
  // Pickup Charge
  setPickupCharge: (text: string) => {},
  setPickupChargeAmount: (text: string) => {},
  setPickupChargeHSN: (text: string) => {},
  // Door Delivery Charge
  setDoorDeliveryCharge: (text: string) => {},
  setDoorDeliveryAmount: (text: string) => {},
  setDoorDeliveryHSN: (text: string) => {},
};

const InvoiceFormContext = createContext<UseInvoiceFormContextType>(
  initInvoiceFormContextState,
);

const useInvoiceFormContextHook = () => useContext(InvoiceFormContext);

const InvoiceFormContextProvider: React.FC<{children: ReactElement}> = ({
  children,
}) => {
  return (
    <InvoiceFormContext.Provider value={useInvoiceFormContext()}>
      {children}
    </InvoiceFormContext.Provider>
  );
};

export {useInvoiceFormContextHook, InvoiceFormContextProvider};
