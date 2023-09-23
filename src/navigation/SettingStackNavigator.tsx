import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingStackRoute } from '../utils/constants';
import PackersProfileSetting from '../views/settings/profileSetting';
import SettingsView from '../views/settings';
import SerialNoSettingPageView from '../views/company/serialNoSettings';
import AddSerialNoView from '../views/settings/profileSetting/components/AddSerialNoView';
import RoleManagementView from '../views/settings/roleManagement';

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
            <SettingStack.Screen
                name={SettingStackRoute.SerialNoSetting}
                component={AddSerialNoView}
            />
            <SettingStack.Screen
                name={SettingStackRoute.RoleSetting}
                component={RoleManagementView}
            />
        </SettingStack.Navigator>
    );
};

export default SettingStackNavigator;
