import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../../../common/AvoidSoftInputViewHOC';
import Input from '../../../../../../../common/Input';
import Label from '../../../../../../../common/Label';
import {COLOR_BLACK} from '../../../../../../../utils/colors';
import styles from './style';
import DropdownComponent from '../../../../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../../../../type/TDropdownItem';
import Spacer from '../../../../../../../common/Spacer';
import Button from '../../../../../../../common/Button';
import {MODULE_NAME} from '../../enum/EModuleName';
import {IGetOrdersData} from '../../../../../../../interface/order/IGetOrdersResponse';
import {IGetEnquiriesData} from '../../../../../../../interface/enquiry/IGetEnquiriesResponse';
import usePincodeHook from '../../../../../../../hooks/usePincodeHook';
import {getCities, getStates} from '../../../../../../../utils/formatter';
import liftStatusOptions from '../../../../../../../data/liftStatusOptions.json';
import floorOptions from '../../../../../../../data/floorOptions.json';
import Spinner from '../../../../../../../common/Spinner';
import {
  IDropAddress,
  IPickupAddress,
} from '../../../../../../../interface/order/IUpdateAddressRequest';
import {useAppDispatch, useAppSelector} from '../../../../../../../redux/hooks';
import { getEnquiryRequest, resetUpdateAddressRequest, updateAddressRequest } from '../../../../../../../redux/slices/EnquirySlice';
import Toast from 'react-native-toast-message';
import { ISingleEnquiryData } from '../../../../../../../interface/enquiry/ISingleEnquiryResponse';

export enum ADDRESS_TYPE {
  PICKUP,
  DROP,
}

interface IAddressFormProps {
  addressType: ADDRESS_TYPE;
  moduleName: MODULE_NAME;
  item: IGetOrdersData | ISingleEnquiryData;
  enquiryId: string;
}

