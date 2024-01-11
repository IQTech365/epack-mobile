import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../style';
import Spacer from '../../../../common/Spacer';
import Label from '../../../../common/Label';
import Input from '../../../../common/Input';
import {COLOR_BLACK} from '../../../../utils/colors';
import {
  ICustomer,
  ICustomerBillingInfo,
  ICustomersRequest,
} from '../../../../interface/common/common';
import DropdownComponent from '../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../type/TDropdownItem';
import {useOrderFormContextHook} from '../../../../provider/OrderFormContextProvider';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {Validator} from '../../../../utils/validation';
import {debounce} from '../../../../utils/utility';
import {
  getCustomersRequest,
  resetGetCustomersRequest,
} from '../../../../redux/slices/CommonSlice';
import approvalAuthorityOptions from '../../../../data/ApprovalAuthorityOptions.json';
import EpackDropdown from '../../../../common/DropdownComponent2';
import usePincodeHook from '../../../../hooks/usePincodeHook';
import {getCities2, getStates2} from '../../../../utils/formatter';
import { getCurrentCompanyId } from '../../../../utils/storage';

interface IProps {}

const BillingCompanyView: FC<IProps> = ({}) => {
  const dispatch = useAppDispatch();
  const {
    state,
    setCompanyName,
    setApprovalAuthority,
    setAuthorityPersonName,
    setAuthorityMobileNo,
    setCustomerId,
    setEmployeeName,
    setEmployeeMobileNo,
    setEmployeeDesignation,
    setCompanyGST,
    setCompanyAddress,
    setCompanyPincode,
    setCompanyState,
    setCompanyCity,
  } = useOrderFormContextHook();

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
  const stateDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const handleCompanyName = (text: string) => {
    setCompanyName(text);
    if (!Validator.isEmpty(text)) {
      getCurrentCompanyId().then(id => {
        const payload: ICustomersRequest = {
          companyId: id as string,
          searchKey: text,
        };
        debounce(dispatch(getCustomersRequest(payload)), 3000);
      }).catch(err => console.log(err));
    }
  };

  const handlePincodeChange = useCallback(
    (text: string) => {
      setCompanyPincode(text);
      setPincode(text);
    },
    [state.company_pincode],
  );

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
    setShowCompanyList(false);
    dispatch(resetGetCustomersRequest());
  };

  useEffect(() => {
    if (result && result.Status != 'Error') {
      setStates(getStates2(result));
      setCities(getCities2(result));
    }
  }, [result]);

  useEffect(() => {
    if (
      states.length > 0 &&
      cities.length > 0 &&
      stateDropdownRef &&
      cityDropdownRef
    ) {
      //@ts-ignore
      stateDropdownRef?.current?.setValue(states[0]);
      setCompanyState(states[0]);
      //@ts-ignore
      cityDropdownRef?.current?.setValue(cities[0]);
      setCompanyCity(cities[0]);
    }
  }, [states, cities]);

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

  useEffect(() => {
    if (selectedCompanyOption) {
      if (selectedCompanyOption.billingBy == 'by Company') {
        setCustomerId(selectedCompanyOption._id);
        const billingInfo: ICustomerBillingInfo =
          selectedCompanyOption.billingDetails as ICustomerBillingInfo;
        setCompanyName(billingInfo.companyName);
        const optionIndex: number = approvalAuthorityOptions.findIndex(
          (d: TDropdownItem) => d.label == billingInfo.approvalAuthority,
        );
        if (optionIndex !== -1) {
          //@ts-ignore
          approvalAuthorityDropdownCompRef && approvalAuthorityDropdownCompRef.current.setDefaultValue(
              approvalAuthorityOptions[optionIndex],
            );
        }
        setAuthorityPersonName(billingInfo.authorityPersonName);
        setAuthorityMobileNo(billingInfo.authorityPersonMobile);
        setEmployeeName(billingInfo.employeeName);
        setEmployeeMobileNo(billingInfo.employeeMobile);
        setEmployeeDesignation(billingInfo.employeeDesignation);
        setCompanyGST(billingInfo.companyGST);
        setCompanyAddress(billingInfo.companyAddress);
        setCompanyPincode(billingInfo.companyPincode);
        setCompanyState(billingInfo.companyState);
        setCompanyCity(billingInfo.companyCity);
        setShowCompanyList(false);
        dispatch(resetGetCustomersRequest());
      }
    }
  }, [selectedCompanyOption]);

  return (
    <>
      <Spacer height={4} />
      <View style={styles.elementContainer}>
        <Label text="Company Name" style={styles.label} required={true} />
        <Input
          onChangeText={handleCompanyName}
          value={state.company_name}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          required={true}
          type="text"
          //@ts-ignore
          //   error={showErrors ? errors?.companyName : ''}
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
      <View style={styles.mainWrapper}>
        <View style={styles.textContainer}>
          <Label text="Approval Authority" style={styles.label} />
          <DropdownComponent
            data={approvalAuthorityOptions}
            onSelect={(item: TDropdownItem) => {
              setApprovalAuthority(item.label);
            }}
            //@ts-ignore
            ref={approvalAuthorityDropdownCompRef}
          />
        </View>
        <View style={styles.textContainer}>
          <Label text="Auth. Mobile No." style={styles.label} />
          <Input
            onChangeText={setAuthorityMobileNo}
            value={state.authority_mobile_no}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            type="mobile"
          />
        </View>
      </View>
      <Spacer height={4} />
      <View style={styles.elementContainer}>
        <Label text="Authority Person Name" style={styles.label} />
        <Input
          onChangeText={setAuthorityPersonName}
          value={state.authority_person_name}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>

      <Spacer height={4} />
      <View style={styles.elementContainer}>
        <Label text="Employee Name" style={styles.label} />
        <Input
          onChangeText={setEmployeeName}
          value={state.employee_name}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          //@ts-ignore
          //   error={showErrors ? errors?.employeeName : ''}
          type="text"
        />
      </View>
      <Spacer height={4} />
      <View style={styles.mainWrapper}>
        <View style={styles.textContainer}>
          <Label text="Emp. Desig." style={styles.label} />
          <Input
            onChangeText={setEmployeeDesignation}
            value={state.employee_designation}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <View style={styles.textContainer}>
          <Label text="Emp. Mobile No." style={styles.label} />
          <Input
            onChangeText={setEmployeeMobileNo}
            value={state.employee_mobile_no}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            type="mobile"
            //@ts-ignore
            //   error={showErrors ? errors?.employeeMobile : ''}
          />
        </View>
      </View>
      <Spacer height={4} />
      <View style={styles.elementContainer}>
        <Label text="Company GST" style={styles.label} />
        <Input
          onChangeText={setCompanyGST}
          value={state.company_gst}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.elementContainer}>
        <Label text="Company Address" style={styles.label} />
        <Input
          onChangeText={setCompanyAddress}
          value={state.company_address}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.twoColumnWrapper}>
        <View style={styles.textContainer}>
          <Label text="Pin code" style={styles.label} />
          <Input
            onChangeText={handlePincodeChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <View style={styles.textContainer}>
          <Label text="State" style={styles.label} />
          <EpackDropdown
            data={states}
            placeholder={'Select State'}
            hanldeData={setCompanyState}
            //@ts-ignore
            ref={stateDropdownRef}
          />
        </View>
      </View>
      <View style={styles.elementContainer}>
        <Label text="City" style={styles.label} />
        <EpackDropdown
          data={cities}
          placeholder={'Select City'}
          hanldeData={setCompanyCity}
          //@ts-ignore
          ref={cityDropdownRef}
        />
      </View>
    </>
  );
};

export default BillingCompanyView;
