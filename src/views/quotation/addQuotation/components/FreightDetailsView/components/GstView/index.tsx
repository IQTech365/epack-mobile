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
import {
  IQuotationFreight,
  ISingleQuotationData,
} from '../../../../../../../interface/quotation/IGetSingleQuotationResponse';
import {IGetQuotationData} from '../../../../../../../interface/quotation/IGetQuotationsResponse';

interface Props {
  isEdit?: boolean;
  item?: IGetQuotationData;
  quotationData?: ISingleQuotationData;
}

const GstView: React.FC<Props> = ({isEdit, item, quotationData}) => {
  const {state, setGstInQuotation, setGstPercent, setGstType} =
    useQuotationFormContextHook();
  const gstPercentDropdownCompRef = useRef(null);
  const gstTypeDropdownCompRef = useRef(null);

  const _renderGstDropdownView = () => {
    if (state.gst_in_quotation == gstInQuotationOptions[0]) {
      return (
        <View style={styles.twoColumnContainer}>
          <View style={styles.compContainer}>
            <DropdownComponent
              data={gstPercentOptions}
              onSelect={(item: TDropdownItem) => {
                setGstPercent(item.value);
              }}
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
              //@ts-ignore
              ref={gstTypeDropdownCompRef}
            />
          </View>
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    if (isEdit && quotationData) {
      const quotationfreight: IQuotationFreight =
        quotationData.quotationfreights;
      if (quotationfreight) {
        setGstInQuotation(quotationfreight.gstStatus);
      }
    }
  }, [isEdit, quotationData]);

  useEffect(() => {
    if (
      isEdit &&
      quotationData &&
      state.gst_in_quotation == gstInQuotationOptions[0]
    ) {
      const quotationfreight: IQuotationFreight =
        quotationData.quotationfreights;
      if (quotationfreight) {
        const gstPercentItem: TDropdownItem = gstPercentOptions.find(
          (d: TDropdownItem) => d.value == quotationfreight.gstPercentage,
        ) as TDropdownItem;
        if (gstPercentItem) {
          //@ts-ignore
          gstPercentDropdownCompRef &&
            gstPercentDropdownCompRef?.current?.setDefaultValue(gstPercentItem);
          setGstPercent(gstPercentItem.value);
        }
        const gstTypeItem: TDropdownItem = gstTypeOptions.find(
          (d: TDropdownItem) => d.label == quotationfreight.gstType,
        ) as TDropdownItem;
        if (gstTypeItem) {
          //@ts-ignore
          gstTypeDropdownCompRef &&
            gstTypeDropdownCompRef?.current?.setDefaultValue(gstTypeItem);
          setGstType(gstTypeItem.label);
        }
      }
    }
  }, [state.gst_in_quotation]);

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
