import React, {
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import {
  quotationReducer,
  initialState,
  ACTION,
  IOtherCharge,
} from '../views/quotation/addQuotation/quotationReducer2';

const useQuotationFormContext = () => {
  const [state, dispatch] = useReducer(quotationReducer, initialState);

  // **** Basic Details ****
  const setShiftingType = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.SHIFTING_TYPE,
        payload: text,
      });
    },
    [state.shifting_type],
  );

  const setShiftingLuggage = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.SHIFTING_LUGGAGE,
        payload: text,
      });
    },
    [state.shifting_luggage],
  );

  const setQuotationNo = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.QUOTATION_NO,
        payload: text,
      });
    },
    [state.quotation_no],
  );

  const setDateOfQuotation = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DATE_OF_QUOTATION,
        payload: text,
      });
    },
    [state.date_of_quotation],
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

  const setBillingBy = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.BILLING_BY,
        payload: text,
      });
    },
    [state.billing_by],
  );

  // **** Vehicle ****
  const setVehicleType = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.VEHICLE_TYPE,
        payload: text,
      });
    },
    [state.vehicle_type],
  );

  const setVehicleManufacturer = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.VEHICLE_MANUFACTURER,
        payload: text,
      });
    },
    [state.vehicle_manufacturer],
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

  // **** Billing Individual ****
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

  // **** Billing Company ****
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
  const setAuthorityMobileNo= useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.AUTHORITY_MOBILE_NO,
        payload: text,
      });
    },
    [state.authority_mobile_no],
  );
  const setCompanyGSt = useCallback(
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
        type: ACTION.EMPLOYEE_MOBILE_NO,
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

  // **** Pickup Address ****
  const setPickupPincode = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PICKUP_PINCODE,
        payload: text,
      });
    },
    [state.pickup_pincode],
  );
  const setPickupState = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PICKUP_STATE,
        payload: text,
      });
    },
    [state.pickup_state],
  );
  const setPickupCity = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PICKUP_CITY,
        payload: text,
      });
    },
    [state.pickup_city],
  );
  const setPickupAddress = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PICKUP_ADDRESS,
        payload: text,
      });
    },
    [state.pickup_address],
  );
  const setPickupCurrentFloor = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PICKUP_CURRENT_FLOOR,
        payload: text,
      });
    },
    [state.pickup_current_floor],
  );
  const setPickupLiftStatus = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PICKUP_LIFT_STATUS,
        payload: text,
      });
    },
    [state.pickup_lift_status],
  );

  // **** Drop Address ****
  const setDropPincode = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DROP_PINCODE,
        payload: text,
      });
    },
    [state.drop_pincode],
  );
  const setDropState = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DROP_STATE,
        payload: text,
      });
    },
    [state.drop_state],
  );
  const setDropCity = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DROP_CITY,
        payload: text,
      });
    },
    [state.drop_city],
  );
  const setDropAddress = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DROP_ADDRESS,
        payload: text,
      });
    },
    [state.drop_address],
  );
  const setDropCurrentFloor = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DROP_CURRENT_FLOOR,
        payload: text,
      });
    },
    [state.drop_current_floor],
  );
  const setDropLiftStatus = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DROP_LIFT_STATUS,
        payload: text,
      });
    },
    [state.drop_lift_status],
  );

  // **** Freight ****
  const setFreightPartLoad = useCallback(
    (value: boolean) => {
      dispatch({
        type: ACTION.FREIGHT_PART_LOAD,
        payload: value,
      });
    },
    [state.freight_part_load],
  );
  const setFreightFullLoad = useCallback(
    (value: boolean) => {
      dispatch({
        type: ACTION.FREIGHT_FULL_LOAD,
        payload: value,
      });
    },
    [state.freight_full_load],
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
  const setFreightPartCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.FREIGHT_PART_CHARGE,
        payload: text,
      });
    },
    [state.freight_part_charge],
  );
  const setFreightFullCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.FREIGHT_FULL_CHARGE,
        payload: text,
      });
    },
    [state.freight_full_charge],
  );

  // **** Packing Charge ****
  const setPackingCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_CHARGE,
        payload: text,
      });
    },
    [state.packing_charge],
  );
  const setPackingChargePartLoad = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_CHARGE_PART_LOAD,
        payload: text,
      });
    },
    [state.packing_charge_part_load],
  );
  const setPackingChargeFullLoad = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_CHARGE_FULL_LOAD,
        payload: text,
      });
    },
    [state.packing_charge_full_load],
  );

  // **** Packing Material Charge ****
  const setPackingMaterialCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_MATERIAL_CHARGE,
        payload: text,
      });
    },
    [state.packing_material_charge],
  );
  const setPackingMaterialChargePartLoad = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_MATERIAL_CHARGE_PART_LOAD,
        payload: text,
      });
    },
    [state.packing_material_charge_part_load],
  );
  const setPackingMaterialChargeFullLoad = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_MATERIAL_CHARGE_FULL_LOAD,
        payload: text,
      });
    },
    [state.packing_material_charge_full_load],
  );

  // **** Loading Charge ****
  const setLoadingCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LOADING_CHARGE,
        payload: text,
      });
    },
    [state.loading_charge],
  );
  const setLoadingChargePartLoad = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LOADING_CHARGE_PART_LOAD,
        payload: text,
      });
    },
    [state.loading_charge_part_load],
  );
  const setLoadingChargeFullLoad = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LOADING_CHARGE_FULL_LOAD,
        payload: text,
      });
    },
    [state.loading_charge_full_load],
  );

  // **** Unloading Charge ****
  const setUnloadingCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNLOADING_CHARGE,
        payload: text,
      });
    },
    [state.unloading_charge],
  );
  const setUnloadingChargePartLoad = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNLOADING_CHARGE_PART_LOAD,
        payload: text,
      });
    },
    [state.unloading_charge_part_load],
  );
  const setUnloadingChargeFullLoad = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNLOADING_CHARGE_FULL_LOAD,
        payload: text,
      });
    },
    [state.unloading_charge_full_load],
  );

  // **** Unpacking Charge ****
  const setUnpackingCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNPACKING_CHARGE,
        payload: text,
      });
    },
    [state.unpacking_charge],
  );
  const setUnpackingChargePartLoad = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNPACKING_CHARGE_PART_LOAD,
        payload: text,
      });
    },
    [state.unpacking_charge_part_load],
  );
  const setUnpackingChargeFullLoad = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNPACKING_CHARGE_FULL_LOAD,
        payload: text,
      });
    },
    [state.unpacking_charge_full_load],
  );

  // **** Other Charges ****
  const setOtherCharges = useCallback(
    (items: IOtherCharge[]) => {
      dispatch({
        type: ACTION.OTHER_CHARGES,
        payload: items,
      });
    },
    [state.other_charges],
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

  // **** Surcharge ****
  const setSurcharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.SURCHARGE,
        payload: text,
      });
    },
    [state.surcharge],
  );

  const setSurchargePercent = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.SURCHARGE_PERCENT,
        payload: text,
      });
    },
    [state.surcharge_percent],
  );

  // **** Discount in Quotation ****
  const setDiscountInQuotation = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DISCOUNT_IN_QUOTATION,
        payload: text,
      });
    },
    [state.discount_in_quotation],
  );

  const setDiscountPercentOrValue = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DISCOUNT_PERCENT_OR_VALUE,
        payload: text,
      });
    },
    [state.discount_percent_or_value],
  );

  // **** GST in Quotation ****
  const setGstInQuotation = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.GST_IN_QUOTATION,
        payload: text,
      });
    },
    [state.gst_in_quotation],
  );
  const setGstPercent = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.GST_PERCENT,
        payload: text,
      });
    },
    [state.gst_percent],
  );
  const setGstType = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.GST_TYPE,
        payload: text,
      });
    },
    [state.gst_type],
  );

  // **** Transit Insurance ****
  const setTransitInsurance = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.TRANSIT_INSURANCE,
        payload: text,
      });
    },
    [state.transit_insurance],
  );
  const setTransitShiftingLuggage = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.TRANSIT_SHIFTING_LUGGAGE,
        payload: text,
      });
    },
    [state.transit_shifting_luggage],
  );
  const setTransitInsuranceType = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.TRANSIT_INSURANCE_TYPE,
        payload: text,
      });
    },
    [state.transit_insurance_type],
  );
  const setTransitInsuranceCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.TRANSIT_INSURANCE_PERCENT,
        payload: text,
      });
    },
    [state.transit_insurance_charge],
  );
  const setTransitInsuranceGst = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.TRANSIT_INSURANCE_GST_PERCENT,
        payload: text,
      });
    },
    [state.transit_insurance_gst],
  );
  const setTransitGoodsValue = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.TRANSIT_GOODS_VALUE,
        payload: text,
      });
    },
    [state.transit_goods_value],
  );

  // **** Storage Charge ****
  const setStorage = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.STORAGE,
        payload: text,
      });
    },
    [state.storage],
  );
  const setStorageDuration = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.STORAGE_DURATION,
        payload: text,
      });
    },
    [state.storage_duration],
  );
  const setStorageFromDate = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.STORAGE_FROM_DATE,
        payload: text,
      });
    },
    [state.storage_from_date],
  );
  const setStorageToDate = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.STORAGE_TO_DATE,
        payload: text,
      });
    },
    [state.storage_to_date],
  );
  const setStorageAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.STORAGE_AMOUNT,
        payload: text,
      });
    },
    [state.storage_amount],
  );

  // **** Other Details ****
  const setOtherDetail1 = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.OTHER_DETAIL_1,
        payload: text,
      });
    },
    [state.other_detail_1],
  );
  const setOtherDetail2 = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.OTHER_DETAIL_2,
        payload: text,
      });
    },
    [state.other_detail_2],
  );
  const setOtherDetail3 = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.OTHER_DETAIL_3,
        payload: text,
      });
    },
    [state.other_detail_3],
  );
  const setOtherDetail4 = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.OTHER_DETAIL_4,
        payload: text,
      });
    },
    [state.other_detail_4],
  );

  return {
    state,
    // **** Basic Details ****
    setShiftingType,
    setShiftingLuggage,
    setQuotationNo,
    setDateOfQuotation,
    setDateOfMoving,
    setBillingBy,
    // *** Vehicle ****
    setVehicleType,
    setVehicleManufacturer,
    setVehicleModel,
    // **** Billing Individual ****
    setPartyName,
    setPartyMobileNo,
    // **** Billing Company ****
    setCompanyName,
    setApprovalAuthority,
    setAuthorityPersonName,
    setAuthorityMobileNo,
    setCompanyGSt,
    setEmployeeName,
    setEmployeeDesignation,
    setEmployeeMobileNo,
    setCompanyAddress,
    // **** Pickup Address ****
    setPickupPincode,
    setPickupState,
    setPickupCity,
    setPickupAddress,
    setPickupCurrentFloor,
    setPickupLiftStatus,
    // **** Drop Address ****
    setDropPincode,
    setDropState,
    setDropCity,
    setDropAddress,
    setDropCurrentFloor,
    setDropLiftStatus,
    // **** Freight ****
    setFreightPartLoad,
    setFreightFullLoad,
    setLorryType,
    setFreightPartCharge,
    setFreightFullCharge,
    // **** Packing Charge ****
    setPackingCharge,
    setPackingChargePartLoad,
    setPackingChargeFullLoad,
    // **** Packing Material Charge ****
    setPackingMaterialCharge,
    setPackingMaterialChargePartLoad,
    setPackingMaterialChargeFullLoad,
    // **** Loading Charge ****
    setLoadingCharge,
    setLoadingChargePartLoad,
    setLoadingChargeFullLoad,
    // **** Unloading Charge ****
    setUnloadingCharge,
    setUnloadingChargePartLoad,
    setUnloadingChargeFullLoad,
    // **** Unpacking Charge ****
    setUnpackingCharge,
    setUnpackingChargePartLoad,
    setUnpackingChargeFullLoad,
    // **** Other Charges ****
    setOtherCharges,
    setAdvanceAmount,
    // **** Surcharge ****
    setSurcharge,
    setSurchargePercent,
    // **** Discount in Quotation ****
    setDiscountInQuotation,
    setDiscountPercentOrValue,
    // **** GST in Quotation ****
    setGstInQuotation,
    setGstPercent,
    setGstType,
    // **** Transit Insurance ****
    setTransitInsurance,
    setTransitShiftingLuggage,
    setTransitInsuranceType,
    setTransitInsuranceCharge,
    setTransitInsuranceGst,
    setTransitGoodsValue,
    // **** Storage Charge ****
    setStorage,
    setStorageDuration,
    setStorageFromDate,
    setStorageToDate,
    setStorageAmount,
    // **** Other Details ****
    setOtherDetail1,
    setOtherDetail2,
    setOtherDetail3,
    setOtherDetail4,
  };
};

