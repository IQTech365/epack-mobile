import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {discountOptions, discountPercentOptions} from '../../../../utils';
import {
  COLOR_BLACK,
  COLOR_BLUE,
  COLOR_GRAY4,
} from '../../../../../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Spacer from '../../../../../../../../../common/Spacer';
import {useInvoiceFormContextHook} from '../../../../../../../../../provider/InvoiceFormContextProvider';
import DropdownComponent from '../../../../../../../../../common/DropdownComponent';
import Input from '../../../../../../../../../common/Input';
import {TDropdownItem} from '../../../../../../../../../type/TDropdownItem';
import {IInvoice} from '../../../../../../../../../interface/order/IGetInvoiceListResponse';

interface Props {
  isEdit?: boolean;
  invoiceData?: IInvoice;
}

const FreightDiscountView: React.FC<Props> = ({isEdit, invoiceData}) => {
  const {state, setDiscountInInvoice, setDiscountValueOrPercent} =
    useInvoiceFormContextHook();

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const _initFormValues = () => {
    if (isEdit && invoiceData) {
      const {discountType, discountAmount} = invoiceData || {};
      setDiscountInInvoice(discountType);
      // const discountOption:TDropdownItem = discountPercentOptions.find((e:TDropdownItem) => e.value = discountAmount) as TDropdownItem;
      // if(discountType === 'Discount @%' && discountOption !== undefined) {
      //   //@ts-ignore
      //   dropdownRef && dropdownRef?.current?.setDefaultValue(discountOption);
      //   setDiscountValueOrPercent(discountAmount);
      // } else {
      //   //@ts-ignore
      //   inputRef && inputRef?.current?.setValue(discountAmount);
      //   setDiscountValueOrPercent(discountAmount);
      // }
    }
  };

  const _initDiscountAmountOrPercent = () => {
    if (isEdit && invoiceData) {
      const {discountType, discountAmount} = invoiceData || {};
      const discountOption: TDropdownItem = discountPercentOptions.find(
        (e: TDropdownItem) => (e.value = discountAmount),
      ) as TDropdownItem;
      console.log('discountOption----', JSON.stringify(discountOption));
      if (discountType == 'Discount @%' && discountOption !== undefined) {
        //@ts-ignore
        dropdownRef && dropdownRef?.current?.setDefaultValue(discountOption);
        //@ts-ignore
        dropdownRef && dropdownRef?.current?.refreshComp();
        setDiscountValueOrPercent(discountAmount);
      } else {
        //@ts-ignore
        inputRef && inputRef?.current?.setValue(discountAmount);
        setDiscountValueOrPercent(discountAmount);
      }
    }
  };

  const showDiscountInputView = () => {
    if (state.discount_in_invoice == discountOptions[0]) {
      return (
        <DropdownComponent
          //@ts-ignore
          ref={dropdownRef}
          data={discountPercentOptions}
          onSelect={(item: TDropdownItem) => {
            setDiscountValueOrPercent(item.value);
          }}
        />
      );
    } else if (state.discount_in_invoice == discountOptions[1]) {
      return (
        <Input
          //@ts-ignore
          ref={inputRef}
          onChangeText={setDiscountValueOrPercent}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          value={state.discount_value_or_percent}
          placeholder="Enter flat discount amount"
          placeholderTextColor={COLOR_GRAY4}
          inputType="numeric"
        />
      );
    }
    return null;
  };

  useEffect(() => {
    _initFormValues();
  }, []);

  useLayoutEffect(() => {
    _initDiscountAmountOrPercent();
  }, [state.discount_in_invoice]);

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.container}>
        <Text style={styles.labelText}>Discount in Invoice</Text>
      </View>
      <Spacer height={10} />
      <View style={styles.optionContainer}>
        {discountOptions.map((option: string, index: number) => (
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
              setDiscountInInvoice(option);
              if (option == discountOptions[2]) {
                setDiscountValueOrPercent('');
              }
            }}
            isChecked={state.discount_in_invoice == option}
            disableBuiltInState={true}
          />
        ))}
      </View>
      <Spacer height={10} />
      <View style={styles.fullWidthContainer}>
        {state.discount_in_invoice == discountOptions[0] ? (
          <DropdownComponent
            //@ts-ignore
            ref={dropdownRef}
            data={discountPercentOptions}
            onSelect={(item: TDropdownItem) => {
              setDiscountValueOrPercent(item.value);
            }}
          />
        ) : null}
        {state.discount_in_invoice == discountOptions[1] ? (
          <Input
            //@ts-ignore
            ref={inputRef}
            onChangeText={setDiscountValueOrPercent}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.discount_value_or_percent}
            placeholder="Enter flat discount amount"
            placeholderTextColor={COLOR_GRAY4}
            inputType="numeric"
          />
        ) : null}
      </View>
    </View>
  );
};

export default FreightDiscountView;
