import React, {useCallback, useReducer, useState} from 'react';
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
import {useAppDispatch} from '../../../redux/hooks';
import {addEnquiryRequest} from '../../../redux/slices/EnquirySlice';
import {IAddEnquiryRequest} from '../../../interface/enquiry/IAddEnquiryRequest';
import entityOptions from '../../../data/entityOptions.json';
import branchOptions from '../../../data/branchOptions.json';
import franchiseOptions from '../../../data/franchiseOptions.json';
import roleOptions from '../../../data/roleOptions.json';
import actionOptions from '../../../data/actionOptions.json';

const RoleManagementView: React.FC<{}> = ({}) => {
  const [state, dispatch] = useReducer(enquiryReducer, initialState);
  const [entityType, setEntityType] = useState<string>('1');
  const dispatched = useAppDispatch();

  const handleEntityType = (item: TDropdownItem) => {
    setEntityType(item.value);
  };

  const handleSubEntity = (item: TDropdownItem) => {
    const {billingBy} = state;
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

  const handleMobileNumInputTextChange = useCallback((text: string) => {
    dispatch({
      type: ENQUIRY_FORM_ACTION.MOBILE_NUMBER,
      payload: text,
    });
  }, []);

  const handleShiftingLugInputTextChange = useCallback(() => {
    // setshiftLugData({...shiftLugData});
    // dispatch({
    //   type: ENQUIRY_FORM_ACTION.SHIFTING_LUGGAGE,
    //   payload: shiftLugData,
    // });
  }, [state.shiftingLuggage]);

  const handlePickupPinCode = useCallback(
    (text: string) => {
      const {pickupAddress} = state;
      const tempObj = {
        ...pickupAddress,
        pincode: text,
      };

      // dispatch({
      //   type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
      //   payload: tempObj,
      // });
    },
    [state],
  );

  const handlePickupCity = useCallback(
    (item: TDropdownItem) => {
      const {pickupAddress} = state;
      const tempObj = {
        ...pickupAddress,
        city: item.label,
      };
      // dispatch({
      //   type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
      //   payload: tempObj,
      // });
    },
    [state],
  );

  const handlePickupState = useCallback(
    (item: TDropdownItem) => {
      const {pickupAddress} = state;
      const tempObj = {
        ...pickupAddress,
        state: item.label,
      };
      // dispatch({
      //   type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
      //   payload: tempObj,
      // });
    },
    [state],
  );

  const handlePickupAddress = useCallback(
    (text: string) => {
      const {pickupAddress} = state;
      const tempObj = {
        ...pickupAddress,
        address: text,
      };
      // dispatch({
      //   type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
      //   payload: tempObj,
      // });
    },
    [state],
  );

  const handlePickupCurrentFloor = useCallback(
    (item: TDropdownItem) => {
      const {pickupAddress} = state;
      const tempObj = {
        ...pickupAddress,
        floor: item.label,
      };
      // dispatch({
      //   type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
      //   payload: tempObj,
      // });
    },
    [state],
  );

  const handlePickupCurrentLiftStatus = useCallback(
    (item: TDropdownItem) => {
      const {pickupAddress} = state;
      const tempObj = {
        ...pickupAddress,
        isLiftAvailable: item.label,
      };
      // dispatch({
      //   type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
      //   payload: tempObj,
      // });
    },
    [state],
  );

  const handleDeliveryPinCode = useCallback(
    (text: string) => {
      const {dropAddress} = state;
      const tempObj = {
        ...dropAddress,
        pincode: text,
      };
      // dispatch({
      //   type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
      //   payload: tempObj,
      // });
    },
    [state],
  );

  const handleDeliveryCity = useCallback(
    (item: TDropdownItem) => {
      const {dropAddress} = state;
      const tempObj = {
        ...dropAddress,
        city: item.label,
      };
      // dispatch({
      //   type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
      //   payload: tempObj,
      // });
    },
    [state],
  );

  const handleDeliveryState = useCallback(
    (item: TDropdownItem) => {
      const {dropAddress} = state;
      const tempObj = {
        ...dropAddress,
        state: item.label,
      };
      // dispatch({
      //   type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
      //   payload: tempObj,
      // });
    },
    [state],
  );

  const handleDeliveryAddress = useCallback(
    (text: String) => {
      const {dropAddress} = state;
      const tempObj = {
        ...dropAddress,
        address: text,
      };
      // dispatch({
      //   type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
      //   payload: tempObj as string,
      // });
    },
    [state],
  );

  const handleDeliveryCurrentFloor = useCallback(
    (item: TDropdownItem) => {
      const {dropAddress} = state;
      const tempObj = {
        ...dropAddress,
        floor: item.label,
      };
      // dispatch({
      //   type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
      //   payload: tempObj,
      // });
    },
    [state],
  );

  const handleDeliveryCCurrentLiftStatus = useCallback(
    (item: TDropdownItem) => {
      const {dropAddress} = state;
      const tempObj = {
        ...dropAddress,
        isLiftAvailable: item.label,
      };
      // dispatch({
      //   type: ENQUIRY_FORM_ACTION.DELIVERY_CURRENT_LIFT_STATUS,
      //   payload: tempObj,
      // });
    },
    [state],
  );

  const handleSubmit = useCallback(() => {
    // const payload: IAddEnquiryRequest = state;
    // console.log(payload, 'payload..');
    // dispatched(addEnquiryRequest(payload));
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
              const {billingBy} = state;
              const tempObj = {
                ...billingBy,
                billing_info: {...billingBy?.billing_info, company_name: text},
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
              const {billingBy} = state;
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
              const {billingBy} = state;
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
              const {billingBy} = state;
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
              const {billingBy} = state;
              const tempObj = {
                ...billingBy,
                billing_info: {...billingBy?.billing_info, company_gst: text},
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
              const {billingBy} = state;
              const tempObj = {
                ...billingBy,
                billing_info: {...billingBy?.billing_info, employee_name: text},
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
              const {billingBy} = state;
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
              const {billingBy} = state;
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
              const {billingBy} = state;
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

  const getSubEntityDropdownOptionsLabel = () => {
    let label = '';
    if (entityType == '2') {
      label = 'Branch Name';
    } else if (entityType == '3') {
      label = 'Franchise Name';
    }
    return label;
  };

  const getSubEntityDropdownOptions = () => {
    let options: TDropdownItem[] = [];
    if (entityType == '2') {
      options = branchOptions;
    } else if (entityType == '3') {
      options = franchiseOptions;
    }
    return options;
  };

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Header label="Role Management" canGoBack={true} />
        <Spacer height={4} />
        <CollapsibleView title="GENERAL INFO" collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
              <Label text="Choose Entity Type" style={styles.label} />
              <DropdownComponent
                data={entityOptions}
                onSelect={handleEntityType}
              />
            </View>
            {entityType == '2' || entityType == '3' ? (
              <>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                  <Label
                    text={getSubEntityDropdownOptionsLabel()}
                    style={styles.label}
                  />
                  <DropdownComponent
                    data={getSubEntityDropdownOptions()}
                    onSelect={handleSubEntity}
                  />
                </View>
              </>
            ) : null}
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Employee Name" style={styles.label} />
              <Input
                onChangeText={handlePartyNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Mobile Number" style={styles.label} />
              <Input
                onChangeText={handleMobileNumInputTextChange}
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
              <Label text="Create Username" style={styles.label} />
              <Input
                onChangeText={handleMobileNumInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Create Password" style={styles.label} />
              <Input
                onChangeText={handlePartyNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Role Type" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {roleOptions.map((role, index) => {
                return (
                  <BouncyCheckbox
                    text={role.role}
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
                    onPress={(isChecked: boolean) => {
                      // shiftLugData.household = isChecked;
                      handleShiftingLugInputTextChange();
                    }}
                  />
                );
              })}
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Label text="Allow Permissions" style={styles.label} />
        </View>
        <Spacer height={4} />
        <CollapsibleView title="ENQUIRY MANAGEMENT" collapsed={true}>
          <View>
            <View style={styles.labelContainer}>
              <Label text="Enquiry" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
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
                    onPress={(isChecked: boolean) => {
                      // shiftLugData.household = isChecked;
                      handleShiftingLugInputTextChange();
                    }}
                  />
                );
              })}
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Follow-Ups" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
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
                    onPress={(isChecked: boolean) => {
                      // shiftLugData.household = isChecked;
                      handleShiftingLugInputTextChange();
                    }}
                  />
                );
              })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Survey" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
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
                      onPress={(isChecked: boolean) => {
                        // shiftLugData.household = isChecked;
                        handleShiftingLugInputTextChange();
                      }}
                    />
                  );
                })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Quotation" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
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
                    onPress={(isChecked: boolean) => {
                      // shiftLugData.household = isChecked;
                      handleShiftingLugInputTextChange();
                    }}
                  />
                );
              })}
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="ORDER MANAGEMENT" collapsed={true}>
          <View>
            <View style={styles.labelContainer}>
              <Label text="Order" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.slice(0, actionOptions.length - 1).map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
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
                    onPress={(isChecked: boolean) => {
                      // shiftLugData.household = isChecked;
                      handleShiftingLugInputTextChange();
                    }}
                  />
                );
              })}
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Money Receipt" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.slice(0, actionOptions.length - 1).map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
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
                    onPress={(isChecked: boolean) => {
                      // shiftLugData.household = isChecked;
                      handleShiftingLugInputTextChange();
                    }}
                  />
                );
              })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Car Condition" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
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
                      onPress={(isChecked: boolean) => {
                        // shiftLugData.household = isChecked;
                        handleShiftingLugInputTextChange();
                      }}
                    />
                  );
                })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Bilty" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.slice(0, actionOptions.length - 1).map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
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
                    onPress={(isChecked: boolean) => {
                      // shiftLugData.household = isChecked;
                      handleShiftingLugInputTextChange();
                    }}
                  />
                );
              })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Invoice" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.slice(0, actionOptions.length - 1).map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
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
                    onPress={(isChecked: boolean) => {
                      // shiftLugData.household = isChecked;
                      handleShiftingLugInputTextChange();
                    }}
                  />
                );
              })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Order Status" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.slice(0, actionOptions.length - 1).map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
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
                    onPress={(isChecked: boolean) => {
                      // shiftLugData.household = isChecked;
                      handleShiftingLugInputTextChange();
                    }}
                  />
                );
              })}
            </View>
          </View>
        </CollapsibleView>
        <CollapsibleView title="CUSTOMER MANAGEMENT" collapsed={true}>
        <View>
            <View style={styles.labelContainer}>
              <Label text="Contact Details" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.slice(0, actionOptions.length - 1).map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
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
                    onPress={(isChecked: boolean) => {
                      // shiftLugData.household = isChecked;
                      handleShiftingLugInputTextChange();
                    }}
                  />
                );
              })}
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Order Details" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.slice(0, actionOptions.length - 1).map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
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
                    onPress={(isChecked: boolean) => {
                      // shiftLugData.household = isChecked;
                      handleShiftingLugInputTextChange();
                    }}
                  />
                );
              })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Car Condition" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions
                .slice(0, actionOptions.length - 1)
                .map((item, index) => {
                  return (
                    <BouncyCheckbox
                      text={item.action}
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
                      onPress={(isChecked: boolean) => {
                        // shiftLugData.household = isChecked;
                        handleShiftingLugInputTextChange();
                      }}
                    />
                  );
                })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Bilty" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.slice(0, actionOptions.length - 1).map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
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
                    onPress={(isChecked: boolean) => {
                      // shiftLugData.household = isChecked;
                      handleShiftingLugInputTextChange();
                    }}
                  />
                );
              })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Invoice" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.slice(0, actionOptions.length - 1).map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
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
                    onPress={(isChecked: boolean) => {
                      // shiftLugData.household = isChecked;
                      handleShiftingLugInputTextChange();
                    }}
                  />
                );
              })}
            </View>
            <View style={styles.labelContainer}>
              <Label text="Order Status" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {actionOptions.slice(0, actionOptions.length - 1).map((item, index) => {
                return (
                  <BouncyCheckbox
                    text={item.action}
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
                    onPress={(isChecked: boolean) => {
                      // shiftLugData.household = isChecked;
                      handleShiftingLugInputTextChange();
                    }}
                  />
                );
              })}
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

export default RoleManagementView;
