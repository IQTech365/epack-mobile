import React, { useCallback, useEffect, useRef, useState } from 'react';
import {View} from 'react-native';
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
import { getCities2, getStates2 } from '../../../../../utils/formatter';
import Spinner from '../../../../../common/Spinner';
import { IDropAddress, IEnquiry, IGetQuotationData } from '../../../../../interface/quotation/IGetQuotationsResponse';
import useUtilityHook from '../../../../../hooks/useUtilityHook';
import DropdownWithTextInput, { DropdownMethods } from '../../../../../common/DropdownWithTextInput';

interface Props {
  fromEnquiry?:boolean;
  isEdit?:boolean;
  item?:IGetQuotationData;
}

const DropAddressView: React.FC<Props> = ({fromEnquiry = false, isEdit, item}) => {
  const {
    state,
    setDropPincode,
    setDropState,
    setDropCity,
    setDropAddress,
    setDropCurrentFloor,
    setDropLiftStatus,
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
      setDropPincode(text);
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
      if(!isEdit) {
        stateDropdownCompRef?.current?.setValue(states[0]);
        setDropState(states[0]);
        cityDropdownCompRef?.current?.setValue(cities[0]);
        setDropCity(cities[0]);
      }
    }
  }, [states, cities]);

  useEffect(() => {
    if (fromEnquiry && state.enquiryItem) {
      const dropAddress = state.enquiryItem.dropAddress;
      if (dropAddress) {
        setDropPincode(dropAddress?.pincode);
        setPincode(dropAddress?.pincode);
        setDropState(dropAddress?.state);
        setDropAddress(dropAddress?.address);
        stateDropdownCompRef?.current?.setValue(dropAddress?.state);
        setDropCity(dropAddress?.city);
        cityDropdownCompRef?.current?.setValue(dropAddress?.city);
        const floorItem:TDropdownItem = floorOptions.find((d:TDropdownItem) => d.label == dropAddress?.floor) as TDropdownItem;
        if(floorItem) {
          floorDropdownCompRef?.current?.setDefaultValue(floorItem);
          setDropCurrentFloor(dropAddress?.floor);
        }
        setDropLiftStatus(dropAddress.isLiftAvailable);
        const liftItem:TDropdownItem = liftStatusOptions.find((d:TDropdownItem) => d.label == dropAddress?.isLiftAvailable) as TDropdownItem;
        if(liftItem) {
          liftDropdownCompRef?.current?.setDefaultValue(liftItem);
        }
      }
    }
  }, [state.enquiryItem]);

  useEffect(() => {
    if(isEdit && item) {
      const _enquires:IEnquiry[] = item.enquiries;
      if(_enquires && _enquires.length > 0) {
        const singleEnquiry:IEnquiry = _enquires[0];
          const dropAddress:IDropAddress = singleEnquiry.dropAddress as IDropAddress;
          if(dropAddress) {
            setDropPincode(dropAddress?.pincode);
            setPincode(dropAddress?.pincode);
            setDropState(dropAddress?.state);
            setDropAddress(dropAddress?.address);
            stateDropdownCompRef?.current?.setValue(dropAddress?.state);
            setDropCity(dropAddress?.city);
            cityDropdownCompRef?.current?.setValue(dropAddress?.city);
            const floorItem:TDropdownItem = floorOptions.find((d:TDropdownItem) => d.label == dropAddress?.floor) as TDropdownItem;
              if(floorItem) {
                floorDropdownCompRef?.current?.setDefaultValue(floorItem);
                setDropCurrentFloor(dropAddress?.floor);

            }
            setDropLiftStatus(dropAddress.isLiftAvailable);
            const liftItem:TDropdownItem = liftStatusOptions.find((d:TDropdownItem) => d.label == dropAddress?.isLiftAvailable) as TDropdownItem;
            if(liftItem) {
              liftDropdownCompRef?.current?.setDefaultValue(liftItem);
            }
          }
      }
        
    }
  }, [isEdit]);

  return (
    <CollapsibleView title="DROP ADDRESS" collapsed={true}>
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
              //@ts-ignore
              ref={pincodeInputCompRef}
              //@ts-ignore
              error={state.errors.drop_pincode}
              value={state?.drop_pincode}
              inputType="numeric"
              required={false}
            />
          </View>
          <View style={styles.compContainer}>
            <Label text="State" style={styles.label} />
            <DropdownWithTextInput
              options={states}
              onSelect={setDropState}
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
            onSelect={setDropCity}
            //@ts-ignore
            ref={cityDropdownCompRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.fullWidthContainer}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={setDropAddress}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            placeholder='Enter address'
            //@ts-ignore
            ref={addressInputCompRef}
            //@ts-ignore
            // error={showErrors && errors.pickupPincode}
            value={state?.drop_address}
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
                setDropCurrentFloor(item.label);
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
                setDropLiftStatus(item.label);
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

export default DropAddressView;
