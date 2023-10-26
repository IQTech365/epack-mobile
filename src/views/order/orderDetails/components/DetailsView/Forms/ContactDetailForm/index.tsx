import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../../../common/AvoidSoftInputViewHOC';
import Input from '../../../../../../../common/Input';
import Label from '../../../../../../../common/Label';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import styles from './style';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import Spacer from '../../../../../../../common/Spacer';
import Button from '../../../../../../../common/Button';
import {MODULE_NAME} from '../../enum/EModuleName';
import {IGetEnquiriesData} from '../../../../../../../interface/enquiry/IGetEnquiriesResponse';
import {IGetOrdersData} from '../../../../../../../interface/order/IGetOrdersResponse';
import DeleteIcon from '../../../../../../../images/icons/delete.svg';
import approvalAuthorityOptions from '../../../../../../../data/ApprovalAuthorityOptions.json';
import { IUpdateCompanyContactDetailRequest, IUpdateIndividualContactDetailRequest } from '../../../../../../../interface/order/IUpdateContactDetails';
import { useAppDispatch, useAppSelector } from '../../../../../../../redux/hooks';
import { updateContactDetailsRequest } from '../../../../../../../redux/slices/EnquirySlice';
import Toast from 'react-native-toast-message';
import { resetUpdateContactRequest } from '../../../../../../../redux/slices/ProfileSettingSlice';
interface IContactDetailFormProps {
  moduleName: MODULE_NAME;
  item: IGetOrdersData | IGetEnquiriesData;
  enquiryId: string;
}

