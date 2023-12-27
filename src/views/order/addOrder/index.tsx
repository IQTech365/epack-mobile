import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
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
import Button from '../../../common/Button';
import DatePickerComponent from '../../../common/DatePickerComponent';
import liftStatusOptions from '../../../data/liftStatusOptions.json';
import floorOptions from '../../../data/floorOptions.json';
import {
  initialState,
  addOrderReducer,
  ADDORDER_FORM_ACTION,
  TBillingBy,
} from './addOrderReducer';
import approvalAuthorityOptions from '../../../data/ApprovalAuthorityOptions.json';
import billingByOptions from '../../../data/billingByOptions.json';
import {formatDate4, getCities, getStates} from '../../../utils/formatter';
import shiftingLuggageOptions from '../../../data/shiftingLuggage.json';
import usePincodeHook, {
  PINCODE_REQUEST_KEY,
} from '../../../hooks/usePincodeHook';
import Spinner from '../../../common/Spinner';
import {IAddOrderRequest} from '../../../interface/order/IAddOrderRequest';
import {
  addOrderRequest,
  getApprovedOrdersRequest,
  getOrdersRequest,
  resetAddOrderRequest,
} from '../../../redux/slices/OrderSlice';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import Toast from 'react-native-toast-message';
import {NavigationProp} from '@react-navigation/native';
import useCompanyId from '../../../hooks/useCompanyId';
import {IGetOrdersRequest} from '../../../interface/order/IGetOrdersRequest';
import EpackDropdown from '../../../common/DropdownComponent2';
import {Validator} from '../../../utils/validation';
import useAuthId from '../../../hooks/useAuthId';
import {ICustomer, ICustomerBillingInfo, ICustomersRequest} from '../../../interface/common/common';
import {debounce} from '../../../utils/utility';
import {
  getCustomersRequest,
  resetGetCustomersRequest,
} from '../../../redux/slices/CommonSlice';

interface IAddOrderViewProps {
  navigation: NavigationProp<any, any>;
}

