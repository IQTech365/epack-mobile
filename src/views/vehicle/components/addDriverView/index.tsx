import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import styles from './style';
import Label from '../../../../common/Label';
import Input from '../../../../common/Input';
import { COLOR_BLACK, COLOR_BLUE } from '../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Button from '../../../../common/Button';
import EpackDropdown from '../../../../common/DropdownComponent2';
import stateData from '../../../../data/stateData.json';
import CameraIcon from '../../../../images/icons/arcticons_camera.svg';
import { ADD_Driver_FORM_ACTION, TAddressInfo, addAddDriverReducer, initialState } from './addDriverReducer';
import { IAddDriverRequest } from '../../../../interface/vehicle/IAddDriverRequest';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { addDriverRequest, restaddDriverRequest } from '../../../../redux/slices/VehicleSlice';
import Spinner from '../../../../common/Spinner';

const AddDriverView: React.FC<{}> = ({ }) => {
    const [state, dispatch] = useReducer(addAddDriverReducer, initialState);
    const [checkAddress, setCheckAddress] = useState(false);
    const {
        uploadLogoRequesting,
        uploadLogoSuccess,
        uploadLogoFailure,
        addCompanyInfo,
        companies
    } = useAppSelector(state => state.Company);

    const {
        addDriverRequesting,
        addDriveruccess,
        addDriverFailure,
        addDriverError
    } = useAppSelector(state => state.Vehicle);
    const dispatch2 = useAppDispatch()

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
        }
        return id;
    };

    const handleChodeEntity = (text: string) => {
        console.log(text, 'choose entity.');
        dispatch({
            type: ADD_Driver_FORM_ACTION.CHOOSE_ENTITY,
            payload: text,
        });
    };

    const handleBranchName = (text: string) => {
        dispatch({
            type: ADD_Driver_FORM_ACTION.BRANCH_NAME,
            payload: text,
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

    const handlePermanentPincodeInputTextChange = (text: string) => {
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
        console.log(text, 'boolean..');
        
        setCheckAddress(text);
    };

    const handleSubmit = ()=>{
        const payload: IAddDriverRequest = {
            companyId: getCompanyId(),
            entityType: state.chooseEntity,
            entityId:state.chooseEntity,
            driverName:state.driverName,
            mobile: state.mobile,
            licenceNo: state.licenceNo,
            aadharNo: state.aadharNo,
            permanentAddress: {
                pincode:state.permanentAddress?.pincode,
                address:state.permanentAddress?.address,
                city:state.permanentAddress?.city,
                state:state.permanentAddress?.state,
                locality:state.permanentAddress?.locality,
            },
            currentAddress: checkAddress? {
                pincode:state.permanentAddress?.pincode,
                address:state.permanentAddress?.address,
                city:state.permanentAddress?.city,
                state:state.permanentAddress?.state,
                locality:state.permanentAddress?.locality,
            }:{
                pincode:state.currentAddress?.pincode,
                address:state.currentAddress?.address,
                city:state.currentAddress?.city,
                state:state.currentAddress?.state,
                locality:state.currentAddress?.locality,
            },
            addedBy: ''
        }
        console.log(payload, 'add Driver..');
        dispatch2(addDriverRequest(payload));

    }

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
                                data={stateData}
                                placeholder={'please select or enter'}
                                hanldeData={handleChodeEntity} />
                        </View>
                        <View style={styles.textContainer}>
                            <Label text="Branch Name" style={styles.label} />
                            <EpackDropdown
                                data={stateData}
                                placeholder={'please select or enter'}
                                hanldeData={handleBranchName} />
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
                        selectionColor={COLOR_BLACK} />
                </View>
                <Spacer height={4} />

                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="Driver Mobile No." style={styles.label} />
                        <Input
                            onChangeText={handleMobileInputTextChange}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK} />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="Driver License No" style={styles.label} />
                        <Input
                            onChangeText={handleLicensenputTextChange}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK} />
                    </View>
                </View>

                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Upload License" style={styles.label} />
                    <TouchableOpacity style={styles.uploadLicenceStyle}>
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
                            <TouchableOpacity style={{ alignSelf: 'center' }}>
                                <CameraIcon width={20} height={20} />
                            </TouchableOpacity>
                            <Text style={styles.cameraText}>click By Camera</Text>
                            <Spacer height={6} />
                            <View style={styles.twoColumnWrapper2}>
                                <View style={styles.orBorderStyle} />
                                <Text style={{ textAlign: 'center' }}>Or</Text>
                                <View style={styles.orBorderStyle} />
                            </View>
                            <Spacer height={6} />
                            <Button
                                text="Bourse File"
                                onPress={() => { } }
                                disabled={false}
                                style={styles.browserButtonStyle}
                                textStyle={styles.browsertextStyle} />
                        </View>
                        <View style={styles.uploadContainer}>
                            <Text style={styles.uploadContainerText}>Back</Text>
                            <TouchableOpacity style={{ alignSelf: 'center' }}>
                                <CameraIcon width={20} height={20} />
                            </TouchableOpacity>
                            <Text style={styles.cameraText}>click By Camera</Text>
                            <Spacer height={6} />
                            <View style={styles.twoColumnWrapper2}>
                                <View style={styles.orBorderStyle} />
                                <Text style={{ textAlign: 'center' }}>Or</Text>
                                <View style={styles.orBorderStyle} />
                            </View>
                            <Spacer height={6} />
                            <Button
                                text="Bourse File"
                                // onPress={handleSubmit}
                                disabled={false}
                                style={styles.browserButtonStyle}
                                textStyle={styles.browsertextStyle} />
                        </View>
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label
                        text="Permanent Address"
                        style={[styles.label, { fontWeight: '600' }]} />
                </View>
                <Spacer height={4} />
                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="Pincode" style={styles.label} />
                        <Input
                            onChangeText={handlePermanentPincodeInputTextChange}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK} />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="State" style={styles.label} />
                        <EpackDropdown
                            data={stateData}
                            placeholder={'please select or enter'}
                            hanldeData={handlePermanentState} />
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="City" style={styles.label} />
                        <EpackDropdown
                            data={stateData}
                            placeholder={'please select or enter'}
                            hanldeData={handlePermanentCity} />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="Locality" style={styles.label} />
                        <EpackDropdown
                            data={stateData}
                            placeholder={'please select or enter'}
                            hanldeData={handlePermanentLocality} />
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
                            onChangeText={handlePermanentAddressTextChange} />
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label
                        text="Current Address"
                        style={[styles.label, { fontWeight: '600' }]} />
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
                        style={{ marginRight: 15, marginBottom: 10 }}
                        textContainerStyle={{ paddingLeft: 0 }}
                        onPress={(isChecked: boolean) => {
                            handlepermanentCheckInputTextChange(isChecked);
                        } } />
                </View>

                <Spacer height={4} />
                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="Pincode" style={styles.label} />
                        <Input
                            onChangeText={handleCurrentPincodeInputTextChange}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK} />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="State" style={styles.label} />
                        <EpackDropdown
                            data={stateData}
                            placeholder={'please select or enter'}
                            hanldeData={handleCurrentState} />
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="City" style={styles.label} />
                        <EpackDropdown
                            data={stateData}
                            placeholder={'please select or enter'}
                            hanldeData={handleCurrentCity} />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="Locality" style={styles.label} />
                        <EpackDropdown
                            data={stateData}
                            placeholder={'please select or enter'}
                            hanldeData={handleCurrentLocality} />
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
                            onChangeText={handleCurrentAddressTextChange} />
                    </View>
                </View>

                <Spacer height={12} />
                <Button
                    text="SAVE"
                    onPress={handleSubmit}
                    disabled={false}
                    style={styles.previewButtonStyle}
                    textStyle={styles.textStyle} />
                <Spacer height={12} />
            </View>
        </AvoidSoftInputViewHOC>
        <Spinner show={addDriverRequesting} />
        </>
    );
};

export default AddDriverView;
