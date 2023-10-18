import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import AddIcon from '../../images/icons/add.svg';
interface IAddNewProps {
  count: string;
  countLabel: string;
  onPress: () => void;
  text?: string;
}

const AddNew: React.FC<IAddNewProps> = ({count, countLabel, onPress, text}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowItemLeftContainer}>
        <Text style={styles.countLabel}>{countLabel}: </Text>
        <Text style={styles.countValue}>{count}</Text>
      </View>
      <View style={styles.rowItemRightContainer}>
          <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.6} onPress={onPress}>
              <AddIcon width={24} height={24} />
              <Text style={styles.buttonText}>{text ? text : 'ADD NEW'}</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNew;
