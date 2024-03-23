import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import Input, { InputMethods } from '../../../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE, COLOR_GRAY4} from '../../../../../../../utils/colors';
import Spacer from '../../../../../../../common/Spacer';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import LoadingAddressView from './LoadingAddressView';
import usePincodeHook from '../../../../../../../hooks/usePincodeHook';
import {getCities2, getStates2} from '../../../../../../../utils/formatter';
import Spinner from '../../../../../../../common/Spinner';
import DropdownWithTextInput, { DropdownMethods } from '../../../../../../../common/DropdownWithTextInput';
import { useAppSelector } from '../../../../../../../redux/hooks';
import { ISingleEnquiryData } from '../../../../../../../interface/enquiry/ISingleEnquiryResponse';

const ConsignerDetails: React.FC<{}> = ({}) => {
  const {
    state,
    setIsConsignerAddressSameAsClient,
    setConsignerName,
    setConsignerGst,
    setConsignerMobileNo,
    setConsignerAddress,
    setConsignerPincode,
    setConsignerState,
    setConsignerCity,
    setIsLoadingAddressSameAsConsigner,
  } = useBiltyFormContextHook();

  const stateDropdownCompRef = useRef<DropdownMethods>(null);
  const cityDropdownCompRef = useRef<DropdownMethods>(null);

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const {getOrderRequesting, order} = useAppSelector(state => state.Order);
  const {data: orderData} = order || {};

  const getSingleOrder = () => {
    let order: ISingleEnquiryData;
    if (orderData && Array.isArray(orderData) && orderData.length > 0) {
      order = orderData[0];
    }
    //@ts-ignore
    return order;
  };
  console.log('SingleOrder----', JSON.stringify(getSingleOrder()));

  const consignerNameInputRef = useRef<InputMethods>(null);
  const gstInputRef = useRef<InputMethods>(null);
  const mobileInputRef = useRef<InputMethods>(null);
  // const consingerStateDDRef = useRef<DropdownMethods>(null);
  // const consignerCityDDRef = useRef<DropdownMethods>(null);
  const consignerAddressInputRef = useRef<InputMethods>(null);
  const consignerPincodeInputRef = useRef<InputMethods>(null);


  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const initConsingerAddressIfSameasClient = useCallback(() => {
    const order:ISingleEnquiryData = getSingleOrder();
    if(order && state.consigner_address_same_as_client) {
      const {billingBy, billingDetails, pickupAddress, mobile, partyName} = order || {};
      if(billingBy == "by Company") {
        const {authorityPersonName, employeeName, companyGST, authorityPersonMobile, employeeMobile} = billingDetails || {};
        const name:string = authorityPersonName || employeeName as string;
        const gst:string = companyGST || '';
        const mobile:string = authorityPersonMobile || employeeMobile as string;
        setConsignerName(name);
        consignerNameInputRef.current?.setValue(name);
        setConsignerGst(gst);
        gstInputRef.current?.setValue(gst);
        setConsignerMobileNo(mobile);
        mobileInputRef.current?.setValue(mobile);
      } else if(billingBy == "by Individual") {
        //TODO: fill for individual case
      }
      //*** address */
      const {city, state, address, pincode} = pickupAddress || {};
      setConsignerAddress(address);
      consignerAddressInputRef.current?.setValue(address);
      setConsignerState(state);
      stateDropdownCompRef.current?.setValue(state);
      setConsignerCity(city);
      cityDropdownCompRef.current?.setValue(city);
      setConsignerPincode(pincode);
      consignerPincodeInputRef.current?.setValue(pincode);
    } else {
        setConsignerName('');
        consignerNameInputRef.current?.setValue('');
        setConsignerGst('');
        gstInputRef.current?.setValue('');
        setConsignerMobileNo('');
        mobileInputRef.current?.setValue('');
        setConsignerAddress('');
        consignerAddressInputRef.current?.setValue('');
        setConsignerState('');
        stateDropdownCompRef.current?.setValue('');
        setConsignerCity('');
        cityDropdownCompRef.current?.setValue('');
        setConsignerPincode('');
        consignerPincodeInputRef.current?.setValue('');
    }
  }, [state.consigner_address_same_as_client])

  const handlePincodeChange = useCallback(
    (text: string) => {
      setConsignerPincode(text);
      setPincode(text);
    },
    [state.consinger_pincode],
  );

  useEffect(() => {
    initConsingerAddressIfSameasClient();
  }, [state.consigner_address_same_as_client]);

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
      setConsignerState(states[0]);
      //@ts-ignore
      cityDropdownCompRef?.current?.setValue(cities[0]);
      setConsignerCity(cities[0]);
    }
  }, [states, cities]);

  return (
    <CollapsibleView title="CONSIGNER DETAILS" collapsed={true}>
      <View>
      <View style={styles.elementContainer}>
          <BouncyCheckbox
            size={25}
            fillColor={COLOR_BLUE}
            unfillColor="#FFFFFF"
            text="Consigner Address same as Client"
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle2}
            style={{marginRight: 15}}
            textContainerStyle={{paddingLeft: 0}}
            onPress={(isChecked: boolean) => {
              setIsConsignerAddressSameAsClient(
                !state.consigner_address_same_as_client,
              );
            }}
            isChecked={state.consigner_address_same_as_client}
          />
        </View>
        <View style={styles.elementContainer2}>
          <Label text="Consigner Name" style={styles.label} />
          <Input
            onChangeText={setConsignerName}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            placeholder="Enter Consigner name"
            placeholderTextColor={COLOR_GRAY4}
            ref={consignerNameInputRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Consigner GST" style={styles.label} />
            <Input
              onChangeText={setConsignerGst}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder="Enter GST#"
              placeholderTextColor={COLOR_GRAY4}
              ref={gstInputRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Consigner Mobile No." style={styles.label} />
            <Input
              onChangeText={setConsignerMobileNo}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
              placeholder="Enter mobile number"
              placeholderTextColor={COLOR_GRAY4}
              ref={mobileInputRef}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={setConsignerAddress}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            placeholder="Enter address"
            placeholderTextColor={COLOR_GRAY4}
            ref={consignerAddressInputRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Pincode" style={styles.label} />
          <Input
            onChangeText={handlePincodeChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            inputType="numeric"
            placeholder="Enter Pincode"
            placeholderTextColor={COLOR_GRAY4}
            ref={consignerPincodeInputRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="State" style={styles.label} />
            <DropdownWithTextInput
              options={states}
              onSelect={setConsignerState}
              //@ts-ignore
              ref={stateDropdownCompRef}
              containerStyle={styles.itemContainer}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="City" style={styles.label} />
            <DropdownWithTextInput
              options={cities}
              onSelect={setConsignerCity}
              //@ts-ignore
              ref={cityDropdownCompRef}
              containerStyle={styles.itemContainer}
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
            iconStyle={styles.iconStyle}
            innerIconStyle={styles.innerIconStyle}
            textStyle={styles.textStyle2}
            style={{marginRight: 15}}
            textContainerStyle={{paddingLeft: 0}}
            onPress={(isChecked: boolean) => {
              setIsLoadingAddressSameAsConsigner(
                !state.loading_address_same_as_consigner,
              );
            }}
            isChecked={state.loading_address_same_as_consigner}
            disableBuiltInState={true}
          />
        </View>
        <LoadingAddressView />
        <Spinner show={fetching} />
      </View>
    </CollapsibleView>
  );
};

export default ConsignerDetails;
