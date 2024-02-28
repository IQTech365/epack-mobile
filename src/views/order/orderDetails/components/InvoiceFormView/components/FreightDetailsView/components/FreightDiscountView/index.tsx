import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import {discountOptions, discountPercentOptions} from '../../../../utils';
import {COLOR_BLACK, COLOR_BLUE, COLOR_GRAY4} from '../../../../../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Spacer from '../../../../../../../../../common/Spacer';
import {useInvoiceFormContextHook} from '../../../../../../../../../provider/InvoiceFormContextProvider';
import DropdownComponent from '../../../../../../../../../common/DropdownComponent';
import Input from '../../../../../../../../../common/Input';
import {TDropdownItem} from '../../../../../../../../../type/TDropdownItem';

interface Props {}

const FreightDiscountView: React.FC<Props> = ({}) => {
  const {state, setDiscountInInvoice, setDiscountValueOrPercent} =
    useInvoiceFormContextHook();

  const showDiscountInputView = () => {
    if (state.discount_in_invoice == discountOptions[0]) {
      return (
        <DropdownComponent
          data={discountPercentOptions}
          onSelect={(item: TDropdownItem) => {
            setDiscountValueOrPercent(item.value);
          }}
        />
      );
    } else if (state.discount_in_invoice == discountOptions[1]) {
      return (
        <Input
          onChangeText={setDiscountValueOrPercent}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
          placeholder="Enter flat discount amount"
          placeholderTextColor={COLOR_GRAY4}
          inputType="numeric"
        />
      );
    }
    return null;
  };

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
              if(option == discountOptions[2]) {
                setDiscountValueOrPercent('')
              }
            }}
            isChecked={state.discount_in_invoice == option}
            disableBuiltInState={true}
          />
        ))}
      </View>
      <Spacer height={10} />
      <View style={styles.fullWidthContainer}>{showDiscountInputView()}</View>
    </View>
  );
};

export default FreightDiscountView;
