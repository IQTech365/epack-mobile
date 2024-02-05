import React, { useEffect, useRef } from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Label from '../../../../../common/Label';
import {detailText1, detailText2, detailText3, detailText4, options} from './utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import Input from '../../../../../common/Input';
import { IQuotationFreight } from '../../../../../interface/quotation/IGetSingleQuotationResponse';

interface Props {
  //
}

const OtherDetailsView: React.FC<Props> = ({}) => {
  const {
    state,
    setOtherDetail1,
    setOtherDetail2,
    setOtherDetail3,
    setOtherDetail4,
  } = useQuotationFormContextHook();
  const otherDetail2InputCompRef = useRef(null);
  const otherDetail4InputCompRef = useRef(null);

  useEffect(() => {
    if(state.editQuotation && state.item) {
      const {item} = state;
      if(item) {
        const quotationfreight:IQuotationFreight = item.quotationfreights;
        if(quotationfreight) {
          setOtherDetail1(quotationfreight?.otherDetail1);
          setOtherDetail2(quotationfreight?.otherDetail2);
          setOtherDetail3(quotationfreight?.easy_access_for_loading_unloading);
          setOtherDetail4(quotationfreight?.any_restrcition_for_loading_unloading);
        }
      }
    }
  }, [state.editQuotation, state.item]);

  return (
    <CollapsibleView title="OTHER DETAILS" collapsed={true}>
      <View>
        <View style={styles.fullWidthContainer}>
          <Label text={detailText1} style={styles.labelText} />
        </View>
        <View style={styles.optionContainer}>
          {options.map((option: string, index: number) => (
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
                setOtherDetail1(option);
              }}
              isChecked={state.other_detail_1 == option}
              disableBuiltInState={true}
            />
          ))}
        </View>
        <View style={styles.fullWidthContainer}>
          <Label text={detailText2} style={styles.labelText} />
        </View>
        <View style={styles.fullWidthContainer}>
          <Input
            onChangeText={setOtherDetail2}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.other_detail_2}
            //@ts-ignore
            ref={otherDetail2InputCompRef}
          />
        </View>
        <View style={styles.fullWidthContainer}>
          <Label text={detailText3} style={styles.labelText} />
        </View>
        <View style={styles.optionContainer}>
          {options.map((option: string, index: number) => (
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
                setOtherDetail3(option);
              }}
              isChecked={state.other_detail_3 == option}
              disableBuiltInState={true}
            />
          ))}
        </View>
        <View style={styles.fullWidthContainer}>
          <Label text={detailText4} style={styles.labelText} />
        </View>
        <View style={styles.fullWidthContainer}>
          <Input
            onChangeText={setOtherDetail4}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={state.other_detail_4}
            //@ts-ignore
            ref={otherDetail4InputCompRef}
          />
        </View>
      </View>
    </CollapsibleView>
  );
};

export default OtherDetailsView;