const ContactDetailForm: React.FC<IContactDetailFormProps> = ({
  moduleName,
  item,
  enquiryId,
}) => {
  let itemObj =
    moduleName == MODULE_NAME.ORDER
      ? (item as IGetOrdersData)
      : (item as IGetEnquiriesData);
  if (moduleName == MODULE_NAME.ORDER) {
    itemObj = item as IGetOrdersData;
  } else if (moduleName == MODULE_NAME.ENQUIRY) {
    itemObj = item as IGetEnquiriesData;
  }
  const [contactPersonName, setContactPersonName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [landline, setLandline] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [orderAmount, setOrderAmount] = useState<string>('');
  const [tokenAmount, setTokenAmount] = useState<string>('');
  const [alternateNumbers, setAlternateNumbers] = useState<string[]>([]);
  const [alternateNumber, setAlternateNumber] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [approvalAuthority, setApprovalAuthority] = useState<string>('');
  const [authorityPersonName, setAuthorityPersonName] = useState<string>('');
  const [authorityMobileNumber, setAuthorityMobileNumber] =
    useState<string>('');
  const [companyGST, setCompanyGST] = useState<string>('');
  const [employeeName, setEmployeeName] = useState<string>('');
  const [employeeDesignation, setEmployeeDesignation] = useState<string>('');
  const [employeeMobileNumber, setEmployeeMobileNumber] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');

  const dispatch = useAppDispatch();
  const {
    updateContactDetailRequesting,
    updateContactDetailSuccess,
    updateContactDetailFailure,
  } = useAppSelector(state => state.Enquiry);

  const approvalAuthDropdownRef = useRef(null);

  console.log('alternateNumbers--', JSON.stringify(alternateNumbers));

  const getContactPersonName = () => {
    let name: string = '';
    if (itemObj.billingBy == 'by Individual') {
      name = itemObj.partyName;
    } else {
      //@ts-ignore
      const {authorityPersonName} = itemObj.billingDetails || {};
      name = authorityPersonName;
    }
    return name;
  };

  const handleContactPersonName = useCallback(
    (text: string) => {
      setContactPersonName(text);
    },
    [contactPersonName],
  );

  const handleContactEmail = useCallback(
    (text: string) => {
      setEmail(text);
    },
    [email],
  );

  const handleContactLandline = useCallback(
    (text: string) => {
      setLandline(text);
    },
    [landline],
  );

  const handleContactMobile = useCallback(
    (text: string) => {
      setMobile(text);
    },
    [mobile],
  );

  const handleOrderAmount = useCallback(
    (text: string) => {
      setOrderAmount(text);
    },
    [orderAmount],
  );

  const handleTokenAmount = useCallback(
    (text: string) => {
      setTokenAmount(text);
    },
    [tokenAmount],
  );

  const handleAddAlternateNumber = useCallback(
    (text: string) => {
      setAlternateNumber(text);
    },
    [alternateNumber],
  );

  const handleAddAlternateNumbers = () => {
    const tempArr = [...alternateNumbers];
    tempArr.push(alternateNumber as string);
    setAlternateNumbers(tempArr);
    setAlternateNumber('');
  };

  const handleDelteAlternateNumber = (number: string) => {
    const tempArr = [...alternateNumbers];
    const filter = tempArr.filter(e => e !== number);
    setAlternateNumbers(filter);
  };

  const handleCompanyName = useCallback(
    (text: string) => {
      setCompanyName(text);
    },
    [companyName],
  );

  const handleApprovalAuthority = useCallback(
    (text: string) => {
      setApprovalAuthority(text);
    },
    [approvalAuthority],
  );

  const handleAuthorityPersonName = useCallback(
    (text: string) => {
      setAuthorityPersonName(text);
    },
    [authorityPersonName],
  );

  const handleAuthorityPersonMobile = useCallback(
    (text: string) => {
      setAuthorityMobileNumber(text);
    },
    [authorityMobileNumber],
  );

  const handleCompanyGST = useCallback(
    (text: string) => {
      setCompanyGST(text);
    },
    [companyGST],
  );

  const handleEmployeeName = useCallback(
    (text: string) => {
      setEmployeeName(text);
    },
    [employeeName],
  );

  const handleEmployeeDesignation = useCallback(
    (text: string) => {
      setEmployeeDesignation(text);
    },
    [employeeDesignation],
  );

  const handleEmployeeMobileNumber = useCallback(
    (text: string) => {
      setEmployeeMobileNumber(text);
    },
    [employeeMobileNumber],
  );

  const handleCompanyAddress = useCallback(
    (text: string) => {
      setCompanyAddress(text);
    },
    [companyAddress],
  );

  const showAlternateNumbers = () => {
    if (alternateNumbers.length > 0) {
      return alternateNumbers.map((e, i) => {
        return (
          <View key={`{${i}}`}>
            <Spacer height={20} />
            <View style={styles.alternateContactsContainer}>
              <View style={styles.numberContainer}>
                <Text style={styles.numberText}>{e}</Text>
              </View>
              <View style={styles.actionContainer}>
                <TouchableOpacity onPress={() => handleDelteAlternateNumber(e)}>
                  <DeleteIcon width={30} height={30} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      });
    }
    return null;
  };

  const handleUpdate = () => {
    if(itemObj.billingBy == 'by Individual') {
      const payload:IUpdateIndividualContactDetailRequest = {
        email: email,
        landline: landline,
        mobile: mobile,
        orderAmount: orderAmount,
        tokenAmount: tokenAmount,
        alternateNumbers: alternateNumbers,
      }
      dispatch(updateContactDetailsRequest({id: enquiryId, requestBody: payload}));
    } else if(itemObj.billingBy == 'by Company') {
      const payload:IUpdateCompanyContactDetailRequest = {
        companyName: companyName,
        approvalAuthority:approvalAuthority,
        authorityPersonName: authorityPersonName,
        authorityMobileNumber: authorityMobileNumber,
        companyGST: companyGST,
        employeeName: employeeName,
        employeeDesignation: employeeDesignation,
        employeeMobileNumber: employeeMobileNumber,
        companyAddress: companyAddress,
        email: email,
        landline: landline,
        orderAmount: orderAmount,
        tokenAmount: tokenAmount,
        alternateNumbers: alternateNumbers,
      }
      dispatch(updateContactDetailsRequest({id: enquiryId, requestBody: payload}));
    }
  };

  useEffect(() => {
    setContactPersonName(getContactPersonName());
    setEmail(itemObj.email);
    //@ts-ignore
    setLandline(itemObj?.landline);
    setMobile(itemObj.mobile);
    if (moduleName == MODULE_NAME.ORDER) {
      //@ts-ignore
      setOrderAmount(itemObj?.orderAmount);
      //@ts-ignore
      setTokenAmount(itemObj?.tokenAmount);
      setAlternateNumbers([...itemObj?.alternateNumbers]);
    }
  }, []);

  useEffect(() => {
    if (!updateContactDetailRequesting && updateContactDetailSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Address Update',
        text2: 'Address has been updated successfully',
      });
      dispatch(resetUpdateContactRequest());
    } else if (!updateContactDetailRequesting && updateContactDetailFailure) {
      Toast.show({
        type: 'error',
        text1: 'Address Update',
        text2: 'Error in updating address. Please try again!',
      });
      dispatch(resetUpdateContactRequest());
    }
  }, [updateContactDetailRequesting, updateContactDetailSuccess, updateContactDetailFailure]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        {itemObj.billingBy == 'by Individual' ? (
          <>
            <Spacer height={4} />
            <View style={styles.elementContainer3}>
              <Label text="Contact Person" style={styles.label} />
              <Input
                onChangeText={handleContactPersonName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={contactPersonName}
              />
            </View>
          </>
        ) : null}
        {itemObj.billingBy == 'by Company' ? (
          <>
            <Spacer height={4} />
            <View style={styles.elementContainer3}>
              <Label text="Company Name" style={styles.label} />
              <Input
                onChangeText={handleCompanyName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={companyName}
              />
            </View>
          </>
        ) : null}
        {itemObj.billingBy == 'by Company' ? (
          <>
            <Spacer height={4} />
            <View style={styles.elementContainer3}>
              <Label text="Approval Authority" style={styles.label} />
              <DropdownComponent
                data={approvalAuthorityOptions}
                onSelect={(item: TDropdownItem) => {
                  handleApprovalAuthority(item.label);
                }}
                //@ts-ignore
                ref={approvalAuthDropdownRef}
              />
            </View>
          </>
        ) : null}
        {itemObj.billingBy == 'by Company' ? (
          <>
            <Spacer height={4} />
            <View style={styles.elementContainer3}>
              <Label text="Authority Person Name" style={styles.label} />
              <Input
                onChangeText={handleAuthorityPersonName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={authorityPersonName}
              />
            </View>
          </>
        ) : null}
        {itemObj.billingBy == 'by Company' ? (
          <>
            <Spacer height={4} />
            <View style={styles.elementContainer3}>
              <Label text="Authority Mobile Number" style={styles.label} />
              <Input
                onChangeText={handleAuthorityPersonMobile}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={authorityMobileNumber}
              />
            </View>
          </>
        ) : null}
        {itemObj.billingBy == 'by Company' ? (
          <>
            <Spacer height={4} />
            <View style={styles.elementContainer3}>
              <Label text="Company GST" style={styles.label} />
              <Input
                onChangeText={handleCompanyGST}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={companyGST}
              />
            </View>
          </>
        ) : null}
        {itemObj.billingBy == 'by Company' ? (
          <>
            <Spacer height={4} />
            <View style={styles.elementContainer3}>
              <Label text="Employee Name" style={styles.label} />
              <Input
                onChangeText={handleEmployeeName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={employeeName}
              />
            </View>
          </>
        ) : null}
        {itemObj.billingBy == 'by Company' ? (
          <>
            <Spacer height={4} />
            <View style={styles.elementContainer3}>
              <Label text="Employee Designation" style={styles.label} />
              <Input
                onChangeText={handleEmployeeDesignation}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={employeeDesignation}
              />
            </View>
          </>
        ) : null}
        {itemObj.billingBy == 'by Company' ? (
          <>
            <Spacer height={4} />
            <View style={styles.elementContainer3}>
              <Label text="Employee Mobile Number" style={styles.label} />
              <Input
                onChangeText={handleEmployeeMobileNumber}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={employeeMobileNumber}
              />
            </View>
          </>
        ) : null}
        {itemObj.billingBy == 'by Company' ? (
          <>
            <Spacer height={4} />
            <View style={styles.elementContainer3}>
              <Label text="Company Address" style={styles.label} />
              <Input
                onChangeText={handleCompanyAddress}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={companyAddress}
              />
            </View>
          </>
        ) : null}
        <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="Email" style={styles.label} />
          <Input
            onChangeText={handleContactEmail}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={email}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Landline" style={styles.label} />
            <Input
              onChangeText={handleContactLandline}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              value={landline}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Mobile" style={styles.label} />
            <Input
              onChangeText={handleContactMobile}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              value={mobile}
              editable={itemObj.billingBy == 'by Individual'}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Order Amount" style={styles.label} />
            <Input
              onChangeText={handleOrderAmount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              value={orderAmount}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Token Amount" style={styles.label} />
            <Input
              onChangeText={handleTokenAmount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              value={tokenAmount}
            />
          </View>
        </View>
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Alternate Mob. Numbers" style={styles.label} />
            <Input
              onChangeText={handleAddAlternateNumber}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              value={alternateNumber}
            />
          </View>
          <View style={styles.itemContainer}>
            <Spacer height={32} />
            <Button
              text="Add"
              onPress={handleAddAlternateNumbers}
              disabled={false}
              style={styles.addMoreContainer}
              textStyle={styles.addMoreText}
              variant="contain"
            />
          </View>
        </View>
        {showAlternateNumbers()}
        <Spacer height={20} />
        <Button
          text="UPDATE"
          onPress={handleUpdate}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default ContactDetailForm;
