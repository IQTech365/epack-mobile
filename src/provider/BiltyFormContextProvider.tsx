import React, {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import {
  biltyReducer,
  initialState,
  ACTION,
  IMaterial,
  IVehicleBilty,
} from '../views/order/orderDetails/components/BiltyFormView/biltyReducer2';

const useBiltyFormContext = () => {
  const [state, dispatch] = useReducer(biltyReducer, initialState);

  // **** Basic Details ****
  const setBiltyLrCrNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.BILTY_LR_CN_NO,
        payload: text,
      });
    },
    [state.bilty_lr_cr_no],
  );

  const setDateOfBiltyLrCrNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DATE_OF_BILTY_LR_CR,
        payload: text,
      });
    },
    [state.date_of_bilty_lr_cr_no],
  );

  // **** Consigner Details ****
  const setIsConsignerAddressSameAsClient = useCallback(
    (value: boolean) => {
      dispatch({
        type: ACTION.CONSIGNER_ADDRESS_SAME_AS_CLIENT_ADDRESS,
        payload: value,
      });
    },
    [state.consigner_address_same_as_client],
  );
  const setConsignerName = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CONSIGNER_NAME,
        payload: text,
      });
    },
    [state.consigner_name],
  );
  const setConsignerGst = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CONSIGNER_GST,
        payload: text,
      });
    },
    [state.consigner_gst],
  );
  const setConsignerMobileNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CONSIGNER_MOBILE_NO,
        payload: text,
      });
    },
    [state.consigner_mobile_no],
  );
  const setConsignerAddress = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CONSIGNER_ADDRESS,
        payload: text,
      });
    },
    [state.consigner_address],
  );
  const setConsignerPincode = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CONSIGNER_PINCODE,
        payload: text,
      });
    },
    [state.consinger_pincode],
  );
  const setConsignerState = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CONSIGNER_STATE,
        payload: text,
      });
    },
    [state.consigner_state],
  );
  const setConsignerCity = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CONSIGNER_CITY,
        payload: text,
      });
    },
    [state.consigner_city],
  );
  const setIsLoadingAddressSameAsConsigner = useCallback(
    (value: boolean) => {
      dispatch({
        type: ACTION.LOADING_ADDRESS_SAME_AS_CONSINGER_ADDRESS,
        payload: value,
      });
    },
    [state.loading_address_same_as_consigner],
  );

  // **** Loading Address ****
  const setLoadingAddress = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LOADING_ADDRESS,
        payload: text,
      });
    },
    [state.loading_address],
  );
  const setLoadingPincode = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LOADING_PINCODE,
        payload: text,
      });
    },
    [state.loading_pincode],
  );
  const setLoadingState = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LOADING_STATE,
        payload: text,
      });
    },
    [state.loading_state],
  );
  const setLoadingCity = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LOADING_CITY,
        payload: text,
      });
    },
    [state.loading_city],
  );

  // **** Consignee Details ****
  const setIsConsigneeAddressSameAsClient = useCallback(
    (value: boolean) => {
      dispatch({
        type: ACTION.CONSIGNEE_ADDRESS_SAME_AS_CLIENT_ADDRESS,
        payload: value,
      });
    },
    [state.consignee_address_same_as_client],
  );
  const setConsigneeName = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CONSIGNEE_NAME,
        payload: text,
      });
    },
    [state.consignee_name],
  );
  const setConsigneeGst = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CONSIGNEE_GST,
        payload: text,
      });
    },
    [state.consignee_gst],
  );
  const setConsigneeMobileNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CONSIGNEE_MOBILE_NO,
        payload: text,
      });
    },
    [state.consignee_mobile_no],
  );
  const setConsigneeAddress = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CONSIGNEE_ADDRESS,
        payload: text,
      });
    },
    [state.consignee_address],
  );
  const setConsigneePincode = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CONSIGNEE_PINCODE,
        payload: text,
      });
    },
    [state.consignee_pincode],
  );
  const setConsigneeState = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CONSIGNEE_STATE,
        payload: text,
      });
    },
    [state.consignee_state],
  );
  const setConsigneeCity = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CONSIGNEE_CITY,
        payload: text,
      });
    },
    [state.consignee_city],
  );
  const setIsDeliveryAddressSameAsConsignee = useCallback(
    (value: boolean) => {
      dispatch({
        type: ACTION.DELIVERY_ADDRESS_SAME_AS_CONSIGNEE_ADDRESS,
        payload: value,
      });
    },
    [state.delivery_address_same_as_consignee],
  );

  // **** Delivery Address ****
  const setDeliveryAddress = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DELIVERY_ADDRESS,
        payload: text,
      });
    },
    [state.delivery_address],
  );
  const setDeliveryPincode = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DELIVERY_PINCODE,
        payload: text,
      });
    },
    [state.delivery_pincode],
  );
  const setDeliveryState = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DELIVERY_STATE,
        payload: text,
      });
    },
    [state.delivery_state],
  );
  const setDeliveryCity = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.VEHICLE_TYPE,
        payload: text,
      });
    },
    [state.delivery_city],
  );

  // **** Vehicle Details ****
  const setInvoiceNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.INVOICE_NO,
        payload: text,
      });
    },
    [state.invoice_no],
  );
  const setVehicleType = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.VEHICLE_TYPE,
        payload: text,
      });
    },
    [state.vehicle_type],
  );
  const setVehicleNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.VEHICLE_NO,
        payload: text,
      });
    },
    [state.vehicle_no],
  );
  const setFromLocation = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.FROM_LOCATION,
        payload: text,
      });
    },
    [state.from_location],
  );
  const setToLocation = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.TO_LOCATIION,
        payload: text,
      });
    },
    [state.to_location],
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
        type: ACTION.DRIVER_LICENCE_NO,
        payload: text,
      });
    },
    [state.driver_license_no],
  );
  const setSealNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.SEAL_NO,
        payload: text,
      });
    },
    [state.seal_no],
  );
  const setInDate = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.IN_DATE,
        payload: text,
      });
    },
    [state.in_date],
  );
  const setOutDate = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.OUT_DATE,
        payload: text,
      });
    },
    [state.out_date],
  );
  const setTransitDays = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.TRANSIT_DAYS,
        payload: text,
      });
    },
    [state.transit_days],
  );
  const setExpectedDateOfDelivery = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.EXPECTED_DATE_OF_DELIVERY,
        payload: text,
      });
    },
    [state.expected_date_of_delivery],
  );

  // **** E-Way Bill Details ****
  const setEWayBillNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.E_WAY_BILL_NO,
        payload: text,
      });
    },
    [state.e_way_bill_no],
  );
  const setGeneratedOn = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.GENERATED_ON,
        payload: text,
      });
    },
    [state.generated_on],
  );
  const setExpiryDate = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.EXPIRY_DATE,
        payload: text,
      });
    },
    [state.expirty_date],
  );

  // **** Material Details ****
  const setTypeOfMoving = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.TYPE_OF_MOVING,
        payload: text,
      });
    },
    [state.type_of_moving],
  );
  const setAddMaterial = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.ADD_MATERIAL,
        payload: text,
      });
    },
    [state.remark],
  );
  const setMaterials = useCallback(
    (materials: IMaterial[]) => {
      dispatch({
        type: ACTION.MATERIALS,
        payload: materials,
      });
    },
    [state.materials],
  );

  const setMaterialsBilty = useCallback(
    (vehicleBilty: IVehicleBilty[]) => {
      dispatch({
        type: ACTION.VEHICLE_BILTY,
        payload: vehicleBilty,
      });
    },
    [state.vehicleBilty],
  );

  const setRiskType = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.RISK_TYPE,
        payload: text,
      });
    },
    [state.risk_type],
  );

  const setLiabilityOfTax = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LIABILITY_OF_TAX,
        payload: text,
      });
    },
    [state.liability_of_tax],
  );

  // **** Freight Details ****
  const setFreightType = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.FREIGHT_TYPE,
        payload: text,
      });
    },
    [state.freight_type],
  );
  const setFreightCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.FREIGHT_CHARGE,
        payload: text,
      });
    },
    [state.freight_charge],
  );
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
  const setDoorDeliveryCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DOOR_DELIVERY_CHARGE,
        payload: text,
      });
    },
    [state.door_delivery_charge],
  );
  const setDoorDeliveryChargeAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DOOR_DELIVERY_CHARGE_AMOUNT,
        payload: text,
      });
    },
    [state.door_delivery_charge_amount],
  );
  const setPackingCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_CHARGE,
        payload: text,
      });
    },
    [state.packing_charge],
  );
  const setPackingChargeAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_CHARGE_AMOUNT,
        payload: text,
      });
    },
    [state.packing_charge_amount],
  );
  const setPackingMaterialCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_MATERIAL_CHARGE,
        payload: text,
      });
    },
    [state.packing_material_charge],
  );
  const setPackingMaterialChargeAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_MATERIAL_CHARGE_AMOUNT,
        payload: text,
      });
    },
    [state.packing_material_charge_amount],
  );
  const setUnpackingCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNPACKING_CHARGE,
        payload: text,
      });
    },
    [state.unpacking_charge],
  );
  const setUnpackingChargeAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNPACKING_CHARGE_AMOUNT,
        payload: text,
      });
    },
    [state.unpacking_charge_amount],
  );
  const setLoadingCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LOADING_CHARGE,
        payload: text,
      });
    },
    [state.loading_charge],
  );
  const setLoadingChargeAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LOADING_CHARGE_AMOUNT,
        payload: text,
      });
    },
    [state.loading_charge_amount],
  );
  const setUnloadingCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNLOADING_CHARGE,
        payload: text,
      });
    },
    [state.unloading_charge],
  );
  const setUnloadingChargeAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNLOADING_CHARGE_AMOUNT,
        payload: text,
      });
    },
    [state.unloading_charge_amount],
  );
  const setTotalAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.TOTAL_AMOUNT,
        payload: text,
      });
    },
    [state.total_amunt],
  );
  const setAdvanceAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.ADVANCE_AMOUNT,
        payload: text,
      });
    },
    [state.advance_amount],
  );
  const setBalanceAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.BALANCE_AMOUNT,
        payload: text,
      });
    },
    [state.balance_amount],
  );

  // **** Insurance Details ****
  const setInsurance = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.INSURANCE,
        payload: text,
      });
    },
    [state.insurance],
  );
  const setInsuranceCompany = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.INSURANCE_COMPANY,
        payload: text,
      });
    },
    [state.insurance_company],
  );
  const setPolicyNumber = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.POLICY_NO,
        payload: text,
      });
    },
    [state.policy_number],
  );
  const setInsuranceDate = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.INSURANCE_DATE,
        payload: text,
      });
    },
    [state.insurance_date],
  );
  const setInsuranceAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.INSURANCE_AMOUNT,
        payload: text,
      });
    },
    [state.insurance_amount],
  );

  // **** Demurrage Details ****
  const setDemurrageCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DEMURRAGE_CHARGE,
        payload: text,
      });
    },
    [state.demurrage_charge],
  );
  const setRate = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.RATE,
        payload: text,
      });
    },
    [state.rate],
  );
  const setChargeApplicableAfter = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.CHARGE_APPLICABLE_AFTER,
        payload: text,
      });
    },
    [state.charge_applicable_after],
  );

  // **** Other Details ****
  const setRemark = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.REMARK,
        payload: text,
      });
    },
    [state.remark],
  );

  const setRemarksAtPOD = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.REMARKS_AT_POD,
        payload: text,
      });
    },
    [state.remarksAtPOD],
  );

  return {
    state,
    // **** Basic Details ****
    setBiltyLrCrNo,
    setDateOfBiltyLrCrNo,
    // **** Consigner Details ****
    setIsConsignerAddressSameAsClient,
    setConsignerName,
    setConsignerGst,
    setConsignerMobileNo,
    setConsignerAddress,
    setConsignerPincode,
    setConsignerState,
    setConsignerCity,
    setIsLoadingAddressSameAsConsigner,
    // **** Loading Address ****
    setLoadingAddress,
    setLoadingPincode,
    setLoadingState,
    setLoadingCity,
    // **** Consignee Details ****
    setIsConsigneeAddressSameAsClient,
    setConsigneeName,
    setConsigneeGst,
    setConsigneeMobileNo,
    setConsigneeAddress,
    setConsigneePincode,
    setConsigneeState,
    setConsigneeCity,
    setIsDeliveryAddressSameAsConsignee,
    // **** Delivery Address ****
    setDeliveryAddress,
    setDeliveryPincode,
    setDeliveryState,
    setDeliveryCity,
    // **** Vehicle Details ****
    setInvoiceNo,
    setVehicleType,
    setVehicleNo,
    setFromLocation,
    setToLocation,
    setDriverName,
    setDriverMobileNo,
    setDriverLicenseNo,
    setSealNo,
    setInDate,
    setOutDate,
    setTransitDays,
    setExpectedDateOfDelivery,
    // **** E-Way Bill Details ****
    setEWayBillNo,
    setGeneratedOn,
    setExpiryDate,
    // **** Material Details ****
    setTypeOfMoving,
    setMaterials,
    setMaterialsBilty,
    setAddMaterial,
    setRiskType,
    setLiabilityOfTax,
    // **** Freight Details ****
    setFreightType,
    setFreightCharge,
    setPickupCharge,
    setPickupChargeAmount,
    setDoorDeliveryCharge,
    setDoorDeliveryChargeAmount,
    setPackingCharge,
    setPackingChargeAmount,
    setPackingMaterialCharge,
    setPackingMaterialChargeAmount,
    setUnpackingCharge,
    setUnpackingChargeAmount,
    setLoadingCharge,
    setLoadingChargeAmount,
    setUnloadingCharge,
    setUnloadingChargeAmount,
    setTotalAmount,
    setAdvanceAmount,
    setBalanceAmount,
    // **** Insurance Details ****
    setInsurance,
    setInsuranceCompany,
    setPolicyNumber,
    setInsuranceDate,
    setInsuranceAmount,
    // **** Demurrage Details
    setDemurrageCharge,
    setRate,
    setChargeApplicableAfter,
    // **** Other Details ****,
    setRemark,
    setRemarksAtPOD
  };
};