type UseQuotationFormContextType = ReturnType<typeof useQuotationFormContext>;

const initQuotationFormContextState: UseQuotationFormContextType = {
  state: initialState,
  // **** Basic Details ****
  setShiftingType: (text: string) => {},
  setShiftingLuggage: (text: string) => {},
  setQuotationNo: (text: string) => {},
  setDateOfQuotation: (text: string) => {},
  setDateOfMoving: (text: string) => {},
  setBillingBy: (text: string) => {},
  // **** Vehicle ****
  setVehicleType: (text: string) => {},
  setVehicleManufacturer: (text: string) => {},
  setVehicleModel: (text: string) => {},
  // **** Billing Individual ****
  setPartyName: (text: string) => {},
  setPartyMobileNo: (text: string) => {},
  // **** Billing Company ****
  setCompanyName: (text: string) => {},
  setApprovalAuthority: (text: string) => {},
  setAuthorityPersonName: (text: string) => {},
  setAuthorityMobileNo: (text: string) => {},
  setCompanyGSt: (text: string) => {},
  setEmployeeName: (text: string) => {},
  setEmployeeDesignation: (text: string) => {},
  setEmployeeMobileNo: (text: string) => {},
  setCompanyAddress: (text: string) => {},
  // **** Pickup Address ****
  setPickupPincode: (text: string) => {},
  setPickupState: (text: string) => {},
  setPickupCity: (text: string) => {},
  setPickupAddress: (text: string) => {},
  setPickupCurrentFloor: (text: string) => {},
  setPickupLiftStatus: (text: string) => {},
  // **** Drop Address ****
  setDropPincode: (text: string) => {},
  setDropState: (text: string) => {},
  setDropCity: (text: string) => {},
  setDropAddress: (text: string) => {},
  setDropCurrentFloor: (text: string) => {},
  setDropLiftStatus: (text: string) => {},
  // **** Freight ****
  setFreightPartLoad: (value: boolean) => {},
  setFreightFullLoad: (value: boolean) => {},
  setLorryType: (text: string) => {},
  setFreightPartCharge: (text: string) => {},
  setFreightFullCharge: (text: string) => {},
  // **** Packing Charge ****
  setPackingCharge: (text: string) => {},
  setPackingChargePartLoad: (text: string) => {},
  setPackingChargeFullLoad: (text: string) => {},
  // **** Packing Material Charge ****
  setPackingMaterialCharge: (text: string) => {},
  setPackingMaterialChargePartLoad: (text: string) => {},
  setPackingMaterialChargeFullLoad: (text: string) => {},
  // **** Loading Charge ****
  setLoadingCharge: (text: string) => {},
  setLoadingChargePartLoad: (text: string) => {},
  setLoadingChargeFullLoad: (text: string) => {},
  // **** Unloading Charge ****
  setUnloadingCharge: (text: string) => {},
  setUnloadingChargePartLoad: (text: string) => {},
  setUnloadingChargeFullLoad: (text: string) => {},
  // **** Unpacking Charge ****
  setUnpackingCharge: (text: string) => {},
  setUnpackingChargePartLoad: (text: string) => {},
  setUnpackingChargeFullLoad: (text: string) => {},
  // **** Other Charges ****
  setOtherCharges: (items: IOtherCharge[]) => {},
  setAdvanceAmount: (text: string) => {},
  // **** Surcharge ****
  setSurcharge: (text: string) => {},
  setSurchargePercent: (text: string) => {},
  // **** Discount in Quotation ****
  setDiscountInQuotation: (text: string) => {},
  setDiscountPercentOrValue: (text: string) => {},
  // **** GST in Quotation ****
  setGstInQuotation: (text: string) => {},
  setGstPercent: (text: string) => {},
  setGstType: (text: string) => {},
  // **** Transit Insurance ****
  setTransitInsurance: (text: string) => {},
  setTransitShiftingLuggage: (text: string) => {},
  setTransitInsuranceType: (text: string) => {},
  setTransitInsuranceCharge: (text: string) => {},
  setTransitInsuranceGst: (text: string) => {},
  setTransitGoodsValue: (text: string) => {},
  // **** Storage Charge ****
  setStorage: (text: string) => {},
  setStorageDuration: (text: string) => {},
  setStorageFromDate: (text: string) => {},
  setStorageToDate: (text: string) => {},
  setStorageAmount: (text: string) => {},
  // **** Other Details ****
  setOtherDetail1: (text: string) => {},
  setOtherDetail2: (text: string) => {},
  setOtherDetail3: (text: string) => {},
  setOtherDetail4: (text: string) => {},
};

const QuotationFormContext = createContext<UseQuotationFormContextType>(
  initQuotationFormContextState,
);

const useQuotationFormContextHook = () => useContext(QuotationFormContext);

const QuotationFormContextProvider: React.FC<{children: ReactElement}> = ({
  children,
}) => {
  return (
    <QuotationFormContext.Provider value={useQuotationFormContext()}>
      {children}
    </QuotationFormContext.Provider>
  );
};

export {useQuotationFormContextHook, QuotationFormContextProvider};
