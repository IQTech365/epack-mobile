import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClientStackRoute } from "../utils/constants";
import ClientsPageView from "../views/clients";
import ClientDetailsView from "../views/clients/clientDetails";

const ClientStack = createNativeStackNavigator();

const ClientStackNavigator = () => {

    return (
        <ClientStack.Navigator screenOptions={{headerShown: false}} >
            <ClientStack.Screen name={ClientStackRoute.ClientRoot} component={ClientsPageView} />
            <ClientStack.Screen name={ClientStackRoute.ClientDetails} component={ClientDetailsView} />
        </ClientStack.Navigator>
    );
}

export default ClientStackNavigator;