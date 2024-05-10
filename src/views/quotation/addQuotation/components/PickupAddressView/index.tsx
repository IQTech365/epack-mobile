import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import CollapsibleView from '../../../../../common/CollapsibleView';
import Label from '../../../../../common/Label';
import Input, { InputMethods } from '../../../../../common/Input';
import {COLOR_BLACK} from '../../../../../utils/colors';
import {useQuotationFormContextHook} from '../../../../../provider/QuotationFormContextProvider';
import Spacer from '../../../../../common/Spacer';
import DropdownComponent, { IDropdownHandler } from '../../../../../common/DropdownComponent';
import liftStatusOptions from '../../../../../data/liftStatusOptions.json';
import {TDropdownItem} from '../../../../../type/TDropdownItem';
import usePincodeHook from '../../../../../hooks/usePincodeHook';
import {getCities2, getStates2} from '../../../../../utils/formatter';
import Spinner from '../../../../../common/Spinner';
import {
  IEnquiry,
  IGetQuotationData,
  IPickupAddress,
} from '../../../../../interface/quotation/IGetQuotationsResponse';
import useUtilityHook from '../../../../../hooks/useUtilityHook';
import DropdownWithTextInput, { DropdownMethods } from '../../../../../common/DropdownWithTextInput';

interface Props {
  fromEnquiry?: boolean;
  isEdit?: boolean;
  item?: IGetQuotationData;
}

const PickupAddressView: React.FC<Props> = ({
  fromEnquiry = false,
  isEdit,
  item,
}) => {
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

  const pincodeInputCompRef = useRef<InputMethods>(null);
  const addressInputCompRef = useRef<InputMethods>(null);
  const stateDropdownCompRef = useRef<DropdownMethods>(null);
  const cityDropdownCompRef = useRef<DropdownMethods>(null);
  const floorDropdownCompRef = useRef<IDropdownHandler>(null);
  const liftDropdownCompRef = useRef<IDropdownHandler>(null);

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
      if (!isEdit) {
        stateDropdownCompRef?.current?.setValue(states[0]);
        setPickupState(states[0]);
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
        stateDropdownCompRef?.current?.setValue(pickupAddress?.state);
        setPickupCity(pickupAddress?.city);
        cityDropdownCompRef?.current?.setValue(pickupAddress?.city);
        const floorItem: TDropdownItem = floorOptions.find((d: TDropdownItem) => d.label == pickupAddress?.floor) as TDropdownItem;        
        if (floorItem) {
          floorDropdownCompRef?.current?.setDefaultValue(floorItem);
          setPickupCurrentFloor(pickupAddress?.floor)
        }
        setPickupLiftStatus(pickupAddress.isLiftAvailable);
        const liftItem: TDropdownItem = liftStatusOptions.find((d: TDropdownItem) => d.label == pickupAddress.isLiftAvailable) as TDropdownItem;
        if (liftItem) {
          liftDropdownCompRef?.current?.setDefaultValue(liftItem);
        }
      }
    }
  }, [state.enquiryItem]);

  console.log(item,"robinkhan");
  

  useEffect(() => {
    if (isEdit && item) {
      const _enquires: IEnquiry[] = item.enquiries;
      if (_enquires && _enquires.length > 0) {
        const singleEnquiry: IEnquiry = _enquires[0];
        const pickupAddress: IPickupAddress =
          singleEnquiry.pickupAddress as IPickupAddress;
        if (pickupAddress) {
          setPickupPincode(pickupAddress?.pincode);
          setPincode(pickupAddress?.pincode);
          setPickupState(pickupAddress?.state);
          setPickupAddress(pickupAddress?.address);
          stateDropdownCompRef?.current?.setValue(pickupAddress?.state);
          setPickupCity(pickupAddress?.city);
          cityDropdownCompRef?.current?.setValue(pickupAddress?.city);
          const floorItem: TDropdownItem = floorOptions.find(
            (d: TDropdownItem) => d.label == pickupAddress?.floor,
          ) as TDropdownItem;
          if (floorItem) {
              floorDropdownCompRef?.current?.setDefaultValue(floorItem);
              setPickupCurrentFloor(pickupAddress?.floor);
          }
          setPickupLiftStatus(pickupAddress.isLiftAvailable);
          const liftItem: TDropdownItem = liftStatusOptions.find(
            (d: TDropdownItem) => d.label == pickupAddress.isLiftAvailable,
          ) as TDropdownItem;
          if (liftItem) {
              liftDropdownCompRef?.current?.setDefaultValue(liftItem);
          }
        }
      }
    }
  }, [isEdit]);

  return (
    <CollapsibleView title="PICKUP ADDRESS" collapsed={true}>
      <View>
        <View style={styles.twoColumnContainer}>
          <View style={styles.compContainer}>
            <Label text="Pincode" style={styles.label} required={false} />
            <Input
              onChangeText={handlePincodeChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              placeholder="Enter Pincode"
              ref={pincodeInputCompRef}
              //@ts-ignore
              error={state.errors.pickup_pincode}
              value={state?.pickup_pincode}
              inputType="numeric"
              required={false}
            />
          </View>
          <View style={styles.compContainer}>
            <Label text="State" style={styles.label} />
            <DropdownWithTextInput
              options={states}
              onSelect={setPickupState}
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
            placeholder="Enter address"
            ref={addressInputCompRef}
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
