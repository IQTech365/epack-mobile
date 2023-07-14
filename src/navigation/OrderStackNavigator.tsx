import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrderStackRoute } from "../utils/constants";
import OrderPageView from "../views/order";

const OrderStack = createNativeStackNavigator();

const OrderStackNavigator = () => {

    return (
        <OrderStack.Navigator screenOptions={{headerShown: false}} >
            <OrderStack.Screen name={OrderStackRoute.Message} component={OrderPageView} />
        </OrderStack.Navigator>
    );
}

export default OrderStackNavigator;