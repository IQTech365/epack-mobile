import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MessagePageView from "../views/message";
import { MessageStackRoute } from "../utils/constants";

const MessageStack = createNativeStackNavigator();

const MessageStackNavigator = () => {

    return (
        <MessageStack.Navigator screenOptions={{headerShown: false}} >
            <MessageStack.Screen name={MessageStackRoute.Message} component={MessagePageView} />
        </MessageStack.Navigator>
    );
}

export default MessageStackNavigator;