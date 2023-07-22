import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OrderStackRoute } from "../utils/constants";
import OrderPageView from "../views/order";
import AddOrderView from "../views/order/addOrder";
import OrderDetailsView from "../views/order/orderDetails";

const OrderStack = createNativeStackNavigator();

const OrderStackNavigator = () => {

    return (
        <OrderStack.Navigator screenOptions={{headerShown: false}} >
            <OrderStack.Screen name={OrderStackRoute.OrderRoot} component={OrderPageView} />
            <OrderStack.Screen name={OrderStackRoute.AddOrder} component={AddOrderView} />
            <OrderStack.Screen name={OrderStackRoute.OrderDetails} component={OrderDetailsView} />
        </OrderStack.Navigator>
    );
}

export default OrderStackNavigator;