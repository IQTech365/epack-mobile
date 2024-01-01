import React, {useCallback, useEffect, useReducer, useRef, useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import Toast from 'react-native-toast-message';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../..//common/Spacer';
import styles from './style';
import Label from '../../../../common/Label';
import Input from '../../../../common/Input';
import {COLOR_BLACK} from '../../../../utils/colors';
import Button from '../../../../common/Button';
import stateData from '../../../../data/stateData.json';
import {
  ADD_BRANCH_FORM_ACTION,
  addBranchReducer,
  initialState,
} from './addBranchReducer';
import EpackDropdown from '../../../../common/DropdownComponent2';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {IAddBranchRequest} from '../../../../interface/myProfile/IAddBranchRequest';
import {
  addBranchRequest,
  restAddBranchRequest,
} from '../../../../redux/slices/MyProfile';
import Spinner from '../../../../common/Spinner';
import usePincodeHook from '../../../../hooks/usePincodeHook';
import {getCities, getLocalities, getStates} from '../../../../utils/formatter';
import useCompanyId from '../../../../hooks/useCompanyId';

const AddBranchUpdateView: React.FC<{}> = ({}) => {
  const [state, dispatch] = useReducer(addBranchReducer, initialState);
  const {otpData} = useAppSelector(state => state.OTP);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [localities, setLocalities] = useState<string[]>([]);

  const {addBranchRequesting, addBranchSuccess, addBranchFailure} =
    useAppSelector(state => state.Myprofile);
  const dispatch2 = useAppDispatch();

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const stateDropdownCompRef = useRef(null);
  const cityDropdownCompRef = useRef(null);
  const localityDropdownCompRef = useRef(null);

  const handleState = (text: string) => {
    dispatch({
      type: ADD_BRANCH_FORM_ACTION.STATE,
      payload: text,
    });
  };

  const handleCity = (text: string) => {
    dispatch({
      type: ADD_BRANCH_FORM_ACTION.CITY,
      payload: text,
    });
  };

  const handleLocality = (text: string) => {
    dispatch({
      type: ADD_BRANCH_FORM_ACTION.LOCALITY,
      payload: text,
    });
  };
  const handleBranchNameInputTextChange = (text: string) => {
    dispatch({
      type: ADD_BRANCH_FORM_ACTION.BRANCH_NAME,
      payload: text,
    });
  };

  const handleContactNumberInputTextChange = (text: string) => {
    dispatch({
      type: ADD_BRANCH_FORM_ACTION.REGISTERED_MOBILE,
      payload: text,
    });
  };

  const handlePincodeInputTextChange = (text: string) => {
    setPincode(text);
    dispatch({
      type: ADD_BRANCH_FORM_ACTION.PINCODE,
      payload: text,
    });
  };

  const handleAddressTextChange = (text: string) => {
    dispatch({
      type: ADD_BRANCH_FORM_ACTION.ADDRESS,
      payload: text,
    });
  };

  const handleLandmarkInputTextChange = (text: string) => {
    dispatch({
      type: ADD_BRANCH_FORM_ACTION.LANDMARK,
      payload: text,
    });
  };
  const handleEmailInputTextChange = (text: string) => {
    dispatch({
      type: ADD_BRANCH_FORM_ACTION.EMAIL,
      payload: text,
    });
  };

  const handleSave = useCallback(async () => {
    const companyId = await useCompanyId();
    const payload: IAddBranchRequest = {
      companyId: companyId,
      branchName: state.branchName,
      registeredMobile: state.registeredMobile,
      pincode: state.pincode,
      state: state.state,
      city: state.city,
      locality: state.locality,
      landmark: state.landmark,
      email: state.email,
      address: state.address,
      createdBy: otpData?.data.id as string,
    };
    console.log(payload, 'add branch..');
    dispatch2(addBranchRequest(payload));
  }, [state]);

  useEffect(() => {
    if (result && result.Status != 'Error') {
      const _states = getStates(result).map(e => e.label);
      const _cities = getCities(result).map(e => e.label);
      const _localities = getLocalities(result);
      setStates(_states);
      setCities(_cities);
      setLocalities(_localities);
    }
  }, [result]);

  useEffect(() => {
    if (
      states.length > 0 &&
      cities.length > 0 &&
      stateDropdownCompRef &&
      cityDropdownCompRef && localityDropdownCompRef
    ) {
      //@ts-ignore
      stateDropdownCompRef?.current?.setValue(states[0]);
      handleState(states[0]);
      //@ts-ignore
      cityDropdownCompRef?.current?.setValue(cities[0]);
      handleCity(cities[0]);
      //@ts-ignore
      localityDropdownCompRef?.current?.setValue(localities[0]);
      handleLocality(localities[0]);
    }
  }, [states, cities, localities]);

  useEffect(() => {
    if (!addBranchRequesting && addBranchSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Add Branch',
        text2: 'Branch has been added successfully',
      });
      dispatch2(restAddBranchRequest());
    } else if (!addBranchRequesting && addBranchFailure) {
      Toast.show({
        type: 'error',
        text1: 'Add Branch',
        text2: 'Error in adding Branch. Please try again!',
      });
      dispatch2(restAddBranchRequest());
    }
  }, [addBranchRequesting, addBranchSuccess, addBranchFailure]);
  return (
    <>
      <AvoidSoftInputViewHOC>
        <View style={styles.container}>
          <View>
            <Spacer height={4} />
            <View style={styles.elementContainer}>
              <Label text="Branch Name" style={styles.label} />
              <Input
                onChangeText={handleBranchNameInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <Spacer height={4} />
            <View style={styles.twoColumnWrapper}>
              <View style={styles.textContainer}>
                <Label text="Contact Number" style={styles.label} />
                <Input
                  onChangeText={handleContactNumberInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="Pincode" style={styles.label} />
                <Input
                  onChangeText={handlePincodeInputTextChange}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  selectionColor={COLOR_BLACK}
                />
              </View>
            </View>
            <Spacer height={4} />
            <View style={styles.twoColumnWrapper}>
              <View style={styles.textContainer}>
                <Label text="State" style={styles.label} />
                <EpackDropdown
                  data={states}
                  placeholder={'Select State'}
                  hanldeData={handleState}
                  //@ts-ignore
                  ref={stateDropdownCompRef}
                />
              </View>
              <View style={styles.textContainer}>
                <Label text="City" style={styles.label} />
                <EpackDropdown
                  data={cities}
                  placeholder={'Select City'}
                  hanldeData={handleCity}
                  //@ts-ignore
                  ref={cityDropdownCompRef}
                />
              </View>
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Lacality" style={styles.label} />
            <View>
              <EpackDropdown
                data={localities}
                placeholder={'Select Locality'}
                hanldeData={handleLocality}
                //@ts-ignore
                ref={localityDropdownCompRef}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Address" style={styles.label} />
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Type Address"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                onChangeText={text => handleAddressTextChange(text)}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Landmark" style={styles.label} />
            <Input
              onChangeText={handleLandmarkInputTextChange}
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
          <Spacer height={12} />
          <Button
            text="SAVE"
            onPress={handleSave}
            disabled={false}
            style={styles.previewButtonStyle}
            textStyle={styles.textStyle}
          />
          <Spacer height={12} />
        </View>
      </AvoidSoftInputViewHOC>
      <Spinner show={addBranchRequesting || fetching} />
    </>
  );
};

export default AddBranchUpdateView;
