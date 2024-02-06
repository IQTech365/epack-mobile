import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from '../style';
import CollapsibleView from '../../../../common/CollapsibleView';
import Label from '../../../../common/Label';
import Input from '../../../../common/Input';
import {COLOR_BLACK} from '../../../../utils/colors';
import Spacer from '../../../../common/Spacer';
import DropdownComponent from '../../../../common/DropdownComponent';
import liftStatusOptions from '../../../../data/liftStatusOptions.json';
import usePincodeHook from '../../../../hooks/usePincodeHook';
import {getCities2, getStates2} from '../../../../utils/formatter';
import {useOrderFormContextHook} from '../../../../provider/OrderFormContextProvider';
import {TDropdownItem} from '../../../../type/TDropdownItem';
import Spinner from '../../../../common/Spinner';
import useUtilityHook from '../../../../hooks/useUtilityHook';
import DropdownWithTextInput from '../../../../common/DropdownWithTextInput';

interface IProps {}

const OrderDropAddressView: FC<IProps> = ({}) => {
  const {
    state,
    setDropPincode,
    setDropAddress,
    setDropState,
    setDropCity,
    setDropCurrentFloor,
    setDropLiftStatus,
  } = useOrderFormContextHook();
  const stateDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const {getFloorsList} = useUtilityHook();
  const floorOptions = getFloorsList();

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const handlePincodeChange = useCallback(
    (text: string) => {
      setDropPincode(text);
      setPincode(text);
    },
    [state.d_pincode],
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
      setDropState(states[0]);
      //@ts-ignore
      cityDropdownRef?.current?.setValue(cities[0]);
      setDropCity(cities[0]);
    }
  }, [states, cities]);
  return (
    <CollapsibleView title="DELIVERY ADDRESS" collapsed={true}>
      <View>
        <View style={styles.twoColumnWrapper}>
          <View style={styles.textContainer}>
            <Label text="Pin code" style={styles.label} />
            <Input
              onChangeText={handlePincodeChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              inputType="numeric"
              selectionColor={COLOR_BLACK}
              placeholder='Enter Pincode'
            />
          </View>
          <View style={styles.textContainer}>
            <Label text="State" style={styles.label} />
            <DropdownWithTextInput
              options={states}
              onSelect={setDropState}
              //@ts-ignore
              ref={stateDropdownRef}
              containerStyle={styles.textContainer}
            />
          </View>
        </View>
        <View style={styles.elementContainer}>
          <Label text="City" style={styles.label} />
          <DropdownWithTextInput
            options={cities}
            onSelect={setDropCity}
            //@ts-ignore
            ref={cityDropdownRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={setDropAddress}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.twoColumnWrapper}>
          <View style={styles.textContainer}>
            <Label text="Current Floor" style={styles.label} />
            <DropdownComponent
              data={floorOptions}
              onSelect={(item: TDropdownItem) => {
                setDropCurrentFloor(item.label);
              }}
              defaultValue={floorOptions[1]}
            />
          </View>
          <View style={styles.textContainer}>
            <Label text="Lift Status" style={styles.label} />
            <DropdownComponent
              data={liftStatusOptions}
              onSelect={(item: TDropdownItem) => {
                setDropLiftStatus(item.label);
              }}
            />
          </View>
        </View>
        <Spinner show={fetching} />
      </View>
    </CollapsibleView>
  );
};

export default OrderDropAddressView;
