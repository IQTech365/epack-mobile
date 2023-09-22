import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';

import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

interface IEmptyViewProps {
  message: string;
  onPress: () => void;
}

const EmptyView: React.FC<IEmptyViewProps> = ({message, onPress}) => {
  return (
    <View style={styles.wrapper}>
      <Text>{message}</Text>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyView;
