import React, { useCallback } from 'react';
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
import {COLOR_BLACK, COLOR_BLUE} from '../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CollapsibleView from '../../../common/CollapsibleView';
import shiftingTypes from '../../../data/shiftingType.json';
import Button from '../../../common/Button';
import liftStatusOptions from '../../../data/liftStatusOptions.json';
import floorOptions from '../../../data/floorOptions.json';

const AddEnquiryView: React.FC<{}> = ({}) => {
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
        <Header label="ADD ENQUIRY" canGoBack={true} />
        <Spacer height={4} />
        <CollapsibleView title="GENERAL INFO" collapsed={false}>
          <View>
          <View style={styles.elementContainer}>
          <Label text="Shifting Type" style={styles.label} />
          <DropdownComponent
            data={shiftingTypeOptions}
            onSelect={handleShiftingType}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Company Name of Party" style={styles.label} />
          <Input
            onChangeText={handlePartyNameInputTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Party Name" style={styles.label} />
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
        <View style={styles.labelContainer}>
        <Label text="Shifting Luggage" style={styles.label} />
        </View>
        <View style={styles.elementContainer2}>
          <BouncyCheckbox
            text="Household"
            fillColor={COLOR_BLUE}
            iconStyle={{borderColor: 'red', borderRadius: 0, width: 16, height: 16}}
            innerIconStyle={{borderWidth: 1, borderRadius: 0, width: 16, height: 16}}
            textStyle={{
              fontFamily: 'JosefinSans-Regular',
              textDecorationLine: 'none',
            }}
            style={{marginRight: 15, marginBottom: 10}}
            textContainerStyle={{paddingLeft: 0}}
            onPress={(isChecked: boolean) => {}}
          />
          <BouncyCheckbox
            size={25}
            unfillColor="#FFFFFF"
            text="Office"
            fillColor={COLOR_BLUE}
            iconStyle={{borderColor: 'red', borderRadius: 0, width: 16, height: 16}}
            innerIconStyle={{borderWidth: 1, borderRadius: 0, width: 16, height: 16}}
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
            unfillColor="#FFFFFF"
            text="Industrial"
            fillColor={COLOR_BLUE}
            iconStyle={{borderColor: 'red', borderRadius: 0, width: 16, height: 16}}
            innerIconStyle={{borderWidth: 1, borderRadius: 0, width: 16, height: 16}}
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
            unfillColor="#FFFFFF"
            text="Vehcicle"
            fillColor={COLOR_BLUE}
            iconStyle={{borderColor: 'red', borderRadius: 0, width: 16, height: 16}}
            innerIconStyle={{borderWidth: 1, borderRadius: 0, width: 16, height: 16}}
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
            unfillColor="#FFFFFF"
            text="Other"
            fillColor={COLOR_BLUE}
            iconStyle={{borderColor: 'red', borderRadius: 0, width: 16, height: 16}}
            innerIconStyle={{borderWidth: 1, borderRadius: 0, width: 16, height: 16}}
            textStyle={{
              fontFamily: 'JosefinSans-Regular',
              textDecorationLine: 'none',
            }}
            style={{marginRight: 15}}
            textContainerStyle={{paddingLeft: 0}}
            onPress={(isChecked: boolean) => {}}
          />
        </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="PICKUP ADDRESS" collapsed={true}>
          <View>
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
            <View style={styles.twoColumnWrapper}>
              <View style={styles.textContainer}>
                <Label text="Current Floor" style={styles.label} />
                <DropdownComponent
                  data={floorOptions}
                  onSelect={handleShiftingType}
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="Lift Status" style={styles.label} />
                <DropdownComponent
                  data={liftStatusOptions}
                  onSelect={handleShiftingType}
                />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="DELIVERY ADDRESS" collapsed={true}>
          <View>
            <View style={styles.elementContainer}>
              <Label text="Pin code" style={styles.label} />
              <Input
                onChangeText={handleDeliveryPinCode}
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
            <View style={styles.twoColumnWrapper}>
              <View style={styles.textContainer}>
                <Label text="Current Floor" style={styles.label} />
                <DropdownComponent
                  data={floorOptions}
                  onSelect={handleShiftingType}
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="Lift Status" style={styles.label} />
                <DropdownComponent
                  data={liftStatusOptions}
                  onSelect={handleShiftingType}
                />
              </View>
            </View>
          </View>
        </CollapsibleView>
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

export default AddEnquiryView;
