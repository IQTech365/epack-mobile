import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackRoute } from "../utils/constants";
import HomePageView from "../views/home";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {

    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}} >
            <HomeStack.Screen name={HomeStackRoute.Home} component={HomePageView} />
        </HomeStack.Navigator>
    );
}

export default HomeStackNavigator;