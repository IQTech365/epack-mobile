/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import Header from '../../common/Header';
import SettingCard from './settingCard';
import Spacer from '../../common/Spacer';
import { SettingStackRoute } from '../../utils/constants';
import { COLOR_BLUE } from '../../utils/colors';
const spinner = require('../../images/loader.json');

const SettingsView = ({ navigation }) => {
    const handleProfileSetting = () => {
        navigation.navigate(SettingStackRoute.ProfileSetting);
    };

    const handleSerialNoSetting = () => {
        navigation.navigate(SettingStackRoute.SerialNoSetting);
    }

    const handleTemplateSetting = () => {
        navigation.navigate(SettingStackRoute.TemplateSetting);
    }
    
    const handleRoleSetting = () => {
        navigation.navigate(SettingStackRoute.RoleSetting);
    }

    return (
        <View style={{ backgroundColor: COLOR_BLUE, flex: 1 }}>
            <Header canGoBack={true} label="SETTINGS" />
            <Spacer height={40} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <SettingCard
                    item="Profile"
                    onPress={handleProfileSetting}
                    cardName='Profile'
                />
                <SettingCard item="Serial Number" cardName='SerialNo' onPress={handleSerialNoSetting} />
            </View>
            <Spacer height={10} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <SettingCard item="Tempates" cardName='Template' onPress={handleTemplateSetting} />
                <SettingCard item="Role Management" cardName='Role' onPress={handleRoleSetting} />
            </View>
        </View>
    );
};

export default SettingsView;
