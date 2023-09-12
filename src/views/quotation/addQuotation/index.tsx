import React, {
  useReducer,
  useState,
  useCallback,
  useEffect,
  Reducer,
} from 'react';
import { Text, View } from 'react-native';
import { Switch } from 'react-native-switch';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../common/CollapsibleView';
import DatePickerComponent from '../../../common/DatePickerComponent';
import DropdownComponent from '../../../common/DropdownComponent';
import Header from '../../../common/Header';
import Input from '../../../common/Input';
import Label from '../../../common/Label';
import Spacer from '../../../common/Spacer';
import { COLOR_BLACK, COLOR_BLUE } from '../../../utils/colors';
import styles from './style';
import { TDropdownItem } from '../../../type/TDropdownItem';
import shiftingTypes from '../../../data/shiftingType.json';
import shiftingLuggages from '../../../data/shiftingLuggage.json';
import templates from '../../../data/template.json';
import {
  initialState,
  quotationReducer,
  QUOTATION_FORM_ACTION,
  TCharge,
  TOtherDetails,
  TInsuranceDetails,
  TStorageCharge,
  TOtherChargeItem,
  TOtherCharges,
  TSurcharge,
  TDiscountInQuotation,
  TGstInQuotation,
  TBillingBy,
} from './quotationReducer';
import { formatDate, getCities, getStates } from '../../../utils/formatter';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import Button from '../../../common/Button';
import surchargeOptions from '../../../data/surchargeOptions.json';
import gstPercentOptions from '../../../data/gstPercentOptions.json';
import gstTypeOptions from '../../../data/gstTypeOptions.json';
import insurancePercentOptions from '../../../data/insurancePercentOptions.json';
import otherChargeOptions from '../../../data/otherChargeOptions.json';
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
import { getStatusValue } from '../utils/utils';

const loadTypes: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Part Load',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', borderRadius: 0, width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, borderRadius: 0, width: 16, height: 16 },
    textStyle: { fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none' },
    style: { paddingRight: 16 },
  },
  {
    id: '2',
    text: 'Full Load',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', borderRadius: 0, width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, borderRadius: 0, width: 16, height: 16 },
    textStyle: { fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none' },
  },
];

const freightChargeOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Included',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
    style: { paddingRight: 10 },
  },
  {
    id: '2',
    text: 'Additional',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
    style: { paddingRight: 10 },
  },
  {
    id: '3',
    text: 'Not Required',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
  },
];

const loadingChargeOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Included',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
    style: { paddingRight: 10 },
  },
  {
    id: '2',
    text: 'Additional',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
    style: { paddingRight: 10 },
  },
  {
    id: '3',
    text: 'Not Required',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
  },
  {
    id: '4',
    text: 'Loading by Party',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
    style: { marginTop: 16, marginBottom: 10 },
  },
];

const unloadingChargeOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Included',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
    style: { paddingRight: 10 },
  },
  {
    id: '2',
    text: 'Additional',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
    style: { paddingRight: 10 },
  },
  {
    id: '3',
    text: 'Not Required',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
  },
  {
    id: '4',
    text: 'Unloading by Party',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
    style: { marginTop: 16, marginBottom: 10 },
  },
];

const GSTOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'With GST',
    fillColor: COLOR_BLUE,
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
    style: { paddingRight: 16 },
  },
  {
    id: '2',
    text: 'Without GST',
    fillColor: COLOR_BLUE,
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
    style: { paddingRight: 16 },
  },
  {
    id: '3',
    text: 'Exempted',
    fillColor: COLOR_BLUE,
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
    style: { paddingRight: 16 },
  },
  {
    id: '4',
    text: 'Extra',
    fillColor: COLOR_BLUE,
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
    style: { marginTop: 16, marginBottom: 10 },
  },
];

const requiredptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Required',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    style: { paddingRight: 8 },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
  },
  {
    id: '2',
    text: 'Not Required',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
  },
];

const insuranceWithOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'With Goods Value',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    style: { paddingRight: 8 },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
  },
  {
    id: '2',
    text: 'Without Goods Value',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
  },
];

const yesNoOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Yes',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    style: { paddingRight: 20 },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
  },
  {
    id: '2',
    text: 'No',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
  },
];

const discountTypeOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Discount @%',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    style: { paddingRight: 20 },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
  },
  {
    id: '2',
    text: 'Flat Discount',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
  },
];

const loadingUnloadingByOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'By Company',
    fillColor: COLOR_BLUE,
    isChecked: true,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
    style: { paddingRight: 10 },
  },
  {
    id: '2',
    text: 'By Party',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', width: 16, height: 16 },
    innerIconStyle: { borderWidth: 1, width: 16, height: 16 },
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: { marginLeft: 4, marginRight: 4 },
    style: { paddingRight: 10 },
  },
];

