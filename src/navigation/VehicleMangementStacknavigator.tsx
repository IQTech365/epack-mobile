import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VehiclePageView from '../views/vehicle';
import ManageVehicleView from '../views/vehicle/components/ManageVehicleView';
import AddDriverDetailView from '../views/vehicle/components/addDriverDetailView';
import { VehicleManagementStackParamList } from './params/VehicleManagementStackParamList';
import AddVehicleDetailsView from '../views/vehicle/components/ManageVehicleView/AddVehicleDetailsView';

const SettingStack = createNativeStackNavigator<VehicleManagementStackParamList>();

const VehicleMangementStacknavigator = () => {
  return (
    <SettingStack.Navigator screenOptions={{headerShown: false}}>
      <SettingStack.Screen
        name="VehicleManagementRoot"
        component={VehiclePageView}
      />
      <SettingStack.Screen
        name="ManageDriver"
        component={AddDriverDetailView}
      />
      <SettingStack.Screen
        name="ManageVehicle"
        component={ManageVehicleView}
      />
      <SettingStack.Screen
        name="VehicleDetails"
        component={AddVehicleDetailsView}
      />
    </SettingStack.Navigator>
  );
};

export default VehicleMangementStacknavigator;