type UseBiltyFormContextType = ReturnType<typeof useBiltyFormContext>;

const initBiltyFormContextState: UseBiltyFormContextType = {
  state: initialState,
  // **** Basic Details ****
  setBiltyLrCrNo: (text: string) => {},
  setDateOfBiltyLrCrNo: (text: string) => {},
  // **** Consigner Details ****
  setIsConsignerAddressSameAsClient: (value: boolean) => {},
  setConsignerName: (text: string) => {},
  setConsignerGst: (text: string) => {},
  setConsignerMobileNo: (text: string) => {},
  setConsignerAddress: (text: string) => {},
  setConsignerPincode: (text: string) => {},
  setConsignerState: (text: string) => {},
  setConsignerCity: (text: string) => {},
  setIsLoadingAddressSameAsConsigner: (value: boolean) => {},
  // **** Loading Address ****
  setLoadingAddress: (text: string) => {},
  setLoadingPincode: (text: string) => {},
  setLoadingState: (text: string) => {},
  setLoadingCity: (text: string) => {},
  // **** Consignee Details ****
  setIsConsigneeAddressSameAsClient: (value: boolean) => {},
  setConsigneeName: (text: string) => {},
  setConsigneeGst: (text: string) => {},
  setConsigneeMobileNo: (text: string) => {},
  setConsigneeAddress: (text: string) => {},
  setConsigneePincode: (text: string) => {},
  setConsigneeState: (text: string) => {},
  setConsigneeCity: (text: string) => {},
  setIsDeliveryAddressSameAsConsignee: (value: boolean) => {},
  // **** Delivery Address ****
  setDeliveryAddress: (text: string) => {},
  setDeliveryPincode: (text: string) => {},
  setDeliveryState: (text: string) => {},
  setDeliveryCity: (text: string) => {},
  // **** Vehicle Details ****
  setInvoiceNo: (text: string) => {},
  setVehicleType: (text: string) => {},
  setVehicleNo: (text: string) => {},
  setFromLocation: (text: string) => {},
  setToLocation: (text: string) => {},
  setDriverName: (text: string) => {},
  setDriverMobileNo: (text: string) => {},
  setDriverLicenseNo: (text: string) => {},
  setSealNo: (text: string) => {},
  setInDate: (text: string) => {},
  setOutDate: (text: string) => {},
  setTransitDays: (text: string) => {},
  setExpectedDateOfDelivery: (text: string) => {},
  // **** E-Way Bill Details ****
  setEWayBillNo: (text: string) => {},
  setGeneratedOn: (text: string) => {},
  setExpiryDate: (text: string) => {},
  // **** Material Details ****
  setTypeOfMoving: (text: string) => {},
  setMaterials: (materials: IMaterial[]) => {},
  setMaterialsBilty: (materials: IVehicleBilty[]) => {},
  setAddMaterial: (text: string) => {},
  setRiskType: (text: string) => {},
  setLiabilityOfTax: (text: string) => {},
  // **** Freight Details ****
  setFreightType: (text: string) => {},
  setFreightCharge: (text: string) => {},
  setPickupCharge: (text: string) => {},
  setPickupChargeAmount: (text: string) => {},
  setDoorDeliveryCharge: (text: string) => {},
  setDoorDeliveryChargeAmount: (text: string) => {},
  setPackingCharge: (text: string) => {},
  setPackingChargeAmount: (text: string) => {},
  setPackingMaterialCharge: (text: string) => {},
  setPackingMaterialChargeAmount: (text: string) => {},
  setUnpackingCharge: (text: string) => {},
  setUnpackingChargeAmount: (text: string) => {},
  setLoadingCharge: (text: string) => {},
  setLoadingChargeAmount: (text: string) => {},
  setUnloadingCharge: (text: string) => {},
  setUnloadingChargeAmount: (text: string) => {},
  setTotalAmount: (text: string) => {},
  setAdvanceAmount: (text: string) => {},
  setBalanceAmount: (text: string) => {},
  // **** Insurance Details ****
  setInsurance: (text: string) => {},
  setInsuranceCompany: (text: string) => {},
  setPolicyNumber: (text: string) => {},
  setInsuranceDate: (text: string) => {},
  setInsuranceAmount: (text: string) => {},
  // **** Demurrage Details ****
  setDemurrageCharge: (text: string) => {},
  setRate: (text: string) => {},
  setChargeApplicableAfter: (text: string) => {},
  // **** Other Details ****
  setRemark: (text: string) => {},
  setRemarksAtPOD: (text: string) => {}

};

const BiltyFormContext = createContext<UseBiltyFormContextType>(
  initBiltyFormContextState,
);

const useBiltyFormContextHook = () => useContext(BiltyFormContext);

const BiltyFormContextProvider: React.FC<{children: ReactElement}> = ({
  children,
}) => {
  return (
    <BiltyFormContext.Provider value={useBiltyFormContext()}>
      {children}
    </BiltyFormContext.Provider>
  );
};

export {useBiltyFormContextHook, BiltyFormContextProvider};
