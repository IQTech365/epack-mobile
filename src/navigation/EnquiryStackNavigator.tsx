import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EnquiryPageView from "../views/enquiry";
import AddEnquiryView from "../views/enquiry/addEnquiry";
import EnquiryDetailsView from "../views/enquiry/enquiryDetails";
import { EnquiryStackParamList } from "./params/EnquiryStackParamList";
import EditSurveyItemsView from "../views/enquiry/editSurveyItemsView";
import PackingMaterialListView from "../views/enquiry/PackingMaterialListView";

const EnquiryStack = createNativeStackNavigator<EnquiryStackParamList>();

const EnquiryStackNavigator = () => {

    return (
        <EnquiryStack.Navigator screenOptions={{headerShown: false}} >
            <EnquiryStack.Screen name="EnquiryRoot" component={EnquiryPageView} />
            <EnquiryStack.Screen name="AddEnquiry" component={AddEnquiryView} />
            <EnquiryStack.Screen name="EnquiryDetails" component={EnquiryDetailsView} />
            <EnquiryStack.Screen name="EditSurveyItems" component={EditSurveyItemsView} />
            <EnquiryStack.Screen name="EditPackingMaterials" component={PackingMaterialListView} />
        </EnquiryStack.Navigator>
    );
}

export default EnquiryStackNavigator;