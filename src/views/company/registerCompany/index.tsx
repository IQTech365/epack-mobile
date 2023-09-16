import React, {useCallback, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import styles from './style';
import {TDropdownItem} from '../../../type/TDropdownItem';
import Label from '../../../common/Label';
import DropdownComponent from '../../../common/DropdownComponent';
import Input from '../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../utils/colors';
import companyTypeOptions from '../../../data/companyType.json';
import {formatDate, getCities, getStates} from '../../../utils/formatter';
import DatePickerComponent from '../../../common/DatePickerComponent';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import usePincodeHook from '../../../hooks/usePincodeHook';
import Spinner from '../../../common/Spinner';
import {useCompanyRegistrationContextHook} from '../../../provider/CompanyRegistrationContextProvider';
import {Validator} from '../../../utils/validation';
import Button from '../../../common/Button';

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
    setCompanyLogoError,
    setOwnerSignatureError,
    setShiftingLuggageError,
    setDocumentSerialNumberError,
    setDocumentTemplatesError,
  } = useCompanyRegistrationContextHook();
  const [ibaApproval, setIbaApproval] = useState<boolean>(false);
  const [companyType, setCompanyType] = useState<string>('1');
  const [documentTypeLabel, setDocumentTypeLabel] = useState<string>('PAN');
  const [states, setStates] = useState<TDropdownItem[]>([]);
  const [cities, setCities] = useState<TDropdownItem[]>([]);
  console.log('RegisterCompanyView-state--', JSON.stringify(state, null, ' '));

  const setPincodeError = () => {
    // dispatch({
    //   type: COMPANY_REGISTRATION_ACTION.PINCODE_ERROR,
    //   payload: 'Invalid PIN Code',
    // });
  };

  const resetPincodeError = () => {
    // dispatch({
    //   type: COMPANY_REGISTRATION_ACTION.PINCODE_ERROR,
    //   payload: '',
    // });
  };
  const {result, fetching, setPincode} = usePincodeHook(
    setPincodeError,
    resetPincodeError,
  );

  const handleCompanyNameInputTextChange = (text: string) => {
    setCompanyName(text);
  };

  const handleContactPersonInputTextChange = (text: string) => {
    setContactPerson(text);
  };

  const handleEmailInputTextChange = (text: string) => {
    setEmail(text);
  };

  const handleMobileInputTextChange = (text: string) => {
    setMobile(text);
  };

  const handleCitySelectChange = (item: TDropdownItem) => {
    setCity(item.label);
  };

  const handleStateSelectChange = (item: TDropdownItem) => {
    setState(item.label);
  };

  const handleAddressInputTextChange = (text: string) => {
    setAddress(text);
  };

  const handleIbaApprovalCodeInputTextChange = (text: string) => {
    setIbaApprovalCode(text);
  };

  const handleDocumentChange = (text: string) => {
    setDocument(text);
  };

  const handleCompanyTypeSelectChange = (item: TDropdownItem) => {
    setCompanyType(item.value);
    setCompanyType2(item.label);
  };

  const handleIbaCodeValidTillDate = (date: Date) => {
    setIbaApprovalTillDate(formatDate(date));
  };

  const handlePickupPinCode = useCallback((text: string) => {
    setPincode(text);
    setPincode2(text);
  }, []);

  const validateRegistrationForm = () => {
    if (Validator.isEmpty(state.companyName)) {
      setCompanyNameError('Company name required');
    } else {
      setCompanyNameError('');
    }

    if (Validator.isEmpty(state.contactPerson)) {
      setContactPersonError('Contact person name required');
    } else {
      setContactPersonError('');
    }

    if (Validator.isEmpty(state.mobile)) {
      setMobileError('Mobile name required');
    } else {
      setMobileError('');
    }

    if (Validator.isEmpty(state.email)) {
      setEmailError('Email name required');
    } else {
      setEmailError('');
    }

    if (Validator.isEmpty(state.pinCode)) {
      setPincodeError2('Pincode required');
    } else {
      setPincodeError2('');
    }

    if (Validator.isEmpty(state.state)) {
      setStateError('State required');
    } else {
      setStateError('');
    }

    if (Validator.isEmpty(state.city)) {
      setCityError('City required');
    } else {
      setCityError('');
    }

    if (Validator.isEmpty(state.address)) {
      setAddressError('Address required');
    } else {
      setAddressError('');
    }

    if (Validator.isEmpty(state.ibaApprovalCode)) {
      setIbaApprovalCodeError('IBA Approval code required');
    } else {
      setIbaApprovalCodeError('');
    }

    if (Validator.isEmpty(state.ibaApprovalValidTill)) {
      setIbaApprovalTillDateError('IBA Approval Date required');
    } else {
      setIbaApprovalTillDateError('');
    }

    if (Validator.isEmpty(state.companyType)) {
      setCompanyTypeError('Company Type required');
    } else {
      setCompanyTypeError('');
    }

    if (Validator.isEmpty(state.document)) {
      setDocumentError('Document required');
    } else {
      setDocumentError('');
    }
    const errorValues = Object.values(state.errors);
    console.log('errorValues----', JSON.stringify(errorValues));
    return errorValues.some(ev => !Validator.isEmpty(ev));
    
  };

  const handleNextClick = useCallback(() => {
    if (currentStep >= 1 && currentStep < 5) {
      const hasErrors = validateRegistrationForm();
      console.log('hasErrors------', hasErrors);
      if(!hasErrors) {
        setCurrentStep(currentStep + 1);
      }
    }
  }, []);

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
            text={currentStep == 5 ? 'Save' : 'Next'}
            onPress={handleNextClick}
            style={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default RegisterCompanyView;
