import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../../../common/CollapsibleView';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import Spacer from '../../../../../../../common/Spacer';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import DeliveryAddressView from './DeliveryAddressView';
import usePincodeHook from '../../../../../../../hooks/usePincodeHook';
import {getCities2, getStates2} from '../../../../../../../utils/formatter';
import Spinner from '../../../../../../../common/Spinner';
import DropdownWithTextInput from '../../../../../../../common/DropdownWithTextInput';

const ConsigneeDetails: React.FC<{}> = ({}) => {
  const {
    state,
    setConsigneeName,
    setConsigneeGst,
    setConsigneeMobileNo,
    setConsigneeAddress,
    setConsigneePincode,
    setConsigneeState,
    setConsigneeCity,
    setIsDeliveryAddressSameAsConsignee,
  } = useBiltyFormContextHook();

  const stateDropdownCompRef = useRef(null);
  const cityDropdownCompRef = useRef(null);

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

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
              setIsDeliveryAddressSameAsConsignee(
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
              onChangeText={setConsigneeGst}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Consignee Mobile No." style={styles.label} />
            <Input
              onChangeText={setConsigneeMobileNo}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              inputType="numeric"
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer2}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={setConsigneeAddress}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
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
