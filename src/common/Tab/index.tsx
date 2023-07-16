import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './style';

interface ITabProps {
  label: string;
  onPress: (index: number) => void;
  activeIndex: number;
  index: number;
}

const Tab: React.FC<ITabProps> = ({label, onPress, activeIndex, index}) => {
  const container = index === activeIndex ? styles.containerActive : styles.container;
  const textStyle = index === activeIndex ? styles.activeText : styles.inactiveText;
  return (
    <TouchableOpacity
      style={container}
      onPress={() => onPress(index)}
      activeOpacity={0.6}
      key={`${index}`}>
      <Text style={textStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Tab;
