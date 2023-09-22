/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './style';
import Button from '../../../../../common/Button';
import accountTypeOptions from '../../../../../data/accountType.json';
import bankNameOptions from '../../../../../data/bankNameOptions.json';
import UPIOptions from '../../../../../data/UPIOptions.json';
import applicableForOptions from '../../../../../data/applicableForOptions.json';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
interface IAccountDetailsProps {}

const AccountDetailUpdateView: React.FC<IAccountDetailsProps> = ({}) => {
  const [accountType, setAccountType] = useState<string>('Bank Account');
  const [selectedUPI, setSelectedUPI] = useState<string>('Paytm');

  const handleAccountType = (item: TDropdownItem) => {
    setAccountType(item.label);
  };

  const handleSelectedAccountOption = (item: TDropdownItem) => {
      setSelectedUPI(item.label);
  }

  const accountOptions =
    accountType == 'Bank Account' ? bankNameOptions : UPIOptions;
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
              onChangeText={() => {}}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.textContainer}>
            <Label text="Enter Account Number" style={styles.label} />
            <Input
              onChangeText={() => {}}
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
            onChangeText={() => {}}
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
            onChangeText={() => {}}
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
        style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
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
          {applicableForOptions.map((item, index) => {
            return (
              <View style={styles.checkboxItem}>
                <BouncyCheckbox
                  size={25}
                  fillColor={COLOR_BLUE}
                  unfillColor="#FFFFFF"
                  text={item.template}
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
                    //   setFixedFreight(isChecked);
                    //   handleFixedFreightTemplate(isChecked);
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
          onPress={() => {
            console.log('submitted data');
          }}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={8} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default AccountDetailUpdateView;
