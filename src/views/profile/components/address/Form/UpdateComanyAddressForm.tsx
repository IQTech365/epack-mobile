import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Button from '../../../../../common/Button';
import Input, { InputMethods } from '../../../../../common/Input';
import Label from '../../../../../common/Label';
import Spacer from '../../../../../common/Spacer';
import Spinner from '../../../../../common/Spinner';
import usePincodeHook from '../../../../../hooks/usePincodeHook';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { COLOR_BLACK } from '../../../../../utils/colors';
import { getCities2, getStates2 } from '../../../../../utils/formatter';
import styles from './style';
import { ICompanyInfoData } from '../../../../../interface/companyRegistration/IGetCompaniesResponse';
import { ICompanyEditRequest } from '../../../../../interface/companyRegistration/ICompanyEditRequest';
import { editCompanyRequest, reseteditCompanyRequest } from '../../../../../redux/slices/CompanySlice';
import { getCurrentCompanyId } from '../../../../../utils/storage';
import { ToastType, showToast } from '../../../../../utils/utility';
import DropdownWithTextInput, { DropdownMethods } from '../../../../../common/DropdownWithTextInput';

export enum ADDRESS_TYPE {
  PICKUP,
  DROP,
}

interface IUpdateComanyAddressFormProps {
  onComplete: () => void;
}

const UpdateComanyAddressForm: React.FC<IUpdateComanyAddressFormProps> = ({
  onComplete
}) => {
  
  const dispatch = useAppDispatch();
  const [company, setCompany] = useState<ICompanyInfoData>();
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [isInit, setIsInit] = useState<boolean>(true);
  const [pin, setPin] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [landmark, setLandmark] = useState<string>('');
  const [locality, setLocality] = useState<string>('');
  const { companies,
    editCompanyRequesting,
    editCompanySuccess,
    editCompanyFailure
  } = useAppSelector(state => state.Company);

  const cityDropdownRef = useRef<DropdownMethods>(null);
  const stateDropwdownRef = useRef<DropdownMethods>(null);
  const pinInputRef = useRef<InputMethods>(null);

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );
  const { data: companiesData } = companies || {};

  const getCompany = () => {
    getCurrentCompanyId().then(id => {
      if (companiesData && Array.isArray(companiesData) && companiesData.length > 0) {
        const company = companiesData.find((d:ICompanyInfoData) => d._id == id as string);
        setCompany(company);
      }
    }).catch(err => console.log(err));
  }

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

  const handleCity = (item: string) => {
    setCity(item);
  };
  const handleState = (item: string) => {
    setState(item);
  };

  const initFormValues = () => {
    if(company) {
      handlePincodeChange(company?.pincode)
      stateDropwdownRef?.current?.setValue(company?.state as string);
      cityDropdownRef?.current?.setValue(company?.city as string);
    }
  }

  useEffect(() => {
    getCompany();
    initFormValues();
  }, []);

  useEffect(() => {
    if (result && result.Status != 'Error') {
      setStates(getStates2(result));
      setCities(getCities2(result));
    }
  }, [result]);

  useEffect(() => {
    if (states && cities) {
      if (isInit) {
        stateDropwdownRef?.current?.setValue(company?.state as string);
        cityDropdownRef?.current?.setValue(company?.city as string);
        setIsInit(false);
      } else {
        stateDropwdownRef?.current?.setValue(states[0]);
        cityDropdownRef?.current?.setValue(cities[0]);
      }
    }
  }, [states, cities]);

  const handleUpdate = () => {
    const payload: ICompanyEditRequest = {
      companyId: company?._id as string,
      payload: {
      companyName: company?.companyName as string,
      contactPerson: company?.contactPerson as string,
      email: company?.email as string,
      companyMobile: company?.companyMobile as string,
      companyAddress: address,
      state: state ? state : company?.state ,
      city:city ? city : company?.city,
      pincode: pin,
      companyWebsite: company?.companyWebsite as string,
      companyLogo: company?.companyLogo,
      punchLine: company?.punchLine as string,
      companyProfile: "",
      district: "",
      postOffice: "",
      companySignature: company?.companySignature as string
      }
    };

    dispatch(editCompanyRequest(payload));
  };

  

  useEffect(() => {
    if (!editCompanyRequesting && editCompanySuccess) {
      showToast('Address Updated', ToastType.SUCCESS);
      dispatch(reseteditCompanyRequest());
      onComplete && onComplete();
    } else if (!editCompanyRequesting && editCompanyFailure) {
      showToast('Address Not Updated. Try Again!', ToastType.ERROR);
      dispatch(reseteditCompanyRequest());
      onComplete && onComplete();
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
              value={company?.pincode}
              ref={pinInputRef}
            />
          </View>
          <View style={styles.itemContainer}>
            <Label text="State" style={styles.label} />
            <DropdownWithTextInput
              options={states}
              onSelect={handleState}
              ref={stateDropwdownRef}
              containerStyle={styles.compContainer}
            />
          </View>
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer3}>
          <Label text="City" style={styles.label} />
          <DropdownWithTextInput
              options={cities}
              onSelect={handleCity}
              ref={cityDropdownRef}
              containerStyle={styles.compContainer2}
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
            value={company?.companyAddress}
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
            value={company?.companyAddress}
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
            value={company?.companyAddress}
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
