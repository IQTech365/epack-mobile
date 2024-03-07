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
import shiftingLuggageOptions from '../../../../../data/shiftingLuggage.json';
import insuranceTypeOptions from '../../../../../data/insuranceTypeOptions.json';
import gstPercentOptions from '../../../../../data/gstPercentOptions.json';
import Spacer from '../../../../../common/Spacer';
import Input from '../../../../../common/Input';
import { ICharge, IQuotationFreight, ISingleQuotationData, IStorage, ITransitInsurance } from '../../../../../interface/quotation/IGetSingleQuotationResponse';
import useUtilityHook from '../../../../../hooks/useUtilityHook';
import DropdownWithTextInput from '../../../../../common/DropdownWithTextInput';
import { IGetQuotationData } from '../../../../../interface/quotation/IGetQuotationsResponse';

interface Props {
  isEdit?:boolean;
  item?:IGetQuotationData;
  quotationData?:ISingleQuotationData;
}

const InsuranceDetailsView: React.FC<Props> = ({isEdit, item, quotationData}) => {
  const {
    state,
    setTransitInsurance,
    setTransitShiftingLuggage,
    setTransitInsuranceType,
    setTransitInsuranceCharge,
    setTransitInsuranceGst,
    setTransitGoodsValue,
  } = useQuotationFormContextHook();
  const shiftingLuggageDropdownCompRef = useRef(null);
  const insuranceTypeDropdownCompRef = useRef(null);
  const insuranceChargeDropdownCompRef = useRef(null);
  const insuranceGstDropdownCompRef = useRef(null);
  const insuranceGoodsValueInputCompRef = useRef(null);
  const {getInsurancePercentageList} = useUtilityHook();
  const insurancePercentOptions = getInsurancePercentageList();
  
  useEffect(() => {
    if(isEdit && quotationData) {
        const quotationfreight:IQuotationFreight = quotationData.quotationfreights;
        if(quotationfreight) {
          const transitInsurance:ITransitInsurance = quotationfreight.transitInsurance;
          if(transitInsurance) {
            setTransitInsurance(transitInsurance.isRequired);
          }
        }
    }
  }, [isEdit, quotationData]);

  useEffect(() => {
    if(isEdit && quotationData && state.item && state.transit_insurance == options2[0]) {
        const quotationfreight:IQuotationFreight = quotationData.quotationfreights;
        if(quotationfreight) {
          const transitInsurance:ITransitInsurance = quotationfreight.transitInsurance;
          if(transitInsurance) {
            setTransitInsurance(transitInsurance.isRequired);
            const insuraceTypeItem:TDropdownItem = insuranceTypeOptions.find((d:TDropdownItem) => d.label == transitInsurance.transitType) as TDropdownItem;
            if(insuraceTypeItem) {
              setTransitInsuranceType(insuraceTypeItem?.label);
              //@ts-ignore
              insuranceTypeDropdownCompRef && insuranceTypeDropdownCompRef?.current?.setDefaultValue(insuraceTypeItem);
            }
            if(transitInsurance.charges.length > 0) {
              const charge:ICharge = transitInsurance.charges[0];
              if(charge) {
                const shiftingLuggageItem:string = shiftingLuggageOptions.map(({label}) => label).find((d:string) => d == charge.luggageType) as string;
                if(shiftingLuggageItem) {
                  setTransitShiftingLuggage(shiftingLuggageItem);
                  //@ts-ignore
                  shiftingLuggageDropdownCompRef && shiftingLuggageDropdownCompRef?.current?.setValue(shiftingLuggageItem);
                }
                const insurancePercentItem:TDropdownItem = insurancePercentOptions.find((d:TDropdownItem) => d.label == charge.insurancePerc) as TDropdownItem;
                if(insurancePercentItem) {
                  setTransitInsuranceCharge(insurancePercentItem.label);
                  //@ts-ignore
                  insuranceChargeDropdownCompRef && insuranceChargeDropdownCompRef?.current?.setDefaultValue(insurancePercentItem);
                }
                const gstPercentItem:TDropdownItem = gstPercentOptions.find((d:TDropdownItem) => d.value == charge.gst) as TDropdownItem;
                if(gstPercentItem) {
                  setTransitInsuranceGst(gstPercentItem.value);
                  //@ts-ignore
                  insuranceGstDropdownCompRef && insuranceGstDropdownCompRef?.current?.setDefaultValue(gstPercentItem);
                }
                setTransitGoodsValue(charge.value);
              }
            }
          }
        }
    }
  }, [state.transit_insurance]);

  return (
    <CollapsibleView title="TRANSIT INSURANCE DETAILS" collapsed={true}>
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
                setTransitInsurance(option);
              }}
              isChecked={state.transit_insurance == option}
              disableBuiltInState={true}
            />
          ))}
        </View>
        {state.transit_insurance == options2[0] ? (
          <>
            <View style={styles.fullWidthContainer}>
              <Label text="Shifting Luggage" style={styles.labelText} />
              <DropdownWithTextInput
                options={shiftingLuggageOptions.map(({label}) => label)}
                onSelect={setTransitShiftingLuggage}
                //@ts-ignore
                ref={shiftingLuggageDropdownCompRef}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.fullWidthContainer}>
              <Label text="Insurance Type" style={styles.labelText} />
              <DropdownComponent
                data={insuranceTypeOptions}
                onSelect={(item: TDropdownItem) => {
                  setTransitInsuranceType(item.label);
                }}
                //@ts-ignore
                ref={insuranceTypeDropdownCompRef}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.twoColumnContainer}>
              <View style={styles.compContainer}>
                <Label text="Insurance Charge %" style={styles.labelText} />
                <DropdownComponent
                  data={insurancePercentOptions}
                  onSelect={(item: TDropdownItem) => {
                    setTransitInsuranceCharge(item.label);
                  }}
                  //@ts-ignore
                  ref={insuranceChargeDropdownCompRef}
                />
              </View>
              <View style={styles.compContainer}>
                <Label text="GST %" style={styles.labelText} />
                <DropdownComponent
                  data={gstPercentOptions}
                  onSelect={(item: TDropdownItem) => {
                    setTransitInsuranceGst(item.value);
                  }}
                  //@ts-ignore
                  ref={insuranceGstDropdownCompRef}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.fullWidthContainer}>
              <Label text="Insurance Goods Value" style={styles.labelText} />
              <Input
                onChangeText={setTransitGoodsValue}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.transit_goods_value}
                //@ts-ignore
                ref={insuranceGoodsValueInputCompRef}
                inputType="numeric"
              />
            </View>
            <Spacer height={4} />
          </>
        ) : null}
      </View>
    </CollapsibleView>
  );
};

export default InsuranceDetailsView;
