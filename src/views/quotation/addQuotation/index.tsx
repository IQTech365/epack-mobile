import React, {useReducer, useState, useCallback, useEffect} from 'react';
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
import {formatDate} from '../../../utils/formatter';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import Button from '../../../common/Button';
import surchargeOptions from '../../../data/surchargeOptions.json';
import gstPercentOptions from '../../../data/gstPercentOptions.json';
import gstTypeOptions from '../../../data/gstTypeOptions.json';
import insurancePercentOptions from '../../../data/insurancePercentOptions.json';
import otherChargeOptions from '../../../data/otherChargeOptions.json';
import { PincodeService } from '../../../service/PincodeService';
import { PINCODE } from '../../../http/Endpoint';

const loadTypes: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Part Load',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0},
    innerIconStyle: {borderWidth: 2, borderRadius: 0},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 16},
  },
  {
    id: '2',
    text: 'Full Load',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0},
    innerIconStyle: {borderWidth: 2, borderRadius: 0},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
  },
];

const freightChargeOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Included in freight',
    fillColor: COLOR_BLUE,
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    style: {paddingRight: 8},
  },
  {
    id: '2',
    text: 'Additional from freight',
    fillColor: COLOR_BLUE,
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
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
    iconStyle: {borderColor: 'red', borderRadius: 0},
    innerIconStyle: {borderWidth: 2, borderRadius: 0},
    textContainerStyle: {marginLeft: 4, marginRight: 4},
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
    iconStyle: {borderColor: 'red', borderRadius: 0},
    innerIconStyle: {borderWidth: 2, borderRadius: 0},
    textContainerStyle: {marginLeft: 4, marginRight: 4},
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
    iconStyle: {borderColor: 'red', borderRadius: 0},
    innerIconStyle: {borderWidth: 2, borderRadius: 0},
    textContainerStyle: {marginLeft: 4, marginRight: 4},
  },
];

const requiredptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Required',
    fillColor: COLOR_BLUE,
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    style: {paddingRight: 8},
  },
  {
    id: '2',
    text: 'Not Required',
    fillColor: COLOR_BLUE,
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
  },
];

interface IAddQuotationProps {}

