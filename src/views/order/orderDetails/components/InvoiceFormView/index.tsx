import React, {useReducer, useState} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import styles from './style';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import {Switch} from 'react-native-switch';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import {billingByOptions} from './utils';
import { ACTION, initialState, invoiceReducer } from './InvoiceReducer2';
import InvoiceToIndividualView from './components/InvoiceToIndividualView';
import InvoiceToCompanyView from './components/InvoiceToCompanyView';
import FreightDetailsView from './components/FreightDetailsView';

const payTypeOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'To Be Billed',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 16},
  },
  {
    id: '2',
    text: 'To Pay',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 16},
  },
  {
    id: '3',
    text: 'Paid',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
  },
];

interface IInvoiceFormViewProps {
  orderId: string | undefined;
}

const InvoiceFormView: React.FC<IInvoiceFormViewProps> = ({}) => {
  const [switchState, setSwitchState] = useState<boolean>(false);
  const [state, dispatch] = useReducer(invoiceReducer, initialState);
  const [fixedFreight, setFixedFreight] = useState<boolean>(false);

  const switchWrapperStyle = switchState
    ? styles.switchMainWrapper
    : styles.switchMainWrapper2;

  const handleInvoiceNoInputTextChange = (text: string) => {
    // console.log(text, 'invoice..data');
    // dispatch({
    //   type: INVOICE_FORM_ACTION.INVOICE_NO,
    //   payload: text,
    // });
  };

  const handleReceiptDate = (date: Date) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.DATE_INVOICE,
    //   payload: formatDate(date),
    // });
  };

  const handleTrukNoInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.TRUK_NO,
    //   payload: text,
    // });
  };

  const handleConsignmnetNoInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.CONSIGNMNET_NO,
    //   payload: text,
    // });
  };
  const handleShiftingLuggagesTextChange = (item: TDropdownItem) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.SHIFTING_LUGGAGE,
    //   payload: item.label,
    // });
  };

  const handleFreightDetailsTemplate = (text: object) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.FREIGHT_DETAIL,
    //   payload: text,
    // });
  };

  const handleFixedFreightTemplate = (text: boolean) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.FIXED_FREIGHT,
    //   payload: text,
    // });
  };

  const handleFreightChargesInputTextChange = (text: String) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.FREIGHT_ChARGES,
    //   payload: text,
    // });
  };

  const handlePickupChargesInputTextChange = (item: TDropdownItem) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.PICKUP_CHARGES,
    //   payload: item.label,
    // });
  };

  const handlePickupAmoutInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.PICKUP_CHARGES,
    //   payload: text,
    // });
  };

  const handleDoorDeliveryChargesTemplate = (item: TDropdownItem) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.DOOR_DELIVERY_CHARGES,
    //   payload: item.label,
    // });
  };

  const handleDoorDeliveryAmountInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.DOOR_DELIVERY_AMOUNT,
    //   payload: text,
    // });
  };

  const handlePackingChargesTemplate = (item: TDropdownItem) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.PACKING_CHARGES,
    //   payload: item.label,
    // });
  };
  const handlePackingAmountInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.PACKING_AMOUNT,
    //   payload: text,
    // });
  };

  const handlePackingMaterialChargesTemplate = (item: TDropdownItem) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.PACKING_MATERIAL_CHARGES,
    //   payload: item.label,
    // });
  };

  const handlePackingMaterialAmountInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.PACKING_MATERAIL_AMOUNT,
    //   payload: text,
    // });
  };
  const handleUnpackingChargesTemplate = (item: TDropdownItem) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.UNPACKING_CHARGES,
    //   payload: item.label,
    // });
  };

  const handleUnpackingAmountInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.UNPACKING_AMOUNT,
    //   payload: text,
    // });
  };

  const handleLoadingChargesTemplate = (item: TDropdownItem) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.LOADING_CHARGES,
    //   payload: item.label,
    // });
  };

  const handleLoadingAmountInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.LOADING_AMOUNT,
    //   payload: text,
    // });
  };

  const handleUnloadingChargesTemplate = (item: TDropdownItem) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.UNLOADING_CHARGES,
    //   payload: item.label,
    // });
  };
  const handleUnloadingAmountInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.UNLOADING_AMOUNT,
    //   payload: text,
    // });
  };
  const handleAdvanceAmountInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.ADVANCE_AMOUNT,
    //   payload: text,
    // });
  };

  const handleBalanceAmountInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.BLANCE_AMOUNT,
    //   payload: text,
    // });
  };

  const handleRemarkInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.REMARK,
    //   payload: text,
    // });
  };

  const renderNonFixedFreightView = () => {
    return (
      <>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Actual Weight" style={styles.label} />
            <Input
              onChangeText={handleActualWeightInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Applicable Weight" style={styles.label} />
            <Input
              onChangeText={handleApplicableWeightInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Units" style={styles.label} />
            <DropdownComponent
              data={shiftingLuggages}
              onSelect={handleUnitsTemplate}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Rate" style={styles.label} />
            <Input
              onChangeText={handleRateInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>
      </>
    );
  };

  const handleActualWeightInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.ACTUAL_WEIGHT,
    //   payload: text,
    // });
  };
  const handleApplicableWeightInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.APPLICATION_WEIGHT,
    //   payload: text,
    // });
  };
  const handleUnitsTemplate = (item: TDropdownItem) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.UINTS,
    //   payload: item.label,
    // });
  };
  const handleRateInputTextChange = (text: string) => {
    // dispatch({
    //   type: INVOICE_FORM_ACTION.RATE,
    //   payload: text,
    // });
  };

  function handleReceiptNoInputTextChange(text: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="BASIC DETAILS" collapsed={false}>
          <View>
            <View style={styles.labelContainer}>
              <Label text="Invoice No." style={styles.label} />
            </View>
            <View style={[styles.elementContainer, styles.switchMainWrapper3]}>
              <View style={[styles.itemContainer, {alignItems: 'center'}]}>
                <Switch
                  containerStyle={styles.switchStyle}
                  value={switchState}
                  onValueChange={val => setSwitchState(val)}
                  disabled={false}
                  activeText={'Auto'}
                  inActiveText={'Manual'}
                  outerCircleStyle={styles.outerCircleStyle}
                  renderActiveText={true}
                  renderInActiveText={true}
                  switchWidthMultiplier={3.5}
                />
              </View>
              <View style={[styles.itemContainer, switchWrapperStyle]}>
                <Input
                  onChangeText={handleInvoiceNoInputTextChange}
                  containerStyle={styles.switchInputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  editable={!switchState}
                />
              </View>
            </View>
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Date of Invoice" style={styles.label} />
                <DatePickerComponent onDateSelect={handleReceiptDate} />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Delivery" style={styles.label} />
                <DatePickerComponent onDateSelect={handleReceiptDate} />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Shifting Luggage" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleShiftingLuggagesTextChange}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Mode of Moving" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleShiftingLuggagesTextChange}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Vehicle No." style={styles.label} />
              <Input
                onChangeText={handleTrukNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Consignmnet No." style={styles.label} />
              <Input
                onChangeText={handleConsignmnetNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="BILLING DETAILS" collapsed={true}>
          <View>
            <View style={styles.checkboxContainer}>
              {billingByOptions.map((option: string) => (
                <BouncyCheckbox
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
                    dispatch({
                      type: ACTION.BILING_TYPE,
                      payload: option,
                    });
                  }}
                  isChecked={state.billing_type == option}
                  disableBuiltInState={true}
                />
              ))}
            </View>
            <Spacer height={20} />
            <View style={styles.elementContainer}>
              <BouncyCheckbox
                size={25}
                unfillColor="#FFFFFF"
                text="Same as Client Address"
                fillColor={COLOR_BLUE}
                iconStyle={styles.iconStyle}
                innerIconStyle={styles.innerIconStyle}
                textStyle={styles.textStyle}
                style={styles.style}
                textContainerStyle={styles.textContainerStyle}
                onPress={(isChecked: boolean) => {
                  dispatch({
                    type: ACTION.SAME_AS_CLIENT_ADDRESS,
                    payload: !state.same_as_client_address,
                  });
                }}
                isChecked={state.same_as_client_address}
                disableBuiltInState={true}
              />
            </View>
            {state.billing_type == billingByOptions[0] ? (
              <InvoiceToIndividualView />
            ) : (
              <InvoiceToCompanyView />
            )}
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <Spacer height={4} />
        <CollapsibleView title="FREIGHT DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer}>
              <FreightDetailsView />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="OTHER DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="Remark" style={styles.label} />
              <Input
                onChangeText={handleRemarkInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={8} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default InvoiceFormView;
