import React, {useCallback, useEffect, useReducer, useState} from 'react';
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
import {
  COMPANY_REGISTRATION_ACTION,
  companyRegistrationReducer,
  initialState,
} from '../registrationReducer';
import {formatDate, getCities, getStates} from '../../../utils/formatter';
import DatePickerComponent from '../../../common/DatePickerComponent';
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from 'react-native-bouncy-checkbox-group';
import usePincodeHook from '../../../hooks/usePincodeHook';
import Spinner from '../../../common/Spinner';

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

const RegisterCompanyView: React.FC<{}> = ({}) => {
  const [state, dispatch] = useReducer(
    companyRegistrationReducer,
    initialState,
  );
  const [ibaApproval, setIbaApproval] = useState<boolean>(false);
  const [companyType, setCompanyType] = useState<string>('1');
  const [documentTypeLabel, setDocumentTypeLabel] = useState<string>('PAN')
  const [states, setStates] = useState<TDropdownItem[]>([]);
  const [cities, setCities] = useState<TDropdownItem[]>([]);
  console.log('RegisterCompanyView-state--', JSON.stringify(state, null, ' '));

  const setPincodeError = () => {
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.PINCODE_ERROR,
      payload: 'Invalid PIN Code',
    });
  };

  const resetPincodeError = () => {
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.PINCODE_ERROR,
      payload: '',
    });
  };
  const {result, fetching, setPincode} = usePincodeHook(
    setPincodeError,
    resetPincodeError,
  );

  const handleCompanyNameInputTextChange = (text: string) => {
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.COMPANY_NAME,
      payload: text,
    });
  };

  const handleContactPersonInputTextChange = (text: string) => {
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.CONTACT_PERSON,
      payload: text,
    });
  };

  const handleEmailInputTextChange = (text: string) => {
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.EMAIL,
      payload: text,
    });
  };

  const handleCitySelectChange = (item: TDropdownItem) => {
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.CITY,
      payload: item.label,
    });
  };

  const handleStateSelectChange = (item: TDropdownItem) => {
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.STATE,
      payload: item.label,
    });
  };

  const handleAddressInputTextChange = (text: string) => {
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.ADDRESS,
      payload: text,
    });
  };

  const handleIbaApprovalCodeInputTextChange = (text: string) => {
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.ADDRESS,
      payload: text,
    });
  };

  const handleDocumentChange = (text: string) => {
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.DOCUMENT,
      payload: text,
    });
  };

  const handleCompanyTypeSelectChange = (item: TDropdownItem) => {
    setCompanyType(item.value);
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.COMPANY_TYPE,
      payload: item.label,
    });
  };

  const handleIbaCodeValidTillDate = (date: Date) => {
    dispatch({
      type: COMPANY_REGISTRATION_ACTION.IBA_CODE_VALID_TILL,
      payload: formatDate(date),
    });
  };

  const handlePickupPinCode = useCallback(
    (text: string) => {
      setPincode(text);
      dispatch({
        type: COMPANY_REGISTRATION_ACTION.PIN_CODE,
        payload: text,
      });
    },
    [state.pinCode],
  );

  useEffect(() => {
    if(companyType == '1' || companyType == '2') {
      setDocumentTypeLabel('PAN');
    } else if(companyType == '3' || companyType == '4') {
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
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <View>
        <Spacer height={4} />
        <View><Text style={styles.titleText}>Company Basic Information</Text></View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Company Name" style={styles.label} />
            <Input
              onChangeText={handleCompanyNameInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
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
            />
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Mobile" style={styles.label} />
            <Input
              onChangeText={handleEmailInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
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
            />
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="State" style={styles.label} />
            <DropdownComponent
              data={states}
              onSelect={handleStateSelectChange}
            />
          </View>
          <View style={styles.elementContainer}>
            <Label text="City" style={styles.label} />
            <DropdownComponent
              data={cities}
              onSelect={handleCitySelectChange}
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
                />
              </View>
              <Spacer height={4} />
              <View style={styles.elementContainer}>
                <Label text="IBA Code Valid Till" style={styles.label} />
                <DatePickerComponent
                  onDateSelect={handleIbaCodeValidTillDate}
                  style={{width: '100%'}}
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
            />
          </View>
        </View>
        <Spacer height={12} />
        <Spinner show={fetching} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default RegisterCompanyView;
