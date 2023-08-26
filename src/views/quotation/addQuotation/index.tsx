import React, {
  useReducer,
  useState,
  useCallback,
  useEffect,
  Reducer,
} from 'react';
import {View} from 'react-native';
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
import templates from '../../../data/template.json';
import {
  initialState,
  quotationReducer,
  QUOTATION_FORM_ACTION,
} from './quotationReducer';
import {formatDate, getCities, getStates} from '../../../utils/formatter';
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
import usePincodeHook, {PINCODE_REQUEST_KEY} from '../../../hooks/usePincodeHook';
import Spinner from '../../../common/Spinner';

const loadTypes: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Part Load',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 16, height: 16},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 16},
  },
  {
    id: '2',
    text: 'Full Load',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 16, height: 16},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
  },
];

const freightChargeOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Included',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, width: 16, height: 16},
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: {marginLeft: 4, marginRight: 4},
    style: {paddingRight: 10},
  },
  {
    id: '2',
    text: 'Additional',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, width: 16, height: 16},
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: {marginLeft: 4, marginRight: 4},
    style: {paddingRight: 10},
  },
  {
    id: '3',
    text: 'Not Required',
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
    iconStyle: {borderColor: 'red', width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, width: 16, height: 16},
    textContainerStyle: {marginLeft: 4, marginRight: 4},
    style: {paddingRight: 16},
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
    iconStyle: {borderColor: 'red', width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, width: 16, height: 16},
    textContainerStyle: {marginLeft: 4, marginRight: 4},
    style: {paddingRight: 16},
  },
  {
    id: '3',
    text: 'GST Exempted',
    fillColor: COLOR_BLUE,
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    iconStyle: {borderColor: 'red', width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, width: 16, height: 16},
    textContainerStyle: {marginLeft: 4, marginRight: 4},
  },
];

const requiredptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Required',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, width: 16, height: 16},
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    style: {paddingRight: 8},
    textContainerStyle: {marginLeft: 4, marginRight: 4},
  },
  {
    id: '2',
    text: 'Not Required',
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

const insuranceWithOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'With Goods Value',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, width: 16, height: 16},
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    style: {paddingRight: 8},
    textContainerStyle: {marginLeft: 4, marginRight: 4},
  },
  {
    id: '2',
    text: 'Without Goods Value',
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

const yesNoOptions: Array<ICheckboxButton> = [
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

const discountTypeOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Discount @%',
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
    text: 'Flat Discount',
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

const loadingUnloadingByOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'By Company',
    fillColor: COLOR_BLUE,
    isChecked: true,
    iconStyle: {borderColor: 'red', width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, width: 16, height: 16},
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: {marginLeft: 4, marginRight: 4},
    style: {paddingRight: 10},
  },
  {
    id: '2',
    text: 'By Party',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, width: 16, height: 16},
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: {marginLeft: 4, marginRight: 4},
    style: {paddingRight: 10},
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
  const [pincodeRequestKey, setPincodeRequestKey] = useState<PINCODE_REQUEST_KEY>(PINCODE_REQUEST_KEY.ADD_QUOTATION_PICKUP_ADDRESS);
  const [pickupStates, setPickupStates] = useState<TDropdownItem[]>([]);
  const [pickupCities, setPickupCities] = useState<TDropdownItem[]>([]);
  const [deliveryStates, setDeliveryStates] = useState<TDropdownItem[]>([]);
  const [deliveryCities, setDeliveryCities] = useState<TDropdownItem[]>([]);

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
  const {result, fetching, setPincode} = usePincodeHook(setPincodeError, resetPincodeError);
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

  const handleSurcharge = useCallback(
    (item: TDropdownItem) => {
      if (item.value == '1') {
        setIsSurchargeApplicable(false);
      } else {
        setIsSurchargeApplicable(true);
      }
    },
    [isSurchargeApplicable],
  );

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

  const handleWithGoodsValue = useCallback(
    (item: ICheckboxButton) => {
      if (item.id == '1') {
        setIsWithGoodsValue(true);
      } else {
        setIsWithGoodsValue(false);
      }
    },
    [isWithGoodsValue],
  );

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
    return null;
  };

  const renderDiscountTypeView = () => {
    if (discountType === '1') {
      return (
        <>
          <Spacer height={12} />
          <View style={styles.textContainer2}>
            <DropdownComponent
              data={discountPercentOptions}
              onSelect={handleShiftingType}
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
              onChangeText={() => {}}
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

  /** Effects */
  useEffect(() => {
    if(result && result.Status != 'Error') {
      if(pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_QUOTATION_PICKUP_ADDRESS) {
        setPickupStates(getStates(result));
        setPickupCities(getCities(result));
      } else if(pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_QUOTATION_DELIVERY_ADDRESS) {
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
                <View style={[styles.textContainer, {alignItems: 'center'}]}>
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
                <Label text="Party Company Name" style={styles.label} />
                <Input
                  onChangeText={handleCompanyNameInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
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
                  style={{marginRight: 45}}
                  textContainerStyle={{paddingLeft: 0, marginLeft: 10}}
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
                  style={{marginRight: 15}}
                  textContainerStyle={{paddingLeft: 0, marginLeft: 10}}
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
                    setPackingCharges(selectedItem.id as string);
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
                        onChangeText={() => {}}
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
                        onChangeText={() => {}}
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
                    setPackingMaterialCharges(selectedItem.id as string);
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
                        onChangeText={() => {}}
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
                        onChangeText={() => {}}
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
                  data={freightChargeOptions}
                  onChange={(selectedItem: ICheckboxButton) => {
                    setLoadingCharges(selectedItem.id as string);
                  }}
                />
              </View>
              {(loadingCharges === '1' || loadingCharges === '2') && (
                <>
                  <Spacer height={12} />
                  <View style={styles.textContainer2}>
                    <BouncyCheckboxGroup
                      data={loadingUnloadingByOptions}
                      onChange={(selectedItem: ICheckboxButton) => {
                        setLoadingBy(selectedItem.id as string);
                      }}
                    />
                  </View>
                </>
              )}
              <Spacer height={4} />
              {loadingCharges !== '3' && (
                <View style={styles.mainWrapper}>
                  {loadingCharges === '2' && loadingBy === '1' && (
                    <>
                      {(isBothLoadType || isPartLoad) && (
                        <View
                          style={[
                            styles.textContainer,
                            getFreightInputsStyle(),
                          ]}>
                          <Label text="Part Load" style={styles.label} />
                          <Input
                            onChangeText={() => {}}
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
                            onChangeText={() => {}}
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
                  data={freightChargeOptions}
                  onChange={(selectedItem: ICheckboxButton) => {
                    setUnloadingCharges(selectedItem.id as string);
                  }}
                />
              </View>
              {(unloadingCharges === '1' || unloadingCharges === '2') && (
                <>
                  <Spacer height={12} />
                  <View style={styles.textContainer2}>
                    <BouncyCheckboxGroup
                      data={loadingUnloadingByOptions}
                      onChange={(selectedItem: ICheckboxButton) => {
                        setUnLoadingBy(selectedItem.id as string);
                      }}
                    />
                  </View>
                </>
              )}
              <Spacer height={4} />
              {unloadingCharges !== '3' && (
                <View style={styles.mainWrapper}>
                  {unloadingCharges === '2' && unLoadingBy === '1' && (
                    <>
                      {(isBothLoadType || isPartLoad) && (
                        <View
                          style={[
                            styles.textContainer,
                            getFreightInputsStyle(),
                          ]}>
                          <Label text="Part Load" style={styles.label} />
                          <Input
                            onChangeText={() => {}}
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
                            onChangeText={() => {}}
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
                        onChangeText={() => {}}
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
                        onChangeText={() => {}}
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
                  onChangeText={() => {}}
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
                    onSelect={handleShiftingType}
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
                    console.log('SelectedItem: ', JSON.stringify(selectedItem));
                    handleDiscountType(selectedItem);
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
                      // console.log('SelectedItem: ', JSON.stringify(selectedItem));
                      setGstInQuotation(selectedItem.id as string);
                    }}
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
                        onSelect={handleShiftingType}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Label text="GST Type" style={styles.label} />
                      <DropdownComponent
                        data={gstTypeOptions}
                        onSelect={handleShiftingType}
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
                  }}
                />
              </View>
              <Spacer height={4} />
              <View style={styles.textContainer2}>
                <Label text="Insurance Type" style={styles.label} />
                <DropdownComponent
                  data={insuranceTypeOptions}
                  onSelect={handleShiftingType}
                />
              </View>
              <Spacer height={4} />
              <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                  <Label text="Insurance Charge @%" style={styles.label} />
                  <DropdownComponent
                    data={insurancePercentOptions}
                    onSelect={handleShiftingType}
                  />
                </View>
                <View style={styles.textContainer}>
                  <Label text="GST %" style={styles.label} />
                  <DropdownComponent
                    data={gstPercentOptions}
                    onSelect={handleShiftingType}
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
                    onChangeText={() => {}}
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
                  }}
                />
              </View>
              <View style={styles.mainWrapper}>
                <View style={styles.textContainer}>
                  <Label text="From Date" style={styles.label} />
                  <DatePickerComponent onDateSelect={handleQuotationDate} />
                </View>
                <View style={styles.textContainer}>
                  <Label text="To Date" style={styles.label} />
                  <DatePickerComponent onDateSelect={handleQuotationDate} />
                </View>
              </View>
              <Spacer height={4} />
              <View style={styles.labelContainer}>
                <Label text="Amount" style={styles.label} />
              </View>
              <View style={styles.textContainer2}>
                <Input
                  onChangeText={() => {}}
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
                  onChangeText={() => {}}
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
                    onChangeText={() => {}}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    selectionColor={COLOR_BLACK}
                    inputType="numeric"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Button
                    text="Add"
                    onPress={() => {}}
                    disabled={false}
                    style={styles.buttonStyle}
                    textStyle={styles.textStyle}
                  />
                </View>
              </View>
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
                    console.log('SelectedItem: ', JSON.stringify(selectedItem));
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
                  onChangeText={() => {}}
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
                    console.log('SelectedItem: ', JSON.stringify(selectedItem));
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
                  onChangeText={() => {}}
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
            onPress={() => {}}
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
