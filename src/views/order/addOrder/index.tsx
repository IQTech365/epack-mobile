import React, {useCallback, useReducer} from 'react';
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
import DatePickerComponent from '../../../common/DatePickerComponent';
import liftStatusOptions from '../../../data/liftStatusOptions.json';
import floorOptions from '../../../data/floorOptions.json';
import {initialState, addOrderReducer} from './addOrderReducer';

const AddOrderView: React.FC<{}> = ({}) => {
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


  const handleQuotationDate = (date: Date) => {
    // dispatch({
    //   type: QUOTATION_FORM_ACTION.DATE_OF_QUOTATION,
    //   payload: formatDate(date),
    // });
  };

  // const handleShiftingType = (item: TDropdownItem) => {
  //   // dispatch({
  //   //   type: ADDORDER_FORM_ACTION.SHIFTING_TYPE,
  //   //   payload: item.label,
  //   // }); 
  // };

  const handleDateOfMoving = (date: Date) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.DATE_OF_MOVING,
    //   payload: formatDate(date),
    // });
  };
  const handlePartyName = (text: string) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.PARTY_NAME,
    //   payload: text,
    // });
  };
  const handleMobile = (text: string) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.MOBILE,
    //   payload: text,
    // });
  };
  const handlePartyCompanyName = (text: string) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.PARTY_COMPANY_NAME,
    //   payload: text,
    // });
  };
  const handleOrderAmount = (text: string) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.ORDER_AMOUNT,
    //   payload: text,
    // });
  };
  const handleTokenAmount = (text: string) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.TOKEN_AMOUNT,
    //   payload: text,
    // });
  };
  const handleDateOfQuotation = (date: Date) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.DATE_OF_QUOTATION,
    //   payload: formatDate(date),
    // });
  };

  //***Pickup Address***//
  const handlePickupPinCode = useCallback(
    (text: string) => {
      // dispatch({
      //   type: ADDORDER_FORM_ACTION.PICKUP_PINCODE,
      //   payload: text,
      // });
    },
    [state.pickupPincode],
  );
  const handlePickupCity = (item: TDropdownItem) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.PICKUP_CITY,
    //   payload: item.label,
    // }); 
  };
  const handlePickupState = (item: TDropdownItem) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.PICKUP_STATE,
    //   payload: item.label,
    // }); 
  };
  const handlePickupLocality = (item: TDropdownItem) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.PICKUP_LOCALITY,
    //   payload: item.label,
    // }); 
  };
  const handlePickupAddress = useCallback(
    (text: string) => {
      // dispatch({
      //   type: ADDORDER_FORM_ACTION.PICKUP_ADDRESS,
      //   payload: text,
      // });
    },
    [state.pickupPincode],
  );
  const handlePickupCurrentFloor = (item: TDropdownItem) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.PICKUP_CURRENT_FLOOR,
    //   payload: item.label,
    // }); 
  };
  const handlePickupLiftStatus = (item: TDropdownItem) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.PICKUP_LIFT_STATUS,
    //   payload: item.label,
    // }); 
  };

  //***Delivery Address***//
  const handleDeliveryPinCode = useCallback(
    (text: string) => {
      // dispatch({
      //   type: ADDORDER_FORM_ACTION.DELIVERY_PINCODE,
      //   payload: text,
      // });
    },
    [state.deliveryPincode],
  );
  const handleDeliveryCity = (item: TDropdownItem) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.DELIVERY_CITY,
    //   payload: item.label,
    // }); 
  };
  const handleDeliveryState = (item: TDropdownItem) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.DELIVERY_STATE,
    //   payload: item.label,
    // }); 
  };
  const handleDeliveryLocality = (item: TDropdownItem) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.DELIVERY_LOCALITY,
    //   payload: item.label,
    // }); 
  };
  const handleDeliveryAddress = useCallback(
    (text: string) => {
      // dispatch({
      //   type: ADDORDER_FORM_ACTION.DELIVERY_ADDRESS,
      //   payload: text,
      // });
    },
    [state.deliveryPincode],
  );
  
  const handleDeliveryCurrentFloor = (item: TDropdownItem) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.DELIVERY_CURRENT_FLOOR,
    //   payload: item.label,
    // }); 
  };
  const handleDeliveryLiftStatus = (item: TDropdownItem) => {
    // dispatch({
    //   type: ADDORDER_FORM_ACTION.DELIVERY_LIFT_STATUS,
    //   payload: item.label,
    // }); 
  };

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Header label="ADD ORDER" canGoBack={true} />
        <Spacer height={4} />
        <CollapsibleView title="GENERAL INFO" collapsed={false}>
          <View>
            <View style={styles.mainWrapper}>
              <View style={styles.textContainer}>
                <Label text="Shifting Type" style={styles.label} />
                <DropdownComponent
                  data={shiftingTypeOptions}
                  onSelect={handleShiftingType}
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="Date of Moving" style={styles.label} />
                <DatePickerComponent onDateSelect={handleDateOfMoving} />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Party Name" style={styles.label} />
              <Input
                onChangeText={handlePartyName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Mobile" style={styles.label} />
              <Input
                onChangeText={handleMobile}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Party Company Name" style={styles.label} />
              <Input
                onChangeText={handlePartyCompanyName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.mainWrapper}>
              <View style={styles.textContainer}>
                <Label text="Order Amount" style={styles.label} />
                <Input
                  onChangeText={handlePartyNameInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="Token Amount" style={styles.label} />
                <Input
                  onChangeText={handlePartyNameInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Shifting Luggage" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              <BouncyCheckbox
                size={25}
                unfillColor="#FFFFFF"
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
                style={{marginRight: 15, marginBottom: 10}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {}}
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
                style={{marginRight: 15}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {}}
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
                style={{marginRight: 15}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {}}
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
                style={{marginRight: 15}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {}}
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
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="State" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handlePickupState}
              />
            </View>
            <View style={styles.elementContainer}>
              <Label text="City" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handlePickupLocality}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Address" style={styles.label} />
              <Input
                onChangeText={(handlePickupAddress) => {}}
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
                  onSelect={handlePickupLiftStatus}
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
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="State" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handleDeliveryState}
              />
            </View>
            <View style={styles.elementContainer}>
              <Label text="City" style={styles.label} />
              <DropdownComponent
                data={shiftingTypes}
                onSelect={handleDeliveryLocality}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Address" style={styles.label} />
              <Input
                onChangeText={(handleDeliveryAddress) => {}}
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
                  onSelect={handleDeliveryLiftStatus}
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

export default AddOrderView;
