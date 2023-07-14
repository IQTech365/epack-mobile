import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QuotationStackRoute } from "../utils/constants";
import QuotationPageView from "../views/quotation";

const QuotationStack = createNativeStackNavigator();

const QuotationStackNavigator = () => {

    return (
        <QuotationStack.Navigator screenOptions={{headerShown: false}} >
            <QuotationStack.Screen name={QuotationStackRoute.Profile} component={QuotationPageView} />
        </QuotationStack.Navigator>
    );
}

export default QuotationStackNavigator;