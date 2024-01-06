import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import Label from '../../../../../../../common/Label';
import Input from '../../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import Spacer from '../../../../../../../common/Spacer';
import EpackDropdown from '../../../../../../../common/DropdownComponent2';
import {useInvoiceFormContextHook} from '../../../../../../../provider/InvoiceFormContextProvider';
import usePincodeHook from '../../../../../../../hooks/usePincodeHook';
import { getCities2, getStates2 } from '../../../../../../../utils/formatter';
import Spinner from '../../../../../../../common/Spinner';

interface Props {}

const InvoiceToIndividualView: React.FC<Props> = () => {
  const {
    state,
    setPartyName,
    setPartyMobileNo,
    setPincode: setPincode2,
    setState,
    setCity,
    setAddress,
  } = useInvoiceFormContextHook();

  const stateDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const handlePincodeChange = useCallback(
    (text: string) => {
      setPincode2(text);
      setPincode(text);
    },
    [state.pincode],
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
      stateDropdownRef &&
      cityDropdownRef
    ) {
      //@ts-ignore
      stateDropdownRef?.current?.setValue(states[0]);
      setState(states[0]);
      //@ts-ignore
      cityDropdownRef?.current?.setValue(cities[0]);
      setCity(cities[0]);
    }
  }, [states, cities]);

  return (
    <>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Party Name" style={styles.label} />
        <Input
          onChangeText={setPartyName}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
      <Spacer height={4} />
      <View style={styles.fullWidthCompContainer}>
        <Label text="Mobile No." style={styles.label} />
        <Input
          onChangeText={setPartyMobileNo}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          selectionColor={COLOR_BLACK}
        />
      </View>
      {!state.same_as_client_address ? (
        <>
          <Spacer height={4} />
          <View style={styles.halfWidthCompContainer}>
            <View style={styles.compContainer}>
              <Label text="Pincode" style={styles.label} required={true} />
              <Input
                onChangeText={handlePincodeChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="Enter Pincode"
              />
            </View>
            <View style={styles.compContainer}>
              <Label text="State" style={styles.label} />
              <EpackDropdown
                data={states}
                placeholder={'Select State'}
                hanldeData={setState}
                //@ts-ignore
                ref={stateDropdownRef}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.fullWidthCompContainer}>
            <Label text="City" style={styles.label} />
            <EpackDropdown
              data={cities}
              placeholder={'Select City'}
              hanldeData={setCity}
              //@ts-ignore
              ref={cityDropdownRef}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.fullWidthCompContainer}>
            <Label text="Address" style={styles.label} />
            <Input
              onChangeText={setAddress}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <Spinner show={fetching} />
        </>
      ) : null}
    </>
  );
};

export default InvoiceToIndividualView;
