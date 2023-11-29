import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  CameraType,
  MediaType,
  PhotoQuality,
} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import styles from './style';
import Label from '../../../../common/Label';
import Input from '../../../../common/Input';
import {COLOR_BLACK, COLOR_BLUE} from '../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Button from '../../../../common/Button';
import EpackDropdown from '../../../../common/DropdownComponent2';
import stateData from '../../../../data/stateData.json';
import chooseEntity1 from '../../../../data/chooseEntity1.json';
import CameraIcon from '../../../../images/icons/arcticons_camera.svg';
import {
  ADD_Driver_FORM_ACTION,
  TAddressInfo,
  addAddDriverReducer,
  initialState,
} from './addDriverReducer';
import {IAddDriverRequest} from '../../../../interface/vehicle/IAddDriverRequest';
import {useAppDispatch, useAppSelector} from '../../../../redux/hooks';
import {
  addDriverRequest,
  restaddDriverRequest,
} from '../../../../redux/slices/VehicleSlice';
import Spinner from '../../../../common/Spinner';
import usePincodeHook, {
  PINCODE_REQUEST_KEY,
} from '../../../../hooks/usePincodeHook';
import {TDropdownItem} from '../../../../type/TDropdownItem';
import {getCities, getLocalities, getStates} from '../../../../utils/formatter';
import {
  getBranchsRequest,
  getFranchiseRequest,
} from '../../../../redux/slices/MyProfile';
import useCompanyId from '../../../../hooks/useCompanyId';
import DropdownComponent from '../../../../common/DropdownComponent';

