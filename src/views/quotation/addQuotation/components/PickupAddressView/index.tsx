import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Label from '../../../../../common/Label';
import Input from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import Spacer from '../../../../../common/Spacer';
import DropdownComponent from '../../../../../common/DropdownComponent';
import liftStatusOptions from '../../../../../data/liftStatusOptions.json';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import usePincodeHook from '../../../../../hooks/usePincodeHook';
import {getCities2, getStates2} from '../../../../../utils/formatter';
import Spinner from '../../../../../common/Spinner';
import {
  IEnquiry,
  IPickupAddress,
} from '../../../../../interface/quotation/IGetQuotationsResponse';
import useUtilityHook from '../../../../../hooks/useUtilityHook';
import DropdownWithTextInput from '../../../../../common/DropdownWithTextInput';

interface Props {
  fromEnquiry?: boolean;
}

const PickupAddressView: React.FC<Props> = ({fromEnquiry = false}) => {
  const {
    state,
    setPickupPincode,
    setPickupState,
    setPickupCity,
    setPickupAddress,
    setPickupCurrentFloor,
    setPickupLiftStatus,
  } = useQuotationFormContextHook();

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const {getFloorsList} = useUtilityHook();
  const floorOptions = getFloorsList();

  const pincodeInputCompRef = useRef(null);
  const addressInputCompRef = useRef(null);
  const stateDropdownCompRef = useRef(null);
  const cityDropdownCompRef = useRef(null);
  const floorDropdownCompRef = useRef(null);
  const liftDropdownCompRef = useRef(null);

  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const handlePincodeChange = useCallback(
    (text: string) => {
      setPickupPincode(text);
      setPincode(text);
    },
    [state.pickup_pincode],
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
      if (!state.editQuotation && !state.item) {
        //@ts-ignore
        stateDropdownCompRef?.current?.setValue(states[0]);
        setPickupState(states[0]);
        //@ts-ignore
        cityDropdownCompRef?.current?.setValue(cities[0]);
        setPickupCity(cities[0]);
      }
    }
  }, [states, cities]);

  useEffect(() => {
    if (fromEnquiry && state.enquiryItem) {
      const pickupAddress = state.enquiryItem.pickupAddress;
      if (pickupAddress) {
        setPickupPincode(pickupAddress?.pincode);
        setPincode(pickupAddress?.pincode);
        setPickupState(pickupAddress?.state);
        setPickupAddress(pickupAddress?.address);
        //@ts-ignore
        stateDropdownCompRef?.current?.setValue(pickupAddress?.state);
        setPickupCity(pickupAddress?.city);
        //@ts-ignore
        cityDropdownCompRef?.current?.setValue(pickupAddress?.city);
      }
    }
  }, [state.enquiryItem]);

  useEffect(() => {
    if (state.editQuotation && state.item) {
      const {item} = state;
      if (item) {
        const enquiry: IEnquiry = item.enquiries;
        if (enquiry) {
          const pickupAddress: IPickupAddress =
            enquiry.pickupAddress as IPickupAddress;
          if (pickupAddress) {
            setPickupPincode(pickupAddress?.pincode);
            setPincode(pickupAddress?.pincode);
            setPickupState(pickupAddress?.state);
            //@ts-ignore
            stateDropdownCompRef?.current?.setValue(pickupAddress?.state);
            setPickupCity(pickupAddress?.city);
            //@ts-ignore
            cityDropdownCompRef?.current?.setValue(pickupAddress?.city);
            setPickupCurrentFloor(pickupAddress?.floor);
            const floorItem: TDropdownItem = floorOptions.find(
              (d: TDropdownItem) => d.label == pickupAddress?.floor,
            ) as TDropdownItem;
            if (floorItem) {
              //@ts-ignore
              floorDropdownCompRef && floorDropdownCompRef?.current?.setDefaultValue(floorItem);
            }
            setPickupLiftStatus(pickupAddress.isLiftAvailable);
            const liftItem: TDropdownItem = liftStatusOptions.find(
              (d: TDropdownItem) => d.label == pickupAddress.isLiftAvailable,
            ) as TDropdownItem;
            if (liftItem) {
              //@ts-ignore
              liftDropdownCompRef && liftDropdownCompRef?.current?.setDefaultValue(liftItem);
            }
          }
        }
      }
    }
  }, [state.editQuotation, state.item]);

  return (
    <CollapsibleView title="PICKUP ADDRESS" collapsed={true}>
      <View>
        <View style={styles.twoColumnContainer}>
          <View style={styles.compContainer}>
            <Label text="Pincode" style={styles.label} required={true} />
            <Input
              onChangeText={handlePincodeChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder="Enter Pincode"
              //@ts-ignore
              ref={pincodeInputCompRef}
              //@ts-ignore
              error={state.errors.pickup_pincode}
              value={state?.pickup_pincode}
              inputType="numeric"
              required={true}
            />
          </View>
          <View style={styles.compContainer}>
            <Label text="State" style={styles.label} />
            <DropdownWithTextInput
              options={states}
              onSelect={setPickupState}
              //@ts-ignore
              ref={stateDropdownCompRef}
              containerStyle={styles.compContainer}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="City" style={styles.label} />
          <DropdownWithTextInput
            options={cities}
            onSelect={setPickupCity}
            //@ts-ignore
            ref={cityDropdownCompRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={setPickupAddress}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            placeholder='Enter address'
            //@ts-ignore
            ref={addressInputCompRef}
            //@ts-ignore
            // error={showErrors && errors.pickupPincode}
            value={state?.pickup_address}
            type="text"
          />
        </View>
        <Spacer height={4} />
        <View style={styles.twoColumnContainer}>
          <View style={styles.compContainer}>
            <Label text="Current Floor" style={styles.label} />
            <DropdownComponent
              data={floorOptions}
              onSelect={(item: TDropdownItem) => {
                setPickupCurrentFloor(item.label);
              }}
              defaultValue={floorOptions[1]}
              //@ts-ignore
              ref={floorDropdownCompRef}
            />
          </View>
          <View style={styles.compContainer}>
            <Label text="Lift Status" style={styles.label} />
            <DropdownComponent
              data={liftStatusOptions}
              onSelect={(item: TDropdownItem) => {
                setPickupLiftStatus(item.label);
              }}
              //@ts-ignore
              ref={liftDropdownCompRef}
            />
          </View>
        </View>
        <Spinner show={fetching} />
      </View>
    </CollapsibleView>
  );
};

export default PickupAddressView;
