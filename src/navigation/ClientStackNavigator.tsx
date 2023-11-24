import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClientStackRoute } from "../utils/constants";
import ClientsPageView from "../views/clients";
import ClientDetailsView from "../views/clients/clientDetails";
import { ClientStackParamList } from "./params/CientDtackParamList";

const ClientStack = createNativeStackNavigator<ClientStackParamList>();

const ClientStackNavigator = () => {

    return (
        <ClientStack.Navigator screenOptions={{headerShown: false}} >
            <ClientStack.Screen name={'ClientRoot'} component={ClientsPageView} />
            <ClientStack.Screen name={'ClientDetails'} component={ClientDetailsView} />
        </ClientStack.Navigator>
    );
}

export default ClientStackNavigator;