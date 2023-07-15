import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import AddIcon from '../../images/icons/add.svg';
interface IAddNewProps {
  count: string;
  countLabel: string;
  onPress: () => void;
}

const AddNew: React.FC<IAddNewProps> = ({count, countLabel, onPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowItemLeftContainer}>
        <Text style={styles.countLabel}>{countLabel}: </Text>
        <Text style={styles.countValue}>{count}</Text>
      </View>
      <View style={styles.rowItemRightContainer}>
          <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.6} onPress={onPress}>
              <AddIcon width={24} height={24} />
              <Text style={styles.buttonText}>ADD NEW</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddNew;
