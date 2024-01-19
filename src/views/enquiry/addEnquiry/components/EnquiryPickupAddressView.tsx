import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import styles from '../style';
import CollapsibleView from '../../../../common/CollapsibleView';
import Label from '../../../../common/Label';
import Input from '../../../../common/Input';
import EpackDropdown from '../../../../common/DropdownComponent2';
import Spacer from '../../../../common/Spacer';
import DropdownComponent from '../../../../common/DropdownComponent';
import liftStatusOptions from '../../../../data/liftStatusOptions.json';
import {TDropdownItem} from '../../../../type/TDropdownItem';
import {COLOR_BLACK} from '../../../../utils/colors';
import usePincodeHook from '../../../../hooks/usePincodeHook';
import {getCities2, getStates2} from '../../../../utils/formatter';
import {useEnquiryFormContextHook} from '../../../../provider/EnquiryFormContextProvider';
import Spinner from '../../../../common/Spinner';
import useUtilityHook from '../../../../hooks/useUtilityHook';

interface IProps {}

const EnquiryPickupAddressView: FC<IProps> = ({}) => {
  const {
    state,
    setPickupPincode,
    setPickupState,
    setPickupCity,
    setPickupAddress,
    setPickupCurrentFloor,
    setPickupLiftStatus,
  } = useEnquiryFormContextHook();
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const stateDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);
  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );
  const {getFloorsList} = useUtilityHook();
  const floorOptions = getFloorsList();

  const handlePincodeChange = useCallback(
    (text: string) => {
      setPickupPincode(text);
      setPincode(text);
    },
    [state.p_pincode],
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
      setPickupState(states[0]);
      //@ts-ignore
      cityDropdownRef?.current?.setValue(cities[0]);
      setPickupCity(cities[0]);
    }
  }, [states, cities]);

  return (
    <CollapsibleView title="PICKUP ADDRESS" collapsed={true}>
      <View>
        <View style={styles.twoColumnWrapper}>
          <View style={styles.textContainer}>
            <Label text="Pin code" style={styles.label} />
            <Input
              onChangeText={handlePincodeChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder='Enter Pincode'
              inputType="numeric"
            />
          </View>
          <View style={styles.textContainer}>
            <Label text="State" style={styles.label} />
            <EpackDropdown
              data={states}
              placeholder={'Select State'}
              hanldeData={setPickupState}
              //@ts-ignore
              ref={stateDropdownRef}
            />
          </View>
        </View>

        <View style={styles.elementContainer}>
          <Label text="City" style={styles.label} />
          <EpackDropdown
            data={cities}
            placeholder={'Select City'}
            hanldeData={setPickupCity}
            //@ts-ignore
            ref={cityDropdownRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={setPickupAddress}
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
                setPickupCurrentFloor(item.label);
              }}
              defaultValue={floorOptions[3]}
            />
          </View>
          <View style={styles.textContainer}>
            <Label text="Lift Status" style={styles.label} />
            <DropdownComponent
              data={liftStatusOptions}
              onSelect={(item: TDropdownItem) => {
                setPickupLiftStatus(item.label);
              }}
            />
          </View>
        </View>
        <Spinner show={fetching} />
      </View>
    </CollapsibleView>
  );
};

export default EnquiryPickupAddressView;
