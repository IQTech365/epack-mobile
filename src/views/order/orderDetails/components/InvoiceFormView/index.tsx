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
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {billingByOptions} from './utils';
import InvoiceToIndividualView from './components/InvoiceToIndividualView';
import InvoiceToCompanyView from './components/InvoiceToCompanyView';
import FreightDetailsView from './components/FreightDetailsView';
import {useInvoiceFormContextHook} from '../../../../../provider/InvoiceFormContextProvider';
import TransitInsuranceView from './components/TransitInsuranceView';
import StorageChargeView from './components/StorageChargeView';
import Button from '../../../../../common/Button';

interface IInvoiceFormViewProps {
  orderId: string | undefined;
}

const InvoiceFormView: React.FC<IInvoiceFormViewProps> = ({}) => {
  const [switchState, setSwitchState] = useState<boolean>(false);
  const {
    state,
    setSameAsClientAddress,
    setBillingType,
    setInvoiceNo,
    setDateOfInvoice,
    setDateOfDelivery,
    setModeOfMoving,
    setVehicleNo,
    setConsignmentNo,
  } = useInvoiceFormContextHook();
  console.log('InvoiceFormView--', JSON.stringify(state, null, ' '));

  const switchWrapperStyle = switchState
    ? styles.switchMainWrapper
    : styles.switchMainWrapper2;

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="BASIC DETAILS" collapsed={false}>
          <View>
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Invoice No." style={styles.label} />
                <Input
                  onChangeText={setInvoiceNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Invoice" style={styles.label} />
                <DatePickerComponent onDateSelect={() => {}} />
              </View>
            </View>
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Shifting Luggage" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={() => {}}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Delivery" style={styles.label} />
                <DatePickerComponent onDateSelect={() => {}} />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Vehicle No." style={styles.label} />
                <Input
                  onChangeText={setVehicleNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Mode of Moving" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={() => {}}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Consignmnet No." style={styles.label} />
              <Input
                onChangeText={setConsignmentNo}
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
              {billingByOptions.map((option: string, index: number) => (
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
                    setBillingType(option);
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
                  setSameAsClientAddress(!state.same_as_client_address);
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
          <View style={styles.elementContainer3}>
            <FreightDetailsView />
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="TRANSIT INSURANCE" collapsed={true}>
          <View style={styles.elementContainer3}>
            <TransitInsuranceView />
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="STORAGE CHARGE" collapsed={true}>
          <View style={styles.elementContainer3}>
            <StorageChargeView />
          </View>
        </CollapsibleView>
        <Spacer height={12} />
        <Button
          text="PREVIEW"
          onPress={() => {}}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle2}
        />
        <Spacer height={12} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default InvoiceFormView;
