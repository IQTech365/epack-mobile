import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Button from '../../../../../common/Button';
import Input from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import Spinner from '../../../../../common/Spinner';
import usePincodeHook from '../../../../../hooks/usePincodeHook';
import { IPickupAddress } from '../../../../../interface/order/IUpdateAddressRequest';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { resetUpdateAddressRequest, updateAddressRequest } from '../../../../../redux/slices/EnquirySlice';
import { TDropdownItem } from '../../../../../type/TDropdownItem';
import { COLOR_BLACK } from '../../../../../utils/colors';
import { getCities, getStates } from '../../../../../utils/formatter';
import styles from './style';
import DropdownComponent from '../../../../../common/DropdownComponent';
import { ICompanyInfoData } from '../../../../../interface/companyRegistration/IGetCompaniesResponse';
import { ICompanyEditRequest } from '../../../../../interface/companyRegistration/ICompanyEditRequest';
import { editCompanyRequest } from '../../../../../redux/slices/CompanySlice';

export enum ADDRESS_TYPE {
  PICKUP,
  DROP,
}

interface IUpdateComanyAddressFormProps {
  //enquiryId: string;
}

const UpdateComanyAddressForm: React.FC<IUpdateComanyAddressFormProps> = ({
  
}) => {
  
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
  const { companies,
    editCompanyRequesting,
    editCompanySuccess,
    editCompanyFailure
  } = useAppSelector(state => state.Company);

  const cityDropdownRef = useRef(null);
  const stateDropwdownRef = useRef(null);
  const floorDropdownRef = useRef(null);
  const liftDropdownRef = useRef(null);

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );
  const { data: companiesData } = companies || {};

  const getFirstCompany = () => {
    let company: ICompanyInfoData | null = null;
    if (companiesData && Array.isArray(companiesData) && companiesData.length > 0) {
      company = companiesData[0];
    }
    return company;
  }

  const firstCompany = getFirstCompany();

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
    // if(addressType == ADDRESS_TYPE.PICKUP){
    //   setPin(item.pickupAddress.pincode);
    //   setCity(item.pickupAddress.city);
    //   setState(item.pickupAddress.state);
    //   setAddress(item.pickupAddress.address as string);
    //   setLandmark(item.pickupAddress.landmark as string);
    //   //@ts-ignore
    //   setLocality(item.pickupAddress?.locality as string);
    //   setLiftStatus(item.pickupAddress.isLiftAvailable);
    //   setFloorNumber(item.pickupAddress.floor);
    //   setPincode(item.pickupAddress.pincode);
    // } else if(addressType == ADDRESS_TYPE.DROP) {
    //   setPin(item.dropAddress.pincode);
    //   setCity(item.dropAddress.city);
    //   setState(item.dropAddress.state);
    //   setAddress(item.dropAddress.address as string);
    //   setLandmark(item.dropAddress.landmark as string);
    //   //@ts-ignore
    //   setLocality(item.dropAddress?.locality as string);
    //   setLiftStatus(item.dropAddress.isLiftAvailable);
    //   setFloorNumber(item.dropAddress.floor);
    //   setPincode(item.dropAddress.pincode);
    // }
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
        // if(addressType == ADDRESS_TYPE.PICKUP) {
        //   previousStateIndex = states.findIndex(s => s.label == item.pickupAddress.state);
        //   previousCityIndex = states.findIndex(s => s.label == item.pickupAddress.city);
        //   previousFloorIndex = floorOptions.findIndex(s => s.label == item.pickupAddress.floor);
        //   previousLiftStatusIndex = liftStatusOptions.findIndex(s => s.label.toLowerCase() == item.pickupAddress.isLiftAvailable.toLowerCase());
        //   //@ts-ignore
        //   stateDropwdownRef?.current?.setDefaultValue(states[previousStateIndex]);
        //   //@ts-ignore
        //   cityDropdownRef?.current?.setDefaultValue(cities[previousCityIndex]);
        //   //@ts-ignore
        //   floorDropdownRef?.current?.setDefaultValue(floorOptions[previousFloorIndex]);
        //   //@ts-ignore
        //   liftDropdownRef?.current?.setDefaultValue(liftStatusOptions[previousLiftStatusIndex]);
        // } else if(addressType == ADDRESS_TYPE.DROP) {
        //   previousStateIndex = states.findIndex(s => s.label == item.dropAddress.state);
        //   previousCityIndex = states.findIndex(s => s.label == item.dropAddress.city);
        //   previousFloorIndex = floorOptions.findIndex(s => s.label == item.dropAddress.floor);
        //   previousLiftStatusIndex = liftStatusOptions.findIndex(s => s.label.toLowerCase() == item.dropAddress.isLiftAvailable.toLowerCase());
        //   //@ts-ignore
        // stateDropwdownRef?.current?.setDefaultValue(states[previousStateIndex]);
        // //@ts-ignore
        // cityDropdownRef?.current?.setDefaultValue(cities[previousCityIndex]);
        // //@ts-ignore
        // floorDropdownRef?.current?.setDefaultValue(floorOptions[previousFloorIndex]);
        // //@ts-ignore
        // liftDropdownRef?.current?.setDefaultValue(liftStatusOptions[previousLiftStatusIndex]);
        // }
      } else {
        //@ts-ignore
        stateDropwdownRef?.current?.setDefaultValue(states[0]);
        //@ts-ignore
        cityDropdownRef?.current?.setDefaultValue(cities[0]);
      }
    }
  }, [states, cities]);

  const handleUpdate = () => {
    // const payload: IPickupAddress = {
    //   pickupAddress: {
    //     shiftingFrom: city,
    //     city: city,
    //     isLiftAvailable: liftStatus,
    //     locality: locality || 'Not Available',
    //     landmark: landmark || 'Not Available',
    //     pincode: pin,
    //     state: state,
    //     address: address,
    //     floor: floorNumber,
    //   },
    // };

    const payload: ICompanyEditRequest = {
      _id: firstCompany?._id as string,
      authId: firstCompany?.authId as string,
      companyName: firstCompany?.companyName as string,
      contactPerson: firstCompany?.contactPerson as string,
      email: firstCompany?.email as string,
      companyMobile: firstCompany?.companyMobile as string,
      companyAddress: address,
      state: state,
      city:city,
      pincode: pin,
      ibaApprovalCode: firstCompany?.ibaApprovalCode as string,
      ibaValidDate: "2023-10-25",
      companyWebite: firstCompany?.companyWebite as string,
      CINNumber: firstCompany?.CINNumber as string,
      companyLogo: "",
      punchLine: firstCompany?.punchLine as string,
      companyProfile: "",
      district: "",
      postOffice: "",
      companySignature: firstCompany?.companySignature as string
    };
    dispatch(editCompanyRequest(payload));
    // dispatch(updateAddressRequest({id: enquiryId, requestBody: payload}));
  };

  useEffect(() => {
    if (!editCompanyRequesting &&editCompanySuccess) {
      Toast.show({
        type: 'success',
        text1: 'Address Update',
        text2: 'Address has been updated successfully',
      });
      // dispatch(resetUpdateAddressRequest());
    } else if (!editCompanyRequesting && editCompanyFailure) {
      Toast.show({
        type: 'error',
        text1: 'Address Update',
        text2: 'Error in updating address. Please try again!',
      });
      // dispatch(resetUpdateAddressRequest());
    }
  }, [editCompanyRequesting, editCompanySuccess, editCompanyFailure]);

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
              value={firstCompany?.pincode}
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
            value={firstCompany?.companyAddress}
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
            value={firstCompany?.companyAddress}
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
            value={firstCompany?.companyAddress}
          />
        </View>
        <Spacer height={20} />
        <Button
          text="UPDATE"
          onPress={handleUpdate}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spinner show={fetching || editCompanyRequesting} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default UpdateComanyAddressForm;
