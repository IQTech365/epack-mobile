import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE, COLOR_GRAY4} from '../../../../../../../utils/colors';
import Spacer from '../../../../../../../common/Spacer';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {transitInsuranceOptions} from '../../utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useInvoiceFormContextHook} from '../../../../../../../provider/InvoiceFormContextProvider';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import insurnaceTypeOptions from '../../../../../../../data/insuranceTypeOptions.json';
import gstPercentOptions from '../../../../../../../data/gstPercentOptions.json';
import Button from '../../../../../../../common/Button';
import {ITransitCharge} from '../../InvoiceReducer2';
import DeleteIcon from '../../../../../../../images/icons/delete.svg';
import { useAppSelector } from '../../../../../../../redux/hooks';
import useUtilityHook from '../../../../../../../hooks/useUtilityHook';
import { ISingleEnquiryData } from '../../../../../../../interface/enquiry/ISingleEnquiryResponse';
import DropdownWithTextInput from '../../../../../../../common/DropdownWithTextInput';

interface Props {}

const TransitInsuranceView: React.FC<Props> = () => {
  const {
    state,
    setTransitInsurance,
    setTransitInsuranceType,
    setTransitCharges,
  } = useInvoiceFormContextHook();

  const {order} = useAppSelector(state => state.Order);
  const {data: orderData} = order || {};

  const [transitInsuranceCharge, setTransitInsuranceCharge] =
    useState<string>('');
  const [transitInsuranceGST, setTransitInsuranceGST] = useState<string>('');
  const [transitLuggage, setTransitLuggage] = useState<string>('');
  const [transitGoodsValue, setTransitGoodsValue] = useState<string>('');
  const {getInsurancePercentageList} = useUtilityHook();

  const handleAddTransitInsurance = () => {
    const {transit_charges} = state;
    const clone = [...transit_charges];
    const newTransitCharge: ITransitCharge = {
      transit_insurance_charge: transitInsuranceCharge,
      transit_luggage: transitLuggage,
      transit_insurance_gst: transitInsuranceGST,
      transit_goods_value: transitGoodsValue,
    };
    clone.push(newTransitCharge);
    setTransitCharges(clone);
  };

  const handleDeleteTransitInsurance = (index: number) => {
    const {transit_charges} = state;
    const clone = [...transit_charges];
    const filter = clone.filter((_, indx) => indx !== index);
    setTransitCharges(filter);
  };

  const getSingleOrder = () => {
    let order: ISingleEnquiryData;
    if (orderData && Array.isArray(orderData) && orderData.length > 0) {
      order = orderData[0];
    }
    //@ts-ignore
    return order;
  };

  const _getShiftingLuggageOptions = ():string[] => {
    let options:string[] = [];
    const order:ISingleEnquiryData = getSingleOrder();
    if(order) {
      const {shiftingLuggage} = order;
      if(shiftingLuggage && shiftingLuggage.length > 0) {
        options = shiftingLuggage.map((d:string) => d);
      }
    }
    return options
  }

  const _showTransitChargesList = () => {
    const {transit_charges} = state;
    if (transit_charges.length > 0) {
      return transit_charges.map((d: ITransitCharge, i) => {
        return (
          <View key={`${i}`}>
          <View style={styles.transitChargeContainer}>
            <View style={styles.transitChargeContentWrapper}>
              <View style={styles.transitChargeContentContainer}>
                <Text style={styles.labelText}>Luggage: </Text>
                <Text style={styles.ValueText}>{d.transit_luggage}</Text>
              </View>
              <View style={styles.transitChargeContentContainer}>
                <Text style={styles.labelText}>Insurnace Charge: </Text>
                <Text style={styles.ValueText}>{d.transit_insurance_charge}</Text>
              </View>
              <View style={styles.transitChargeContentContainer}>
                <Text style={styles.labelText}>Insurance GST: </Text>
                <Text style={styles.ValueText}>{d.transit_insurance_gst}</Text>
              </View>
              <View style={styles.transitChargeContentContainer}>
                <Text style={styles.labelText}>Insurance Goods Value: </Text>
                <Text style={styles.ValueText}>{d.transit_goods_value}</Text>
              </View>
            </View>
            <View style={styles.transitChargeDeleteIconContainer}>
              <TouchableOpacity
                activeOpacity={0.4}
                onPress={() => handleDeleteTransitInsurance(i)}>
                <DeleteIcon width={24} height={24} />
              </TouchableOpacity>
            </View>
          </View>
          <Spacer height={8} />
          </View>
        );
      });
    }
    return null;
  };

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
      {state.transit_insurance == transitInsuranceOptions[0] ? (
        <>
          <Spacer height={4} />
          <View style={styles.fullWidthCompContainer}>
            <Label text="Shifting Luggage" style={styles.label} />
            <DropdownWithTextInput
              options={_getShiftingLuggageOptions()}
              onSelect={setTransitLuggage}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.fullWidthCompContainer}>
            <Label text="Insurance Type" style={styles.label} />
            <DropdownComponent
              data={insurnaceTypeOptions}
              onSelect={(item: TDropdownItem) => {
                setTransitInsuranceType(item.label);
              }}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.halfWidthCompContainer}>
            <View style={styles.compContainer}>
              <Label text="Insurance Charge @%" style={styles.label} />
              <DropdownComponent
                data={getInsurancePercentageList()}
                onSelect={(item: TDropdownItem) => {
                  setTransitInsuranceCharge(item.label);
                }}
              />
            </View>
            <View style={styles.compContainer}>
              <Label text="GST %" style={styles.label} />
              <DropdownComponent
                data={gstPercentOptions}
                onSelect={(item: TDropdownItem) => {
                  setTransitInsuranceGST(item.value);
                }}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.fullWidthCompContainer}>
            <Label text="Value of Goods" style={styles.label} />
            <Input
              onChangeText={(text: string) => {
                setTransitGoodsValue(text);
              }}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder="Enter value of goods"
              placeholderTextColor={COLOR_GRAY4}
            />
          </View>
          <Spacer height={12} />
          <Button
            text="Add"
            onPress={handleAddTransitInsurance}
            style={styles.buttonStyle}
            textStyle={styles.buttonText}
          />
          <Spacer height={12} />
          {_showTransitChargesList()}
        </>
      ) : null}
    </>
  );
};

export default TransitInsuranceView;