const AddDriverView: React.FC<{}> = ({}) => {
  const [state, dispatch] = useReducer(addAddDriverReducer, initialState);
  const [checkAddress, setCheckAddress] = useState(false);
  const [companyLogo, setCompanyLogo] = useState<string>(null);
  const [imageFile, setImageFile] = useState<any>(null);
  const {
    uploadLogoRequesting,
    uploadLogoSuccess,
    uploadLogoFailure,
    addCompanyInfo,
    companies,
  } = useAppSelector(state => state.Company);

  const options: IOptions = {
    mediaType: 'photo',
    maxWidth: 200,
    maxHeight: 200,
    quality: 1,
    cameraType: 'back',
  };

  const {
    addDriverRequesting,
    addDriveruccess,
    addDriverFailure,
    addDriverError,
  } = useAppSelector(state => state.Vehicle);
  const [pincodeRequestKey, setPincodeRequestKey] =
    useState<PINCODE_REQUEST_KEY>(
      PINCODE_REQUEST_KEY.ADD_DRIVER_PERMANENT_ADDRESS,
    );
  const [permanentStates, setpermanentStates] = useState<string[]>([]);
  const [permanentCities, setpermanentCities] = useState<string[]>([]);
  const [permanentLocalities, setpermanentLocalities] = useState<string[]>([]);
  const [currentStates, setCurrentStates] = useState<string[]>([]);
  const [currentCities, setCurrentCities] = useState<string[]>([]);
  const [currentLocalities, setCurrentLocalities] = useState<string[]>([]);
  const [branchStatus, setBranchStatus] = useState<any>(chooseEntity1[0]);
  const {Branchs, getBranchsRequesting, Franchises, getFranchiseRequesting} =
    useAppSelector(state => state.Myprofile);
    const [branchData, setBranchData] = useState([]);
  const dispatch2 = useAppDispatch();
  const companyId = useCompanyId();

  const setPincodeError = () => {};

  const resetPincodeError = () => {};
  const {result, fetching, setPincode} = usePincodeHook(
    setPincodeError,
    resetPincodeError,
  );

  useEffect(() => {
    const fetchData = async () => {
      let data = [];
      if (branchStatus === 'Branch') {
        data =
          Branchs.data &&
          Branchs.data.map((data: any) => {
            return {label:data.branchName, value:data._id};
          });
      } else {
        data =
          Franchises.data &&
          Franchises.data.map((data: any) => {
            return {label:data.branchName, value:data._id};
          });
      }
      setBranchData(data);
    };

    fetchData();
  }, [Franchises, Branchs, branchStatus]);

  const handleChodeEntity = (text: string) => {
    setBranchStatus(text);
    if ((text = 'Branch')) {
      dispatch2(getBranchsRequest(companyId));
    } else {
      dispatch2(getFranchiseRequest(companyId));
    }
    dispatch({
      type: ADD_Driver_FORM_ACTION.CHOOSE_ENTITY,
      payload: text,
    });
  };

  const handleBranchName = (item: TDropdownItem) => {
    dispatch({
      type: ADD_Driver_FORM_ACTION.BRANCH_NAME,
      payload: item.label,
    });

    dispatch({
      type: ADD_Driver_FORM_ACTION.ENTITY_ID,
      payload: item.value,
    });
  };

  const handleDriverNameInputTextChange = (text: string) => {
    dispatch({
      type: ADD_Driver_FORM_ACTION.DRIVER_NAME,
      payload: text,
    });
  };
  const handleMobileInputTextChange = (text: string) => {
    dispatch({
      type: ADD_Driver_FORM_ACTION.MOBILE,
      payload: text,
    });
  };

  const handleLicensenputTextChange = (text: string) => {
    dispatch({
      type: ADD_Driver_FORM_ACTION.LICENCE_NO,
      payload: text,
    });
  };

  const handleAdharNumberInputTextChange = (text: string) => {
    dispatch({
      type: ADD_Driver_FORM_ACTION.AADHAR_NO,
      payload: text,
    });
  };
  
  const handlePermanentPincodeInputTextChange = (text: string) => {
    setPincodeRequestKey(PINCODE_REQUEST_KEY.ADD_DRIVER_PERMANENT_ADDRESS);
    setPincode(text);
    const {permanentAddress} = state;
    const tempObj = {
      ...permanentAddress,
      pincode: text,
    };
    dispatch({
      type: ADD_Driver_FORM_ACTION.PERMANENT_ADDRESS,
      payload: tempObj as TAddressInfo,
    });
  };

  const handlePermanentState = (text: string) => {
    const {permanentAddress} = state;
    const tempObj = {
      ...permanentAddress,
      state: text,
    };
    dispatch({
      type: ADD_Driver_FORM_ACTION.PERMANENT_ADDRESS,
      payload: tempObj as TAddressInfo,
    });
  };

  const handlePermanentCity = (text: string) => {
    const {permanentAddress} = state;
    const tempObj = {
      ...permanentAddress,
      city: text,
    };
    dispatch({
      type: ADD_Driver_FORM_ACTION.PERMANENT_ADDRESS,
      payload: tempObj as TAddressInfo,
    });
  };

  const handlePermanentLocality = (text: string) => {
    const {permanentAddress} = state;
    const tempObj = {
      ...permanentAddress,
      locality: text,
    };
    dispatch({
      type: ADD_Driver_FORM_ACTION.PERMANENT_ADDRESS,
      payload: tempObj as TAddressInfo,
    });
  };

  const handlePermanentAddressTextChange = (text: string) => {
    const {permanentAddress} = state;
    const tempObj = {
      ...permanentAddress,
      address: text,
    };
    dispatch({
      type: ADD_Driver_FORM_ACTION.PERMANENT_ADDRESS,
      payload: tempObj as TAddressInfo,
    });
  };

  const handleCurrentPincodeInputTextChange = (text: string) => {
    setPincodeRequestKey(PINCODE_REQUEST_KEY.ADD_DRIVER_CURRENT_ADDRESS);
    setPincode(text);
    const {currentAddress} = state;
    const tempObj = {
      ...currentAddress,
      pincode: text,
    };
    dispatch({
      type: ADD_Driver_FORM_ACTION.CURRENT_ADDRESS,
      payload: tempObj as TAddressInfo,
    });
  };

  const handleCurrentState = (text: string) => {
    const {currentAddress} = state;
    const tempObj = {
      ...currentAddress,
      state: text,
    };
    dispatch({
      type: ADD_Driver_FORM_ACTION.CURRENT_ADDRESS,
      payload: tempObj as TAddressInfo,
    });
  };

  const handleCurrentCity = (text: string) => {
    const {currentAddress} = state;
    const tempObj = {
      ...currentAddress,
      city: text,
    };
    dispatch({
      type: ADD_Driver_FORM_ACTION.CURRENT_ADDRESS,
      payload: tempObj as TAddressInfo,
    });
  };

  const handleCurrentLocality = (text: string) => {
    const {currentAddress} = state;
    const tempObj = {
      ...currentAddress,
      locality: text,
    };
    dispatch({
      type: ADD_Driver_FORM_ACTION.CURRENT_ADDRESS,
      payload: tempObj as TAddressInfo,
    });
  };

  const handleCurrentAddressTextChange = (text: string) => {
    const {currentAddress} = state;
    const tempObj = {
      ...currentAddress,
      address: text,
    };
    dispatch({
      type: ADD_Driver_FORM_ACTION.CURRENT_ADDRESS,
      payload: tempObj as TAddressInfo,
    });
  };

  const handlepermanentCheckInputTextChange = (text: boolean) => {
    setCheckAddress(text);
  };

  const handleSubmit = () => {
    const payload: IAddDriverRequest = {
      companyId: companyId,
      entityType: state.chooseEntity,
      entityId: state.entityId,
      driverName: state.driverName,
      mobile: state.mobile,
      licenceNo: state.licenceNo,
      aadharNo: state.aadharNo,
      permanentAddress: {
        pincode: state.permanentAddress?.pincode,
        address: state.permanentAddress?.address,
        city: state.permanentAddress?.city,
        state: state.permanentAddress?.state,
        locality: state.permanentAddress?.locality,
      },
      currentAddress: checkAddress
        ? {
            pincode: state.permanentAddress?.pincode,
            address: state.permanentAddress?.address,
            city: state.permanentAddress?.city,
            state: state.permanentAddress?.state,
            locality: state.permanentAddress?.locality,
          }
        : {
            pincode: state.currentAddress?.pincode,
            address: state.currentAddress?.address,
            city: state.currentAddress?.city,
            state: state.currentAddress?.state,
            locality: state.currentAddress?.locality,
          },
    };
    console.log(payload, 'add Driver..');
    dispatch2(addDriverRequest(payload));
  };
  const handleLaunchCamera = async () => {
    try {
      const result = await launchCamera(options);
      if (result && result.hasOwnProperty('assets')) {
        const {assets} = result || {};
        if (assets && Array.isArray(assets) && assets.length > 0) {
          const imageObj = assets[0];
          setImageFile(imageObj);
          setCompanyLogo(imageObj.uri as string);
          // setCompanyLogo2(imageObj.uri as string);
        }
      }
      console.log('Camera-result----', JSON.stringify(result));
    } catch (error) {
      console.log('Error in launching camera--', error);
    }
  };

  const handleLaunchGallery = async () => {
    try {
      const result = await launchImageLibrary(options);
      console.log('Gallery-result----', JSON.stringify(result));
      if (result && result.hasOwnProperty('assets')) {
        const {assets} = result || {};
        if (assets && Array.isArray(assets) && assets.length > 0) {
          const imageObj = assets[0];
          setImageFile(imageObj);
          setCompanyLogo(imageObj.uri as string);
          // setCompanyLogo2(imageObj.uri as string);
        }
      }
    } catch (error) {
      console.log('Error in opening gallery--', error);
    }
  };

  const handleResultChange = useCallback(async () => {
    if (result && result.Status !== 'Error') {
      if (
        pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_DRIVER_PERMANENT_ADDRESS
      ) {
        const _states = getStates(result).map(e => e.label);
        const _cities = getCities(result).map(e => e.label);
        const _localities = getLocalities(result);
        setpermanentStates(_states);
        setpermanentCities(_cities);
        setpermanentLocalities(_localities);
        const {permanentAddress} = state;
        const tempObj = {
          ...permanentAddress,
          state: _states[0],
          city:_cities[0],
          locality:_localities[0]
        };
        dispatch({
          type: ADD_Driver_FORM_ACTION.PERMANENT_ADDRESS,
          payload: tempObj as TAddressInfo,
        });
      } else {
        const _states = getStates(result).map(e => e.label);
        const _cities = getCities(result).map(e => e.label);
        const _localities = getLocalities(result);
        setCurrentStates(_states);
        setCurrentCities(_cities);
        setCurrentLocalities(_localities);
        const {currentAddress} = state;
        const tempObj = {
          ...currentAddress,
          state: _states[0],
          city:_cities[0],
          locality:_localities[0]
        };
        dispatch({
          type: ADD_Driver_FORM_ACTION.CURRENT_ADDRESS,
          payload: tempObj as TAddressInfo,
        });
      }
    }
  }, [result, pincodeRequestKey]);

  useEffect(() => {
    handleResultChange();
  }, [handleResultChange]);

  useEffect(() => {
    if (!addDriverRequesting && addDriveruccess) {
      Toast.show({
        type: 'success',
        text1: 'Add Driver',
        text2: 'Add Driver has been added successfully',
      });
      dispatch2(restaddDriverRequest());
    } else if (!addDriverRequesting && addDriverFailure) {
      Toast.show({
        type: 'error',
        text1: 'Add Driver',
        text2: 'Error in adding Driver. Please try again!',
      });
      dispatch2(restaddDriverRequest());
    }
  }, [addDriverRequesting, addDriveruccess, addDriverFailure]);

  return (
    <>
      <AvoidSoftInputViewHOC>
        <View style={styles.container}>
          <Spacer height={4} />

          <View>
            <Spacer height={4} />
            <View style={styles.twoColumnWrapper}>
              <View style={styles.textContainer}>
                <Label text="Choose Entity" style={styles.label} />
                <EpackDropdown
                  data={chooseEntity1}
                  placeholder={'please select or enter'}
                  hanldeData={handleChodeEntity}
                />
              </View>
              <View style={styles.textContainer}>
                <Label text={branchStatus} style={styles.label} />
                {/* <EpackDropdown
                  data={branchData}
                  placeholder={'please select or enter'}
                  hanldeData={handleBranchName}
                /> */}
                 <DropdownComponent
                data={branchData}
                onSelect={handleBranchName}
              />
              </View>
            </View>
            <Spacer height={4} />
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Driver Name" style={styles.label} />
            <Input
              onChangeText={handleDriverNameInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Upload Driver Photo" style={styles.label} />
            <View style={styles.elementContainer}>
              <View style={styles.uploadContaine2}>
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={handleLaunchCamera}>
                  <CameraIcon width={20} height={20} />
                </TouchableOpacity>
                <Text style={styles.cameraText}>click By Camera</Text>
                <Spacer height={6} />
                <View style={styles.twoColumnWrapper2}>
                  <View style={styles.orBorderStyle} />
                  <Text style={{textAlign: 'center'}}>Or</Text>
                  <View style={styles.orBorderStyle} />
                </View>
                <Spacer height={6} />
                <Button
                  text="Bourse File"
                  onPress={handleLaunchGallery}
                  disabled={false}
                  style={styles.browserButtonStyle}
                  textStyle={styles.browsertextStyle}
                />
              </View>
            </View>
          </View>
          <Spacer height={4} />

          <View style={styles.twoColumnWrapper}>
            <View style={styles.textContainer}>
              <Label text="Driver Mobile No." style={styles.label} />
              <Input
                onChangeText={handleMobileInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <View style={styles.textContainer}>
              <Label text="Driver License No" style={styles.label} />
              <Input
                onChangeText={handleLicensenputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
          </View>

          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Upload License" style={styles.label} />
            <TouchableOpacity
              style={styles.uploadLicenceStyle}
              onPress={handleLaunchGallery}>
              <Text style={styles.uploadLicenceTextStyle}>
                Choose File/Camera
              </Text>
            </TouchableOpacity>
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Upload Aadhar" style={styles.label} />
            <View style={styles.twoColumnWrapper}>
              <View style={styles.uploadContainer}>
                <Text style={styles.uploadContainerText}>Front</Text>
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={handleLaunchCamera}>
                  <CameraIcon width={20} height={20} />
                </TouchableOpacity>
                <Text style={styles.cameraText}>click By Camera</Text>
                <Spacer height={6} />
                <View style={styles.twoColumnWrapper2}>
                  <View style={styles.orBorderStyle} />
                  <Text style={{textAlign: 'center'}}>Or</Text>
                  <View style={styles.orBorderStyle} />
                </View>
                <Spacer height={6} />
                <Button
                  text="Bourse File"
                  onPress={handleLaunchGallery}
                  disabled={false}
                  style={styles.browserButtonStyle}
                  textStyle={styles.browsertextStyle}
                />
              </View>
              <View style={styles.uploadContainer}>
                <Text style={styles.uploadContainerText}>Back</Text>
                <TouchableOpacity style={{alignSelf: 'center'}}>
                  <CameraIcon width={20} height={20} />
                </TouchableOpacity>
                <Text style={styles.cameraText}>click By Camera</Text>
                <Spacer height={6} />
                <View style={styles.twoColumnWrapper2}>
                  <View style={styles.orBorderStyle} />
                  <Text style={{textAlign: 'center'}}>Or</Text>
                  <View style={styles.orBorderStyle} />
                </View>
                <Spacer height={6} />
                <Button
                  text="Bourse File"
                  // onPress={handleSubmit}
                  disabled={false}
                  style={styles.browserButtonStyle}
                  textStyle={styles.browsertextStyle}
                />
              </View>
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label text="Adhar Number" style={styles.label} />
            <Input
              onChangeText={handleAdharNumberInputTextChange}
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              selectionColor={COLOR_BLACK}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label
              text="Permanent Address"
              style={[styles.label, {fontWeight: '600'}]}
            />
          </View>
          <Spacer height={4} />
          <View style={styles.twoColumnWrapper}>
            <View style={styles.textContainer}>
              <Label text="Pincode" style={styles.label} />
              <Input
                onChangeText={handlePermanentPincodeInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
              />
            </View>
            <View style={styles.textContainer}>
              <Label text="State" style={styles.label} />

              <EpackDropdown
                data={permanentStates}
                placeholder={'please select or enter'}
                hanldeData={handlePermanentState}
                inputDefaultValue ={permanentStates[0]}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.twoColumnWrapper}>
            <View style={styles.textContainer}>
              <Label text="City" style={styles.label} />
              <EpackDropdown
                data={permanentCities}
                placeholder={'please select or enter'}
                hanldeData={handlePermanentCity}
                inputDefaultValue ={permanentCities[0]}
              />
            </View>
            <View style={styles.textContainer}>
              <Label text="Locality" style={styles.label} />
              <EpackDropdown
                data={permanentLocalities}
                placeholder={'please select or enter'}
                hanldeData={handlePermanentLocality}
                inputDefaultValue ={permanentLocalities[0]}
              />
            </View>
          </View>
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
                onChangeText={handlePermanentAddressTextChange}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.elementContainer}>
            <Label
              text="Current Address"
              style={[styles.label, {fontWeight: '600'}]}
            />
            <BouncyCheckbox
              text={'Same as permanent address'}
              fillColor={COLOR_BLUE}
              iconStyle={{
                borderColor: 'red',
                borderRadius: 0,
                width: 16,
                height: 16,
              }}
              innerIconStyle={{
                borderWidth: 1,
                borderRadius: 0,
                width: 16,
                height: 16,
              }}
              textStyle={{
                fontFamily: 'JosefinSans-Regular',
                textDecorationLine: 'none',
              }}
              style={{marginRight: 15, marginBottom: 10}}
              textContainerStyle={{paddingLeft: 0}}
              onPress={(isChecked: boolean) => {
                handlepermanentCheckInputTextChange(isChecked);
              }}
            />
          </View>

          <Spacer height={4} />
          <View style={styles.twoColumnWrapper}>
            <View style={styles.textContainer}>
              <Label text="Pincode" style={styles.label} />
              <Input
                onChangeText={handleCurrentPincodeInputTextChange}
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                selectionColor={COLOR_BLACK}
                value={checkAddress?state.permanentAddress?.pincode:''}
              />
            </View>
            <View style={styles.textContainer}>
              <Label text="State" style={styles.label} />
              <EpackDropdown
                data={currentStates}
                placeholder={'please select or enter'}
                hanldeData={handleCurrentState}
                inputDefaultValue ={checkAddress?state.permanentAddress?.state:currentStates[0]}
              />
            </View>
          </View>
          <Spacer height={4} />
          <View style={styles.twoColumnWrapper}>
            <View style={styles.textContainer}>
              <Label text="City" style={styles.label} />
              <EpackDropdown
                data={currentCities}
                placeholder={'please select or enter'}
                hanldeData={handleCurrentCity}
                inputDefaultValue ={checkAddress?state.permanentAddress?.city:currentCities[0]}
              />
            </View>
            <View style={styles.textContainer}>
              <Label text="Locality" style={styles.label} />
              <EpackDropdown
                data={currentLocalities}
                placeholder={'please select or enter'}
                hanldeData={handleCurrentLocality}
                inputDefaultValue ={checkAddress?state.permanentAddress?.locality:currentLocalities[0]}
              />
            </View>
          </View>
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
                onChangeText={handleCurrentAddressTextChange}
              />
            </View>
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
        </View>
      </AvoidSoftInputViewHOC>
      <Spinner
        show={
          fetching ||
          addDriverRequesting ||
          getBranchsRequesting ||
          getFranchiseRequesting
        }
      />
    </>
  );
};

export default AddDriverView;
