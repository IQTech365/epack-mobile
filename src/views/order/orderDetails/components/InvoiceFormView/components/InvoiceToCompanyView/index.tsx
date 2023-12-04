import React, {useRef} from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import Spacer from '../../../../../../../common/Spacer';
import EpackDropdown from '../../../../../../../common/DropdownComponent2';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {approvalAuthorityOptions} from '../../utils';
import { useInvoiceFormContextHook } from '../../../../../../../provider/InvoiceFormContextProvider';
import { TDropdownItem } from '../../../../../../../type/TDropdownItem';

interface Props {}

const InvoiceToCompanyView: React.FC<Props> = () => {
  const stateDropdownCompRef = useRef(null);
  const cityDropdownCompRef = useRef(null);
  const {
    setCompanyName,
    setApprovalAuthority,
    setAuthorityPersonName,
    setAuthorityMobileNo,
    setCompanyGST,
    setEmployeeName,
    setEmployeeDesignation,
    setEmployeeMobileNo,
    setCompanyAddress,
    setPincode,
    setState,
    setCity,
    setAddress,
  } = useInvoiceFormContextHook();

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
          onSelect={(item:TDropdownItem) => {
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
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Company Address" style={styles.label} />
        <Input
          onChangeText={setCompanyAddress}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.halfWidthCompContainer}>
        <View style={styles.compContainer}>
          <Label text="Pincode" style={styles.label} />
          <Input
            onChangeText={setPincode}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <View style={styles.compContainer}>
          <Label text="State" style={styles.label} />
          <EpackDropdown
            data={[]}
            placeholder={'Select State'}
            hanldeData={setState}
            //@ts-ignore
            ref={stateDropdownCompRef}
          />
        </View>
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="City" style={styles.label} />
        <EpackDropdown
          data={[]}
          placeholder={'Select City'}
          hanldeData={setCity}
          //@ts-ignore
          ref={cityDropdownCompRef}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Address" style={styles.label} />
        <Input
          onChangeText={setAddress}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
    </>
  );
};

export default InvoiceToCompanyView;
