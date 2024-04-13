import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DrawerNavigator} from './DrawerNavigator';
import SubscriptionPlanView from '../views/subscriptionPlan';
import CheckoutPage from '../views/checkout';
import { RootStackParamList } from './params/RootStackParamList';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{
        headerShown: false
    }}>
      <RootStack.Screen name="Drawer" component={DrawerNavigator} />
      <RootStack.Screen name="Subscription" component={SubscriptionPlanView} />
      <RootStack.Screen name="Checkout" component={CheckoutPage} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
