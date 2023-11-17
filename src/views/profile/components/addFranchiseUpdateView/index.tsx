import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Toast from 'react-native-toast-message';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import styles from './style';
import Label from '../../../../common/Label';
import Input from '../../../../common/Input';
import { COLOR_BLACK, COLOR_BLUE } from '../../../../utils/colors';
import Button from '../../../../common/Button';
import { TDropdownItem } from '../../../../type/TDropdownItem';
import entityOptions from '../../../../data/entityOptions.json';
import DropdownComponent from '../../../../common/DropdownComponent';
import {
    ADD_FRANCHISE_FORM_ACTION,
    addFranchiseReducer,
    initialState,
} from './addFranchiseReducer';
import usePincodeHook, { PINCODE_REQUEST_KEY } from '../../../../hooks/usePincodeHook';
import { getCities, getLocalities, getStates } from '../../../../utils/formatter';
import Spinner from '../../../../common/Spinner';
import { IAddFranchiseRequest } from '../../../../interface/myProfile/IAddFranchiseRequest';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { addFranchiseRequest, restAddFranchiseRequest } from '../../../../redux/slices/MyProfile';
import EpackDropdown from '../../../../common/DropdownComponent2';

const AddFranchiseUpdateView: React.FC<{}> = ({ }) => {
    const [state, dispatch] = useReducer(addFranchiseReducer, initialState);
    const [pincodeRequestKey, setPincodeRequestKey] =
    useState<PINCODE_REQUEST_KEY>(PINCODE_REQUEST_KEY.ADD_FRANCHISE_ADDRESS);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [localities, setLocalities] = useState<string[]>([]);

  const { addCompanyInfo, companies } = useAppSelector(state => state.Company);
  const {otpData} = useAppSelector(state => state.OTP);
  const {
    addFranchiseRequesting,
    addFranchiseuccess,
    addFranchiseFailure,
    addFranchiseInfo,
  } = useAppSelector(state => state.Myprofile);
  const dispatch2 = useAppDispatch();

  const getCompanyId = () => {
    let id;
    const { data } = addCompanyInfo || {};
    const { data: companiesData } = companies || {};
    if (data && Object.keys(data).length > 0) {
        id = data._id;
    } else if (
        companiesData &&
        Array.isArray(companiesData) &&
        companiesData.length > 0
    ) {
        const firstCompany = companiesData[0];
        id = firstCompany._id;
    } else if(companiesData && companiesData.hasOwnProperty('_id')) {
        id = companiesData._id;
      }
    return id;
};


  const CityDropdownRef = useRef(null);
  const StateDropwdownRef = useRef(null);

  const setPincodeError = () => {
    // setPincodeError2('Invalid Pincode');
  };

  const resetPincodeError = () => {
    // setPincodeError2('');
  };

    const { result, fetching, setPincode } = usePincodeHook(
        setPincodeError,
        resetPincodeError,
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
          setPincodeRequestKey(PINCODE_REQUEST_KEY.ADD_FRANCHISE_ADDRESS);
          setPincode(text);
          dispatch({
            type:  ADD_FRANCHISE_FORM_ACTION.PINCODE,
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
        const payload: IAddFranchiseRequest = {
            companyId: getCompanyId(),
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
        }
        console.log(payload, 'add Franchise..');
        dispatch2(addFranchiseRequest(payload));

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
        if (!addFranchiseRequesting && addFranchiseuccess) {
          Toast.show({
            type: 'success',
            text1: 'Add Franchise',
            text2: 'Add Franchise has been added successfully',
          });
          dispatch2(restAddFranchiseRequest());
        } else if (!addFranchiseRequesting && addFranchiseFailure) {
          Toast.show({
            type: 'error',
            text1: 'Add Franchise',
            text2: 'Error in adding Franchise. Please try again!',
          });
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
                                hanldeData={handleState} />
                        </View>
                        <View style={styles.textContainer}>
                            <Label text="City" style={styles.label} />
                            <EpackDropdown
                                data={cities}
                                placeholder={'Select City'}
                                hanldeData={handleCity} />
                        </View>
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Lacality" style={styles.label} />
                    <EpackDropdown
                            data={localities}
                            placeholder={'Select Locality'}
                            hanldeData={handleLocality} />
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