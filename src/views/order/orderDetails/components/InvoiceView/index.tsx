import React, { useReducer, useState } from 'react';
import { View } from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import CollapsibleView from '../../../../../common/CollapsibleView';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import DropdownComponent from '../../../../../common/DropdownComponent';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import { TDropdownItem } from '../../../../../type/TDropdownItem';
import { COLOR_BLACK, COLOR_BLUE } from '../../../../../utils/colors';
import styles from './style';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import { Switch } from 'react-native-switch';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import {
  INVOICE_FORM_ACTION,
  initialState,
  invoiceReducer,
} from './InvoiceReducer';
import { formatDate } from '../../../../../utils/formatter';

const riskTypeOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Owners Risk',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', borderRadius: 0, width: 15, height: 15 },
    innerIconStyle: { borderWidth: 1, borderRadius: 0, width: 15, height: 15 },
    textStyle: { fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none' },
    style: { paddingRight: 16 },
  },
  {
    id: '2',
    text: 'Carrier Risk',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', borderRadius: 0, width: 15, height: 15 },
    innerIconStyle: { borderWidth: 1, borderRadius: 0, width: 15, height: 15 },
    textStyle: { fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none' },
  },
];

const payTypeOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'To Be Billed',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', borderRadius: 0, width: 15, height: 15 },
    innerIconStyle: { borderWidth: 1, borderRadius: 0, width: 15, height: 15 },
    textStyle: { fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none' },
    style: { paddingRight: 16 },
  },
  {
    id: '2',
    text: 'To Pay',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', borderRadius: 0, width: 15, height: 15 },
    innerIconStyle: { borderWidth: 1, borderRadius: 0, width: 15, height: 15 },
    textStyle: { fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none' },
    style: { paddingRight: 16 },
  },
  {
    id: '3',
    text: 'Paid',
    fillColor: COLOR_BLUE,
    iconStyle: { borderColor: 'red', borderRadius: 0, width: 15, height: 15 },
    innerIconStyle: { borderWidth: 1, borderRadius: 0, width: 15, height: 15 },
    textStyle: { fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none' },
  },
];

interface IInvoiceViewProps {
  //
}

const InvoiceView: React.FC<IInvoiceViewProps> = ({ }) => {
  const [switchState, setSwitchState] = useState<boolean>(false);
  const [state, dispatch] = useReducer(invoiceReducer, initialState);
  const [
    loadingAddressSameAsConsignerAddress,
    setIsLoadingAddressSameAsConsignerAddress,
  ] = useState<boolean>(true);
  const [
    deliveryAddressSameAsConsigneeAddress,
    setIsDeliveryAddressSameAsConsigneeAddress,
  ] = useState<boolean>(true);
  const [fixedFreight, setFixedFreight] = useState<boolean>(false);

  const switchWrapperStyle = switchState
    ? styles.switchMainWrapper
    : styles.switchMainWrapper2;

  const handleInvoiceNoInputTextChange = (text: string) => {
    console.log(text, 'invoice..data');
    dispatch({
      type: INVOICE_FORM_ACTION.INVOICE_NO,
      payload: text,
    });
  };

  const handleReceiptDate = (date: Date) => {
    dispatch({
      type: INVOICE_FORM_ACTION.DATE_INVOICE,
      payload: formatDate(date),
    });
  };

  const handleTrukNoInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.TRUK_NO,
      payload: text,
    });
  };

  const handleConsignmnetNoInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.CONSIGNMNET_NO,
      payload: text,
    });
  };
  const handleShiftingLuggagesTextChange = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.SHIFTING_LUGGAGE,
      payload: item.label,
    });
  };

  const handleBillingConsignerNameInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.BILLING_CONSIGNER_NAME,
      payload: text,
    });
  };

  const handleConsignerGSTInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.BILLING_CONSIGNER_GST,
      payload: text,
    });
  };

  const handleConsignerMobileNoInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.BILLING_CONSIGNER_MOBILE_NO,
      payload: text,
    });
  };

  const handleBillingAddressInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.BILLING_ADDRESS,
      payload: text,
    });
  };
  const handleBillingLandmarkInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.BILLING_LANDNMARK,
      payload: text,
    });
  };

  const handleBillingPincodeInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.BILLING_PINCODE,
      payload: text,
    });
  };

  const handleBillingStateTextInputChange = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.BILLING_STATE,
      payload: item.label,
    });
  };

  const handleBillingCityTextInputChange = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.BILLING_CITY,
      payload: item.label,
    });
  };

  const handleTemplate = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.CHOOSE_TEMPLETE,
      payload: item.label,
    });
  };

  const handleBillingLoadingAddressTextInputChange = (item: boolean) => {
    dispatch({
      type: INVOICE_FORM_ACTION.BILLING_LOADING_ADDRESS,
      payload: item,
    });
  };

  const handleVehicleInvoiceNoInputTextChange = (text: String) => {
    dispatch({
      type: INVOICE_FORM_ACTION.VEHICLE_INVOICE_NO,
      payload: text,
    });
  };

  const handleVehicleTypeTemplate = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.VEHICLE_TYPE,
      payload: item.label,
    });
  };

  const handleVehicleNoInputTextChange = (text: String) => {
    dispatch({
      type: INVOICE_FORM_ACTION.VEHICLE_NO,
      payload: text,
    });
  };

  const handleVehicleFromLocationInputTextChange = (text: String) => {
    dispatch({
      type: INVOICE_FORM_ACTION.VEHICLE_FROM_LOCATION,
      payload: text,
    });
  };

  const handleVehicleToLocationInputTextChange = (text: String) => {
    dispatch({
      type: INVOICE_FORM_ACTION.VEHICLE_TO_LOCATION,
      payload: text,
    });
  };

  const handleVehicleDriverNameInputTextChange = (text: String) => {
    dispatch({
      type: INVOICE_FORM_ACTION.VEHICLE_TO_LOCATION,
      payload: text,
    });
  };

  const handleVehicleDriverMobileNoInputTextChange = (text: String) => {
    dispatch({
      type: INVOICE_FORM_ACTION.VEHICLE_MOBILE_NO,
      payload: text,
    });
  };

  const handleVehicleDriverLicenceNoInputTextChange = (text: String) => {
    dispatch({
      type: INVOICE_FORM_ACTION.VEHICLE_DRIVER_LICENCE_NO,
      payload: text,
    });
  };
  const handleVehicleSealNoInputTextChange = (text: String) => {
    dispatch({
      type: INVOICE_FORM_ACTION.VEHICLE_SEAL_NO,
      payload: text,
    });
  };
  const handleVehicleInDate = (date: Date) => {
    dispatch({
      type: INVOICE_FORM_ACTION.VEHICLE_IN_DATE,
      payload: formatDate(date),
    });
  };

  const handleVehicleOutDateDate = (date: Date) => {
    dispatch({
      type: INVOICE_FORM_ACTION.VEHICLE_OUT_DATE,
      payload: formatDate(date),
    });
  };

  const handleMaterialNameInputTextChange = (text: String) => {
    dispatch({
      type: INVOICE_FORM_ACTION.MATERIAL_NAME,
      payload: text,
    });
  };

  const handleMaterialNoArticleInputTextChange = (text: String) => {
    dispatch({
      type: INVOICE_FORM_ACTION.MATERIAL_NO_ARTICLES,
      payload: text,
    });
  };

  const handleMaterialPackingTypeTemplate = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.MATERIAL_PACKING_TYPE,
      payload: item.label,
    });
  };

  const handleMaterialHSNCodeInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.MATERIAL_HSN_CODE,
      payload: text,
    });
  };

  const handleMaterialBillInvoiceNoInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.MATERIAL_BILL_INVOICE_NO,
      payload: text,
    });
  };

  const handleMaterialNetWeightInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.MATERIAL_NET_WEIGHT,
      payload: text,
    });
  };

  const handleMaterialUnitTemplate = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.MATERIAL_UNITS,
      payload: item.label,
    });
  };

  const handleMaterialValueGoodsInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.MATERIAL_VALUE_GOODS,
      payload: text,
    });
  };
  const handleMaterialRiskTypeTemplate = (text: object) => {
    dispatch({
      type: INVOICE_FORM_ACTION.MATERIAL_RISK_TYPE,
      payload: text,
    });
  };

  const handleFreightDetailsTemplate = (text: object) => {
    dispatch({
      type: INVOICE_FORM_ACTION.FREIGHT_DETAIL,
      payload: text,
    });
  };

  const handleFixedFreightTemplate = (text: boolean) => {
    dispatch({
      type: INVOICE_FORM_ACTION.FIXED_FREIGHT,
      payload: text,
    });
  };

  const handleFreightChargesInputTextChange = (text: String) => {
    dispatch({
      type: INVOICE_FORM_ACTION.FREIGHT_ChARGES,
      payload: text,
    });
  };

  const handlePickupChargesInputTextChange = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.PACKING_CHARGES,
      payload: item.label,
    });
  };

  const handlePickupAmoutInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.PACKING_AMOUNT,
      payload: text,
    });
  };

  const handleDoorDeliveryChargesTemplate = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.DOOR_DELIVERY_CHARGES,
      payload: item.label,
    });
  };

  const handleDoorDeliveryAmountInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.DOOR_DELIVERY_AMOUNT,
      payload: text,
    });
  };

  const handlePackingChargesTemplate = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.PACKING_CHARGES,
      payload: item.label,
    });
  };
  const handlePackingAmountInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.PACKING_AMOUNT,
      payload: text,
    });
  };

  const handlePackingMaterialChargesTemplate = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.PACKING_MATERIAL_CHARGES,
      payload: item.label,
    });
  };

  const handlePackingMaterialAmountInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.PACKING_MATERAIL_AMOUNT,
      payload: text,
    });
  };
  const handleUnpackingChargesTemplate = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.UNPACKING_CHARGES,
      payload: item.label,
    });
  };

  const handleUnpackingAmountInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.UNPACKING_AMOUNT,
      payload: text,
    });
  };

  const handleLoadingChargesTemplate = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.LOADING_CHARGES,
      payload: item.label,
    });
  };

  const handleLoadingAmountInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.LOADING_AMOUNT,
      payload: text,
    });
  };

  const handleUnloadingChargesTemplate = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.UNLOADING_CHARGES,
      payload: item.label,
    });
  };
  const handleUnloadingAmountInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.UNLOADING_AMOUNT,
      payload: text,
    });
  };
  const handleAdvanceAmountInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.ADVANCE_AMOUNT,
      payload: text,
    });
  };

  const handleBalanceAmountInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.BLANCE_AMOUNT,
      payload: text,
    });
  };

  const handleRemarkInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.REMARK,
      payload: text,
    });
  };

  const renderLoadingAddressView = () => {
    return (
      <>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={handleReceiptNoInputTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Landmark" style={styles.label} />
            <Input
              onChangeText={handleReceiptNoInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Pincode" style={styles.label} />
            <Input
              onChangeText={handleReceiptNoInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="State" style={styles.label} />
            <DropdownComponent
              data={shiftingLuggages}
              onSelect={handleTemplate}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="City" style={styles.label} />
            <DropdownComponent
              data={shiftingLuggages}
              onSelect={handleTemplate}
            />
          </View>
        </View>
      </>
    );
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
    dispatch({
      type: INVOICE_FORM_ACTION.ACTUAL_WEIGHT,
      payload: text,
    });
  };
  const handleApplicableWeightInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.APPLICATION_WEIGHT,
      payload: text,
    });
  };
  const handleUnitsTemplate = (item: TDropdownItem) => {
    dispatch({
      type: INVOICE_FORM_ACTION.UINTS,
      payload: item.label,
    });
  };
  const handleRateInputTextChange = (text: string) => {
    dispatch({
      type: INVOICE_FORM_ACTION.RATE,
      payload: text,
    });
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
              <View style={[styles.itemContainer, { alignItems: 'center' }]}>
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
                <Label text="Choose Template" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleTemplate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Invoice" style={styles.label} />
                <DatePickerComponent onDateSelect={handleReceiptDate} />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Truck No." style={styles.label} />
                <Input
                  onChangeText={handleTrukNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Consignmnet No." style={styles.label} />
                <Input
                  onChangeText={handleConsignmnetNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Shifting Luggage" style={styles.label} />
              <DropdownComponent
                data={shiftingLuggages}
                onSelect={handleShiftingLuggagesTextChange}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="BILLING ADDRESS" collapsed={true}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="Consigner Name" style={styles.label} />
              <Input
                onChangeText={handleBillingConsignerNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Consigner GST" style={styles.label} />
                <Input
                  onChangeText={handleConsignerGSTInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Consigner Mobile No." style={styles.label} />
                <Input
                  onChangeText={handleConsignerMobileNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Address" style={styles.label} />
              <Input
                onChangeText={handleBillingAddressInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Landmark" style={styles.label} />
                <Input
                  onChangeText={handleBillingLandmarkInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Pincode" style={styles.label} />
                <Input
                  onChangeText={handleBillingPincodeInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="State" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleBillingStateTextInputChange}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="City" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleBillingCityTextInputChange}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Loading Address" style={styles.label2} />
            </View>
            <View style={styles.elementContainer}>
              <BouncyCheckbox
                size={25}
                fillColor={COLOR_BLUE}
                unfillColor="#FFFFFF"
                text="Same as Consigner Address"
                iconStyle={{
                  borderColor: 'red',
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                innerIconStyle={{
                  borderWidth: 1,
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                textStyle={{
                  fontFamily: 'JosefinSans-Regular',
                  textDecorationLine: 'none',
                }}
                style={{ marginRight: 15 }}
                textContainerStyle={{ paddingLeft: 0 }}
                onPress={(isChecked: boolean) => {
                  handleBillingLoadingAddressTextInputChange(isChecked);
                }}
                isChecked={loadingAddressSameAsConsignerAddress}
              />
            </View>
            {!loadingAddressSameAsConsignerAddress
              ? renderLoadingAddressView()
              : null}
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="VEHICLE DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="Invoice No." style={styles.label} />
              <Input
                onChangeText={handleVehicleInvoiceNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Vehicle Type" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleVehicleTypeTemplate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Vehicle No." style={styles.label} />
                <Input
                  onChangeText={handleVehicleNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="From Location" style={styles.label} />
                <Input
                  onChangeText={handleVehicleFromLocationInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="To Location" style={styles.label} />
                <Input
                  onChangeText={handleVehicleToLocationInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Driver Name" style={styles.label} />
              <Input
                onChangeText={handleVehicleDriverNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Driver Mobile No." style={styles.label} />
                <Input
                  onChangeText={handleVehicleDriverMobileNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Driver Licence No." style={styles.label} />
                <Input
                  onChangeText={handleVehicleDriverLicenceNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Seal No." style={styles.label} />
              <Input
                onChangeText={handleVehicleSealNoInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="In Date" style={styles.label} />
                <DatePickerComponent onDateSelect={handleVehicleInDate} />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Out Date" style={styles.label} />
                <DatePickerComponent onDateSelect={handleVehicleOutDateDate} />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="MATERIAL DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="Material Name" style={styles.label} />
              <Input
                onChangeText={handleMaterialNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="No. of Articles" style={styles.label} />
                <Input
                  onChangeText={handleMaterialNoArticleInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Packing Type" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleMaterialPackingTypeTemplate}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="HSN Code" style={styles.label} />
                <Input
                  onChangeText={handleMaterialHSNCodeInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Bill/Invoice No." style={styles.label} />
                <Input
                  onChangeText={handleMaterialBillInvoiceNoInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Net Weight" style={styles.label} />
                <Input
                  onChangeText={handleMaterialNetWeightInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Units" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleMaterialUnitTemplate}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Value of Goods" style={styles.label} />
              <Input
                onChangeText={handleMaterialValueGoodsInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Risk Type" style={styles.label2} />
            </View>
            <View style={styles.elementContainer}>
              <BouncyCheckboxGroup
                data={riskTypeOptions}
                onChange={(selectedItem: ICheckboxButton) => {
                  console.log('SelectedItem: ', JSON.stringify(selectedItem));
                  handleMaterialRiskTypeTemplate(selectedItem);
                }}
              />
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="FREIGHT DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer}>
              <BouncyCheckboxGroup
                data={payTypeOptions}
                onChange={(selectedItem: ICheckboxButton) => {
                  console.log('SelectedItem: ', JSON.stringify(selectedItem));
                  handleFreightDetailsTemplate(selectedItem);
                }}
              />
            </View>
            <Spacer height={12} />
            <View style={styles.elementContainer}>
              <BouncyCheckbox
                size={25}
                fillColor={COLOR_BLUE}
                unfillColor="#FFFFFF"
                text="Fixed Freight"
                iconStyle={{
                  borderColor: 'red',
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                innerIconStyle={{
                  borderWidth: 1,
                  borderRadius: 0,
                  width: 18,
                  height: 18,
                }}
                textStyle={{
                  fontFamily: 'JosefinSans-Regular',
                  textDecorationLine: 'none',
                }}
                style={{ marginRight: 15 }}
                textContainerStyle={{ paddingLeft: 0 }}
                onPress={(isChecked: boolean) => {
                  setFixedFreight(isChecked);
                  handleFixedFreightTemplate(isChecked);
                }}
                isChecked={fixedFreight}
              />
            </View>
            {!fixedFreight ? renderNonFixedFreightView() : null}
            <View style={styles.elementContainer2}>
              <Label text="Freight Charges" style={styles.label} />
              <Input
                onChangeText={handleFreightChargesInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Pickup Charges" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handlePickupChargesInputTextChange}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handlePickupAmoutInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Door Delivery Charges" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleDoorDeliveryChargesTemplate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handleDoorDeliveryAmountInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Packing Charges" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handlePackingChargesTemplate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handlePackingAmountInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Packing Material Charges" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handlePackingMaterialChargesTemplate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handlePackingMaterialAmountInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Unpacking Charges" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleUnpackingChargesTemplate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handleUnpackingAmountInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Loading Charges" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleLoadingChargesTemplate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handleLoadingAmountInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Unloading Charges" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleUnloadingChargesTemplate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handleUnloadingAmountInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Total Amount = 0.00" style={styles.label2} />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Advance Amount" style={styles.label} />
                <Input
                  onChangeText={handleAdvanceAmountInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Balance Amount" style={styles.label} />
                <Input
                  onChangeText={handleBalanceAmountInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
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

export default InvoiceView;
