import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EnquiryStackRoute } from "../utils/constants";
import ZoomPageView from "../views/zoom";

const EnquiryStack = createNativeStackNavigator();

const EnquiryStackNavigator = () => {

    return (
        <EnquiryStack.Navigator screenOptions={{headerShown: false}} >
            <EnquiryStack.Screen name={EnquiryStackRoute.Zoom} component={ZoomPageView} />
        </EnquiryStack.Navigator>
    );
}

export default EnquiryStackNavigator;