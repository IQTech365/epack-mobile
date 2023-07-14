import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackRoute } from "../utils/constants";
import MenuPageView from "../views/menu";

const ProfileStack = createNativeStackNavigator();

const ProfileStackNavigator = () => {

    return (
        <ProfileStack.Navigator screenOptions={{headerShown: false}} >
            <ProfileStack.Screen name={ProfileStackRoute.Menu} component={MenuPageView} />
        </ProfileStack.Navigator>
    );
}

export default ProfileStackNavigator;