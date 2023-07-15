import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QuotationStackRoute } from "../utils/constants";
import QuotationPageView from "../views/quotation";
import AddQuotationView from "../views/quotation/addQuotation";

const QuotationStack = createNativeStackNavigator();

const QuotationStackNavigator = () => {

    return (
        <QuotationStack.Navigator screenOptions={{headerShown: false}} >
            <QuotationStack.Screen name={QuotationStackRoute.QuotationRoot} component={QuotationPageView} />
            <QuotationStack.Screen name={QuotationStackRoute.AddQuotation} component={AddQuotationView} />
        </QuotationStack.Navigator>
    );
}

export default QuotationStackNavigator;