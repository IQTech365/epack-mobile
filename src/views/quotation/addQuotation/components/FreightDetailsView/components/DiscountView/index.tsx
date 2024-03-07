import React, { useEffect, useRef, useState } from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import Spacer from '../../../../../../../common/Spacer';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import {TItem, discountInQuotationOptions} from '../utils';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import discountPercentOptions from '../../../../../../../data/discountPercentOptions.json';
import Input from '../../../../../../../common/Input';
import { IQuotationFreight, ISingleQuotationData } from '../../../../../../../interface/quotation/IGetSingleQuotationResponse';
import { IGetQuotationData } from '../../../../../../../interface/quotation/IGetQuotationsResponse';

interface Props {
  isEdit?:boolean;
  item?:IGetQuotationData;
  quotationData?:ISingleQuotationData;
}

const DiscountView: React.FC<Props> = ({isEdit, item, quotationData}) => {
  const {state, setDiscountInQuotation, setDiscountPercentOrValue} = useQuotationFormContextHook();
  const flatDiscountInputCompRef = useRef(null);
  const discountPercentDropdownCompRef = useRef(null);

  

  const _renderDiscountPercentDropdownView = () => {
    if (state.discount_in_quotation == discountInQuotationOptions[0].value) {
      return (
        <View style={styles.fullWidthContainer}>
          <DropdownComponent
            data={discountPercentOptions}
            onSelect={(item: TDropdownItem) => {
              setDiscountPercentOrValue(item.value);
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
    if (state.discount_in_quotation == discountInQuotationOptions[1].value) {
      return (
        <View style={styles.fullWidthContainer}>
          <Input
            onChangeText={setDiscountPercentOrValue}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.discount_percent_or_value}
            placeholder='Enter amount'
            //@ts-ignore
            ref={flatDiscountInputCompRef}
          />
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    if(isEdit && quotationData) {
        const quotationfreight:IQuotationFreight = quotationData.quotationfreights;
        if(quotationfreight) {
          setDiscountInQuotation(quotationfreight.discountType);
        }
    }
  }, [isEdit, quotationData]);

  useEffect(() => {
    if(isEdit && quotationData && state.item && state.discount_in_quotation !== discountInQuotationOptions[2].value) {
        const quotationfreight:IQuotationFreight = quotationData.quotationfreights;
        if(quotationfreight) {
          if(quotationfreight.discountType == discountInQuotationOptions[0].value) {
            const discountPercentItem:TDropdownItem = discountPercentOptions.find((d:TDropdownItem) => d.value == quotationfreight.discountAmount) as TDropdownItem;
            if(discountPercentItem) {
              //@ts-ignore
              discountPercentDropdownCompRef && discountPercentDropdownCompRef?.current?.setDefaultValue(discountPercentItem);
              setDiscountPercentOrValue(discountPercentItem.value);
            }
          } else if(quotationfreight.discountType == discountInQuotationOptions[1].value) {
              setDiscountPercentOrValue(quotationfreight.discountAmount);
          }
        }
    }
  }, [state.discount_in_quotation]);

  

  return (
    <View style={styles.mainWrapper}>
      <Spacer height={10} />
      <View style={styles.container}>
        <Text style={styles.labelText}>Discount in Quotation</Text>
      </View>
      <Spacer height={10} />
      <View style={styles.optionContainer}>
        {discountInQuotationOptions.map((option: TItem, index: number) => (
          <BouncyCheckbox
            key={`${index}`}
            size={25}
            unfillColor="#FFFFFF"
            text={option.label}
            fillColor={COLOR_BLUE}
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle}
            style={styles.style}
            textContainerStyle={styles.textContainerStyle}
            onPress={(isChecked: boolean) => {
              setDiscountInQuotation(option.value);
            }}
            isChecked={state.discount_in_quotation == option.value}
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
