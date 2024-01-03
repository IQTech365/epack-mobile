import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import shiftingTypes from '../../../../../data/shiftingType.json';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import {Switch} from 'react-native-switch';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import DatePickerComponent from '../../../../../common/DatePickerComponent';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import billingByOptions from '../../../../../data/billingByOptions.json';
import {formatDate4} from '../../../../../utils/formatter';
import BillingIndividualView from '../BillingIndividualView';
import BillingCompanyView from '../BillingCompanyView';
import VehicleInfoView from '../VehicleInfoView';
interface Props {
  //
}

const BasicDetails: React.FC<Props> = ({}) => {
  const [switchState, setSwitchState] = useState<boolean>(true);
  
  const switchWrapperStyle = switchState ? styles.switchMainWrapper : styles.switchMainWrapper2;
  const {
    state,
    setShiftingType,
    setShiftingLuggage,
    setBillingBy,
    setQuotationNo,
    setDateOfQuotation,
    setDateOfMoving,
    setPartyName,
    setPartyMobileNo,
    setCompanyName,
    setAuthorityPersonName,
    setAuthorityMobileNo,
    setCompanyGSt,
    setEmployeeName,
    setEmployeeMobileNo,
    setEmployeeDesignation,
    setCompanyAddress,
  } = useQuotationFormContextHook();

  const shiftingTypeDropdownCompRef = useRef(null);
  const shiftingLuggageDropdownCompRef = useRef(null);
  const quotationNoInputCompRef = useRef(null);
  const dateOfQuotationCompRef = useRef(null);
  const dateOfMovingCompRef = useRef(null);
  const billingByDropdownCompRef = useRef(null);

  useEffect(() => {
    if(state.billing_by == billingByOptions[1].label) {
      setPartyName('');
      setPartyMobileNo('');
    } else if(state.billing_by == billingByOptions[0].label) {
      setCompanyName('');
      setAuthorityPersonName('');
      setAuthorityMobileNo('');
      setCompanyGSt('');
      setEmployeeName('');
      setEmployeeMobileNo('');
      setEmployeeDesignation('');
      setCompanyAddress('');
    }
  }, [state.billing_by]);

  return (
    <CollapsibleView title="BASIC DETAILS" collapsed={false}>
      <View>
        <Spacer height={4} />
        <View style={styles.twoColumnContainer}>
          <View style={styles.compContainer}>
            <Label text="Shifting Type" style={styles.label} />
            <DropdownComponent
              data={shiftingTypes}
              onSelect={(item: TDropdownItem) => {
                setShiftingType(item.label);
              }}
              //@ts-ignore
              ref={shiftingTypeDropdownCompRef}
            />
          </View>
          <View style={styles.compContainer}>
            <Label text="Shifting Luggage" style={styles.label} />
            <DropdownComponent
              data={shiftingLuggages}
              onSelect={(item: TDropdownItem) => {
                setShiftingLuggage(item.label);
              }}
              //@ts-ignore
              ref={shiftingLuggageDropdownCompRef}
            />
          </View>
        </View>
        <VehicleInfoView />
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Label text="Quotation No." style={styles.label} />
        </View>
        <View style={[styles.mainWrapper, styles.switchMainWrapper3]}>
          <View style={[styles.textContainer, {alignItems: 'center'}]}>
            <Switch
              containerStyle={styles.switchStyle}
              value={switchState}
              onValueChange={val => setSwitchState(val)}
              // disabled={isEdit}
              activeText={'Auto'}
              inActiveText={'Manual'}
              outerCircleStyle={styles.outerCircleStyle}
              renderActiveText={true}
              renderInActiveText={true}
              switchWidthMultiplier={3.5}
            />
          </View>
          <View style={[styles.textContainer, switchWrapperStyle]}>
            <Input
              onChangeText={setQuotationNo}
              containerStyle={styles.switchInputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              editable={!switchState}
              //@ts-ignore
              ref={quotationNoInputCompRef}
              // value={isEdit ? quotationserialNo : ''}
            />
          </View>
        </View>
        <View style={styles.twoColumnContainer}>
          <View style={styles.compContainer}>
            <Label text="Date of Quotation" style={styles.label} />
            <DatePickerComponent
              onDateSelect={(date: Date) => {
                setDateOfQuotation(formatDate4(date));
              }}
              //@ts-ignore
              ref={dateOfQuotationCompRef}
            />
          </View>
          <View style={styles.compContainer}>
            <Label text="Date of Moving" style={styles.label} />
            <DatePickerComponent
              onDateSelect={(date: Date) => {
                setDateOfMoving(formatDate4(date));
              }}
              //@ts-ignore
              ref={dateOfMovingCompRef}
            />
          </View>
        </View>
        <View style={styles.fullWidthContainer}>
          <Label text="Billing By" style={styles.label} />
          <DropdownComponent
            data={billingByOptions}
            onSelect={(item: TDropdownItem) => {
              setBillingBy(item.label);
            }}
            //@ts-ignore
            ref={billingByDropdownCompRef}
          />
        </View>
        <Spacer height={4} />
        {state.billing_by == billingByOptions[0].label ? <BillingIndividualView /> : <BillingCompanyView />}
      </View>
    </CollapsibleView>
  );
};

export default BasicDetails;