interface IAddQuotationProps {
  showHeader?: boolean;
}

const AddQuotationView: React.FC<IAddQuotationProps> = ({
  showHeader = true,
}) => {
  const [switchState, setSwitchState] = useState<boolean>(false);
  const [state, dispatch] = useReducer(quotationReducer, initialState);
  const [isPartLoad, setIsPartLoad] = useState<boolean>(true);
  const [isFullLoad, setIsFullLoad] = useState<boolean>(false);
  const [isSurchargeApplicable, setIsSurchargeApplicable] =
    useState<boolean>(false);
  const [isInsuranceRequired, setIsInsuranceRequired] =
    useState<boolean>(false);
  const [isWithGoodsValue, setIsWithGoodsValue] = useState<boolean>(false);
  const [discountType, setDiscountType] = useState<string>('');
  const [packingCharges, setPackingCharges] = useState<string>('');
  const [packingMaterialCharges, setPackingMaterialCharges] =
    useState<string>('');
  const [unpackingCharges, setUnpackingCharges] = useState<string>('');
  const [loadingCharges, setLoadingCharges] = useState<string>('');
  const [unloadingCharges, setUnloadingCharges] = useState<string>('');
  const [loadingBy, setLoadingBy] = useState<string>('');
  const [unLoadingBy, setUnLoadingBy] = useState<string>('');
  const [gstInQuotation, setGstInQuotation] = useState<string>('');
  const [pincodeRequestKey, setPincodeRequestKey] =
    useState<PINCODE_REQUEST_KEY>(
      PINCODE_REQUEST_KEY.ADD_QUOTATION_PICKUP_ADDRESS,
    );
  const [pickupStates, setPickupStates] = useState<TDropdownItem[]>([]);
  const [pickupCities, setPickupCities] = useState<TDropdownItem[]>([]);
  const [deliveryStates, setDeliveryStates] = useState<TDropdownItem[]>([]);
  const [deliveryCities, setDeliveryCities] = useState<TDropdownItem[]>([]);
  const [tempOtherChargeItemName, setTempOtherChargeItemName] =
    useState<string>('');
  const [tempOtherChargeItemValue, setTempOtherChargeItemValue] =
    useState<string>('');

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
  const { result, fetching, setPincode } = usePincodeHook(
    setPincodeError,
    resetPincodeError,
  );
  console.log('quotation-form-state----', JSON.stringify(state, null, ' '));

  const switchWrapperStyle = switchState
    ? styles.switchMainWrapper
    : styles.switchMainWrapper2;

  const getFreightInputsStyle = () => {
    if (isPartLoad && isFullLoad) {
      return styles.textContainer;
    } else if (isPartLoad && !isFullLoad) {
      return styles.textContainer2;
    } else if (!isPartLoad && isFullLoad) {
      return styles.textContainer2;
    }
    return styles.textContainer;
  };

  const isPartLoadTypeOnly = isPartLoad && !isFullLoad;
  const isFullLoadTypeOnly = !isPartLoad && isFullLoad;
  const isBothLoadType = isPartLoad && isFullLoad;

  const handleQuotationDate = (date: Date) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.DATE_OF_QUOTATION,
      payload: formatDate(date),
    });
  };

  const handleMovingDate = (date: Date) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.DATE_OF_MOVING,
      payload: formatDate(date),
    });
  };

  const handleBillingBy = (item: TDropdownItem) => {
    const { billingBy } = state;
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

  const handlePickupState = (item: TDropdownItem) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.PICKUP_STATE,
      payload: item.label,
    });
  };

  const handlePickupCity = (item: TDropdownItem) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.PICKUP_CITY,
      payload: item.label,
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

  const handleDeliveryState = (item: TDropdownItem) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.DELIVERY_STATE,
      payload: item.label,
    });
  };

  const handleDeliveryCity = (item: TDropdownItem) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.DELIVERY_CITY,
      payload: item.label,
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

  const handlePackingChargeChange = (text: string, type: string) => {
    const { packingCharges: statePackageCharges } = state;
    if (type === 'part') {
      const tempObj = {
        ...statePackageCharges,
        status: getStatusValue(packingCharges),
        part_load_charge: text,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.PACKING_CHARGES,
        payload: tempObj as TCharge,
      });
    } else if (type === 'full') {
      const tempObj = {
        ...statePackageCharges,
        status: getStatusValue(packingCharges),
        full_load_charge: text,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.PACKING_CHARGES,
        payload: tempObj as TCharge,
      });
    }
  };

  const handlePackingMaterialChargeChange = (text: string, type: string) => {
    const { packingCharges: statePackageCharges } = state;
    if (type === 'part') {
      const tempObj = {
        ...statePackageCharges,
        status: getStatusValue(packingCharges),
        part_load_charge: text,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.PACKING_MATERIAL_CHARGES,
        payload: tempObj as TCharge,
      });
    } else if (type === 'full') {
      const tempObj = {
        ...statePackageCharges,
        status: getStatusValue(packingCharges),
        full_load_charge: text,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.PACKING_MATERIAL_CHARGES,
        payload: tempObj as TCharge,
      });
    }
  };

  //handleLoadingCharges
  const handleLoadingCharges = (text: string, type: string) => {
    const { loadingCharges } = state;
    if (type === 'part') {
      const tempObj = {
        ...loadingCharges,
        part_load_charge: text,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.LOADING_CHARGES,
        payload: tempObj as TCharge,
      });
    } else if (type === 'full') {
      const tempObj = {
        ...loadingCharges,
        full_load_charge: text,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.LOADING_CHARGES,
        payload: tempObj as TCharge,
      });
    }
  };

  const handleUnLoadingCharges = (text: string, type: string) => {
    const { unLoadingCharges } = state;
    if (type === 'part') {
      const tempObj = {
        ...unLoadingCharges,
        part_load_charge: text,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.UNLOADING_CHARGES,
        payload: tempObj as TCharge,
      });
    } else if (type === 'full') {
      const tempObj = {
        ...unLoadingCharges,
        full_load_charge: text,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.UNLOADING_CHARGES,
        payload: tempObj as TCharge,
      });
    }
  };

  const handleUnPackingCharges = (text: string, type: string) => {
    const { unLoadingCharges } = state;
    if (type === 'part') {
      const tempObj = {
        ...unLoadingCharges,
        part_load_charge: text,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.UNPACKING_CHARGES,
        payload: tempObj as TCharge,
      });
    } else if (type === 'full') {
      const tempObj = {
        ...unLoadingCharges,
        full_load_charge: text,
      };
      dispatch({
        type: QUOTATION_FORM_ACTION.UNPACKING_CHARGES,
        payload: tempObj as TCharge,
      });
    }
  };

  const handleAdvanceAmountInputTextChange = (text: string) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.ADVANCE_AMOUNT,
      payload: text,
    });
  };

  const handleSurcharge = useCallback(
    (item: TDropdownItem) => {
      const { surcharge } = state;
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
      } else {
        setIsSurchargeApplicable(true);
      }
    },
    [isSurchargeApplicable],
  );

  const handleSurchargePercent = (item: TDropdownItem) => {
    const { surcharge } = state;
    const tempObj = {
      ...surcharge,
      surcharge_percent: item.label,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.SURCHARGE,
      payload: tempObj as TSurcharge,
    });
  };

  const handleInsuranceRequired = useCallback(
    (item: ICheckboxButton) => {
      if (item.id == '1') {
        setIsInsuranceRequired(true);
      } else {
        setIsInsuranceRequired(false);
        setIsWithGoodsValue(false);
      }
    },
    [isInsuranceRequired],
  );

  const handleInsuranceType = (item: TDropdownItem) => {
    const { insuranceDetails } = state;
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
    const { insuranceDetails } = state;
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
    const { insuranceDetails } = state;
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
    const { insuranceDetails } = state;
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
    const { storageCharges } = state;
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
    const { storageCharges } = state;
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
    const { storageCharges } = state;
    const tempObj = {
      ...storageCharges,
      storage_amount: text,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.STORAGE_CHARGES,
      payload: tempObj as TStorageCharge,
    });
  };

  const handleOtherChargesItemNameTextChange = (text: string) => {
    setTempOtherChargeItemName(text);
  };

  const handleOtherChargesItemAmountTextChange = (text: string) => {
    setTempOtherChargeItemValue(text);
  };

  const handleAddOtherItemCharges = () => {
    const { otherCharges } = state;
    const tempArr: TOtherChargeItem[] = otherCharges?.other_items || [];
    const newItem: TOtherChargeItem = {
      name: tempOtherChargeItemName,
      value: tempOtherChargeItemValue,
    };
    tempArr.push(newItem);
    const tempObj = {
      ...otherCharges,
      other_items: tempArr,
    };
    dispatch({
      type: QUOTATION_FORM_ACTION.OTHER_CHARGES,
      payload: tempObj as TOtherCharges,
    });
    setTempOtherChargeItemName('');
    setTempOtherChargeItemValue('');
  };

  const renderOtherItemList = () => {
    const { otherCharges } = state;
    const { other_items } = otherCharges || {};
    if (other_items && other_items?.length > 0) {
      return other_items.map((otherItem, index) => {
        return (
          <View style={styles.otherChargeItemWrapper}>
            <Text>{otherItem.name}</Text>
            <Text>{otherItem.value}</Text>
          </View>
        );
      });
    }
    return null;
  };

  const handleDiscountType = useCallback(
    (item: ICheckboxButton) => {
      setDiscountType(item.id as string);
    },
    [discountType],
  );

  const renderLoryTypeView = () => {
    if (isFullLoad) {
      return (
        <>
          <Spacer height={4} />
          <View style={styles.textContainer2}>
            <Label text="Lory Type" style={styles.label} />
            <DropdownComponent
              data={loaryTypeOptions}
              onSelect={handleLorryType}
            />
          </View>
        </>
      );
    }
    return null
  };

  const handleQuotationDiscountPercent = (item: TDropdownItem) => {
    const { discountInQuotation } = state;
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
    const { discountInQuotation } = state;
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
    if (discountType === '1') {
      return (
        <>
          <Spacer height={12} />
          <View style={styles.textContainer2}>
            <DropdownComponent
              data={discountPercentOptions}
              onSelect={handleQuotationDiscountPercent}
            />
          </View>
        </>
      );
    } else if (discountType === '2') {
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
            />
          </View>
        </>
      );
    }
    return null;
  };

  const handleQuotationGstPercent = (item: TDropdownItem) => {
    const { gstInQuotation } = state;
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
    const { gstInQuotation } = state;
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
    if (state.billingBy?.billing_by === 'Billing by Company') return null;
    return (
      <>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Party Name" style={styles.label} />
          <Input
            onChangeText={handlePartyNameInputTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Mobile Number *" style={styles.label} />
          <Input
            onChangeText={handleMobileNumberInputTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
      </>
    );
  };

  const showBillingByCompanyView = () => {
    if (state.billingBy?.billing_by === 'Billing By Individual') return null;
    return (
      <>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Company Name" style={styles.label} />
          <Input
            onChangeText={(text: string) => {
              const { billingBy } = state;
              const tempObj = {
                ...billingBy,
                billing_info: { ...billingBy?.billing_info, company_name: text },
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
          <Label text="Approval Authority" style={styles.label} />
          <DropdownComponent
            data={approvalAuthorityOptions}
            onSelect={(item: TDropdownItem) => {
              const { billingBy } = state;
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
              const { billingBy } = state;
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
              const { billingBy } = state;
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
          />
        </View>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Company GST" style={styles.label} />
          <Input
            onChangeText={(text: string) => {
              const { billingBy } = state;
              const tempObj = {
                ...billingBy,
                billing_info: { ...billingBy?.billing_info, company_gst: text },
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
          <Label text="Employee Name" style={styles.label} />
          <Input
            onChangeText={(text: string) => {
              const { billingBy } = state;
              const tempObj = {
                ...billingBy,
                billing_info: { ...billingBy?.billing_info, employee_name: text },
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
          <Label text="Employee Designation" style={styles.label} />
          <Input
            onChangeText={(text: string) => {
              const { billingBy } = state;
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
              const { billingBy } = state;
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
          />
        </View>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Company Address" style={styles.label} />
          <Input
            onChangeText={(text: string) => {
              const { billingBy } = state;
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
        setDeliveryCities(getStates(result));
      }
    }
  }, [result]);

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
                  />
                </View>
                <View style={styles.textContainer}>
                  <Label text="Shifting Luggage" style={styles.label} />
                  <DropdownComponent
                    data={shiftingLuggages}
                    onSelect={handleShiftingLuggage}
                  />
                </View>
              </View>
              <Spacer height={4} />
              <View style={styles.labelContainer}>
                <Label text="Quotation No." style={styles.label} />
              </View>
              <View style={[styles.mainWrapper, styles.switchMainWrapper3]}>
                <View style={[styles.textContainer, { alignItems: 'center' }]}>
                  <Switch
                    containerStyle={styles.switchStyle}
                    value={switchState}
                    onValueChange={val => setSwitchState(val)}
                    disabled={false}
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
                    editable={!switchState}
                  />
                </View>
              </View>

              <Spacer height={4} />
              <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                  <Label text="Date of Quotation" style={styles.label} />
                  <DatePickerComponent onDateSelect={handleQuotationDate} />
                </View>
                <View style={styles.textContainer}>
                  <Label text="Date of Moving" style={styles.label} />
                  <DatePickerComponent onDateSelect={handleMovingDate} />
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
              <View style={styles.textContainer2}>
                <Label text="PIN Code" style={styles.label} />
                <Input
                  onChangeText={handlePickupPinCode}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  error={state.errors.pickupAddress}
                />
              </View>
              <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                  <Label text="State" style={styles.label} />
                  <DropdownComponent
                    data={pickupStates}
                    onSelect={handlePickupState}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Label text="City" style={styles.label} />
                  <DropdownComponent
                    data={pickupCities}
                    onSelect={handlePickupCity}
                  />
                </View>
              </View>
              <Spacer height={4} />
              <View style={styles.textContainer2}>
                <Label text="Address" style={styles.label} />
                <Input
                  onChangeText={handlePickupAddressInputTextChange}
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
                    onSelect={handlePickupCurrentFloor}
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
              <View style={styles.textContainer2}>
                <Label text="PIN Code" style={styles.label} />
                <Input
                  onChangeText={handleDeliveryPinCode}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                  <Label text="State" style={styles.label} />
                  <DropdownComponent
                    data={deliveryStates}
                    onSelect={handleDeliveryState}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Label text="City" style={styles.label} />
                  <DropdownComponent
                    data={deliveryCities}
                    onSelect={handleDeliveryCity}
                  />
                </View>
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
                <BouncyCheckbox
                  size={25}
                  unfillColor="#FFFFFF"
                  text="Part Load"
                  fillColor={COLOR_BLUE}
                  isChecked={isPartLoad}
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
                  style={{ marginRight: 45 }}
                  textContainerStyle={{ paddingLeft: 0, marginLeft: 10 }}
                  onPress={(isChecked: boolean) => {
                    setIsPartLoad(isChecked);
                    dispatch({
                      type: QUOTATION_FORM_ACTION.PART_LOAD,
                      payload: isChecked,
                    });
                  }}
                />
                <BouncyCheckbox
                  size={25}
                  unfillColor="#FFFFFF"
                  text="Full Load"
                  fillColor={COLOR_BLUE}
                  isChecked={isFullLoad}
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
                  style={{ marginRight: 15 }}
                  textContainerStyle={{ paddingLeft: 0, marginLeft: 10 }}
                  onPress={(isChecked: boolean) => {
                    setIsFullLoad(isChecked);
                    dispatch({
                      type: QUOTATION_FORM_ACTION.FULL_LOAD,
                      payload: isChecked,
                    });
                  }}
                />
              </View>
              {renderLoryTypeView()}
              <Spacer height={4} />
              <View style={styles.mainWrapper}>
                {(isBothLoadType || isPartLoad) && (
                  <View style={[styles.textContainer, getFreightInputsStyle()]}>
                    <Label text="Freight Part" style={styles.label} />
                    <Input
                      onChangeText={handleFreightPartChargeTextChange}
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.input}
                      selectionColor={COLOR_BLACK}
                      inputType="numeric"
                    />
                  </View>
                )}
                {(isBothLoadType || isFullLoad) && (
                  <View style={[styles.textContainer, getFreightInputsStyle()]}>
                    <Label text="Freight Full" style={styles.label} />
                    <Input
                      onChangeText={handleFreightFullChargeTextChange}
                      containerStyle={styles.inputContainer}
                      inputStyle={styles.input}
                      selectionColor={COLOR_BLACK}
                      inputType="numeric"
                    />
                  </View>
                )}
              </View>
              <View style={styles.labelContainer}>
                <Label text="Packing Charges" style={styles.label} />
              </View>
              <View style={styles.textContainer2}>
                <BouncyCheckboxGroup
                  data={freightChargeOptions}
                  onChange={(selectedItem: ICheckboxButton) => {
                    const key = selectedItem.id as string;
                    setPackingCharges(key);
                    const { packingCharges: statePackageCharges } = state;
                    if (key == '1' || key == '3') {
                      const tempObj = {
                        ...statePackageCharges,
                        status: getStatusValue(key),
                        part_load_charge: '0',
                        full_load_charge: '0',
                      };
                      dispatch({
                        type: QUOTATION_FORM_ACTION.PACKING_CHARGES,
                        payload: tempObj as TCharge,
                      });
                    }
                  }}
                />
              </View>
              <Spacer height={4} />
              {packingCharges === '2' && (
                <View style={styles.mainWrapper}>
                  {(isBothLoadType || isPartLoad) && (
                    <View
                      style={[styles.textContainer, getFreightInputsStyle()]}>
                      <Label text="Part Load" style={styles.label} />
                      <Input
                        onChangeText={(text: string) => {
                          handlePackingChargeChange(text, 'part');
                        }}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        inputType="numeric"
                      />
                    </View>
                  )}
                  {(isBothLoadType || isFullLoad) && (
                    <View
                      style={[styles.textContainer, getFreightInputsStyle()]}>
                      <Label text="Full Load" style={styles.label} />
                      <Input
                        onChangeText={(text: string) => {
                          handlePackingChargeChange(text, 'full');
                        }}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        inputType="numeric"
                      />
                    </View>
                  )}
                </View>
              )}
              <View style={styles.labelContainer}>
                <Label text="Packing Material Charges" style={styles.label} />
              </View>
              <View style={styles.textContainer2}>
                <BouncyCheckboxGroup
                  data={freightChargeOptions}
                  onChange={(selectedItem: ICheckboxButton) => {
                    const key = selectedItem.id as string;
                    setPackingMaterialCharges(key);
                    const { packingCharges: statePackageCharges } = state;
                    if (key == '1' || key == '3') {
                      const tempObj = {
                        ...statePackageCharges,
                        status: getStatusValue(key),
                        part_load_charge: '0',
                        full_load_charge: '0',
                      };
                      dispatch({
                        type: QUOTATION_FORM_ACTION.PACKING_MATERIAL_CHARGES,
                        payload: tempObj as TCharge,
                      });
                    }
                  }}
                />
              </View>
              <Spacer height={4} />
              {packingMaterialCharges === '2' && (
                <View style={styles.mainWrapper}>
                  {(isBothLoadType || isPartLoad) && (
                    <View
                      style={[styles.textContainer, getFreightInputsStyle()]}>
                      <Label text="Part Load" style={styles.label} />
                      <Input
                        onChangeText={(text: string) => {
                          handlePackingMaterialChargeChange(text, 'part');
                        }}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        inputType="numeric"
                      />
                    </View>
                  )}
                  {(isBothLoadType || isFullLoad) && (
                    <View
                      style={[styles.textContainer, getFreightInputsStyle()]}>
                      <Label text="Full Load" style={styles.label} />
                      <Input
                        onChangeText={(text: string) => {
                          handlePackingMaterialChargeChange(text, 'full');
                        }}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        inputType="numeric"
                      />
                    </View>
                  )}
                </View>
              )}
              <View style={styles.labelContainer}>
                <Label text="Loading Charges" style={styles.label} />
              </View>
              <View style={styles.textContainer2}>
                <BouncyCheckboxGroup
                  data={loadingChargeOptions}
                  onChange={(selectedItem: ICheckboxButton) => {
                    setLoadingCharges(selectedItem.id as string);
                    const { loadingCharges } = state;
                    const tempObj = {
                      ...loadingCharges,
                      status: selectedItem.text,
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.LOADING_CHARGES,
                      payload: tempObj as TCharge,
                    });
                  }}
                  style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                />
              </View>
              <Spacer height={4} />
              {loadingCharges !== '3' && (
                <View style={styles.mainWrapper}>
                  {loadingCharges === '2' && (
                    <>
                      {(isBothLoadType || isPartLoad) && (
                        <View
                          style={[
                            styles.textContainer,
                            getFreightInputsStyle(),
                          ]}>
                          <Label text="Part Load" style={styles.label} />
                          <Input
                            onChangeText={(text: string) => {
                              handleLoadingCharges(text, 'part');
                            }}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                            inputType="numeric"
                          />
                        </View>
                      )}
                      {(isBothLoadType || isFullLoad) && (
                        <View
                          style={[
                            styles.textContainer,
                            getFreightInputsStyle(),
                          ]}>
                          <Label text="Full Load" style={styles.label} />
                          <Input
                            onChangeText={(text: string) => {
                              handleLoadingCharges(text, 'full');
                            }}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                            inputType="numeric"
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
              <View style={styles.textContainer2}>
                <BouncyCheckboxGroup
                  data={unloadingChargeOptions}
                  onChange={(selectedItem: ICheckboxButton) => {
                    setUnloadingCharges(selectedItem.id as string);
                    const { unLoadingCharges } = state;
                    const tempObj = {
                      ...unLoadingCharges,
                      status: selectedItem.text,
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.UNLOADING_CHARGES,
                      payload: tempObj as TCharge,
                    });
                  }}
                  style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                />
              </View>
              <Spacer height={4} />
              {unloadingCharges !== '3' && (
                <View style={styles.mainWrapper}>
                  {unloadingCharges === '2' && (
                    <>
                      {(isBothLoadType || isPartLoad) && (
                        <View
                          style={[
                            styles.textContainer,
                            getFreightInputsStyle(),
                          ]}>
                          <Label text="Part Load" style={styles.label} />
                          <Input
                            onChangeText={(text: string) => {
                              handleUnLoadingCharges(text, 'part');
                            }}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                            inputType="numeric"
                          />
                        </View>
                      )}
                      {(isBothLoadType || isFullLoad) && (
                        <View
                          style={[
                            styles.textContainer,
                            getFreightInputsStyle(),
                          ]}>
                          <Label text="Full Load" style={styles.label} />
                          <Input
                            onChangeText={(text: string) => {
                              handleUnLoadingCharges(text, 'full');
                            }}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                            inputType="numeric"
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
              <View style={styles.textContainer2}>
                <BouncyCheckboxGroup
                  data={freightChargeOptions}
                  onChange={(selectedItem: ICheckboxButton) => {
                    setUnpackingCharges(selectedItem.id as string);
                    const { unPackingCharges } = state;
                    const tempObj = {
                      ...unPackingCharges,
                      status: selectedItem.text,
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.UNPACKING_CHARGES,
                      payload: tempObj as TCharge,
                    });
                  }}
                />
              </View>
              <Spacer height={4} />
              {unpackingCharges === '2' && (
                <View style={styles.mainWrapper}>
                  {(isBothLoadType || isPartLoad) && (
                    <View
                      style={[styles.textContainer, getFreightInputsStyle()]}>
                      <Label text="Part Load" style={styles.label} />
                      <Input
                        onChangeText={(text: string) => {
                          handleUnPackingCharges(text, 'part');
                        }}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        inputType="numeric"
                      />
                    </View>
                  )}
                  {(isBothLoadType || isFullLoad) && (
                    <View
                      style={[styles.textContainer, getFreightInputsStyle()]}>
                      <Label text="Full Load" style={styles.label} />
                      <Input
                        onChangeText={(text: string) => {
                          handleUnPackingCharges(text, 'full');
                        }}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        inputType="numeric"
                      />
                    </View>
                  )}
                </View>
              )}
              <Spacer height={4} />
              <View style={styles.textContainer2}>
                <Label text="Advance Amount" style={styles.label} />
                <Input
                  onChangeText={handleAdvanceAmountInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
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
                  />
                </View>
                <View style={styles.textContainer}>
                  <DropdownComponent
                    data={surchargePercentOptions}
                    onSelect={handleSurchargePercent}
                    disable={!isSurchargeApplicable}
                  />
                </View>
              </View>
              <Spacer height={4} />
              <View style={styles.labelContainer}>
                <Label text="Discount in Quotation" style={styles.label} />
              </View>
              <View style={styles.textContainer2}>
                <BouncyCheckboxGroup
                  data={discountTypeOptions}
                  onChange={(selectedItem: ICheckboxButton) => {
                    handleDiscountType(selectedItem);
                    const { discountInQuotation } = state;
                    const tempObj = {
                      ...discountInQuotation,
                      discount_type: selectedItem.text,
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.DISCOUNT_IN_QUOTATION,
                      payload: tempObj as TDiscountInQuotation,
                    });
                  }}
                />
              </View>
              {renderDiscountTypeView()}
              <Spacer height={4} />
              <View style={styles.labelContainer}>
                <Label text="GST IN QUOTATION" style={styles.label} />
              </View>
              <View style={styles.textContainer3}>
                <View style={styles.textContainer2}>
                  <BouncyCheckboxGroup
                    data={GSTOptions}
                    onChange={(selectedItem: ICheckboxButton) => {
                      setGstInQuotation(selectedItem.id as string);
                      const { gstInQuotation } = state;
                      const tempObj = {
                        ...gstInQuotation,
                        status: selectedItem.text,
                      };
                      dispatch({
                        type: QUOTATION_FORM_ACTION.GST_IN_QUOTATION,
                        payload: tempObj as TGstInQuotation,
                      });
                    }}
                    style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                  />
                </View>
              </View>
              {gstInQuotation === '1' && (
                <>
                  <View style={styles.mainWrapper}>
                    <View style={styles.textContainer}>
                      <Label text="GST %" style={styles.label} />
                      <DropdownComponent
                        data={gstPercentOptions}
                        onSelect={handleQuotationGstPercent}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Label text="GST Type" style={styles.label} />
                      <DropdownComponent
                        data={gstTypeOptions}
                        onSelect={handleQuotationGstType}
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
              <View style={styles.textContainer2}>
                <BouncyCheckboxGroup
                  data={requiredptions}
                  onChange={(selectedItem: ICheckboxButton) => {
                    console.log('SelectedItem: ', JSON.stringify(selectedItem));
                    handleInsuranceRequired(selectedItem);
                    const key = selectedItem.id as string;
                    const { insuranceDetails } = state;
                    const tempObj = {
                      ...insuranceDetails,
                      status: key == '1' ? 'required' : 'not required',
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.INSURANCE_DETAILS,
                      payload: tempObj as TInsuranceDetails,
                    });
                  }}
                />
              </View>
              <Spacer height={4} />
              <View style={styles.textContainer2}>
                <Label text="Shifting Luggage" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={(item: TDropdownItem) => {
                    const { insuranceDetails } = state;
                    const tempObj = {
                      ...insuranceDetails,
                      shifting_luggage: item.label,
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
                />
              </View>
              <Spacer height={4} />
              <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                  <Label text="Insurance Charge @%" style={styles.label} />
                  <DropdownComponent
                    data={insurancePercentOptions}
                    onSelect={handleInsuranceCharge}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Label text="GST %" style={styles.label} />
                  <DropdownComponent
                    data={gstPercentOptions}
                    onSelect={handleInsuranceGSTPercent}
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
                  />
                </View>
              </View>
            </View>
          </CollapsibleView>
          <Spacer height={4} />
          <CollapsibleView title="STORAGE CHARGES" collapsed={true}>
            <View>
              <Spacer height={8} />
              <View style={styles.textContainer2}>
                <BouncyCheckboxGroup
                  data={requiredptions}
                  onChange={(selectedItem: ICheckboxButton) => {
                    console.log('SelectedItem: ', JSON.stringify(selectedItem));
                    const { storageCharges } = state;
                    const tempObj = {
                      ...storageCharges,
                      status: selectedItem.text,
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.STORAGE_CHARGES,
                      payload: tempObj as TStorageCharge,
                    });
                  }}
                />
              </View>
              {state.storageCharges?.status == 'Required' && (
                <>
                  <View style={styles.textContainer2}>
                    <Label text="Storage Duration" style={styles.label} />
                    <DropdownComponent
                      data={storageDurationOptions}
                      onSelect={(item: TDropdownItem) => {
                        const { storageCharges } = state;
                        const tempObj = {
                          ...storageCharges,
                          storage_duration_type: item.label,
                        };
                        dispatch({
                          type: QUOTATION_FORM_ACTION.STORAGE_CHARGES,
                          payload: tempObj as TStorageCharge,
                        });
                      }}
                    />
                  </View>
                </>
              )}
              {state.storageCharges?.storage_duration_type ==
                'Charges During Period' && (
                  <View style={styles.mainWrapper}>
                    <View style={styles.textContainer}>
                      <Label text="From Date" style={styles.label} />
                      <DatePickerComponent onDateSelect={handleStorageFromDate} />
                    </View>
                    <View style={styles.textContainer}>
                      <Label text="To Date" style={styles.label} />
                      <DatePickerComponent onDateSelect={handleStorageToDate} />
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
                />
              </View>
            </View>
          </CollapsibleView>
          <Spacer height={4} />
          <CollapsibleView title="OTHER CHARGES" collapsed={true}>
            <View>
              <View style={styles.textContainer2}>
                <Spacer height={12} />
                <Input
                  onChangeText={handleOtherChargesItemNameTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                // inputType="numeric"
                />
              </View>
              <Spacer height={4} />
              <View style={styles.labelContainer}>
                <Label text="Amount" style={styles.label} />
              </View>
              <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                  <Input
                    onChangeText={handleOtherChargesItemAmountTextChange}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    selectionColor={COLOR_BLACK}
                    inputType="numeric"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Button
                    text="Add"
                    onPress={handleAddOtherItemCharges}
                    disabled={false}
                    style={styles.buttonStyle}
                    textStyle={styles.textStyle}
                  />
                </View>
              </View>
              {renderOtherItemList()}
            </View>
          </CollapsibleView>
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
              <View style={styles.textContainer2}>
                <BouncyCheckboxGroup
                  data={yesNoOptions}
                  onChange={(selectedItem: ICheckboxButton) => {
                    const { otherDetails } = state;
                    const tempObj = {
                      ...otherDetails,
                      easy_access_for_loading_unloading: selectedItem.text,
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.OTHER_DETAILS,
                      payload: tempObj as TOtherDetails,
                    });
                  }}
                />
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
                    const { otherDetails } = state;
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
                  inputType="numeric"
                />
              </View>
              <Spacer height={4} />
              <View style={styles.labelContainer}>
                <Label
                  text="ARE THERE ANY RESTRICTIONS FOR LOADING/UNLOADING AT ORIGIN/DESINATION (क्या लोडिंग/अनलोडिंग वाले स्थान पर कोई रोकटोक हैं?)"
                  style={styles.label}
                />
              </View>
              <View style={styles.textContainer2}>
                <BouncyCheckboxGroup
                  data={yesNoOptions}
                  onChange={(selectedItem: ICheckboxButton) => {
                    const { otherDetails } = state;
                    const tempObj = {
                      ...otherDetails,
                      any_restrcition_for_loading_unloading: selectedItem.text,
                    };
                    dispatch({
                      type: QUOTATION_FORM_ACTION.OTHER_DETAILS,
                      payload: tempObj as TOtherDetails,
                    });
                  }}
                />
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
                    const { otherDetails } = state;
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
                  inputType="numeric"
                />
              </View>
            </View>
          </CollapsibleView>
          <Spacer height={12} />
          <Button
            text="PREVIEW"
            onPress={() => { }}
            disabled={true}
            style={styles.previewButtonStyle}
            textStyle={styles.textStyle}
          />
          <Spacer height={12} />
        </View>
      </AvoidSoftInputViewHOC>
      <Spinner show={fetching} />
    </>
  );
};

export default AddQuotationView;
