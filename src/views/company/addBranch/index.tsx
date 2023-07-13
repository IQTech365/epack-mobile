import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import styles from './style';
import {TDropdownItem} from '../../../type/TDropdownItem';
import Label from '../../../common/Label';
import DropdownComponent from '../../../common/DropdownComponent';
import Header from '../../../common/Header';
import Input from '../../../common/Input';
import {COLOR_BLACK} from '../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import shiftingTypes from '../../../data/shiftingType.json';
import Button from '../../../common/Button';

const AddBranchView: React.FC<{}> = ({}) => {
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

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Header label="ADD BRANCH" />
        <Spacer height={4} />
          <View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Branch Name" style={styles.label} />
              <Input
                onChangeText={handlePartyNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Branch Manager Name" style={styles.label} />
              <Input
                onChangeText={handlePartyNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Email" style={styles.label} />
              <Input
                onChangeText={handlePartyNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Mobile" style={styles.label} />
              <Input
                onChangeText={handlePartyNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Landline Number" style={styles.label} />
              <Input
                onChangeText={handlePartyNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Street" style={styles.label} />
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
              <Label text="Locality" style={styles.label} />
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
              <Label text="Landmark" style={styles.label} />
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Company Profile" style={styles.label} />
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="GST No." style={styles.label} />
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Company Terms & Conditions" style={styles.label} />
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </View>
        <Spacer height={12} />
        <Button
          text="SAVE"
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

export default AddBranchView;
