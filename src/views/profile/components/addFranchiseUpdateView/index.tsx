import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {View, TextInput} from 'react-native';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import styles from './style';
import Label from '../../../../common/Label';
import Input from '../../../../common/Input';
import {COLOR_BLACK} from '../../../../utils/colors';
import Button from '../../../../common/Button';
import {TDropdownItem} from '../../../../type/TDropdownItem';
import {
  ADD_FRANCHISE_FORM_ACTION,
  addFranchiseReducer,
  initialState,
} from './addFranchiseReducer';
import usePincodeHook from '../../../../hooks/usePincodeHook';
import {getCities, getLocalities, getStates} from '../../../../utils/formatter';
import Spinner from '../../../../common/Spinner';
import {IAddFranchiseRequest} from '../../../../interface/myProfile/IAddFranchiseRequest';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  addFranchiseRequest,
  restAddFranchiseRequest,
} from '../../../../redux/slices/MyProfile';
import EpackDropdown from '../../../../common/DropdownComponent2';
import { ToastType, showToast } from '../../../../utils/utility';
import { getCurrentCompanyId } from '../../../../utils/storage';

const AddFranchiseUpdateView: React.FC<{}> = ({}) => {
  const [state, dispatch] = useReducer(addFranchiseReducer, initialState);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [localities, setLocalities] = useState<string[]>([]);

  const {otpData} = useAppSelector(state => state.OTP);
  const {addFranchiseRequesting, addFranchiseuccess, addFranchiseFailure} =
    useAppSelector(state => state.Myprofile);
  const dispatch2 = useAppDispatch();

  const cityDropdownCompRef = useRef(null);
  const stateDropdownCompRef = useRef(null);
  const localityDropdownCompRef = useRef(null);

  const {result, fetching, setPincode} = usePincodeHook(
    () => {},
    () => {},
  );

  const handleState = (item: string) => {
    dispatch({
      type: ADD_FRANCHISE_FORM_ACTION.STATE,
      payload: item,
    });
  };

  const handleCity = (item: string) => {
    dispatch({
      type: ADD_FRANCHISE_FORM_ACTION.CITY,
      payload: item,
    });
  };

  const handleLocality = (item: string) => {
    dispatch({
      type: ADD_FRANCHISE_FORM_ACTION.LOCALITY,
      payload: item,
    });
  };
  const handleFranchiseNameInputTextChange = (text: string) => {
    dispatch({
      type: ADD_FRANCHISE_FORM_ACTION.FRANCHISE_NAME,
      payload: text,
    });
  };

  const handleOwnerInputTextChange = (text: string) => {
    dispatch({
      type: ADD_FRANCHISE_FORM_ACTION.FRANCHISE_OWNER,
      payload: text,
    });
  };

  const handleContactNumberInputTextChange = (text: string) => {
    dispatch({
      type: ADD_FRANCHISE_FORM_ACTION.REGISTERED_MOBILE,
      payload: text,
    });
  };

  const handlePincodeInputTextChange = useCallback(
    (text: string) => {
      setPincode(text);
      dispatch({
        type: ADD_FRANCHISE_FORM_ACTION.PINCODE,
        payload: text,
      });
    },
    [state.pincode],
  );

  const handleAddressTextChange = (text: string) => {
    dispatch({
      type: ADD_FRANCHISE_FORM_ACTION.ADDRESS,
      payload: text,
    });
  };

  const handleLandmarkInputTextChange = (text: string) => {
    dispatch({
      type: ADD_FRANCHISE_FORM_ACTION.LANDMARK,
      payload: text,
    });
  };
  const handleEmailInputTextChange = (text: string) => {
    dispatch({
      type: ADD_FRANCHISE_FORM_ACTION.EMAIL,
      payload: text,
    });
  };

  const handleEntityType = (item: TDropdownItem) => {
    // setEntityType(item.value);
  };

  const handleSubmit = useCallback(() => {
    getCurrentCompanyId().then(id => {
      const payload: IAddFranchiseRequest = {
        companyId: id as string,
        franchiseName: state.franchiseName,
        franchiseOwnerName: state.franchiseOwner,
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
      dispatch2(addFranchiseRequest(payload));
    }).catch(err => console.log(err));
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
      cityDropdownCompRef &&
      localityDropdownCompRef
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
    if (!addFranchiseRequesting && addFranchiseuccess) {
      showToast('New Franchise Added.', ToastType.SUCCESS);
      dispatch2(restAddFranchiseRequest());
    } else if (!addFranchiseRequesting && addFranchiseFailure) {
     
      showToast('New Franchise Not Added. Try again!', ToastType.ERROR);
      dispatch2(restAddFranchiseRequest());
    }
  }, [addFranchiseRequesting, addFranchiseuccess, addFranchiseFailure]);
  return (
    <AvoidSoftInputViewHOC>
      <View style={styles.container}>
        <View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Franchise Name" style={styles.label} />
            <Input
              onChangeText={handleFranchiseNameInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Franchise Owner Name" style={styles.label} />
            <Input
              onChangeText={handleOwnerInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.twoColumnWrapper}>
            <View style={styles.textContainer}>
              <Label text="Mobile number" style={styles.label} />
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
          <EpackDropdown
            data={localities}
            placeholder={'Select Locality'}
            hanldeData={handleLocality}
            //@ts-ignore
            ref={localityDropdownCompRef}
          />
        </View>
        <Spacer height={4} />
        <View style={styles.elementContainer}>
          <Label text="Franchise Address" style={styles.label} />
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
          onPress={handleSubmit}
          disabled={false}
          style={styles.previewButtonStyle}
          textStyle={styles.textStyle}
        />
        <Spacer height={12} />
        <Spinner show={addFranchiseRequesting || fetching} />
      </View>
    </AvoidSoftInputViewHOC>
  );
};

export default AddFranchiseUpdateView;
