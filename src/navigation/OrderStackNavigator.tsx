import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagePageView from "../views/message";
import { OrderStackRoute } from "../utils/constants";

const OrderStack = createNativeStackNavigator();

const OrderStackNavigator = () => {

    return (
        <OrderStack.Navigator screenOptions={{headerShown: false}} >
            <OrderStack.Screen name={OrderStackRoute.Message} component={MessagePageView} />
        </OrderStack.Navigator>
    );
}

export default OrderStackNavigator;