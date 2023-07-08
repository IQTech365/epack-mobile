import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackRoute } from "../utils/constants";
import ProfilePageView from "../views/profile";

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {

    return (
        <ProfileStack.Navigator screenOptions={{headerShown: false}} >
            <ProfileStack.Screen name={ProfileStackRoute.Profile} component={ProfilePageView} />
        </ProfileStack.Navigator>
    );
}

export default ProfileStackNavigator;