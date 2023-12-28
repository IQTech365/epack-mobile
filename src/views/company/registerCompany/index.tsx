import React, {useCallback, useEffect, useState, useRef} from 'react';
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
import usePincodeHook from '../../../hooks/usePincodeHook';
import Spinner from '../../../common/Spinner';
import {useCompanyRegistrationContextHook} from '../../../provider/CompanyRegistrationContextProvider';
import {Validator} from '../../../utils/validation';
import Button from '../../../common/Button';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {addCompanyRequest} from '../../../redux/slices/CompanySlice';
import {ICompanyRegistrationRequest} from '../../../interface/companyRegistration/ICompanyRegistrationRequest';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import EpackDropdown from '../../../common/DropdownComponent2';
import { use } from 'i18next';
const ibaApprovalOptions: string[] = ['Not Approved', 'Approved'];

interface IRegisterCompanyViewProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const RegisterCompanyView: React.FC<IRegisterCompanyViewProps> = ({
  currentStep,
  setCurrentStep,
}) => {
  const {
    state,
    setCompanyName,
    setContactPerson,
    setMobile,
    setEmail,
    setCity,
    setState,
    setAddress,
    setCompanyType: setCompanyType2,
    setDocument,
    
  } = useCompanyRegistrationContextHook();
  const [ibaApproval, setIbaApproval] = useState<string>(ibaApprovalOptions[0]);
  const [companyType, setCompanyType] = useState<string>('1');
  const [documentTypeLabel, setDocumentTypeLabel] = useState<string>('PAN');
  const [states, setStates] = useState<TDropdownItem[]>([]);
  const [cities, setCities] = useState<TDropdownItem[]>([]);
  const dispatch = useAppDispatch();
  const {requesting, success, error, failure, addCompanyInfo} = useAppSelector(
    state => state.Company,
  );
  const {otpData} = useAppSelector(state => state.OTP);
  const cityDropdownRef = useRef(null);
  const stateDropwdownRef = useRef(null);
  const documentInputRef = useRef(null);
  const companyTypeDropdownRef = useRef(null);

  const setPincodeError = () => {
  };

  const resetPincodeError = () => {
  };
  const {result, fetching, setPincode} = usePincodeHook(
    setPincodeError,
    resetPincodeError,
  );

  const handleCompanyNameInputTextChange = (text: string) => {
    // if (state.errors.companyName) {
    //   setCompanyNameError('');
    // }
    // setCompanyName(text);
  };

  const handleContactPersonInputTextChange = (text: string) => {
    // if (state.errors.contactPerson) {
    //   setContactPersonError('');
    // }
    // setContactPerson(text);
  };

  const handleEmailInputTextChange = (text: string) => {
    // if (state.errors.email) {
    //   setEmailError('');
    // }
    // setEmail(text);
  };

  const handleMobileInputTextChange = (text: string) => {
    // if (state.errors.mobile) {
    //   setMobileError('');
    // }
    // setMobile(text);
  };

  const handleCitySelectChange = (item: string) => {
    setCity(item);
  };

  const handleStateSelectChange = (item: string) => {
    setState(item);
  };

  const handleAddressInputTextChange = (text: string) => {
    // if (state.errors.address) {
    //   setAddressError('');
    // }
    // setAddress(text);
  };

  const handleIbaApprovalCodeInputTextChange = (text: string) => {
    // if (state.errors.ibaApprovalCode) {
    //   setIbaApprovalCodeError('');
    // }
    // setIbaApprovalCode(text);
  };

  const handleDocumentChange = (text: string) => {
    // if (state.errors.document) {
    //   setDocumentError('');
    // }
    // setDocument(text);
  };

  const handleCompanyTypeSelectChange = (item: TDropdownItem) => {
    setCompanyType(item.value);
    setCompanyType2(item.label);
    setDocument('');
    // if(documentInputRef) {
    //   documentInputRef?.current.setValue('');
    // }
  };

  const handleIbaCodeValidTillDate = (date: Date) => {
    // setIbaApprovalTillDate(formatDate2(date));
  };

  const handlePickupPinCode = useCallback((text: string) => {
    setPincode(text);
    // setPincode2(text);
  }, []);

  const validateRegistrationForm = () => {
    console.log('mystate----', JSON.stringify(state));
    
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

    // if (Validator.isEmpty(state.companyName)) {
    //   setCompanyNameError('Company name required');
    // } else {
    //   companyNameFilled = true;
    //   setCompanyNameError('');
    // }

    // if (Validator.isEmpty(state.contactPerson)) {
    //   setContactPersonError('Contact person name required');
    // } else {
    //   contactPersonNameFilled = true;
    //   setContactPersonError('');
    // }

    // if (Validator.isEmpty(state.mobile)) {
    //   setMobileError('Mobile required');
    // } else {
    //   mobileFilled = true;
    //   setMobileError('');
    // }

    // if (Validator.isEmpty(state.email)) {
    //   setEmailError('Email required');
    // } else {
    //   emailFilled = true;
    //   setEmailError('');
    // }

    // if (Validator.isEmpty(state.pinCode)) {
    //   setPincodeError2('Pincode required');
    // } else {
    //   pincodeFilled = true;
    //   setPincodeError2('');
    // }

    // if (Validator.isEmpty(state.state)) {
    //   setStateError('State required');
    // } else {
    //   stateFilled = true;
    //   setStateError('');
    // }

    // if (Validator.isEmpty(state.city)) {
    //   setCityError('City required');
    // } else {
    //   cityFilled = true;
    //   setCityError('');
    // }

    // if (Validator.isEmpty(state.address)) {
    //   setAddressError('Address required');
    // } else {
    //   addressFilled = true;
    //   setAddressError('');
    // }

    // if (ibaApproval == 'Approved') {
    //   if (Validator.isEmpty(state.ibaApprovalCode)) {
    //     setIbaApprovalCodeError('IBA Approval code required');
    //   } else {
    //     ibaApprovalCodeFilled = true;
    //     setIbaApprovalCodeError('');
    //   }

    //   if (Validator.isEmpty(state.ibaApprovalValidTill)) {
    //     setIbaApprovalTillDateError('IBA Approval Date required');
    //   } else {
    //     ibaApprovalValidTillFilled = true;
    //     setIbaApprovalTillDateError('');
    //   }
    // }

    // if (Validator.isEmpty(state.companyType)) {
    //   setCompanyTypeError('Company Type required');
    // } else {
    //   companyTypeFilled = true;
    //   setCompanyTypeError('');
    // }

    // if (Validator.isEmpty(state.document)) {
    //   setDocumentError('Document number required');
    // } else {
    //   documentFilled = true;
    //   setDocumentError('');
    // }
    // let areFieldsValid: boolean = false;
    // let isRequiredFieldsFilled =
    //   companyNameFilled &&
    //   contactPersonNameFilled &&
    //   mobileFilled &&
    //   emailFilled &&
    //   pincodeFilled &&
    //   stateFilled &&
    //   cityFilled &&
    //   addressFilled &&
    //   companyTypeFilled &&
    //   documentFilled;
    //   console.log('isRequiredFieldsFilled-------', isRequiredFieldsFilled);
    // if (ibaApproval == ibaApprovalOptions[0]) {
    //   console.log('inside-if');
      
    //   areFieldsValid = isRequiredFieldsFilled;
    // } else if (ibaApproval == ibaApprovalOptions[1]) {
    //   console.log('inside-else');
    //   areFieldsValid =
    //     isRequiredFieldsFilled &&
    //     ibaApprovalCodeFilled &&
    //     ibaApprovalValidTillFilled;
    // }
    // console.log('areFieldsValid-------', areFieldsValid);
    
    return false;
  };

  const handleNextClick = useCallback(() => {
    if (currentStep >= 1 && currentStep < 5) {
      const isValidForm = validateRegistrationForm();
      if (isValidForm) {
        const data: ICompanyRegistrationRequest = {
          authId: otpData?.data.id as string,
          companyName: '',
          contactPerson: '',
          email: state.email,
          companyMobile: state.mobile,
          companyAddress: state.address,
          state: state.state,
          city: state.city,
          pincode: '',
          companyWebite: 'www.abc.com',
          companyLogo: '',
          punchLine: 'na',
          companyProfile: '',
          district: '',
          postOffice: '',
          govRegdDetails: {
            // companyType: state.companyType || companyTypeOptions[0].label,
            // companyPAN: state.companyType == ('Propritorship' || 'Partnership') ? state.document : '',
            // incorporationNumber: state.companyType == ('Pvt. Ltd. Company' || 'LLP') ? state.document : '',
          },
          accountDetails: [],
          packerSignature: '',
          termsconditions: 'NA',
        };
        console.log('data----------', JSON.stringify(data), null, ' ');
        dispatch(addCompanyRequest(data));
      }
    }
  }, [state, ibaApproval, companyType]);

  useEffect(() => {
    if (otpData?.data?.mobile) {
      handleMobileInputTextChange(otpData?.data?.mobile);
    }
    if(companyTypeDropdownRef) {
      //@ts-ignore
      companyTypeDropdownRef?.current?.setDefaultValue(companyTypeOptions[0]);
      setCompanyType2(companyTypeOptions[0].label);
      // setCompanyTypeError('');
    }
  }, []);

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

  useEffect(() => {
    if (states && cities && cityDropdownRef && stateDropwdownRef) {
      //@ts-ignore
      stateDropwdownRef?.current?.setValue(states[0]?.label);
      handleStateSelectChange(states[0]?.label);
      //@ts-ignore
      cityDropdownRef?.current?.setValue(cities[0]?.label);
      handleCitySelectChange(cities[0]?.label);
    }
  }, [states, cities]);

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
              <Label text="Company Name" style={styles.label} required={true} />
              <Input
                onChangeText={handleCompanyNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                // value={state.companyName}
                // error={state.errors.companyName}
                placeholder="Enter your company name"
                type="text"
                required={true}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label
                text="Contact Person"
                style={styles.label}
                required={true}
              />
              <Input
                onChangeText={handleContactPersonInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                // value={state.contactPerson}
                // error={state.errors.contactPerson}
                placeholder="Enter contact person name"
                type="text"
                required={true}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Mobile" style={styles.label} required={true} />
              <Input
                onChangeText={handleMobileInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.mobile}
                // error={state.errors.mobile}
                placeholder="Enter mobile number"
                type="mobile"
                required={true}
                editable={false}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Email" style={styles.label} required={true} />
              <Input
                onChangeText={handleEmailInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.email}
                // error={state.errors.email}
                placeholder="Enter email"
                type="email"
                required={true}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Pin code" style={styles.label} required={true} />
              <Input
                onChangeText={handlePickupPinCode}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                // value={state.pinCode}
                // error={state.errors.pinCode}
                placeholder="Enter pincode"
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="State" style={styles.label} />
              <EpackDropdown
                data={states.map(e => e.label)}
                placeholder={'Select State'}
                hanldeData={handleStateSelectChange}
                //@ts-ignore
                ref={stateDropwdownRef}
              />
            </View>
            <View style={styles.elementContainer}>
              <Label text="City" style={styles.label} />
              <EpackDropdown
                data={cities.map(e => e.label)}
                placeholder={'Select City'}
                hanldeData={handleCitySelectChange}
                //@ts-ignore
                ref={cityDropdownRef}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Address" style={styles.label} required={true} />
              <Input
                onChangeText={handleAddressInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.address}
                // error={state.errors.address}
                placeholder="Enter your address"
                type="text"
                required={true}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.labelContainer}>
              <Label text="IBA Approval" style={styles.label} />
            </View>
            <View style={styles.elementContainer2}>
              {ibaApprovalOptions.map((itm, index) => {
                return (
                  <BouncyCheckbox
                    key={itm}
                    size={25}
                    unfillColor="#FFFFFF"
                    text={itm}
                    fillColor={COLOR_BLUE}
                    iconStyle={{
                      borderColor: 'red',
                      borderRadius: 12,
                      width: 22,
                      height: 22,
                    }}
                    innerIconStyle={{
                      borderWidth: 1,
                      borderRadius: 12,
                      width: 22,
                      height: 22,
                    }}
                    textStyle={{
                      fontFamily: 'JosefinSans-Regular',
                      textDecorationLine: 'none',
                    }}
                    style={{marginRight: 15, marginBottom: 10}}
                    textContainerStyle={{paddingLeft: 0}}
                    onPress={(isChecked: boolean) => {
                      if (itm == ibaApprovalOptions[0]) {
                        // setIbaApprovalCodeError('');
                        // setIbaApprovalTillDateError('');
                      }
                      setIbaApproval(itm);
                    }}
                    isChecked={ibaApproval == itm}
                    disableBuiltInState={true}
                  />
                );
              })}
            </View>
            {ibaApproval == 'Approved' && (
              <>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                  <Label
                    text="IBA Approval Code"
                    style={styles.label}
                    required={true}
                  />
                  <Input
                    onChangeText={handleIbaApprovalCodeInputTextChange}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    selectionColor={COLOR_BLACK}
                    // value={state.ibaApprovalCode}
                    // error={state.errors.ibaApprovalCode}
                    placeholder="Ener IBA approval code"
                    type="text"
                    required={true}
                  />
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                  <Label
                    text="IBA Code Valid Till"
                    style={styles.label}
                    required={true}
                  />
                  <DatePickerComponent
                    onDateSelect={handleIbaCodeValidTillDate}
                    style={{width: '100%'}}
                    // error={state.errors.ibaApprovalValidTill}
                  />
                </View>
              </>
            )}
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Company Type" style={styles.label} required={true} />
              <DropdownComponent
                data={companyTypeOptions}
                onSelect={handleCompanyTypeSelectChange}
                // error={state.errors.companyType}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label
                text={documentTypeLabel}
                style={styles.label}
                required={true}
              />
              <Input
                onChangeText={handleDocumentChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                // value={state.document}
                // error={state.errors.document}
                placeholder="Enter document number"
                type="text"
                required={true}
                autoCapitalize="characters"
              />
            </View>
          </View>
          <Spacer height={12} />
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
            text="Submit"
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
