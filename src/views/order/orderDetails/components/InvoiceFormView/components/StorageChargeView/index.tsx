import React, {useEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import Spacer from '../../../../../../../common/Spacer';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {transitInsuranceOptions} from '../../utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useInvoiceFormContextHook} from '../../../../../../../provider/InvoiceFormContextProvider';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import DatePickerComponent from '../../../../../../../common/DatePickerComponent';
import storageDurationOptions from '../../../../../../../data/storageDurationOptions.json';
import {formatDate4} from '../../../../../../../utils/formatter';
import { IInvoice } from '../../../../../../../interface/order/IGetInvoiceListResponse';
interface Props {
  isEdit?:boolean;
  invoiceData?:IInvoice;
}

const StorageChargeView: React.FC<Props> = ({isEdit, invoiceData}) => {
  const storageDropdownRef = useRef(null);
  const storageAmountInputRef = useRef(null);
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);

  const {
    state,
    setStorage,
    setStorageDuration,
    setStorageFromDate,
    setStorageToDate,
    setStorageAmount,
  } = useInvoiceFormContextHook();

  const _initFormValues = () => {
    if(isEdit && invoiceData) {
      const {storageCharges, strorageStatus} = invoiceData || {};
      setStorage(strorageStatus);
      if(storageCharges !== null){
        const durationItem:TDropdownItem = storageDurationOptions.find((e:TDropdownItem) => e.label == storageCharges.storageChargesType) as TDropdownItem;
        if(durationItem !== undefined){
          //@ts-ignore
          storageDropdownRef && storageDropdownRef?.current?.setDefaultValue(durationItem);
          setStorageDuration(storageCharges.storageChargesType);
        }

        //@ts-ignore
        fromDateRef && fromDateRef?.current?.setDefaultValue(new Date(storageCharges.fromDate));
        setStorageFromDate(storageCharges.fromDate);

        //@ts-ignore
        toDateRef && toDateRef?.current?.setDefaultValue(new Date(storageCharges.toDate));
        setStorageToDate(storageCharges.toDate);

        //@ts-ignore
        storageAmountInputRef && storageAmountInputRef?.current?.setValue(storageCharges.amount);
        setStorageAmount(storageCharges.amount);
      }
    }
  }

  useEffect(() => {
    _initFormValues();
  }, []);

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
      {state.storage == transitInsuranceOptions[0] ? (
        <>
          <Spacer height={4} />
          <View style={styles.fullWidthCompContainer}>
            <Label text="Storage Duration" style={styles.label} />
            <DropdownComponent
              //@ts-ignore
              ref={storageDropdownRef}
              data={storageDurationOptions}
              onSelect={(item: TDropdownItem) => {
                setStorageDuration(item.label);
              }}
            />
          </View>
          {state.storage_duration == storageDurationOptions[2].label ? (
            <>
              <Spacer height={4} />
              <View style={styles.halfWidthCompContainer}>
                <View style={styles.compContainer}>
                  <Label text="From Date" style={styles.label} />
                  <DatePickerComponent
                    //@ts-ignore
                    ref={fromDateRef}
                    onDateSelect={(date: Date) => {
                      setStorageFromDate(formatDate4(date));
                    }}
                  />
                </View>
                <View style={styles.compContainer}>
                  <Label text="To Date" style={styles.label} />
                  <DatePickerComponent
                    //@ts-ignore
                    ref={toDateRef}
                    onDateSelect={(date: Date) => {
                      setStorageToDate(formatDate4(date));
                    }}
                  />
                </View>
              </View>
            </>
          ) : null}
          <Spacer height={4} />
          <View style={styles.fullWidthCompContainer}>
            <Label text="Amount" style={styles.label} />
            <Input
              //@ts-ignore
              ref={storageAmountInputRef}
              onChangeText={(text: string) => {
                setStorageAmount(text);
              }}
              value={state.storage_amount}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </>
      ) : null}
    </>
  );
};

export default StorageChargeView;
