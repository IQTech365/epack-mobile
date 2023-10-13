import React, { useCallback, useReducer, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import styles from './style';
import Label from '../../../common/Label';
import Header from '../../../common/Header';
import Input from '../../../common/Input';
import { COLOR_BLACK, COLOR_BLUE } from '../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Button from '../../../common/Button';
import EpackDropdown from '../../../common/DropdownComponent2';
import stateData from '../../../data/stateData.json';
import CameraIcon from '../../../images/icons/arcticons_camera.svg';

const AddDriverView: React.FC<{}> = ({ }) => {
    // const [state, dispatch] = useReducer(addBranchReducer, initialState);

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
    return (
        <AvoidSoftInputViewHOC>
            <View style={styles.container}>
                <Header label="Add Driver" canGoBack={true} />
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
                    <Label text="Driver Name" style={styles.label} />
                    <Input
                        // onChangeText={handleBranchNameInputTextChange}
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        selectionColor={COLOR_BLACK}
                    />
                </View>
                <Spacer height={4} />

                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="Driver Mobile No." style={styles.label} />
                        <Input
                            onChangeText={handleContactNumberInputTextChange}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="Driver License No" style={styles.label} />
                        <Input
                            onChangeText={handlePincodeInputTextChange}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                        />
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
                                // onPress={handleSubmit}
                                disabled={false}
                                style={styles.browserButtonStyle}
                                textStyle={styles.browsertextStyle}
                            />
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
                                textStyle={styles.browsertextStyle}
                            />
                        </View>
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label
                        text="Permanent Address"
                        style={[styles.label, { fontWeight: '600' }]}
                    />
                </View>
                <Spacer height={4} />
                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="Pincode" style={styles.label} />
                        <Input
                            onChangeText={handleContactNumberInputTextChange}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="State" style={styles.label} />
                        <EpackDropdown
                            data={stateData}
                            placeholder={'please select or enter'}
                            hanldeData={handleCity}
                        />
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="City" style={styles.label} />
                        <EpackDropdown
                            data={stateData}
                            placeholder={'please select or enter'}
                            hanldeData={handleCity}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="Locality" style={styles.label} />
                        <EpackDropdown
                            data={stateData}
                            placeholder={'please select or enter'}
                            hanldeData={handleCity}
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
                            onChangeText={text => handleAddressTextChange(text)}
                        />
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label
                        text="Current Address"
                        style={[styles.label, { fontWeight: '600' }]}
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
                        style={{ marginRight: 15, marginBottom: 10 }}
                        textContainerStyle={{ paddingLeft: 0 }}
                        onPress={(isChecked: boolean) => {
                            // handleShiftingLugInputTextChange(isChecked, item.label);
                        }}
                    />
                </View>

                <Spacer height={4} />
                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="Pincode" style={styles.label} />
                        <Input
                            onChangeText={handleContactNumberInputTextChange}
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            selectionColor={COLOR_BLACK}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="State" style={styles.label} />
                        <EpackDropdown
                            data={stateData}
                            placeholder={'please select or enter'}
                            hanldeData={handleCity}
                        />
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.twoColumnWrapper}>
                    <View style={styles.textContainer}>
                        <Label text="City" style={styles.label} />
                        <EpackDropdown
                            data={stateData}
                            placeholder={'please select or enter'}
                            hanldeData={handleCity}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Label text="Locality" style={styles.label} />
                        <EpackDropdown
                            data={stateData}
                            placeholder={'please select or enter'}
                            hanldeData={handleCity}
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
                            onChangeText={text => handleAddressTextChange(text)}
                        />
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

export default AddDriverView;
