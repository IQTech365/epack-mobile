import React, {useEffect, useRef, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './style';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import Label from '../../../../../common/Label';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import Spacer from '../../../../../common/Spacer';
import DropdownComponent from '../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import approvalAuthorityOptions from '../../../../../data/ApprovalAuthorityOptions.json';
import {debounce} from '../../../../../utils/utility';
import {useAppDispatch, useAppSelector} from '../../../../../redux/hooks';
import {
  getCustomersRequest,
  resetGetCustomersRequest,
} from '../../../../../redux/slices/CommonSlice';
import {
  ICustomer,
  ICustomerBillingInfo,
  ICustomersRequest,
} from '../../../../../interface/common/common';
import {Validator} from '../../../../../utils/validation';
import CompanyAddressView from '../CompanyAddressView';
import {getCurrentCompanyId} from '../../../../../utils/storage';
import {
  IEnquiry,
  IGetQuotationData,
} from '../../../../../interface/quotation/IGetQuotationsResponse';
import {IBillingInfo} from '../../../../../interface/enquiry/ISingleEnquiryResponse';

interface Props {
  fromEnquiry?: boolean;
  isEdit?: boolean;
  item?: IGetQuotationData;
}

const BillingCompanyView: React.FC<Props> = ({
  fromEnquiry = false,
  isEdit,
  item,
}) => {
  const {
    state,
    setCompanyName,
    setCustomerId,
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

  const dispatch = useAppDispatch();

  const {
    customers,
    getCustomersRequesting,
    getCustomersSuccess,
    getCustomersFailure,
  } = useAppSelector(state => state.Common);
  const [showCompanyList, setShowCompanyList] = useState<boolean>(false);
  const [selectedCompanyOption, setSelectedCompanyOption] =
    useState<ICustomer | null>(null);

  const handleCompanyName = (text: string) => {
    setCompanyName(text);
    if (!Validator.isEmpty(text)) {
      getCurrentCompanyId()
        .then(id => {
          const payload: ICustomersRequest = {
            companyId: id as string,
            searchKey: text,
          };
          debounce(dispatch(getCustomersRequest(payload)), 3000);
        })
        .catch(err => console.log(err));
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
    setShowCompanyList(false);
    dispatch(resetGetCustomersRequest());
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

  // useEffect(() => {
  //   if (fromEnquiry && state.enquiryItem) {
  //     const {enquiryItem} = state;
  //     if(enquiryItem.billingBy == "by Company") {
  //       const billingInfo:IBillingInfo = enquiryItem.billingDetails as IBillingInfo;
  //       if(billingInfo) {
  //         setCompanyName(billingInfo.companyName);
  //         setApprovalAuthority(billingInfo.approvalAuthority);
  //         const approvalAuthorityItem:TDropdownItem = approvalAuthorityOptions.find((d:TDropdownItem) => d.label == billingInfo.approvalAuthority) as TDropdownItem;
  //         if(approvalAuthorityItem) {
  //           //@ts-ignore
  //           approvalAuthorityDropdownCompRef && approvalAuthorityDropdownCompRef?.current?.setDefaultValue(approvalAuthorityItem);
  //         }
  //         setAuthorityPersonName(billingInfo.authorityPersonName);
  //         setAuthorityMobileNo(billingInfo.authorityPersonMobile);
  //         setCompanyGSt(billingInfo.companyGST);
  //         setEmployeeName(billingInfo.employeeName);
  //         setEmployeeDesignation(billingInfo.employeeDesignation);
  //         setEmployeeMobileNo(billingInfo.employeeMobile);
  //         setCompanyAddress(billingInfo.companyAddress);

  //       }
  //     }
  //   }
  // }, [state.enquiryItem]);

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
          approvalAuthorityDropdownCompRef &&
            approvalAuthorityDropdownCompRef.current.setDefaultValue(
              approvalAuthorityOptions[approvalAuthorityOptionIndex],
            );
        }
        setCustomerId(selectedCompanyOption._id);
        setCompanyName(selectedCompanyOption.partyName);
        setAuthorityPersonName(billingInfo.authorityPersonName);
        setAuthorityMobileNo(billingInfo.authorityPersonMobile);
        setCompanyGSt(billingInfo.companyGST);
        setEmployeeName(billingInfo.employeeName);
        setEmployeeMobileNo(billingInfo.employeeMobile);
        setEmployeeDesignation(billingInfo.employeeDesignation);
        setCompanyAddress(billingInfo.companyAddress);
      }
    }
  }, [selectedCompanyOption]);

  useEffect(() => {
    if (isEdit && item) {
      const _enquires: IEnquiry[] = item.enquiries;
      if (_enquires && _enquires.length > 0) {
        const singleEnquiry: IEnquiry = _enquires[0];
        if (singleEnquiry?.billingBy == 'by Company') {
          const billingInfo: ICustomerBillingInfo =
            singleEnquiry.billingDetails as ICustomerBillingInfo;
          if (billingInfo) {
            setCompanyName(billingInfo.companyName);
            setApprovalAuthority(billingInfo.approvalAuthority);
            const approvalAuthorityItem: TDropdownItem =
              approvalAuthorityOptions.find(
                (d: TDropdownItem) => d.label == billingInfo.approvalAuthority,
              ) as TDropdownItem;
            if (approvalAuthorityItem) {
              //@ts-ignore
              approvalAuthorityDropdownCompRef &&
                approvalAuthorityDropdownCompRef?.current?.setDefaultValue(
                  approvalAuthorityItem,
                );
            }
            setAuthorityPersonName(billingInfo.authorityPersonName);
            setAuthorityMobileNo(billingInfo.authorityPersonMobile);
            setCompanyGSt(billingInfo.companyGST);
            setEmployeeName(billingInfo.employeeName);
            setEmployeeDesignation(billingInfo.employeeDesignation);
            setEmployeeMobileNo(billingInfo.employeeMobile);
            setCompanyAddress(billingInfo.companyAddress);
          }
        }
      }
    }
  }, [isEdit]);

  return (
    <>
      <View style={styles.fullWidthContainer}>
        <Label text="Company Name" style={styles.label} required={true} />
        <Input
          // searchIcon={<SearchIcon width={20} height={20} />}
          onChangeText={handleCompanyName}
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
      <View style={styles.twoColumnContainer}>
        <View style={styles.itemContainer}>
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
        <View style={styles.itemContainer}>
          <Label text="Auth. Mobile No." style={styles.label} />
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
        <Label text="Employee Name" style={styles.label} />
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
        />
      </View>
      <Spacer height={4} />
      <View style={styles.twoColumnContainer}>
        <View style={styles.itemContainer}>
          <Label text="Emp. Mobile No." style={styles.label} />
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
        <View style={styles.itemContainer}>
          <Label text="Emp. Designation" style={styles.label} />
          <Input
            onChangeText={setEmployeeDesignation}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.employee_designation}
            //@ts-ignore
            ref={employeeDesignationInputCompRef}
            type="text"
          />
        </View>
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
      <Spacer height={4} />
      <CompanyAddressView
        fromEnquiry={fromEnquiry}
        isEdit={isEdit}
        item={item}
      />
    </>
  );
};

export default BillingCompanyView;
