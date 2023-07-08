import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ZoomStackRoute } from "../utils/constants";
import ZoomPageView from "../views/zoom";

const ZoomStack = createNativeStackNavigator();

const ZoomStackNavigator = () => {

    return (
        <ZoomStack.Navigator screenOptions={{headerShown: false}} >
            <ZoomStack.Screen name={ZoomStackRoute.Zoom} component={ZoomPageView} />
        </ZoomStack.Navigator>
    );
}

export default ZoomStackNavigator;