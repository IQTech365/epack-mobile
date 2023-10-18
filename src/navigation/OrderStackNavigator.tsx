import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrderStackRoute } from "../utils/constants";
import OrderPageView from "../views/order";
import AddOrderView from "../views/order/addOrder";
import OrderDetailsView from "../views/order/orderDetails";
import { OrderStackParamList } from "./params/OrderStackParamList";

const OrderStack = createNativeStackNavigator<OrderStackParamList>();

const OrderStackNavigator = () => {

    return (
        <OrderStack.Navigator screenOptions={{headerShown: false}} >
            <OrderStack.Screen name="OrderRoot" component={OrderPageView} />
            <OrderStack.Screen name="AddOrder" component={AddOrderView} />
            <OrderStack.Screen name="OrderDetails" component={OrderDetailsView} />
        </OrderStack.Navigator>
    );
}

export default OrderStackNavigator;