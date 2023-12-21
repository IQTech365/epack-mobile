import React from "react";
import {View, Text} from 'react-native';
import styles from './style';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { VehicleManagementStackParamList } from "../../../../../navigation/params/VehicleManagementStackParamList";

type Props = NativeStackScreenProps<VehicleManagementStackParamList,"DriverDetails">;

const DriverDetailsView:React.FC<Props> = ({}) => {

    return <View></View>
};

export default DriverDetailsView;