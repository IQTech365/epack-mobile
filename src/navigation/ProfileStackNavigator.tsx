import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackRoute } from "../utils/constants";
import ProfilePageView from "../views/profile";
import LanguageSelectPageView from "../views/language";

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {

    return (
        <ProfileStack.Navigator screenOptions={{headerShown: false}} >
            <ProfileStack.Screen name={ProfileStackRoute.ProfileRoot} component={ProfilePageView} />
            <ProfileStack.Screen name={ProfileStackRoute.Language} component={LanguageSelectPageView} />
        </ProfileStack.Navigator>
    );
}

export default ProfileStackNavigator;