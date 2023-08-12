import React, {useCallback, useReducer, useState} from 'react';
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
import vehicleTypeOptions from '../../../../../data/vehicleTypeOptions.json';
import {initialState,
        biltyReducer,
         BILTY_FORM_ACTION} 
         from './biltyReducer';
import { formatDate } from '../../../../../utils/formatter';
         

const riskTypeOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Owners Risk',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 16},
  },
  {
    id: '2',
    text: 'Carrier Risk',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
  },
];

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

const insuranceOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Insured',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
    style: {paddingRight: 16},
  },
  {
    id: '2',
    text: 'Not Insured',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', borderRadius: 0, width: 15, height: 15},
    innerIconStyle: {borderWidth: 1, borderRadius: 0, width: 15, height: 15},
    textStyle: {fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none'},
  },
];

interface IBiltyViewProps {
  //
}

const BiltyView: React.FC<IBiltyViewProps> = ({}) => {
  const state = {pickupPincode: '', deliveryPincode: ''};
  const [reducerState,dispatch] = useReducer(biltyReducer,initialState);
  const [switchState, setSwitchState] = useState<boolean>(false);
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

  const handleTemplate = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.CHOOSE_DESIGN,
      payload: item.label,
    });
  };
  const handleDateofBiltyLrCn = (date: Date) => {
    dispatch({
      type: BILTY_FORM_ACTION.DATE_OF_BILTY,
      payload: formatDate(date),
    });
  };
  const handleConsignerName = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNER_NAME,
      payload: text,
    });
  };
  const handleConsignerGst = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNER_GST,
      payload: text,
    });
  };
  const handleConsignerMobileNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNER_MOBILE_NO,
      payload: text,
    });
  };
  const handleConsignerAddress = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNER_ADDRESS,
      payload: text,
    });
  };
  const handleConsignerPinCode = useCallback(
    (text: string) => {
      dispatch({
        type: BILTY_FORM_ACTION.CONSIGNER_PINCODE,
        payload: text,
      });
    },
    [state.pickupPincode],
  );
  const handleConsignerState = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNER_STATE,
      payload: item.label,
    });
  };
  const handleConsignerCity = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNER_CITY,
      payload: item.label,
    });
  };
  const handleConsigneeName = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNEE_NAME,
      payload: text,
    });
  };
  const handleConsigneeGst = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNEE_GST,
      payload: text,
    });
  };
  const handleConsigneeMobileNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNEE_MOBILE_NO,
      payload: text,
    });
  };
  const handleConsigneeAddress = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNEE_ADDRESS,
      payload: text,
    });
  };
  const handleConsigneePinCode = useCallback(
    (text: string) => {
      dispatch({
        type: BILTY_FORM_ACTION.CONSIGNEE_PINCODE,
        payload: text,
      });
    },
    [state.deliveryPincode],
  );
  const handleConsigneeState = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNEE_STATE,
      payload: item.label,
    });
  };
  const handleConsigneeCity = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.CONSIGNEE_CITY,
      payload: item.label,
    });
  };
  const handleInvoiceNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.INVOICE_NO,
      payload: text,
    });
  };
  const handleVehicleType= (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.VEHICLE_TYPE,
      payload: item.label,
    });
  };
  const handleVehicleNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.VEHICLE_NO,
      payload: text,
    });
  };
  const handleFromLocation = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.FROM_LOCATION,
      payload: text,
    });
  };
  const handleToLocation = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.TO_LOCATION,
      payload: text,
    });
  };
  const handleDriverName = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.DRIVER_NAME,
      payload: text,
    });
  };
  const handleDriverMobileNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.DRIVER_MOBILE_NO,
      payload: text,
    });
  };
  const handleDriverLicenceNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.DRIVER_LICENCE_NO,
      payload: text,
    });
  };
  const handleSealNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.SEAL_NO,
      payload: text,
    });
  };
  const handleInDate = (date: Date) => {
    dispatch({
      type: BILTY_FORM_ACTION.IN_DATE,
      payload: formatDate(date),
    });
  };
  const handleOutDate = (date: Date) => {
    dispatch({
      type: BILTY_FORM_ACTION.OUT_DATE,
      payload: formatDate(date),
    });
  };
  const handleEwayBillNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.E_WAY_BILL_NO,
      payload: text,
    });
  };
  const handleGeneratedOn = (date: Date) => {
    dispatch({
      type: BILTY_FORM_ACTION.GENERATED_ON,
      payload: formatDate(date),
    });
  };
  const handleExpiryDate = (date: Date) => {
    dispatch({
      type: BILTY_FORM_ACTION.EXPIRY_DATE,
      payload: formatDate(date),
    });
  };
  const handleMatrialName = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.MATERIAL_NAME,
      payload: text,
    });
  };
  const handleNumberOfArticles = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.NO_OF_ARTICLES,
      payload: text,
    });
  };
  const handlePackingType= (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.PACKING_TYPE,
      payload: item.label,
    });
  };
  const handleHsnCode = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.HSN_CODE,
      payload: text,
    });
  };
  const handleBillInnvoiceNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.BILL_INVOICE_NO,
      payload: text,
    });
  };
  const handleNetWeight = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.NET_WEIGHT,
      payload: text,
    });
  };
  const handleUnitOne= (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.UNITONE,
      payload: item.label,
    });
  };
  const handleValueOfGoods = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.VALUE_OF_GOODS,
      payload: text,
    });
  };
  const handleFreightCharges = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.FREIGHT_CHARGES,
      payload: text,
    });
  };
  const handlePicupCharges= (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.PICKUP_CHARGES,
      payload: item.label,
    });
  };
  const handlePicupChargesAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.PICKUP_CHARGES_AMOUNT,
      payload: text,
    });
  };
  const handleDoorDeliveryCharges= (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.DOOR_DELIVERY_CHARGES,
      payload: item.label,
    });
  };
  const handleDoorDeliveryChargesAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.DOOR_DELIVERY_CHARGES_AMOUNT,
      payload: text,
    });
  };
  const handleDoorPackingCharges= (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.PACKING_CHARGES,
      payload: item.label,
    });
  };
  const handlePackingChargesAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.PACKING_CHARGES_AMOUNT,
      payload: text,
    });
  };
  const handlePackingMaterialCharges= (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.PACKING_MATERIAL_CHARGES,
      payload: item.label,
    });
  };
  const handlePackingMaterialChargesAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.PACKING_MATERIAL_CHARGES_AMOUNT,
      payload: text,
    });
  };
  const handleUnPackingCharges= (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.UNPACKING_CHARGES,
      payload: item.label,
    });
  };
  const handleUnpackingChargesAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.UNPACKING_CHARGES_AMOUNT,
      payload: text,
    });
  };
  const handleLoadingCharges= (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.LOADING_CHARGES,
      payload: item.label,
    });
  };
  const handleLoadingChargesAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.LOADING_CHARGES_AMOUNT,
      payload: text,
    });
  };
  const handleUnloadingCharges= (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.UNLOADING_CHARGES,
      payload: item.label,
    });
  };
  const handleUnloadingChargesAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.UNLOADING_CHARGES_AMOUNT,
      payload: text,
    });
  };
  const handleAdvanceAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.ADVANCE_AMOUNT,
      payload: text,
    });
  };
  const handleBalancceAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.BALANCE_AMOUNT,
      payload: text,
    });
  };
  const handleInsuranceCompany = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.INSURANCE_COMPANY,
      payload: text,
    });
  };
  const handlePolicyNo = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.POLICY_NO,
      payload: text,
    });
  };
  const handleInsuranceDate = (date: Date) => {
    dispatch({
      type: BILTY_FORM_ACTION.INSURANCE_DATE,
      payload: formatDate(date),
    });
  };
  const handleInsuranceAmount = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.INSURANCE_AMOUNT,
      payload: text,
    });
  };
  const handleDemurrageCharge = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.DEMURRAGE_CHARGES,
      payload: text,
    });
  };
  const handleDemurrageChargeDate = (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.CHARGE_DATE,
      payload: item.label,
    });
  };
  const handleDemurrageChargeApplicableAfter= (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.CHARGE_APPLICABLE_AFTER,
      payload: item.label,
    });
  };
  const handleRemark = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.REMARK,
      payload: text,
    });
  };
  const handleActualWeight = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.ACTUAL_WEIGHT,
      payload: text,
    });
  };
  const handleApplicableWeight = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.APPLICABLE_WEIGHT,
      payload: text,
    });
  };
  const handleUnitTwo= (item: TDropdownItem) => {
    dispatch({
      type: BILTY_FORM_ACTION.UNITTWO,
      payload: item.label,
    });
  };
  const handleRate = (text: string) => {
    dispatch({
      type: BILTY_FORM_ACTION.RATE,
      payload: text,
    });
  };
  const renderLoadingAddressView = () => {
    return (
      <>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Address" style={styles.label} />
          {/* <Input
            onChangeText={handleReceiptNoInputTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
            <Label text="Pincode" style={styles.label} />
            <Input
              onChangeText={handleReceiptNoInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            /> */}
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
              onChangeText={handleActualWeight}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Applicable Weight" style={styles.label} />
            <Input
              onChangeText={handleApplicableWeight}
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
              onSelect={handleUnitTwo}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Rate" style={styles.label} />
            <Input
              onChangeText={handleRate}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <CollapsibleView title="BASIC DETAILS" collapsed={false}>
          <View>
            <View style={styles.labelContainer}>
              <Label text="Bilty / LR / CN No." style={styles.label} />
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
                  onChangeText={() => {}}
                  containerStyle={styles.switchInputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                  editable={!switchState}
                />
              </View>
            </View>
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Choose Designs" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleTemplate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Date of Bility/LR/CN No." style={styles.label} />
                <DatePickerComponent onDateSelect={handleDateofBiltyLrCn} />
              </View>
            </View>
            <Spacer height={4} />
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="CONSIGNER DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="Consigner Name" style={styles.label} />
              <Input
                onChangeText={handleConsignerName}
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
                  onChangeText={handleConsignerGst}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Consigner Mobile No." style={styles.label} />
                <Input
                  onChangeText={handleConsignerMobileNo}
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
                onChangeText={handleConsignerAddress}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
                <Label text="Pincode" style={styles.label} />
                <Input
                  onChangeText={handleConsignerPinCode}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="State" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleConsignerState}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="City" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleConsignerCity}
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
                style={{marginRight: 15}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {
                  setIsLoadingAddressSameAsConsignerAddress(isChecked);
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
        <CollapsibleView title="CONSIGNEE DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="Consignee Name" style={styles.label} />
              <Input
                onChangeText={handleConsigneeName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Consignee GST" style={styles.label} />
                <Input
                  onChangeText={handleConsigneeGst}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Consignee Mobile No." style={styles.label} />
                <Input
                  onChangeText={handleConsigneeMobileNo}
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
                onChangeText={handleConsigneeAddress}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
                <Label text="Pincode" style={styles.label} />
                <Input
                  onChangeText={handleConsigneePinCode}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="State" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleConsigneeState}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="City" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleConsigneeCity}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="Delivery Address" style={styles.label2} />
            </View>
            <View style={styles.elementContainer}>
              <BouncyCheckbox
                size={25}
                fillColor={COLOR_BLUE}
                unfillColor="#FFFFFF"
                text="Same as Consignee Address"
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
                style={{marginRight: 15}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {
                  setIsDeliveryAddressSameAsConsigneeAddress(isChecked);
                }}
                isChecked={deliveryAddressSameAsConsigneeAddress}
              />
            </View>
            {!deliveryAddressSameAsConsigneeAddress
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
                onChangeText={handleInvoiceNo}
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
                  data={vehicleTypeOptions}
                  onSelect={handleVehicleType}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Vehicle No." style={styles.label} />
                <Input
                  onChangeText={handleVehicleNo}
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
                  onChangeText={handleFromLocation}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="To Location" style={styles.label} />
                <Input
                  onChangeText={handleToLocation}
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
                onChangeText={handleDriverName}
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
                  onChangeText={handleDriverMobileNo}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Driver Licence No." style={styles.label} />
                <Input
                  onChangeText={handleDriverLicenceNo}
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
                onChangeText={handleSealNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="In Date" style={styles.label} />
                <DatePickerComponent onDateSelect={handleInDate} />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Out Date" style={styles.label} />
                <DatePickerComponent onDateSelect={handleOutDate} />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="E-Way BILL DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="E-Way Bill No." style={styles.label} />
              <Input
                onChangeText={handleEwayBillNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Generated On" style={styles.label} />
                <DatePickerComponent onDateSelect={handleGeneratedOn} />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Expiry Date" style={styles.label} />
                <DatePickerComponent onDateSelect={handleExpiryDate} />
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
                onChangeText={handleMatrialName}
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
                  onChangeText={handleNumberOfArticles}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Packing Type" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handlePackingType}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="HSN Code" style={styles.label} />
                <Input
                  onChangeText={handleHsnCode}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Bill/Invoice No." style={styles.label} />
                <Input
                  onChangeText={handleBillInnvoiceNo}
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
                  onChangeText={handleNetWeight}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Units" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleUnitOne}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Value of Goods" style={styles.label} />
              <Input
                onChangeText={handleValueOfGoods}
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
                style={{marginRight: 15}}
                textContainerStyle={{paddingLeft: 0}}
                onPress={(isChecked: boolean) => {
                  setFixedFreight(isChecked);
                }}
                isChecked={fixedFreight}
              />
            </View>
            {!fixedFreight ? renderNonFixedFreightView() : null}
            <View style={styles.elementContainer2}>
              <Label text="Freight Charges" style={styles.label} />
              <Input
                onChangeText={handleFreightCharges}
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
                  onSelect={handlePicupCharges}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handlePicupChargesAmount}
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
                  onSelect={handleDoorDeliveryCharges}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handleDoorDeliveryChargesAmount}
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
                  onSelect={handleDoorPackingCharges}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handlePackingChargesAmount}
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
                  onSelect={handlePackingMaterialCharges}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handlePackingMaterialChargesAmount}
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
                  onSelect={handleUnPackingCharges}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handleUnpackingChargesAmount}
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
                  onSelect={handleLoadingCharges}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handleLoadingChargesAmount}
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
                  onSelect={handleUnloadingCharges}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Amount" style={styles.label} />
                <Input
                  onChangeText={handleUnloadingChargesAmount}
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
                  onChangeText={handleAdvanceAmount}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Balance Amount" style={styles.label} />
                <Input
                  onChangeText={handleBalancceAmount}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="INSURANCE DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer}>
              <BouncyCheckboxGroup
                data={insuranceOptions}
                onChange={(selectedItem: ICheckboxButton) => {
                  console.log('SelectedItem: ', JSON.stringify(selectedItem));
                }}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Insurance Company" style={styles.label} />
              <Input
                onChangeText={handleInsuranceCompany}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer2}>
              <Label text="Policy Number" style={styles.label} />
              <Input
                onChangeText={handlePolicyNo}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Insurance Date" style={styles.label} />
                <DatePickerComponent onDateSelect={handleInsuranceDate} />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Insurance Amount" style={styles.label} />
                <Input
                  onChangeText={handleInsuranceAmount}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
          </View>
        </CollapsibleView>
        <Spacer height={4} />
        <CollapsibleView title="DEMURRAGE DETAILS" collapsed={true}>
          <View>
            <View style={styles.elementContainer2}>
              <Label text="Demurrage Charge" style={styles.label} />
              <Input
                onChangeText={handleDemurrageCharge}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <View style={styles.itemContainer}>
                <Label text="Charge Date" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleDemurrageChargeDate}
                />
              </View>
              <View style={styles.itemContainer}>
                <Label text="Charge Applicable After" style={styles.label} />
                <DropdownComponent
                  data={shiftingLuggages}
                  onSelect={handleDemurrageChargeApplicableAfter}
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
                onChangeText={handleRemark}
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

export default BiltyView;
