import React, {useEffect, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import styles from '../style';
import Label from '../../../../../../common/Label';
import Spacer from '../../../../../../common/Spacer';
import Input from '../../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../../utils/colors';
import EpackDropdown from '../../../../../../common/DropdownComponent2';
import {useAddDriverFormContextHook} from '../../../../../../provider/AddDriverFormContextProvider';
import usePincodeHook from '../../../../../../hooks/usePincodeHook';
import {getCities2, getLocalities, getStates2} from '../../../../../../utils/formatter';
import Spinner from '../../../../../../common/Spinner';

interface Props {}

const DriverPermanentAddressView: React.FC<Props> = ({}) => {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [localities, setLocalities] = useState<string[]>([]);
  const {
    state,
    setPermanentAddPincode,
    setPermanentAddState,
    setPermanentAddCity,
    setPermanentAddLocality,
    setPermanentAddress,
  } = useAddDriverFormContextHook();

  const stateDropdownCompRef = useRef(null);
  const cityDropdownCompRef = useRef(null);
  const localityDropdownCompRef = useRef(null);

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const _handlePincodeChange = (text: string) => {
    setPermanentAddPincode(text);
    setPincode(text);
  };

  useEffect(() => {
    if (result && result.Status != 'Error') {
      setStates(getStates2(result));
      setCities(getCities2(result));
      setLocalities(getLocalities(result));
    }
  }, [result]);

  useEffect(() => {
    if (
      states.length > 0 &&
      cities.length > 0 &&
      stateDropdownCompRef &&
      cityDropdownCompRef && localityDropdownCompRef
    ) {
      //@ts-ignore
      stateDropdownCompRef?.current?.setValue(states[0]);
      setPermanentAddState(states[0]);
      //@ts-ignore
      cityDropdownCompRef?.current?.setValue(cities[0]);
      setPermanentAddCity(cities[0]);
      //@ts-ignore
      localityDropdownCompRef?.current?.setValue(localities[0]);
      setPermanentAddLocality(localities[0]);
    }
  }, [states, cities, localities]);

  return (
    <View>
      <View style={styles.elementContainer}>
        <Label text="Permanent Address" style={styles.labelText} />
      </View>
      <Spacer height={4} />
      <View style={styles.twoColumnWrapper}>
        <View style={styles.textContainer}>
          <Label text="Pincode" style={styles.label} />
          <Input
            onChangeText={_handlePincodeChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <View style={styles.textContainer}>
          <Label text="State" style={styles.label} />
          <EpackDropdown
            data={states}
            placeholder={'please select or enter'}
            hanldeData={setPermanentAddState}
            //@ts-ignore
            ref={stateDropdownCompRef}
          />
        </View>
      </View>
      <Spacer height={4} />
      <View style={styles.twoColumnWrapper}>
        <View style={styles.textContainer}>
          <Label text="City" style={styles.label} />
          <EpackDropdown
            data={cities}
            placeholder={'please select or enter'}
            hanldeData={setPermanentAddCity}
            //@ts-ignore
            ref={cityDropdownCompRef}
          />
        </View>
        <View style={styles.textContainer}>
          <Label text="Locality" style={styles.label} />
          <EpackDropdown
            data={localities}
            placeholder={'please select or enter'}
            hanldeData={setPermanentAddLocality}
            //@ts-ignore
            ref={localityDropdownCompRef}
          />
        </View>
      </View>
      <View style={styles.elementContainer}>
        <Label text="Address" style={styles.label} />
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Type Address"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
            onChangeText={setPermanentAddress}
          />
        </View>
      </View>
      <Spinner show={fetching} />
    </View>
  );
};

export default DriverPermanentAddressView;
