import React, { useCallback, useReducer, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import AvoidSoftInputViewHOC from '../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../common/Spacer';
import styles from './style';
import Label from '../../../common/Label';
import Header from '../../../common/Header';
import Input from '../../../common/Input';
import { COLOR_BLACK, COLOR_BLUE } from '../../../utils/colors';
import Button from '../../../common/Button';
import { TDropdownItem } from '../../../type/TDropdownItem';
import entityOptions from '../../../data/entityOptions.json';
import DropdownComponent from '../../../common/DropdownComponent';
import {
    ADD_FRANCHISE_FORM_ACTION,
    addFranchiseReducer,
    initialState,
} from './addFranchiseReducer';

const AddFranchiseView: React.FC<{}> = ({ }) => {
    const [state, dispatch] = useReducer(addFranchiseReducer, initialState);
    console.log(state, 'output..');

    const handleState = (text: string) => {
        dispatch({
            type: ADD_FRANCHISE_FORM_ACTION.STATE,
            payload: text,
        });
    };

    const handleCity = (text: string) => {
        dispatch({
            type: ADD_FRANCHISE_FORM_ACTION.CITY,
            payload: text,
        });
    };

    const handleLocality = (text: string) => {
        dispatch({
            type: ADD_FRANCHISE_FORM_ACTION.LOCALITY,
            payload: text,
        });
    };
    const handleFranchiseNameInputTextChange = (text: string) => {
        dispatch({
            type: ADD_FRANCHISE_FORM_ACTION.BRANCH_NAME,
            payload: text,
        });
    };

    const handleContactNumberInputTextChange = (text: string) => {
        dispatch({
            type: ADD_FRANCHISE_FORM_ACTION.REGISTERED_MOBILE,
            payload: text,
        });
    };

    const handlePincodeInputTextChange = (text: string) => {
        dispatch({
            type: ADD_FRANCHISE_FORM_ACTION.PINCODE,
            payload: text,
        });
    };

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
    return (
        <AvoidSoftInputViewHOC>
            <View style={styles.container}>
                <Header label="Add Franchise" canGoBack={true} />
                <Spacer height={4} />

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
                            // onChangeText={handlePartyNameInputTextChange}
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
                            <DropdownComponent data={entityOptions} onSelect={handleState} />
                        </View>
                        <View style={styles.textContainer}>
                            <Label text="City" style={styles.label} />
                            <DropdownComponent data={entityOptions} onSelect={handleCity} />
                        </View>
                    </View>
                </View>
                <Spacer height={4} />
                <View style={styles.elementContainer}>
                    <Label text="Lacality" style={styles.label} />
                    <DropdownComponent data={entityOptions} onSelect={handleLocality} />
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

export default AddFranchiseView;
