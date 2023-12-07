import React from "react";
import {View, Text} from 'react-native';
import styles from './style';
import { useQuotationFormContextHook } from "../../../../../provider/QuotationFormContextProvider";
import Label from "../../../../../common/Label";
import Input from "../../../../../common/Input";
import { COLOR_BLACK } from "../../../../../utils/colors";
import Spacer from "../../../../../common/Spacer";
import DropdownComponent from "../../../../../common/DropdownComponent";
import { TDropdownItem } from "../../../../../type/TDropdownItem";
import approvalAuthorityOptions from '../../../../../data/ApprovalAuthorityOptions.json';

interface Props {
    //
}

const BillingCompanyView: React.FC<Props> = ({}) => {
    const {
      state,
      setCompanyName,
      setApprovalAuthority,
      setAuthorityPersonName,
      setAuthorityMobileNo,
      setCompanyGSt,
      setEmployeeName,
      setEmployeeDesignation,
      setEmployeeMobileNo,
      setCompanyAddress,
    } = useQuotationFormContextHook();
  
    return (
      <>
        <View style={styles.fullWidthContainer}>
          <Label text="Company Name" style={styles.label} required={true} />
          <Input
            onChangeText={setCompanyName}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.company_name}
            //@ts-ignore
            //error={showErrors && errors.dropPincode}
            type="text"
            required={true}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
        <Label text="Approval Authority" style={styles.label} />
          <DropdownComponent
            data={approvalAuthorityOptions}
            onSelect={(item: TDropdownItem) => {
                setApprovalAuthority(item.label);
            }}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="Authority Person Name" style={styles.label} required={true} />
          <Input
            onChangeText={setAuthorityPersonName}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.authority_person_name}
            //@ts-ignore
            //error={showErrors && errors.dropPincode}
            type="text"
            required={true}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="Authority Mobile Number" style={styles.label} required={true} />
          <Input
            onChangeText={setAuthorityMobileNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.authority_mobile_no}
            //@ts-ignore
            //error={showErrors && errors.dropPincode}
            type="text"
            required={true}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="Company GST" style={styles.label} />
          <Input
            onChangeText={setCompanyGSt}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.company_gst}
            //@ts-ignore
            //error={showErrors && errors.dropPincode}
            type="text"
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="Employee Name" style={styles.label} required={true} />
          <Input
            onChangeText={setEmployeeName}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.employee_name}
            //@ts-ignore
            //error={showErrors && errors.dropPincode}
            type="text"
            required={true}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="Employee Designation" style={styles.label} required={true} />
          <Input
            onChangeText={setEmployeeDesignation}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.employee_designation}
            //@ts-ignore
            //error={showErrors && errors.dropPincode}
            type="text"
            required={true}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="Employee Mobile Number" style={styles.label} required={true} />
          <Input
            onChangeText={setEmployeeMobileNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.employee_mobile_no}
            //@ts-ignore
            //error={showErrors && errors.dropPincode}
            type="text"
            required={true}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="Company Address" style={styles.label} />
          <Input
            onChangeText={setCompanyAddress}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.company_address}
            //@ts-ignore
            //error={showErrors && errors.dropPincode}
            type="text"
          />
        </View>
      </>
    );
  };
  
  export default BillingCompanyView;