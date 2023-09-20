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
import billingByOptions from '../../../data/billingByOptions.json';
import Button from '../../../common/Button';
import liftStatusOptions from '../../../data/liftStatusOptions.json';
import floorOptions from '../../../data/floorOptions.json';
import approvalAuthorityOptions from '../../../data/ApprovalAuthorityOptions.json';
import {
  ENQUIRY_FORM_ACTION,
  TBillingBy,
  enquiryReducer,
  initialState,
} from './enquiryReducer';
import { useAppDispatch } from '../../../redux/hooks';
import { addEnquiryRequest } from '../../../redux/slices/EnquirySlice';
import { IAddEnquiryRequest } from '../../../interface/enquiry/IAddEnquiryRequest';

const AddEnquiryView: React.FC<{}> = ({ }) => {
  const [state, dispatch] = useReducer(enquiryReducer, initialState);
  const [billingBy, setBillingBy] = useState<string>('1');
  const dispatched = useAppDispatch();

  const handleShiftingType = (item: TDropdownItem) => {
    dispatch({
      type: ENQUIRY_FORM_ACTION.SHIFTING_TYPE,
      payload: item.label,
    });
  };

  const handleBillingBy = (item: TDropdownItem) => {
    const { billingBy } = state;
    const tempObj = {
      ...billingBy,
      billing_by: item.label,
      billing_info: null,
    };
    dispatch({
      type: ENQUIRY_FORM_ACTION.BILLING_BY,
      payload: tempObj as TBillingBy,
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
    // setshiftLugData({...shiftLugData});
    // dispatch({
    //   type: ENQUIRY_FORM_ACTION.SHIFTING_LUGGAGE,
    //   payload: shiftLugData,
    // });
  }, [state.shiftingLuggage]);

  const handlePickupPinCode = useCallback(
    (text: string) => {
      const { pickupAddress } = state;
      const tempObj = {
        ...pickupAddress,
        pincode: text,
      };

      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
        payload: tempObj,
      });
    },
    [state],
  );

  const handlePickupCity = useCallback(
    (item: TDropdownItem) => {
      const { pickupAddress } = state;
      const tempObj = {
        ...pickupAddress,
        city: item.label,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
        payload: tempObj,
      });
    },
    [state],
  );

  const handlePickupState = useCallback(
    (item: TDropdownItem) => {
      const { pickupAddress } = state;
      const tempObj = {
        ...pickupAddress,
        state: item.label,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
        payload: tempObj,
      });
    },
    [state],
  );

  const handlePickupAddress = useCallback(
    (text: string) => {
      const { pickupAddress } = state;
      const tempObj = {
        ...pickupAddress,
        address: text,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
        payload: tempObj,
      });
    },
    [state],
  );

  const handlePickupCurrentFloor = useCallback(
    (item: TDropdownItem) => {
      const { pickupAddress } = state;
      const tempObj = {
        ...pickupAddress,
        floor: item.label,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
        payload: tempObj,
      });
    },
    [state],
  );

  const handlePickupCurrentLiftStatus = useCallback(
    (item: TDropdownItem) => {
      const { pickupAddress } = state;
      const tempObj = {
        ...pickupAddress,
        isLiftAvailable: item.label,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
        payload: tempObj,
      });
    },
    [state],
  );

  const handleDeliveryPinCode = useCallback(
    (text: string) => {
      const { dropAddress } = state;
      const tempObj = {
        ...dropAddress,
        pincode: text,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
        payload: tempObj,
      });
    },
    [state],
  );

  const handleDeliveryCity = useCallback(
    (item: TDropdownItem) => {
      const { dropAddress } = state;
      const tempObj = {
        ...dropAddress,
        city: item.label,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
        payload: tempObj,
      });
    },
    [state],
  );

  const handleDeliveryState = useCallback(
    (item: TDropdownItem) => {
      const { dropAddress } = state;
      const tempObj = {
        ...dropAddress,
        state: item.label,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
        payload: tempObj,
      });
    },
    [state],
  );

  const handleDeliveryAddress = useCallback(
    (text: String) => {
      const { dropAddress } = state;
      const tempObj = {
        ...dropAddress,
        address: text,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
        payload: tempObj as string,
      });
    },
    [state],
  );

  const handleDeliveryCurrentFloor = useCallback(
    (item: TDropdownItem) => {
      const { dropAddress } = state;
      const tempObj = {
        ...dropAddress,
        floor: item.label,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
        payload: tempObj,
      });
    },
    [state],
  );

  const handleDeliveryCCurrentLiftStatus = useCallback(
    (item: TDropdownItem) => {
      const { dropAddress } = state;
      const tempObj = {
        ...dropAddress,
        isLiftAvailable: item.label,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.DELIVERY_CURRENT_LIFT_STATUS,
        payload: tempObj,
      });
    },
    [state],
  );

  const handleSubmit = useCallback(() => {
    const payload: IAddEnquiryRequest = state;
    console.log(payload, 'payload..');

    dispatched(addEnquiryRequest(payload));
  }, [state]);

  const showBillingByIndividualView = () => {
    if (state.billingBy?.billing_by == 'Billing by Company') return null;
    return (
      <>
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
          <Label text="Mobile Number *" style={styles.label} />
          <Input
            onChangeText={handleMobileNumInputTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
      </>
    );
  };

  const showBillingByCompanyView = () => {
    if (state.billingBy?.billing_by == 'Billing By Individual') return null;
    return (
      <>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Company Name" style={styles.label} />
          <Input
            onChangeText={(text: string) => {
              const { billingBy } = state;
              const tempObj = {
                ...billingBy,
                billing_info: { ...billingBy?.billing_info, company_name: text },
              };
              dispatch({
                type: ENQUIRY_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
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
                type: ENQUIRY_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
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
                type: ENQUIRY_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
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
                type: ENQUIRY_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Company GST" style={styles.label} />
          <Input
            onChangeText={(text: string) => {
              const { billingBy } = state;
              const tempObj = {
                ...billingBy,
                billing_info: { ...billingBy?.billing_info, company_gst: text },
              };
              dispatch({
                type: ENQUIRY_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Employee Name" style={styles.label} />
          <Input
            onChangeText={(text: string) => {
              const { billingBy } = state;
              const tempObj = {
                ...billingBy,
                billing_info: { ...billingBy?.billing_info, employee_name: text },
              };
              dispatch({
                type: ENQUIRY_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
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
                type: ENQUIRY_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
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
                type: ENQUIRY_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
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
                type: ENQUIRY_FORM_ACTION.BILLING_BY,
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

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Header label="ADD ENQUIRY " canGoBack={true} />
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
              <Label text="Billing By" style={styles.label} />
              <DropdownComponent
                data={billingByOptions}
                onSelect={handleBillingBy}
              />
            </View>
            <Spacer height={4} />
            {showBillingByIndividualView()}
            {showBillingByCompanyView()}
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
                  // shiftLugData.household = isChecked;
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
                  // shiftLugData.office = isChecked;
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
                  // shiftLugData.industrial = isChecked;
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
                  // shiftLugData.Vehcicle = isChecked;
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
                  // shiftLugData.Other = isChecked;
                  handleShiftingLugInputTextChange();
                }}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        {/* <CollapsibleView title="BILLING DETAILS" collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
              <Label text="Company Name" style={styles.label} />
              <Input containerStyle={styles.inputContainer} onChangeText={() => {}} />
            </View>
            <View style={styles.elementContainer}>
              <Label text="Approval Authority" style={styles.label} />
              <DropdownComponent
                data={shiftingTypeOptions}
                onSelect={handleShiftingType}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Authoority Person Name" style={styles.label} />
              <Input
                onChangeText={handleCompanyPartyNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Authority Person Mobile" style={styles.label} />
              <Input
                onChangeText={handlePartyNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.elementContainer}>
                <Label text="Address" style={styles.label} />
                <Input
                  onChangeText={handlePickupAddress}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Company GST" style={styles.label} />
              <Input
                onChangeText={handlePickupAddress}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Employee Name" style={styles.label} />
              <Input
                onChangeText={handlePickupAddress}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Employee Designation" style={styles.label} />
              <Input
                onChangeText={handlePickupAddress}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Emplyee Mobile No" style={styles.label} />
              <Input
                onChangeText={handlePickupAddress}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </View>
        </CollapsibleView> */}
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
                onSelect={handlePickupCity}
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
                onSelect={handleDeliveryCity}
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
          onPress={handleSubmit}
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
