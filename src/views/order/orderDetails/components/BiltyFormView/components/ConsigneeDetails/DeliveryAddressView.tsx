import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import Spacer from '../../../../../../../common/Spacer';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import EpackDropdown from '../../../../../../../common/DropdownComponent2';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import usePincodeHook from '../../../../../../../hooks/usePincodeHook';
import {getCities2, getStates2} from '../../../../../../../utils/formatter';
import Spinner from '../../../../../../../common/Spinner';

interface Props {}

const DeliveryAddressView: React.FC<Props> = ({}) => {
  const {
    state,
    setDeliveryAddress,
    setDeliveryPincode,
    setDeliveryState,
    setDeliveryCity,
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
      setDeliveryPincode(text);
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
      setDeliveryState(states[0]);
      //@ts-ignore
      cityDropdownCompRef?.current?.setValue(cities[0]);
      setDeliveryCity(cities[0]);
    }
  }, [states, cities]);

  if (!state.delivery_address_same_as_consignee) return null;

  return (
    <>
      <Spacer height={4} />
      <View style={styles.elementContainer2}>
        <Label text="Address" style={styles.label} />
        <Input
          onChangeText={setDeliveryAddress}
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
        />
      </View>
      <Spacer height={4} />
      <View style={styles.elementContainer}>
        <View style={styles.itemContainer}>
          <Label text="State" style={styles.label} />
          <EpackDropdown
            data={states}
            placeholder={'Select State'}
            hanldeData={setDeliveryState}
            //@ts-ignore
            ref={stateDropdownCompRef}
          />
        </View>
        <View style={styles.itemContainer}>
          <Label text="City" style={styles.label} />
          <EpackDropdown
            data={cities}
            placeholder={'Select City'}
            hanldeData={setDeliveryCity}
            //@ts-ignore
            ref={cityDropdownCompRef}
          />
        </View>
        <Spinner show={fetching} />
      </View>
    </>
  );
};

export default DeliveryAddressView;
