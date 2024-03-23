import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackRoute } from "../utils/constants";
import HomePageView from "../views/home";
import TodayFollowup from "../views/todayFollowup";
import TodaySurvey from "../views/todaySurvey";
import TodayShiftings from "../views/todayShiftings";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {

    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}} >
            <HomeStack.Screen name={HomeStackRoute.Home} component={HomePageView} />
            <HomeStack.Screen name={HomeStackRoute.TodayFollowup} component={TodayFollowup} />
            <HomeStack.Screen name={HomeStackRoute.TodaySurvey} component={TodaySurvey} />
            <HomeStack.Screen name={HomeStackRoute.TodayShiftings} component={TodayShiftings} />
        </HomeStack.Navigator>
    );
}

export default HomeStackNavigator;