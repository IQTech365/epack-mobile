import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import Spacer from '../../../../../../../common/Spacer';
import EpackDropdown from '../../../../../../../common/DropdownComponent2';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {approvalAuthorityOptions} from '../../utils';
import {useInvoiceFormContextHook} from '../../../../../../../provider/InvoiceFormContextProvider';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import usePincodeHook from '../../../../../../../hooks/usePincodeHook';
import { getCities2, getStates2 } from '../../../../../../../utils/formatter';
import Spinner from '../../../../../../../common/Spinner';

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
    setPincode:setPincode2,
    setState,
    setCity,
    setAddress,
  } = useInvoiceFormContextHook();

  const stateDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const handlePincodeChange = useCallback(
    (text: string) => {
      setPincode2(text);
      setPincode(text);
    },
    [state.pincode],
  );

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
        />
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Approval Authority" style={styles.label} />
        <DropdownComponent
          data={approvalAuthorityOptions}
          onSelect={(item: TDropdownItem) => {
            setApprovalAuthority(item.label);
          }}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Authority Person Name" style={styles.label} />
        <Input
          onChangeText={setAuthorityPersonName}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Authority Mobile No." style={styles.label} />
        <Input
          onChangeText={setAuthorityMobileNo}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Company GST" style={styles.label} />
        <Input
          onChangeText={setCompanyGST}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
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
        />
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Employee Designation" style={styles.label} />
        <Input
          onChangeText={setEmployeeDesignation}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Employee Mobile No." style={styles.label} />
        <Input
          onChangeText={setEmployeeMobileNo}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
      {!state.same_as_client_address ? (
        <>
          <Spacer height={4} />
          <View style={styles.halfWidthCompContainer}>
            <View style={styles.compContainer}>
              <Label text="Pincode" style={styles.label} required={true} />
              <Input
                onChangeText={handlePincodeChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder='Enter Pincode'
              />
            </View>
            <View style={styles.compContainer}>
              <Label text="State" style={styles.label} />
              <EpackDropdown
                data={states}
                placeholder={'Select State'}
                hanldeData={setState}
                //@ts-ignore
                ref={stateDropdownRef}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.fullWidthCompContainer}>
            <Label text="City" style={styles.label} />
            <EpackDropdown
              data={cities}
              placeholder={'Select City'}
              hanldeData={setCity}
              //@ts-ignore
              ref={cityDropdownRef}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.fullWidthCompContainer}>
            <Label text="Address" style={styles.label} />
            <Input
              onChangeText={setCompanyAddress}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <Spinner show={fetching} />
        </>
      ) : null}
    </>
  );
};

export default InvoiceToCompanyView;
