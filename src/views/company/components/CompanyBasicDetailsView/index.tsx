import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import styles from './style';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import Label from '../../../../common/Label';
import Input from '../../../../common/Input';
import {useCompanyRegistrationContextHook} from '../../../../provider/CompanyRegistrationContextProvider';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../utils/colors';
import EpackDropdown from '../../../../common/DropdownComponent2';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import useAuthId from '../../../../hooks/useAuthId';
import {IError, getError, ibaApprovalOptions, validate} from '../../utils';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DatePickerComponent from '../../../../common/DatePickerComponent';
import {formatDate4, getCities2, getStates2} from '../../../../utils/formatter';
import DropdownComponent from '../../../../common/DropdownComponent';
import {TDropdownItem} from '../../../../type/TDropdownItem';
import Spinner from '../../../../common/Spinner';
import usePincodeHook from '../../../../hooks/usePincodeHook';
import companyTypeOptions from '../../../../data/companyType.json';
import Button from '../../../../common/Button';
import {ICompanyRegistrationRequest} from '../../../../interface/companyRegistration/ICompanyRegistrationRequest';
import {addCompanyRequest} from '../../../../redux/slices/CompanySlice';
import { ACTION } from '../../registrationReducer2';

interface IProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const CompanyBasicDetailsView: React.FC<IProps> = ({
  currentStep,
  setCurrentStep,
}) => {
  const {
    state,
    setCompanyName,
    setContactPerson,
    setMobile,
    setEmail,
    setPincode2,
    setState,
    setCity,
    setIbaApprovalStatus,
    setIbaCode,
    setIbaExpiryDate,
    setAddress,
    setCompanyType,
    setDocument,
    setCompanyLogo,
    setCompanySignature,
  } = useCompanyRegistrationContextHook();
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [shouldValidate, setShouldValidate] = useState<boolean>(false);
  const cityDropdownRef = useRef(null);
  const stateDropwdownRef = useRef(null);
  const documentInputRef = useRef(null);
  const companyTypeDropdownRef = useRef(null);
  const dispatch = useAppDispatch();
  const {otpData} = useAppSelector(state => state.OTP);
  const {requesting, success, error, failure, addCompanyInfo} = useAppSelector(
    state => state.Company,
  );
  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );
  const authId = useAuthId();

  const _getCompanyTypeLabelText = () => {
    let text: string = '';
    if (
      state.company_type == companyTypeOptions[0].label ||
      state.company_type == companyTypeOptions[1].label
    ) {
      text = 'PAN';
    } else if (
      state.company_type == companyTypeOptions[2].label ||
      state.company_type == companyTypeOptions[3].label
    ) {
      text = 'CIN/Incorporation No.';
    }
    return text;
  };

  const _getCompanyPAN = () => {
    let pan: string = '';
    if (
      state.company_type == companyTypeOptions[0].label ||
      state.company_type == companyTypeOptions[1].label
    ) {
      pan = state.govt_document;
    }
    return pan;
  };

  const _getCompanyCinOrIncorporationNo = () => {
    let cinNo: string = '';
    if (
      state.company_type == companyTypeOptions[2].label ||
      state.company_type == companyTypeOptions[3].label
    ) {
      cinNo = state.govt_document;
    }
    return cinNo;
  };

  const handleSave = useCallback(() => {
    if (currentStep >= 1 && currentStep < 5) {
      setShouldValidate(true);
      const hasErrors:boolean = validate(state).some((d:IError) => !d.valid);
      if (!hasErrors) {
        setShouldValidate(false);
        const data: ICompanyRegistrationRequest = {
          authId: authId,
          companyName: state.company_name,
          contactPerson: state.contact_person,
          email: state.email,
          companyMobile: state.mobile,
          companyAddress: state.address,
          state: state.state,
          city: state.city,
          pincode: state.pincode,
          companyWebite: 'www.abc.com',
          companyLogo: '',
          punchLine: 'NA',
          companyProfile: '',
          district: '',
          postOffice: '',
          govRegdDetails: {
            companyType: state.company_type,
            companyPAN: _getCompanyPAN(),
            companyGST: '',
            incorporationNumber: _getCompanyCinOrIncorporationNo(),
            IBAStatus: state.iba_approval_status,
            IBAcode: state.iba_approval_code,
            IBAExpiry: state.iba_expiry_date,
            udyamRegdNumber: '',
            shopActNumber: '',
            ISONumber: '',
          },
          accountDetails: [],
          packerSignature: '',
          termsconditions: 'NA',
        };
        console.log('data----------', JSON.stringify(data), null, ' ');
        dispatch(addCompanyRequest(data));
      }
    }
  }, [state]);

  const _handlePincodeChange = (text: string) => {
    setPincode2(text);
    setPincode(text); // README: This `setPincode` is from usePincodeHook();
  };

  useEffect(() => {
    if (otpData?.data?.mobile) {
      setMobile(otpData?.data?.mobile);
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
    if (result && result.Status != 'Error') {
      setStates(getStates2(result));
      setCities(getCities2(result));
    }
  }, [result]);

  useEffect(() => {
    if (states && cities && cityDropdownRef && stateDropwdownRef) {
      //@ts-ignore
      stateDropwdownRef?.current?.setValue(states[0]);
      setState(states[0]);
      //@ts-ignore
      cityDropdownRef?.current?.setValue(cities[0]);
      setCity(cities[0]);
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
                onChangeText={setCompanyName}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.company_name}
                error={getError(ACTION.COMPANY_NAME, state, shouldValidate)}
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
                onChangeText={setContactPerson}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.contact_person}
                error={getError(ACTION.CONTACT_PERSON, state, shouldValidate)}
                placeholder="Enter contact person name"
                type="text"
                required={true}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Mobile" style={styles.label} required={true} />
              <Input
                onChangeText={() => {}}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.mobile}
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
                onChangeText={setEmail}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.email}
                error={getError(ACTION.EMAIL, state, shouldValidate)}
                placeholder="Enter email"
                type="email"
                required={true}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Pin code" style={styles.label} required={true} />
              <Input
                onChangeText={_handlePincodeChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.pincode}
                error={getError(ACTION.PINCODE, state, shouldValidate)}
                placeholder="Enter pincode"
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="State" style={styles.label} />
              <EpackDropdown
                data={states}
                placeholder={'Select State'}
                hanldeData={setState}
                //@ts-ignore
                ref={stateDropwdownRef}
              />
            </View>
            <View style={styles.elementContainer}>
              <Label text="City" style={styles.label} />
              <EpackDropdown
                data={cities}
                placeholder={'Select City'}
                hanldeData={setCity}
                //@ts-ignore
                ref={cityDropdownRef}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Address" style={styles.label} required={true} />
              <Input
                onChangeText={setAddress}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.address}
                error={getError(ACTION.ADDRESS, state, shouldValidate)}
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
                    iconStyle={styles.iconStyle}
                    innerIconStyle={styles.innerIconStyle}
                    textStyle={styles.textStyle2}
                    style={{marginRight: 15, marginBottom: 10}}
                    textContainerStyle={{paddingLeft: 0}}
                    onPress={(isChecked: boolean) => {
                      if (itm == ibaApprovalOptions[0]) {
                        setIbaCode('');
                      }
                      setIbaApprovalStatus(itm);
                    }}
                    isChecked={state.iba_approval_status == itm}
                    disableBuiltInState={true}
                  />
                );
              })}
            </View>
            {state.iba_approval_status == 'Approved' && (
              <>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                  <Label
                    text="IBA Approval Code"
                    style={styles.label}
                    required={true}
                  />
                  <Input
                    onChangeText={setIbaCode}
                    containerStyle={styles.inputContainer}
                    inputStyle={styles.input}
                    selectionColor={COLOR_BLACK}
                    value={state.iba_approval_code}
                    error={getError(ACTION.IBA_APPROVAL_CODE, state, shouldValidate)}
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
                    onDateSelect={(date: Date) => {
                      setIbaExpiryDate(formatDate4(date));
                    }}
                    style={{width: '100%'}}
                    error={getError(ACTION.IBA_EXPIRY_DATE, state, shouldValidate)}
                  />
                </View>
              </>
            )}
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Company Type" style={styles.label} required={true} />
              <DropdownComponent
                data={companyTypeOptions}
                onSelect={(item: TDropdownItem) => {
                  setCompanyType(item.label);
                }}
                error={getError(ACTION.COMPANY_TYPE, state, shouldValidate)}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label
                text={_getCompanyTypeLabelText()}
                style={styles.label}
                required={true}
              />
              <Input
                onChangeText={setDocument}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={state.govt_document}
                error={getError(ACTION.GOVT_DOCUMENT, state, shouldValidate)}
                placeholder="Enter document number"
                type="text"
                required={true}
                autoCapitalize="characters"
              />
            </View>
          </View>
          <Spacer height={12} />
          <Spinner show={fetching} />
        </View>
      </AvoidSoftInputViewHOC>
      <View
        style={
          currentStep > 1
            ? styles.twoButtonContainer
            : styles.oneButtonContainer
        }>
        {currentStep > 1 ? (
          <View style={styles.prevButtonContainer}>
            <Button
              text="Previous"
              onPress={() => {}}
              style={styles.buttonStyle}
              textStyle={styles.buttonTextStyle}
            />
          </View>
        ) : null}
        <View
          style={
            currentStep > 1
              ? styles.nextButtonContainer
              : styles.nextButtonContainer2
          }>
          <Button
            text="Save"
            onPress={handleSave}
            style={styles.buttonStyle}
            textStyle={styles.buttonTextStyle}
          />
        </View>
      </View>
    </View>
  );
};

export default CompanyBasicDetailsView;
