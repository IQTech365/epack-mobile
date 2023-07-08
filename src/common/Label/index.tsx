import React from 'react';
import {Text, TextStyle, View} from 'react-native';
import styles from './style';

interface ILabelProps {
  text: string;
  style?: TextStyle;
}

const Label: React.FC<ILabelProps> = ({text, style}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, style]}>{text}</Text>
    </View>
  );
};

export default Label;
