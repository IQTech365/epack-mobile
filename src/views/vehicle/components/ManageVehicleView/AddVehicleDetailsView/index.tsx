import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {View, Text} from 'react-native';
import { VehicleManagementStackParamList } from "../../../../../navigation/params/VehicleManagementStackParamList";
import { IVehicle } from "../../../../../interface/vehicle/IGetLorryResponse";
import Header from "../../../../../common/Header";

type Props = NativeStackScreenProps<VehicleManagementStackParamList, "VehicleDetails">;

const AddVehicleDetailsView: React.FC<Props> = ({route, navigation}) => {
  const item: IVehicle = route.params?.item;

  return (
    <View>
      <Header label="VEHICLE DETAILS" canGoBack={true} />
    </View>
  );
};

export default AddVehicleDetailsView;