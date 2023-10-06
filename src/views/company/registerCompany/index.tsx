import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import styles from './style';
import {TDropdownItem} from '../../../type/TDropdownItem';
import Label from '../../../common/Label';
import DropdownComponent from '../../../common/DropdownComponent';
import Input from '../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../utils/colors';
import companyTypeOptions from '../../../data/companyType.json';
import {formatDate2, getCities, getStates} from '../../../utils/formatter';
import DatePickerComponent from '../../../common/DatePickerComponent';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import usePincodeHook from '../../../hooks/usePincodeHook';
import Spinner from '../../../common/Spinner';
import {useCompanyRegistrationContextHook} from '../../../provider/CompanyRegistrationContextProvider';
import {Validator} from '../../../utils/validation';
import Button from '../../../common/Button';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addCompanyRequest } from '../../../redux/slices/CompanySlice';
import { ICompanyRegistrationRequest } from '../../../interface/companyRegistration/ICompanyRegistrationRequest';
//Ram Naresh Bhardwaj
const ibaApprovalOptions: Array<ICheckboxButton> = [
  {
    id: '1',
    text: 'Not Approved',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, width: 16, height: 16},
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    isChecked: true,
    textContainerStyle: {marginLeft: 4, marginRight: 4},
    style: {paddingRight: 10},
  },
  {
    id: '2',
    text: 'Approved',
    fillColor: COLOR_BLUE,
    iconStyle: {borderColor: 'red', width: 16, height: 16},
    innerIconStyle: {borderWidth: 1, width: 16, height: 16},
    textStyle: {
      fontFamily: 'JosefinSans-Regular',
      textDecorationLine: 'none',
      fontSize: 14,
    },
    textContainerStyle: {marginLeft: 4, marginRight: 4},
    style: {paddingRight: 10},
  },
];

