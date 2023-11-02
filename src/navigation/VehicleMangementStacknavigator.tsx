import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VehicleMangementStackRoute } from '../utils/constants';
import ProfilePageView from '../views/profile';
import BasicDetailsView from '../views/profile/components/basicDetails';
import VehiclePageView from '../views/vehicle';
import AddDriverView from '../views/vehicle/components/addDriverView';
import AddLorryView from '../views/vehicle/components/addLorryView';
import AddLorryDetailView from '../views/vehicle/components/addLorryDetailView';
import AddDriverDetailView from '../views/vehicle/components/addDriverDetailView';


const SettingStack = createNativeStackNavigator();

const VehicleMangementStacknavigator = () => {
    return (
        <SettingStack.Navigator screenOptions={{ headerShown: false }}>
             <SettingStack.Screen
                name={VehicleMangementStackRoute.vehicleRoot}
                component={VehiclePageView}
            />
            <SettingStack.Screen
                name={VehicleMangementStackRoute.AddDriver}
                component={AddDriverDetailView}
            />
            <SettingStack.Screen
                name={VehicleMangementStackRoute.AddLorry}
                component={AddLorryDetailView}
            />
           
        </SettingStack.Navigator>
    );
};

export default VehicleMangementStacknavigator;
