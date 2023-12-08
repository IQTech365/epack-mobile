import React, {useRef} from 'react';
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
import insurancePercentOptions from '../../../../../data/insurancePercentOptions.json';
import gstPercentOptions from '../../../../../data/gstPercentOptions.json';
import Spacer from '../../../../../common/Spacer';
import Input from '../../../../../common/Input';

interface Props {
  //
}

const InsuranceDetailsView: React.FC<Props> = ({}) => {
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

  return (
    <CollapsibleView title="INSURANCE DETAILS" collapsed={true}>
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
              <DropdownComponent
                data={shiftingLuggageOptions}
                onSelect={(item: TDropdownItem) => {
                  setTransitShiftingLuggage(item.label);
                }}
                defaultValue={shiftingLuggageOptions[0]}
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
                defaultValue={insuranceTypeOptions[0]}
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
                  defaultValue={insurancePercentOptions[0]}
                  //@ts-ignore
                  ref={insuranceChargeDropdownCompRef}
                />
              </View>
              <View style={styles.compContainer}>
                <Label text="GST %" style={styles.labelText} />
                <DropdownComponent
                  data={gstPercentOptions}
                  onSelect={(item: TDropdownItem) => {
                    setTransitInsuranceGst(item.label);
                  }}
                  defaultValue={gstPercentOptions[0]}
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
                //error={showErrors && errors.dropPincode}
                //@ts-ignore
                ref={insuranceGoodsValueInputCompRef}
                inputType="numeric"
              />
            </View>
          </>
        ) : null}
      </View>
    </CollapsibleView>
  );
};

export default InsuranceDetailsView;
