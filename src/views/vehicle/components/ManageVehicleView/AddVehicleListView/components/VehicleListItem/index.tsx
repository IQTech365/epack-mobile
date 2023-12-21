import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styles from './style';
import Spacer from '../../../../../../../common/Spacer';
import {IVehicle} from '../../../../../../../interface/vehicle/IGetLorryResponse';
import {COLOR_BLUE} from '../../../../../../../utils/colors';
import {useAppSelector} from '../../../../../../../redux/hooks';
import {getVehicleType} from '../../../../utils';

interface IAddLorryListItemProps {
  item: IVehicle;
  index: number;
  onPress: (index: number) => void;
}

const VehicleListItem: React.FC<IAddLorryListItemProps> = ({
  item,
  index,
  onPress,
}: IAddLorryListItemProps) => {
  const {vehicleTypes, vehicleModels} = useAppSelector(state => state.Common);
  return (
    <>
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
      <Shadow style={styles.cardWrapper} distance={1} key={`${index}`}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.6}
          onPress={() => onPress(index)}>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Entity Type</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.entityType}</Text>
            </View>
          </View>
          <Spacer height={2} />
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>V. Company Name</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.vehicleCompanyName}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>V. Manufacturing Year</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>
                {item.vehicleManufacturingYear}
              </Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Vehicle Type</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>
                {getVehicleType(item.vehicleType, vehicleTypes)}
              </Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Vehicle Model</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.vehicleModel || 'NA'}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.rowItemContainer, {borderBottomWidth: 0}]}>
              <Text style={styles.labelText}>Vehicle Reg. No</Text>
            </View>
            <View style={[styles.rowItemContainer2, {borderBottomWidth: 0}]}>
              <Text style={styles.valueText}>{item.vehicleRegistrationNo}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Shadow>
    </>
  );
};

export default VehicleListItem;
