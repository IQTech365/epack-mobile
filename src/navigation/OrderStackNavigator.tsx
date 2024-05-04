import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderPageView from "../views/order";
import AddOrderView from "../views/order/addOrder";
import OrderDetailsView from "../views/order/orderDetails";
import { OrderStackParamList } from "./params/OrderStackParamList";
import EditPackingItemsView from "../views/order/editPackingItemsView";
import EditInvoiceView from "../views/order/editInvoiceView";
import EditBiltyView from "../views/order/editBiltyView";
import EditCarCondition from "../views/order/editCarConditionView";
import PackingMaterialListView from "../views/enquiry/PackingMaterialListView";

const OrderStack = createNativeStackNavigator<OrderStackParamList>();

const OrderStackNavigator = () => {

    return (
        <OrderStack.Navigator screenOptions={{headerShown: false}} >
            <OrderStack.Screen name="OrderRoot" component={OrderPageView} />
            <OrderStack.Screen name="AddOrder" component={AddOrderView} />
            <OrderStack.Screen name="OrderDetails" component={OrderDetailsView} />
            <OrderStack.Screen name="EditPackingItems" component={EditPackingItemsView} />
            <OrderStack.Screen name="EditInvoice" component={EditInvoiceView} />
            <OrderStack.Screen name="EditBilty" component={EditBiltyView} />
            <OrderStack.Screen name="EditCarCondition" component={EditCarCondition} />
            <OrderStack.Screen name="EditPackingMaterials" component={PackingMaterialListView} />
        </OrderStack.Navigator>
    );
}

export default OrderStackNavigator;