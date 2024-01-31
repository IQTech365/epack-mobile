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
import { ToastType, showToast } from '../../../../../utils/utility';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import useAuthId from '../../../../../hooks/useAuthId';
import { ISubmodule } from '../../../../../interface/common/common';
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
    getBanksRequesting,
    banks,
  } = useAppSelector(state => state.Setting);
  const {submodules} = useAppSelector(state => state.Common);
  const authId = useAuthId();

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

  
  const handleSave = () => {
    getCurrentCompanyId().then(id => {
      const payload: IAddPaymentMethodRequest = {
        companyId: id as string,
        accountType: accountType,
        bankId: selectedUPI,
        accountHolderName: accountHolder,
        accountNumber: accountNumber,
        ifscCode:ifscCode,
        upiType:selectedUPI,
        upiId:upiId,
        createdBy:authId,
      }
      dispatch(addPaymentMethodRequest(payload));
    }).catch(err => console.log(err));
  };

  const _getSubmodules = (): ISubmodule[] => {
    let items: ISubmodule[] = [];
    const {data} = submodules || {};
    if (data && Array.isArray(data) && data.length > 0) {
      items = data;
    }
    return items.filter((d:ISubmodule) => d.availableOnDocument);
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
      showToast('Account Detail Added.', ToastType.SUCCESS);
      dispatch(resetAddPaymentMethodRequest());
    } else if (!addPaymentMethodRequesting && addPaymentMethodFailure) {
      showToast('Account Detail Not Added.', ToastType.ERROR);
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
          {_getSubmodules()?.map((item:ISubmodule, index: number) => {
            return (
              <View style={styles.checkboxItem}  key={`${index}`}>
                <BouncyCheckbox
                  size={25}
                  fillColor={COLOR_BLUE}
                  unfillColor="#FFFFFF"
                  text={item.subModuleName}
                  iconStyle={styles.iconStyle}
                  innerIconStyle={styles.innerIconStyle}
                  textStyle={styles.textStyle2}
                  style={{marginRight: 15}}
                  textContainerStyle={{paddingLeft: 0}}
                  onPress={(isChecked: boolean) => {
                    handleModulesApplyFor(item._id, isChecked);
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
