import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import styles from './style';
import shiftingTypeOptions from '../../../data/shiftingType.json';
import {TDropdownItem} from '../../../type/TDropdownItem';
import Label from '../../../common/Label';
import DropdownComponent from '../../../common/DropdownComponent';
import Header from '../../../common/Header';
import Input from '../../../common/Input';
import {COLOR_BLACK} from '../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CollapsibleView from '../../../common/CollapsibleView';
import shiftingTypes from '../../../data/shiftingType.json';
import Button from '../../../common/Button';
import DatePickerComponent from '../../../common/DatePickerComponent';

const RegisterCompanyView: React.FC<{}> = ({}) => {
  const state = {pickupPincode: '', deliveryPincode: ''};
  const handleShiftingType = (item: TDropdownItem) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.SHIFTING_LUGGAGE,
    //   payload: item.label,
    // });
  };

  const handlePartyNameInputTextChange = (text: string) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.PARTY_NAME,
    //   payload: text,
    // });
  };

  const handlePickupPinCode = useCallback(
    (text: string) => {
      // dispatch({
      //   type: QUOTATION_FORM_ACTION.PICKUP_PINCODE,
      //   payload: text,
      // });
    },
    [state.pickupPincode],
  );

  const handleDeliveryPinCode = useCallback(
    (text: string) => {
      // dispatch({
      //   type: QUOTATION_FORM_ACTION.DELIVERY_PINCODE,
      //   payload: text,
      // });
    },
    [state.deliveryPincode],
  );
  const handleQuotationDate = (date: Date) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.DATE_OF_QUOTATION,
    //   payload: formatDate(date),
    // });
  };

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
          <View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Company Name" style={styles.label} />
              <Input
                onChangeText={handlePartyNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Contact Person" style={styles.label} />
              <Input
                onChangeText={handlePartyNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Company Email" style={styles.label} />
              <Input
                onChangeText={handlePartyNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Pin code" style={styles.label} />
              <Input
                onChangeText={handlePickupPinCode}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <View style={styles.elementContainer}>
              <Label text="City" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handleShiftingType}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="State" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handleShiftingType}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Address" style={styles.label} />
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Company Type" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handleShiftingType}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Enter PAN No." style={styles.label} />
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <View style={styles.elementContainer}>
              <Label text="GST No" style={styles.label} />
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <View style={styles.labelContainer}>
              <Label text="IBA Approval" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              <BouncyCheckbox
                size={25}
                fillColor="red"
                unfillColor="#FFFFFF"
                text="Approved"
                iconStyle={{borderColor: 'red'}}
                innerIconStyle={{borderWidth: 2}}
                textStyle={{
                  fontFamily: 'JosefinSans-Regular',
                  textDecorationLine: 'none',
                }}
                style={{marginRight: 15}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {}}
              />
              <BouncyCheckbox
                size={25}
                fillColor="red"
                unfillColor="#FFFFFF"
                text="Not Approved"
                iconStyle={{borderColor: 'red'}}
                innerIconStyle={{borderWidth: 2}}
                textStyle={{
                  fontFamily: 'JosefinSans-Regular',
                  textDecorationLine: 'none',
                }}
                style={{marginRight: 15}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {}}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="IBA Approval Code" style={styles.label} />
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="IBA Code Valid Till" style={styles.label} />
                  <DatePickerComponent onDateSelect={handleQuotationDate} style={styles.datePickerWidth} />
            </View>
            
          </View>
        <Spacer height={12} />
        <Button
          text="SUBMIT"
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

export default RegisterCompanyView;
