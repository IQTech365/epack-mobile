import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabRoute } from '../utils/constants';
import HomeStackNavigator from './HomeStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import ZoomStackNavigator from './ZoomStackNavigator';
import MenuStackNavigator from './MenuStackNavigator';
import MessageStackNavigator from './MessageStackNavigator';
import TabBar from '../common/TabBar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}} tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name={TabRoute.HomeStack} component={HomeStackNavigator} options={{title: 'Home'}} />
            <Tab.Screen name={TabRoute.ProfileStack} component={ProfileStackNavigator} options={{title: 'Profile'}} />
            <Tab.Screen name={TabRoute.ZoomStack} component={ZoomStackNavigator} options={{title: 'Zoom'}} />
            <Tab.Screen name={TabRoute.MessageStack} component={MessageStackNavigator} options={{title: 'Message'}} />
            <Tab.Screen name={TabRoute.MenuStack} component={MenuStackNavigator} options={{title: 'Menu'}} />
        </Tab.Navigator>
    );
}

export default TabNavigator;