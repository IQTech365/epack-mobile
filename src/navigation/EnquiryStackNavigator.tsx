import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EnquiryStackRoute } from "../utils/constants";
import EnquiryPageView from "../views/enquiry";
import AddEnquiryView from "../views/enquiry/addEnquiry";
import EnquiryDetailsView from "../views/enquiry/enquiryDetails";
import { EnquiryStackParamList } from "./params/EnquiryStackParamList";
import EditSurveyItemsView from "../views/enquiry/editSurveyItemsView";

const EnquiryStack = createNativeStackNavigator<EnquiryStackParamList>();

const EnquiryStackNavigator = () => {

    return (
        <EnquiryStack.Navigator screenOptions={{headerShown: false}} >
            <EnquiryStack.Screen name="EnquiryRoot" component={EnquiryPageView} />
            <EnquiryStack.Screen name="AddEnquiry" component={AddEnquiryView} />
            <EnquiryStack.Screen name="EnquiryDetails" component={EnquiryDetailsView} />
            <EnquiryStack.Screen name="EditSurveyItems" component={EditSurveyItemsView} />
        </EnquiryStack.Navigator>
    );
}

export default EnquiryStackNavigator;