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
  IOtherCharge,
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

  // ****** Packing Charge *********
  const setPackingCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_CHARGE,
        payload: text,
      });
    },
    [state.packing_charge],
  );

  const setPackingAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_AMOUNT,
        payload: text,
      });
    },
    [state.packing_amount],
  );

  const setPackingHSN = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_HSN,
        payload: text,
      });
    },
    [state.packing_hsn],
  );

  // ****** Packing Material Charge *********
  const setPackingMaterialCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_MATERIAL_CHARGE,
        payload: text,
      });
    },
    [state.packing_material_charge],
  );

  const setPackingMaterialAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_MATERIAL_AMOUNT,
        payload: text,
      });
    },
    [state.packing_material_amount],
  );

  const setPackingMaterialHSN = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.PACKING_MATERIAL_HSN,
        payload: text,
      });
    },
    [state.packing_material_hsn],
  );

  // ****** Loading Charge *********
  const setLoadingCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LOADING_CHARGE,
        payload: text,
      });
    },
    [state.loading_charge],
  );

  const setLoadingAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LOADING_AMOUNT,
        payload: text,
      });
    },
    [state.loading_amount],
  );

  const setLoadingHSN = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.LOADING_HSN,
        payload: text,
      });
    },
    [state.loading_hsn],
  );

  // ****** Unloading Charge *********
  const setUnloadingCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNLOADING_CHARGE,
        payload: text,
      });
    },
    [state.unloading_charge],
  );

  const setUnloadingAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNLOADING_AMOUNT,
        payload: text,
      });
    },
    [state.unloading_amount],
  );

  const setUnloadingHSN = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNLOADING_HSN,
        payload: text,
      });
    },
    [state.unloading_hsn],
  );

  // ****** Unpacking Charge *********
  const setUnpackingCharge = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNPACKING_CHARGE,
        payload: text,
      });
    },
    [state.unpacking_charge],
  );

  const setUnpackingAmount = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNPACKING_AMOUNT,
        payload: text,
      });
    },
    [state.unpacking_amount],
  );

  const setUnpackingHSN = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.UNPACKING_HSN,
        payload: text,
      });
    },
    [state.unpakcing_hsn],
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

  // **** Discount in Invoice ****
  const setDiscountInInvoice = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DISCOUNT_IN_INVOICE,
        payload: text,
      });
    },
    [state.discount_in_invoice],
  );

  const setDiscountValueOrPercent = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.DISCOUNT_VALUE_OR_PERCENT,
        payload: text,
      });
    },
    [state.discount_value_or_percent],
  );

   // **** GST on Invoice ****
   const setGSTOnInvoice = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.GST_ON_INVOICE,
        payload: text,
      });
    },
    [state.gst_on_invoice],
  );

  const setGSTPercent = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.GST_PERCENT,
        payload: text,
      });
    },
    [state.gst_percent],
  );

  const setGSTType = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.GST_TYPE,
        payload: text,
      });
    },
    [state.gst_type],
  );

  const setGSTPaidBy = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.GST_PAID_BY,
        payload: text,
      });
    },
    [state.gst_paid_by],
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

  const setTransitLuggage = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.TRANSIT_LUGGAGE,
        payload: text,
      });
    },
    [state.transit_luggage],
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
        type: ACTION.TRANSIT_INSURANCE_CHARGE,
        payload: text,
      });
    },
    [state.transit_insurance_charge],
  );

  const setTransitInsuranceGST = useCallback(
    (text: string) => {
      dispatch({
        type: ACTION.TRANSIT_INSURANCE_GST,
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

  // **** Basic Details ****
  const setInvoiceNo = useCallback((text:string) => {
    dispatch({
      type: ACTION.INVOICE_NO,
      payload: text
    });
  }, [state.invoice_no]);

  const setDateOfInvoice = useCallback((text:string) => {
    dispatch({
      type: ACTION.DATE_OF_INVOICE,
      payload: text
    });
  }, [state.date_of_invoice]);

  const setDateOfDelivery = useCallback((text:string) => {
    dispatch({
      type: ACTION.DATE_OF_DELIVERY,
      payload: text
    });
  }, [state.date_of_delivery]);

  const setShiftingLuggage = useCallback((text:string) => {
    dispatch({
      type: ACTION.SHIFTING_LUGGAGE,
      payload: text
    });
  }, [state.shifting_luggage]);

  const setModeOfMoving = useCallback((text:string) => {
    dispatch({
      type: ACTION.MODE_OF_MOVING,
      payload: text
    });
  }, [state.mode_of_moving]);

  const setVehicleNo = useCallback((text:string) => {
    dispatch({
      type: ACTION.VEHICLE_NO,
      payload: text
    });
  }, [state.vehicle_no]);

  const setConsignmentNo = useCallback((text:string) => {
    dispatch({
      type: ACTION.CONSIGNMENT_NO,
      payload: text
    });
  }, [state.consignment_no]);

  // **** Billing Details Individual ****
  const setPartyName = useCallback((text:string) => {
    dispatch({
      type: ACTION.PARTY_NAME,
      payload: text
    });
  }, [state.party_name]);

  const setPartyMobileNo = useCallback((text:string) => {
    dispatch({
      type: ACTION.PARTY_MOBILE_NO,
      payload: text
    });
  }, [state.party_mobile_no]);

  // **** Billing Details Company ****
  const setCompanyName = useCallback((text:string) => {
    dispatch({
      type: ACTION.COMPANY_NAME,
      payload: text
    });
  }, [state.company_name]);

  const setApprovalAuthority = useCallback((text:string) => {
    dispatch({
      type: ACTION.APPROVAL_AUTHORITY,
      payload: text
    });
  }, [state.approval_authority]);

  const setAuthorityPersonName = useCallback((text:string) => {
    dispatch({
      type: ACTION.AUTHORITY_PERSON_NAME,
      payload: text
    });
  }, [state.authority_person_name]);

  const setAuthorityMobileNo = useCallback((text:string) => {
    dispatch({
      type: ACTION.AUTHORITY_MOBILE_NO,
      payload: text
    });
  }, [state.authority_mobile_no]);

  const setCompanyGST = useCallback((text:string) => {
    dispatch({
      type: ACTION.COMPANY_GST,
      payload: text
    });
  }, [state.company_gst]);

  const setEmployeeName = useCallback((text:string) => {
    dispatch({
      type: ACTION.EMPLOYEE_NAME,
      payload: text
    });
  }, [state.employee_name]);

  const setEmployeeDesignation = useCallback((text:string) => {
    dispatch({
      type: ACTION.EMPLOYEE_DESIGNATION,
      payload: text
    });
  }, [state.employee_designation]);

  const setEmployeeMobileNo = useCallback((text:string) => {
    dispatch({
      type: ACTION.EMPLOYEE_MOBILE_NO,
      payload: text
    });
  }, [state.employee_mobile_no]);

  const setCompanyAddress = useCallback((text:string) => {
    dispatch({
      type: ACTION.COMPANY_ADDRESS,
      payload: text
    });
  }, [state.company_address]);

  // **** Address ****
  const setPincode = useCallback((text:string) => {
    dispatch({
      type: ACTION.PINCODE,
      payload: text
    });
  }, [state.pincode]);

  const setState = useCallback((text:string) => {
    dispatch({
      type: ACTION.STATE,
      payload: text
    });
  }, [state.state]);

  const setCity = useCallback((text:string) => {
    dispatch({
      type: ACTION.CITY,
      payload: text
    });
  }, [state.city]);

  const setAddress = useCallback((text:string) => {
    dispatch({
      type: ACTION.ADDRESS,
      payload: text
    });
  }, [state.address]);


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
    // Packing Charge
    setPackingCharge,
    setPackingAmount,
    setPackingHSN,
    // Packing Material Charge
    setPackingMaterialCharge,
    setPackingMaterialAmount,
    setPackingMaterialHSN,
    // Loading Charge
    setLoadingCharge,
    setLoadingAmount,
    setLoadingHSN,
    // Unloading Charge
    setUnloadingCharge,
    setUnloadingAmount,
    setUnloadingHSN,
    // Unpacking Charge
    setUnpackingCharge,
    setUnpackingAmount,
    setUnpackingHSN,
    // Other Charges
    setOtherCharges,
    // Surcharge
    setSurcharge,
    setSurchargePercent,
    // Discount in Invoice
    setDiscountInInvoice,
    setDiscountValueOrPercent,
    // GST on Invoice
    setGSTOnInvoice,
    setGSTPercent,
    setGSTType,
    setGSTPaidBy,
    // Transit Insurance
    setTransitInsurance,
    setTransitLuggage,
    setTransitInsuranceType,
    setTransitInsuranceCharge,
    setTransitInsuranceGST,
    setTransitGoodsValue,
    // Storage
    setStorage,
    setStorageDuration,
    setStorageFromDate,
    setStorageToDate,
    setStorageAmount,
    // Basic Details
    setInvoiceNo,
    setDateOfInvoice,
    setDateOfDelivery,
    setShiftingLuggage,
    setModeOfMoving,
    setVehicleNo,
    setConsignmentNo,
    // Billing Individual
    setPartyName,
    setPartyMobileNo,
    // Billing Company
    setCompanyName,
    setApprovalAuthority,
    setAuthorityPersonName,
    setAuthorityMobileNo,
    setCompanyGST,
    setEmployeeName,
    setEmployeeDesignation,
    setEmployeeMobileNo,
    setCompanyAddress,
    // Address
    setPincode,
    setState,
    setCity,
    setAddress,
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
  // Packing
  setPackingCharge: (text: string) => {},
  setPackingAmount: (text: string) => {},
  setPackingHSN: (text: string) => {},
  // Packing Material Charge
  setPackingMaterialCharge: (text: string) => {},
  setPackingMaterialAmount: (text: string) => {},
  setPackingMaterialHSN: (text: string) => {},
  // Loading Charge
  setLoadingCharge: (text: string) => {},
  setLoadingAmount: (text: string) => {},
  setLoadingHSN: (text: string) => {},
  // Unloading Charge
  setUnloadingCharge: (text: string) => {},
  setUnloadingAmount: (text: string) => {},
  setUnloadingHSN: (text: string) => {},
  // Unpacking Charge
  setUnpackingCharge: (text: string) => {},
  setUnpackingAmount: (text: string) => {},
  setUnpackingHSN: (text: string) => {},
  // Other Charges
  setOtherCharges: (items: IOtherCharge[]) => {},
  // Surcharge
  setSurcharge: (text: string) => {},
  setSurchargePercent: (text: string) => {},
  // Discount in Invoice
  setDiscountInInvoice: (text: string) => {},
  setDiscountValueOrPercent: (text: string) => {},
  // GST on Invoice
  setGSTOnInvoice: (text: string) => {},
  setGSTPercent: (text: string) => {},
  setGSTType: (text: string) => {},
  setGSTPaidBy: (text: string) => {},
  // Transit Insurance
  setTransitInsurance: (text: string) => {},
  setTransitLuggage: (text: string) => {},
  setTransitInsuranceType: (text: string) => {},
  setTransitInsuranceCharge: (text: string) => {},
  setTransitInsuranceGST: (text: string) => {},
  setTransitGoodsValue: (text: string) => {},
  // Storage
  setStorage: (text: string) => {},
  setStorageDuration: (text: string) => {},
  setStorageFromDate: (text: string) => {},
  setStorageToDate: (text: string) => {},
  setStorageAmount: (text: string) => {},
  // Basic Details
  setInvoiceNo: (text: string) => {},
  setDateOfInvoice: (text: string) => {},
  setDateOfDelivery: (text: string) => {},
  setShiftingLuggage: (text: string) => {},
  setModeOfMoving: (text: string) => {},
  setVehicleNo: (text: string) => {},
  setConsignmentNo: (text: string) => {},
  // Billing Individual
  setPartyName: (text: string) => {},
  setPartyMobileNo: (text: string) => {},
  // Billing Company
  setCompanyName: (text: string) => {},
  setApprovalAuthority: (text: string) => {},
  setAuthorityPersonName: (text: string) => {},
  setAuthorityMobileNo: (text: string) => {},
  setCompanyGST: (text: string) => {},
  setEmployeeName: (text: string) => {},
  setEmployeeDesignation: (text: string) => {},
  setEmployeeMobileNo: (text: string) => {},
  setCompanyAddress: (text: string) => {},
  // Address
  setPincode: (text: string) => {},
  setState: (text: string) => {},
  setCity: (text: string) => {},
  setAddress: (text: string) => {},
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
