import React, {useRef} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import Spacer from '../../../../../../../common/Spacer';
import EpackDropdown from '../../../../../../../common/DropdownComponent2';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {approvalAuthorityOptions, transitInsuranceOptions} from '../../utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useInvoiceFormContextHook} from '../../../../../../../provider/InvoiceFormContextProvider';
import { TDropdownItem } from '../../../../../../../type/TDropdownItem';

interface Props {}

const TransitInsuranceView: React.FC<Props> = () => {
  const stateDropdownCompRef = useRef(null);
  const {
    state,
    setTransitInsurance,
    setTransitInsuranceType,
    setTransitInsuranceCharge,
    setTransitInsuranceGST,
    setTransitGoodsValue,
  } = useInvoiceFormContextHook();

  return (
    <>
      <View style={styles.optionContainer}>
        {transitInsuranceOptions.map((option: string, index: number) => (
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
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Shifting Luggage" style={styles.label} />
        <DropdownComponent
          data={approvalAuthorityOptions}
          onSelect={() => {}}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Insurance Type" style={styles.label} />
        <EpackDropdown
          data={[]}
          placeholder={'Select insurance type'}
          hanldeData={(text: string) => {
            setTransitInsuranceType(text);
          }}
          //@ts-ignore
          ref={stateDropdownCompRef}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.halfWidthCompContainer}>
        <View style={styles.compContainer}>
          <Label text="Insurance Charge @%" style={styles.label} />
          <DropdownComponent
            data={approvalAuthorityOptions}
            onSelect={(item:TDropdownItem) => {
              setTransitInsuranceCharge(item.label);
            }}
          />
        </View>
        <View style={styles.compContainer}>
          <Label text="GST %" style={styles.label} />
          <DropdownComponent
            data={approvalAuthorityOptions}
            onSelect={(item:TDropdownItem) => {
              setTransitInsuranceGST(item.label);
            }}
          />
        </View>
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Value of Goods" style={styles.label} />
        <Input
          onChangeText={(text:string) => {
            setTransitGoodsValue(text);
          }}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
    </>
  );
};

export default TransitInsuranceView;
