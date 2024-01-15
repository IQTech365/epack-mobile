import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../common/CollapsibleView';
import {options2} from '../FreightDetailsView/components/utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import Spacer from '../../../../../common/Spacer';
import Input from '../../../../../common/Input';
import storageDurationOptions from '../../../../../data/storageDurationOptions.json';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import {formatDate4} from '../../../../../utils/formatter';
import { IQuotationFreight, IStorage } from '../../../../../interface/quotation/IGetSingleQuotationResponse';

interface Props {
  //
}

const StorageChargesView: React.FC<Props> = ({}) => {
  const {
    state,
    setStorage,
    setStorageDuration,
    setStorageFromDate,
    setStorageToDate,
    setStorageAmount,
  } = useQuotationFormContextHook();
  const storageDurationDropdownCompRef = useRef(null);
  const fromDateDropdownCompRef = useRef(null);
  const toDateDropdownCompRef = useRef(null);
  const amountInputCompRef = useRef(null);

  useEffect(() => {
    if(state.editQuotation && state.item) {
      const {item} = state;
      if(item) {
        const quotationfreight:IQuotationFreight = item.quotationfreights;
        if(quotationfreight) {
          const storageCharge:IStorage = quotationfreight.storageCharges;
          if(storageCharge) {
            setStorage(storageCharge.isRequired);
            const storageDurationItem:TDropdownItem = storageDurationOptions.find((d:TDropdownItem) => d.label == storageCharge.storageChargesType) as TDropdownItem;
            setStorageDuration(storageDurationItem.label);
            //@ts-ignore
            storageDurationDropdownCompRef && storageDurationDropdownCompRef?.current?.setDefaultValue(storageDurationItem);
            setStorageAmount(storageCharge.amount);
            if(storageCharge.storageChargesType == storageDurationOptions[2].label) {
              //@ts-ignore
              fromDateDropdownCompRef && fromDateDropdownCompRef?.current?.setDefaultValue(new Date(storageCharge.fromDate));
              setStorageFromDate(formatDate4(new Date(storageCharge.fromDate)));
              //@ts-ignore
              toDateDropdownCompRef && toDateDropdownCompRef?.current?.setDefaultValue(new Date(storageCharge.toDate));
              setStorageToDate(formatDate4(new Date(storageCharge.toDate)));
            }
          }
        }
      }
    }
  }, [state.editQuotation, state.item]);

  return (
    <CollapsibleView title="STORAGE CHARGES" collapsed={true}>
      <View>
        <View style={styles.optionContainer}>
          {options2.map((option: string, index: number) => (
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
        {state.storage == options2[0] ? (
          <>
            <View style={styles.fullWidthContainer}>
              <Label text="Storage Duration" style={styles.labelText} />
              <DropdownComponent
                data={storageDurationOptions}
                onSelect={(item: TDropdownItem) => {
                  setStorageDuration(item.label);
                }}
                defaultValue={storageDurationOptions[0]}
                //@ts-ignore
                ref={storageDurationDropdownCompRef}
              />
            </View>
            {state.storage_duration == storageDurationOptions[2].label ? (
              <>
                <Spacer height={4} />
                <View style={styles.twoColumnContainer}>
                  <View style={styles.compContainer}>
                    <Label text="From Date" style={styles.labelText} />
                    <DatePickerComponent
                      onDateSelect={(date: Date) => {
                        setStorageFromDate(formatDate4(date));
                      }}
                      //@ts-ignore
                      ref={fromDateDropdownCompRef}
                    />
                  </View>
                  <View style={styles.compContainer}>
                    <Label text="To Date" style={styles.labelText} />
                    <DatePickerComponent
                      onDateSelect={(date: Date) => {
                        setStorageToDate(formatDate4(date));
                      }}
                      //@ts-ignore
                      ref={toDateDropdownCompRef}
                    />
                  </View>
                </View>
              </>
            ) : null}
            <Spacer height={4} />
            <View style={styles.fullWidthContainer}>
              <Label text="Amount" style={styles.labelText} />
              <Input
                onChangeText={setStorageAmount}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.storage_amount}
                //@ts-ignore
                //error={showErrors && errors.dropPincode}
                //@ts-ignore
                ref={amountInputCompRef}
                inputType="numeric"
              />
            </View>
          </>
        ) : null}
      </View>
    </CollapsibleView>
  );
};

export default StorageChargesView;
