import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackRoute } from "../utils/constants";
import LanguageSelectPageView from "../views/language";
import ClientsPageView from "../views/clients";

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {

    return (
        <ProfileStack.Navigator screenOptions={{headerShown: false}} >
            <ProfileStack.Screen name={ProfileStackRoute.ProfileRoot} component={ClientsPageView} />
            <ProfileStack.Screen name={ProfileStackRoute.Language} component={LanguageSelectPageView} />
        </ProfileStack.Navigator>
    );
}

export default ProfileStackNavigator;