import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
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
import { getCities, getStates } from '../../../../utils/formatter';
import Spinner from '../../../../common/Spinner';

const AddFranchiseUpdateView: React.FC<{}> = ({ }) => {
    const [state, dispatch] = useReducer(addFranchiseReducer, initialState);
    const [pincodeRequestKey, setPincodeRequestKey] =
    useState<PINCODE_REQUEST_KEY>(PINCODE_REQUEST_KEY.ADD_FRANCHISE_ADDRESS);
  const [States, setStates] = useState<TDropdownItem[]>([]);
  const [cities, setCities] = useState<TDropdownItem[]>([]);

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

    const handleState = (item: TDropdownItem) => {
        dispatch({
            type: ADD_FRANCHISE_FORM_ACTION.STATE,
            payload: item.label,
        });
    };

    const handleCity = (item: TDropdownItem) => {
        dispatch({
            type: ADD_FRANCHISE_FORM_ACTION.CITY,
            payload: item.label,
        });
    };

    const handleLocality = (item: TDropdownItem) => {
        dispatch({
            type: ADD_FRANCHISE_FORM_ACTION.LOCALITY,
            payload: item.label,
        });
    };
    const handleFranchiseNameInputTextChange = (text: string) => {
        dispatch({
            type: ADD_FRANCHISE_FORM_ACTION.BRANCH_NAME,
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

    useEffect(() => {
        if (result && result.Status != 'Error') {
          if (
            pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_FRANCHISE_ADDRESS
          ) {
            setStates(getStates(result));
            setCities(getCities(result));
          }
        }
      }, [result]);
    
      useEffect(() => {
        if (
            States &&
          cities &&
          CityDropdownRef &&
          StateDropwdownRef &&
          pincodeRequestKey === PINCODE_REQUEST_KEY.ADD_FRANCHISE_ADDRESS
        ) {
          //@ts-ignore
          StateDropwdownRef?.current?.setDefaultValue(States[0]);
          //@ts-ignore
          CityDropdownRef?.current?.setDefaultValue(cities[0]);
        }
      }, [States, cities]);
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
                            <DropdownComponent data={States}
                             onSelect={handleState} 
                             //@ts-ignore
                           ref={StateDropwdownRef}/>
                        </View>
                        <View style={styles.textContainer}>
                            <Label text="City" style={styles.label} />
                            <DropdownComponent data={cities} 
                            onSelect={handleCity}
                              //@ts-ignore 
                            ref={CityDropdownRef}/>
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
                    onPress={()=>{}}
                    disabled={false}
                    style={styles.previewButtonStyle}
                    textStyle={styles.textStyle}
                />
                <Spacer height={12} />
                <Spinner show={fetching} />
            </View>
        </AvoidSoftInputViewHOC>
    );
};

export default AddFranchiseUpdateView;