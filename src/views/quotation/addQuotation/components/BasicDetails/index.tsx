import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import DropdownComponent, {
  IDropdownHandler,
} from '../../../../../common/DropdownComponent';
import shiftingTypes from '../../../../../data/shiftingType.json';
import shiftingLuggages from '../../../../../data/shiftingLuggage.json';
import {Switch} from 'react-native-switch';
import Input, {InputMethods} from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import DatePickerComponent, {
  IDateMethods,
} from '../../../../../common/DatePickerComponent';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import billingByOptions from '../../../../../data/billingByOptions.json';
import {formatDate3, formatDate4} from '../../../../../utils/formatter';
import BillingIndividualView from '../BillingIndividualView';
import BillingCompanyView from '../BillingCompanyView';
import VehicleInfoView from '../VehicleInfoView';
import {
  IEnquiry,
  IGetQuotationData,
} from '../../../../../interface/quotation/IGetQuotationsResponse';
import useSerialNoHook from '../../../../../hooks/useSerialNo';
interface Props {
  fromEnquiry?: boolean;
  isEdit?: boolean;
  item?: IGetQuotationData;
  enquiryData?:IEnquiry;
}

const BasicDetails: React.FC<Props> = ({fromEnquiry = false, isEdit, item, enquiryData}) => {
  const [switchState, setSwitchState] = useState<boolean>(true);
  const serialNo: number = useSerialNoHook();

  const switchWrapperStyle = switchState
    ? styles.switchMainWrapper
    : styles.switchMainWrapper2;
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
    setIsSerialNoAutomatic,
  } = useQuotationFormContextHook();
  console.log('state.errors.quotation_no', state.errors.quotation_no);
  
  

  const shiftingTypeDropdownCompRef = useRef<IDropdownHandler>(null);
  const shiftingLuggageDropdownCompRef = useRef<IDropdownHandler>(null);
  const quotationNoInputCompRef = useRef<InputMethods>(null);
  const dateOfQuotationCompRef = useRef<IDateMethods>(null);
  const dateOfMovingCompRef = useRef<IDateMethods>(null);
  const billingByDropdownCompRef = useRef<IDropdownHandler>(null);

  useEffect(() => {
    setIsSerialNoAutomatic(switchState);
  }, []);

  useEffect(() => {
    if (!isEdit && serialNo) {
      setQuotationNo(serialNo.toString());
    }
  }, [serialNo]);

  useEffect(() => {
    if (!isEdit) {
      if (switchState) {
        setIsSerialNoAutomatic(true);
        if (serialNo) {
          setQuotationNo(serialNo.toString());
          //@ts-ignore
          quotationNoInputCompRef &&
            quotationNoInputCompRef?.current?.setValue(serialNo.toString());
        }
      } else {
        setIsSerialNoAutomatic(false);
        setQuotationNo('');
        //@ts-ignore
        quotationNoInputCompRef &&
          quotationNoInputCompRef?.current?.setValue('');
      }
    }
  }, [switchState]);
  

  useEffect(() => {
    if(fromEnquiry && enquiryData) {
      setBillingBy(enquiryData.billingBy);
          const billingByItem: TDropdownItem = billingByOptions.find(
            (d: TDropdownItem) => d.label == enquiryData.billingBy,
          ) as TDropdownItem;          
          if (billingByItem) {
            billingByDropdownCompRef &&
              billingByDropdownCompRef?.current?.setDefaultValue(billingByItem);
          }

          setShiftingType(enquiryData.shiftingType);
          const shiftingTypeItem: TDropdownItem = shiftingTypes.find(
            (d: TDropdownItem) =>
              d.label.toLowerCase() == enquiryData.shiftingType.toLowerCase(),
          ) as TDropdownItem;
          if (shiftingTypeItem) {
            shiftingTypeDropdownCompRef &&
              shiftingTypeDropdownCompRef?.current?.setDefaultValue(
                shiftingTypeItem,
              );
          }
    }  
  }, [fromEnquiry]);

  useEffect(() => {
    if (state.billing_by == billingByOptions[1].label) {
      setPartyName('');
      setPartyMobileNo('');
    } else if (state.billing_by == billingByOptions[0].label) {
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

  console.log("itemitemitem");
  

  useEffect(() => {
    if (isEdit && item) {
      const shiftingLuggageItem: TDropdownItem = shiftingLuggages.find(
        (d: TDropdownItem) => d.label == item.shiftingLuggage,
      ) as TDropdownItem;
      if (shiftingLuggageItem) {
        shiftingLuggageDropdownCompRef &&
          shiftingLuggageDropdownCompRef?.current?.setDefaultValue(
            shiftingLuggageItem,
          );
        setShiftingLuggage(item.shiftingLuggage);
      }
      quotationNoInputCompRef &&
        quotationNoInputCompRef?.current?.setValue(item.quotationNumber);
        setQuotationNo(item.quotationNumber);

      dateOfQuotationCompRef &&
        dateOfQuotationCompRef?.current?.setDefaultValue(
          new Date(item.quotationDate),
        );
        setDateOfQuotation(item.quotationDate)
      const _enquires: IEnquiry[] = item.enquiries;      
      if (_enquires && _enquires.length > 0) {
        const singleEnquiry: IEnquiry = _enquires[0];
        if (singleEnquiry) {          
          const shiftingTypeItem: TDropdownItem = shiftingTypes.find(
            (d: TDropdownItem) =>
              d.label.toLowerCase() == singleEnquiry.shiftingType.toLowerCase(),
          ) as TDropdownItem;
          if (shiftingTypeItem) {
            shiftingTypeDropdownCompRef &&
              shiftingTypeDropdownCompRef?.current?.setDefaultValue(
                shiftingTypeItem,
              );
              setShiftingType(singleEnquiry.shiftingType);
          }
          dateOfMovingCompRef &&
            dateOfMovingCompRef?.current?.setDefaultValue(
              new Date(singleEnquiry.shiftingDate),
            );
            setDateOfMoving(singleEnquiry.shiftingDate)
          const billingByItem: TDropdownItem = billingByOptions.find(
            (d: TDropdownItem) => d.label == singleEnquiry.billingBy,
          ) as TDropdownItem;          
          if (billingByItem) {
            billingByDropdownCompRef &&
              billingByDropdownCompRef?.current?.setDefaultValue(billingByItem);
          }
          setBillingBy(singleEnquiry.billingBy);
        }
      }
    }
  }, [isEdit, item]);

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
              containerStyle={styles.containerStyle}
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
        <VehicleInfoView
          isEdit={isEdit}
          item={item}
          fromEnquiry={fromEnquiry}
        />
        <Spacer height={4} />
        <View style={styles.labelContainer}>
          <Label text="Quotation No." style={styles.label} />
        </View>
        <View style={[styles.mainWrapper, styles.switchMainWrapper3]}>
          <View style={[styles.textContainer, {alignItems: 'center'}]}>
            <Switch
              containerStyle={styles.switchStyle}
              value={switchState}
              onValueChange={val => {
                setSwitchState(val);
              }}
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
              value={
                state.quotation_no ? state.quotation_no : ''
              }
              placeholder="Enter Quotation No"
              error={state.errors.quotation_no}
              editable={!switchState}
              inputType="numeric"
              //@ts-ignore
              ref={quotationNoInputCompRef}
            />
          </View>
        </View>
        <Spacer height={4} />
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
        {state.billing_by == billingByOptions[0].label ? (
          <BillingIndividualView
            fromEnquiry={fromEnquiry}
            isEdit={isEdit}
            item={item}
          />
        ) : (
          <BillingCompanyView
            fromEnquiry={fromEnquiry}
            isEdit={isEdit}
            item={item}
          />
        )}
      </View>
    </CollapsibleView>
  );
};

export default BasicDetails;