interface IRegisterCompanyViewProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const RegisterCompanyView: React.FC<IRegisterCompanyViewProps> = ({
  currentStep,
  setCurrentStep,
}) => {
  // const [state, dispatch] = useReducer(
  //   companyRegistrationReducer,
  //   initialState,
  // );
  const {
    state,
    setCompanyName,
    setContactPerson,
    setMobile,
    setEmail,
    setPincode: setPincode2,
    setCity,
    setState,
    setAddress,
    setIbaApprovalCode,
    setIbaApprovalTillDate,
    setCompanyType: setCompanyType2,
    setDocument,
    setCompanyNameError,
    setContactPersonError,
    setMobileError,
    setEmailError,
    setPincodeError: setPincodeError2,
    setStateError,
    setCityError,
    setIbaApprovalCodeError,
    setIbaApprovalTillDateError,
    setAddressError,
    setCompanyTypeError,
    setDocumentError,
  } = useCompanyRegistrationContextHook();
  const [ibaApproval, setIbaApproval] = useState<boolean>(false);
  const [companyType, setCompanyType] = useState<string>('1');
  const [documentTypeLabel, setDocumentTypeLabel] = useState<string>('PAN');
  const [states, setStates] = useState<TDropdownItem[]>([]);
  const [cities, setCities] = useState<TDropdownItem[]>([]);
  // console.log('RegisterCompanyView-state--', JSON.stringify(state, null, ' '));

  const dispatch = useAppDispatch();
  const {requesting, success, error, failure, addCompanyInfo} = useAppSelector(
    state => state.Company,
  );
  // console.log('RegisterCompanyView-companyInfo--', JSON.stringify(addCompanyInfo, null, ' '));

  const {otpData} = useAppSelector(state => state.OTP);

  const setPincodeError = () => {
    setPincodeError2('Invalid Pincode');
  };

  const resetPincodeError = () => {
    setPincodeError2('');
  };
  const {result, fetching, setPincode} = usePincodeHook(
    setPincodeError,
    resetPincodeError,
  );

  const handleCompanyNameInputTextChange = (text: string) => {
    if (state.errors.companyName) {
      setCompanyNameError('');
    }
    setCompanyName(text);
  };

  const handleContactPersonInputTextChange = (text: string) => {
    if (state.errors.contactPerson) {
      setContactPersonError('');
    }
    setContactPerson(text);
  };

  const handleEmailInputTextChange = (text: string) => {
    if (state.errors.email) {
      setEmailError('');
    }
    setEmail(text);
  };

  const handleMobileInputTextChange = (text: string) => {
    if (state.errors.mobile) {
      setMobileError('');
    }
    setMobile(text);
  };

  const handleCitySelectChange = (item: TDropdownItem) => {
    setCity(item.label);
  };

  const handleStateSelectChange = (item: TDropdownItem) => {
    setState(item.label);
  };

  const handleAddressInputTextChange = (text: string) => {
    if (state.errors.address) {
      setAddressError('');
    }
    setAddress(text);
  };

  const handleIbaApprovalCodeInputTextChange = (text: string) => {
    if (state.errors.ibaApprovalCode) {
      setIbaApprovalCodeError('');
    }
    setIbaApprovalCode(text);
  };

  const handleDocumentChange = (text: string) => {
    if (state.errors.document) {
      setDocumentError('');
    }
    setDocument(text);
  };

  const handleCompanyTypeSelectChange = (item: TDropdownItem) => {
    setCompanyType(item.value);
    setCompanyType2(item.label);
  };

  const handleIbaCodeValidTillDate = (date: Date) => {
    setIbaApprovalTillDate(formatDate2(date));
  };

  const handlePickupPinCode = useCallback((text: string) => {
    setPincode(text);
    setPincode2(text);
  }, []);

  const validateRegistrationForm = () => {
    let companyNameFilled = false;
    let contactPersonNameFilled = false;
    let mobileFilled = false;
    let emailFilled = false;
    let pincodeFilled = false;
    let stateFilled = false;
    let cityFilled = false;
    let addressFilled = false;
    let ibaApprovalCodeFilled = false;
    let ibaApprovalValidTillFilled = false;
    let companyTypeFilled = false;
    let documentFilled = false;

    if (Validator.isEmpty(state.companyName)) {
      setCompanyNameError('Company name required');
    } else {
      companyNameFilled = true;
      setCompanyNameError('');
    }

    if (Validator.isEmpty(state.contactPerson)) {
      setContactPersonError('Contact person name required');
    } else {
      contactPersonNameFilled = true;
      setContactPersonError('');
    }

    if (Validator.isEmpty(state.mobile)) {
      setMobileError('Mobile required');
    } else {
      mobileFilled = true;
      setMobileError('');
    }

    if (Validator.isEmpty(state.email)) {
      setEmailError('Email required');
    } else {
      emailFilled = true;
      setEmailError('');
    }

    if (Validator.isEmpty(state.pinCode)) {
      setPincodeError2('Pincode required');
    } else {
      pincodeFilled = true;
      setPincodeError2('');
    }

    if (Validator.isEmpty(state.state)) {
      setStateError('State required');
    } else {
      stateFilled = true;
      setStateError('');
    }

    if (Validator.isEmpty(state.city)) {
      setCityError('City required');
    } else {
      cityFilled = true;
      setCityError('');
    }

    if (Validator.isEmpty(state.address)) {
      setAddressError('Address required');
    } else {
      addressFilled = true;
      setAddressError('');
    }

    if(ibaApproval) {
      if (Validator.isEmpty(state.ibaApprovalCode)) {
        setIbaApprovalCodeError('IBA Approval code required');
      } else {
        ibaApprovalCodeFilled = true;
        setIbaApprovalCodeError('');
      }
  
      if (Validator.isEmpty(state.ibaApprovalValidTill)) {
        setIbaApprovalTillDateError('IBA Approval Date required');
      } else {
        ibaApprovalValidTillFilled = true;
        setIbaApprovalTillDateError('');
      }
    }

    if (Validator.isEmpty(state.companyType)) {
      setCompanyTypeError('Company Type required');
    } else {
      companyTypeFilled = true;
      setCompanyTypeError('');
    }

    if (Validator.isEmpty(state.document)) {
      setDocumentError('Document required');
    } else {
      documentFilled = true;
      setDocumentError('');
    }
    const isRequiredFieldsFilled =
      companyNameFilled &&
      contactPersonNameFilled &&
      mobileFilled &&
      emailFilled &&
      pincodeFilled &&
      stateFilled &&
      cityFilled &&
      addressFilled &&
      ibaApprovalCodeFilled &&
      ibaApprovalValidTillFilled &&
      companyTypeFilled &&
      documentFilled;
    console.log('isRequiredFieldsFilled----', isRequiredFieldsFilled);
    return isRequiredFieldsFilled;
  };

  const handleNextClick = useCallback(() => {
    if (currentStep >= 1 && currentStep < 5) {
      const isValidForm = validateRegistrationForm();
      // setCurrentStep(currentStep + 1);
      if (isValidForm) {
        const data: ICompanyRegistrationRequest = {
          authId: otpData?.data.id as string,
          companyName: state.companyName,
          contactPerson: state.contactPerson,
          email: state.email,
          companyMobile: state.mobile,
          companyAddress: state.address,
          state: state.state,
          city: state.city,
          // state: 'Haryana',
          // city: 'Grugaon',
          pincode: state.pinCode,
          ibaApprovalCode: state.ibaApprovalCode,
          ibaValidDate: state.ibaApprovalValidTill,
          companyWebite: 'www.abc.com',
          CINNumber: state.document,
          companyLogo: '',
          punchLine: 'na',
          companyProfile: '',
          district: '',
          postOffice: '',
          govRegdDetails: {},
          accountDetails: [],
          packerSignature: '',
          termsconditions: 'NA',
        };
        console.log('data----------', JSON.stringify(data), null, ' ');
        dispatch(addCompanyRequest(data));
      }
    }
  }, [state]);

  useEffect(() => {
    if (!requesting && success && !error) {
      setCurrentStep(currentStep + 1);
    } else if (!requesting && !success && error) {
      Alert.alert('Error in registering the company');
    }
  }, [requesting, success, error]);

  useEffect(() => {
    if (companyType == '1' || companyType == '2') {
      setDocumentTypeLabel('PAN');
    } else if (companyType == '3' || companyType == '4') {
      setDocumentTypeLabel('CIN/Incorporation No.');
    }
  }, [companyType]);

  /** Effects */
  useEffect(() => {
    if (result && result.Status != 'Error') {
      setStates(getStates(result));
      setCities(getCities(result));
    }
  }, [result]);

  return (
    <View style={styles.container}>
      <AvoidSoftInputViewHOC>
        <View style={styles.contentContainer}>
          <View>
            <Spacer height={4} />
            <View>
              <Text style={styles.titleText}>Company Basic Information</Text>
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Company Name" style={styles.label} />
              <Input
                onChangeText={handleCompanyNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.companyName}
                error={state.errors.companyName}
                placeholder="Enter your company name"
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Contact Person" style={styles.label} />
              <Input
                onChangeText={handleContactPersonInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.contactPerson}
                error={state.errors.contactPerson}
                placeholder="Enter contact person name"
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Mobile" style={styles.label} />
              <Input
                onChangeText={handleMobileInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.mobile}
                error={state.errors.mobile}
                placeholder="Enter mobile number"
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Email" style={styles.label} />
              <Input
                onChangeText={handleEmailInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.email}
                error={state.errors.email}
                placeholder="Enter email"
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Pin code" style={styles.label} />
              <Input
                onChangeText={handlePickupPinCode}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.pinCode}
                error={state.errors.pinCode}
                placeholder="Enter pincode"
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="State" style={styles.label} />
              <DropdownComponent
                data={states}
                onSelect={handleStateSelectChange}
                error={state.errors.state}
              />
            </View>
            <View style={styles.elementContainer}>
              <Label text="City" style={styles.label} />
              <DropdownComponent
                data={cities}
                onSelect={handleCitySelectChange}
                error={state.errors.city}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Address" style={styles.label} />
              <Input
                onChangeText={handleAddressInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.address}
                error={state.errors.address}
                placeholder="Enter your address"
              />
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="IBA Approval" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              <BouncyCheckboxGroup
                data={ibaApprovalOptions}
                onChange={(selectedItem: ICheckboxButton) => {
                  const key = selectedItem.id as string;
                  if (key == '1') {
                    setIbaApproval(false);
                  } else if (key == '2') {
                    setIbaApproval(true);
                  }
                }}
              />
            </View>
            {ibaApproval && (
              <>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                  <Label text="IBA Approval Code" style={styles.label} />
                  <Input
                    onChangeText={handleIbaApprovalCodeInputTextChange}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    selectionColor={COLOR_BLACK}
                    value={state.ibaApprovalCode}
                    error={state.errors.ibaApprovalCode}
                    placeholder="Ener IBA approval code"
                  />
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                  <Label text="IBA Code Valid Till" style={styles.label} />
                  <DatePickerComponent
                    onDateSelect={handleIbaCodeValidTillDate}
                    style={{width: '100%'}}
                    error={state.errors.ibaApprovalValidTill}
                  />
                </View>
              </>
            )}
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Company Type" style={styles.label} />
              <DropdownComponent
                data={companyTypeOptions}
                onSelect={handleCompanyTypeSelectChange}
                error={state.errors.companyType}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text={documentTypeLabel} style={styles.label} />
              <Input
                onChangeText={handleDocumentChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.document}
                error={state.errors.document}
                placeholder="Enter document number"
              />
            </View>
          </View>
          <Spacer height={12} />
          <Spinner show={fetching} />
        </View>
      </AvoidSoftInputViewHOC>
      <View style={styles.buttonContainer}>
        <View style={styles.prevButtonContainer}>
          {currentStep > 1 ? (
            <Button
              text="Previous"
              onPress={() => {}}
              style={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}
            />
          ) : null}
        </View>
        <View style={styles.nextButtonContainer}>
          <Button
            text='Submit'
            onPress={handleNextClick}
            style={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
          />
        </View>
      </View>
      <Spinner show={requesting} />
    </View>
  );
};

export default RegisterCompanyView;
