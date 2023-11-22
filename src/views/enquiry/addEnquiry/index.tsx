import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
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
  TPickupAddressInfo,
  TDropAddressInfo,
} from './enquiryReducer';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {
  addEnquiryRequest,
  getEnquiriesRequest,
  resetAddEnquiryRequest,
} from '../../../redux/slices/EnquirySlice';
import {IAddEnquiryRequest} from '../../../interface/enquiry/IAddEnquiryRequest';
import usePincodeHook, {
  PINCODE_REQUEST_KEY,
} from '../../../hooks/usePincodeHook';
import {getCities, getStates} from '../../../utils/formatter';
import shiftingLuggageOptions from '../../../data/shiftingLuggage.json';
import Spinner from '../../../common/Spinner';
import Toast from 'react-native-toast-message';
import {NavigationProp} from '@react-navigation/native';
import EpackDropdown from '../../../common/DropdownComponent2';
import useCompanyId from '../../../hooks/useCompanyId';
import { Validator } from '../../../utils/validation';

interface IAddEnquiryViewProps {
  navigation: NavigationProp<any, any>;
}

const AddEnquiryView: React.FC<IAddEnquiryViewProps> = ({navigation}) => {
  const [state, dispatch] = useReducer(enquiryReducer, initialState);
  const [pincodeRequestKey, setPincodeRequestKey] =
    useState<PINCODE_REQUEST_KEY>(
      PINCODE_REQUEST_KEY.ADD_ENQUIRY_PICKUP_ADDRESS,
    );
  const [pickupStates, setPickupStates] = useState<TDropdownItem[]>([]);
  const [pickupCities, setPickupCities] = useState<TDropdownItem[]>([]);
  const [deliveryStates, setDeliveryStates] = useState<TDropdownItem[]>([]);
  const [deliveryCities, setDeliveryCities] = useState<TDropdownItem[]>([]);
  const dispatch2 = useAppDispatch();
  const {
    addEnquiryRequesting,
    addEnquirySuccess,
    addEnquiryFailure,
  } = useAppSelector(state => state.Enquiry);
  const {otpData} = useAppSelector(state => state.OTP);
  const companyId = useCompanyId();

  const pickupCityDropdownRef = useRef(null);
  const pickupStateDropwdownRef = useRef(null);
  const dropStateDropdownRef = useRef(null);
  const dropCityDropdownRef = useRef(null);

  const [errors, setErrors] = useState();
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const setPincodeError = () => {
    dispatch({
      type: ENQUIRY_FORM_ACTION.PICKUP_PINCODE_ERROR,
      payload: 'Invalid PIN Code',
    });
  };

  const resetPincodeError = () => {
    dispatch({
      type: ENQUIRY_FORM_ACTION.PICKUP_PINCODE_ERROR,
      payload: '',
    });
  };
  const {result, fetching, setPincode} = usePincodeHook(
    setPincodeError,
    resetPincodeError,
  );

  const handleShiftingType = (item: TDropdownItem) => {
    dispatch({
      type: ENQUIRY_FORM_ACTION.SHIFTING_TYPE,
      payload: item.label,
    });
  };

  const handleBillingBy = (item: TDropdownItem) => {
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

  const handleMobileNumInputTextChange = useCallback(
    (text: string) => {
      dispatch({
        type: ENQUIRY_FORM_ACTION.MOBILE_NUMBER,
        payload: text,
      });
    },
    [state.mobile],
  );

  const handleShiftingLugInputTextChange = useCallback(
    (isChecked: boolean, value: string) => {
      const {shiftingLuggage} = state;
      let tempObj = [...shiftingLuggage];
      const itemIndex = tempObj.findIndex(e => e == value);
      if (itemIndex == -1 && isChecked) {
        tempObj.push(value);
      } else if (itemIndex != -1 && !isChecked) {
        tempObj = tempObj.filter(e => e != value);
      }
      dispatch({
        type: ENQUIRY_FORM_ACTION.SHIFTING_LUGGAGE,
        payload: tempObj as [string],
      });
    },
    [state.shiftingLuggage],
  );

  const handlePickupPinCode = useCallback(
    (text: string) => {
      setPincodeRequestKey(PINCODE_REQUEST_KEY.ADD_ENQUIRY_PICKUP_ADDRESS);
      setPincode(text);
      const {pickupAddress} = state;
      const tempObj = {
        ...pickupAddress,
        pincode: text,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
        payload: tempObj as TPickupAddressInfo,
      });
    },
    [state.pickupAddress],
  );

  const handlePickupCity = useCallback(
    (item: string) => {
      const {pickupAddress} = state;
      const tempObj = {
        ...pickupAddress,
        city: item,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
        payload: tempObj as TPickupAddressInfo,
      });
    },
    [state],
  );

  const handlePickupState = useCallback(
    (item: string) => {
      const {pickupAddress} = state;
      const tempObj = {
        ...pickupAddress,
        state: item,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
        payload: tempObj as TPickupAddressInfo,
      });
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
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
        payload: tempObj as TPickupAddressInfo,
      });
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
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
        payload: tempObj as TPickupAddressInfo,
      });
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
      dispatch({
        type: ENQUIRY_FORM_ACTION.PICKUP_ADDRESS,
        payload: tempObj as TPickupAddressInfo,
      });
    },
    [state],
  );

  const handleDeliveryPinCode = useCallback(
    (text: string) => {
      setPincodeRequestKey(PINCODE_REQUEST_KEY.ADD_ENQUIRY_DELIVERY_ADDRESS);
      setPincode(text);
      const {dropAddress} = state;
      const tempObj = {
        ...dropAddress,
        pincode: text,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
        payload: tempObj as TDropAddressInfo,
      });
    },
    [state.dropAddress],
  );

  const handleDeliveryCity = useCallback(
    (item: string) => {
      const {dropAddress} = state;
      const tempObj = {
        ...dropAddress,
        city: item,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
        payload: tempObj as TDropAddressInfo,
      });
    },
    [state],
  );

  const handleDeliveryState = useCallback(
    (item: string) => {
      const {dropAddress} = state;
      const tempObj = {
        ...dropAddress,
        state: item,
      };
      dispatch({
        type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
        payload: tempObj as TDropAddressInfo,
      });
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
      dispatch({
        type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
        payload: tempObj as TDropAddressInfo,
      });
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
      dispatch({
        type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
        payload: tempObj as TDropAddressInfo,
      });
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
      dispatch({
        type: ENQUIRY_FORM_ACTION.DROP_ADDRESS,
        payload: tempObj as TDropAddressInfo,
      });
    },
    [state],
  );

  useEffect(() => {
    if (result && result.Status != 'Error') {
      if (
        pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_ENQUIRY_PICKUP_ADDRESS
      ) {
        setPickupStates(getStates(result));
        setPickupCities(getCities(result));
      } else if (
        pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_ENQUIRY_DELIVERY_ADDRESS
      ) {
        setDeliveryStates(getStates(result));
        setDeliveryCities(getCities(result));
      }
    }
  }, [result]);

  const validateForm = () => {
    let errors:any = {};
    if(state.billingBy?.billing_by == 'by Company') {
      console.log('inside--if');
      
      if(!state.billingBy?.billing_info?.company_name) {
        errors.companyName = "Company name required";
      }
  
      if(!state.billingBy?.billing_info?.employee_name) {
        errors.employeeName = "Employee name required";
      }
  
      if(!state.billingBy?.billing_info?.employee_mobile_number) {
        errors.employeeMobile = "Employee mobile number required";
      } else if(!Validator.mobile(state.billingBy?.billing_info?.employee_mobile_number)) {
        errors.employeeMobile = "Mobile number invalid";
      }
    } else if(state.billingBy?.billing_by == 'by Individual') {
      console.log('inside--else');
      if(!state.partyName) {
        errors.partyName = "Party name required";
      }
      if(!state.mobile) {
        errors.mobile = "Mobile number required";
      } else if(!Validator.mobile(state.mobile)) {
        errors.mobile = "Mobile number invalid";
      }
    }
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }

  useEffect(() => {
    setShowErrors(false);
    validateForm();
  }, [
    state.billingBy?.billing_by,
    state.partyName,
    state.mobile,
    state.billingBy?.billing_info?.company_name,
    state.billingBy?.billing_info?.employee_name,
    state.billingBy?.billing_info?.employee_mobile_number,
  ]);

  useEffect(() => {
    if (
      pickupStates &&
      pickupCities &&
      pickupCityDropdownRef &&
      pickupStateDropwdownRef &&
      pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_ENQUIRY_PICKUP_ADDRESS
    ) {
      //@ts-ignore
      pickupStateDropwdownRef?.current?.setValue(pickupStates[0]?.label);
      //@ts-ignore
      pickupCityDropdownRef?.current?.setValue(pickupCities[0]?.label);
    }
  }, [pickupStates, pickupCities]);

  useEffect(() => {
    if (
      deliveryStates &&
      deliveryCities &&
      dropStateDropdownRef &&
      dropCityDropdownRef &&
      pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_ENQUIRY_DELIVERY_ADDRESS
    ) {
      //@ts-ignore
      dropStateDropdownRef?.current?.setValue(deliveryStates[0]?.label);
      //@ts-ignore
      dropCityDropdownRef?.current?.setValue(deliveryCities[0]?.label);
    }
  }, [deliveryStates, deliveryCities]);

  useEffect(() => {
    if (!addEnquiryRequesting && addEnquirySuccess) {
      Toast.show({
        type: 'success',
        text1: 'Enquriy',
        text2: 'Enquiry has been added successfully',
      });
      dispatch2(resetAddEnquiryRequest());
      dispatch2(getEnquiriesRequest(companyId));
      navigation.goBack();
    } else if (!addEnquiryRequesting && addEnquiryFailure) {
      Toast.show({
        type: 'error',
        text1: 'Enquriy',
        text2: 'Error in adding enquiry. Please try again!',
      });
      dispatch2(resetAddEnquiryRequest());
    }
  }, [addEnquiryRequesting, addEnquirySuccess, addEnquiryFailure]);

  const handleSubmit = useCallback(() => {
    setShowErrors(true);
    console.log('Enquiry-Form-errors--', JSON.stringify(errors));
    
    if(!isFormValid) {
      Toast.show({
        type: 'error',
        text1: 'Form',
        text2: 'Form data is not valid. Please correct!',
      });
      return;
    }
    
    const payload: IAddEnquiryRequest = {
      companyId: companyId,
      authId: otpData?.data.id as string,
      enquiryManager: '',
      shiftingType: state.shiftingType.toUpperCase(),
      partyCompanyName: '',
      partyName: state.partyName,
      email: '',
      mobile: state.mobile,
      phone: '',
      shiftingLuggage: state.shiftingLuggage as [string],
      enquirySource: '',
      gstNumber: state.billingBy?.billing_info?.company_gst as string,
      alternateNumbers: '',
      shiftingDate: '',
      pickupAddress: {
        shiftingFrom: state.pickupAddress?.city as string || pickupCities[0]?.label,
        state: state.pickupAddress?.state as string || pickupStates[0]?.label,
        city: state.pickupAddress?.city as string || pickupCities[0]?.label,
        address: state.pickupAddress?.address as string,
        pincode: state.pickupAddress?.pincode as string,
        landmark: state.pickupAddress?.landmark as string,
        floor: state.pickupAddress?.floor as string,
        isLiftAvailable:
          state.pickupAddress?.isLiftAvailable.toLocaleUpperCase() as string,
      },
      dropAddress: {
        shiftingTo: state.dropAddress?.city as string || deliveryCities[0]?.label,
        state: state.dropAddress?.state as string || deliveryStates[0]?.label,
        city: state.dropAddress?.city as string || deliveryCities[0]?.label,
        address: state.dropAddress?.address as string,
        pincode: state.dropAddress?.pincode as string,
        landmark: state.dropAddress?.landmark as string,
        floor: state.dropAddress?.floor as string,
        isLiftAvailable:
          state.dropAddress?.isLiftAvailable.toLocaleUpperCase() as string,
      },
      billingBy: state.billingBy?.billing_by as string,
      billingDetails: {
        companyName: state.billingBy?.billing_info?.company_name as string,
        approvalAuthority: state.billingBy?.billing_info
          ?.approval_authority as string || approvalAuthorityOptions[0].label,
        authorityPersonName: state.billingBy?.billing_info
          ?.authority_person_name as string,
        authorityPersonMobile: state.billingBy?.billing_info
          ?.authority_mobile_number as string,
        companyAddress: state.billingBy?.billing_info
          ?.company_address as string,
        companyGST: state.billingBy?.billing_info?.company_gst as string,
        employeeName: state.billingBy?.billing_info?.employee_name as string,
        employeeDesignation: state.billingBy?.billing_info
          ?.employee_designation as string,
        employeeMobile: state.billingBy?.billing_info
          ?.employee_mobile_number as string,
      },
      status: 'NEW',
    };
    dispatch2(addEnquiryRequest(payload));
  }, [state]);

  const showBillingByIndividualView = () => {
    if (state.billingBy?.billing_by == 'by Company') return null;
    return (
      <>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Party Name" style={styles.label} required={true} />
          <Input
            onChangeText={handlePartyNameInputTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            //@ts-ignore
            error={showErrors ? errors?.partyName : ''}
            type='text'
            required={true}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Mobile Number" style={styles.label} required={true} />
          <Input
            onChangeText={handleMobileNumInputTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            inputType='numeric'
            selectionColor={COLOR_BLACK}
            //@ts-ignore
            error={showErrors ? errors?.mobile : ''}
            required={true}
            type='mobile'
          />
        </View>
      </>
    );
  };

  const showBillingByCompanyView = () => {
    if (state.billingBy?.billing_by == 'by Individual') return null;
    return (
      <>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Company Name" style={styles.label} required={true} />
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
            required={true}
            type='text'
            //@ts-ignore
            error={showErrors ? errors?.companyName : ''}
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
            inputType='numeric'
            type='mobile'
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
                billing_info: {...billingBy?.billing_info, company_gst: text.toUpperCase()},
              };
              dispatch({
                type: ENQUIRY_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            autoCapitalize="characters"
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Employee Name" style={styles.label} required={true} />
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
            //@ts-ignore
            error={showErrors ? errors?.employeeName : ''}
            type='text'
            required={true}
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
          <Label text="Employee Mobile Number" style={styles.label} required={true} />
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
            inputType='numeric'
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            type='mobile'
            required={true}
            //@ts-ignore
            error={showErrors ? errors?.employeeMobile : ''}
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
              {shiftingLuggageOptions.map((item, index) => {
                return (
                  <BouncyCheckbox
                    key={index}
                    text={item.label}
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
                      handleShiftingLugInputTextChange(isChecked, item.label);
                    }}
                  />
                );
              })}
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="PICKUP ADDRESS" collapsed={true}>
          <View>
            <View style={styles.twoColumnWrapper}>
              <View style={styles.textContainer}>
                <Label text="Pin code" style={styles.label} />
                <Input
                  onChangeText={handlePickupPinCode}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="State" style={styles.label} />
                <EpackDropdown
                  data={pickupStates.map(e => e.label)}
                  placeholder={'Select State'}
                  hanldeData={handlePickupState}
                  //@ts-ignore
                  ref={pickupStateDropwdownRef}
                />
              </View>
            </View>

            <View style={styles.elementContainer}>
              <Label text="City" style={styles.label} />
              <EpackDropdown
                  data={pickupCities.map(e => e.label)}
                  placeholder={'Select City'}
                  hanldeData={handlePickupCity}
                  //@ts-ignore
                  ref={pickupCityDropdownRef}
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
                  defaultValue={floorOptions[3]}
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
            <View style={styles.twoColumnWrapper}>
              <View style={styles.textContainer}>
                <Label text="Pin code" style={styles.label} />
                <Input
                  onChangeText={handleDeliveryPinCode}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="State" style={styles.label} />
                <EpackDropdown
                  data={deliveryStates.map(e => e.label)}
                  placeholder={'Select State'}
                  hanldeData={handleDeliveryState}
                  //@ts-ignore
                  ref={dropStateDropdownRef}
                />
              </View>
            </View>
            <View style={styles.elementContainer}>
              <Label text="City" style={styles.label} />
              <EpackDropdown
                  data={deliveryCities.map(e => e.label)}
                  placeholder={'Select City'}
                  hanldeData={handleDeliveryCity}
                  //@ts-ignore
                  ref={dropCityDropdownRef}
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
                  defaultValue={floorOptions[3]}
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
        <Spinner show={fetching || addEnquiryRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default AddEnquiryView;
