import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import Input, { InputMethods } from '../../../../../../../common/Input';
import Spacer from '../../../../../../../common/Spacer';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import DeliveryAddressView from './DeliveryAddressView';
import usePincodeHook from '../../../../../../../hooks/usePincodeHook';
import {getCities2, getStates2} from '../../../../../../../utils/formatter';
import Spinner from '../../../../../../../common/Spinner';
import DropdownWithTextInput, { DropdownMethods } from '../../../../../../../common/DropdownWithTextInput';
import { useAppSelector } from '../../../../../../../redux/hooks';
import { ISingleEnquiryData } from '../../../../../../../interface/enquiry/ISingleEnquiryResponse';

const ConsigneeDetails: React.FC<{}> = ({}) => {
  const {
    state,
    setIsConsigneeAddressSameAsClient,
    setConsigneeName,
    setConsigneeGst,
    setConsigneeMobileNo,
    setConsigneeAddress,
    setConsigneePincode,
    setConsigneeState,
    setConsigneeCity,
    setIsDeliveryAddressSameAsConsignee,
  } = useBiltyFormContextHook();

  const stateDropdownCompRef = useRef<DropdownMethods>(null);
  const cityDropdownCompRef = useRef<DropdownMethods>(null);

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const {order} = useAppSelector(state => state.Order);
  const {data: orderData} = order || {};

  const getSingleOrder = () => {
    let order: ISingleEnquiryData;
    if (orderData && Array.isArray(orderData) && orderData.length > 0) {
      order = orderData[0];
    }
    //@ts-ignore
    return order;
  };

  const consigneeNameInputRef = useRef<InputMethods>(null);
  const gstInputRef = useRef<InputMethods>(null);
  const mobileInputRef = useRef<InputMethods>(null);
  const consigneeAddressInputRef = useRef<InputMethods>(null);
  const consigneePincodeInputRef = useRef<InputMethods>(null);

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const handlePincodeChange = useCallback(
    (text: string) => {
      setConsigneePincode(text);
      setPincode(text);
    },
    [state.consinger_pincode],
  );

  const initConsingeeAddressIfSameasClient = useCallback(() => {
    const order:ISingleEnquiryData = getSingleOrder();
    if(order && state.consignee_address_same_as_client) {
      const {billingBy, billingDetails, pickupAddress, mobile, partyName} = order || {};
      if(billingBy == "by Company") {
        const {authorityPersonName, employeeName, companyGST, authorityPersonMobile, employeeMobile} = billingDetails || {};
        const name:string = authorityPersonName || employeeName as string;
        const gst:string = companyGST || '';
        const mobile:string = authorityPersonMobile || employeeMobile as string;
        setConsigneeName(name);
        consigneeNameInputRef.current?.setValue(name);
        setConsigneeGst(gst);
        gstInputRef.current?.setValue(gst);
        setConsigneeMobileNo(mobile);
        mobileInputRef.current?.setValue(mobile);
      } else if(billingBy == "by Individual") {
        setConsigneeName(partyName);
        consigneeNameInputRef.current?.setValue(partyName);
        setConsigneeMobileNo(mobile);
        mobileInputRef.current?.setValue(mobile);
      }
      //*** address */
      const {city, state, address, pincode} = pickupAddress || {};
      setConsigneeAddress(address);
      consigneeAddressInputRef.current?.setValue(address);
      setConsigneeState(state);
      stateDropdownCompRef.current?.setValue(state);
      setConsigneeCity(city);
      cityDropdownCompRef.current?.setValue(city);
      setConsigneePincode(pincode);
      consigneePincodeInputRef.current?.setValue(pincode);
    } else {
        setConsigneeName('');
        consigneeNameInputRef.current?.setValue('');
        setConsigneeGst('');
        gstInputRef.current?.setValue('');
        setConsigneeMobileNo('');
        mobileInputRef.current?.setValue('');
        setConsigneeAddress('');
        consigneeAddressInputRef.current?.setValue('');
        setConsigneeState('');
        stateDropdownCompRef.current?.setValue('');
        setConsigneeCity('');
        cityDropdownCompRef.current?.setValue('');
        setConsigneePincode('');
        consigneePincodeInputRef.current?.setValue('');
    }
  }, [state.consignee_address_same_as_client]);

  useEffect(() => {
    initConsingeeAddressIfSameasClient();
  }, [state.consignee_address_same_as_client]);

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
      //@ts-ignore
      stateDropdownCompRef?.current?.setValue(states[0]);
      setConsigneeState(states[0]);
      //@ts-ignore
      cityDropdownCompRef?.current?.setValue(cities[0]);
      setConsigneeCity(cities[0]);
    }
  }, [states, cities]);

  return (
    <CollapsibleView title="CONSIGNEE DETAILS" collapsed={true}>
      <View>
        <View style={styles.elementContainer}>
          <BouncyCheckbox
            size={25}
            fillColor={COLOR_BLUE}
            unfillColor="#FFFFFF"
            text="Consignee Address same as Client"
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle2}
            style={{marginRight: 15}}
            textContainerStyle={{paddingLeft: 0}}
            onPress={(isChecked: boolean) => {
              setIsConsigneeAddressSameAsClient(
                !state.consignee_address_same_as_client,
              );
            }}
            isChecked={state.consignee_address_same_as_client}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Consignee Name" style={styles.label} />
          <Input
            onChangeText={setConsigneeName}
            value={state.consignee_name}
            placeholder='Enter consignee name'
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            ref={consigneeNameInputRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Consignee GST" style={styles.label} />
            <Input
              onChangeText={setConsigneeGst}
              placeholder='Enter consignee GST'
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              ref={gstInputRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Consignee Mobile No." style={styles.label} />
            <Input
              onChangeText={setConsigneeMobileNo}
              placeholder='Enter consginee GST'
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
              ref={mobileInputRef}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={setConsigneeAddress}
            placeholder='Enter consignee address'
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            ref={consigneeAddressInputRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Pincode" style={styles.label} />
          <Input
            onChangeText={handlePincodeChange}
            placeholder='Enter pincode'
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            inputType="numeric"
            ref={consigneePincodeInputRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="State" style={styles.label} />
            <DropdownWithTextInput
              options={states}
              onSelect={setConsigneeState}
              //@ts-ignore
              ref={stateDropdownCompRef}
              containerStyle={styles.itemContainer}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="City" style={styles.label} />
            <DropdownWithTextInput
              options={cities}
              onSelect={setConsigneeCity}
              //@ts-ignore
              ref={cityDropdownCompRef}
              containerStyle={styles.itemContainer}
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
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle2}
            style={{marginRight: 15}}
            textContainerStyle={{paddingLeft: 0}}
            onPress={(isChecked: boolean) => {
              setIsDeliveryAddressSameAsConsignee(
                !state.delivery_address_same_as_consignee,
              );
            }}
            isChecked={state.delivery_address_same_as_consignee}
            disableBuiltInState={true}
          />
        </View>
        <DeliveryAddressView />
        <Spinner show={fetching} />
      </View>
    </CollapsibleView>
  );
};

export default ConsigneeDetails;
