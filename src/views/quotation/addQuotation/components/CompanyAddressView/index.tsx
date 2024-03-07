import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import Label from '../../../../../common/Label';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import Spacer from '../../../../../common/Spacer';
import usePincodeHook from '../../../../../hooks/usePincodeHook';
import {getCities2, getStates2} from '../../../../../utils/formatter';
import Spinner from '../../../../../common/Spinner';
import { IEnquiry, IGetQuotationData } from '../../../../../interface/quotation/IGetQuotationsResponse';
import { ICustomerBillingInfo } from '../../../../../interface/common/common';
import DropdownWithTextInput from '../../../../../common/DropdownWithTextInput';
import { IBillingInfo } from '../../../../../interface/enquiry/ISingleEnquiryResponse';

interface Props {
  fromEnquiry:boolean;
  isEdit?:boolean;
  item?:IGetQuotationData;
}

const CompanyAddressView: React.FC<Props> = ({fromEnquiry, isEdit, item}) => {
  const {
    state,
    setCompanyPincode,
    setCompanyState,
    setCompanyCity,
  } = useQuotationFormContextHook();

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const pincodeInputCompRef = useRef(null);
  const stateDropdownCompRef = useRef(null);
  const cityDropdownCompRef = useRef(null);

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const handlePincodeChange = useCallback(
    (text: string) => {
      setCompanyPincode(text);
      setPincode(text);
    },
    [state.pickup_pincode],
  );

  useEffect(() => {
    if (result && result.Status != 'Error') {
      setStates(getStates2(result));
      setCities(getCities2(result));
    }
  }, [result]);

  useEffect(() => {
    if (
      states.length > 0 &&
      cities.length > 0 &&
      stateDropdownCompRef &&
      cityDropdownCompRef
    ) {
      if(!isEdit){
        //@ts-ignore
        stateDropdownCompRef?.current?.setValue(states[0]);
        setCompanyState(states[0]);
        //@ts-ignore
        cityDropdownCompRef?.current?.setValue(cities[0]);
        setCompanyCity(cities[0]);
      }
    }
  }, [states, cities]);

  useEffect(() => {
    if (fromEnquiry && state.enquiryItem) {
      const {enquiryItem} = state;
      if(enquiryItem.billingBy == "by Company") {
        const billingInfo:IBillingInfo = enquiryItem.billingDetails as IBillingInfo;
        if(billingInfo) {
          setCompanyPincode(billingInfo.pincode);
          setPincode(billingInfo.pincode);
          setCompanyState(billingInfo.state);
          setCompanyCity(billingInfo.city);
          //@ts-ignore
          stateDropdownCompRef && stateDropdownCompRef?.current?.setValue(billingInfo.state);
          //@ts-ignore
          cityDropdownCompRef && cityDropdownCompRef?.current?.setValue(billingInfo.city);
        }
      }
    }
  }, [state.enquiryItem]);

  useEffect(() => {
    if(isEdit && item) {
      if(item) {
        const _enquires:IEnquiry[] = item.enquiries;
        if(_enquires && _enquires.length > 0) {
          const singleEnquiry:IEnquiry = _enquires[0];
          if(singleEnquiry.billingBy == "by Company") {
            const billingInfo:ICustomerBillingInfo = singleEnquiry.billingDetails as ICustomerBillingInfo;
            if(billingInfo) {
              setCompanyPincode(billingInfo.pincode);
              setPincode(billingInfo.pincode);
              setCompanyState(billingInfo.state);
              //@ts-ignore
              stateDropdownCompRef?.current?.setValue(billingInfo.state);
              setCompanyCity(billingInfo.city);
              //@ts-ignore
              cityDropdownCompRef?.current?.setValue(billingInfo.city);
            }
          }
        }
      }
    }
  }, [isEdit]);

  return (
      <View>
        <View style={styles.twoColumnContainer}>
          <View style={styles.compContainer}>
            <Label text="Pincode" style={styles.label} />
            <Input
              onChangeText={handlePincodeChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder="pincode"
              //@ts-ignore
              ref={pincodeInputCompRef}
              //@ts-ignore
              error={state.errors.pickup_pincode}
              value={state?.company_pincode}
              inputType="numeric"
              required={true}
            />
          </View>
          <View style={styles.compContainer}>
            <Label text="State" style={styles.label} />
            <DropdownWithTextInput
              options={states}
              onSelect={setCompanyState}
              //@ts-ignore
              ref={stateDropdownCompRef}
              containerStyle={styles.compContainer}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="City" style={styles.label} />
          <DropdownWithTextInput
            options={cities}
            onSelect={setCompanyCity}
            //@ts-ignore
            ref={cityDropdownCompRef}
          />
        </View>
        <Spinner show={fetching} />
      </View>
  );
};

export default CompanyAddressView;
