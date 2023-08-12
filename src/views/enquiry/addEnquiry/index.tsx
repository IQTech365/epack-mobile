import React, { useCallback, useReducer, useState } from 'react';
import { View, Text } from 'react-native';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import styles from './style';
import shiftingTypeOptions from '../../../data/shiftingType.json';
import { TDropdownItem } from '../../../type/TDropdownItem';
import Label from '../../../common/Label';
import DropdownComponent from '../../../common/DropdownComponent';
import Header from '../../../common/Header';
import Input from '../../../common/Input';
import { COLOR_BLACK, COLOR_BLUE } from '../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import CollapsibleView from '../../../common/CollapsibleView';
import shiftingTypes from '../../../data/shiftingType.json';
import Button from '../../../common/Button';
import liftStatusOptions from '../../../data/liftStatusOptions.json';
import floorOptions from '../../../data/floorOptions.json';
import {
  ENQUIRY_FORM_ACTION,
  enquiryReducer,
  initialState,
} from './enquiryReducer';

const AddEnquiryView: React.FC<{}> = ({ }) => {
  const [state, dispatch] = useReducer(enquiryReducer, initialState);
  const [shiftLugData, setshiftLugData] = useState<Object>({
    household: false,
    office: false,
    industrial: false,
    Other: false,
  });

  const handleShiftingType = (item: TDropdownItem) => {
    dispatch({
      type: ENQUIRY_FORM_ACTION.SHIFTING_TYPE,
      payload: item.label,
    });
  };

  const handleCompanyPartyNameInputTextChange = (text: String) => {
    dispatch({
      type: ENQUIRY_FORM_ACTION.COMPANY_NAME_PARTY,
      payload: text,
    });
  };

  const handlePartyNameInputTextChange = (text: string) => {
    dispatch({
      type: ENQUIRY_FORM_ACTION.PARTY_NAME,
      payload: text,
    });
  };

  const handleMobileNumInputTextChange = useCallback(
    (text: string) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.MOBILE_NUMBER,
        payload: text,
      });
    },
    [state.mobileNumber],
  );

  const handleShiftingLugInputTextChange = useCallback(() => {
    setshiftLugData({ ...shiftLugData });
    dispatch({
      type: ENQUIRY_FORM_ACTION.SHIFTING_LUGGAGE,
      payload: shiftLugData,
    });
  }, [state.shiftingLuggage]);

  const handlePickupPinCode = useCallback(
    (text: string) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_PINCODE,
        payload: text,
      });
    },
    [state.pickupPincode],
  );

  const handlePickupCity = useCallback(
    (item: TDropdownItem) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_CITY,
        payload: item.label,
      });
    },
    [state.pickupCity],
  );

  const handlePickupState = useCallback(
    (item: TDropdownItem) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_STATE,
        payload: item.label,
      });
    },
    [state.pickupState],
  );

  const handlePickupLocality = useCallback(
    (item: TDropdownItem) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_LOCALITY,
        payload: item.label,
      });
    },
    [state.pickupLocality],
  );

  const handlePickupAddress = useCallback(
    (text: string) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
        payload: text,
      });
    },
    [state.pickupAddress],
  );

  const handlePickupCurrentFloor = useCallback(
    (item: TDropdownItem) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_CURRENT_FLOOR,
        payload: item.label,
      });
    },
    [state.pickupCurrentFloor],
  );

  const handlePickupCurrentLiftStatus = useCallback(
    (item: TDropdownItem) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_CURRENT_LIFT_STATUS,
        payload: item.label,
      });
    },
    [state.pickupCurrentLiftStatus],
  );

  const handleDeliveryPinCode = useCallback(
    (text: string) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.DELIVERY_PINCODE,
        payload: text,
      });
    },
    [state.deliveryPincode],
  );

  const handleDeliveryCity = useCallback(
    (item: TDropdownItem) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.DELIVERY_CITY,
        payload: item.label,
      });
    },
    [state.deliveryCity],
  );

  const handleDeliveryState = useCallback(
    (item: TDropdownItem) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.DELIVERY_STATE,
        payload: item.label,
      });
    },
    [state.deliveryState],
  );

  const handleDeliveryLocality = useCallback(
    (item: TDropdownItem) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.DELIVERY_LOCALITY,
        payload: item.label,
      });
    },
    [state.deliveryLocality],
  );

  const handleDeliveryAddress = useCallback(
    (text: String) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.DELIVERY_ADDRESS,
        payload: text,
      });
    },
    [state.deliveryAddress],
  );

  const handleDeliveryCurrentFloor = useCallback(
    (item: TDropdownItem) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.DELIVERY_CURRENT_FLOOR,
        payload: item.label,
      });
    },
    [state.deliveryCurrentFloor],
  );

  const handleDeliveryCCurrentLiftStatus = useCallback(
    (item: TDropdownItem) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.DELIVERY_CURRENT_LIFT_STATUS,
        payload: item.label,
      });
    },
    [state.deliveryCurrentLiftStatus],
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
                onChangeText={handleCompanyPartyNameInputTextChange}
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
                onChangeText={handleMobileNumInputTextChange}
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
                }}
                style={{ marginRight: 15, marginBottom: 10 }}
                textContainerStyle={{ paddingLeft: 0 }}
                onPress={(isChecked: boolean) => {
                  shiftLugData.household = isChecked;
                  handleShiftingLugInputTextChange();
                }}
              />
              <BouncyCheckbox
                size={25}
                unfillColor="#FFFFFF"
                text="Office"
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
                }}
                style={{ marginRight: 15 }}
                textContainerStyle={{ paddingLeft: 0 }}
                onPress={(isChecked: boolean) => {
                  shiftLugData.office = isChecked;
                  handleShiftingLugInputTextChange();
                }}
              />
              <BouncyCheckbox
                size={25}
                unfillColor="#FFFFFF"
                text="Industrial"
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
                }}
                style={{ marginRight: 15 }}
                textContainerStyle={{ paddingLeft: 0 }}
                onPress={(isChecked: boolean) => {
                  shiftLugData.industrial = isChecked;
                  handleShiftingLugInputTextChange();
                }}
              />
              <BouncyCheckbox
                size={25}
                unfillColor="#FFFFFF"
                text="Vehcicle"
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
                }}
                style={{ marginRight: 15 }}
                textContainerStyle={{ paddingLeft: 0 }}
                onPress={(isChecked: boolean) => {
                  shiftLugData.Vehcicle = isChecked;
                  handleShiftingLugInputTextChange();
                }}
              />
              <BouncyCheckbox
                size={25}
                unfillColor="#FFFFFF"
                text="Other"
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
                }}
                style={{ marginRight: 15 }}
                textContainerStyle={{ paddingLeft: 0 }}
                onPress={(isChecked: boolean) => {
                  shiftLugData.Other = isChecked;
                  handleShiftingLugInputTextChange();
                }}
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
                onSelect={handlePickupCity}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="State" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handlePickupState}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Locality" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handlePickupLocality}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Address" style={styles.label} />
              <Input
                onChangeText={handlePickupAddress}
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
                  onSelect={handlePickupCurrentFloor}
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="Lift Status" style={styles.label} />
                <DropdownComponent
                  data={liftStatusOptions}
                  onSelect={handlePickupCurrentLiftStatus}
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
                onSelect={handleDeliveryCity}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="State" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handleDeliveryState}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Locality" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handleDeliveryLocality}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Address" style={styles.label} />
              <Input
                onChangeText={handleDeliveryAddress}
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
                  onSelect={handleDeliveryCurrentFloor}
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="Lift Status" style={styles.label} />
                <DropdownComponent
                  data={liftStatusOptions}
                  onSelect={handleDeliveryCCurrentLiftStatus}
                />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={12} />
        <Button
          text="SUBMIT"
          onPress={() => {
            console.log(state, 'submitted data');
          }}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={12} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default AddEnquiryView;
