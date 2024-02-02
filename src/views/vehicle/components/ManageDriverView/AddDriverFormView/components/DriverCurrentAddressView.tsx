import React, {useEffect, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import styles from '../style';
import Label from '../../../../../../common/Label';
import Spacer from '../../../../../../common/Spacer';
import Input from '../../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../../utils/colors';
import {useAddDriverFormContextHook} from '../../../../../../provider/AddDriverFormContextProvider';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import usePincodeHook from '../../../../../../hooks/usePincodeHook';
import {
  getCities2,
  getLocalities,
  getStates2,
} from '../../../../../../utils/formatter';
import Spinner from '../../../../../../common/Spinner';
import DropdownWithTextInput from '../../../../../../common/DropdownWithTextInput';

interface Props {}

const DriverCurrentAddressView: React.FC<Props> = ({}) => {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [localities, setLocalities] = useState<string[]>([]);

  const {
    state,
    setCurrentAddPincode,
    setCurrentAddState,
    setCurrentAddCity,
    setCurrentAddLocality,
    setCurrentAddress,
    setIsCurrentAddSameAsPermanent,
  } = useAddDriverFormContextHook();

  const stateDropdownCompRef = useRef(null);
  const cityDropdownCompRef = useRef(null);
  const localityDropdownCompRef = useRef(null);

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const _handlePincodeChange = (text: string) => {
    setCurrentAddPincode(text);
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
      cityDropdownCompRef &&
      localityDropdownCompRef
    ) {
      //@ts-ignore
      stateDropdownCompRef?.current?.setValue(states[0]);
      setCurrentAddState(states[0]);
      //@ts-ignore
      cityDropdownCompRef?.current?.setValue(cities[0]);
      setCurrentAddCity(cities[0]);
      //@ts-ignore
      localityDropdownCompRef?.current?.setValue(localities[0]);
      setCurrentAddLocality(localities[0]);
    }
  }, [states, cities]);

  return (
    <View>
      <View style={styles.elementContainer}>
        <Label text="Current Address" style={styles.labelText} />
      </View>
      <View style={styles.checkboxContainer}>
        <BouncyCheckbox
          text={'Same as permanent address'}
          fillColor={COLOR_BLUE}
          iconStyle={styles.iconStyle}
          innerIconStyle={styles.innerIconStyle}
          textStyle={styles.textStyle2}
          style={{marginRight: 15, marginBottom: 10}}
          textContainerStyle={{paddingLeft: 0}}
          onPress={(isChecked: boolean) => {
            setIsCurrentAddSameAsPermanent(
              !state.is_current_add_same_as_permanent,
            );
          }}
          isChecked={state.is_current_add_same_as_permanent}
          disableBuiltInState={true}
        />
      </View>
      {!state.is_current_add_same_as_permanent ? (
        <>
          <Spacer height={4} />
          <View style={styles.twoColumnWrapper}>
            <View style={styles.textContainer}>
              <Label text="Pincode" style={styles.label} />
              <Input
                onChangeText={_handlePincodeChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                placeholder="Enter Pincode"
              />
            </View>
            <View style={styles.textContainer}>
              <Label text="State" style={styles.label} />
              <DropdownWithTextInput
                options={states}
                onSelect={setCurrentAddState}
                //@ts-ignore
                ref={stateDropdownCompRef}
                containerStyle={styles.textContainer}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.twoColumnWrapper}>
            <View style={styles.textContainer}>
              <Label text="City" style={styles.label} />
              <DropdownWithTextInput
                options={cities}
                onSelect={setCurrentAddCity}
                //@ts-ignore
                ref={cityDropdownCompRef}
              />
            </View>
            <View style={styles.textContainer}>
              <Label text="Locality" style={styles.label} />
              <DropdownWithTextInput
                options={localities}
                onSelect={setCurrentAddLocality}
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
                onChangeText={setCurrentAddress}
              />
            </View>
          </View>
          <Spinner show={fetching} />
        </>
      ) : null}
    </View>
  );
};

export default DriverCurrentAddressView;