const AddressForm: React.FC<IAddressFormProps> = ({
  addressType,
  moduleName,
  item,
  enquiryId
}) => {
  console.log('AddressForm-enquiryId-', enquiryId);
  
  const dispatch = useAppDispatch();
  const {updateAddressRequesting, updateAddressSuccess, updateAddressFailure} = useAppSelector(state => state.Enquiry);
  const [states, setStates] = useState<TDropdownItem[]>([]);
  const [cities, setCities] = useState<TDropdownItem[]>([]);
  const [isInit, setIsInit] = useState<boolean>(true);
  const [pin, setPin] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  const [locality, setLocality] = useState<string>('');
  const [liftStatus, setLiftStatus] = useState<string>('');
  const [floorNumber, setFloorNumber] = useState<string>('');

  const cityDropdownRef = useRef(null);
  const stateDropwdownRef = useRef(null);
  const floorDropdownRef = useRef(null);
  const liftDropdownRef = useRef(null);

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const handleAddressTextChange = useCallback(
    (text: string) => {
      setAddress(text);
    },
    [address],
  );

  const handleLandmarkTextChange = useCallback(
    (text: string) => {
      setLandmark(text);
    },
    [landmark],
  );

  const handleLocalityTextChange = useCallback(
    (text: string) => {
      setLocality(text);
    },
    [locality],
  );

  const handlePincodeChange = (text: string) => {
    setPincode(text);
    setPin(text);
  };

  const handleCity = (item: TDropdownItem) => {
    setCity(item.label);
  };
  const handleState = (item: TDropdownItem) => {
    setState(item.label);
  };

  const handleCurrentFloor = (item: TDropdownItem) => {
    setFloorNumber(item.label);
  };
  const handleLiftStatus = (item: TDropdownItem) => {
    setLiftStatus(item.label.toUpperCase());
  };

  const initFormValues = () => {
    if(addressType == ADDRESS_TYPE.PICKUP){
      setPin(item.pickupAddress.pincode);
      setCity(item.pickupAddress.city);
      setState(item.pickupAddress.state);
      setAddress(item.pickupAddress.locality as string);
      setLandmark(item.pickupAddress.landmark as string);
      //@ts-ignore
      setLocality(item.pickupAddress?.locality as string);
      setLiftStatus(item.pickupAddress.isLiftAvailable);
      setFloorNumber(item.pickupAddress.floor);
      setPincode(item.pickupAddress.pincode);
    } else if(addressType == ADDRESS_TYPE.DROP) {
      setPin(item.dropAddress.pincode);
      setCity(item.dropAddress.city);
      setState(item.dropAddress.state);
      setAddress(item.dropAddress.locality as string);
      setLandmark(item.dropAddress.landmark as string);
      //@ts-ignore
      setLocality(item.dropAddress?.locality as string);
      setLiftStatus(item.dropAddress.isLiftAvailable);
      setFloorNumber(item.dropAddress.floor);
      setPincode(item.dropAddress.pincode);
    }
  }

  useEffect(() => {
    initFormValues();
  }, []);

  useEffect(() => {
    if (result && result.Status != 'Error') {
      setStates(getStates(result));
      setCities(getCities(result));
    }
  }, [result]);

  useEffect(() => {
    if (states && cities && cityDropdownRef && stateDropwdownRef) {
      if (isInit) {
        setIsInit(false);
        let previousStateIndex = 0, previousCityIndex = 0, previousFloorIndex = 0, previousLiftStatusIndex = 0;
        if(addressType == ADDRESS_TYPE.PICKUP) {
          previousStateIndex = states.findIndex(s => s.label == item.pickupAddress.state);
          previousCityIndex = states.findIndex(s => s.label == item.pickupAddress.city);
          previousFloorIndex = floorOptions.findIndex(s => s.label == item.pickupAddress.floor);
          previousLiftStatusIndex = liftStatusOptions.findIndex(s => s.label.toLowerCase() == item.pickupAddress.isLiftAvailable.toLowerCase());
          //@ts-ignore
          stateDropwdownRef?.current?.setDefaultValue(states[previousStateIndex]);
          //@ts-ignore
          cityDropdownRef?.current?.setDefaultValue(cities[previousCityIndex]);
          //@ts-ignore
          floorDropdownRef?.current?.setDefaultValue(floorOptions[previousFloorIndex]);
          //@ts-ignore
          liftDropdownRef?.current?.setDefaultValue(liftStatusOptions[previousLiftStatusIndex]);
        } else if(addressType == ADDRESS_TYPE.DROP) {
          previousStateIndex = states.findIndex(s => s.label == item.dropAddress.state);
          previousCityIndex = states.findIndex(s => s.label == item.dropAddress.city);
          previousFloorIndex = floorOptions.findIndex(s => s.label == item.dropAddress.floor);
          previousLiftStatusIndex = liftStatusOptions.findIndex(s => s.label.toLowerCase() == item.dropAddress.isLiftAvailable.toLowerCase());
          //@ts-ignore
        stateDropwdownRef?.current?.setDefaultValue(states[previousStateIndex]);
        //@ts-ignore
        cityDropdownRef?.current?.setDefaultValue(cities[previousCityIndex]);
        //@ts-ignore
        floorDropdownRef?.current?.setDefaultValue(floorOptions[previousFloorIndex]);
        //@ts-ignore
        liftDropdownRef?.current?.setDefaultValue(liftStatusOptions[previousLiftStatusIndex]);
        }
      } else {
        //@ts-ignore
        stateDropwdownRef?.current?.setDefaultValue(states[0]);
        //@ts-ignore
        cityDropdownRef?.current?.setDefaultValue(cities[0]);
      }
    }
  }, [states, cities]);

  const handleUpdate = () => {
    if (addressType == ADDRESS_TYPE.PICKUP) {
      const payload: IPickupAddress = {
        pickupAddress: {
          shiftingFrom: city,
          city: city,
          isLiftAvailable: liftStatus,
          locality: locality || 'Not Available',
          landmark: landmark || 'Not Available',
          pincode: pin,
          state: state,
          address: address,
          floor: floorNumber,
        },
      };
      dispatch(updateAddressRequest({id: enquiryId, requestBody: payload}));
    } else if (addressType == ADDRESS_TYPE.DROP) {
      const payload: IDropAddress = {
        dropAddress: {
          shiftingTo: city,
          city: city,
          isLiftAvailable: liftStatus,
          locality: locality || 'Not Available',
          landmark: landmark || 'Not Available',
          pincode: pin,
          state: state,
          address: address,
          floor: floorNumber,
        },
      };
      dispatch(updateAddressRequest({id: enquiryId, requestBody: payload}));
    }
  };

  useEffect(() => {
    if (!updateAddressRequesting && updateAddressSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Address Update',
        text2: 'Address has been updated successfully',
      });
      dispatch(resetUpdateAddressRequest());
      dispatch(getEnquiryRequest(enquiryId));
    } else if (!updateAddressRequesting && updateAddressFailure) {
      Toast.show({
        type: 'error',
        text1: 'Address Update',
        text2: 'Error in updating address. Please try again!',
      });
      dispatch(resetUpdateAddressRequest());
    }
  }, [updateAddressRequesting, updateAddressSuccess, updateAddressFailure]);

  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Pincode" style={styles.label} />
            <Input
              onChangeText={handlePincodeChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
              value={pin}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="State" style={styles.label} />
            <DropdownComponent
              data={states}
              onSelect={handleState}
              //@ts-ignore
              ref={stateDropwdownRef}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="City" style={styles.label} />
          <DropdownComponent
            data={cities}
            onSelect={handleCity}
            //@ts-ignore
            ref={cityDropdownRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="Address" style={styles.label} />
          <Input
            onChangeText={handleAddressTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={address}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="Landmark" style={styles.label} />
          <Input
            onChangeText={handleLandmarkTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={landmark}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="Locality" style={styles.label} />
          <Input
            onChangeText={handleLocalityTextChange}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            selectionColor={COLOR_BLACK}
            value={locality}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <View style={styles.itemContainer}>
            <Label text="Current Floor" style={styles.label} />
            <DropdownComponent
              data={floorOptions}
              onSelect={handleCurrentFloor}
              defaultValue={floorOptions[3]}
              //@ts-ignore
              ref={floorDropdownRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="Lift Status" style={styles.label} />
            <DropdownComponent
              data={liftStatusOptions}
              onSelect={handleLiftStatus}
              //@ts-ignore
              ref={liftDropdownRef}
            />
          </View>
        </View>
        <Spacer height={20} />
        <Button
          text="UPDATE"
          onPress={handleUpdate}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spinner show={fetching || updateAddressRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default AddressForm;
