import React, { useEffect, useRef } from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import Spacer from '../../../../../../../common/Spacer';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import {discountInQuotationOptions} from '../utils';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import discountPercentOptions from '../../../../../../../data/discountPercentOptions.json';
import Input from '../../../../../../../common/Input';
import { IQuotationFreight } from '../../../../../../../interface/quotation/IGetSingleQuotationResponse';

interface Props {}

const DiscountView: React.FC<Props> = ({}) => {
  const {state, setDiscountInQuotation, setDiscountPercentOrValue} = useQuotationFormContextHook();
  const flatDiscountInputCompRef = useRef(null);
  const discountPercentDropdownCompRef = useRef(null);

  useEffect(() => {
    if(state.editQuotation && state.item) {
      const {item} = state;
      if(item) {
        const quotationfreight:IQuotationFreight = item.quotationfreights;
        if(quotationfreight) {
          setDiscountInQuotation(quotationfreight.discountType);
          if(quotationfreight.discountType == discountInQuotationOptions[0]) {
            const discountPercentItem:TDropdownItem = discountPercentOptions.find((d:TDropdownItem) => d.label == quotationfreight.discountAmount) as TDropdownItem;
            if(discountPercentItem) {
              //@ts-ignore
              discountPercentDropdownCompRef && discountPercentDropdownCompRef?.current?.setDefaultValue(discountPercentItem);
              setDiscountPercentOrValue(discountPercentItem.label);
            }
          } else if(quotationfreight.discountType == discountInQuotationOptions[1]) {
            setDiscountPercentOrValue(quotationfreight.discountAmount);
          }
        }
      }
    }
  }, [state.editQuotation, state.item]);

  const _renderDiscountPercentDropdownView = () => {
    if (state.discount_in_quotation == discountInQuotationOptions[0]) {
      return (
        <View style={styles.fullWidthContainer}>
          <DropdownComponent
            data={discountPercentOptions}
            onSelect={(item: TDropdownItem) => {
              setDiscountPercentOrValue(item.label);
            }}
            //@ts-ignore
            ref={discountPercentDropdownCompRef}
          />
        </View>
      );
    }
    return null;
  };

  const _renderFlatDiscountInputView = () => {
    if (state.discount_in_quotation == discountInQuotationOptions[1]) {
      return (
        <View style={styles.fullWidthContainer}>
          <Input
            onChangeText={setDiscountPercentOrValue}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            placeholder='Enter amount'
            //   value={jobType}
            //@ts-ignore
            ref={flatDiscountInputCompRef}
          />
        </View>
      );
    }
    return null;
  };

  

  return (
    <View style={styles.mainWrapper}>
      <Spacer height={10} />
      <View style={styles.container}>
        <Text style={styles.labelText}>Discount in Quotation</Text>
      </View>
      <Spacer height={10} />
      <View style={styles.optionContainer}>
        {discountInQuotationOptions.map((option: string, index: number) => (
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
              setDiscountInQuotation(option);
            }}
            isChecked={state.discount_in_quotation == option}
            disableBuiltInState={true}
          />
        ))}
      </View>
      <Spacer height={10} />
      {_renderDiscountPercentDropdownView()}
      {_renderFlatDiscountInputView()}
    </View>
  );
};

export default DiscountView;
