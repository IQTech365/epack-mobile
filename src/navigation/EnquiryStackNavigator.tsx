import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EnquiryStackRoute } from "../utils/constants";
import EnquiryPageView from "../views/enquiry";

const EnquiryStack = createNativeStackNavigator();

const EnquiryStackNavigator = () => {

    return (
        <EnquiryStack.Navigator screenOptions={{headerShown: false}} >
            <EnquiryStack.Screen name={EnquiryStackRoute.Zoom} component={EnquiryPageView} />
        </EnquiryStack.Navigator>
    );
}

export default EnquiryStackNavigator;