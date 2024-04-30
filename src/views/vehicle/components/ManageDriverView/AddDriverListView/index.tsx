import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import styles from './style';
import Spacer from '../../../../../common/Spacer';
import {Address} from '../../../../../interface/vehicle/IAddDriverRequest';

export interface IAddDriverItem {
  permanentAddress: Address;
  currentAddress: Address;
  entityType: string;
  driverName: string;
  mobile: string;
  licenceNo: string;
  aadharNo: string;
  createdBy: string;
  createdAt: string;
}

interface IAddDriverListItemProps {
  item: IAddDriverItem;
  index: number;
  onPress: (index: number) => void;

}

const AddDriverListItem: React.FC<IAddDriverListItemProps> = ({
  item,
  index,
  onPress
}: IAddDriverListItemProps) => {
  console.log(item,"iemdssss");
  
  return (
    <>
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
      <Shadow style={styles.cardWrapper} distance={1} key={`${index}`}>
        <TouchableOpacity style={styles.container} activeOpacity={0.6} 
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
              <Text style={styles.labelText}>Driver Name</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.driverName}</Text>
            </View>
          </View>
          <Spacer height={2} />
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Mobile</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.mobile}</Text>
            </View>
          </View>
          <Spacer height={2} />
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Licence No</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.licenceNo}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Adhar No</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>{item.aadharNo}</Text>
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.rowItemContainer}>
              <Text style={styles.labelText}>Permanent Address</Text>
            </View>
            <View style={styles.rowItemContainer2}>
              <Text style={styles.valueText}>
                {item.permanentAddress.address},{item.permanentAddress.city},{item.permanentAddress.state}, {item.permanentAddress.pincode}
              </Text>
              {/* <Text style={styles.valueText}>{item.permanentAddress.city}</Text> */}
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.rowItemContainer, {borderBottomWidth: 0}]}>
              <Text style={styles.labelText}>Current Address</Text>
            </View>
            <View style={[styles.rowItemContainer2, {borderBottomWidth: 0}]}>
              <Text style={styles.valueText}>
                {item.currentAddress.address},{item.currentAddress.city},{item.currentAddress.state}, {item.currentAddress.pincode}
              </Text>
              {/* <Text style={styles.valueText}>{item.currentAddress.city}</Text> */}
            </View>
          </View>
        </TouchableOpacity>
      </Shadow>
    </>
  );
};

export default AddDriverListItem;
