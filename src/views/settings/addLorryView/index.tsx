import React, { useCallback, useReducer, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import styles from './style';
import Label from '../../../common/Label';
import Header from '../../../common/Header';
import Input from '../../../common/Input';
import { COLOR_BLACK, COLOR_BLUE } from '../../../utils/colors';
import Button from '../../../common/Button';
import EpackDropdown from '../../../common/DropdownComponent2';
import stateData from '../../../data/stateData.json';
import CameraIcon from '../../../images/icons/arcticons_camera.svg';
import DatePickerComponent from '../../../common/DatePickerComponent';
import {
    launchCamera,
    launchImageLibrary,
    CameraType,
    MediaType,
    PhotoQuality,
} from 'react-native-image-picker';
import { useAppSelector } from '../../../redux/hooks';

const AddLorryView: React.FC<{}> = ({ }) => {
    // const [state, dispatch] = useReducer(addBranchReducer, initialState);
    const [companyLogo, setCompanyLogo] = useState<string>(null);
    const [imageFile, setImageFile] = useState<any>(null);
    const {
        uploadLogoRequesting,
        uploadLogoSuccess,
        uploadLogoFailure,
        addCompanyInfo,
    } = useAppSelector(state => state.Company);

    const options: IOptions = {
        mediaType: 'photo',
        maxWidth: 200,
        maxHeight: 200,
        quality: 1,
        cameraType: 'back',
    };

    const handleState = (text: string) => {
        // console.log(text, 'state data');
        // dispatch({
        //     type: ADD_BRANCH_FORM_ACTION.STATE,
        //     payload: text,
        // });
    };

    const handleCity = (text: string) => {
        // dispatch({
        //     type: ADD_BRANCH_FORM_ACTION.CITY,
        //     payload: text,
        // });
    };

    const handleLocality = (text: string) => {
        // dispatch({
        //     type: ADD_BRANCH_FORM_ACTION.LOCALITY,
        //     payload: text,
        // });
    };
    const handleBranchNameInputTextChange = (text: string) => {
        // dispatch({
        //     type: ADD_BRANCH_FORM_ACTION.BRANCH_NAME,
        //     payload: text,
        // });
    };

    const handleContactNumberInputTextChange = (text: string) => {
        // dispatch({
        //     type: ADD_BRANCH_FORM_ACTION.REGISTERED_MOBILE,
        //     payload: text,
        // });
    };

    const handlePincodeInputTextChange = (text: string) => {
        // dispatch({
        //     type: ADD_BRANCH_FORM_ACTION.PINCODE,
        //     payload: text,
        // });
    };

    // const handleAddressTextChange = (text: string) => {
    //     dispatch({
    //         type: ADD_BRANCH_FORM_ACTION.ADDRESS,
    //         payload: text,
    //     });
    // };

    // const handleLandmarkInputTextChange = (text: string) => {
    //     dispatch({
    //         type: ADD_BRANCH_FORM_ACTION.LANDMARK,
    //         payload: text,
    //     });
    // };
    // const handleEmailInputTextChange = (text: string) => {
    //     dispatch({
    //         type: ADD_BRANCH_FORM_ACTION.EMAIL,
    //         payload: text,
    //     });
    // };

    const handleAddLorryDate = (date: Date) => {
        // dispatch({
        //   type: QUOTATION_FORM_ACTION.DATE_OF_QUOTATION,
        //   payload: formatDate(date),
        // });
    };
    const handleLaunchCamera = async () => {
        try {
            const result = await launchCamera(options);
            if (result && result.hasOwnProperty('assets')) {
                const { assets } = result || {};
                if (assets && Array.isArray(assets) && assets.length > 0) {
                    const imageObj = assets[0];
                    setImageFile(imageObj);
                    setCompanyLogo(imageObj.uri as string);
                    setCompanyLogo2(imageObj.uri as string);
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
                    setCompanyLogo2(imageObj.uri as string);
                }
            }
        } catch (error) {
            console.log('Error in opening gallery--', error);
        }
    };
    return (
        <AvoidSoftInputViewHOC>
            <View style={styles.container}>
                <Header label="Add Lorry    " canGoBack={true} />
                <Spacer height={4} />

                <View>
                    <Spacer height={4} />
                    <View style={styles.twoColumnWrapper}>
                        <View style={styles.textContainer}>
                            <Label text="Choose Entity" style={styles.label} />
                            <EpackDropdown
                                data={stateData}
                                placeholder={'please select or enter'}
                                hanldeData={handleCity}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Label text="Branch Name" style={styles.label} />
                            <EpackDropdown
                                data={stateData}
                                placeholder={'please select or enter'}
                                hanldeData={handleCity}
                            />
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
                        hanldeData={handleCity}
                    />
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Lorry Type" style={styles.label} />
                    <EpackDropdown
                        data={stateData}
                        placeholder={'please select or enter'}
                        hanldeData={handleCity}
                    />
                </View>
                <Spacer height={4} />

                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="Registration Number" style={styles.label} />
                        <Input
                            onChangeText={handleContactNumberInputTextChange}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                            placeholder='HR 55 hY 2259'
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="Manufacturing Year" style={styles.label} />
                        <DatePickerComponent onDateSelect={handleAddLorryDate} />
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Vehicle Chassis Number" style={styles.label} />
                    <Input
                        // onChangeText={handleBranchNameInputTextChange}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        placeholder='HR 55 hY 2259'
                    />
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Vehicle Engine Number" style={styles.label} />
                    <Input
                        // onChangeText={handleBranchNameInputTextChange}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        placeholder='HR 55 hY 2259'
                    />
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Vehicle RC Number" style={styles.label} />
                    <Input
                        // onChangeText={handleBranchNameInputTextChange}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                        placeholder='HR 55 hY 2259'
                    />
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
                                textStyle={styles.browsertextStyle}
                            />
                        </View>
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="Pollution Certificate No." style={styles.label} />
                        <Input
                            onChangeText={handleContactNumberInputTextChange}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="Renewal Date" style={styles.label} />
                        <DatePickerComponent onDateSelect={handleAddLorryDate} />
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
                                textStyle={styles.browsertextStyle}
                            />
                        </View>
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="Permit Number" style={styles.label} />
                        <Input
                            onChangeText={handleContactNumberInputTextChange}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="Renewal Date" style={styles.label} />
                        <DatePickerComponent onDateSelect={handleAddLorryDate} />
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
                                textStyle={styles.browsertextStyle}
                            />
                        </View>
                    </View>
                </View>

                <Spacer height={12} />
                <Button
                    text="SAVE"
                    // onPress={handleSubmit}
                    disabled={false}
                    style={styles.previewButtonStyle}
                    textStyle={styles.textStyle}
                />
                <Spacer height={12} />
            </View>
        </AvoidSoftInputViewHOC>
    );
};

export default AddLorryView;
