import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './style';
import Spacer from '../../../../common/Spacer';

export interface ISerialNoItem {
  branches: object;
  companyEntity: string;
  companyId: string;
  initialValue: string;
  moduleId: string;
  moduleName: string;
  modules: object;
  prefix: string;
}

interface ISerialNoListItemProps {
  item: ISerialNoItem;
}

const SerialNoListItem: React.FC<ISerialNoListItemProps> = ({item}) => {

  return (
    <View style={styles.container}>
      <Spacer height={6} />
      <View style={styles.rowContainer}>
        <View style={styles.rowItemContainer}>
          <Text style={styles.labelText}>COMPANY ENTITY</Text>
        </View>
        <View style={styles.rowItemContainer2}>
          <Text style={styles.valueText}>{item.companyEntity}</Text>
        </View>
      </View>
      <Spacer height={2} />
      <View style={styles.rowContainer}>
        <View style={styles.rowItemContainer}>
          <Text style={styles.labelText}>MODULE NAME</Text>
        </View>
        <View style={styles.rowItemContainer2}>
          <Text style={styles.valueText}>{item.moduleName}</Text>
        </View>
      </View>
      <Spacer height={2} />
      <View style={styles.rowContainer}>
        <View style={styles.rowItemContainer}>
          <Text style={styles.labelText}>PREFIX</Text>
        </View>
        <View style={styles.rowItemContainer2}>
          <Text style={styles.valueText}>{item.prefix}</Text>
        </View>
      </View>
      <Spacer height={2} />
      <View style={styles.rowContainer}>
        <View style={styles.rowItemContainer}>
          <Text style={styles.labelText}>INITIAL VALUE</Text>
        </View>
        <View style={styles.rowItemContainer2}>
          <Text style={styles.valueText}>{item.initialValue}</Text>
        </View>
      </View>
      <Spacer height={2} />
      <View style={styles.rowContainer}>
        <View style={styles.rowItemContainer}>
          <Text style={styles.labelText}>CURRENT VALUE</Text>
        </View>
        <View style={styles.rowItemContainer2}>
          <Text style={styles.valueText}>{item.initialValue}</Text>
        </View>
      </View>
      <Spacer height={6} />
    </View>
  );
};

export default SerialNoListItem;
