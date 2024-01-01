/* eslint-disable prettier/prettier */
import React, {useState, useEffect, useCallback} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Toast from 'react-native-toast-message';
import styles from './style';
import Button from '../../../../../common/Button';
import accountTypeOptions from '../../../../../data/accountType.json';
import bankNameOptions from '../../../../../data/bankNameOptions.json';
import UPIOptions from '../../../../../data/UPIOptions.json';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { IAddPaymentMethodRequest } from '../../../../../interface/setting/packerProfile/paymentMethod/IAddPaymentMethodRequest';
import { addPaymentMethodRequest, getBanksRequest, resetAddPaymentMethodRequest } from '../../../../../redux/slices/ProfileSettingSlice';
import Spinner from '../../../../../common/Spinner';
import { ISubmoduleData } from '../../../../../interface/setting/packerProfile/ISubmodule';
import useCompanyId from '../../../../../hooks/useCompanyId';
interface IAccountDetailsProps {}

interface IAccountOptions {
  label: string;
  value: string;
}

const AccountDetailUpdateView: React.FC<IAccountDetailsProps> = ({}) => {
  const [accountType, setAccountType] = useState<string>('');
  const [selectedUPI, setSelectedUPI] = useState<string>('');
  const [accountHolder, setAccountHolder] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [ifscCode, setIfscCode] = useState<string>('');
  const [upiId, setUPIId] = useState<string>('');
  const [bankId, setBankId] = useState<string>('');
  const [accountOptions, setAccountOptions] = useState<IAccountOptions[]>(bankNameOptions);
  const [modules, setModules] = useState<string[]>(['']);
  const dispatch = useAppDispatch();
  const {
    addPaymentMethodRequesting,
    addPaymentMethodSuccess,
    addPaymentMethodFailure,
    submodules,
    getBanksRequesting,
    banks,
  } = useAppSelector(state => state.Setting);
  const {data: submodulesData = []} = submodules || {};
  const {otpData} = useAppSelector(state => state.OTP);

  const handleAccountType = (item: TDropdownItem) => {
    setAccountType(item.label);
  };

  const handleSelectedAccountOption = (item: TDropdownItem) => {
      setSelectedUPI(item.label);
  }

  const handleChangeAccountHolder = (text: string)=>{
    setAccountHolder(text);
  }

  const handleChangeAccountNumber = (text: string)=>{
    setAccountNumber(text);
  }

  const handleChangeIFSCCode = (text: string)=>{
    setIfscCode(text);
  }

  
  const handleChangeUPIid = (text: string)=>{
    setUPIId(text);
  }

  const handleModulesApplyFor = (moduleName: string, isChecked: boolean) => {
    const tempArr = [...modules];
    if(isChecked) {
      const itemIndex = tempArr.findIndex(e => e == moduleName);
      if(itemIndex == -1) {
        tempArr.push(moduleName);
        setModules(tempArr);
      }
    } else {
      const filterArr = tempArr.filter(e => e !== moduleName);
      setModules(filterArr);
    }
  }

  
  const handleSave = async () => {
    const companyId = await useCompanyId();
    const payload: IAddPaymentMethodRequest = {
      companyId: companyId,
      accountType: accountType,
      bankId: selectedUPI,
      accountHolderName: accountHolder,
      accountNumber: accountNumber,
      ifscCode:ifscCode,
      upiType:selectedUPI,
      upiId:upiId,
      createdBy:otpData?.data.id as string,
    }
    console.log('payment method-payload--', JSON.stringify(payload));
    dispatch(addPaymentMethodRequest(payload));
  };

  useEffect(() => {
    dispatch(getBanksRequest());
  }, []);

  useEffect(() => {
    if(accountType == 'Bank Account') {
      setAccountOptions(bankNameOptions);
    } else if(accountType == 'UPI') {
      setAccountOptions(UPIOptions);
    }
  }, [accountType]);

  useEffect(() => {
    if (!addPaymentMethodRequesting && addPaymentMethodSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Account Detail',
        text2: 'Account Detail has been added successfully',
      });
      dispatch(resetAddPaymentMethodRequest());
    } else if (!addPaymentMethodRequesting && addPaymentMethodFailure) {
      Toast.show({
        type: 'error',
        text1: 'Account Detail',
        text2: 'Error in adding Account Detail. Please try again!',
      });
      dispatch(resetAddPaymentMethodRequest());
    }
  }, [addPaymentMethodRequesting, addPaymentMethodSuccess, addPaymentMethodFailure]);

  const accountTypeLabel =
    accountType == 'Bank Account' ? 'Select Bank' : 'Select UPI';

  const showBankDetailCaptureView = () => {
    if (accountType == 'UPI') return null;
    return (
      <>
        <View style={styles.mainWrapper}>
          <View style={styles.textContainer}>
            <Label text="Account Holder Name" style={styles.label} />
            <Input
              onChangeText={handleChangeAccountHolder}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.textContainer}>
            <Label text="Enter Account Number" style={styles.label} />
            <Input
              onChangeText={handleChangeAccountNumber}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Enter IFSC Code" style={styles.label} />
          <Input
            onChangeText={handleChangeIFSCCode}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
      </>
    );
  };

  const showUPIDetailCaptureView = () => {
    if (accountType == 'Bank Account') return null;
    return (
      <>
        {selectedUPI == 'Other' ? (
          <>
            <Spacer height={4} />
            <View style={styles.textContainer2}>
              <Label text="Enter UPI Provider" style={styles.label} />
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </>
        ) : null}
        <Spacer height={4} />
        <View style={styles.textContainer2}>
          <Label text="Enter UPI ID" style={styles.label} />
          <Input
            onChangeText={handleChangeUPIid}
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
      <View
        style={styles.wrapper}>
        <View style={styles.textContainer2}>
          <Label text="Choose Account Type" style={styles.label} />
          <DropdownComponent
            data={accountTypeOptions}
            onSelect={handleAccountType}
          />
        </View>
        <View style={styles.textContainer2}>
          <Label text={accountTypeLabel} style={styles.label} />
          <DropdownComponent data={accountOptions} onSelect={handleSelectedAccountOption} />
        </View>
        <Spacer height={4} />
        {showBankDetailCaptureView()}
        {showUPIDetailCaptureView()}
        <Spacer height={14} />
        <View style={styles.textContainer2}>
          <Label text="Applicable For" style={styles.label} />
        </View>
        <View style={styles.applicableWrapper}>
          {submodulesData?.map((item:ISubmoduleData, index: number) => {
            return (
              <View style={styles.checkboxItem}  key={`${index}`}>
                <BouncyCheckbox
                  size={25}
                  fillColor={COLOR_BLUE}
                  unfillColor="#FFFFFF"
                  text={item.submoduleName}
                  iconStyle={{
                    borderColor: 'red',
                    borderRadius: 0,
                    width: 18,
                    height: 18,
                  }}
                  innerIconStyle={{
                    borderWidth: 1,
                    borderRadius: 0,
                    width: 18,
                    height: 18,
                  }}
                  textStyle={{
                    fontFamily: 'JosefinSans-Regular',
                    textDecorationLine: 'none',
                  }}
                  style={{marginRight: 15}}
                  textContainerStyle={{paddingLeft: 0}}
                  onPress={(isChecked: boolean) => {
                    handleModulesApplyFor(item.submoduleId, isChecked);
                  }}
                  isChecked={false}
                />
              </View>
            );
          })}
        </View>
        <Spacer height={8} />
        <Button
          text="SAVE"
          onPress={handleSave}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={8} />
        <Spinner show={addPaymentMethodRequesting} />
      </View>
        </AvoidSoftInputViewHOC>
  );
};

export default AccountDetailUpdateView;
