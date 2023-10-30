import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import AvoidSoftInputViewHOC from '../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../common/Spacer';
import styles from './style';
import Label from '../../../../common/Label';
import Input from '../../../../common/Input';
import { COLOR_BLACK, COLOR_BLUE } from '../../../../utils/colors';
import Button from '../../../../common/Button';
import EpackDropdown from '../../../../common/DropdownComponent2';
import stateData from '../../../../data/stateData.json';
import CameraIcon from '../../../../images/icons/arcticons_camera.svg';
import DatePickerComponent from '../../../../common/DatePickerComponent';
import {
    launchCamera,
    launchImageLibrary,
    CameraType,
    MediaType,
    PhotoQuality,
} from 'react-native-image-picker';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { ADD_LORRY_FORM_ACTION, addAddLorryReducer, initialState } from './addLorryReducer';
import { formatDate } from '../../../../utils/formatter';
import { IAddLorryRequest } from '../../../../interface/vehicle/IAddLorryRequest';
import { addLorryRequest, restAddLorryRequest } from '../../../../redux/slices/VehicleSlice';
import Spinner from '../../../../common/Spinner';

const AddLorryView: React.FC<{}> = ({ }) => {
    const [state, dispatch] = useReducer(addAddLorryReducer, initialState);
    const [companyLogo, setCompanyLogo] = useState<string>(null);
    const [imageFile, setImageFile] = useState<any>(null);
    const {
        addLorryRequesting,
        addLorrySuccess,
        addLorryFailure,
        addLorryError
    } = useAppSelector(state => state.Vehicle);
    const {
        uploadLogoRequesting,
        uploadLogoSuccess,
        uploadLogoFailure,
        addCompanyInfo,
        companies
    } = useAppSelector(state => state.Company);
    const dispatch2 = useAppDispatch()

    const options: IOptions = {
        mediaType: 'photo',
        maxWidth: 200,
        maxHeight: 200,
        quality: 1,
        cameraType: 'back',
    };

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
    console.log(getCompanyId(), 'get company id...');
    
    const handleChooseEntity = (text: string) => {
        console.log(text, 'state data');
        dispatch({
            type: ADD_LORRY_FORM_ACTION.CHOOSE_ENTITY,
            payload: text,
        });
    };

    const handleBranchname = (text: string) => {
        dispatch({
            type: ADD_LORRY_FORM_ACTION.BRANCH_NAME,
            payload: text,
        });
    };

    const handleLorryCompanyname = (text: string) => {
        dispatch({
            type: ADD_LORRY_FORM_ACTION.LORRY_COMPANY_NAME,
            payload: text,
        });
    };


    const handleLorryType = (text: string) => {
        dispatch({
            type: ADD_LORRY_FORM_ACTION.LORRY_TYPE,
            payload: text,
        });
    };

    const handleRegistrationNoInputTextChange = (text: string) => {
        dispatch({
            type: ADD_LORRY_FORM_ACTION.REGISTRATION_NO,
            payload: text,
        });
    };

    const handleManufatureYearDate = (date: Date) => {
        dispatch({
            type: ADD_LORRY_FORM_ACTION.MANUFACTURE_YEAR,
            payload: formatDate(date),
        });
    };

    const handleVehicleChassisNoInputTextChange = (text: string) => {
        dispatch({
            type: ADD_LORRY_FORM_ACTION.VEHICLE_CHASSI_NO,
            payload: text,
        });
    };

    const handlVehicleEngineNoInputTextChange = (text: string) => {
        dispatch({
            type: ADD_LORRY_FORM_ACTION.VEHICLE_ENGINE_NO,
            payload: text,
        });
    };

    const handleVehicleRCnoInputTextChange = (text: string) => {
        dispatch({
            type: ADD_LORRY_FORM_ACTION.VEHICLE_RC_NO,
            payload: text,
        });
    };

    const handlePollutionCertificateNoInputTextChange = (text: string) => {
        dispatch({
            type: ADD_LORRY_FORM_ACTION.POLLUTION_CERTI_NO,
            payload: text,
        });
    };

    const handleRenewalDate = (date: Date) => {
        dispatch({
            type: ADD_LORRY_FORM_ACTION.RENEWAL_DATE,
            payload: formatDate(date),
        });
    };

    const handlePermitNoInputTextChange = (text: string) => {
        dispatch({
            type: ADD_LORRY_FORM_ACTION.PERMIT_NO,
            payload: text,
        });
    };

    const handleRenewalPermitDate = (date: Date) => {
        dispatch({
            type: ADD_LORRY_FORM_ACTION.RENEWAL_PERMIT_DATE,
            payload: formatDate(date),
        });
    };
    const handleSubmit = () => {
        const payload: IAddLorryRequest = {
            companyId: getCompanyId(),
            entityType: state.chooseEntity,
            entityId:  state.chooseEntity,
            driverName:  state.branchName,
            branchName: state.branchName,
            lorryCompanyName: state.lorryCompanyName,
            vehicleManufacturingYear: state.manufactureYear,
            lorryType: state.lorryType,
            vehicleRegistrationNo: state.registrationNo,
            vehicleChassisNo: state.vehicleChassiNo,
            vehicleEngineNo: state.vehicleEngineNo,
            permitNo: state.permitNo,
            permitRenewalDate: state.renewalPermitDate,
            vehicleRCNo: state.vehicleRCNo,
            pollutionCertificateNo: state.pollutionCertiNo,
            pollutionRenewalDate: state.renewalPermitDate,
            createdBy: getCompanyId()
        }
        console.log(payload, 'add Lorry..');
        dispatch2(addLorryRequest(payload));

    }
    const handleLaunchCamera = async () => {
        try {
            const result = await launchCamera(options);
            if (result && result.hasOwnProperty('assets')) {
                const { assets } = result || {};
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
                const { assets } = result || {};
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

    useEffect(() => {
        if (!addLorryRequesting && addLorrySuccess) {
          Toast.show({
            type: 'success',
            text1: 'Add Lorry',
            text2: 'Add Lorry has been added successfully',
          });
          dispatch2(restAddLorryRequest());
        } else if (!addLorryRequesting && addLorryFailure) {
          Toast.show({
            type: 'error',
            text1: 'Add Lorry',
            text2: 'Error in adding Lorry. Please try again!',
          });
          dispatch2(restAddLorryRequest());
        }
      }, [addLorryRequesting, addLorrySuccess, addLorryFailure]);

    return (
        <><AvoidSoftInputViewHOC>
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
                                hanldeData={handleChooseEntity} />
                        </View>
                        <View style={styles.textContainer}>
                            <Label text="Branch Name" style={styles.label} />
                            <EpackDropdown
                                data={stateData}
                                placeholder={'please select or enter'}
                                hanldeData={handleBranchname} />
                        </View>
                    </View>
                    <Spacer height={4} />
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Lorry Company Name" style={styles.label} />
                    <EpackDropdown
                        data={stateData}
                        placeholder={'please select or enter'}
                        hanldeData={handleLorryCompanyname} />
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Lorry Type" style={styles.label} />
                    <EpackDropdown
                        data={stateData}
                        placeholder={'please select or enter'}
                        hanldeData={handleLorryType} />
                </View>
                <Spacer height={4} />

                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="Registration Number" style={styles.label} />
                        <Input
                            onChangeText={handleRegistrationNoInputTextChange}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                            placeholder='HR 55 hY 2259' />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="Manufacturing Year" style={styles.label} />
                        <DatePickerComponent onDateSelect={handleManufatureYearDate} />
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Vehicle Chassis Number" style={styles.label} />
                    <Input
                        onChangeText={handleVehicleChassisNoInputTextChange}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        placeholder='HR 55 hY 2259' />
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Vehicle Engine Number" style={styles.label} />
                    <Input
                        onChangeText={handlVehicleEngineNoInputTextChange}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        placeholder='HR 55 hY 2259' />
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Vehicle RC Number" style={styles.label} />
                    <Input
                        onChangeText={handleVehicleRCnoInputTextChange}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        placeholder='HR 55 hY 2259' />
                </View>

                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Upload RC" style={styles.label} />
                    <View style={styles.elementContainer}>
                        <View style={styles.uploadContainer}>
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={handleLaunchCamera}>
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
                                onPress={handleLaunchGallery}
                                disabled={false}
                                style={styles.browserButtonStyle}
                                textStyle={styles.browsertextStyle} />
                        </View>
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="Pollution Certificate No." style={styles.label} />
                        <Input
                            onChangeText={handlePollutionCertificateNoInputTextChange}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK} />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="Renewal Date" style={styles.label} />
                        <DatePickerComponent onDateSelect={handleRenewalDate} />
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Upload Pollution Certificate" style={styles.label} />
                    <View style={styles.elementContainer}>
                        <View style={styles.uploadContainer}>
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={handleLaunchCamera}>
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
                                onPress={handleLaunchGallery}
                                disabled={false}
                                style={styles.browserButtonStyle}
                                textStyle={styles.browsertextStyle} />
                        </View>
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="Permit Number" style={styles.label} />
                        <Input
                            onChangeText={handlePermitNoInputTextChange}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK} />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="Renewal Date" style={styles.label} />
                        <DatePickerComponent onDateSelect={handleRenewalPermitDate} />
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Upload Permit" style={styles.label} />
                    <View style={styles.elementContainer}>
                        <View style={styles.uploadContainer}>
                            <TouchableOpacity style={{ alignSelf: 'center' }} onPress={handleLaunchCamera}>
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
                                onPress={handleLaunchGallery}
                                disabled={false}
                                style={styles.browserButtonStyle}
                                textStyle={styles.browsertextStyle} />
                        </View>
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
        <Spinner show={addLorryRequesting} />
        </>
    );
};

export default AddLorryView;
