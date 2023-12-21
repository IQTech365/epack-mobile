import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {VehicleManagementStackParamList} from '../../../../../navigation/params/VehicleManagementStackParamList';
import {IVehicle} from '../../../../../interface/vehicle/IGetLorryResponse';
import Header from '../../../../../common/Header';
import Spacer from '../../../../../common/Spacer';
import styles from './style';

type Props = NativeStackScreenProps<
  VehicleManagementStackParamList,
  'VehicleDetails'
>;

const AddVehicleDetailsView: React.FC<Props> = ({route, navigation}) => {
  const item: IVehicle = route.params?.item;

  return (
    <View>
      <Header label="VEHICLE DETAILS" canGoBack={true} />
      <Spacer height={10} />
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <View style={styles.rowContainer}>
          <Text style={styles.labelText}>Entity Type :</Text>
          <Text style={styles.valueText}>{item.entityType}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.labelText}>Entity ID :</Text>
          <Text style={styles.valueText}>{item.entityId}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.labelText}>Vehicle Company :</Text>
          <Text style={styles.valueText}>{item.vehicleCompanyName}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.labelText}>V. Manufacturing Year :</Text>
          <Text style={styles.valueText}>{item.vehicleManufacturingYear}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.labelText}>Vehicle Type :</Text>
          <Text style={styles.valueText}>{item.vehicleType}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.labelText}>Vehicle Reg. Number :</Text>
          <Text style={styles.valueText}>{item.vehicleRegistrationNo}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.labelText}>Vehicle Chasis Number :</Text>
          <Text style={styles.valueText}>{item.vehicleChassisNo}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.labelText}>Vehicle Engine Number :</Text>
          <Text style={styles.valueText}>{item.vehicleEngineNo}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.labelText}>Vehicle Permit Number :</Text>
          <Text style={styles.valueText}>{item.permitNo}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.labelText}>V. Permit Renewal Date :</Text>
          <Text style={styles.valueText}>{item.permitRenewalDate}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.labelText}>V. RC No. :</Text>
          <Text style={styles.valueText}>{item.vehicleRCNo}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.labelText}>V. Pollution Cert. No. :</Text>
          <Text style={styles.valueText}>{item.pollutionCertificateNo}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.labelText}>V. Pollution Renewal Date :</Text>
          <Text style={styles.valueText}>{item.pollutionRenewalDate}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddVehicleDetailsView;