const AddOrderView: React.FC<IAddOrderViewProps> = ({navigation}) => {
  const [state, dispatch] = useReducer(addOrderReducer, initialState);
  const authId = useAuthId();
  const dispatch2 = useAppDispatch();
  const {addOrderRequesting, addOrderSuccess, addOrderFailure, addOrderError} =
    useAppSelector(state => state.Order);
  const [pincodeRequestKey, setPincodeRequestKey] =
    useState<PINCODE_REQUEST_KEY>(PINCODE_REQUEST_KEY.ADD_ORDER_PICKUP_ADDRESS);
  const [pickupStates, setPickupStates] = useState<TDropdownItem[]>([]);
  const [pickupCities, setPickupCities] = useState<TDropdownItem[]>([]);
  const [deliveryStates, setDeliveryStates] = useState<TDropdownItem[]>([]);
  const [deliveryCities, setDeliveryCities] = useState<TDropdownItem[]>([]);

  const pickupCityDropdownRef = useRef(null);
  const pickupStateDropwdownRef = useRef(null);
  const dropStateDropdownRef = useRef(null);
  const dropCityDropdownRef = useRef(null);
  const companyId = useCompanyId();
  const [errors, setErrors] = useState();
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const {
    customers,
    getCustomersRequesting,
    getCustomersSuccess,
    getCustomersFailure,
  } = useAppSelector(state => state.Common);
  const [selectedCompanyOption, setSelectedCompanyOption] =
    useState<ICustomer | null>(null);
  const [showCompanyList, setShowCompanyList] = useState<boolean>(false);
  const approvalAuthorityDropdownCompRef = useRef(null);

  const setPincodeError = () => {
    // setPincodeError2('Invalid Pincode');
  };

  const resetPincodeError = () => {
    // setPincodeError2('');
  };
  const {result, fetching, setPincode} = usePincodeHook(
    setPincodeError,
    resetPincodeError,
  );

  const handlePartyNameInputTextChange = (text: string) => {
    dispatch({
      type: ADDORDER_FORM_ACTION.PARTY_NAME,
      payload: text,
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
      type: ADDORDER_FORM_ACTION.BILLING_BY,
      payload: tempObj as TBillingBy,
    });
  };

  const handleMobileNumInputTextChange = useCallback(
    (text: string) => {
      dispatch({
        type: ADDORDER_FORM_ACTION.MOBILE,
        payload: text,
      });
    },
    [state.mobile],
  );

  const handleShiftingType = (item: TDropdownItem) => {
    dispatch({
      type: ADDORDER_FORM_ACTION.SHIFTING_TYPE,
      payload: item.label,
    });
  };

  const handleDateOfMoving = (date: Date) => {
    dispatch({
      type: ADDORDER_FORM_ACTION.DATE_OF_MOVING,
      payload: formatDate4(date),
    });
  };
  const handleOrderAmount = (text: string) => {
    dispatch({
      type: ADDORDER_FORM_ACTION.ORDER_AMOUNT,
      payload: text,
    });
  };
  const handleTokenAmount = (text: string) => {
    dispatch({
      type: ADDORDER_FORM_ACTION.TOKEN_AMOUNT,
      payload: text,
    });
  };

  //***Pickup Address***//
  const handlePickupPinCode = useCallback(
    (text: string) => {
      setPincodeRequestKey(PINCODE_REQUEST_KEY.ADD_ORDER_PICKUP_ADDRESS);
      setPincode(text);
      dispatch({
        type: ADDORDER_FORM_ACTION.PICKUP_PINCODE,
        payload: text,
      });
    },
    [state.pickupPincode],
  );
  const handlePickupCity = (item: string) => {
    dispatch({
      type: ADDORDER_FORM_ACTION.PICKUP_CITY,
      payload: item,
    });
  };
  const handlePickupState = (item: string) => {
    dispatch({
      type: ADDORDER_FORM_ACTION.PICKUP_STATE,
      payload: item,
    });
  };

  const handlePickupAddress = useCallback(
    (text: string) => {
      dispatch({
        type: ADDORDER_FORM_ACTION.PICKUP_ADDRESS,
        payload: text,
      });
    },
    [state.pickupPincode],
  );
  const handlePickupCurrentFloor = (item: TDropdownItem) => {
    dispatch({
      type: ADDORDER_FORM_ACTION.PICKUP_CURRENT_FLOOR,
      payload: item.label,
    });
  };
  const handlePickupLiftStatus = (item: TDropdownItem) => {
    dispatch({
      type: ADDORDER_FORM_ACTION.PICKUP_LIFT_STATUS,
      payload: item.label,
    });
  };

  //***Delivery Address***//
  const handleDeliveryPinCode = useCallback(
    (text: string) => {
      setPincodeRequestKey(PINCODE_REQUEST_KEY.ADD_ORDER_DELIVERY_ADDRESS);
      setPincode(text);
      dispatch({
        type: ADDORDER_FORM_ACTION.DELIVERY_PINCODE,
        payload: text,
      });
    },
    [state.deliveryPincode],
  );
  const handleDeliveryCity = (item: string) => {
    dispatch({
      type: ADDORDER_FORM_ACTION.DELIVERY_CITY,
      payload: item,
    });
  };
  const handleDeliveryState = (item: string) => {
    dispatch({
      type: ADDORDER_FORM_ACTION.DELIVERY_STATE,
      payload: item,
    });
  };

  const handleDeliveryAddress = useCallback(
    (text: string) => {
      dispatch({
        type: ADDORDER_FORM_ACTION.DELIVERY_ADDRESS,
        payload: text,
      });
    },
    [state.deliveryPincode],
  );

  const handleDeliveryCurrentFloor = (item: TDropdownItem) => {
    dispatch({
      type: ADDORDER_FORM_ACTION.DELIVERY_CURRENT_FLOOR,
      payload: item.label,
    });
  };
  const handleDeliveryLiftStatus = (item: TDropdownItem) => {
    dispatch({
      type: ADDORDER_FORM_ACTION.DELIVERY_LIFT_STATUS,
      payload: item.label,
    });
  };

  const handleShiftingLuggage = (value: string) => {
    const {shiftingLuggage} = state;
    let temp = [...shiftingLuggage];
    const itemIndex = temp.findIndex(itm => itm == value);
    if (itemIndex == -1) {
      temp.push(value);
    } else if (itemIndex != -1) {
      temp = temp.filter(itm => itm != value);
    }
    dispatch({
      type: ADDORDER_FORM_ACTION.SHIFTING_LUGGAGE,
      payload: temp as [string],
    });
  };

  const handleAddOrder = () => {
    setShowErrors(true);
    if (!isFormValid) {
      Toast.show({
        type: 'error',
        text1: 'Form',
        text2: 'Form data is not valid. Please correct!',
      });
      return;
    }
    const data: IAddOrderRequest = {
      companyId: companyId,
      customerId: selectedCompanyOption?._id as string,
      authId: authId,
      enquiryManager: '',
      shiftingType: state.shiftingType.toUpperCase() || 'LOCAL',
      partyCompanyName: state.billingBy?.billing_info?.company_name as string,
      partyName: state.partyName,
      email: '',
      mobile: state.mobile,
      phone: state.mobile,
      orderAmount: state.orderAmount,
      tokenAmount: state.tokenAmount,
      shiftingLuggage: state.shiftingLuggage as [string],
      enquirySource: '',
      gstNumber: '',
      alternateNumbers: [],
      landline: '',
      deliveryDate: '',
      deliveredDate: '',
      shiftingDate: state.dateOfMoving || formatDate4(new Date()),
      pickupAddress: {
        shiftingFrom: state.pickupCity || pickupCities[0].label,
        state: state.pickupState || pickupStates[0].label,
        city: state.pickupCity || pickupCities[0].label,
        address: state.pickupAddress,
        pincode: state.pickupPincode,
        locality: 'Not Available',
        landmark: 'Not Available',
        floor: state.pickupCurrentFloor || 'Ground Floor',
        isLiftAvailable: state.pickupLiftStatus.toUpperCase() || 'YES',
      },
      dropAddress: {
        shiftingTo: state.deliveryCity || deliveryCities[0].label,
        state: state.deliveryState || deliveryStates[0].label,
        city: state.deliveryCity || deliveryCities[0].label,
        address: state.deliveryAddress,
        pincode: state.deliveryPincode,
        locality: 'Not Available',
        landmark: 'Not Available',
        floor: state.deliveryCurrentFloor || 'Ground Floor',
        isLiftAvailable: state.deliveryLiftStatus.toUpperCase() || 'YES',
      },
      billingBy: state.billingBy?.billing_by as string,
      billingDetails:
        state.billingBy?.billing_by == 'by Company'
          ? {
              companyName: state.billingBy?.billing_info
                ?.company_name as string,
              approvalAuthority:
                (state.billingBy?.billing_info?.approval_authority as string) ||
                approvalAuthorityOptions[0].label,
              authorityPersonName: state.billingBy?.billing_info
                ?.authority_person_name as string,
              authorityPersonMobile: state.billingBy?.billing_info
                ?.authority_mobile_number as string,
              companyAddress: state.billingBy?.billing_info
                ?.company_address as string,
              companyGST: state.billingBy?.billing_info?.company_gst as string,
              employeeName: state.billingBy?.billing_info
                ?.employee_name as string,
              employeeDesignation: state.billingBy?.billing_info
                ?.employee_designation as string,
              employeeMobile: state.billingBy?.billing_info
                ?.employee_mobile_number as string,
            }
          : {},
      status: 'NEW ORDER',
      addedBy: authId,
    };
    console.log('AddOrder-payload----', JSON.stringify(data));

    dispatch2(addOrderRequest(data));
  };

  useEffect(() => {
    if (result && result.Status != 'Error') {
      if (pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_ORDER_PICKUP_ADDRESS) {
        setPickupStates(getStates(result));
        setPickupCities(getCities(result));
      } else if (
        pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_ORDER_DELIVERY_ADDRESS
      ) {
        setDeliveryStates(getStates(result));
        setDeliveryCities(getCities(result));
      }
    }
  }, [result]);

  useEffect(() => {
    if (
      pickupStates &&
      pickupCities &&
      pickupCityDropdownRef &&
      pickupStateDropwdownRef &&
      pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_ORDER_PICKUP_ADDRESS
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
      pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_ORDER_DELIVERY_ADDRESS
    ) {
      //@ts-ignore
      dropStateDropdownRef?.current?.setValue(deliveryStates[0]?.label);
      //@ts-ignore
      dropCityDropdownRef?.current?.setValue(deliveryCities[0]?.label);
    }
  }, [deliveryStates, deliveryCities]);

  const fetchCompletedOrders = () => {
    let orderListReq: IGetOrdersRequest = {
      // authId: otpData?.data.id as string,
      companyId: companyId,
      status: 'COMPLETED',
    };
    dispatch2(getApprovedOrdersRequest(orderListReq));
  };

  const showShiftingLuggageErrorView = () => {
    //@ts-ignore
    const {shiftingLuggage} = errors || {};
    if (shiftingLuggage) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{shiftingLuggage}</Text>
        </View>
      );
    }
    return null;
  };

  const validateForm = () => {
    let errors: any = {};
    if (state.billingBy?.billing_by == 'by Company') {
      if (!state.billingBy?.billing_info?.company_name) {
        errors.companyName = 'Company name required';
      }
      if (!state.billingBy?.billing_info?.employee_name) {
        errors.employeeName = 'Employee name required';
      }
      if (!state.billingBy?.billing_info?.employee_mobile_number) {
        errors.employeeMobile = 'Employee mobile number required';
      } else if (
        !Validator.mobile(state.billingBy?.billing_info?.employee_mobile_number)
      ) {
        errors.employeeMobile = 'Mobile number invalid';
      }
    } else if (state.billingBy?.billing_by == 'by Individual') {
      if (!state.partyName) {
        errors.partyName = 'Party name required';
      }
      if (!state.mobile) {
        errors.mobile = 'Mobile number required';
      } else if (!Validator.mobile(state.mobile)) {
        errors.mobile = 'Mobile number invalid';
      }
    }
    if (state.shiftingLuggage.length == 0) {
      errors.shiftingLuggage = 'Shifting luggage required';
    }
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

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
    state.shiftingLuggage,
  ]);

  useEffect(() => {
    if (!addOrderRequesting && addOrderSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Order',
        text2: 'Order has been added successfully',
      });
      dispatch2(resetAddOrderRequest());
      dispatch2(getOrdersRequest(companyId));
      fetchCompletedOrders();
      navigation?.goBack();
    } else if (!addOrderRequesting && addOrderFailure) {
      Toast.show({
        type: 'error',
        text1: 'Order',
        text2: 'Error in adding order. Please try again!',
      });
      dispatch2(resetAddOrderRequest());
    }
  }, [addOrderRequesting, addOrderSuccess, addOrderFailure]);

  const handleMobileNo = (text: string) => {
    handleMobileNumInputTextChange(text);
    if (!Validator.isEmpty(text) && text.length == 10) {
      const payload: ICustomersRequest = {
        companyId: companyId,
        searchKey: text,
      };
      debounce(dispatch2(getCustomersRequest(payload)), 3000);
    }
  };

  const _getCustomerList = (): ICustomer[] => {
    const {data} = customers || {};
    let list: ICustomer[] = [];
    if (data && Array.isArray(data) && data.length > 0) {
      list = data;
    }
    return list;
  };

  const handleCustomerOption = (customer: ICustomer) => {
    setSelectedCompanyOption(customer);
    handlePartyNameInputTextChange(customer.partyName);
    setShowCompanyList(false);
    dispatch2(resetGetCustomersRequest());
  };

  useEffect(() => {
    if (
      !getCustomersRequesting &&
      (getCustomersSuccess || getCustomersFailure)
    ) {
      setShowCompanyList(true);
    }
  }, [
    customers,
    getCustomersRequesting,
    getCustomersSuccess,
    getCustomersFailure,
  ]);

  const showBillingByIndividualView = () => {
    if (state.billingBy?.billing_by == 'by Company') return null;
    return (
      <>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Mobile Number" style={styles.label} required={true} />
          <Input
            onChangeText={handleMobileNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            //@ts-ignore
            error={showErrors ? errors?.mobile : ''}
            type="mobile"
            required={true}
            value={state.mobile}
          />
        </View>
        <Spacer height={4} />
        {showCompanyList &&
          _getCustomerList().map((d: ICustomer) => {
            return (
              <TouchableOpacity
                style={styles.customerItemContainer}
                onPress={() => handleCustomerOption(d)}>
                <Text style={styles.customerNameText}>{d.partyName}</Text>
              </TouchableOpacity>
            );
          })}
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
            type="text"
            required={true}
            value={state.partyName}
          />
        </View>
      </>
    );
  };

  const handleCompanyName = (text: string) => {
    const {billingBy} = state;
    const tempObj = {
      ...billingBy,
      billing_info: {...billingBy?.billing_info, company_name: text},
    };
    dispatch({
      type: ADDORDER_FORM_ACTION.BILLING_BY,
      payload: tempObj as TBillingBy,
    });
    if (!Validator.isEmpty(text)) {
      const payload: ICustomersRequest = {
        companyId: companyId,
        searchKey: text,
      };
      debounce(dispatch2(getCustomersRequest(payload)), 3000);
    }
  };

  const handleCustomerOption2 = (customer: ICustomer) => {
    setSelectedCompanyOption(customer);
    const {billingBy} = state;
    const tempObj = {
      ...billingBy,
      billing_info: {
        ...billingBy?.billing_info,
      //@ts-ignore
        company_name: customer?.billingDetails?.companyName as string,
      },
    };
    dispatch({
      type: ADDORDER_FORM_ACTION.BILLING_BY,
      payload: tempObj as TBillingBy,
    });
    setShowCompanyList(false);
    dispatch2(resetGetCustomersRequest());
  };

  useEffect(() => {
    if (selectedCompanyOption) {
      if (selectedCompanyOption.billingBy == 'by Company') {
        const billingInfo: ICustomerBillingInfo =
          selectedCompanyOption.billingDetails as ICustomerBillingInfo;
        const approvalAuthorityOptionIndex: number =
          approvalAuthorityOptions.findIndex(
            (d: TDropdownItem) => d.label == billingInfo.approvalAuthority,
          );
        if (approvalAuthorityOptionIndex !== -1) {
          //@ts-ignore
          approvalAuthorityDropdownCompRef && approvalAuthorityDropdownCompRef.current.setDefaultValue(
              approvalAuthorityOptions[approvalAuthorityOptionIndex],
            );
        }

        // setAuthorityPersonName(billingInfo.authorityPersonName);
        const {billingBy} = state;
        const tempObj = {
          ...billingBy,
          billing_info: {
            ...billingBy?.billing_info,
            approval_authority: billingInfo.approvalAuthority,
            authority_person_name: billingInfo.authorityPersonName,
            authority_mobile_number: billingInfo.authorityPersonMobile,
            company_gst: billingInfo.companyGST.toUpperCase(),
            employee_name: billingInfo.employeeName,
            employee_designation: billingInfo.employeeDesignation,
            employee_mobile_number: billingInfo.employeeMobile,
            company_address: billingInfo.companyAddress,
          },
        };
        dispatch({
          type: ADDORDER_FORM_ACTION.BILLING_BY,
          payload: tempObj as TBillingBy,
        });
      }
    }
  }, [selectedCompanyOption]);

  const showBillingByCompanyView = () => {
    if (state.billingBy?.billing_by == 'by Individual') return null;
    return (
      <>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Company Name" style={styles.label} required={true} />
          <Input
            onChangeText={handleCompanyName}
            value={state.billingBy?.billing_info?.company_name}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            required={true}
            type="text"
            //@ts-ignore
            error={showErrors ? errors?.companyName : ''}
          />
        </View>
        <Spacer height={4} />
        {showCompanyList &&
          _getCustomerList().map((d: ICustomer) => {
            return (
              <TouchableOpacity
                style={styles.customerItemContainer}
                onPress={() => handleCustomerOption2(d)}>
                <Text style={styles.customerNameText}>{d.partyName}</Text>
              </TouchableOpacity>
            );
          })}
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
                type: ADDORDER_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            //@ts-ignore
            ref={approvalAuthorityDropdownCompRef}
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
                type: ADDORDER_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            value={state.billingBy?.billing_info?.authority_person_name}
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
                type: ADDORDER_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            value={state.billingBy?.billing_info?.authority_mobile_number}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            type="mobile"
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
                type: ADDORDER_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            value={state.billingBy?.billing_info?.company_gst}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
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
                type: ADDORDER_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            value={state.billingBy?.billing_info?.employee_name}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            //@ts-ignore
            error={showErrors ? errors?.employeeName : ''}
            type="text"
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
                type: ADDORDER_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            value={state.billingBy?.billing_info?.employee_designation}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label
            text="Employee Mobile Number"
            style={styles.label}
            required={true}
          />
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
                type: ADDORDER_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            value={state.billingBy?.billing_info?.employee_mobile_number}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            type="mobile"
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
                type: ADDORDER_FORM_ACTION.BILLING_BY,
                payload: tempObj as TBillingBy,
              });
            }}
            value={state.billingBy?.billing_info?.company_address}
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
            <View style={styles.mainWrapper}>
              <View style={styles.textContainer}>
                <Label text="Order Amount" style={styles.label} />
                <Input
                  onChangeText={handleOrderAmount}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="Token Amount" style={styles.label} />
                <Input
                  onChangeText={handleTokenAmount}
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
              {shiftingLuggageOptions.map((item, index) => {
                return (
                  <BouncyCheckbox
                    key={item.value}
                    size={25}
                    unfillColor="#FFFFFF"
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
                      handleShiftingLuggage(item.label);
                    }}
                    isChecked={
                      state.shiftingLuggage.findIndex(e => e == item.label) !==
                      -1
                    }
                    disableBuiltInState={true}
                  />
                );
              })}
            </View>
            {showShiftingLuggageErrorView()}
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
                  onSelect={handlePickupLiftStatus}
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
                  onSelect={handleDeliveryLiftStatus}
                />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={12} />
        <Button
          text="SUBMIT"
          onPress={handleAddOrder}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={12} />
        <Spinner show={fetching || addOrderRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default AddOrderView;
