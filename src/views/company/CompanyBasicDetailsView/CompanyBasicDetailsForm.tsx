import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import styles from './style';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import Label from '../../../common/Label';
import Input from '../../../common/Input';
import {formatDate4, getCities2, getStates2} from '../../../utils/formatter';
import {ICompanyInfoData} from '../../../interface/companyRegistration/IGetCompaniesResponse';
import {setCurrentCompanyId} from '../../../utils/storage';
import {addCompanyRequest, resetAddCompanyRequest} from '../../../redux/slices/CompanySlice';
import {ICompanyRegistrationRequest} from '../../../interface/companyRegistration/ICompanyRegistrationRequest';
import {IError, getError, ibaApprovalOptions, validate} from '../utils';
import companyTypeOptions from '../../../data/companyType.json';
import useAuthId from '../../../hooks/useAuthId';
import usePincodeHook from '../../../hooks/usePincodeHook';
import {useAppDispatch, useAppSelector} from '../../../redux/hooks';
import {useCompanyRegistrationContextHook} from '../../../provider/CompanyRegistrationContextProvider';
import {NavigationProp} from '@react-navigation/native';
import {COLOR_BLACK, COLOR_BLUE} from '../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DatePickerComponent from '../../../common/DatePickerComponent';
import DropdownComponent from '../../../common/DropdownComponent';
import {TDropdownItem} from '../../../type/TDropdownItem';
import Spinner from '../../../common/Spinner';
import Button from '../../../common/Button';
import Header from '../../../common/Header';
import { resetUpdateSubscriptionRequest, updateSubscriptionRequest } from '../../../redux/slices/SubscriptionSlice';
import { IPurchase, IUpdateSubscriptionRequest } from '../../../interface/subscription/subscription';
import { ToastType, showToast } from '../../../utils/utility';
import { IPendingRegistration } from '../../../interface/common/common';
import { resetPendingRegistrationInfoPayload } from '../../../redux/slices/CommonSlice';
import DropdownWithTextInput from '../../../common/DropdownWithTextInput';

interface IProps {
  navigation: NavigationProp<any, any>;
}

const CompanyBasicDetailsForm: FC<IProps> = ({navigation}) => {
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
  } = useCompanyRegistrationContextHook();
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [shouldValidate, setShouldValidate] = useState<boolean>(false);
  const cityDropdownRef = useRef(null);
  const stateDropwdownRef = useRef(null);
  const dispatch = useAppDispatch();
  const {otpData} = useAppSelector(state => state.OTP);
  const {requesting, success, error, failure, addCompanyInfo} = useAppSelector(
    state => state.Company,
  );
  const {pendingRegistrationInfo} = useAppSelector(state => state.Common);
  const {
    updateSubscriptionRequesting,
    updateSubscriptionSuccess,
    updateSubscriptionFailure,
    addPurchaseInfo,
  } = useAppSelector(state => state.Subscription);
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
    setShouldValidate(true);
    const hasErrors: boolean = validate(state).some((d: IError) => !d.valid);
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
        companyWebsite: 'www.abc.com',
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
      dispatch(addCompanyRequest(data));
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

  const _setCompanyIdAndMoveToNextStep = async (companyId: string) => {
    await setCurrentCompanyId(companyId);
    //@ts-ignore
    navigation.replace('CompanyLogo');
  };

  useEffect(() => {
    if (!requesting && success && !error) {
      const {data} = addCompanyInfo || {};
      const {data:purchaseData} = addPurchaseInfo || {};
      const {data:pendingPurchaseData} =  pendingRegistrationInfo || {};
      if (data) {
        const company: ICompanyInfoData = data as ICompanyInfoData;
        const purchase: IPurchase = purchaseData as IPurchase;
        const pendingPurchase: IPendingRegistration = pendingPurchaseData as IPendingRegistration;
        let purchaseId:string = '';
        if(purchase && purchase?.purchase?._id) {
          purchaseId = purchase?.purchase?._id;
        } else if(pendingPurchase && pendingPurchase?.purchase?._id) {
          purchaseId = pendingPurchase?.purchase?._id;
        }
        const payload: IUpdateSubscriptionRequest = {
          params: {
            authId: authId,
            purchaseId: purchaseId,
          },
          payload: {
            companyId: company._id,
          }
        }
        dispatch(updateSubscriptionRequest(payload));
      }
      dispatch(resetAddCompanyRequest());
      dispatch(resetPendingRegistrationInfoPayload());
    } else if (!requesting && !success && error) {
      Alert.alert('Error in registering the company');
      dispatch(resetAddCompanyRequest());
      dispatch(resetPendingRegistrationInfoPayload());
    }
  }, [requesting, success, error]);

  useEffect(() => {
    if (!updateSubscriptionRequesting && updateSubscriptionSuccess) {
        const {data} = addCompanyInfo || {};
        if (data) {
          const company: ICompanyInfoData = data as ICompanyInfoData;
          _setCompanyIdAndMoveToNextStep(company._id);
          dispatch(resetUpdateSubscriptionRequest());
        }
    } else if (!updateSubscriptionRequesting && updateSubscriptionFailure) {
      showToast('Error in updating company id', ToastType.ERROR);
      dispatch(resetUpdateSubscriptionRequest());
    }
  }, [updateSubscriptionRequesting, updateSubscriptionSuccess, updateSubscriptionFailure]);

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
      <Header canGoBack={false} label="Register Company Basic Info" />
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
                error={getError('COMPANY_NAME', state, shouldValidate)}
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
                error={getError('CONTACT_PERSON', state, shouldValidate)}
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
                error={getError('EMAIL', state, shouldValidate)}
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
                error={getError('PINCODE', state, shouldValidate)}
                placeholder="Enter pincode"
              />
            </View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="State" style={styles.label} />
              <DropdownWithTextInput
                options={states}
                onSelect={setState}
                //@ts-ignore
                ref={stateDropwdownRef}
              />
            </View>
            <View style={styles.elementContainer}>
              <Label text="City" style={styles.label} />
              <DropdownWithTextInput
                options={cities}
                onSelect={setCity}
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
                error={getError('ADDRESS', state, shouldValidate)}
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
                    error={getError('IBA_APPROVAL_CODE', state, shouldValidate)}
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
                    error={getError('IBA_EXPIRY_DATE', state, shouldValidate)}
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
                error={getError('COMPANY_TYPE', state, shouldValidate)}
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
                error={getError('GOVT_DOCUMENT', state, shouldValidate)}
                placeholder="Enter document number"
                type="text"
                required={true}
                autoCapitalize="characters"
              />
            </View>
          </View>
          <Spacer height={12} />
          <Spinner
            show={fetching || requesting || updateSubscriptionRequesting}
          />
        </View>
      </AvoidSoftInputViewHOC>
      <View style={styles.oneButtonContainer}>
        <View style={styles.nextButtonContainer2}>
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

export default CompanyBasicDetailsForm;
