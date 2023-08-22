/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import Header from '../../common/Header';
import SettingCard from './settingCard';
import Spacer from '../../common/Spacer';
import { SettingStackRoute } from '../../utils/constants';
import { COLOR_WHITE } from '../../utils/colors';
const spinner = require('../../images/loader.json');

const SettingsView = ({ navigation }) => {
    const handleProfileSetting = () => {
        console.log('pres...');
        navigation.navigate(SettingStackRoute.ProfileSetting);
    };
    return (
        <View style={{ backgroundColor: COLOR_WHITE, flex: 1 }}>
            <Header canGoBack={true} label="Settings" />
            <Spacer height={40} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <SettingCard
                    item={'Packers Profile Setting'}
                    onPress={handleProfileSetting}
                />
                <SettingCard item={'Set Serial No'} />
            </View>
            <Spacer height={20} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <SettingCard item={'Tempates Setting'} />
                <SettingCard item={'Roll Management'} />
            </View>
        </View>
    );
};

export default SettingsView;
