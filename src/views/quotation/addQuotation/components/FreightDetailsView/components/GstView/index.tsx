import React, {useEffect, useRef} from 'react';
import {Text, View} from 'react-native';
import styles from './style';
import Spacer from '../../../../../../../common/Spacer';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {COLOR_BLUE} from '../../../../../../../utils/colors';
import {gstInQuotationOptions} from '../utils';
import {useQuotationFormContextHook} from '../../../../../../../provider/QuotationFormContextProvider';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import gstPercentOptions from '../../../../../../../data/gstPercentOptions.json';
import gstTypeOptions from '../../../../../../../data/gstTypeOptions.json';
import { IQuotationFreight } from '../../../../../../../interface/quotation/IGetSingleQuotationResponse';

interface Props {}

const GstView: React.FC<Props> = ({}) => {
  const {state, setGstInQuotation, setGstPercent, setGstType} = useQuotationFormContextHook();
  const gstPercentDropdownCompRef = useRef(null);
  const gstTypeDropdownCompRef = useRef(null);

  useEffect(() => {
    if(state.editQuotation && state.item) {
      const {item} = state;
      if(item) {
        const quotationfreight:IQuotationFreight = item.quotationfreights;
        if(quotationfreight) {
          setGstInQuotation(quotationfreight.gstStatus);
          const gstPercentItem:TDropdownItem = gstPercentOptions.find((d:TDropdownItem) => d.label == quotationfreight.gstPercentage) as TDropdownItem;
          if(gstPercentItem) {
            //@ts-ignore
            gstPercentDropdownCompRef && gstPercentDropdownCompRef?.current?.setDefaultValue(gstPercentItem);
            setGstPercent(gstPercentItem.label);
          }
          const gstTypeItem:TDropdownItem = gstTypeOptions.find((d:TDropdownItem) => d.label == quotationfreight.gstType) as TDropdownItem;
          if(gstTypeItem) {
            //@ts-ignore
            gstPercentDropdownCompRef && gstPercentDropdownCompRef?.current?.setDefaultValue(gstPercentItem);
            setGstType(gstTypeItem.label);
          }
        }
      }
    }
  }, [state.editQuotation, state.item]);

  const _renderGstDropdownView = () => {
    if (state.gst_in_quotation == gstInQuotationOptions[0]) {
      return (
        <View style={styles.twoColumnContainer}>
          <View style={styles.compContainer}>
            <DropdownComponent
              data={gstPercentOptions}
              onSelect={(item: TDropdownItem) => {
                setGstPercent(item.label);
              }}
              defaultValue={gstPercentOptions[0]}
              //@ts-ignore
              ref={gstPercentDropdownCompRef}
            />
          </View>
          <View style={styles.compContainer}>
            <DropdownComponent
              data={gstTypeOptions}
              onSelect={(item: TDropdownItem) => {
                setGstType(item.label);
              }}
              defaultValue={gstTypeOptions[0]}
              //@ts-ignore
              ref={gstTypeDropdownCompRef}
            />
          </View>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.mainWrapper}>
      <Spacer height={10} />
      <View style={styles.container}>
        <Text style={styles.labelText}>GST in Quotation</Text>
      </View>
      <Spacer height={10} />
      <View style={styles.optionContainer}>
        {gstInQuotationOptions.map((option: string, index: number) => (
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
              setGstInQuotation(option);
            }}
            isChecked={state.gst_in_quotation == option}
            disableBuiltInState={true}
          />
        ))}
      </View>
      <Spacer height={10} />
      {_renderGstDropdownView()}
    </View>
  );
};

export default GstView;
