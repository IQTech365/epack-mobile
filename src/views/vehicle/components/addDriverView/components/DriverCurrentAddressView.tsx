import React, {useEffect, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import styles from '../style';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import Input from '../../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../../utils/colors';
import EpackDropdown from '../../../../../common/DropdownComponent2';
import {useAddDriverFormContextHook} from '../../../../../provider/AddDriverFormContextProvider';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import usePincodeHook from '../../../../../hooks/usePincodeHook';
import {getCities2, getStates2} from '../../../../../utils/formatter';
import Spinner from '../../../../../common/Spinner';

interface Props {}

const DriverCurrentAddressView: React.FC<Props> = ({}) => {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

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

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const _handlePincodeChange = (text: string) => {
    setCurrentAddPincode(text);
  };

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
      setCurrentAddState(states[0]);
      //@ts-ignore
      cityDropdownCompRef?.current?.setValue(cities[0]);
      setCurrentAddCity(cities[0]);
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
          iconStyle={{
            borderColor: 'red',
            borderRadius: 0,
            width: 16,
            height: 16,
          }}
          innerIconStyle={{
            borderWidth: 1,
            borderRadius: 0,
            width: 16,
            height: 16,
          }}
          textStyle={{
            fontFamily: 'JosefinSans-Regular',
            textDecorationLine: 'none',
          }}
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
              />
            </View>
            <View style={styles.textContainer}>
              <Label text="State" style={styles.label} />
              <EpackDropdown
                data={[]}
                placeholder={'please select or enter'}
                hanldeData={setCurrentAddState}
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
                data={[]}
                placeholder={'please select or enter'}
                hanldeData={setCurrentAddCity}
                //@ts-ignore
                ref={cityDropdownCompRef}
              />
            </View>
            <View style={styles.textContainer}>
              <Label text="Locality" style={styles.label} />
              <EpackDropdown
                data={[]}
                placeholder={'please select or enter'}
                hanldeData={setCurrentAddLocality}
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
