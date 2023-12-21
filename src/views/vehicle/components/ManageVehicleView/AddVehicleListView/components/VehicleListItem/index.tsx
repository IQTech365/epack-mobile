import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styles from './style';
import Spacer from '../../../../../../../common/Spacer';
import {IVehicle} from '../../../../../../../interface/vehicle/IGetLorryResponse';

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
  return (
    <>
      <Shadow style={styles.cardWrapper} distance={4} key={`${index}`}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.6}
          onPress={() => onPress(index)}>
          <Spacer height={6} />
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Entity Type</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.entityType}</Text>
            </View>
          </View>
          {/* <Spacer height={2} />
                    <View style={styles.rowContainer}>
                        <View style={styles.rowItemContainer}>
                            <Text style={styles.labelText}>Dreiver Name</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.driverName}</Text>
                        </View>
                    </View> */}
          {/* <Spacer height={2} />
                    <View style={styles.rowContainer}>
                        <View style={styles.rowItemContainer}>
                            <Text style={styles.labelText}>Branch Name</Text>
                        </View>
                        <View style={styles.rowItemContainer2}>
                            <Text style={styles.valueText}>{item.branchName}</Text>
                        </View>
                    </View> */}
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
              <Text style={styles.valueText}>{item.vehicleType}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Vehicle Reg. No</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.vehicleRegistrationNo}</Text>
            </View>
          </View>
          <Spacer height={6} />
        </TouchableOpacity>
      </Shadow>
    </>
  );
};

export default VehicleListItem;
