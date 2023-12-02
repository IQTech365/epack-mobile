import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import Spacer from '../../../../../../../common/Spacer';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {approvalAuthorityOptions, transitInsuranceOptions} from '../../utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useInvoiceFormContextHook} from '../../../../../../../provider/InvoiceFormContextProvider';
import { TDropdownItem } from '../../../../../../../type/TDropdownItem';
import DatePickerComponent from '../../../../../../../common/DatePickerComponent';

interface Props {}

const StorageChargeView: React.FC<Props> = () => {
  const stateDropdownCompRef = useRef(null);
  const {
    state,
    setStorage,
    setStorageDuration,
    setStorageFromDate,
    setStorageToDate,
    setStorageAmount,
  } = useInvoiceFormContextHook();

  return (
    <>
      <View style={styles.optionContainer}>
        {transitInsuranceOptions.map((option: string, index: number) => (
          <BouncyCheckbox
            key={`${index}`}
            size={25}
            unfillColor="#FFFFFF"
            text={option}
            fillColor={COLOR_BLUE}
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle}
            style={styles.style}
            textContainerStyle={styles.textContainerStyle}
            onPress={(isChecked: boolean) => {
              setStorage(option);
            }}
            isChecked={state.storage == option}
            disableBuiltInState={true}
          />
        ))}
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Storage Duration" style={styles.label} />
        <DropdownComponent
          data={approvalAuthorityOptions}
          onSelect={(item:TDropdownItem) => {
            setStorageDuration(item.label);
          }}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.halfWidthCompContainer}>
        <View style={styles.compContainer}>
          <Label text="From Date" style={styles.label} />
          <DatePickerComponent onDateSelect={() => {}} />
        </View>
        <View style={styles.compContainer}>
          <Label text="To Date" style={styles.label} />
          <DatePickerComponent onDateSelect={() => {}} />
        </View>
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Amount" style={styles.label} />
        <Input
          onChangeText={(text:string) => {
            setStorageAmount(text);
          }}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
    </>
  );
};

export default StorageChargeView;
