import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingStackRoute } from '../utils/constants';
import PackersProfileSetting from '../views/settings/profileSetting';
import SettingsView from '../views/settings';
import AddSerialNoView from '../views/settings/serialNoSettings';
import RoleManagementView from '../views/settings/roleManagement';
import TemplateSettingPageView from '../views/settings/templateSettings';
import AccountEditView from '../views/settings/profileSetting/components/AccountEditView';

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
                name={SettingStackRoute.AccountEditView}
                component={AccountEditView}
            />
            <SettingStack.Screen
                name={SettingStackRoute.SerialNoSetting}
                component={AddSerialNoView}
            />
            <SettingStack.Screen
                name={SettingStackRoute.TemplateSetting}
                component={TemplateSettingPageView}
            />
            <SettingStack.Screen
                name={SettingStackRoute.RoleSetting}
                component={RoleManagementView}
            />
        </SettingStack.Navigator>
    );
};

export default SettingStackNavigator;