const AddQuotationView: React.FC<IAddQuotationProps> = ({}) => {
  const [switchState, setSwitchState] = useState<boolean>(false);
  const [state, dispatch] = useReducer(quotationReducer, initialState);
  // console.log('quotation-form-state----', JSON.stringify(state));

  const switchWrapperStyle = switchState
    ? styles.switchMainWrapper
    : styles.switchMainWrapper2;

  const handleQuotationDate = (date: Date) => {
    dispatch({
      type: QUOTATION_FORM_ACTION.DATE_OF_QUOTATION,
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
      dispatch({
        type: QUOTATION_FORM_ACTION.PICKUP_PINCODE,
        payload: text,
      });
    },
    [state.pickupPincode],
  );

  const handleDeliveryPinCode = useCallback(
    (text: string) => {
      dispatch({
        type: QUOTATION_FORM_ACTION.DELIVERY_PINCODE,
        payload: text,
      });
    },
    [state.deliveryPincode],
  );

  const getAddressByPincode = async () => {
    try {
      const result = await PincodeService(PINCODE(state.pickupPincode));
      console.log('result----', JSON.stringify(result));
    } catch (error) {
      console.log('error----', error);
    }
  }

  /** Effects */
  useEffect(() => {
    if(state.pickupPincode && state.pickupPincode.length >= 6) {
      getAddressByPincode();
    }
  }, [state.pickupPincode]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Header label="CREATE QUOTATION" canGoBack={true} />
        <Spacer height={4} />
        <CollapsibleView title="BASIC DETAILS" collapsed={true}>
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
                <Label text="Date of Quotation" style={styles.label} />
                <DatePickerComponent onDateSelect={handleQuotationDate} />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Serial No." style={styles.label} />
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
                  onChangeText={() => {}}
                  containerStyle={styles.switchInputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  editable={!switchState}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.textContainer2}>
              <Label text="Shifting Luggage" style={styles.label} />
              <DropdownComponent
                data={shiftingLuggages}
                onSelect={handleShiftingLuggage}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.textContainer2}>
              <Label text="Template" style={styles.label} />
              <DropdownComponent data={templates} onSelect={handleTemplate} />
            </View>
            <Spacer height={4} />
            <View style={styles.textContainer2}>
              <Label text="Company Name" style={styles.label} />
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
              <Label text="Pin code" style={styles.label} />
              <Input
                onChangeText={handlePickupPinCode}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <View style={styles.textContainer2}>
              <Label text="City" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handleShiftingType}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.textContainer2}>
              <Label text="State" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handleShiftingType}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.textContainer2}>
              <Label text="Locality" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handleShiftingType}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.textContainer2}>
              <Label text="Address" style={styles.label} />
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="DELIVERY ADDRESS" collapsed={true}>
          <View>
            <View style={styles.textContainer2}>
              <Label text="Pin code" style={styles.label} />
              <Input
                onChangeText={handleDeliveryPinCode}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <View style={styles.textContainer2}>
              <Label text="City" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handleShiftingType}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.textContainer2}>
              <Label text="State" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handleShiftingType}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.textContainer2}>
              <Label text="Locality" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handleShiftingType}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.textContainer2}>
              <Label text="Address" style={styles.label} />
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="FREIGHT DETAILS" collapsed={true}>
          <View>
            <View style={styles.labelContainer}>
              <Label text="Load Type" style={styles.label} />
            </View>
            <View style={styles.textContainer2}>
              <BouncyCheckboxGroup
                data={loadTypes}
                onChange={(selectedItem: ICheckboxButton) => {
                  console.log('SelectedItem: ', JSON.stringify(selectedItem));
                }}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
              <View style={styles.textContainer}>
                <Label text="Freight Part" style={styles.label} />
                <Input
                  onChangeText={() => {}}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="Freight Full" style={styles.label} />
                <Input
                  onChangeText={() => {}}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                />
              </View>
            </View>
            <View style={styles.labelContainer}>
              <Label text="Packing Charges" style={styles.label} />
            </View>
            <View style={styles.textContainer2}>
              <BouncyCheckboxGroup
                data={freightChargeOptions}
                onChange={(selectedItem: ICheckboxButton) => {
                  console.log('SelectedItem: ', JSON.stringify(selectedItem));
                }}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
              <View style={styles.textContainer}>
                <Label text="Part Load" style={styles.label} />
                <Input
                  onChangeText={() => {}}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="Full Load" style={styles.label} />
                <Input
                  onChangeText={() => {}}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                />
              </View>
            </View>
            <View style={styles.labelContainer}>
              <Label text="Unpacking Charges" style={styles.label} />
            </View>
            <View style={styles.textContainer2}>
              <BouncyCheckboxGroup
                data={freightChargeOptions}
                onChange={(selectedItem: ICheckboxButton) => {
                  console.log('SelectedItem: ', JSON.stringify(selectedItem));
                }}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
              <View style={styles.textContainer}>
                <Label text="Part Load" style={styles.label} />
                <Input
                  onChangeText={() => {}}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="Full Load" style={styles.label} />
                <Input
                  onChangeText={() => {}}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                />
              </View>
            </View>
            <View style={styles.labelContainer}>
              <Label text="Loading Charges" style={styles.label} />
            </View>
            <View style={styles.textContainer2}>
              <BouncyCheckboxGroup
                data={freightChargeOptions}
                onChange={(selectedItem: ICheckboxButton) => {
                  console.log('SelectedItem: ', JSON.stringify(selectedItem));
                }}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
              <View style={styles.textContainer}>
                <Label text="Part Load" style={styles.label} />
                <Input
                  onChangeText={() => {}}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="Full Load" style={styles.label} />
                <Input
                  onChangeText={() => {}}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                />
              </View>
            </View>
            <View style={styles.labelContainer}>
              <Label text="Unloading Charges" style={styles.label} />
            </View>
            <View style={styles.textContainer2}>
              <BouncyCheckboxGroup
                data={freightChargeOptions}
                onChange={(selectedItem: ICheckboxButton) => {
                  console.log('SelectedItem: ', JSON.stringify(selectedItem));
                }}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
              <View style={styles.textContainer}>
                <Label text="Part Load" style={styles.label} />
                <Input
                  onChangeText={() => {}}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="Full Load" style={styles.label} />
                <Input
                  onChangeText={() => {}}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                />
              </View>
            </View>
            <View style={styles.labelContainer}>
              <Label text="Surcharge" style={styles.label} />
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
              <View style={styles.textContainer}>
                <DropdownComponent
                  data={surchargeOptions}
                  onSelect={handleShiftingType}
                />
              </View>
              <View style={styles.textContainer}>
                <Input
                  onChangeText={() => {}}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  inputType="numeric"
                />
              </View>
            </View>
            <View style={styles.labelContainer}>
              <Label text="GST IN QUOTATION" style={styles.label} />
            </View>
            <View style={styles.textContainer3}>
              <View style={styles.textContainer2}>
                <BouncyCheckboxGroup
                  data={GSTOptions}
                  onChange={(selectedItem: ICheckboxButton) => {
                    console.log('SelectedItem: ', JSON.stringify(selectedItem));
                  }}
                />
              </View>
            </View>
            <Spacer height={4} />
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
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="TRANSIT CHARGES" collapsed={true}>
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
            <View style={styles.textContainer2}>
              <Label text="Insurance %" style={styles.label} />
              <DropdownComponent
                data={insurancePercentOptions}
                onSelect={handleShiftingType}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Value of Goods" style={styles.label} />
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
                  text="Submit"
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
                  text="Submit"
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
        <CollapsibleView title="OTHER CHARGES" collapsed={true}>
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
            <View style={styles.textContainer2}>
              <Spacer height={12} />
              <DropdownComponent
                data={otherChargeOptions}
                onSelect={handleShiftingType}
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
  );
};

export default AddQuotationView;
