import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingStackRoute } from '../utils/constants';
import PackersProfileSetting from '../views/settings/profileSetting';
import SettingsView from '../views/settings';

const SettingStack = createNativeStackNavigator();

const SettingStackNavigator = () => {
    return (
        <SettingStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingStack.Screen
                name={"Setting"}
                component={SettingsView}
            />
            <SettingStack.Screen
                name={SettingStackRoute.ProfileSetting}
                component={PackersProfileSetting}
            />
        </SettingStack.Navigator>
    );
};

export default SettingStackNavigator;
