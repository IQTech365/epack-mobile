import React, {useReducer, useState, useCallback, useEffect} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {Switch} from 'react-native-switch';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../common/CollapsibleView';
import DatePickerComponent from '../../../common/DatePickerComponent';
import DropdownComponent from '../../../common/DropdownComponent';
import Header from '../../../common/Header';
import Input from '../../../common/Input';
import Label from '../../../common/Label';
import Spacer from '../../../common/Spacer';
import {COLOR_BLACK, COLOR_BLUE} from '../../../utils/colors';
import styles from './style';
import {TDropdownItem} from '../../../type/TDropdownItem';
import shiftingTypes from '../../../data/shiftingType.json';
import shiftingLuggages from '../../../data/shiftingLuggage.json';
import {
  initialState,
  quotationReducer,
  QUOTATION_FORM_ACTION,
  TCharge,
  TOtherDetails,
  TInsuranceDetails,
  TStorageCharge,
  TOtherCharges,
  TSurcharge,
  TDiscountInQuotation,
  TGstInQuotation,
  TBillingBy,
} from './quotationReducer';
import {
  formatDate,
  formatDate4,
  getCities,
  getStates,
} from '../../../utils/formatter';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import Button from '../../../common/Button';
import surchargeOptions from '../../../data/surchargeOptions.json';
import gstPercentOptions from '../../../data/gstPercentOptions.json';
import gstTypeOptions from '../../../data/gstTypeOptions.json';
import insurancePercentOptions from '../../../data/insurancePercentOptions.json';
import loaryTypeOptions from '../../../data/loryTypeOptions.json';
import surchargePercentOptions from '../../../data/surchargePercentOptions.json';
import insuranceTypeOptions from '../../../data/insuranceTypeOptions.json';
import discountPercentOptions from '../../../data/discountPercentOptions.json';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import liftStatusOptions from '../../../data/liftStatusOptions.json';
import floorOptions from '../../../data/floorOptions.json';
import billingByOptions from '../../../data/billingByOptions.json';
import approvalAuthorityOptions from '../../../data/ApprovalAuthorityOptions.json';
import storageDurationOptions from '../../../data/storageDurationOptions.json';
import usePincodeHook, {
  PINCODE_REQUEST_KEY,
} from '../../../hooks/usePincodeHook';
import Spinner from '../../../common/Spinner';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  IAddQuotationRequest,
  ITransitInsurance,
} from '../../../interface/quotation/IAddQuotationRequest';
import {
  addQuotationRequest,
  getSingleQuotationRequest,
  resetaddQuotationRequest,
} from '../../../redux/slices/QuotationSlice';
import Toast from 'react-native-toast-message';
import {useRef} from 'react';
import DeleteIcon from '../../../images/icons/delete.svg';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {QuotationStackParamList} from '../../../navigation/params/QuotationStackParamList';
import {IGetQuotationData} from '../../../interface/quotation/IGetQuotationsResponse';
import EpackDropdown from '../../../common/DropdownComponent2';
import {ISingleQuotationData} from '../../../interface/quotation/IGetSingleQuotationResponse';
import {
  GSTOptions,
  chargeOptions,
  discountTypeOptions,
  loadTypeOptions,
  yesNoOptions,
} from '../utils/utils';
import useCompanyId from '../../../hooks/useCompanyId';
import {Validator} from '../../../utils/validation';

const yesNoOptions1: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Yes',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, width: 16, height: 16},
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    style: {paddingRight: 20},
    textContainerStyle: {marginLeft: 4, marginRight: 4},
  },
  {
    id: '2',
    text: 'No',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, width: 16, height: 16},
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: {marginLeft: 4, marginRight: 4},
  },
];

interface Props
  extends NativeStackScreenProps<QuotationStackParamList, 'AddQuotation'> {
  showHeader?: boolean;
}

