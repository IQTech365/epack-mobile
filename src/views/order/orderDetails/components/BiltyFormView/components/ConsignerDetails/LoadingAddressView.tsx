import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from './style';
import Spacer from '../../../../../../../common/Spacer';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import EpackDropdown from '../../../../../../../common/DropdownComponent2';
import {useBiltyFormContextHook} from '../../../../../../../provider/BiltyFormContextProvider';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import {getCities2, getStates2} from '../../../../../../../utils/formatter';
import usePincodeHook from '../../../../../../../hooks/usePincodeHook';
import Spinner from '../../../../../../../common/Spinner';

interface Props {}

const LoadingAddressView: React.FC<Props> = ({}) => {
  const {
    state,
    setLoadingAddress,
    setLoadingState,
    setLoadingPincode,
    setLoadingCity,
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
      setLoadingPincode(text);
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
      setLoadingState(states[0]);
      //@ts-ignore
      cityDropdownCompRef?.current?.setValue(cities[0]);
      setLoadingCity(cities[0]);
    }
  }, [states, cities]);

  if (!state.loading_address_same_as_consigner) return null;

  return (
    <>
      <Spacer height={4} />
      <View style={styles.elementContainer2}>
        <Label text="Address" style={styles.label} />
        <Input
          onChangeText={setLoadingAddress}
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
            hanldeData={setLoadingState}
            //@ts-ignore
            ref={stateDropdownCompRef}
          />
        </View>
        <View style={styles.itemContainer}>
          <Label text="City" style={styles.label} />
          <EpackDropdown
            data={cities}
            placeholder={'Select City'}
            hanldeData={setLoadingCity}
            //@ts-ignore
            ref={cityDropdownCompRef}
          />
        </View>
      </View>
      <Spinner show={fetching} />
    </>
  );
};

export default LoadingAddressView;
