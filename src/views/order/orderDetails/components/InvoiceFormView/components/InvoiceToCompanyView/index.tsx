import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK, COLOR_GRAY4} from '../../../../../../../utils/colors';
import Spacer from '../../../../../../../common/Spacer';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {approvalAuthorityOptions} from '../../utils';
import {useInvoiceFormContextHook} from '../../../../../../../provider/InvoiceFormContextProvider';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import usePincodeHook from '../../../../../../../hooks/usePincodeHook';
import {getCities2, getStates2} from '../../../../../../../utils/formatter';
import Spinner from '../../../../../../../common/Spinner';
import { useAppSelector } from '../../../../../../../redux/hooks';
import { IBillingInfo, ISingleEnquiryData } from '../../../../../../../interface/enquiry/ISingleEnquiryResponse';
import DropdownWithTextInput from '../../../../../../../common/DropdownWithTextInput';

interface Props {}

const InvoiceToCompanyView: React.FC<Props> = () => {
  const {
    state,
    setCompanyName,
    setApprovalAuthority,
    setAuthorityPersonName,
    setAuthorityMobileNo,
    setCompanyGST,
    setEmployeeName,
    setEmployeeDesignation,
    setEmployeeMobileNo,
    setCompanyAddress,
    setPincode: setPincode2,
    setState,
    setCity,
    setAddress,
  } = useInvoiceFormContextHook();
  const {order} = useAppSelector(state => state.Order);
  const {data: orderData} = order || {};
  const stateDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);
  const companyNameInputRef = useRef(null);
  const approvalAuthDropdownRef = useRef(null);
  const authMobileNoInputRef = useRef(null);
  const authPersonNameInputRef = useRef(null);
  const empNameInputRef = useRef(null);
  const empMobileNoInputRef = useRef(null);
  const empDesigInputRef = useRef(null);
  const companyGstInputRef = useRef(null);
  const pincodeInputRef = useRef(null);
  const companyAddInputRef = useRef(null);

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const getSingleOrder = () => {
    let order: ISingleEnquiryData;
    if (orderData && Array.isArray(orderData) && orderData.length > 0) {
      order = orderData[0];
    }
    //@ts-ignore
    return order;
  };

  const handlePincodeChange = useCallback(
    (text: string) => {
      setPincode2(text);
      setPincode(text);
    },
    [state.pincode],
  );

  useEffect(() => {
    if (
      companyNameInputRef &&
      approvalAuthDropdownRef &&
      authMobileNoInputRef &&
      authPersonNameInputRef &&
      empNameInputRef &&
      empMobileNoInputRef &&
      empDesigInputRef &&
      companyGstInputRef && 
      cityDropdownRef && 
      stateDropdownRef 
    ) {
      const singleOrder:ISingleEnquiryData = getSingleOrder();
      if(singleOrder) {
        const billingInfo:IBillingInfo = singleOrder.billingDetails as IBillingInfo;
        console.log('billingInfo--', JSON.stringify(billingInfo));
        
        if(billingInfo) {
        //@ts-ignore
        companyNameInputRef && companyNameInputRef?.current?.setValue(billingInfo?.companyName);
        setCompanyName(billingInfo?.companyName);

        const approvalAuthorityItem:TDropdownItem = approvalAuthorityOptions.find((d:TDropdownItem) => d.label == billingInfo?.approvalAuthority) as TDropdownItem;
        if(approvalAuthorityItem) {
          //@ts-ignore
          approvalAuthDropdownRef && approvalAuthDropdownRef?.current?.setDefaultValue(approvalAuthorityItem);
          setApprovalAuthority(approvalAuthorityItem.label);
        }

        //@ts-ignore
        authMobileNoInputRef && authMobileNoInputRef?.current?.setValue(billingInfo?.authorityPersonMobile);
        setAuthorityMobileNo(billingInfo?.authorityPersonMobile);

        //@ts-ignore
        authPersonNameInputRef && authPersonNameInputRef?.current?.setValue(billingInfo?.authorityPersonName);
        setAuthorityPersonName(billingInfo?.authorityPersonName);

        //@ts-ignore
        empNameInputRef && empNameInputRef?.current?.setValue(billingInfo?.employeeName);
        setEmployeeName(billingInfo?.employeeName);

        //@ts-ignore
        empMobileNoInputRef && empMobileNoInputRef?.current?.setValue(billingInfo?.employeeMobile);
        setEmployeeMobileNo(billingInfo?.employeeMobile);

        //@ts-ignore
        empDesigInputRef && empDesigInputRef?.current?.setValue(billingInfo?.employeeDesignation);
        setEmployeeDesignation(billingInfo?.employeeDesignation);

        //@ts-ignore
        companyGstInputRef && companyGstInputRef?.current?.setValue(billingInfo?.companyGST);
        setCompanyGST(billingInfo?.companyGST);

        //@ts-ignore
        pincodeInputRef && pincodeInputRef?.current?.setValue(billingInfo?.pincode);
        handlePincodeChange(billingInfo?.pincode);

        //@ts-ignore
        companyAddInputRef && companyAddInputRef?.current?.setValue(billingInfo?.companyAddress);
        setCompanyAddress(billingInfo?.companyAddress);
      }
    }
    }

  }, []);

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
      setState(states[0]);
      //@ts-ignore
      cityDropdownRef?.current?.setValue(cities[0]);
      setCity(cities[0]);
    }
  }, [states, cities]);

  return (
    <>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Company Name" style={styles.label} />
        <Input
          onChangeText={setCompanyName}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          placeholder="Enter company name"
          placeholderTextColor={COLOR_GRAY4}
          //@ts-ignore
          ref={companyNameInputRef}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.halfWidthCompContainer}>
        <View style={styles.compContainer}>
          <Label text="Approval Authority" style={styles.label} />
          <DropdownComponent
            data={approvalAuthorityOptions}
            onSelect={(item: TDropdownItem) => {
              setApprovalAuthority(item.label);
            }}
            //@ts-ignore
            ref={approvalAuthDropdownRef}
          />
        </View>
        <View style={styles.compContainer}>
          <Label text="Authority Mobile No." style={styles.label} />
          <Input
            onChangeText={setAuthorityMobileNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            placeholder="Enter mobile no"
            placeholderTextColor={COLOR_GRAY4}
            //@ts-ignore
            ref={authMobileNoInputRef}
          />
        </View>
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Authority Person Name" style={styles.label} />
        <Input
          onChangeText={setAuthorityPersonName}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          placeholder="Enter person name"
          placeholderTextColor={COLOR_GRAY4}
          //@ts-ignore
          ref={authPersonNameInputRef}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Employee Name" style={styles.label} />
        <Input
          onChangeText={setEmployeeName}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          placeholder="Enter employee name"
          placeholderTextColor={COLOR_GRAY4}
          //@ts-ignore
          ref={empNameInputRef}
        />
      </View>
      <Spacer height={4} />

      <View style={styles.halfWidthCompContainer}>
        <View style={styles.compContainer}>
          <Label text="Emp. Mobile No." style={styles.label} />
          <Input
            onChangeText={setEmployeeMobileNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            placeholder="Enter mobile no"
            placeholderTextColor={COLOR_GRAY4}
            //@ts-ignore
            ref={empMobileNoInputRef}
          />
        </View>
        <View style={styles.compContainer}>
          <Label text="Emp. Designation" style={styles.label} />
          <Input
            onChangeText={setEmployeeDesignation}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            placeholder="Enter designation"
            placeholderTextColor={COLOR_GRAY4}
            //@ts-ignore
            ref={empDesigInputRef}
          />
        </View>
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Company GST" style={styles.label} />
        <Input
          onChangeText={setCompanyGST}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          placeholder="Enter GST#"
          placeholderTextColor={COLOR_GRAY4}
          //@ts-ignore
          ref={companyGstInputRef}
        />
      </View>
      <Spacer height={4} />
      {!state.same_as_client_address ? (
        <>
          <Spacer height={4} />
          <View style={styles.fullWidthCompContainer}>
            <Label text="Company Address" style={styles.label} />
            <Input
              onChangeText={setCompanyAddress}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder="Enter address"
              placeholderTextColor={COLOR_GRAY4}
              //@ts-ignore
              ref={companyAddInputRef}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.halfWidthCompContainer}>
            <View style={styles.compContainer}>
              <Label text="Pincode" style={styles.label} required={true} />
              <Input
                onChangeText={handlePincodeChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="Enter Pincode"
                placeholderTextColor={COLOR_GRAY4}
                value={state.pincode}
                //@ts-ignore
                ref={pincodeInputRef}
              />
            </View>
            <View style={styles.compContainer}>
              <Label text="State" style={styles.label} />
              <DropdownWithTextInput
                options={states}
                onSelect={setState}
                //@ts-ignore
                ref={stateDropdownRef}
                containerStyle={styles.compContainer}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.fullWidthCompContainer}>
            <Label text="City" style={styles.label} />
            <DropdownWithTextInput
              options={cities}
              onSelect={setCity}
              //@ts-ignore
              ref={cityDropdownRef}
            />
          </View>

          <Spinner show={fetching} />
        </>
      ) : null}
    </>
  );
};

export default InvoiceToCompanyView;
