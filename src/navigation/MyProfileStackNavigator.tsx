import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyProfileStackRoute, SettingStackRoute } from '../utils/constants';
import PackersProfileSetting from '../views/settings/profileSetting';
import SettingsView from '../views/settings';
import SerialNoSettingPageView from '../views/company/serialNoSettings';
import AddSerialNoView from '../views/settings/serialNoSettings';
import RoleManagementView from '../views/settings/roleManagement';
import TemplateSettingPageView from '../views/settings/templateSettings';
import ProfilePageView from '../views/profile';
import BasicDetailsView from '../views/profile/components/basicDetails';
import AddressView from '../views/profile/components/address';
import RegistrationDetailsView from '../views/profile/components/registrationDetails';
import AccountDetailsView from '../views/profile/components/accountDetails';
import UPIDetailsView from '../views/profile/components/upiDetails';
import PackerSignatureView from '../views/profile/components/packerSignature';
import TermsAndConditionView from '../views/profile/components/termsAndConditions';

const SettingStack = createNativeStackNavigator();

const MyProfileStackNavigator = () => {
    return (
        <SettingStack.Navigator screenOptions={{ headerShown: false }}>
            <SettingStack.Screen
                name={MyProfileStackRoute.ProfileRoot}
                component={ProfilePageView}
            />
            <SettingStack.Screen
                name={MyProfileStackRoute.BasicDetails}
                component={BasicDetailsView}
            />
            <SettingStack.Screen
                name={MyProfileStackRoute.Address}
                component={AddressView}
            />
            <SettingStack.Screen
                name={MyProfileStackRoute.RegistrationDetails}
                component={RegistrationDetailsView}
            />
            <SettingStack.Screen
                name={MyProfileStackRoute.AccountDetails}
                component={AccountDetailsView}
            />
            <SettingStack.Screen
                name={MyProfileStackRoute.UPIDetails}
                component={UPIDetailsView}
            />
            <SettingStack.Screen
                name={MyProfileStackRoute.PackerSignature}
                component={PackerSignatureView}
            />
            <SettingStack.Screen
                name={MyProfileStackRoute.TermsAndCondition}
                component={TermsAndConditionView}
            />
        </SettingStack.Navigator>
    );
};

export default MyProfileStackNavigator;
