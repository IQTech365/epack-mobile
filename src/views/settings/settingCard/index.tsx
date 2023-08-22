import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import styles from './style';

interface ISettingCardProps {
  item: string;
  onPress: () => void;
}

const SettingCard: React.FC<ISettingCardProps> = ({ item, onPress }) => {
  return (
    <Shadow style={styles.cardWrapper} distance={4} startColor="#D9D9D9">
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.6}
        onPress={onPress}>
        <Text>{item}</Text>
      </TouchableOpacity>
    </Shadow>
  );
};

export default SettingCard;
