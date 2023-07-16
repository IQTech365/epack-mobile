import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EnquiryStackRoute } from "../utils/constants";
import EnquiryPageView from "../views/enquiry";
import AddEnquiryView from "../views/enquiry/addEnquiry";
import EnquiryDetailsView from "../views/enquiry/enquiryDetails";

const EnquiryStack = createNativeStackNavigator();

const EnquiryStackNavigator = () => {

    return (
        <EnquiryStack.Navigator screenOptions={{headerShown: false}} >
            <EnquiryStack.Screen name={EnquiryStackRoute.EnquiryRoot} component={EnquiryPageView} />
            <EnquiryStack.Screen name={EnquiryStackRoute.AddEnquiry} component={AddEnquiryView} />
            <EnquiryStack.Screen name={EnquiryStackRoute.EnquiryDetails} component={EnquiryDetailsView} />
        </EnquiryStack.Navigator>
    );
}

export default EnquiryStackNavigator;