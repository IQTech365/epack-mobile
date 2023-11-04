import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QuotationStackRoute } from "../utils/constants";
import QuotationPageView from "../views/quotation";
import AddQuotationView from "../views/quotation/addQuotation";
import EnquiryDetailsView from "../views/enquiry/enquiryDetails";
import { QuotationStackParamList } from "./params/QuotationStackParamList";

const QuotationStack = createNativeStackNavigator<QuotationStackParamList>();

const QuotationStackNavigator = () => {

    return (
        <QuotationStack.Navigator screenOptions={{headerShown: false}} >
            <QuotationStack.Screen name="QuotationRoot" component={QuotationPageView} />
            <QuotationStack.Screen name="AddQuotation" component={AddQuotationView} />
            {/* <QuotationStack.Screen name="QuotationDetails" component={EnquiryDetailsView} /> */}
        </QuotationStack.Navigator>
    );
}

export default QuotationStackNavigator;