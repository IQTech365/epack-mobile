import React, { useEffect, useRef } from "react";
import {View} from 'react-native';
import styles from './style';
import { useQuotationFormContextHook } from "../../../../../provider/QuotationFormContextProvider";
import Label from "../../../../../common/Label";
import Input from "../../../../../common/Input";
import { COLOR_BLACK } from "../../../../../utils/colors";
import Spacer from "../../../../../common/Spacer";
import DropdownComponent from "../../../../../common/DropdownComponent";
import { TDropdownItem } from "../../../../../type/TDropdownItem";
import approvalAuthorityOptions from '../../../../../data/ApprovalAuthorityOptions.json';
import SearchIcon from '../../../../../images/icons/search.svg';

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
    
    const companyNameInputCompRef = useRef(null);
    const approvalAuthorityDropdownCompRef = useRef(null);
    const authorityPersonNameInputCompRef = useRef(null);
    const authorityMobileNoInputCompRef = useRef(null);
    const companyGstInputCompRef = useRef(null);
    const employeeNameInputCompRef = useRef(null);
    const employeeDesignationInputCompRef = useRef(null);
    const employeeMobileNoInputCompRef = useRef(null);
    const companyAddressInputCompRef = useRef(null);

    const findCompaniesByName = () => {
      //
    }

    return (
      <>
        <View style={styles.fullWidthContainer}>
          <Label text="Company Name" style={styles.label} required={true} />
          <Input
            searchIcon={<SearchIcon width={20} height={20} />}
            onChangeText={setCompanyName}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.company_name}
            //@ts-ignore
            ref={companyNameInputCompRef}
            //@ts-ignore
            error={state.errors.company_name}
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
            //@ts-ignore
            ref={approvalAuthorityDropdownCompRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="Authority Person Name" style={styles.label} />
          <Input
            onChangeText={setAuthorityPersonName}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.authority_person_name}
            //@ts-ignore
            ref={authorityPersonNameInputCompRef}
            type="text"
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="Authority Mobile Number" style={styles.label} />
          <Input
            onChangeText={setAuthorityMobileNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.authority_mobile_no}
            //@ts-ignore
            ref={authorityMobileNoInputCompRef}
            //@ts-ignore
            error={state.errors.authority_mobile_no}
            inputType="numeric"
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
            ref={companyGstInputCompRef}
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
            ref={employeeNameInputCompRef}
            //@ts-ignore
            error={state.errors.employee_name}
            type="text"
            required={true}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="Employee Designation" style={styles.label} />
          <Input
            onChangeText={setEmployeeDesignation}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.employee_designation}
            //@ts-ignore
            ref={employeeDesignationInputCompRef}
            type="text"
            required={true}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="Employee Mobile Number" style={styles.label} />
          <Input
            onChangeText={setEmployeeMobileNo}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.employee_mobile_no}
            //@ts-ignore
            ref={employeeMobileNoInputCompRef}
            //@ts-ignore
            error={state.errors.employee_mobile_no}
            inputType="numeric"
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
            ref={companyAddressInputCompRef}
            type="text"
          />
        </View>
      </>
    );
  };
  
  export default BillingCompanyView;