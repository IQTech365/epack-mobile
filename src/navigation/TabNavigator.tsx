import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabRoute } from '../utils/constants';
import HomeStackNavigator from './HomeStackNavigator';
import QuotationStackNavigator from './QuotationStackNavigator';
import EnquiryStackNavigator from './EnquiryStackNavigator';
import ClientStackNavigator from './ClientStackNavigator';
import OrderStackNavigator from './OrderStackNavigator';
import TabBar from '../common/TabBar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}} tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name={TabRoute.HomeStack} component={HomeStackNavigator} options={{title: 'Home'}} />
            <Tab.Screen name={TabRoute.QuotationStack} component={QuotationStackNavigator} options={{title: 'Quotation'}} />
            <Tab.Screen name={TabRoute.EnquiryStack} component={EnquiryStackNavigator} options={{title: 'Enquiry'}} />
            <Tab.Screen name={TabRoute.OrderStack} component={OrderStackNavigator} options={{title: 'Order'}} />
            <Tab.Screen name={TabRoute.ClientStack} component={ClientStackNavigator} options={{title: 'Clients'}} />
        </Tab.Navigator>
    );
}

export default TabNavigator;