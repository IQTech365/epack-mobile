/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View } from 'react-native';
import AvoidSoftInputViewHOC from '../../../../../common/AvoidSoftInputViewHOC';
import Spacer from '../../../../../common/Spacer';
import Label from '../../../../../common/Label';
import DropdownComponent from '../../../../../common/DropdownComponent';
import { COLOR_BLUE } from '../../../../../utils/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import styles from './style';
import accountType from '../../../../../data/accountType.json';

interface ISigatureUpdateProps { }

const SignatureUpdateView: React.FC<ISigatureUpdateProps> = ({ }) => {
    const handleAccountType = () => {
        console.log('account type');
    };

    return (
        <AvoidSoftInputViewHOC>
            <View>
                {/* <View style={styles.mainWrapper}> */}
                <View style={styles.textContainer2}>
                    <Label text="Choose Signature Type" style={styles.label} />
                    <DropdownComponent
                        data={accountType}
                        onSelect={handleAccountType}
                    />
                </View>
                <Spacer height={4} />
                <View style={styles.textContainer2}>
                    <Label text="Role Type" style={styles.label} />
                    <DropdownComponent
                        data={accountType}
                        onSelect={handleAccountType}
                    />
                </View>
                {/* </View> */}
                <Spacer height={4} />

                <View style={styles.textContainer2}>
                    <Label text="Name of Employe" style={styles.label} />
                    <DropdownComponent
                        data={accountType}
                        onSelect={handleAccountType}
                    />
                </View>
                <Spacer height={12} />
                <View style={styles.mainWrapper}>
                    <Text>GST NO {'\n'} 06GHJYK9878H2Z1</Text>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <BouncyCheckbox
                                size={25}
                                fillColor={COLOR_BLUE}
                                unfillColor="#FFFFFF"
                                text="Quotation"
                                iconStyle={{
                                    borderColor: 'red',
                                    borderRadius: 0,
                                    width: 18,
                                    height: 18,
                                }}
                                innerIconStyle={{
                                    borderWidth: 1,
                                    borderRadius: 0,
                                    width: 18,
                                    height: 18,
                                }}
                                textStyle={{
                                    fontFamily: 'JosefinSans-Regular',
                                    textDecorationLine: 'none',
                                }}
                                style={{ marginRight: 15 }}
                                textContainerStyle={{ paddingLeft: 0 }}
                                onPress={(isChecked: boolean) => {
                                    //   setFixedFreight(isChecked);
                                    //   handleFixedFreightTemplate(isChecked);
                                }}
                                isChecked={false}
                            />

                            <BouncyCheckbox
                                size={25}
                                fillColor={COLOR_BLUE}
                                unfillColor="#FFFFFF"
                                text="Invoice"
                                iconStyle={{
                                    borderColor: 'red',
                                    borderRadius: 0,
                                    width: 18,
                                    height: 18,
                                }}
                                innerIconStyle={{
                                    borderWidth: 1,
                                    borderRadius: 0,
                                    width: 18,
                                    height: 18,
                                }}
                                textStyle={{
                                    fontFamily: 'JosefinSans-Regular',
                                    textDecorationLine: 'none',
                                }}
                                style={{ marginRight: 15 }}
                                textContainerStyle={{ paddingLeft: 0 }}
                                onPress={(isChecked: boolean) => {
                                    //   setFixedFreight(isChecked);
                                    //   handleFixedFreightTemplate(isChecked);
                                }}
                                isChecked={false}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <BouncyCheckbox
                                size={25}
                                fillColor={COLOR_BLUE}
                                unfillColor="#FFFFFF"
                                text="Bilty"
                                iconStyle={{
                                    borderColor: 'red',
                                    borderRadius: 0,
                                    width: 18,
                                    height: 18,
                                }}
                                innerIconStyle={{
                                    borderWidth: 1,
                                    borderRadius: 0,
                                    width: 18,
                                    height: 18,
                                }}
                                textStyle={{
                                    fontFamily: 'JosefinSans-Regular',
                                    textDecorationLine: 'none',
                                }}
                                style={{ marginRight: 15 }}
                                textContainerStyle={{ paddingLeft: 0 }}
                                onPress={(isChecked: boolean) => {
                                    //   setFixedFreight(isChecked);
                                    //   handleFixedFreightTemplate(isChecked);
                                }}
                                isChecked={false}
                            />

                            <BouncyCheckbox
                                size={25}
                                fillColor={COLOR_BLUE}
                                unfillColor="#FFFFFF"
                                text="Car Condition"
                                iconStyle={{
                                    borderColor: 'red',
                                    borderRadius: 0,
                                    width: 18,
                                    height: 18,
                                }}
                                innerIconStyle={{
                                    borderWidth: 1,
                                    borderRadius: 0,
                                    width: 18,
                                    height: 18,
                                }}
                                textStyle={{
                                    fontFamily: 'JosefinSans-Regular',
                                    textDecorationLine: 'none',
                                }}
                                style={{ marginRight: 15 }}
                                textContainerStyle={{ paddingLeft: 0 }}
                                onPress={(isChecked: boolean) => {
                                    //   setFixedFreight(isChecked);
                                    //   handleFixedFreightTemplate(isChecked);
                                }}
                                isChecked={false}
                            />
                        </View>
                        <BouncyCheckbox
                            size={25}
                            fillColor={COLOR_BLUE}
                            unfillColor="#FFFFFF"
                            text="Money Reciept"
                            iconStyle={{
                                borderColor: 'red',
                                borderRadius: 0,
                                width: 18,
                                height: 18,
                            }}
                            innerIconStyle={{
                                borderWidth: 1,
                                borderRadius: 0,
                                width: 18,
                                height: 18,
                            }}
                            textStyle={{
                                fontFamily: 'JosefinSans-Regular',
                                textDecorationLine: 'none',
                            }}
                            style={{ marginRight: 15 }}
                            textContainerStyle={{ paddingLeft: 0 }}
                            onPress={(isChecked: boolean) => {
                                //   setFixedFreight(isChecked);
                                //   handleFixedFreightTemplate(isChecked);
                            }}
                            isChecked={false}
                        />
                    </View>
                </View>
            </View>
        </AvoidSoftInputViewHOC>
    );
};

export default SignatureUpdateView;