const AddQuotationView: React.FC<Props> = ({
  showHeader = true,
  navigation,
  route,
}) => {
  const item: IGetQuotationData | undefined = route?.params?.item;
  const isEdit: boolean | undefined = route?.params?.isEdit;
  // console.log('AddQuotation-Edit-Item----', JSON.stringify(item));

  const [switchState, setSwitchState] = useState<boolean>(true);
  const [state, dispatch] = useReducer(quotationReducer, initialState);
  console.log('QuotationReducer-State--', JSON.stringify(state));

  const [isPartLoad, setIsPartLoad] = useState<boolean>(true);
  const [isFullLoad, setIsFullLoad] = useState<boolean>(false);
  const [loadTypes, setLoadTypes] = useState<string[]>([loadTypeOptions[0]]);
  const [isSurchargeApplicable, setIsSurchargeApplicable] =
    useState<boolean>(false);
  const [isInsuranceRequired, setIsInsuranceRequired] =
    useState<boolean>(false);
  const [discountType, setDiscountType] = useState<string>(
    discountTypeOptions[2],
  );
  const [packingCharges, setPackingCharges] = useState<string>('Additional');
  const [packingMaterialCharges, setPackingMaterialCharges] =
    useState<string>('Additional');
  const [unpackingCharges, setUnpackingCharges] =
    useState<string>('Additional');
  const [loadingCharges, setLoadingCharges] = useState<string>('Additional');
  const [unloadingCharges, setUnloadingCharges] =
    useState<string>('Additional');
  const [gstInQuotation, setGstInQuotation] = useState<string>(GSTOptions[3]);
  const [pincodeRequestKey, setPincodeRequestKey] =
    useState<PINCODE_REQUEST_KEY>(
      PINCODE_REQUEST_KEY.ADD_QUOTATION_PICKUP_ADDRESS,
    );
  const [pickupStates, setPickupStates] = useState<TDropdownItem[]>([]);
  const [pickupCities, setPickupCities] = useState<TDropdownItem[]>([]);
  const [deliveryStates, setDeliveryStates] = useState<TDropdownItem[]>([]);
  const [deliveryCities, setDeliveryCities] = useState<TDropdownItem[]>([]);
  const [jobType, setJobType] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [partLoadRatePerItem, setPartLoadRatePerItem] = useState<string>('');
  const [partLoadAmount, setPartLoadAmount] = useState<string>('');
  const [fullLoadRatePerItem, setFullLoadRatePerItem] = useState<string>('');
  const [fullLoadAmount, setFullLoadAmount] = useState<string>('');
  const [isStorageRequired, setIsStorageRequired] = useState<boolean>(false);

  const [quotationserialNo, setQuotationserialNo] = useState<string>('');
  const surchargePercentDropdownRef = useRef(null);
  const surchargeDropdownRef = useRef(null);
  const shiftingTypeDropdownRef = useRef(null);
  const billingByDropdwonRef = useRef(null);
  const shiftingLuggageDropdownRef = useRef(null);
  const discountPercentDropdownRef = useRef(null);
  const dateOfQuotationCompRef = useRef(null);
  const dateOfMovingCompRef = useRef(null);
  const gstPercentDropdownRef = useRef(null);
  const gstTypeDropdownRef = useRef(null);
  const insuranceTypeDropdownRef = useRef(null);
  const insuranceChargePercentDropdownRef = useRef(null);
  const insuranceGSTPercentDropdownRef = useRef(null);
  const storageDurationDropdownRef = useRef(null);
  const storageFromdateDropdownRef = useRef(null);
  const storageTodateDropdownRef = useRef(null);
  const loryTypeDropdownRef = useRef(null);
  const pickupCityDropdownRef = useRef(null);
  const pickupStateDropwdownRef = useRef(null);
  const dropStateDropdownRef = useRef(null);
  const dropCityDropdownRef = useRef(null);
  const particularsInputCompRef = useRef(null);
  const quantityInputCompRef = useRef(null);
  const partRateInputCompRef = useRef(null);
  const fullRateInputCompRef = useRef(null);
  const partAmountCompRef = useRef(null);
  const fullAmountCompRef = useRef(null);

  const [errors, setErrors] = useState();
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [showMobileNumberError, setShowMobileNumberError] =
    useState<boolean>(false);

  const dispatch2 = useAppDispatch();

  const {
    addQuotationRequesting,
    addQuotationSuccess,
    addQuotationFailure,
    addQuotationInfo,
    quotation,
    getQuotationRequesting,
  } = useAppSelector(state => state.Quotation);
  // console.log('AddQuotation-quotation----', JSON.stringify(quotation));
  const {otpData} = useAppSelector(state => state.OTP);
  const companyId = useCompanyId();

  const setPincodeError = () => {
    dispatch({
      type: QUOTATION_FORM_ACTION.PICKUP_PINCODE_ERROR,
      payload: 'Invalid PIN Code',
    });
  };

  const resetPincodeError = () => {
    dispatch({
      type: QUOTATION_FORM_ACTION.PICKUP_PINCODE_ERROR,
      payload: '',
    });
  };
  const {result, fetching, setPincode} = usePincodeHook(
    setPincodeError,
    resetPincodeError,
  );

  const switchWrapperStyle = switchState
    ? styles.switchMainWrapper
    : styles.switchMainWrapper2;

  const getFreightInputsStyle = () => {
    if (
      loadTypes.includes(loadTypeOptions[0]) &&
      loadTypes.includes(loadTypeOptions[1])
    ) {
      return styles.textContainer;
    } else if (
      loadTypes.includes(loadTypeOptions[0]) &&
      !loadTypes.includes(loadTypeOptions[1])
    ) {
      return styles.textContainer2;
    } else if (
      !loadTypes.includes(loadTypeOptions[0]) &&
      loadTypes.includes(loadTypeOptions[1])
    ) {
      return styles.textContainer2;
    }
    return styles.textContainer;
  };

  const isBothLoadType = loadTypes.length == 2;

  const handleQuotationDate = (date: Date) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.DATE_OF_QUOTATION,
      payload: formatDate4(date),
    });
  };

  const handleMovingDate = (date: Date) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.DATE_OF_MOVING,
      payload: formatDate4(date),
    });
  };

  const handleBillingBy = (item: TDropdownItem) => {
    const {billingBy} = state;
    const tempObj = {
      ...billingBy,
      billing_by: item.label,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.BILLING_BY,
      payload: tempObj as TBillingBy,
    });
  };

  const handleShiftingType = (item: TDropdownItem) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.SHIFTING_TYPE,
      payload: item.label,
    });
  };

  const handleShiftingLuggage = (item: TDropdownItem) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.SHIFTING_LUGGAGE,
      payload: item.label,
    });
  };

  const handleTemplate = (item: TDropdownItem) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.TEMPLATE,
      payload: item.label,
    });
  };

  const handleSerialNumberInputTextChange = (text: string) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.SERIAL_NUMBER,
      payload: text,
    });
  };

  const handleCompanyNameInputTextChange = (text: string) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.COMPANY_NAME,
      payload: text,
    });
  };

  const handlePartyNameInputTextChange = (text: string) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.PARTY_NAME,
      payload: text,
    });
  };

  const handleMobileNumberInputTextChange = (text: string) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.MOBILE_NUMBER,
      payload: text,
    });
  };

  const handlePickupPinCode = useCallback(
    (text: string) => {
      setPincodeRequestKey(PINCODE_REQUEST_KEY.ADD_QUOTATION_PICKUP_ADDRESS);
      if (text) {
        setPincode(text);
        dispatch({
          type: QUOTATION_FORM_ACTION.PICKUP_PINCODE,
          payload: text,
        });
      }
    },
    [state.pickupPincode],
  );

  const handlePickupAddressInputTextChange = (text: string) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.PICKUP_ADDRESS,
      payload: text,
    });
  };

  const handlePickupCurrentFloor = (item: TDropdownItem) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.PICKUP_CURRENT_FLOOR,
      payload: item.label,
    });
  };

  const handlePickupLiftStatus = (item: TDropdownItem) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.PICKUP_LIFT_STATUS,
      payload: item.label,
    });
  };

  const handlePickupState = (item: string) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.PICKUP_STATE,
      payload: item,
    });
  };

  const handlePickupCity = (item: string) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.PICKUP_CITY,
      payload: item,
    });
  };

  const handleDeliveryPinCode = useCallback(
    (text: string) => {
      setPincodeRequestKey(PINCODE_REQUEST_KEY.ADD_QUOTATION_DELIVERY_ADDRESS);
      setPincode(text);
      dispatch({
        type: QUOTATION_FORM_ACTION.DELIVERY_PINCODE,
        payload: text,
      });
    },
    [state.deliveryPincode],
  );

  const handleDeliveryAddressInputTextChange = (text: string) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.DELIVERY_ADDRESS,
      payload: text,
    });
  };

  const handleDeliveryCurrentFloor = (item: TDropdownItem) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.DELIVERY_CURRENT_FLOOR,
      payload: item.label,
    });
  };

  const handleDeliveryLiftStatus = (item: TDropdownItem) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.DELIVERY_LIFT_STATUS,
      payload: item.label,
    });
  };

  const handleDeliveryState = (item: string) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.DELIVERY_STATE,
      payload: item,
    });
  };

  const handleDeliveryCity = (item: string) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.DELIVERY_CITY,
      payload: item,
    });
  };

  const handleLorryType = (item: TDropdownItem) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.LORRY_TYPE,
      payload: item.label,
    });
  };

  const handleFreightPartChargeTextChange = (text: string) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.FREIGHT_PART_CHARGE,
      payload: text,
    });
  };

  const handleFreightFullChargeTextChange = (text: string) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.FREIGHT_FULL_CHARGE,
      payload: text,
    });
  };

  const handlePackingChargeChange = (
    partCharge: string = '0',
    fullCharge: string = '0',
  ) => {
    const {packingCharges: statePackageCharges} = state;
    const tempObj = {
      ...statePackageCharges,
      status: packingCharges,
      part_load_charge: partCharge,
      full_load_charge: fullCharge,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.PACKING_CHARGES,
      payload: tempObj as TCharge,
    });
  };

  const handlePackingMaterialChargeChange = (
    partCharge: string = '0',
    fullCharge: string = '0',
  ) => {
    const {packingMaterialCharges: statePackageMaterialCharges} = state;
    const tempObj = {
      ...statePackageMaterialCharges,
      status: packingMaterialCharges,
      part_load_charge: partCharge,
      full_load_charge: fullCharge,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.PACKING_MATERIAL_CHARGES,
      payload: tempObj as TCharge,
    });
  };

  const handleLoadingCharges = (text1: string = '0', text2: string = '0') => {
    const {loadingCharges: mLoadingCharges} = state;
    const tempObj = {
      ...mLoadingCharges,
      part_load_charge: text1,
      full_load_charge: text2,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.LOADING_CHARGES,
      payload: tempObj as TCharge,
    });
  };

  const handleUnLoadingCharges = (text1: string = '0', text2: string = '0') => {
    const {unLoadingCharges} = state;
    const tempObj = {
      ...unLoadingCharges,
      part_load_charge: text1,
      full_load_charge: text2,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.UNLOADING_CHARGES,
      payload: tempObj as TCharge,
    });
  };

  const handleUnPackingCharges = (text1: string = '0', text2: string = '0') => {
    const {unPackingCharges: mUnpackingCharges} = state;
    const tempObj = {
      ...mUnpackingCharges,
      part_load_charge: text1,
      full_load_charge: text2,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.UNPACKING_CHARGES,
      payload: tempObj as TCharge,
    });
  };

  const handleAdvanceAmountInputTextChange = (text: string) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.ADVANCE_AMOUNT,
      payload: text,
    });
  };

  const handleSurcharge = useCallback(
    (item: TDropdownItem) => {
      const {surcharge} = state;
      const tempObj = {
        ...surcharge,
        status: item.label,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.SURCHARGE,
        payload: tempObj as TSurcharge,
      });
      if (item.value == '1') {
        setIsSurchargeApplicable(false);
        //@ts-ignore
        surchargePercentDropdownRef?.current?.setDefaultValue(
          surchargePercentOptions[0],
        );
      } else {
        setIsSurchargeApplicable(true);
      }
    },
    [isSurchargeApplicable],
  );

  const handleSurchargePercent = (item: TDropdownItem) => {
    const {surcharge} = state;
    const tempObj = {
      ...surcharge,
      surcharge_percent: item.label,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.SURCHARGE,
      payload: tempObj as TSurcharge,
    });
  };

  // README: This function we are using to populate the form with previous quotation values
  const initFormValues = () => {
    const {enquiries} = item as IGetQuotationData;
    const {data: singleQuotationData} = quotation || {};
    if (enquiries.length > 0) {
      const enquiry = enquiries[0];
      const {
        shiftingDate,
        shiftingType,
        billingBy,
        partyName,
        mobile,
        pickupAddress,
        dropAddress,
      } = enquiry;
      handlePartyNameInputTextChange(partyName);
      handleMobileNumberInputTextChange(mobile);
      const {pincode} = pickupAddress || {};
      dispatch({
        type: QUOTATION_FORM_ACTION.PICKUP_PINCODE,
        payload: pincode,
      });
      dispatch({
        type: QUOTATION_FORM_ACTION.DELIVERY_PINCODE,
        payload: dropAddress.pincode,
      });
      //@ts-ignore
      dateOfMovingCompRef?.current?.setDefaultValue(new Date(shiftingDate));
      const billingByItemIndex = billingByOptions.findIndex(
        e => e.label.toLowerCase() == billingBy.toLowerCase(),
      );
      if (billingByItemIndex != -1 && billingByDropdwonRef) {
        //@ts-ignore
        billingByDropdwonRef?.current?.setDefaultValue(
          billingByOptions[billingByItemIndex],
        );
      }
      const itemIndex = shiftingTypes.findIndex(
        e => e.label.toLowerCase() == shiftingType.toLowerCase(),
      );
      if (itemIndex != -1 && shiftingTypeDropdownRef) {
        //@ts-ignore
        shiftingTypeDropdownRef?.current?.setDefaultValue(
          shiftingTypes[itemIndex],
        );
      }
    }
    const {
      shiftingLuggage,
      quotationNumber,
      quotationData,
      quotationfreights,
      advanceAmount,
    } = (singleQuotationData as ISingleQuotationData) || {};
    setQuotationserialNo(quotationNumber);
    handleAdvanceAmountInputTextChange(advanceAmount);
    if (
      quotationfreights &&
      Array.isArray(quotationfreights) &&
      quotationfreights.length > 0
    ) {
      const firstQuotationItem = quotationfreights[0];
      const {
        isPartLoad,
        isFullLoad,
        partLoadCharge,
        fullLoadCharge,
        lorryType,

        packagingChargesStatus,
        packagingPartLoadCharges,
        packagingFullLoadCharges,

        packingMaterialChargesStatus,
        packingMaterialPartLoadCharges,
        packingMaterialFullLoadCharges,

        loadingChargesStatus,
        loadingPartLoadCharges,
        loadingFullLoadCharges,

        unLoadingChargesStatus,
        unLoadingFullLoadCharges,
        unLoadingPartLoadCharges,

        unPackagingChargesStatus,
        unPackagingFullLoadCharges,
        unPackagingPartLoadCharges,

        otherCharges,
        surchargeCharges,
        surchargeIsRequired,
        discountType,
        discountAmount,

        transitInsurance,
        storageCharges,

        gstType,
        gstStatus,
        gstPercentage,

        otherDetail1,
        otherDetail2,
      } = firstQuotationItem || {};

      dispatch({
        type: QUOTATION_FORM_ACTION.LORRY_TYPE,
        payload: lorryType,
      });

      const loryTypeItemIndex = loaryTypeOptions.findIndex(
        e => e.label.toLowerCase() == lorryType.toLowerCase(),
      );
      if (loryTypeItemIndex != -1) {
        //@ts-ignore
        gstPercentDropdownRef?.current?.setDefaultValue(
          loaryTypeOptions[loryTypeItemIndex],
        );
      }

      const {otherDetails} = state;
      const tempObj10 = {
        ...otherDetails,
        items_got_down_from_balcony: otherDetail1,
        any_needs_or_concern: otherDetail2,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.OTHER_DETAILS,
        payload: tempObj10 as TOtherDetails,
      });

      handleDiscountType(discountType);
      handleQuotationFlatDiscountInputTextChange(discountAmount);
      const {discountInQuotation} = state;
      const tempObj6 = {
        ...discountInQuotation,
        discount_type: discountType,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.DISCOUNT_IN_QUOTATION,
        payload: tempObj6 as TDiscountInQuotation,
      });

      if (surchargeIsRequired == 'Applicable') {
        setIsSurchargeApplicable(true);
      }

      const tempObj7 = {
        ...discountInQuotation,
        discount_value: discountAmount,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.DISCOUNT_IN_QUOTATION,
        payload: tempObj7 as TDiscountInQuotation,
      });

      const discountPercentItemIndex = discountPercentOptions.findIndex(
        e => e.label.toLowerCase() == discountAmount.toLowerCase(),
      );
      if (discountPercentItemIndex != -1) {
        //@ts-ignore
        discountPercentDropdownRef?.current?.setDefaultValue(
          discountPercentOptions[discountPercentItemIndex],
        );
      }

      setGstInQuotation(gstStatus);
      const {gstInQuotation} = state;
      const tempObj8 = {
        ...gstInQuotation,
        status: gstStatus,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.GST_IN_QUOTATION,
        payload: tempObj8 as TGstInQuotation,
      });

      const gstPercentItemIndex = gstPercentOptions.findIndex(
        e => e.label.toLowerCase() == gstPercentage.toLowerCase(),
      );
      if (gstPercentItemIndex != -1) {
        //@ts-ignore
        gstPercentDropdownRef?.current?.setDefaultValue(
          gstPercentOptions[gstPercentItemIndex],
        );
      }

      const gstTypeItemIndex = gstTypeOptions.findIndex(
        e => e.label.toLowerCase() == gstType.toLowerCase(),
      );
      if (gstTypeItemIndex != -1) {
        //@ts-ignore
        gstTypeDropdownRef?.current?.setDefaultValue(
          gstTypeOptions[gstTypeItemIndex],
        );
      }

      const itmIndex = surchargeOptions.findIndex(
        e => e.label.toLowerCase() == surchargeIsRequired.toLowerCase(),
      );
      if (itmIndex != -1) {
        //@ts-ignore
        surchargeDropdownRef?.current?.setDefaultValue(
          surchargeOptions[itmIndex],
        );
      }

      const surchargeItemIndex = surchargePercentOptions.findIndex(
        e => e.label.toLowerCase() == surchargeCharges.toLowerCase(),
      );
      if (surchargeItemIndex != -1) {
        //@ts-ignore
        surchargePercentDropdownRef?.current?.setDefaultValue(
          surchargePercentOptions[surchargeItemIndex],
        );
      }

      const {isRequired, transitType, charges} = transitInsurance || {};
      if (charges && Array.isArray(charges) && charges.length > 0) {
        const firstItem = charges[0];
        const {luggageType, insurancePerc, gst, value} = firstItem || {};
        setIsInsuranceRequired(isRequired == 'required');
        const {insuranceDetails} = state;
        const tempObj = {
          ...insuranceDetails,
          status: isRequired,
        };
        dispatch({
          type: QUOTATION_FORM_ACTION.INSURANCE_DETAILS,
          payload: tempObj as TInsuranceDetails,
        });
        const insuranceTypeItemIndex = insuranceTypeOptions.findIndex(
          e => e.label.toLowerCase() == transitType.toLowerCase(),
        );
        if (insuranceTypeItemIndex != -1) {
          //@ts-ignore
          insuranceTypeDropdownRef?.current?.setDefaultValue(
            insuranceTypeOptions[insuranceTypeItemIndex],
          );
        }

        const insurancePercentItemIndex = insurancePercentOptions.findIndex(
          e => e.label.toLowerCase() == insurancePerc.toLowerCase(),
        );
        if (insurancePercentItemIndex != -1) {
          //@ts-ignore
          insuranceChargePercentDropdownRef?.current?.setDefaultValue(
            insurancePercentOptions[insurancePercentItemIndex],
          );
        }

        const insuranceGSTPercentItemIndex = gstPercentOptions.findIndex(
          e => e.label.toLowerCase() == gst.toLowerCase(),
        );
        if (insuranceGSTPercentItemIndex != -1) {
          //@ts-ignore
          insuranceGSTPercentDropdownRef?.current?.setDefaultValue(
            gstPercentOptions[insuranceGSTPercentItemIndex],
          );
        }
        handleInsuranceGoodsValueInputTextChange(value);
      }

      const {
        isRequired: isReq,
        storageChargesType,
        amount,
      } = storageCharges || {};
      setIsStorageRequired(isReq == 'required');
      const {storageCharges: localStorageCharges} = state;
      const tempObj9 = {
        ...localStorageCharges,
        status: isReq == 'required' ? 'Required' : 'Not Required',
        storage_duration_type: storageChargesType,
        storage_from_date: '',
        storage_to_date: '',
        storage_amount: amount,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.STORAGE_CHARGES,
        payload: tempObj9 as TStorageCharge,
      });

      const storageChargeTypeItemIndex = storageDurationOptions.findIndex(
        e => e.label.toLowerCase() == storageChargesType.toLowerCase(),
      );
      if (storageChargeTypeItemIndex != -1) {
        //@ts-ignore
        storageDurationDropdownRef?.current?.setDefaultValue(
          storageDurationOptions[storageChargeTypeItemIndex],
        );
      }
      // handleStorageAmountInputTextChange(amount);

      setPackingMaterialCharges(packingMaterialChargesStatus);
      const {packingMaterialCharges: statePackageMaterialCharges} = state;
      const tempObj2 = {
        ...statePackageMaterialCharges,
        status: packingMaterialChargesStatus,
        part_load_charge: '0',
        full_load_charge: '0',
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.PACKING_MATERIAL_CHARGES,
        payload: tempObj2 as TCharge,
      });
      handlePackingMaterialChargeChange(
        packingMaterialPartLoadCharges,
        packingMaterialFullLoadCharges,
      );

      setLoadingCharges(loadingChargesStatus);
      const {loadingCharges: mLoadingCharges} = state;
      const tempObj3 = {
        ...mLoadingCharges,
        status: loadingChargesStatus,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.LOADING_CHARGES,
        payload: tempObj3 as TCharge,
      });
      handleLoadingCharges(loadingPartLoadCharges, loadingFullLoadCharges);

      setUnloadingCharges(unLoadingChargesStatus);
      const {unLoadingCharges} = state;
      const tempObj4 = {
        ...unLoadingCharges,
        status: unLoadingChargesStatus,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.UNLOADING_CHARGES,
        payload: tempObj4 as TCharge,
      });
      handleUnLoadingCharges(
        unLoadingPartLoadCharges,
        unLoadingFullLoadCharges,
      );

      setUnpackingCharges(unPackagingChargesStatus);
      const {unPackingCharges: mUnpackingCharges} = state;
      const tempObj5 = {
        ...mUnpackingCharges,
        status: unPackagingChargesStatus,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.UNPACKING_CHARGES,
        payload: tempObj5 as TCharge,
      });
      handleUnPackingCharges(
        unPackagingPartLoadCharges,
        unPackagingFullLoadCharges,
      );

      dispatch({
        type: QUOTATION_FORM_ACTION.OTHER_CHARGES,
        payload: otherCharges as unknown as [TOtherCharges],
      });

      setIsPartLoad(isPartLoad == 'true');
      handleFreightPartChargeTextChange(partLoadCharge);
      dispatch({
        type: QUOTATION_FORM_ACTION.PART_LOAD,
        payload: isPartLoad == 'true',
      });
      setPackingCharges(packagingChargesStatus);
      const {packingCharges: statePackageCharges} = state;
      const tempObj = {
        ...statePackageCharges,
        status: packagingChargesStatus,
        part_load_charge: '0',
        full_load_charge: '0',
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.PACKING_CHARGES,
        payload: tempObj as TCharge,
      });
      handlePackingChargeChange(
        packagingPartLoadCharges,
        packagingFullLoadCharges,
      );

      setIsFullLoad(isFullLoad == 'true');
      dispatch({
        type: QUOTATION_FORM_ACTION.FULL_LOAD,
        payload: isFullLoad == 'true',
      });
      handleFreightFullChargeTextChange(fullLoadCharge);
    }

    //@ts-ignore
    dateOfQuotationCompRef?.current?.setDefaultValue(new Date(quotationData));
    const itmIndex = shiftingLuggages.findIndex(
      e => e.label.toLowerCase() == shiftingLuggage.toLowerCase(),
    );
    if (itmIndex != -1) {
      //@ts-ignore
      shiftingLuggageDropdownRef?.current?.setDefaultValue(
        shiftingLuggages[itmIndex],
      );
    }
  };

  useEffect(() => {
    if (isEdit) {
      dispatch2(getSingleQuotationRequest(item?._id as string));
    }
  }, []);

  useEffect(() => {
    if (isEdit) {
      initFormValues();
    }
  }, [quotation, isEdit]);

  useEffect(() => {
    const {storageCharges} = state;
    const tempObj = {
      ...storageCharges,
      status: isStorageRequired ? 'required' : 'not required',
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.STORAGE_CHARGES,
      payload: tempObj as TStorageCharge,
    });
  }, [isStorageRequired]);

  const handleInsuranceType = (item: TDropdownItem) => {
    const {insuranceDetails} = state;
    const tempObj = {
      ...insuranceDetails,
      insurance_type: item.label,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.INSURANCE_DETAILS,
      payload: tempObj as TInsuranceDetails,
    });
  };

  const handleInsuranceCharge = (item: TDropdownItem) => {
    const {insuranceDetails} = state;
    const tempObj = {
      ...insuranceDetails,
      insurance_charge_percent: item.label,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.INSURANCE_DETAILS,
      payload: tempObj as TInsuranceDetails,
    });
  };

  const handleInsuranceGSTPercent = (item: TDropdownItem) => {
    const {insuranceDetails} = state;
    const tempObj = {
      ...insuranceDetails,
      insurance_gst_percent: item.label,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.INSURANCE_DETAILS,
      payload: tempObj as TInsuranceDetails,
    });
  };

  const handleInsuranceGoodsValueInputTextChange = (text: string) => {
    const {insuranceDetails} = state;
    const tempObj = {
      ...insuranceDetails,
      insurance_goods_value: text,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.INSURANCE_DETAILS,
      payload: tempObj as TInsuranceDetails,
    });
  };

  const handleStorageFromDate = (date: Date) => {
    const {storageCharges} = state;
    const tempObj = {
      ...storageCharges,
      storage_from_date: formatDate(date),
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.STORAGE_CHARGES,
      payload: tempObj as TStorageCharge,
    });
  };

  const handleStorageToDate = (date: Date) => {
    const {storageCharges} = state;
    const tempObj = {
      ...storageCharges,
      storage_to_date: formatDate(date),
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.STORAGE_CHARGES,
      payload: tempObj as TStorageCharge,
    });
  };

  const handleStorageAmountInputTextChange = (text: string) => {
    const {storageCharges} = state;
    const tempObj = {
      ...storageCharges,
      storage_amount: text,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.STORAGE_CHARGES,
      payload: tempObj as TStorageCharge,
    });
  };

  const handleAddOtherItemCharges = () => {
    if (!jobType) return;
    if (!calcPartloadOtherItemsTotal() && !calcFullLoadOtherItemsTotal())
      return;
    const {otherCharges} = state;
    const tempArr: TOtherCharges[] = otherCharges || [];
    const newItem: TOtherCharges = {
      jobType: jobType,
      qty: quantity,
      partLoad: {
        ratePerItem: partLoadRatePerItem,
        amount: calcPartloadOtherItemsTotal(),
      },
      fullLoad: {
        ratePerItem: fullLoadRatePerItem,
        amount: calcFullLoadOtherItemsTotal(),
      },
    };
    tempArr.push(newItem);
    dispatch({
      type: QUOTATION_FORM_ACTION.OTHER_CHARGES,
      payload: tempArr as [TOtherCharges],
    });
    //@ts-ignore
    particularsInputCompRef && particularsInputCompRef?.current.reset();
    //@ts-ignore
    quantityInputCompRef && quantityInputCompRef?.current.reset();
    if (loadTypes.includes(loadTypeOptions[0])) {
      //@ts-ignore
      partRateInputCompRef && partRateInputCompRef?.current.reset();
      //@ts-ignore
      partAmountCompRef && partAmountCompRef?.current.reset();
    }
    if (loadTypes.includes(loadTypeOptions[1])) {
      //@ts-ignore
      fullRateInputCompRef && fullRateInputCompRef?.current.reset();
      //@ts-ignore
      fullAmountCompRef && fullAmountCompRef?.current.reset();
    }
  };

  const handleDeleteOtherChargeItemClick = (index: number) => {
    const {otherCharges} = state;
    const tempArr: TOtherCharges[] = otherCharges || [];
    tempArr.splice(index, 1);
    dispatch({
      type: QUOTATION_FORM_ACTION.OTHER_CHARGES,
      payload: tempArr as [TOtherCharges],
    });
  };

  const renderOtherItemList = () => {
    const {otherCharges} = state;
    if (otherCharges && otherCharges?.length > 0) {
      return otherCharges.map((otherItem, index) => {
        return (
          <>
            <View key={index} style={styles.otherChargeItemWrapper}>
              <View style={styles.otherChargeItemContainer}>
                <Text style={styles.otherChargeLabelText}>
                  Job Type:{' '}
                  <Text
                    style={
                      styles.otherChargeValueText
                    }>{`${otherItem.jobType}`}</Text>
                </Text>
                {otherItem.qty ? (
                  <Text style={styles.otherChargeLabelText}>
                    Quantity:{' '}
                    <Text
                      style={
                        styles.otherChargeValueText
                      }>{`${otherItem.qty}`}</Text>
                  </Text>
                ) : null}
                {otherItem.partLoad?.ratePerItem ? (
                  <Text style={styles.otherChargeLabelText}>
                    Part Load Rate/Item:
                    <Text
                      style={
                        styles.otherChargeValueText
                      }>{`${otherItem.partLoad?.ratePerItem}/-`}</Text>
                  </Text>
                ) : null}
                <Text style={styles.otherChargeLabelText}>
                  Part Load Amount:{' '}
                  <Text
                    style={
                      styles.otherChargeValueText
                    }>{`${otherItem.partLoad?.amount}/-`}</Text>
                </Text>
                {otherItem.fullLoad?.ratePerItem ? (
                  <Text style={styles.otherChargeLabelText}>
                    Full Load Rate/Item:
                    <Text
                      style={
                        styles.otherChargeValueText
                      }>{`${otherItem.fullLoad?.ratePerItem}/-`}</Text>
                  </Text>
                ) : null}
                {otherItem.fullLoad?.amount ? (
                  <Text style={styles.otherChargeLabelText}>
                    Full Load Amount:{' '}
                    <Text
                      style={
                        styles.otherChargeValueText
                      }>{`${otherItem.fullLoad?.amount}/-`}</Text>
                  </Text>
                ) : null}
              </View>
              <View style={styles.otherChargeDeleteIconContainer}>
                <TouchableOpacity
                  activeOpacity={0.4}
                  onPress={() => handleDeleteOtherChargeItemClick(index)}>
                  <DeleteIcon width={25} height={25} />
                </TouchableOpacity>
              </View>
            </View>
          </>
        );
      });
    }
    return null;
  };

  const handleDiscountType = useCallback(
    (item: string) => {
      setDiscountType(item);
    },
    [discountType],
  );

  const renderLoryTypeView = () => {
    if (loadTypes.includes(loadTypeOptions[1])) {
      return (
        <>
          <Spacer height={4} />
          <View style={styles.textContainer2}>
            <Label text="Lory Type" style={styles.label} />
            <DropdownComponent
              data={loaryTypeOptions}
              onSelect={handleLorryType}
              //@ts-ignore
              ref={loryTypeDropdownRef}
            />
          </View>
        </>
      );
    }
    return null;
  };

  const handleQuotationDiscountPercent = (item: TDropdownItem) => {
    const {discountInQuotation} = state;
    const tempObj = {
      ...discountInQuotation,
      discount_value: item.label,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.DISCOUNT_IN_QUOTATION,
      payload: tempObj as TDiscountInQuotation,
    });
  };

  const handleQuotationFlatDiscountInputTextChange = (text: string) => {
    const {discountInQuotation} = state;
    const tempObj = {
      ...discountInQuotation,
      discount_value: text,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.DISCOUNT_IN_QUOTATION,
      payload: tempObj as TDiscountInQuotation,
    });
  };

  const renderDiscountTypeView = () => {
    if (discountType === 'Discount @%') {
      return (
        <>
          <Spacer height={12} />
          <View style={styles.textContainer2}>
            <DropdownComponent
              data={discountPercentOptions}
              onSelect={handleQuotationDiscountPercent}
              //@ts-ignore
              ref={discountPercentDropdownRef}
            />
          </View>
        </>
      );
    } else if (discountType === 'Flat Discount') {
      return (
        <>
          <Spacer height={12} />
          <View style={styles.textContainer2}>
            <Input
              onChangeText={handleQuotationFlatDiscountInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
              placeholder="Enter discount amount"
              value={state?.discountInQuotation?.discount_value}
            />
          </View>
        </>
      );
    }
    return null;
  };

  const handleQuotationGstPercent = (item: TDropdownItem) => {
    const {gstInQuotation} = state;
    const tempObj = {
      ...gstInQuotation,
      gst_percent: item.label,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.GST_IN_QUOTATION,
      payload: tempObj as TGstInQuotation,
    });
  };

  const handleQuotationGstType = (item: TDropdownItem) => {
    const {gstInQuotation} = state;
    const tempObj = {
      ...gstInQuotation,
      gst_type: item.label,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.GST_IN_QUOTATION,
      payload: tempObj as TGstInQuotation,
    });
  };

  const showBillingByIndividualView = () => {
    if (state.billingBy?.billing_by === 'by Company') return null;
    return (
      <>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Party Name" style={styles.label} required={true} />
          <Input
            onChangeText={handlePartyNameInputTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state?.partyName}
            type="text"
            required={true}
            //@ts-ignore
            error={showErrors ? errors?.partyName : ''}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Mobile Number" style={styles.label} required={true} />
          <Input
            onChangeText={handleMobileNumberInputTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state?.mobileNumber}
            required={true}
            type="text"
            //@ts-ignore
            error={showErrors ? errors?.mobile : ''}
          />
        </View>
      </>
    );
  };

  const showBillingByCompanyView = () => {
    if (state.billingBy?.billing_by === 'by Individual') return null;
    return (
      <>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Company Name" style={styles.label} required={true} />
          <Input
            onChangeText={(text: string) => {
              const {billingBy} = state;
              const tempObj = {
                ...billingBy,
                billing_info: {...billingBy?.billing_info, company_name: text},
              };
              dispatch({
                type: QUOTATION_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            required={true}
            type="text"
            //@ts-ignore
            error={showErrors ? errors?.companyName : ''}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Approval Authority" style={styles.label} />
          <DropdownComponent
            data={approvalAuthorityOptions}
            onSelect={(item: TDropdownItem) => {
              const {billingBy} = state;
              const tempObj = {
                ...billingBy,
                billing_info: {
                  ...billingBy?.billing_info,
                  approval_authority: item.label,
                },
              };
              dispatch({
                type: QUOTATION_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Authority Person Name" style={styles.label} />
          <Input
            onChangeText={(text: string) => {
              const {billingBy} = state;
              const tempObj = {
                ...billingBy,
                billing_info: {
                  ...billingBy?.billing_info,
                  authority_person_name: text,
                },
              };
              dispatch({
                type: QUOTATION_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Authority Mobile Number" style={styles.label} />
          <Input
            onChangeText={(text: string) => {
              const {billingBy} = state;
              const tempObj = {
                ...billingBy,
                billing_info: {
                  ...billingBy?.billing_info,
                  authority_mobile_number: text,
                },
              };
              dispatch({
                type: QUOTATION_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            type="mobile"
            //@ts-ignore
            error={showErrors ? errors?.employeeMobile : ''}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Company GST" style={styles.label} />
          <Input
            onChangeText={(text: string) => {
              const {billingBy} = state;
              const tempObj = {
                ...billingBy,
                billing_info: {...billingBy?.billing_info, company_gst: text},
              };
              dispatch({
                type: QUOTATION_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Employee Name" style={styles.label} required={true} />
          <Input
            onChangeText={(text: string) => {
              const {billingBy} = state;
              const tempObj = {
                ...billingBy,
                billing_info: {...billingBy?.billing_info, employee_name: text},
              };
              dispatch({
                type: QUOTATION_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            required={true}
            type="text"
            //@ts-ignore
            error={showErrors ? errors?.employeeName : ''}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Employee Designation" style={styles.label} />
          <Input
            onChangeText={(text: string) => {
              const {billingBy} = state;
              const tempObj = {
                ...billingBy,
                billing_info: {
                  ...billingBy?.billing_info,
                  employee_designation: text,
                },
              };
              dispatch({
                type: QUOTATION_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Employee Mobile Number" style={styles.label} />
          <Input
            onChangeText={(text: string) => {
              const {billingBy} = state;
              const tempObj = {
                ...billingBy,
                billing_info: {
                  ...billingBy?.billing_info,
                  employee_mobile_number: text,
                },
              };
              dispatch({
                type: QUOTATION_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            type="mobile"
            //@ts-ignore
            error={showErrors ? errors?.employeeMobile : ''}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Company Address" style={styles.label} />
          <Input
            onChangeText={(text: string) => {
              const {billingBy} = state;
              const tempObj = {
                ...billingBy,
                billing_info: {
                  ...billingBy?.billing_info,
                  company_address: text,
                },
              };
              dispatch({
                type: QUOTATION_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
      </>
    );
  };

  useEffect(() => {
    dispatch({
      type: QUOTATION_FORM_ACTION.DATE_OF_QUOTATION,
      payload: formatDate(new Date()),
    });
    dispatch({
      type: QUOTATION_FORM_ACTION.DATE_OF_QUOTATION,
      payload: formatDate(new Date()),
    });
  }, []);

  /** Effects */
  useEffect(() => {
    if (result && result.Status != 'Error') {
      if (
        pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_QUOTATION_PICKUP_ADDRESS
      ) {
        setPickupStates(getStates(result));
        setPickupCities(getCities(result));
      } else if (
        pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_QUOTATION_DELIVERY_ADDRESS
      ) {
        setDeliveryStates(getStates(result));
        setDeliveryCities(getCities(result));
      }
    }
  }, [result]);

  useEffect(() => {
    if (
      pickupStates &&
      pickupCities &&
      pickupCityDropdownRef &&
      pickupStateDropwdownRef &&
      pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_ENQUIRY_PICKUP_ADDRESS
    ) {
      //@ts-ignore
      pickupStateDropwdownRef?.current?.setValue(pickupStates[0]?.label);
      //@ts-ignore
      pickupCityDropdownRef?.current?.setValue(pickupCities[0]?.label);
    }
  }, [pickupStates, pickupCities]);

  useEffect(() => {
    if (
      deliveryStates &&
      deliveryCities &&
      dropStateDropdownRef &&
      dropCityDropdownRef &&
      pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_ENQUIRY_DELIVERY_ADDRESS
    ) {
      //@ts-ignore
      dropStateDropdownRef?.current?.setValue(deliveryStates[0]?.label);
      //@ts-ignore
      dropCityDropdownRef?.current?.setValue(deliveryCities[0]?.label);
    }
  }, [deliveryStates, deliveryCities]);

  useEffect(() => {
    if (!addQuotationRequesting && addQuotationSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Quotation',
        text2: 'Quotation has been added successfully',
      });
      dispatch2(resetaddQuotationRequest());
      navigation?.goBack();
    } else if (!addQuotationRequesting && addQuotationFailure) {
      Toast.show({
        type: 'error',
        text1: 'Quotation',
        text2: 'Error in adding Quotation. Please try again!',
      });
      dispatch2(resetaddQuotationRequest());
    }
  }, [addQuotationRequesting, addQuotationSuccess, addQuotationFailure]);

  const defaultInsuranceValues: ITransitInsurance = {
    isRequired: state?.insuranceDetails?.status as string,
    transitType:
      (state?.insuranceDetails?.insurance_type as string) || 'Optional',
    charges: [
      {
        luggageType:
          (state?.insuranceDetails?.shifting_luggage as string) || 'Household',
        insurancePerc:
          (state?.insuranceDetails?.insurance_charge_percent as string) ||
          '0.5%',
        gst: (state?.insuranceDetails?.insurance_gst_percent as string) || '0%',
        value: state?.insuranceDetails?.insurance_goods_value as string,
      },
    ],
  };

  const defaultStorageChargeValues = {
    isRequired: state?.storageCharges?.status as string,
    storageChargesType:
      (state?.storageCharges?.storage_duration_type as string) ||
      'Per Day Charges',
    fromDate: state?.storageCharges?.storage_from_date as string,
    toDate: state?.storageCharges?.storage_to_date as string,
    amount: state?.storageCharges?.storage_amount as string,
  };

  const handleSubmit = useCallback(() => {
    setShowErrors(true);
    if (!isFormValid) {
      if (showMobileNumberError) {
        Alert.alert(
          'Message',
          'Enter either Authority Mobile number or Employee Mobile number',
        );
      } else {
        Toast.show({
          type: 'error',
          text1: 'Form',
          text2: 'Form data is not valid. Please correct!',
        });
      }
      return;
    }
    const payload: IAddQuotationRequest = {
      companyId: companyId,
      authId: otpData?.data.id as string,
      shiftingType: state?.shiftingType.toUpperCase(),
      shiftingLuggage: state?.shiftingLuggage as string,
      vehicleType: state?.vehcileType as string,
      manufacture: state?.manufacturer as string,
      model: state?.model as string,
      templateId: '5555',
      quotationDate: state?.dateOfQuotation as string,
      quotationNumber: state?.serialNumber as string,
      enquirySource: '',
      partyCompanyName: '',
      partyName: state?.partyName,
      email: '',
      mobile: state?.mobileNumber,
      shiftingDate: state.dateOfMoving,
      pickupAddress: {
        shiftingFrom: state?.pickupCity as string,
        state: state?.pickupState as string,
        city: state?.pickupCity as string,
        pincode: state?.pickupPincode as string,
        locality: state?.pickupLocality as string,
        landmark: state?.pickupAddress as string,
        floor: state?.pickupCurrentFloor as string,
        isLiftAvailable: state?.pickupLiftStatus.toLocaleUpperCase() as string,
      },
      dropAddress: {
        shiftingTo: state?.deliveryCity as string,
        state: state?.deliveryState as string,
        city: state?.deliveryCity as string,
        locality: state?.deliveryLocality as string,
        pincode: state?.deliveryPincode as string,
        landmark: state?.deliveryAddress as string,
        floor: state?.deliveryCurrentFloor as string,
        isLiftAvailable:
          state?.deliveryLiftStatus.toLocaleUpperCase() as string,
      },
      partLoad: state?.partLoad,
      fullLoad: state?.fullLoad,
      openBody: true,
      closeBody: true,
      lorryType: state?.lorryType as string,
      freightChargesStatus: 'NOT_REQUIRED',
      partLoadCharge: state.freightPartCharge,
      fullLoadCharge: state.freightFullCharge,
      packagingChargesStatus: state?.packingCharges?.status as string,
      packagingPartLoadCharges: state?.packingCharges
        ?.part_load_charge as string,
      packagingFullLoadCharges: state?.packingCharges
        ?.full_load_charge as string,
      unPackagingChargesStatus: state?.unPackingCharges?.status as string,
      unPackagingPartLoadCharges: state?.unPackingCharges
        ?.part_load_charge as string,
      unPackagingFullLoadCharges: state?.unPackingCharges
        ?.full_load_charge as string,
      unLoadingChargesStatus: state?.unLoadingCharges?.status as string,
      unLoadingPartLoadCharges: state?.unLoadingCharges
        ?.part_load_charge as string,
      unLoadingFullLoadCharges: state?.unLoadingCharges
        ?.full_load_charge as string,
      packingMaterialChargesStatus: state?.packingMaterialCharges
        ?.status as string,
      packingMaterialPartLoadCharges: state?.packingMaterialCharges
        ?.part_load_charge as string,
      packingMaterialFullLoadCharges: state?.packingMaterialCharges
        ?.full_load_charge as string,
      loadingChargesStatus: state?.loadingCharges?.status as string,
      loadingPartLoadCharges: state?.loadingCharges?.part_load_charge as string,
      loadingFullLoadCharges: state?.loadingCharges?.full_load_charge as string,
      gstStatus: state?.gstInQuotation?.status as string,
      gstType: state?.gstInQuotation?.gst_type as string,
      gstPercentage: state?.gstInQuotation?.gst_percent as string,
      surchargeIsRequired: state?.surcharge?.status as string,
      surchargeCharges: state?.surcharge?.surcharge_percent as string,
      discountType: state?.discountInQuotation?.discount_type as string,
      discountAmount: state?.discountInQuotation?.discount_value as string,
      transitInsurance: isInsuranceRequired ? defaultInsuranceValues : null,
      storageCharges: isStorageRequired ? defaultStorageChargeValues : null,
      otherCharges: state.otherCharges as [TOtherCharges],
      quotationAmount: '1233',
      advanceAmount: state.advanceAmount as string,
      billingBy: state?.billingBy?.billing_by as string,
      billingDetails: {
        companyName: state?.billingBy?.billing_info?.company_name as string,
        approvalAuthority: state?.billingBy?.billing_info
          ?.approval_authority as string,
        authorityPersonName: state?.billingBy?.billing_info
          ?.authority_person_name as string,
        authorityPersonMobile: state?.billingBy?.billing_info
          ?.authority_mobile_number as string,
        companyAddress: state.billingBy?.billing_info
          ?.company_address as string,
        companyGST: state?.billingBy?.billing_info?.company_gst as string,
        employeeName: state?.billingBy?.billing_info?.employee_name as string,
        employeeDesignation: state?.billingBy?.billing_info
          ?.employee_designation as string,
        employeeMobile: state?.billingBy?.billing_info
          ?.employee_mobile_number as string,
      },
      otherDetail1: state.otherDetails?.items_got_down_from_balcony as string,
      otherDetail2: state.otherDetails?.any_needs_or_concern as string,
    };
    console.log(
      'add-quotation-payload----',
      JSON.stringify(payload, null, ' '),
    );
    dispatch2(addQuotationRequest(payload));
  }, [state, showMobileNumberError, showErrors]);

  const handleLoadTypes = (value: string) => {
    const clone = [...loadTypes];
    const itemIndex = clone.findIndex(e => e == value);
    if (itemIndex != -1) {
      const filter = clone.filter(e => e != value);
      setLoadTypes(filter);
    } else {
      clone.push(value);
      setLoadTypes(clone);
    }
  };

  const showLoadTypeRequiredErrorView = () => {
    if (loadTypes.length == 0) {
      return (
        <View style={styles.loadTypeErrorContainer}>
          <Text style={styles.loadTypeErrorText}>Load type required</Text>
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    if (loadTypes.includes(loadTypeOptions[0])) {
      dispatch({
        type: QUOTATION_FORM_ACTION.PART_LOAD,
        payload: true,
      });
    } else {
      dispatch({
        type: QUOTATION_FORM_ACTION.PART_LOAD,
        payload: false,
      });
    }
    if (loadTypes.includes(loadTypeOptions[1])) {
      dispatch({
        type: QUOTATION_FORM_ACTION.FULL_LOAD,
        payload: true,
      });
    } else {
      dispatch({
        type: QUOTATION_FORM_ACTION.FULL_LOAD,
        payload: false,
      });
    }
  }, [loadTypes]);

  const calcPartloadOtherItemsTotal = () => {
    let qntyInt: number = 0;
    let rate: number = 0;
    let amount: number = 0;
    let totalAmount: string = partLoadAmount;
    if (quantity) {
      qntyInt = parseInt(quantity);
    }
    if (partLoadRatePerItem) {
      rate = parseInt(partLoadRatePerItem);
    }
    amount = qntyInt * rate;
    if (amount) {
      totalAmount = amount.toString();
    }
    return totalAmount;
  };

  const calcFullLoadOtherItemsTotal = () => {
    let qntyInt: number = 0;
    let rate: number = 0;
    let amount: number = 0;
    let totalAmount: string = fullLoadAmount;
    if (quantity) {
      qntyInt = parseInt(quantity);
    }
    if (fullLoadRatePerItem) {
      rate = parseInt(fullLoadRatePerItem);
    }
    amount = qntyInt * rate;
    if (amount) {
      totalAmount = amount.toString();
    }
    return totalAmount;
  };

  const validateForm = () => {
    let errors: any = {};
    if (state.billingBy?.billing_by == 'by Company') {
      delete errors.partyName;
      delete errors.mobile;
      if (!state.billingBy?.billing_info?.company_name) {
        errors.companyName = 'Company name required';
      }
      if (!state.billingBy?.billing_info?.employee_name) {
        errors.employeeName = 'Employee name required';
      }
      if (
        !state.billingBy.billing_info?.authority_mobile_number &&
        !state.billingBy?.billing_info?.employee_mobile_number
      ) {
        setShowMobileNumberError(true);
        errors.employeeMobile =
          'Enter either Authority mobile number or Employee mobile number';
      } else if (
        state.billingBy.billing_info?.authority_mobile_number ||
        state.billingBy?.billing_info?.employee_mobile_number
      ) {
        if (
          state.billingBy.billing_info?.authority_mobile_number &&
          !Validator.mobile(
            state.billingBy?.billing_info?.authority_mobile_number,
          )
        ) {
          errors.employeeMobile = 'Mobile number invalid';
        } else if (
          state.billingBy.billing_info?.employee_mobile_number &&
          !Validator.mobile(
            state.billingBy?.billing_info?.employee_mobile_number,
          )
        ) {
          errors.employeeMobile = 'Mobile number invalid';
        }
      }
    } else if (state.billingBy?.billing_by == 'by Individual') {
      setShowMobileNumberError(false);
      delete errors?.companyName;
      delete errors?.employeeName;
      delete errors?.employeeMobile;
      if (!state.partyName) {
        errors.partyName = 'Party name required';
      }
      if (!state.mobileNumber) {
        errors.mobile = 'Mobile number required';
      }
      //  else if(!Validator.mobile(state.mobile)) {
      //   errors.mobile = "Mobile number invalid";
      // }
    }
    if (state.shiftingLuggage.length == 0) {
      errors.shiftingLuggage = 'Shifting luggage required';
    }
    if (!state.pickupPincode) {
      errors.pickupPincode = 'Pickup Pincode required';
    }
    if (!state.deliveryPincode) {
      errors.dropPincode = 'Drop Pincode required';
    }
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    setShowErrors(false);
    setShowMobileNumberError(false);
    validateForm();
  }, [
    state.billingBy?.billing_by,
    state.partyName,
    state.mobileNumber,
    state.billingBy?.billing_info?.company_name,
    state.billingBy?.billing_info?.employee_name,
    state.billingBy?.billing_info?.employee_mobile_number,
    state.billingBy?.billing_info?.authority_mobile_number,
    state.shiftingLuggage,
    state.pickupPincode,
    state.deliveryPincode,
  ]);

  return (
    <>
      <AvoidSoftInputViewHOC>
        <View style={styles.container}>
          {showHeader ? (
            <Header label="CREATE QUOTATION" canGoBack={true} />
          ) : null}
          <Spacer height={4} />
          <CollapsibleView title="BASIC DETAILS" collapsed={false}>
            <View>
              <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                  <Label text="Shifting Type" style={styles.label} />
                  <DropdownComponent
                    data={shiftingTypes}
                    onSelect={handleShiftingType}
                    //@ts-ignore
                    ref={shiftingTypeDropdownRef}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Label text="Shifting Luggage" style={styles.label} />
                  <DropdownComponent
                    data={shiftingLuggages}
                    onSelect={handleShiftingLuggage}
                    //@ts-ignore
                    ref={shiftingLuggageDropdownRef}
                  />
                </View>
              </View>
              <Spacer height={4} />
              <View style={styles.labelContainer}>
                <Label text="Quotation No." style={styles.label} />
              </View>
              <View style={[styles.mainWrapper, styles.switchMainWrapper3]}>
                <View style={[styles.textContainer, {alignItems: 'center'}]}>
                  <Switch
                    containerStyle={styles.switchStyle}
                    value={switchState}
                    onValueChange={val => setSwitchState(val)}
                    disabled={isEdit}
                    activeText={'Auto'}
                    inActiveText={'Manual'}
                    outerCircleStyle={styles.outerCircleStyle}
                    renderActiveText={true}
                    renderInActiveText={true}
                    switchWidthMultiplier={3.5}
                  />
                </View>
                <View style={[styles.textContainer, switchWrapperStyle]}>
                  <Input
                    onChangeText={handleSerialNumberInputTextChange}
                    containerStyle={styles.switchInputContainer}
                    inputStyle={styles.input}
                    selectionColor={COLOR_BLACK}
                    editable={!isEdit && !switchState}
                    value={isEdit ? quotationserialNo : ''}
                  />
                </View>
              </View>

              <Spacer height={4} />
              <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                  <Label text="Date of Quotation" style={styles.label} />
                  <DatePickerComponent
                    onDateSelect={handleQuotationDate}
                    //@ts-ignore
                    ref={dateOfQuotationCompRef}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Label text="Date of Moving" style={styles.label} />
                  <DatePickerComponent
                    onDateSelect={handleMovingDate}
                    //@ts-ignore
                    ref={dateOfMovingCompRef}
                  />
                </View>
              </View>
              <Spacer height={4} />
              <View style={styles.textContainer2}>
                <Label text="Billing By" style={styles.label} />
                <DropdownComponent
                  data={billingByOptions}
                  onSelect={handleBillingBy}
                />
              </View>
              {showBillingByIndividualView()}
              {showBillingByCompanyView()}
            </View>
          </CollapsibleView>
          <Spacer height={4} />
          <CollapsibleView title="PICKUP ADDRESS" collapsed={true}>
            <View>
              <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                  <Label text="PIN Code" style={styles.label} required={true} />
                  <Input
                    onChangeText={handlePickupPinCode}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    selectionColor={COLOR_BLACK}
                    //@ts-ignore
                    error={showErrors && errors.pickupPincode}
                    value={state?.pickupPincode}
                    type="text"
                    required={true}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Label text="State" style={styles.label} />
                  <EpackDropdown
                    data={pickupStates.map(e => e.label)}
                    placeholder={'Select State'}
                    hanldeData={handlePickupState}
                    //@ts-ignore
                    ref={pickupStateDropwdownRef}
                  />
                </View>
              </View>
              <View style={styles.textContainer2}>
                <Label text="City" style={styles.label} />
                <EpackDropdown
                  data={pickupCities.map(e => e.label)}
                  placeholder={'Select City'}
                  hanldeData={handlePickupCity}
                  //@ts-ignore
                  ref={pickupCityDropdownRef}
                />
              </View>
              <Spacer height={4} />
              <View style={styles.textContainer2}>
                <Label text="Address" style={styles.label} />
                <Input
                  onChangeText={handlePickupAddressInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  value={state?.pickupAddress}
                />
              </View>
              <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                  <Label text="Current Floor" style={styles.label} />
                  <DropdownComponent
                    data={floorOptions}
                    onSelect={handlePickupCurrentFloor}
                    defaultValue={floorOptions[3]}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Label text="Lift Status" style={styles.label} />
                  <DropdownComponent
                    data={liftStatusOptions}
                    onSelect={handlePickupLiftStatus}
                  />
                </View>
              </View>
            </View>
          </CollapsibleView>
          <Spacer height={4} />
          <CollapsibleView title="DELIVERY ADDRESS" collapsed={true}>
            <View>
              <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                  <Label text="PIN Code" style={styles.label} required={true} />
                  <Input
                    onChangeText={handleDeliveryPinCode}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    selectionColor={COLOR_BLACK}
                    value={state.deliveryPincode}
                    //@ts-ignore
                    error={showErrors && errors.dropPincode}
                    type="text"
                    required={true}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Label text="State" style={styles.label} />
                  <EpackDropdown
                    data={deliveryStates.map(e => e.label)}
                    placeholder={'Select State'}
                    hanldeData={handleDeliveryState}
                    //@ts-ignore
                    ref={dropStateDropdownRef}
                  />
                </View>
              </View>
              <View style={styles.textContainer2}>
                <Label text="City" style={styles.label} />
                <EpackDropdown
                  data={deliveryCities.map(e => e.label)}
                  placeholder={'Select City'}
                  hanldeData={handleDeliveryCity}
                  //@ts-ignore
                  ref={dropCityDropdownRef}
                />
              </View>
              <Spacer height={4} />
              <View style={styles.textContainer2}>
                <Label text="Address" style={styles.label} />
                <Input
                  onChangeText={handleDeliveryAddressInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                  <Label text="Current Floor" style={styles.label} />
                  <DropdownComponent
                    data={floorOptions}
                    onSelect={handleDeliveryCurrentFloor}
                    defaultValue={floorOptions[3]}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Label text="Lift Status" style={styles.label} />
                  <DropdownComponent
                    data={liftStatusOptions}
                    onSelect={handleDeliveryLiftStatus}
                  />
                </View>
              </View>
            </View>
          </CollapsibleView>
          <Spacer height={4} />
          <CollapsibleView title="FREIGHT DETAILS" collapsed={true}>
            <View>
              <View style={styles.labelContainer}>
                <Label text="Load Type" style={styles.label} />
              </View>
              <View style={styles.textContainer3}>
                {loadTypeOptions.map(loadType => (
                  <BouncyCheckbox
                    size={25}
                    unfillColor="#FFFFFF"
                    text={loadType}
                    fillColor={COLOR_BLUE}
                    iconStyle={{
                      borderColor: 'red',
                      borderRadius: 0,
                      width: 16,
                      height: 16,
                    }}
                    innerIconStyle={{
                      borderWidth: 1,
                      borderRadius: 0,
                      width: 16,
                      height: 16,
                    }}
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      textDecorationLine: 'none',
                      fontSize: 14,
                    }}
                    style={{marginRight: 45}}
                    textContainerStyle={{paddingLeft: 0, marginLeft: 10}}
                    onPress={(isChecked: boolean) => {
                      handleLoadTypes(loadType);
                    }}
                    isChecked={loadTypes.findIndex(e => e == loadType) != -1}
                    disableBuiltInState={true}
                  />
                ))}
              </View>
              {showLoadTypeRequiredErrorView()}
              {renderLoryTypeView()}
              <Spacer height={4} />
              <View style={styles.mainWrapper}>
                {(isBothLoadType || loadTypes.includes(loadTypeOptions[0])) && (
                  <View style={[styles.textContainer, getFreightInputsStyle()]}>
                    <Label text="Freight Part" style={styles.label} />
                    <Input
                      onChangeText={handleFreightPartChargeTextChange}
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.input}
                      selectionColor={COLOR_BLACK}
                      inputType="numeric"
                      value={state?.freightPartCharge}
                    />
                  </View>
                )}
                {(isBothLoadType || loadTypes.includes(loadTypeOptions[1])) && (
                  <View style={[styles.textContainer, getFreightInputsStyle()]}>
                    <Label text="Freight Full" style={styles.label} />
                    <Input
                      onChangeText={handleFreightFullChargeTextChange}
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.input}
                      selectionColor={COLOR_BLACK}
                      inputType="numeric"
                      value={state?.freightFullCharge}
                    />
                  </View>
                )}
              </View>
              <View style={styles.labelContainer}>
                <Label text="Packing Charges" style={styles.label} />
              </View>
              <View style={styles.checkboxContainer}>
                {chargeOptions.slice(0, 3).map((option, index) => {
                  return (
                    <BouncyCheckbox
                      key={`${index}`}
                      size={20}
                      fillColor={COLOR_BLUE}
                      unfillColor="#FFFFFF"
                      text={option}
                      iconStyle={{borderColor: 'red'}}
                      innerIconStyle={{borderWidth: 1}}
                      onPress={(isChecked: boolean) => {
                        setPackingCharges(option);
                        const {packingCharges: statePackageCharges} = state;
                        const tempObj = {
                          ...statePackageCharges,
                          status: option,
                          part_load_charge: '0',
                          full_load_charge: '0',
                        };
                        dispatch({
                          type: QUOTATION_FORM_ACTION.PACKING_CHARGES,
                          payload: tempObj as TCharge,
                        });
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                        fontSize: 14,
                      }}
                      style={{paddingRight: 8}}
                      textContainerStyle={{marginLeft: 4, marginRight: 4}}
                      isChecked={option == packingCharges}
                      disableBuiltInState={true}
                    />
                  );
                })}
              </View>
              <Spacer height={4} />
              {packingCharges === 'Additional' && (
                <View style={styles.mainWrapper}>
                  {(isBothLoadType ||
                    loadTypes.includes(loadTypeOptions[0])) && (
                    <View
                      style={[styles.textContainer, getFreightInputsStyle()]}>
                      <Label text="Part Load" style={styles.label} />
                      <Input
                        onChangeText={(text: string) => {
                          handlePackingChargeChange(text, '0');
                        }}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        inputType="numeric"
                        value={state.packingCharges?.part_load_charge}
                      />
                    </View>
                  )}
                  {(isBothLoadType ||
                    loadTypes.includes(loadTypeOptions[1])) && (
                    <View
                      style={[styles.textContainer, getFreightInputsStyle()]}>
                      <Label text="Full Load" style={styles.label} />
                      <Input
                        onChangeText={(text: string) => {
                          handlePackingChargeChange('0', text);
                        }}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        inputType="numeric"
                        value={state.packingCharges?.full_load_charge}
                      />
                    </View>
                  )}
                </View>
              )}
              <View style={styles.labelContainer}>
                <Label text="Packing Material Charges" style={styles.label} />
              </View>
              <View style={styles.checkboxContainer}>
                {chargeOptions.slice(0, 3).map((option, index) => {
                  return (
                    <BouncyCheckbox
                      key={`${index}`}
                      size={20}
                      fillColor={COLOR_BLUE}
                      unfillColor="#FFFFFF"
                      text={option}
                      iconStyle={{borderColor: 'red'}}
                      innerIconStyle={{borderWidth: 1}}
                      onPress={(isChecked: boolean) => {
                        setPackingMaterialCharges(option);
                        const {
                          packingMaterialCharges: statePackageMaterialCharges,
                        } = state;
                        const tempObj = {
                          ...statePackageMaterialCharges,
                          status: option,
                          part_load_charge: '0',
                          full_load_charge: '0',
                        };
                        dispatch({
                          type: QUOTATION_FORM_ACTION.PACKING_MATERIAL_CHARGES,
                          payload: tempObj as TCharge,
                        });
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                        fontSize: 14,
                      }}
                      style={{paddingRight: 8}}
                      textContainerStyle={{marginLeft: 4, marginRight: 4}}
                      isChecked={option == packingMaterialCharges}
                      disableBuiltInState={true}
                    />
                  );
                })}
              </View>
              <Spacer height={4} />
              {packingMaterialCharges === 'Additional' && (
                <View style={styles.mainWrapper}>
                  {(isBothLoadType ||
                    loadTypes.includes(loadTypeOptions[0])) && (
                    <View
                      style={[styles.textContainer, getFreightInputsStyle()]}>
                      <Label text="Part Load" style={styles.label} />
                      <Input
                        onChangeText={(text: string) => {
                          handlePackingMaterialChargeChange(text, '0');
                        }}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        inputType="numeric"
                        value={state?.packingMaterialCharges?.part_load_charge}
                      />
                    </View>
                  )}
                  {(isBothLoadType ||
                    loadTypes.includes(loadTypeOptions[1])) && (
                    <View
                      style={[styles.textContainer, getFreightInputsStyle()]}>
                      <Label text="Full Load" style={styles.label} />
                      <Input
                        onChangeText={(text: string) => {
                          handlePackingMaterialChargeChange('0', text);
                        }}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        inputType="numeric"
                        value={state?.packingMaterialCharges?.full_load_charge}
                      />
                    </View>
                  )}
                </View>
              )}
              <View style={styles.labelContainer}>
                <Label text="Loading Charges" style={styles.label} />
              </View>
              <View style={styles.checkboxContainer}>
                {chargeOptions.slice(0, 4).map((option, index) => {
                  return (
                    <BouncyCheckbox
                      key={`${index}`}
                      size={20}
                      fillColor={COLOR_BLUE}
                      unfillColor="#FFFFFF"
                      text={option}
                      iconStyle={{borderColor: 'red'}}
                      innerIconStyle={{borderWidth: 1}}
                      onPress={(isChecked: boolean) => {
                        setLoadingCharges(option);
                        const {loadingCharges: mLoadingCharges} = state;
                        const tempObj = {
                          ...mLoadingCharges,
                          status: option,
                        };
                        dispatch({
                          type: QUOTATION_FORM_ACTION.LOADING_CHARGES,
                          payload: tempObj as TCharge,
                        });
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                        fontSize: 14,
                      }}
                      style={{paddingRight: 8, paddingVertical: 10}}
                      textContainerStyle={{marginLeft: 4, marginRight: 4}}
                      isChecked={option == loadingCharges}
                      disableBuiltInState={true}
                    />
                  );
                })}
              </View>
              <Spacer height={4} />
              {loadingCharges !== 'Loading by Party' && (
                <View style={styles.mainWrapper}>
                  {loadingCharges === 'Additional' && (
                    <>
                      {(isBothLoadType ||
                        loadTypes.includes(loadTypeOptions[0])) && (
                        <View
                          style={[
                            styles.textContainer,
                            getFreightInputsStyle(),
                          ]}>
                          <Label text="Part Load" style={styles.label} />
                          <Input
                            onChangeText={(text: string) => {
                              handleLoadingCharges(text, '0');
                            }}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                            inputType="numeric"
                            value={state?.loadingCharges?.part_load_charge}
                          />
                        </View>
                      )}
                      {(isBothLoadType ||
                        loadTypes.includes(loadTypeOptions[1])) && (
                        <View
                          style={[
                            styles.textContainer,
                            getFreightInputsStyle(),
                          ]}>
                          <Label text="Full Load" style={styles.label} />
                          <Input
                            onChangeText={(text: string) => {
                              handleLoadingCharges('0', text);
                            }}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                            inputType="numeric"
                            value={state?.loadingCharges?.full_load_charge}
                          />
                        </View>
                      )}
                    </>
                  )}
                </View>
              )}
              <View style={styles.labelContainer}>
                <Label text="Unloading Charges" style={styles.label} />
              </View>
              <View style={styles.checkboxContainer}>
                {chargeOptions
                  .filter(e => e !== 'Loading by Party')
                  .map((option, index) => {
                    return (
                      <BouncyCheckbox
                        key={`${index}`}
                        size={20}
                        fillColor={COLOR_BLUE}
                        unfillColor="#FFFFFF"
                        text={option}
                        iconStyle={{borderColor: 'red'}}
                        innerIconStyle={{borderWidth: 1}}
                        onPress={(isChecked: boolean) => {
                          setUnloadingCharges(option);
                          const {unLoadingCharges} = state;
                          const tempObj = {
                            ...unLoadingCharges,
                            status: option,
                          };
                          dispatch({
                            type: QUOTATION_FORM_ACTION.UNLOADING_CHARGES,
                            payload: tempObj as TCharge,
                          });
                        }}
                        textStyle={{
                          fontFamily: 'JosefinSans-Regular',
                          textDecorationLine: 'none',
                          fontSize: 14,
                        }}
                        style={{paddingRight: 8, paddingVertical: 10}}
                        textContainerStyle={{marginLeft: 4, marginRight: 4}}
                        isChecked={option == unloadingCharges}
                        disableBuiltInState={true}
                      />
                    );
                  })}
              </View>
              <Spacer height={4} />
              {unloadingCharges !== 'Unloading by Party' && (
                <View style={styles.mainWrapper}>
                  {unloadingCharges === 'Additional' && (
                    <>
                      {(isBothLoadType ||
                        loadTypes.includes(loadTypeOptions[0])) && (
                        <View
                          style={[
                            styles.textContainer,
                            getFreightInputsStyle(),
                          ]}>
                          <Label text="Part Load" style={styles.label} />
                          <Input
                            onChangeText={(text: string) => {
                              handleUnLoadingCharges(text, '0');
                            }}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                            inputType="numeric"
                            value={state?.unLoadingCharges?.part_load_charge}
                          />
                        </View>
                      )}
                      {(isBothLoadType ||
                        loadTypes.includes(loadTypeOptions[1])) && (
                        <View
                          style={[
                            styles.textContainer,
                            getFreightInputsStyle(),
                          ]}>
                          <Label text="Full Load" style={styles.label} />
                          <Input
                            onChangeText={(text: string) => {
                              handleUnLoadingCharges('0', text);
                            }}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                            inputType="numeric"
                            value={state?.unLoadingCharges?.full_load_charge}
                          />
                        </View>
                      )}
                    </>
                  )}
                </View>
              )}
              <View style={styles.labelContainer}>
                <Label text="Unpacking Charges" style={styles.label} />
              </View>
              <View style={styles.checkboxContainer}>
                {chargeOptions.slice(0, 3).map((option, index) => {
                  return (
                    <BouncyCheckbox
                      key={`${index}`}
                      size={20}
                      fillColor={COLOR_BLUE}
                      unfillColor="#FFFFFF"
                      text={option}
                      iconStyle={{borderColor: 'red'}}
                      innerIconStyle={{borderWidth: 1}}
                      onPress={(isChecked: boolean) => {
                        setUnpackingCharges(option);
                        const {unPackingCharges: mUnpackingCharges} = state;
                        const tempObj = {
                          ...mUnpackingCharges,
                          status: option,
                        };
                        dispatch({
                          type: QUOTATION_FORM_ACTION.UNPACKING_CHARGES,
                          payload: tempObj as TCharge,
                        });
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                        fontSize: 14,
                      }}
                      style={{paddingRight: 8, paddingVertical: 10}}
                      textContainerStyle={{marginLeft: 4, marginRight: 4}}
                      isChecked={option == unpackingCharges}
                      disableBuiltInState={true}
                    />
                  );
                })}
              </View>
              <Spacer height={4} />
              {unpackingCharges === 'Additional' && (
                <View style={styles.mainWrapper}>
                  {(isBothLoadType ||
                    loadTypes.includes(loadTypeOptions[0])) && (
                    <View
                      style={[styles.textContainer, getFreightInputsStyle()]}>
                      <Label text="Part Load" style={styles.label} />
                      <Input
                        onChangeText={(text: string) => {
                          handleUnPackingCharges(text, '0');
                        }}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        inputType="numeric"
                        value={state?.unPackingCharges?.part_load_charge}
                      />
                    </View>
                  )}
                  {(isBothLoadType ||
                    loadTypes.includes(loadTypeOptions[1])) && (
                    <View
                      style={[styles.textContainer, getFreightInputsStyle()]}>
                      <Label text="Full Load" style={styles.label} />
                      <Input
                        onChangeText={(text: string) => {
                          handleUnPackingCharges('0', text);
                        }}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        inputType="numeric"
                        value={state?.unPackingCharges?.full_load_charge}
                      />
                    </View>
                  )}
                </View>
              )}
              <Spacer height={4} />
              <View style={styles.labelContainer}>
                <Label text="OTHER CHARGES" style={styles.label} />
              </View>
              <View style={styles.textContainer2}>
                <Label text="Particulars/Items" style={styles.label} />
                <Input
                  onChangeText={(text: string) => {
                    setJobType(text);
                  }}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  value={jobType}
                  //@ts-ignore
                  ref={particularsInputCompRef}
                />
              </View>
              <View style={styles.textContainer2}>
                <Label text="Quantity" style={styles.label} />
                <Input
                  onChangeText={(text: string) => {
                    setQuantity(text);
                  }}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                  value={quantity}
                  //@ts-ignore
                  ref={quantityInputCompRef}
                />
              </View>
              <View style={styles.mainWrapper}>
                {(isBothLoadType || loadTypes.includes(loadTypeOptions[0])) && (
                  <View style={[styles.textContainer, getFreightInputsStyle()]}>
                    <Label text="Part Load (Rate/Item)" style={styles.label} />
                    <Input
                      onChangeText={(text: string) => {
                        setPartLoadRatePerItem(text);
                      }}
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.input}
                      selectionColor={COLOR_BLACK}
                      inputType="numeric"
                      value={partLoadRatePerItem}
                      //@ts-ignore
                      ref={partRateInputCompRef}
                    />
                  </View>
                )}
                {(isBothLoadType || loadTypes.includes(loadTypeOptions[1])) && (
                  <View style={[styles.textContainer, getFreightInputsStyle()]}>
                    <Label text="Full Load (Rate/Item)" style={styles.label} />
                    <Input
                      onChangeText={(text: string) => {
                        setFullLoadRatePerItem(text);
                      }}
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.input}
                      selectionColor={COLOR_BLACK}
                      inputType="numeric"
                      value={fullLoadRatePerItem}
                      //@ts-ignore
                      ref={fullRateInputCompRef}
                    />
                  </View>
                )}
              </View>
              <View style={styles.mainWrapper}>
                {(isBothLoadType || loadTypes.includes(loadTypeOptions[0])) && (
                  <View style={[styles.textContainer, getFreightInputsStyle()]}>
                    <Label text="Part Load Amount" style={styles.label} />
                    <Input
                      onChangeText={(text: string) => {
                        setPartLoadAmount(text);
                      }}
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.input}
                      selectionColor={COLOR_BLACK}
                      inputType="numeric"
                      value={calcPartloadOtherItemsTotal()}
                      //@ts-ignore
                      ref={partAmountCompRef}
                    />
                  </View>
                )}
                {(isBothLoadType || loadTypes.includes(loadTypeOptions[1])) && (
                  <View style={[styles.textContainer, getFreightInputsStyle()]}>
                    <Label text="Full Load Amount" style={styles.label} />
                    <Input
                      onChangeText={(text: string) => {
                        setFullLoadAmount(text);
                      }}
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.input}
                      selectionColor={COLOR_BLACK}
                      inputType="numeric"
                      value={calcFullLoadOtherItemsTotal()}
                      //@ts-ignore
                      ref={fullAmountCompRef}
                    />
                  </View>
                )}
              </View>
              <Spacer height={12} />
              <View style={styles.textContainer2}>
                <Button
                  text="Add"
                  onPress={handleAddOtherItemCharges}
                  disabled={false}
                  style={styles.buttonStyle}
                  textStyle={styles.textStyle}
                />
              </View>
              <Spacer height={4} />
              {state.otherCharges ? (
                <View style={styles.otherChargesWrapper}>
                  <Text>Other Items:</Text>
                </View>
              ) : null}
              {renderOtherItemList()}
              <Spacer height={4} />
              <View style={styles.textContainer2}>
                <Label text="Advance Amount" style={styles.label} />
                <Input
                  onChangeText={handleAdvanceAmountInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                  value={state?.advanceAmount}
                />
              </View>
              <View style={styles.labelContainer}>
                <Label text="Surcharge" style={styles.label} />
              </View>
              <Spacer height={4} />
              <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                  <DropdownComponent
                    data={surchargeOptions}
                    onSelect={handleSurcharge}
                    //@ts-ignore
                    ref={surchargeDropdownRef}
                  />
                </View>
                <View style={styles.textContainer}>
                  <DropdownComponent
                    data={surchargePercentOptions}
                    onSelect={handleSurchargePercent}
                    disable={!isSurchargeApplicable}
                    //@ts-ignore
                    ref={surchargePercentDropdownRef}
                  />
                </View>
              </View>
              <Spacer height={4} />
              <View style={styles.labelContainer}>
                <Label text="Discount in Quotation" style={styles.label} />
              </View>
              <View style={styles.checkboxContainer}>
                {discountTypeOptions.map((option, index) => {
                  return (
                    <BouncyCheckbox
                      key={`${index}`}
                      size={20}
                      fillColor={COLOR_BLUE}
                      unfillColor="#FFFFFF"
                      text={option}
                      iconStyle={{borderColor: 'red'}}
                      innerIconStyle={{borderWidth: 1}}
                      onPress={(isChecked: boolean) => {
                        handleDiscountType(option);
                        const {discountInQuotation} = state;
                        const tempObj = {
                          ...discountInQuotation,
                          discount_type: option,
                        };
                        dispatch({
                          type: QUOTATION_FORM_ACTION.DISCOUNT_IN_QUOTATION,
                          payload: tempObj as TDiscountInQuotation,
                        });
                      }}
                      textStyle={{
                        fontFamily: 'JosefinSans-Regular',
                        textDecorationLine: 'none',
                        fontSize: 14,
                      }}
                      style={{paddingRight: 8, paddingVertical: 10}}
                      textContainerStyle={{marginLeft: 4, marginRight: 4}}
                      isChecked={option == discountType}
                      disableBuiltInState={true}
                    />
                  );
                })}
              </View>
              {renderDiscountTypeView()}
              <Spacer height={4} />
              <View style={styles.labelContainer}>
                <Label text="GST IN QUOTATION" style={styles.label} />
              </View>
              <View style={styles.textContainer3}>
                <View style={styles.checkboxContainer}>
                  {GSTOptions.map((option, index) => {
                    return (
                      <BouncyCheckbox
                        key={`${index}`}
                        size={20}
                        fillColor={COLOR_BLUE}
                        unfillColor="#FFFFFF"
                        text={option}
                        iconStyle={{borderColor: 'red'}}
                        innerIconStyle={{borderWidth: 1}}
                        onPress={(isChecked: boolean) => {
                          setGstInQuotation(option);
                          const {gstInQuotation} = state;
                          const tempObj = {
                            ...gstInQuotation,
                            status: option,
                          };
                          dispatch({
                            type: QUOTATION_FORM_ACTION.GST_IN_QUOTATION,
                            payload: tempObj as TGstInQuotation,
                          });
                        }}
                        textStyle={{
                          fontFamily: 'JosefinSans-Regular',
                          textDecorationLine: 'none',
                          fontSize: 14,
                        }}
                        style={{paddingRight: 8, paddingVertical: 10}}
                        textContainerStyle={{marginLeft: 4, marginRight: 4}}
                        isChecked={option == gstInQuotation}
                        disableBuiltInState={true}
                      />
                    );
                  })}
                </View>
              </View>
              {gstInQuotation === 'With GST' && (
                <>
                  <View style={styles.mainWrapper}>
                    <View style={styles.textContainer}>
                      <Label text="GST %" style={styles.label} />
                      <DropdownComponent
                        data={gstPercentOptions}
                        onSelect={handleQuotationGstPercent}
                        //@ts-ignore
                        ref={gstPercentDropdownRef}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Label text="GST Type" style={styles.label} />
                      <DropdownComponent
                        data={gstTypeOptions}
                        onSelect={handleQuotationGstType}
                        //@ts-ignore
                        ref={gstTypeDropdownRef}
                      />
                    </View>
                  </View>
                </>
              )}
            </View>
          </CollapsibleView>
          <Spacer height={4} />
          <CollapsibleView title="INSURANCE DETAILS" collapsed={true}>
            <View>
              <Spacer height={8} />
              <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                  size={20}
                  fillColor={COLOR_BLUE}
                  unfillColor="#FFFFFF"
                  text="Required"
                  iconStyle={{borderColor: 'red'}}
                  innerIconStyle={{borderWidth: 1}}
                  onPress={(isChecked: boolean) => {
                    setIsInsuranceRequired(true);
                    const {insuranceDetails} = state;
                    const tempObj = {
                      ...insuranceDetails,
                      status: 'required',
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.INSURANCE_DETAILS,
                      payload: tempObj as TInsuranceDetails,
                    });
                  }}
                  textStyle={{
                    fontFamily: 'JosefinSans-Regular',
                    textDecorationLine: 'none',
                    fontSize: 14,
                  }}
                  style={{paddingRight: 8}}
                  textContainerStyle={{marginLeft: 4, marginRight: 4}}
                  isChecked={isInsuranceRequired}
                  disableBuiltInState={true}
                />
                <Spacer width={4} />
                <BouncyCheckbox
                  size={20}
                  fillColor={COLOR_BLUE}
                  unfillColor="#FFFFFF"
                  text="Not Required"
                  iconStyle={{borderColor: 'red'}}
                  innerIconStyle={{borderWidth: 1}}
                  onPress={(isChecked: boolean) => {
                    setIsInsuranceRequired(false);
                    const {insuranceDetails} = state;
                    const tempObj = {
                      ...insuranceDetails,
                      status: 'not required',
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.INSURANCE_DETAILS,
                      payload: tempObj as TInsuranceDetails,
                    });
                  }}
                  textStyle={{
                    fontFamily: 'JosefinSans-Regular',
                    textDecorationLine: 'none',
                    fontSize: 14,
                  }}
                  style={{paddingRight: 8}}
                  textContainerStyle={{marginLeft: 4, marginRight: 4}}
                  isChecked={!isInsuranceRequired}
                  disableBuiltInState={true}
                />
              </View>
              <Spacer height={4} />
              {isInsuranceRequired ? (
                <>
                  <View style={styles.textContainer2}>
                    <Label text="Shifting Luggage" style={styles.label} />
                    <EpackDropdown
                      data={shiftingLuggages.map(e => e.label)}
                      placeholder={'Select Shifting Luggage'}
                      hanldeData={(item: string) => {
                        const {insuranceDetails} = state;
                        const tempObj = {
                          ...insuranceDetails,
                          shifting_luggage: item,
                        };
                        dispatch({
                          type: QUOTATION_FORM_ACTION.STORAGE_CHARGES,
                          payload: tempObj as TInsuranceDetails,
                        });
                      }}
                    />
                  </View>
                  <Spacer height={4} />
                  <View style={styles.textContainer2}>
                    <Label text="Insurance Type" style={styles.label} />
                    <DropdownComponent
                      data={insuranceTypeOptions}
                      onSelect={handleInsuranceType}
                      //@ts-ignore
                      ref={insuranceTypeDropdownRef}
                    />
                  </View>
                  <Spacer height={4} />
                  <View style={styles.mainWrapper}>
                    <View style={styles.textContainer}>
                      <Label text="Insurance Charge @%" style={styles.label} />
                      <DropdownComponent
                        data={insurancePercentOptions}
                        onSelect={handleInsuranceCharge}
                        //@ts-ignore
                        ref={insuranceChargePercentDropdownRef}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Label text="GST %" style={styles.label} />
                      <DropdownComponent
                        data={gstPercentOptions}
                        onSelect={handleInsuranceGSTPercent}
                        //@ts-ignore
                        ref={insuranceGSTPercentDropdownRef}
                      />
                    </View>
                  </View>
                  <Spacer height={4} />
                  <View style={styles.labelContainer}>
                    <Label text="Value of Goods" style={styles.label} />
                  </View>
                  <View style={styles.mainWrapper}>
                    <View style={styles.textContainer2}>
                      <Input
                        onChangeText={handleInsuranceGoodsValueInputTextChange}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        inputType="numeric"
                        value={state?.insuranceDetails?.insurance_goods_value}
                      />
                    </View>
                  </View>
                </>
              ) : null}
            </View>
          </CollapsibleView>
          <Spacer height={4} />
          <CollapsibleView title="STORAGE CHARGES" collapsed={true}>
            <View>
              <Spacer height={8} />
              <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                  size={20}
                  fillColor={COLOR_BLUE}
                  unfillColor="#FFFFFF"
                  text="Required"
                  iconStyle={{borderColor: 'red'}}
                  innerIconStyle={{borderWidth: 1}}
                  onPress={(isChecked: boolean) => {
                    setIsStorageRequired(true);
                    const {storageCharges} = state;
                    const tempObj = {
                      ...storageCharges,
                      status: 'required',
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.STORAGE_CHARGES,
                      payload: tempObj as TStorageCharge,
                    });
                  }}
                  textStyle={{
                    fontFamily: 'JosefinSans-Regular',
                    textDecorationLine: 'none',
                    fontSize: 14,
                  }}
                  style={{paddingRight: 8}}
                  textContainerStyle={{marginLeft: 4, marginRight: 4}}
                  isChecked={isStorageRequired}
                  disableBuiltInState={true}
                />
                <Spacer width={4} />
                <BouncyCheckbox
                  size={20}
                  fillColor={COLOR_BLUE}
                  unfillColor="#FFFFFF"
                  text="Not Required"
                  iconStyle={{borderColor: 'red'}}
                  innerIconStyle={{borderWidth: 1}}
                  onPress={(isChecked: boolean) => {
                    setIsStorageRequired(false);
                    const {storageCharges} = state;
                    const tempObj = {
                      ...storageCharges,
                      status: 'not required',
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.STORAGE_CHARGES,
                      payload: tempObj as TStorageCharge,
                    });
                  }}
                  textStyle={{
                    fontFamily: 'JosefinSans-Regular',
                    textDecorationLine: 'none',
                    fontSize: 14,
                  }}
                  style={{paddingRight: 8}}
                  textContainerStyle={{marginLeft: 4, marginRight: 4}}
                  isChecked={!isStorageRequired}
                  disableBuiltInState={true}
                />
              </View>
              {isStorageRequired ? (
                <>
                  <View style={styles.textContainer2}>
                    <Label text="Storage Duration" style={styles.label} />
                    <DropdownComponent
                      data={storageDurationOptions}
                      onSelect={(item: TDropdownItem) => {
                        const {storageCharges} = state;
                        const tempObj = {
                          ...storageCharges,
                          storage_duration_type: item.label,
                        };
                        dispatch({
                          type: QUOTATION_FORM_ACTION.STORAGE_CHARGES,
                          payload: tempObj as TStorageCharge,
                        });
                      }}
                      //@ts-ignore
                      ref={storageDurationDropdownRef}
                    />
                  </View>
                  {state.storageCharges?.storage_duration_type ==
                    'Charges During Period' && (
                    <View style={styles.mainWrapper}>
                      <View style={styles.textContainer}>
                        <Label text="From Date" style={styles.label} />
                        <DatePickerComponent
                          onDateSelect={handleStorageFromDate}
                          //@ts-ignore
                          ref={storageFromdateDropdownRef}
                        />
                      </View>
                      <View style={styles.textContainer}>
                        <Label text="To Date" style={styles.label} />
                        <DatePickerComponent
                          onDateSelect={handleStorageToDate}
                          //@ts-ignore
                          ref={storageTodateDropdownRef}
                        />
                      </View>
                    </View>
                  )}
                  <Spacer height={4} />
                  <View style={styles.labelContainer}>
                    <Label text="Amount" style={styles.label} />
                  </View>
                  <View style={styles.textContainer2}>
                    <Input
                      onChangeText={handleStorageAmountInputTextChange}
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.input}
                      selectionColor={COLOR_BLACK}
                      inputType="numeric"
                      value={state?.storageCharges?.storage_amount}
                    />
                  </View>
                </>
              ) : null}
            </View>
          </CollapsibleView>
          <Spacer height={4} />
          <Spacer height={4} />
          <CollapsibleView title="OTHER DETAILS" collapsed={true}>
            <View>
              <View style={styles.labelContainer}>
                <Label
                  text="IS THERE EASY ACCESS FOR LOAD & UNLOADING AT ORIGIN & DESINATION (क्या लोड और अनलोडिंग आसान है?)"
                  style={styles.label}
                />
              </View>
              <Spacer height={4} />
              <View style={styles.checkboxContainer}>
                {yesNoOptions.map(option => (
                  <BouncyCheckbox
                    key={`${option}`}
                    size={20}
                    fillColor={COLOR_BLUE}
                    unfillColor="#FFFFFF"
                    text={option}
                    iconStyle={{borderColor: 'red'}}
                    innerIconStyle={{borderWidth: 1}}
                    onPress={(isChecked: boolean) => {
                      const {otherDetails} = state;
                      const tempObj = {
                        ...otherDetails,
                        easy_access_for_loading_unloading: option,
                      };
                      dispatch({
                        type: QUOTATION_FORM_ACTION.OTHER_DETAILS,
                        payload: tempObj as TOtherDetails,
                      });
                    }}
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      textDecorationLine: 'none',
                      fontSize: 14,
                    }}
                    style={{paddingRight: 8, paddingVertical: 10}}
                    textContainerStyle={{marginLeft: 4, marginRight: 4}}
                    isChecked={state.otherDetails?.easy_access_for_loading_unloading == option}
                    disableBuiltInState={true}
                  />
                ))}
              </View>
              <Spacer height={4} />
              <View style={styles.labelContainer}>
                <Label
                  text="SHOULD ANY ITEMS BE GOT DOWN THROUGH BALCONY ETC. (क्या किसी सामान को बालकनी से नीचे उतारना हैं?) eg.Almirah, Bed etc."
                  style={styles.label}
                />
              </View>
              <Spacer height={4} />
              <View style={styles.textContainer2}>
                <Input
                  onChangeText={(text: string) => {
                    const {otherDetails} = state;
                    const tempObj = {
                      ...otherDetails,
                      items_got_down_from_balcony: text,
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.OTHER_DETAILS,
                      payload: tempObj as TOtherDetails,
                    });
                  }}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  value={state.otherDetails?.items_got_down_from_balcony}
                />
              </View>
              <Spacer height={4} />
              <View style={styles.labelContainer}>
                <Label
                  text="ARE THERE ANY RESTRICTIONS FOR LOADING/UNLOADING AT ORIGIN/DESINATION (क्या लोडिंग/अनलोडिंग वाले स्थान पर कोई रोकटोक हैं?)"
                  style={styles.label}
                />
              </View>
              <View style={styles.checkboxContainer}>
                {/* <BouncyCheckboxGroup
                  data={yesNoOptions}
                  onChange={(selectedItem: ICheckboxButton) => {
                    const {otherDetails} = state;
                    const tempObj = {
                      ...otherDetails,
                      any_restrcition_for_loading_unloading: selectedItem.text,
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.OTHER_DETAILS,
                      payload: tempObj as TOtherDetails,
                    });
                  }}
                /> */}
                {yesNoOptions.map(option => (
                  <BouncyCheckbox
                    key={`${option}`}
                    size={20}
                    fillColor={COLOR_BLUE}
                    unfillColor="#FFFFFF"
                    text={option}
                    iconStyle={{borderColor: 'red'}}
                    innerIconStyle={{borderWidth: 1}}
                    onPress={(isChecked: boolean) => {
                      const {otherDetails} = state;
                      const tempObj = {
                        ...otherDetails,
                        any_restrcition_for_loading_unloading: option,
                      };
                      dispatch({
                        type: QUOTATION_FORM_ACTION.OTHER_DETAILS,
                        payload: tempObj as TOtherDetails,
                      });
                    }}
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      textDecorationLine: 'none',
                      fontSize: 14,
                    }}
                    style={{paddingRight: 8, paddingVertical: 10}}
                    textContainerStyle={{marginLeft: 4, marginRight: 4}}
                    isChecked={state.otherDetails?.any_restrcition_for_loading_unloading == option}
                    disableBuiltInState={true}
                  />
                ))}
              </View>
              <Spacer height={4} />
              <View style={styles.labelContainer}>
                <Label
                  text="DO YOU HAVE ANY SPECIAL NEEDS OR CONCERNS (अन्य जरूरी आवश्यकताएं?)"
                  style={styles.label}
                />
              </View>
              <Spacer height={4} />
              <View style={styles.textContainer2}>
                <Input
                  onChangeText={(text: string) => {
                    const {otherDetails} = state;
                    const tempObj = {
                      ...otherDetails,
                      any_needs_or_concern: text,
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.OTHER_DETAILS,
                      payload: tempObj as TOtherDetails,
                    });
                  }}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  value={state.otherDetails?.any_needs_or_concern}
                />
              </View>
            </View>
          </CollapsibleView>
          <Spacer height={12} />
          <Button
            text="PREVIEW"
            onPress={handleSubmit}
            disabled={false}
            style={styles.previewButtonStyle}
            textStyle={styles.textStyle}
          />
          <Spacer height={12} />
        </View>
      </AvoidSoftInputViewHOC>
      <Spinner
        show={fetching || addQuotationRequesting || getQuotationRequesting}
      />
    </>
  );
};

export default AddQuotationView;
